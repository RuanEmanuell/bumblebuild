import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function autenticarToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    if (!process.env.SECRET_JWT) throw new Error("SECRET_JWT não definido!");

    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    (req as any).usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}
