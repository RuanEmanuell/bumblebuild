import { Request, Response } from 'express';
import { GPUService } from '../services/gpu.service';

const gpuService = new GPUService();

export class GPUController {
  async criar(req: Request, res: Response) {
    const gpu = await gpuService.criarGPU(req.body);
    res.status(201).json(gpu);
  }

  async listar(req: Request, res: Response) {
    const gpus = await gpuService.listarGPUs();
    res.json(gpus);
  }

  async buscar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const gpu = await gpuService.buscarGPU(id);
    if (!gpu) return res.status(404).json({ erro: 'GPU não encontrada' });
    res.json(gpu);
  }

  async atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const atualizada = await gpuService.atualizarGPU(id, req.body);
    res.json(atualizada);
  }

  async deletar(req: Request, res: Response) {
    const id = Number(req.params.id);
    await gpuService.deletarGPU(id);
    res.status(204).send();
  }
}
