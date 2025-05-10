import { PartRepository } from "../repositories/part.repository";
import { Prisma } from "@prisma/client";

const partRepository = new PartRepository();

export class PartService {
  async createPart(data: Prisma.PartCreateInput) {
    try {
      const newPart = await partRepository.create(data);
      return newPart;
    } catch (err) {
      throw new Error("Erro ao criar peça:" + err);
    }
  }

  async listParts() {
    return await partRepository.list();
  }

  async searchById(id: number) {
    const part = await partRepository.searchById(id);
    if (!part) throw new Error("Peça não encontrada");
    return part;
  }

  async listByType(tipo: string) {
    return await partRepository.listByType(tipo.toUpperCase());
  }

  async updatePart(id: number, data: Prisma.PartUpdateInput) {
    const existent = await partRepository.searchById(id);
    if (!existent) throw new Error("Peça não encontrada para atualizar");

    return await partRepository.update(id, data);
  }

  async deletePart(id: number) {
    const existent = await partRepository.searchById(id);
    if (!existent) throw new Error("Peça não encontrada para deletar");

    return await partRepository.delete(id);
  }
}
