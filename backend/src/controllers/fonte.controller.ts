import { Request, Response } from 'express';
import { FonteService } from '../services/fonte.service';

const fonteService = new FonteService();

export class FonteController {
  async criar(req: Request, res: Response) {
    const fonte = await fonteService.criarFonte(req.body);
    res.status(201).json(fonte);
  }

  async listar(req: Request, res: Response) {
    const fontes = await fonteService.listarfontes();
    res.json(fontes);
  }

  async buscar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const fonte = await fonteService.buscarFonte(id);
    if (!fonte) return res.status(404).json({ erro: 'ram não encontrada' });
    res.json(fonte);
  }

  async atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const atualizada = await fonteService.atualizarFonte(id, req.body);
    res.json(atualizada);
  }

  async deletar(req: Request, res: Response) {
    const id = Number(req.params.id);
    await fonteService.deletarFonte(id);
    res.status(204).send();
  }
}
