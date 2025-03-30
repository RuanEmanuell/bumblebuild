import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UsuarioService } from "../services/usuario.service";
import { blackListToken } from "../middlewares/authMiddleware";

const prisma = new PrismaClient();
const usuarioService = new UsuarioService();

export class UsuarioController {
  criaUsuario = async (req: Request, res: Response) => {
    try {
      const { tipo_usuario, nome, email, senha } = req.body;
      await new UsuarioService().criarUsuario(tipo_usuario, nome, email, senha);
      return res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  loginUsuario = async (req: Request, res: Response) => {
    try {
      const { email, senha } = req.body;
      const token = await new UsuarioService().login(email, senha);
      return res.status(200).json({ message: "Login bem-sucedido!", token });
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  };

  async logoutUsuario(req: Request, res: Response): Promise<Response> {
    const token = req.headers.authorization?.split(" ")[1];
    
    try {
      if (!token) {
        return res.status(400).json({ message: "Token não fornecido. Não foi possível realizar o logout." });
      }

      const mensagem = await usuarioService.logout(token);

      return res.status(200).json({ message: mensagem }); 
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: error.message || "Erro inesperado. Tente novamente mais tarde." });
    }
  }


  editUsuario = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { tipo_usuario, nome, email, senha } = req.body;
      await new UsuarioService().editUsuario(Number(id), tipo_usuario, nome, email, senha);
      return res.status(200).json({ message: "Usuário editado com sucesso!" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }


}

