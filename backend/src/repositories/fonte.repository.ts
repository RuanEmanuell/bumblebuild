import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export class FonteRepository {
  async criar(data: Prisma.FonteCreateInput) {
    return prisma.fonte.create({ data });
  }

  async listar() {
    return prisma.fonte.findMany({ include: { peca: true } });
  }

  async buscarPorId(id: number) {
    return prisma.fonte.findUnique({ where: { id }, include: { peca: true } });
  }

  async atualizar(id: number, data: Prisma.FonteUpdateInput) {
    return prisma.fonte.update({ where: { id }, data });
  }

  async deletar(id: number) {
    return prisma.fonte.delete({ where: { id } });
  }
}