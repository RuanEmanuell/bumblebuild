import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export class CoolerRepository {
  async create(data: Prisma.CoolerCreateInput) {
    return prisma.cooler.create({ data });
  }

  async list() {
    return prisma.cooler.findMany({ include: { part: true } });
  }

  async searchById(id: number) {
    return prisma.cooler.findUnique({ where: { id }, include: { part: true } });
  }

  async update(id: number, data: Prisma.CoolerUpdateInput) {
    return prisma.cooler.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.cooler.delete({ where: { id } });
  }
}