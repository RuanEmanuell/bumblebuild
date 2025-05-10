import { PrismaClient, Prisma, $Enums } from "@prisma/client";
import { ScraperService } from "../services/scraper.service";

const prisma = new PrismaClient();

export class PartRepository {
  private scraperService: ScraperService;

  constructor() {
    this.scraperService = new ScraperService(); 
  }

  async create(data: Prisma.PartCreateInput) {
    try {
      let link = '';

      link = data.priceLink || ''; 
  
      console.log(link);
  
      let price = null;
      if (link) {
        price = await this.scraperService.getPartPrice([link]);
      }
  
      const priceNum = price
        ? parseFloat(price.replace(/[^\d,.-]/g, "").replace(",", "."))
        : 0;
  
      return prisma.part.create({
        data: {
          ...data,
          price: priceNum,
          priceLink: link, 
        },
        include: {
          cpu: true,
          gpu: true,
          ram: true,
          ssd: true,
          psu: true,
          case: true,
          motherboard: true,
          cooler: true,
        },
      });
    } catch (error) {
      console.error("Erro ao criar peça:", error);
      throw error;
    }
  }

  async list() {
    return prisma.part.findMany({
      include: {
        cpu: true,
        gpu: true,
        ram: true,
        ssd: true,
        psu: true,
        case: true,
        motherboard: true,
        cooler: true,
      },
    });
  }

  async searchById(id: number) {
    return prisma.part.findUnique({
      where: { id },
      include: {
        cpu: true,
        gpu: true,
        ram: true,
        ssd: true,
        psu: true,
        case: true,
        motherboard: true,
        cooler: true,
      },
    });
  }

  async listByType(tipo: string) {
    const typeUpper = tipo.toUpperCase();

    if (!Object.values($Enums.PartType).includes(typeUpper as $Enums.PartType)) {
      throw new Error("Tipo de peça inválido");
    }

    return prisma.part.findMany({
      where: {
        type: typeUpper as $Enums.PartType,
      },
      include: {
        cpu: true,
        gpu: true,
        ram: true,
        ssd: true,
        psu: true,
        case: true,
        motherboard: true,
        cooler: true,
      },
    });
  }

  async update(id: number, dados: Prisma.PartUpdateInput) {
    return prisma.part.update({
      where: { id },
      data: dados,
      include: {
        cpu: true,
        gpu: true,
        ram: true,
        ssd: true,
        psu: true,
        case: true,
        motherboard: true,
        cooler: true,
      },
    });
  }

  async delete(id: number) {
    return prisma.part.delete({ where: { id } });
  }

  async autoUpdatePrices() {
    try {
      const parts = await prisma.part.findMany();

      console.log(`Número de peças: ${parts.length}`)
  
      for (const part of parts) {
        const link = part.priceLink; 
  
        if (!link) continue;
  
        const precoString = await this.scraperService.getPartPrice([link]);
  
        if (!precoString) continue;
  
        const priceNum = parseFloat(precoString.replace(/[^\d,.-]/g, "").replace(",", "."));
        if (!isNaN(priceNum)) {
          await prisma.part.update({
            where: { id: part.id },
            data: { price: priceNum },
          });
          console.log(`Preço da peça ${part.name} atualizado para R$ ${priceNum}`);
        }
      }
    } catch (error) {
      console.error("Erro ao atualizar preços automaticamente:", error);
    }
  }

}