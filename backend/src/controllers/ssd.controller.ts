import { Request, Response } from 'express';
import { SSDService } from '../services/ssd.service';
import { PartService } from '../services/part.service';

const ssdService = new SSDService();
const partService = new PartService();

export class SSDController {
  async create(req: Request, res: Response) {
    const ssd = await ssdService.createSSD(req.body);
    res.status(201).json(ssd);
  }

  async list(req: Request, res: Response) {
    const ssds = await ssdService.listSSDs();
    res.json(ssds);
  }

  async search(req: Request, res: Response) {
    const id = Number(req.params.id);
    const ssd = await ssdService.searchSSD(id);
    if (!ssd) return res.status(404).json({ erro: 'ssd não encontrada' });
    res.json(ssd);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await ssdService.updateSSD(id, req.body);
    res.json(updated);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await ssdService.deleteSSD(id);
    await partService.deletePart(id);
    res.status(204).send();
  }
}
