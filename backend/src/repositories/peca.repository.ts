import { PrismaClient, Prisma, $Enums } from "@prisma/client";
import { ScraperService } from "../services/scraper.service";

const prisma = new PrismaClient();

export class PecaRepository {
  private scraperService: ScraperService;

  constructor() {
    this.scraperService = new ScraperService(); // Instanciando o ScraperService
  }

  async criarPeca(dados: Prisma.PecaCreateInput) {
    try {
      // Verificando se temos o link de preço (caso seja um único link)
      const linkData : any = dados.linksPreco;

      console.log(dados.linksPreco);

      let link = linkData[0] || '';


      let preco = null;
      if (link) {
        preco = await this.scraperService.pegarPrecoPeca([link]);
      }

      console.log(link);

      const precoNumerico = preco
                          ? parseFloat(preco.replace(/[^\d,.-]/g, "").replace(",", "."))
                          : 0;


      // Criar a peça com o preço já obtido
      return prisma.peca.create({
        data: {
          ...dados,
          preco: precoNumerico, // Preço já incluído
          linksPreco: {
            create: dados.linksPreco?.create ?? [], // Criando o link de preço
          },
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
          linksPreco: true,
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
        linksPreco: true,
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
        linksPreco: true,
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
        linksPreco: true,
      },
    });
  }

  async atualizarPeca(id: number, dados: Prisma.PecaUpdateInput) {
    const { linksPreco, ...dadosRestantes } = dados;

    return prisma.peca.update({
      where: { id },
      data: {
        ...dadosRestantes,
        linksPreco: {
          deleteMany: {},
          create: linksPreco?.create ?? [],
        },
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
        linksPreco: true,
      },
    });
  }

  async deletarPeca(id: number) {
    return prisma.peca.delete({ where: { id } });
  }
}
