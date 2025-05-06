import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export class UsuarioRepository {

  async criarUsuario(dados: Prisma.UsuarioCreateInput) {
    return prisma.usuario.create({
      data: {
        tipo_usuario: dados.tipo_usuario,
        nome: dados.nome,
        email: dados.email,
        senha: dados.senha,
        updatedAt : new Date()
      }
    });
  }

  async buscarPorEmail(email: string) {
    return prisma.usuario.findUnique({ where: { email } });
  }

  async listarUsuarios() {
    return prisma.usuario.findMany();
  }

  async buscarPorId(id: number) {
    return prisma.usuario.findUnique({ where: { id } });
  }

  async salvarTokenRecuperacao(usuarioId: number, token: string, experiedAt: Date) {
    return prisma.tokenRecuperacaoSenha.create({
      data: {
        token,
        usuarioId,
        experiedAt,
      },
    });
  }

  async buscarTokenRecuperacao(token: string) {
    return prisma.tokenRecuperacaoSenha.findUnique({
      where: { token },
      include: { usuario: true },
    });
  }

  async deletarTokenRecuperacao(token: string) {
    return prisma.tokenRecuperacaoSenha.delete({ where: { token } });
  }

  async atualizarSenha(usuarioId: number, novaSenha: string) {
    return prisma.usuario.update({
      where: { id: usuarioId },
      data: { senha: novaSenha },
    });
  }

  async atualizarUsuario(id: number, dados: Partial<Prisma.UsuarioUpdateInput>) {
    return prisma.usuario.update ({
      where: {id},
      data: {
        ...dados,
        updatedAt: new Date()
      }
    });
  }

}
