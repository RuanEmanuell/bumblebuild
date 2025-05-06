import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export class SSDRepository {
  async criar(data: Prisma.SSDCreateInput) {
    return prisma.sSD.create({ data });
  }

  async listar() {
    return prisma.sSD.findMany({ include: { peca: true } });
  }

  async buscarPorId(id: number) {
    return prisma.sSD.findUnique({ where: { id }, include: { peca: true } });
  }

  async atualizar(id: number, data: Prisma.SSDUpdateInput) {
    return prisma.sSD.update({ where: { id }, data });
  }

  async deletar(id: number) {
    return prisma.sSD.delete({ where: { id } });
  }
}