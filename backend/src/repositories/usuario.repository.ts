import { PrismaClient } from "@prisma/client";
import { Usuario } from "../models/usuario.model";
const prisma = new PrismaClient();

export class UsuarioRepository {
  async criarUsuario(dados: Usuario) {
    return prisma.usuario.create({ data: dados });
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
