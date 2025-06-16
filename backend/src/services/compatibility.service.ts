import { CPU } from "../models/cpu.model";
import { PSU } from "../models/psu.model";
import { GPU } from "../models/gpu.model";
import { Case } from "../models/case.model";
import { Motherboard } from "../models/motherboard.model";
import { RAM } from "../models/ram.model";

//para teste
export function checkCpuMotherboardCompatibility(
  cpu: CPU,
  motherboard: Motherboard
): boolean {
  const isSocketCompatible = cpu.socket === motherboard.socket;

  return isSocketCompatible;
}

export function checkRamMotherboardCompatibility(
  ram: RAM,
  motherboard: Motherboard
): boolean {
  return ram.type === motherboard.ramType;
}

export function checkGpuPsuCompatibility(
  gpu: GPU,
  psu: PSU
): boolean {
  const safetyMargin = 100;
  return psu.powerW >= gpu.tdp + safetyMargin;
}

export function checkCaseCompatibility(
  casepc: Case,
  motherboard: Motherboard,
  gpu: GPU
): boolean {
  const isMotherboardCompatible = casepc.supportedSizes.includes(motherboard.size);
  const isGpuCompatible = gpu.lengthMM <= casepc.maxGpuLengthMM;

  return isMotherboardCompatible && isGpuCompatible;
}

