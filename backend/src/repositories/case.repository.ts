import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export class CaseRepository {
  async create(data: Prisma.CaseCreateInput) {
    return prisma.case.create({ data });
  }

  async list() {
    return prisma.case.findMany();
  }

  async searchById(id: number) {
    return prisma.case.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.CaseUpdateInput) {
    return prisma.case.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.case.delete({ where: { id } });
  }
}
