import { verificarCompatibilidadeGabinete } from "../../src/services/compatibilidade.service";
import { Gabinete } from "../../src/models/gabinete.model";
import { PlacaMae } from "../../src/models/placaMae.model";
import { GPU } from "../../src/models/gpu.model";

describe("Compatibilidade Gabinete com Placa-mãe e GPU", () => {
  it("deve retornar true para tamanhos e comprimentos compatíveis", () => {
    const gabinete: Gabinete = {
      id: 1,
      tamanhoSuportado: ["ATX", "mATX"],
      comprimentoMaximoGpuMM: 330
    };

    const placaMae: PlacaMae = {
      id: 1,
      nome: "ASUS Prime B550",
      socket: "AM4",
      chipset: "B550",
      compatibilidadeLinhaCpu: ["Ryzen"],
      tipoRAM: "DDR4",
      tamanho: "ATX",
      slots: 4
    };

    const gpu: GPU = {
      id: 1,
      memoriaGB: 12,
      tipoMemoria: "GDDR6",
      tdp: 250,
      comprimentoMM: 310
    };

    expect(verificarCompatibilidadeGabinete(gabinete, placaMae, gpu)).toBe(true);
  });

  it("deve retornar false para placa-mãe incompatível", () => {
    const gabinete: Gabinete = {
      id: 1,
      tamanhoSuportado: ["mATX"],
      comprimentoMaximoGpuMM: 330
    };

    const placaMae: PlacaMae = {
      id: 1,
      nome: "ASUS Prime B550",
      socket: "AM4",
      chipset: "B550",
      compatibilidadeLinhaCpu: ["Ryzen"],
      tipoRAM: "DDR4",
      tamanho: "ATX",
      slots: 4
    };

    const gpu: GPU = {
      id: 1,
      memoriaGB: 12,
      tipoMemoria: "GDDR6",
      tdp: 250,
      comprimentoMM: 310
    };

    expect(verificarCompatibilidadeGabinete(gabinete, placaMae, gpu)).toBe(false);
  });

  it("deve retornar false para GPU muito grande", () => {
    const gabinete: Gabinete = {
      id: 1,
      tamanhoSuportado: ["ATX", "mATX"],
      comprimentoMaximoGpuMM: 290
    };

    const placaMae: PlacaMae = {
      id: 1,
      nome: "ASUS Prime B550",
      socket: "AM4",
      chipset: "B550",
      compatibilidadeLinhaCpu: ["Ryzen"],
      tipoRAM: "DDR4",
      tamanho: "ATX",
      slots: 4
    };

    const gpu: GPU = {
      id: 1,
      memoriaGB: 12,
      tipoMemoria: "GDDR6",
      tdp: 250,
      comprimentoMM: 310
    };

    expect(verificarCompatibilidadeGabinete(gabinete, placaMae, gpu)).toBe(false);
  });
});
