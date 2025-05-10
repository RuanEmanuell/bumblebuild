import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export class GPURepository {
  async create(data: Prisma.GPUCreateInput) {
    return prisma.gPU.create({ data });
  }

  async list() {
    return prisma.gPU.findMany({ include: { part: true } });
  }

  async searchById(id: number) {
    return prisma.gPU.findUnique({ where: { id }, include: { part: true } });
  }

  async update(id: number, data: Prisma.GPUUpdateInput) {
    return prisma.gPU.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.gPU.delete({ where: { id } });
  }
}