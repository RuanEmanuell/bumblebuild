import { Request, Response } from "express";
import { PartService } from "../services/part.service";

const partService = new PartService();

export class PartController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const novapart = await partService.createPart(req.body);
      return res.status(201).json({ message: "Peça criada com sucesso!", part: novapart });
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const parts = await partService.listParts();
      return res.status(200).json(parts);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async searchById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const part = await partService.searchById(Number(id));
      if (!part) {
        return res.status(404).json({ message: "Peça não encontrada." });
      }
      return res.status(200).json(part);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listByType(req: Request, res: Response): Promise<Response> {
    try {
      const { tipo } = req.params;
      const parts = await partService.listByType(tipo);
      return res.status(200).json(parts);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const dadosAtualizados = req.body;
      const partAtualizada = await partService.updatePart(Number(id), dadosAtualizados);
      return res.status(200).json({ message: "Peça atualizada com sucesso!", part: partAtualizada });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await partService.deletePart(Number(id));
      return res.status(200).json({ message: "Peça deletada com sucesso!" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
