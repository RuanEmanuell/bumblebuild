import { checkGpuPsuCompatibility } from "../../src/services/compatibility.service";
import { PSU } from "../../src/models/psu.model";
import { GPU } from "../../src/models/gpu.model";

describe("Compatibilidade GPU e PSU", () => {
  it("deve retornar true se a PSU tiver potência suficiente", () => {
    const gpu: GPU = {
      id: 1,
      memoryGB: 8,
      memoryType: "GDDR6",
      tdp: 200,
      lengthMM: 300,
    };

    const PSU: PSU = {
      id: 1,
      powerW: 750,
      certification: "80 Plus Bronze",
      modular: true,
    };

    expect(checkGpuPsuCompatibility(gpu, PSU)).toBe(true);
  });

  it("deve retornar false se a PSU for insuficiente", () => {
    const gpu: GPU = {
      id: 2,
      memoryGB: 12,
      memoryType: "GDDR6X",
      tdp: 300,
      lengthMM: 300,
    };

    const PSU: PSU = {
      id: 2,
      powerW: 350,
      certification: "80 Plus White",
      modular: false,
    };

    expect(checkGpuPsuCompatibility(gpu, PSU)).toBe(false);
  });
});
