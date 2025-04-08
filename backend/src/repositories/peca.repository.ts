import { PrismaClient, Prisma, $Enums } from "@prisma/client";

const prisma = new PrismaClient();

export class PecaRepository {
  async criarPeca(dados: Prisma.PecaCreateInput) {
    return prisma.peca.create({
      data: dados,
      include: {
        cpu: true,
        gpu: true,
        ram: true,
        ssd: true,
        fonte: true,
        gabinete: true,
        placaMae: true,
        cooler: true,
      },
    });
  }

  async listarPecas() {
    return prisma.peca.findMany({
      include: {
        cpu: true,
        gpu: true,
        ram: true,
        ssd: true,
        fonte: true,
        gabinete: true,
        placaMae: true,
        cooler: true,
      },
    });
  }

  async buscarPorId(id: number) {
    return prisma.peca.findUnique({
      where: { id },
      include: {
        cpu: true,
        gpu: true,
        ram: true,
        ssd: true,
        fonte: true,
        gabinete: true,
        placaMae: true,
        cooler: true,
      },
    });
  }

  async listarPorTipo(tipo: string) {
    const tipoUpper = tipo.toUpperCase();

    // Validação opcional, mas recomendada
    if (!Object.values($Enums.TipoPeca).includes(tipoUpper as $Enums.TipoPeca)) {
      throw new Error("Tipo de peça inválido");
    }

    return prisma.peca.findMany({
      where: {
        tipo: tipoUpper as $Enums.TipoPeca,
      },
      include: {
        cpu: true,
        gpu: true,
        ram: true,
        ssd: true,
        fonte: true,
        gabinete: true,
        placaMae: true,
        cooler: true,
      },
    });
  }

  async atualizarPeca(id: number, dados: Prisma.PecaUpdateInput) {
    return prisma.peca.update({
      where: { id },
      data: dados,
      include: {
        cpu: true,
        gpu: true,
        ram: true,
        ssd: true,
        fonte: true,
        gabinete: true,
        placaMae: true,
        cooler: true,
      },
    });
  }

  async deletarPeca(id: number) {
    return prisma.peca.delete({ where: { id } });
  }
}
