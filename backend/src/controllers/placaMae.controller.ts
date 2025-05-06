import { Request, Response } from 'express';
import { PlacaMaeService } from '../services/placaMae.service';

const placaMaeService = new PlacaMaeService();

export class PlacaMaeController {
  async criar(req: Request, res: Response) {
    const placaMae = await placaMaeService.criarPlacaMae(req.body);
    res.status(201).json(placaMae);
  }

  async listar(req: Request, res: Response) {
    const placaMaes = await placaMaeService.listarPlacaMaes();
    res.json(placaMaes);
  }

  async buscar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const placaMae = await placaMaeService.buscarPlacaMae(id);
    if (!placaMae) return res.status(404).json({ erro: 'ram não encontrada' });
    res.json(placaMae);
  }

  async atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const atualizada = await placaMaeService.atualizarPlacaMae(id, req.body);
    res.json(atualizada);
  }

  async deletar(req: Request, res: Response) {
    const id = Number(req.params.id);
    await placaMaeService.deletarPlacaMae(id);
    res.status(204).send();
  }
}
