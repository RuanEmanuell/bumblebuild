import { MontagemRepository } from "../repositories/montagem.repository";
import { Prisma } from "@prisma/client";

const montagemRepository = new MontagemRepository();

export class MontagemService {

  async criarMontagem(dados: Prisma.MontagemCreateInput) {
    try {
      const novaMontagem = await montagemRepository.criarMontagem(dados);
      return novaMontagem; 
    } catch (err) {
      throw new Error("Erro ao criar montagem: " + err);
    }
  }
}
