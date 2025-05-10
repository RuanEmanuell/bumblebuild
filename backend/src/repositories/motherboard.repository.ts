import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class MotherboardRepository {
  async create(data: Prisma.MotherboardCreateInput) {
    return prisma.motherboard.create({ data });
  }

  async list() {
    return prisma.motherboard.findMany({ include: { part: true } });
  }

  async searchById(id: number) {
    return prisma.motherboard.findUnique({ where: { id }, include: { part: true } });
  }

  async update(id: number, data: Prisma.MotherboardUpdateInput) {
    return prisma.motherboard.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.motherboard.delete({ where: { id } });
  }
}