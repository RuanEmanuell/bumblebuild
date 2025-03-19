import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class UsuarioRepository {
  async criarUsuario(dados: any) {
    return prisma.usuario.create({ data: dados });
  }

  async buscarPorEmail(email: string) {
    return prisma.usuario.findUnique({ where: { email } });
  }

  async listarUsuarios() {
    return prisma.usuario.findMany();
  }
}
