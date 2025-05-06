import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export class COOLERRepository {
  async criar(data: Prisma.CoolerCreateInput) {
    return prisma.cooler.create({ data });
  }

  async listar() {
    return prisma.cooler.findMany({ include: { peca: true } });
  }

  async buscarPorId(id: number) {
    return prisma.cooler.findUnique({ where: { id }, include: { peca: true } });
  }

  async atualizar(id: number, data: Prisma.CoolerUpdateInput) {
    return prisma.cooler.update({ where: { id }, data });
  }

  async deletar(id: number) {
    return prisma.cooler.delete({ where: { id } });
  }
}