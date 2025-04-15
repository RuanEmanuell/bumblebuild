import { verificarCompatibilidadeCpuPlacaMae } from "../src/services/compatibilidade.service";

describe("Compatibilidade CPU e Placa-mãe", () => {
  it("deve retornar true para CPU e placa-mãe compatíveis", () => {
    const cpu = { id: "1", nome: "Ryzen 5 5600X", socket: "AM4", linha: "Ryzen" };
    const placaMae = {
      id: "2",
      nome: "ASUS B550",
      socket: "AM4",
      chipset: "B550",
      compatibilidadeLinhaCpu: ["Ryzen"]
    };

    expect(verificarCompatibilidadeCpuPlacaMae(cpu, placaMae)).toBe(true);
  });

  it("deve retornar false para socket incompatível", () => {
    const cpu = { id: "1", nome: "Ryzen 5 5600X", socket: "AM4", linha: "Ryzen" };
    const placaMae = {
      id: "2",
      nome: "ASUS Z690",
      socket: "LGA1700",
      chipset: "Z690",
      compatibilidadeLinhaCpu: ["Core i"]
    };

    expect(verificarCompatibilidadeCpuPlacaMae(cpu, placaMae)).toBe(false);
  });
});
