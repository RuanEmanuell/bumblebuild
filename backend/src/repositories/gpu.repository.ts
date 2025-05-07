import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export class GPURepository {
  async criar(data: Prisma.GPUCreateInput) {
    return prisma.gPU.create({ data });
  }

  async listar() {
    return prisma.gPU.findMany({ include: { peca: true } });
  }

  async buscarPorId(id: number) {
    return prisma.gPU.findUnique({ where: { id }, include: { peca: true } });
  }

  async atualizar(id: number, data: Prisma.GPUUpdateInput) {
    return prisma.gPU.update({ where: { id }, data });
  }

  async deletar(id: number) {
    return prisma.gPU.delete({ where: { id } });
  }
}