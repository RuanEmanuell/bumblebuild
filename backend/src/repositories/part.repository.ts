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
      const link = data.priceLink || '';

      let price = null;
      let image = null;

      if (link) {
        const result = await this.scraperService.getPartInfo([link]); // agora retorna { price, image }
        price = result.price;
        image = result.image;
      }

      const priceNum = price
        ? parseFloat(price.replace(/[^\d,.-]/g, "").replace(",", "."))
        : 0;

      return prisma.part.create({
        data: {
          ...data,
          price: priceNum,
          imageUrl: image,
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
    const part = await prisma.part.findUnique({
      where: { id },
      select: { type: true }
    });

    if (!part) {
      throw new Error("Peça não encontrada.");
    }

    const type = part.type;

    await prisma.buildPart.deleteMany({
      where: { partId: id }
    });

    switch (type) {
      case "CPU":
        await prisma.cPU.deleteMany({ where: { id } });
        break;
      case "GPU":
        await prisma.gPU.deleteMany({ where: { id } });
        break;
      case "RAM":
        await prisma.rAM.deleteMany({ where: { id } });
        break;
      case "SSD":
        await prisma.sSD.deleteMany({ where: { id } });
        break;
      case "PSU":
        await prisma.pSU.deleteMany({ where: { id } });
        break;
      case "CASE":
        await prisma.case.deleteMany({ where: { id } });
        break;
      case "MOTHERBOARD":
        await prisma.motherboard.deleteMany({ where: { id } });
        break;
      case "COOLER":
        await prisma.cooler.deleteMany({ where: { id } });
        break;
    }

    return prisma.part.delete({ where: { id } });
  }

  async deleteSpecificTypeRelation(partId: number, type: string) {
    switch (type) {
      
        case "cpu":
          return prisma.cPU.deleteMany({ where: { id: partId } });
        case "gpu":
          return prisma.gPU.deleteMany({ where: { id: partId } });
        case "ram":
          return prisma.rAM.deleteMany({ where: { id: partId } });
        case "ssd":
          return prisma.sSD.deleteMany({ where: { id: partId } });
        case "psu":
          return prisma.pSU.deleteMany({ where: { id: partId } });
        case "case":
          return prisma.case.deleteMany({ where: { id: partId } });
        case "motherboard":
          return prisma.motherboard.deleteMany({ where: { id: partId } });
        case "cooler":
          return prisma.cooler.deleteMany({ where: { id: partId } });
        default:
          throw new Error("Tipo desconhecido para deletar relacionamento");
    }
  }

  async autoUpdatePrices() {
    try {
      const parts = await prisma.part.findMany();

      console.log(`Número de peças: ${parts.length}`);

      for (const part of parts) {
        const link = part.priceLink;

        if (!link) continue;

        const result = await this.scraperService.getPartInfo([link]); // pega preço + imagem

        const precoString = result.price;
        const image = result.image;

        if (!precoString) continue;

        const priceNum = parseFloat(
          precoString.replace(/[^\d,.-]/g, "").replace(",", ".")
        );

        if (!isNaN(priceNum)) {
          await prisma.part.update({
            where: { id: part.id },
            data: { 
              price: priceNum,
              imageUrl: image || part.imageUrl, // atualiza imagem se tiver nova
            },
          });
          console.log(`Preço da peça ${part.name} atualizado para R$ ${priceNum}`);
        }
      }
    } catch (error) {
      console.error("Erro ao atualizar preços automaticamente:", error);
    }
  }
}
