import { Request, Response } from 'express';
import { CoolerService } from '../services/cooler.service';

const coolerService = new CoolerService();

export class CoolerController {
  async create(req: Request, res: Response) {
    const cooler = await coolerService.createCooler(req.body);
    res.status(201).json(cooler);
  }

  async list(req: Request, res: Response) {
    const coolers = await coolerService.listCoolers();
    res.json(coolers);
  }

  async search(req: Request, res: Response) {
    const id = Number(req.params.id);
    const cooler = await coolerService.searchCooler(id);
    if (!cooler) return res.status(404).json({ erro: 'cooler não encontrado' });
    res.json(cooler);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await coolerService.updateCooler(id, req.body);
    res.json(updated);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await coolerService.deleteCooler(id);
    res.status(204).send();
  }
}
