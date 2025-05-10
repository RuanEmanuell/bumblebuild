import { suggestConfigurationWithBudget } from "../../src/services/suggest.service";
import { PartType } from "../../src/utils/distributeBudget";
import { Part } from "../../src/models/part.model";

describe("suggestConfigurationWithBudget", () => {
    const pecasMock: Part[] = [
        // CPUs
        {
          name: "Ryzen 5 5600",
          price: 700,
          type: "CPU",
          marca: "AMD",
          cpu: { socket: "AM4", line: "Ryzen", id: 1, name: "" }
        },
        {
          name: "Intel i5 10400F",
          price: 650,
          type: "CPU",
          marca: "Intel",
          cpu: { socket: "LGA1200", line: "Core", id: 2, name: "" }
        },
      
        // Placas-Mãe
        {
          name: "Placa-Mãe B450",
          price: 500,
          type: "MOTHERBOARD",
          marca: "ASUS",
          placaMae: {
            socket: "AM4",
            compatibilidadelineCpu: ["Ryzen"],
            typeRAM: "DDR5",
            tamanho: "ATX",
            id: 1,
            name: "",
            chipset: "",
            slots: 0
          }
        },
        {
          name: "Placa-Mãe H410",
          price: 350,
          type: "MOTHERBOARD",
          marca: "Gigabyte",
          placaMae: {
            socket: "LGA1200",
            compatibilidadelineCpu: ["Core"],
            typeRAM: "DDR4",
            tamanho: "mATX",
            id: 2,
            name: "",
            chipset: "",
            slots: 0
          }
        },
      
        // RAM
        {
          name: "Memória DDR4 16GB",
          price: 300,
          type: "RAM",
          marca: "Kingston",
          ram: { type: "DDR4", frequency: 3200, id: 1, capacityGB: 16 }
        },
        {
          name: "Memória DDR5 16GB",
          price: 500,
          type: "RAM",
          marca: "Corsair",
          ram: { type: "DDR5", frequency: 4800, id: 2, capacityGB: 16 }
        },
      
        // GPU
        {
          name: "GeForce RTX 3060",
          price: 1400,
          type: "GPU",
          marca: "NVIDIA",
          gpu: {
            tdp: 170,
            lengthMM: 240,
            id: 1,
            memoryGB: 12,
            memoryType: "GDDR6"
          }
        },
        {
          name: "GeForce GTX 1650",
          price: 900,
          type: "GPU",
          marca: "NVIDIA",
          gpu: {
            tdp: 75,
            lengthMM: 180,
            id: 2,
            memoryGB: 4,
            memoryType: "GDDR5"
          }
        },
      
        // Fonte
        {
          name: "Fonte 600W",
          price: 300,
          type: "FONTE",
          marca: "Corsair",
          fonte: { potenciaW: 650, id: 1, certificacao: "80 Plus Bronze", modular: false }
        },
        {
          name: "Fonte 450W",
          price: 150,
          type: "FONTE",
          marca: "EVGA",
          fonte: { potenciaW: 450, id: 2, certificacao: "80 Plus White", modular: false }
        },
      
        // Gabinete
        {
          name: "Gabinete ATX",
          price: 200,
          type: "GABINETE",
          marca: "CoolerMaster",
          gabinete: { tamanhoSuportado: ["ATX"], comprimentoMaximoGpuMM: 300, id: 1 }
        },
        {
          name: "Gabinete Mini-ITX",
          price: 180,
          type: "GABINETE",
          marca: "Thermaltake",
          gabinete: { tamanhoSuportado: ["Mini-ITX"], comprimentoMaximoGpuMM: 200, id: 2 }
        },
      
        // SSD
        {
          name: "SSD 512GB",
          price: 150,
          type: "SSD",
          marca: "Crucial",
          ssd: {
            capacityGB: 512,
            type: "SATA",
            leituraMBs: 500,
            escritaMBs: 450,
            id: 1
          }
        },
        {
          name: "SSD NVMe 1TB",
          price: 400,
          type: "SSD",
          marca: "Samsung",
          ssd: {
            capacityGB: 1000,
            type: "NVMe",
            leituraMBs: 3500,
            escritaMBs: 3000,
            id: 2
          }
        }
      ];
      

  it("deve retornar uma configuração válida dentro do orçamento", () => {
    const orcamento = 5000;

    const resultado = suggestConfigurationWithBudget(pecasMock, orcamento);

    expect(resultado.configuracao.length).toBeGreaterThan(0);
    expect(resultado.mensagem).toBeUndefined();
  });

  it("deve retornar mensagem de erro se passar do orçamento", () => {
    const orcamento = 1000; 

    const resultado = suggestConfigurationWithBudget(pecasMock, orcamento);

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

    const resultado = suggestConfigurationWithBudget(pecasIncompativeis, 4000);

    expect(resultado.configuracao).toHaveLength(0);
    expect(resultado.mensagem).toBe("CPU e Placa-Mãe incompatíveis");
  });
});
