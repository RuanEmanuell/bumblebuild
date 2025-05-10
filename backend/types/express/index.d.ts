// /types/express/index.d.ts
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        userType: string;
        name: string;
      };
    }
  }
}

export {};
