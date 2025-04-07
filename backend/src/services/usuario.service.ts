import { UsuarioRepository } from "../repositories/usuario.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { blackListToken } from "../middlewares/authMiddleware";
import { randomUUID } from "crypto";
import nodemailer from "nodemailer";


const usuarioRepository = new UsuarioRepository();

export class UsuarioService {
  async criarUsuario(tipo_usuario: string, nome: string, email: string, senha: string) {
    const usuarioExistente = await usuarioRepository.buscarPorEmail(email);
    if (usuarioExistente) throw new Error("Email já cadastrado.");

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await usuarioRepository.criarUsuario({ tipo_usuario, nome, email, senha: senhaCriptografada });
    return novoUsuario;
  }

  async login(email: string, senha: string) {
    const usuario = await usuarioRepository.buscarPorEmail(email);
    if (!usuario) throw new Error("Credenciais inválidas");

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) throw new Error("Credenciais inválidas");

    if (!process.env.SECRET_JWT) throw new Error("SECRET_JWT não definido!");

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.SECRET_JWT, { expiresIn: "1h" });
    return token;
  }

  async logout(token: string): Promise<string> {
    try {
      blackListToken(token);
      return "Logout realizado com sucesso!";
    } catch (error) {
      throw new Error("Erro ao tentar realizar o logout. Tente novamente mais tarde.");
    }
  }

  async editUsuario(id: number, tipo_usuario: string, nome: string, email: string, senha: string) {
    const usuarioExistente = await usuarioRepository.buscarPorEmail(email);
    if (usuarioExistente && usuarioExistente.id !== id) throw new Error("Email já cadastrado.");

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await usuarioRepository.buscarPorId(id);
  }

  async solicitarRecuperacaoSenha(email: string) {
    const usuario = await usuarioRepository.buscarPorEmail(email);
    if (!usuario) throw new Error("Usuário não encontrado.");

    const token = randomUUID();
    const expiracao = new Date(Date.now() + 30 * 60 * 1000); // 30 minutos

    await usuarioRepository.salvarTokenRecuperacao(usuario.id, token, expiracao);

    const link = `http://localhost:3000/redefinir-senha?token=${token}`; // ou domínio real

    // Exemplo básico de envio de e-mail
    const transporter = nodemailer.createTransport({
      host: "gmail.com",
      port: 587,
      auth: {
        user: "bumblebuild1@gmail.com",
        pass: "diogouber2025"
      }
    });

    await transporter.sendMail({
      from: "noreply@bumblebuild.com",
      to: email,
      subject: "Recuperação de senha",
      html: `<p>Clique no link para redefinir sua senha:</p><a href="${link}">${link}</a>`
    });

    return "E-mail de recuperação enviado com sucesso!";
  }

  async redefinirSenha(token: string, novaSenha: string) {
    const tokenInfo = await usuarioRepository.buscarTokenRecuperacao(token);
    if (!tokenInfo) throw new Error("Token inválido ou expirado.");
  
    const agora = new Date();
    if (tokenInfo.experiedAt < agora) throw new Error("Token expirado.");
  
    const senhaCriptografada = await bcrypt.hash(novaSenha, 10);
  
    await usuarioRepository.atualizarSenha(tokenInfo.usuarioId, senhaCriptografada);
  
    await usuarioRepository.deletarTokenRecuperacao(token);
  
    return "Senha redefinida com sucesso!";
  }
  
}
