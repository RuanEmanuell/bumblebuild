import { UsuarioRepository } from "../repositories/usuario.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const usuarioRepository = new UsuarioRepository();

export class UsuarioService {
  async criarUsuario(tipo_usuario: string, nome: string, email: string, senha: string) {
    const usuarioExistente = await usuarioRepository.buscarPorEmail(email);
    if (usuarioExistente) throw new Error("Email já cadastrado.");

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    return usuarioRepository.criarUsuario({ tipo_usuario, nome, email, senha: senhaCriptografada });
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
}
