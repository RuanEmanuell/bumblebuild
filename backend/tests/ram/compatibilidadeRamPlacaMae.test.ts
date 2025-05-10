import { checkRamMotherboardCompatibility } from "../../src/services/compatibility.service";
import { RAM } from "../../src/models/ram.model"; 
import { Motherboard } from "../../src/models/motherboard.model";

describe("Compatibilidade RAM e Placa-mãe", () => {
  it("deve retornar true para type de RAM compatível", () => {
    const ram: RAM = {
      id: 1,
      capacityGB: 16,
      type: "DDR4",
      frequency: 3200,
    };

    const motherboard: Motherboard = {
      id: 1,
      name: "Gigabyte B450",
      socket: "AM4",
      chipset: "B450",
      cpuCompatibilityLine: ["Ryzen"],
      ramType: "DDR4",
      size: "ATX",
      slots: 4,
    };

    expect(checkRamMotherboardCompatibility(ram, motherboard)).toBe(true);
  });

  it("deve retornar false para type de RAM incompatível", () => {
    const ram: RAM = {
      id: 1,
      capacityGB: 16,
      type: "DDR5",
      frequency: 5200,
    };

    const motherboard: Motherboard = {
      id: 1,
      name: "Gigabyte B450",
      socket: "AM4",
      chipset: "B450",
      cpuCompatibilityLine: ["Ryzen"],
      ramType: "DDR4",
      size: "ATX",
      slots: 4,
    };

    expect(checkRamMotherboardCompatibility(ram, motherboard)).toBe(false);
  });
});
