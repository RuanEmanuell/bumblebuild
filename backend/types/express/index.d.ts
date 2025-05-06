// /types/express/index.d.ts
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: number;
        email: string;
        tipo_usuario: string;
        nome: string;
      };
    }
  }
}

export {};
