import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export class CPURepository {
  async criar(data: Prisma.CPUCreateInput) {
    return prisma.cPU.create({ data });
  }

  async listar() {
    return prisma.cPU.findMany({ include: { peca: true } });
  }

  async buscarPorId(id: number) {
    return prisma.cPU.findUnique({ where: { id }, include: { peca: true } });
  }

  async atualizar(id: number, data: Prisma.CPUUpdateInput) {
    return prisma.cPU.update({ where: { id }, data });
  }

  async deletar(id: number) {
    return prisma.cPU.delete({ where: { id } });
  }
}