import { Request, Response } from 'express';
import { CPUService } from '../services/cpu.service';

const service = new CPUService();

export class CPUController {
  async criar(req: Request, res: Response) {
    const cpu = await service.criarCPU(req.body);
    res.status(201).json(cpu);
  }

  async listar(req: Request, res: Response) {
    const cpus = await service.listarCPUs();
    res.json(cpus);
  }

  async buscar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const cpu = await service.buscarCPU(id);
    if (!cpu) return res.status(404).json({ erro: 'CPU não encontrada' });
    res.json(cpu);
  }

  async atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const atualizada = await service.atualizarCPU(id, req.body);
    res.json(atualizada);
  }

  async deletar(req: Request, res: Response) {
    const id = Number(req.params.id);
    await service.deletarCPU(id);
    res.status(204).send();
  }
}
