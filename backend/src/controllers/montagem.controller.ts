import { Request, Response } from "express";
import { MontagemService } from "../services/montagem.service";

const montagemService = new MontagemService();

export class MontagemController {

  async criarMontagem(req: Request, res: Response): Promise<Response> {
    try {
      const novaMontagem = await montagemService.criarMontagem(req.body);
      return res.status(201).json({ message: "Montagem criada com sucesso!", montagem: novaMontagem });
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  }
}
