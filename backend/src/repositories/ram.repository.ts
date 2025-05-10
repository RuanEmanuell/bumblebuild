import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export class RAMRepository {
  async create(data: Prisma.RAMCreateInput) {
    return prisma.rAM.create({ data });
  }

  async list() {
    return prisma.rAM.findMany({ include: { part: true } });
  }

  async searchById(id: number) {
    return prisma.rAM.findUnique({ where: { id }, include: { part: true } });
  }

  async update(id: number, data: Prisma.RAMUpdateInput) {
    return prisma.rAM.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.rAM.delete({ where: { id } });
  }
}