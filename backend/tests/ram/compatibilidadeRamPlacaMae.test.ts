import { verificarCompatibilidadeRamPlacaMae } from "../../src/services/compatibilidade.service";
import { RAM } from "../../src/models/ram.model"; 
import { PlacaMae } from "../../src/models/placaMae.model";

describe("Compatibilidade RAM e Placa-mãe", () => {
  it("deve retornar true para tipo de RAM compatível", () => {
    const ram: RAM = {
      id: 1,
      capacidadeGB: 16,
      tipo: "DDR4",
      frequencia: 3200,
    };

    const placaMae: PlacaMae = {
      id: 1,
      nome: "Gigabyte B450",
      socket: "AM4",
      chipset: "B450",
      compatibilidadeLinhaCpu: ["Ryzen"],
      tipoRAM: "DDR4",
      tamanho: "ATX",
      slots: 4,
    };

    expect(verificarCompatibilidadeRamPlacaMae(ram, placaMae)).toBe(true);
  });

  it("deve retornar false para tipo de RAM incompatível", () => {
    const ram: RAM = {
      id: 1,
      capacidadeGB: 16,
      tipo: "DDR5",
      frequencia: 5200,
    };

    const placaMae: PlacaMae = {
      id: 1,
      nome: "Gigabyte B450",
      socket: "AM4",
      chipset: "B450",
      compatibilidadeLinhaCpu: ["Ryzen"],
      tipoRAM: "DDR4",
      tamanho: "ATX",
      slots: 4,
    };

    expect(verificarCompatibilidadeRamPlacaMae(ram, placaMae)).toBe(false);
  });
});
