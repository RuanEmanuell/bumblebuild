import { Request, Response } from 'express';
import { PSUService } from '../services/psu.service';

const psuService = new PSUService();

export class PSUController {
  async create(req: Request, res: Response) {
    const psu = await psuService.createPSU(req.body);
    res.status(201).json(psu);
  }

  async list(req: Request, res: Response) {
    const psus = await psuService.listPSUs();
    res.json(psus);
  }

  async search(req: Request, res: Response) {
    const id = Number(req.params.id);
    const fonte = await psuService.searchPSU(id);
    if (!fonte) return res.status(404).json({ erro: 'psu não encontrada' });
    res.json(fonte);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await psuService.updatePSU(id, req.body);
    res.json(updated);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await psuService.deletePSU(id);
    res.status(204).send();
  }
}
