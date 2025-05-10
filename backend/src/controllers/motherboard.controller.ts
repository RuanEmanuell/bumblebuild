import { Request, Response } from 'express';
import { MotherboardService } from '../services/motherboard.service';

const motherboardService = new MotherboardService();

export class MotherboardController {
  async create(req: Request, res: Response) {
    const motherboard = await motherboardService.createMotherboard(req.body);
    res.status(201).json(motherboard);
  }

  async list(req: Request, res: Response) {
    const motherboards = await motherboardService.listMotherboard();
    res.json(motherboards);
  }

  async search(req: Request, res: Response) {
    const id = Number(req.params.id);
    const motherboard = await motherboardService.searchMotherboard(id);
    if (!motherboard) return res.status(404).json({ erro: 'placa mãe não encontrada' });
    res.json(motherboard);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await motherboardService.updateMotherboard(id, req.body);
    res.json(updated);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await motherboardService.deleteMotherboard(id);
    res.status(204).send();
  }
}
