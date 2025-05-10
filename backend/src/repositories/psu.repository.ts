import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class PSURepository {
  async create(data: Prisma.PSUCreateInput) {
    return prisma.pSU.create({ data });
  }

  async list() {
    return prisma.pSU.findMany({ include: { part: true } });
  }

  async searchById(id: number) {
    return prisma.pSU.findUnique({ where: { id }, include: { part: true } });
  }

  async update(id: number, data: Prisma.PSUUpdateInput) {
    return prisma.pSU.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.pSU.delete({ where: { id } });
  }
}