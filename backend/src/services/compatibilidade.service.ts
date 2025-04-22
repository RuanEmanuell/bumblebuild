import { CPU } from "../models/cpu.model";
import { Fonte } from "../models/fonte.model";
import { GPU } from "../models/gpu.model";
import { Gabinete } from "../models/gabinete.model";
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


export function verificarCompatibilidadeGpuFonte(
  gpu: GPU,
  fonte: Fonte
): boolean {
  const margemSeguranca = 100; 
  return fonte.potenciaW >= gpu.tdp + margemSeguranca;
}


export function verificarCompatibilidadeGabinete(
  gabinete: Gabinete,
  placaMae: PlacaMae,
  gpu: GPU
): boolean {
  const placaMaeCompatível = gabinete.tamanhoSuportado.includes(placaMae.tamanho);
  const gpuCompatível = gpu.comprimentoMM <= gabinete.comprimentoMaximoGpuMM;

  return placaMaeCompatível && gpuCompatível;
}
