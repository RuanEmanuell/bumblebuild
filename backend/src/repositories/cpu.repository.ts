import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export class CPURepository {
  async create(data: Prisma.CPUCreateInput) {
    return prisma.cPU.create({ data });
  }

  async list() {
    return prisma.cPU.findMany({ include: { peca: true } });
  }

  async searchById(id: number) {
    return prisma.cPU.findUnique({ where: { id }, include: { peca: true } });
  }

  async update(id: number, data: Prisma.CPUUpdateInput) {
    return prisma.cPU.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.cPU.delete({ where: { id } });
  }
}