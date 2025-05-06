import { PrismaClient, Prisma, $Enums } from "@prisma/client";
import { ScraperService } from "../services/scraper.service";

const prisma = new PrismaClient();

export class PecaRepository {
  private scraperService: ScraperService;

  constructor() {
    this.scraperService = new ScraperService(); 
  }

  async criarPeca(dados: Prisma.PecaCreateInput) {
    try {
      let link = '';

      link = dados.linkPreco || ''; 
  
      console.log(link);
  
      let preco = null;
      if (link) {
        preco = await this.scraperService.pegarPrecoPeca([link]);
      }
  
      const precoNumerico = preco
        ? parseFloat(preco.replace(/[^\d,.-]/g, "").replace(",", "."))
        : 0;
  
      return prisma.peca.create({
        data: {
          ...dados,
          preco: precoNumerico,
          linkPreco: link, // Atribuindo o link diretamente
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
    } catch (error) {
      console.error("Erro ao criar peça:", error);
      throw error;
    }
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

  async atualizarPrecosAutomaticamente() {
    try {
      const pecas = await prisma.peca.findMany();

      console.log(`Número de peças: ${pecas.length}`)
  
      for (const peca of pecas) {
        const link = peca.linkPreco; 
  
        if (!link) continue;
  
        const precoString = await this.scraperService.pegarPrecoPeca([link]);
  
        if (!precoString) continue;
  
        const precoNumerico = parseFloat(precoString.replace(/[^\d,.-]/g, "").replace(",", "."));
        if (!isNaN(precoNumerico)) {
          await prisma.peca.update({
            where: { id: peca.id },
            data: { preco: precoNumerico },
          });
          console.log(`Preço da peça ${peca.nome} atualizado para R$ ${precoNumerico}`);
        }
      }
    } catch (error) {
      console.error("Erro ao atualizar preços automaticamente:", error);
    }
  }
}