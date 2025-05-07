import { Request, Response } from 'express';
import { SSDService } from '../services/ssd.service';

const ssdService = new SSDService();

export class SSDController {
  async criar(req: Request, res: Response) {
    const ssd = await ssdService.criarSSD(req.body);
    res.status(201).json(ssd);
  }

  async listar(req: Request, res: Response) {
    const ssds = await ssdService.listarSSDs();
    res.json(ssds);
  }

  async buscar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const ssd = await ssdService.buscarSSD(id);
    if (!ssd) return res.status(404).json({ erro: 'ram não encontrada' });
    res.json(ssd);
  }

  async atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const atualizada = await ssdService.atualizarSSD(id, req.body);
    res.json(atualizada);
  }

  async deletar(req: Request, res: Response) {
    const id = Number(req.params.id);
    await ssdService.deletarSSD(id);
    res.status(204).send();
  }
}
