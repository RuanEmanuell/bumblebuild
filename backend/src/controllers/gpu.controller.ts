import { Request, Response } from 'express';
import { GPUService } from '../services/gpu.service';

const gpuService = new GPUService();

export class GPUController {
  async create(req: Request, res: Response) {
    const gpu = await gpuService.createGPU(req.body);
    res.status(201).json(gpu);
  }

  async list(req: Request, res: Response) {
    const gpus = await gpuService.listGPUs();
    res.json(gpus);
  }

  async search(req: Request, res: Response) {
    const id = Number(req.params.id);
    const gpu = await gpuService.searchGPU(id);
    if (!gpu) return res.status(404).json({ erro: 'GPU não encontrada' });
    res.json(gpu);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await gpuService.updateGPU(id, req.body);
    res.json(updated);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await gpuService.deleteGPU(id);
    res.status(204).send();
  }
}
