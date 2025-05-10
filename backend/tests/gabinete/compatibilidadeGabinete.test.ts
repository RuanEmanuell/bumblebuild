import { checkCaseCompatibility } from "../../src/services/compatibility.service";
import { Case } from "../../src/models/case.model";
import { Motherboard } from "../../src/models/motherboard.model";
import { GPU } from "../../src/models/gpu.model";

describe("Compatibilidade Case com Placa-mãe e GPU", () => {
  it("deve retornar true para tamanhos e comprimentos compatíveis", () => {
    const Case: Case = {
      id: 1,
      supportedSizes: ["ATX", "mATX"],
      maxGpuLengthMM: 330
    };

    const motherboard: Motherboard = {
      id: 1,
      name: "ASUS Prime B550",
      socket: "AM4",
      chipset: "B550",
      cpuCompatibilityLine: ["Ryzen"],
      ramType: "DDR4",
      size: "ATX",
      slots: 4
    };

    const gpu: GPU = {
      id: 1,
      memoryGB: 12,
      memoryType: "GDDR6",
      tdp: 250,
      lengthMM: 310
    };

    expect(checkCaseCompatibility(Case, motherboard, gpu)).toBe(true);
  });

  it("deve retornar false para placa-mãe incompatível", () => {
    const Case: Case = {
      id: 1,
      supportedSizes: ["mATX"],
      maxGpuLengthMM: 330
    };

    const motherboard: Motherboard = {
      id: 1,
      name: "ASUS Prime B550",
      socket: "AM4",
      chipset: "B550",
      cpuCompatibilityLine: ["Ryzen"],
      ramType: "DDR4",
      size: "ATX",
      slots: 4
    };

    const gpu: GPU = {
      id: 1,
      memoryGB: 12,
      memoryType: "GDDR6",
      tdp: 250,
      lengthMM: 310
    };

    expect(checkCaseCompatibility(Case, motherboard, gpu)).toBe(false);
  });

  it("deve retornar false para GPU muito grande", () => {
    const Case: Case = {
      id: 1,
      supportedSizes: ["ATX", "mATX"],
      maxGpuLengthMM: 290
    };

    const motherboard: Motherboard = {
      id: 1,
      name: "ASUS Prime B550",
      socket: "AM4",
      chipset: "B550",
      cpuCompatibilityLine: ["Ryzen"],
      ramType: "DDR4",
      size: "ATX",
      slots: 4
    };

    const gpu: GPU = {
      id: 1,
      memoryGB: 12,
      memoryType: "GDDR6",
      tdp: 250,
      lengthMM: 310
    };

    expect(checkCaseCompatibility(Case, motherboard, gpu)).toBe(false);
  });
});
