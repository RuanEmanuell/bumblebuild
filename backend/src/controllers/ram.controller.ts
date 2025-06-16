import { Request, Response } from 'express';
import { RAMService } from '../services/ram.service';
import { PartService } from '../services/part.service';

const ramService = new RAMService();
const partService = new PartService();

export class RAMController {
  async create(req: Request, res: Response) {
    const ram = await ramService.createRAM(req.body);
    res.status(201).json(ram);
  }

  async list(req: Request, res: Response) {
    const rams = await ramService.listRAMs();
    res.json(rams);
  }

  async search(req: Request, res: Response) {
    const id = Number(req.params.id);
    const ram = await ramService.searchRAM(id);
    if (!ram) return res.status(404).json({ erro: 'ram não encontrada' });
    res.json(ram);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await ramService.updateRAM(id, req.body);
    res.json(updated);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await ramService.deleteRAM(id);
    await partService.deletePart(id);
    res.status(204).send();
  }
}
