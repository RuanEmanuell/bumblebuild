import { Request, Response } from 'express';
import { RAMService } from '../services/ram.service';

const ramService = new RAMService();

export class RAMController {
  async criar(req: Request, res: Response) {
    const ram = await ramService.criarRAM(req.body);
    res.status(201).json(ram);
  }

  async listar(req: Request, res: Response) {
    const rams = await ramService.listarRAMs();
    res.json(rams);
  }

  async buscar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const ram = await ramService.buscarRAM(id);
    if (!ram) return res.status(404).json({ erro: 'ram não encontrada' });
    res.json(ram);
  }

  async atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const atualizada = await ramService.atualizarRAM(id, req.body);
    res.json(atualizada);
  }

  async deletar(req: Request, res: Response) {
    const id = Number(req.params.id);
    await ramService.deletarRAM(id);
    res.status(204).send();
  }
}
