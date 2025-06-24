import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { blackListToken } from "../middlewares/authMiddleware";
import { randomUUID } from "crypto";
import nodemailer from "nodemailer";
import { Prisma } from "@prisma/client";
import { UserType } from "@prisma/client";
import sgTransport from "nodemailer-sendgrid";

const userRepository = new UserRepository();

export class UserService {
  async createUser(
    userType: UserType,
    name: string,
    email: string,
    password: string
  ) {
    const userExistent = await userRepository.searchByEmail(email);
    if (userExistent) throw new Error("Email já cadastrado.");

    const encryptedPassword = await bcrypt.hash(password, 10);

    const novouser = await userRepository.create({
      userType,
      name,
      email,
      password: encryptedPassword,
    });
    return novouser;
  }

  async login(email: string, password: string) {
    const user = await userRepository.searchByEmail(email);
    if (!user) throw new Error("Credenciais inválidas");

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) throw new Error("Credenciais inválidas");

    if (!process.env.SECRET_JWT) throw new Error("SECRET_JWT não definido!");

    const token = jwt.sign(
      { id: user.id, email: user.email, userType: user.userType },
      process.env.SECRET_JWT,
      { expiresIn: "1h" }
    );
    return token;
  }

  async logout(token: string): Promise<string> {
    try {
      blackListToken(token);
      return "Logout realizado com sucesso!";
    } catch (error) {
      throw new Error(
        "Erro ao tentar realizar o logout. Tente novamente mais tarde."
      );
    }
  }

  async updateUser(
    id: number,
    data: Prisma.UserUpdateInput,
    file?: Express.Multer.File
  ) {
    if (data.email) {
      const existingUser = await userRepository.searchByEmail(
        data.email as string
      );
      if (existingUser && existingUser.id !== id) {
        throw new Error("Email already registered.");
      }
    }

    if (data.password) {
      await this.updatePassword(id, data.password as string);
      delete data.password;
    }

    if (file) {
      data.profilePictureUrl = file.filename;
    }

    data.updatedAt = new Date();

    const updatedUser = await userRepository.update(id, data);
    return updatedUser;
  }

  async updatePassword(id: number, newPassword: string) {
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    return await userRepository.updatePassword(id, encryptedPassword);
  }

  async requestPasswordRecovery(email: string) {
    const user = await userRepository.searchByEmail(email);
    if (!user) throw new Error("User not found.");

    const token = randomUUID();
    const expiration = new Date(Date.now() + 30 * 60 * 1000);

    await userRepository.saveRecoveryToken(user.id, token, expiration);

    const link = `http://localhost:5173/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport(
      sgTransport({
        apiKey: process.env.SENDGRID_API_KEY!,
      })
    );

    await transporter.sendMail({
      from: "bumblebuild2@gmail.com",
      to: email,
      subject: "Password Recovery",
      html: `<p>Click the link to reset your password:</p><a href="${link}">${link}</a>`,
    });

    return "Password recovery email sent successfully!";
  }

  async resetPassword(token: string, newPassword: string) {
    const tokenInfo = await userRepository.searchRecoveryToken(token);
    if (!tokenInfo) throw new Error("Invalid or expired token.");

    const now = new Date();
    if (tokenInfo.expiredAt < now) throw new Error("Token expired.");

    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    await userRepository.updatePassword(tokenInfo.userId, encryptedPassword);

    await userRepository.deleteRecoveryToken(token);

    return "Password reset successfully!";
  }

  //buscar usuário pelo token
  async searchLoggedUser(token: string) {
    if (!process.env.SECRET_JWT) throw new Error("SECRET_JWT não definido!");

    const decoded = jwt.verify(token, process.env.SECRET_JWT as string) as {
      id: number;
    };
    const user = await userRepository.searchById(decoded.id);
    if (!user) throw new Error("Usuário não encontrado");

    return user;
  }
}
