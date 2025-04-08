import { PecaRepository } from "../repositories/peca.repository";
import { Prisma } from "@prisma/client";

const pecaRepository = new PecaRepository();

export class PecaService {
  async criarPeca(dados: Prisma.PecaCreateInput) {
    try {
      const novaPeca = await pecaRepository.criarPeca(dados);
      return novaPeca;
    } catch (err) {
      throw new Error("Erro ao criar peça: " + err.message);
    }
  }

  async listarPecas() {
    return await pecaRepository.listarPecas();
  }

  async buscarPorId(id: number) {
    const peca = await pecaRepository.buscarPorId(id);
    if (!peca) throw new Error("Peça não encontrada");
    return peca;
  }

  async listarPorTipo(tipo: string) {
    return await pecaRepository.listarPorTipo(tipo.toUpperCase());
  }

  async atualizarPeca(id: number, dados: Prisma.PecaUpdateInput) {
    const existente = await pecaRepository.buscarPorId(id);
    if (!existente) throw new Error("Peça não encontrada para atualizar");

    return await pecaRepository.atualizarPeca(id, dados);
  }

  async deletarPeca(id: number) {
    const existente = await pecaRepository.buscarPorId(id);
    if (!existente) throw new Error("Peça não encontrada para deletar");

    return await pecaRepository.deletarPeca(id);
  }
}
