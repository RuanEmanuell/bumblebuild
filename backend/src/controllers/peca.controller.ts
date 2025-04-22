import { Request, Response } from "express";
import { PecaService } from "../services/peca.service";

const pecaService = new PecaService();

export class PecaController {
  async criarPeca(req: Request, res: Response): Promise<Response> {
    try {
      const novaPeca = await pecaService.criarPeca(req.body);
      return res.status(201).json({ message: "Peça criada com sucesso!", peca: novaPeca });
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  }

  async listarPecas(req: Request, res: Response): Promise<Response> {
    try {
      const pecas = await pecaService.listarPecas();
      return res.status(200).json(pecas);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async buscarPorId(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const peca = await pecaService.buscarPorId(Number(id));
      if (!peca) {
        return res.status(404).json({ message: "Peça não encontrada." });
      }
      return res.status(200).json(peca);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listarPorTipo(req: Request, res: Response): Promise<Response> {
    try {
      const { tipo } = req.params;
      const pecas = await pecaService.listarPorTipo(tipo);
      return res.status(200).json(pecas);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async atualizarPeca(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const dadosAtualizados = req.body;
      const pecaAtualizada = await pecaService.atualizarPeca(Number(id), dadosAtualizados);
      return res.status(200).json({ message: "Peça atualizada com sucesso!", peca: pecaAtualizada });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deletarPeca(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await pecaService.deletarPeca(Number(id));
      return res.status(200).json({ message: "Peça deletada com sucesso!" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
