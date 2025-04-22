import { CPU } from "../models/cpu.model";
import { PlacaMae } from "../models/placaMae.model";
import { RAM } from "../models/ram.model";



//para teste
export function verificarCompatibilidadeCpuPlacaMae(
  cpu: CPU,
  placaMae: PlacaMae
): boolean {
  const socketCompativel = cpu.socket === placaMae.socket;
  const chipsetCompativel = placaMae.compatibilidadeLinhaCpu.includes(
    cpu.linha
  );

  return socketCompativel && chipsetCompativel;
}


export function verificarCompatibilidadeRamPlacaMae(
  ram: RAM,
  placaMae: PlacaMae
): boolean {
  return ram.tipo === placaMae.tipoRAM;
}
