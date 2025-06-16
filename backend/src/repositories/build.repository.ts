import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class BuildRepository {
  async createBuild(userId: number, name: string, partIds: number[]) {
    return await prisma.build.create({
      data: {
        userId,
        name,
        buildParts: {
          create: partIds.map(partId => ({
            part: { connect: { id: partId } }
          }))
        }
      },
      include: {
        buildParts: {
          include: { part: true }
        }
      }
    });
  }

  async findBuildsByUser(userId: number) {
    return await prisma.build.findMany({
      where: { userId },
      include: {
        buildParts: {
          include: { part: true }
        }
      }
    });
  }
}
