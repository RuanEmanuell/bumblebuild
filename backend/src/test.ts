import { Request, Response } from "express";

function teste(req: Request, res: Response) {
  console.log(req.usuario?.id); // Veja se aqui já dá erro ou não
}
