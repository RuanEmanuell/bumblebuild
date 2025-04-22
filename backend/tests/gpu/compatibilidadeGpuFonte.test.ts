import { verificarCompatibilidadeGpuFonte } from "../../src/services/compatibilidade.service";
import { Fonte } from "../../src/models/fonte.model";
import { GPU } from "../../src/models/gpu.model";

describe("Compatibilidade GPU e Fonte", () => {
  it("deve retornar true se a fonte tiver potência suficiente", () => {
    const gpu: GPU = {
      id: "1",
      memoriaGB: 8,
      tipoMemoria: "GDDR6",
      tdp: 200,
      comprimentoMM: 300,
    };

    const fonte: Fonte = {
      id: "1",
      potenciaW: 750,
      certificacao: "80 Plus Bronze",
      modular: true,
    };

    expect(verificarCompatibilidadeGpuFonte(gpu, fonte)).toBe(true);
  });

  it("deve retornar false se a fonte for insuficiente", () => {
    const gpu: GPU = {
      id: "2",
      memoriaGB: 12,
      tipoMemoria: "GDDR6X",
      tdp: 300,
      comprimentoMM: 300,
    };

    const fonte: Fonte = {
      id: "2",
      potenciaW: 350,
      certificacao: "80 Plus White",
      modular: false,
    };

    expect(verificarCompatibilidadeGpuFonte(gpu, fonte)).toBe(false);
  });
});
