import { Request, Response } from 'express';
import { CPUService } from '../services/cpu.service';

const service = new CPUService();

export class CPUController {
  async create(req: Request, res: Response) {
    const cpu = await service.createCPU(req.body);
    res.status(201).json(cpu);
  }

  async list(req: Request, res: Response) {
    const cpus = await service.listCPUs();
    res.json(cpus);
  }

  async search(req: Request, res: Response) {
    const id = Number(req.params.id);
    const cpu = await service.searchCPU(id);
    if (!cpu) return res.status(404).json({ erro: 'CPU não encontrada' });
    res.json(cpu);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await service.updateCPU(id, req.body);
    res.json(updated);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await service.deleteCPU(id);
    res.status(204).send();
  }
}
