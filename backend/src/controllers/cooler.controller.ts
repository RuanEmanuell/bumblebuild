import { Request, Response } from 'express';
import { CoolerService } from '../services/cooler.service';

const coolerService = new CoolerService();

export class CoolerController {
  async criar(req: Request, res: Response) {
    const cooler = await coolerService.criarCooler(req.body);
    res.status(201).json(cooler);
  }

  async listar(req: Request, res: Response) {
    const coolers = await coolerService.listarCoolers();
    res.json(coolers);
  }

  async buscar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const cooler = await coolerService.buscarCooler(id);
    if (!cooler) return res.status(404).json({ erro: 'ram não encontrada' });
    res.json(cooler);
  }

  async atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const atualizada = await coolerService.atualizarCooler(id, req.body);
    res.json(atualizada);
  }

  async deletar(req: Request, res: Response) {
    const id = Number(req.params.id);
    await coolerService.deletarCooler(id);
    res.status(204).send();
  }
}
