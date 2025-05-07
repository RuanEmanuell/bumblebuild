import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export class RAMRepository {
  async criar(data: Prisma.RAMCreateInput) {
    return prisma.rAM.create({ data });
  }

  async listar() {
    return prisma.rAM.findMany({ include: { peca: true } });
  }

  async buscarPorId(id: number) {
    return prisma.rAM.findUnique({ where: { id }, include: { peca: true } });
  }

  async atualizar(id: number, data: Prisma.RAMUpdateInput) {
    return prisma.rAM.update({ where: { id }, data });
  }

  async deletar(id: number) {
    return prisma.rAM.delete({ where: { id } });
  }
}