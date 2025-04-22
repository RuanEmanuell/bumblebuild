import { sugerirConfiguracaoComOrcamento } from "../../src/services/sugestao.service";
import { TipoPeca } from "../../src/utils/distribuicaoOrcamento";
import { Peca } from "../../src/models/peca.model";

describe("sugerirConfiguracaoComOrcamento", () => {
    const pecasMock: Peca[] = [
        // CPUs
        {
          nome: "Ryzen 5 5600",
          preco: 700,
          tipo: "CPU",
          marca: "AMD",
          cpu: { socket: "AM4", linha: "Ryzen", id: 1, nome: "" }
        },
        {
          nome: "Intel i5 10400F",
          preco: 650,
          tipo: "CPU",
          marca: "Intel",
          cpu: { socket: "LGA1200", linha: "Core", id: 2, nome: "" }
        },
      
        // Placas-Mãe
        {
          nome: "Placa-Mãe B450",
          preco: 500,
          tipo: "PLACA_MAE",
          marca: "ASUS",
          placaMae: {
            socket: "AM4",
            compatibilidadeLinhaCpu: ["Ryzen"],
            tipoRAM: "DDR5",
            tamanho: "ATX",
            id: 1,
            nome: "",
            chipset: "",
            slots: 0
          }
        },
        {
          nome: "Placa-Mãe H410",
          preco: 350,
          tipo: "PLACA_MAE",
          marca: "Gigabyte",
          placaMae: {
            socket: "LGA1200",
            compatibilidadeLinhaCpu: ["Core"],
            tipoRAM: "DDR4",
            tamanho: "mATX",
            id: 2,
            nome: "",
            chipset: "",
            slots: 0
          }
        },
      
        // RAM
        {
          nome: "Memória DDR4 16GB",
          preco: 300,
          tipo: "RAM",
          marca: "Kingston",
          ram: { tipo: "DDR4", frequencia: 3200, id: 1, capacidadeGB: 16 }
        },
        {
          nome: "Memória DDR5 16GB",
          preco: 500,
          tipo: "RAM",
          marca: "Corsair",
          ram: { tipo: "DDR5", frequencia: 4800, id: 2, capacidadeGB: 16 }
        },
      
        // GPU
        {
          nome: "GeForce RTX 3060",
          preco: 1400,
          tipo: "GPU",
          marca: "NVIDIA",
          gpu: {
            tdp: 170,
            comprimentoMM: 240,
            id: 1,
            memoriaGB: 12,
            tipoMemoria: "GDDR6"
          }
        },
        {
          nome: "GeForce GTX 1650",
          preco: 900,
          tipo: "GPU",
          marca: "NVIDIA",
          gpu: {
            tdp: 75,
            comprimentoMM: 180,
            id: 2,
            memoriaGB: 4,
            tipoMemoria: "GDDR5"
          }
        },
      
        // Fonte
        {
          nome: "Fonte 600W",
          preco: 300,
          tipo: "FONTE",
          marca: "Corsair",
          fonte: { potenciaW: 650, id: 1, certificacao: "80 Plus Bronze", modular: false }
        },
        {
          nome: "Fonte 450W",
          preco: 150,
          tipo: "FONTE",
          marca: "EVGA",
          fonte: { potenciaW: 450, id: 2, certificacao: "80 Plus White", modular: false }
        },
      
        // Gabinete
        {
          nome: "Gabinete ATX",
          preco: 200,
          tipo: "GABINETE",
          marca: "CoolerMaster",
          gabinete: { tamanhoSuportado: ["ATX"], comprimentoMaximoGpuMM: 300, id: 1 }
        },
        {
          nome: "Gabinete Mini-ITX",
          preco: 180,
          tipo: "GABINETE",
          marca: "Thermaltake",
          gabinete: { tamanhoSuportado: ["Mini-ITX"], comprimentoMaximoGpuMM: 200, id: 2 }
        },
      
        // SSD
        {
          nome: "SSD 512GB",
          preco: 150,
          tipo: "SSD",
          marca: "Crucial",
          ssd: {
            capacidadeGB: 512,
            tipo: "SATA",
            leituraMBs: 500,
            escritaMBs: 450,
            id: 1
          }
        },
        {
          nome: "SSD NVMe 1TB",
          preco: 400,
          tipo: "SSD",
          marca: "Samsung",
          ssd: {
            capacidadeGB: 1000,
            tipo: "NVMe",
            leituraMBs: 3500,
            escritaMBs: 3000,
            id: 2
          }
        }
      ];
      

  it("deve retornar uma configuração válida dentro do orçamento", () => {
    const orcamento = 5000;

    const resultado = sugerirConfiguracaoComOrcamento(pecasMock, orcamento);

    expect(resultado.configuracao.length).toBeGreaterThan(0);
    expect(resultado.mensagem).toBeUndefined();
  });

  it("deve retornar mensagem de erro se passar do orçamento", () => {
    const orcamento = 1000; 

    const resultado = sugerirConfiguracaoComOrcamento(pecasMock, orcamento);

    expect(resultado.configuracao).toHaveLength(0);
    expect(resultado.mensagem).toContain("Não há");
  });

  it("deve detectar CPU e Placa-Mãe incompatíveis", () => {
    const pecasIncompativeis = [...pecasMock];
    pecasIncompativeis[1] = {
      ...pecasIncompativeis[1],
      placaMae: {
        ...pecasIncompativeis[1].placaMae!,
        socket: "LGA1200" // socket diferente
      }
    };

    const resultado = sugerirConfiguracaoComOrcamento(pecasIncompativeis, 4000);

    expect(resultado.configuracao).toHaveLength(0);
    expect(resultado.mensagem).toBe("CPU e Placa-Mãe incompatíveis");
  });
});
