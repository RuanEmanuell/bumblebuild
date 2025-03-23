import { PrismaClient, Prisma } from "@prisma/client";
import { Usuario } from "../models/usuario.model";
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
}
