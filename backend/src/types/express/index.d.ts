import { JwtPayload } from "jsonwebtoken";

declare namespace Express {
    export interface Request {
      usuario?: {
        id: number;
        email: string;
        tipo_usuario: string;
        nome: string;
      };
    }
  }
  
