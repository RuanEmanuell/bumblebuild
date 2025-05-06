import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export class PlacaMaeRepository {
  async criar(data: Prisma.PlacaMaeCreateInput) {
    return prisma.placaMae.create({ data });
  }

  async listar() {
    return prisma.placaMae.findMany({ include: { peca: true } });
  }

  async buscarPorId(id: number) {
    return prisma.placaMae.findUnique({ where: { id }, include: { peca: true } });
  }

  async atualizar(id: number, data: Prisma.PlacaMaeUpdateInput) {
    return prisma.placaMae.update({ where: { id }, data });
  }

  async deletar(id: number) {
    return prisma.placaMae.delete({ where: { id } });
  }
}