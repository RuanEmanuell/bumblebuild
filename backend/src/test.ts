import { Request, Response } from "express";

function teste(req: Request, res: Response) {
  console.log(req.user?.id);
}
