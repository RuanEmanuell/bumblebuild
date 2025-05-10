import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export class SSDRepository {
  async create(data: Prisma.SSDCreateInput) {
    return prisma.sSD.create({ data });
  }

  async list() {
    return prisma.sSD.findMany({ include: { part: true } });
  }

  async searchById(id: number) {
    return prisma.sSD.findUnique({ where: { id }, include: { part: true } });
  }

  async update(id: number, data: Prisma.SSDUpdateInput) {
    return prisma.sSD.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.sSD.delete({ where: { id } });
  }
}