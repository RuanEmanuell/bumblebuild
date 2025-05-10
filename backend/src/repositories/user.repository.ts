import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export class UserRepository {

  async create(dados: Prisma.UserCreateInput) {
    return prisma.user.create({
      data: {
        userType: dados.userType,
        name: dados.name,
        email: dados.email,
        password: dados.password,
        updatedAt : new Date()
      }
    });
  }

  async searchByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async list() {
    return prisma.user.findMany();
  }

  async searchById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  async saveRecoveryToken(userId: number, token: string, expiredAt: Date) {
    return prisma.passwordRecoveryToken.create({
      data: {
        token,
        userId,
        expiredAt,
      },
    });
  }

  async searchRecoveryToken(token: string) {
    return prisma.passwordRecoveryToken.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  async deleteRecoveryToken(token: string) {
    return prisma.passwordRecoveryToken.delete({ where: { token } });
  }

  async updatePassword(userId: number, newPassword: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { password: newPassword },
    });
  }

  async update(id: number, dados: Partial<Prisma.UserUpdateInput>) {
    return prisma.user.update ({
      where: {id},
      data: {
        ...dados,
        updatedAt: new Date()
      }
    });
  }

}
