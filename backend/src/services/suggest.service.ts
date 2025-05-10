
import { Part, CPU, GPU, RAM, PSU, Motherboard, Case } from "../models/part.model";
import { PartType, distributeBudget } from "../utils/distributeBudget";
import {
  checkCpuMotherboardCompatibility,
  checkRamMotherboardCompatibility,
  checkGpuPsuCompatibility,
  checkCaseCompatibility
} from "./compatibility.service";

function extractSpecificData(part: Part): CPU | GPU | RAM | PSU | Motherboard | Case | null {
  switch (part.type) {
    case 'CPU': return part.cpu ?? null;
    case 'GPU': return part.gpu ?? null;
    case 'RAM': return part.ram ?? null;
    case 'PSU': return part.psu ?? null;
    case 'MOTHERBOARD': return part.motherboard ?? null;
    case 'CASE': return part.case ?? null;
    default: return null;
  }
}

export function suggestConfigurationWithBudget(
  parts: Part[],
  budget: number
): { configuration: Part[]; message?: string } {
  const distribution = distributeBudget(budget);
  const selected: Partial<Record<PartType, Part>> = {};

  for (const type in distribution) {
    const limit = distribution[type as PartType]!;
    const bestParts = parts
      .filter(p => p.type === type && p.price <= limit)
      .sort((a, b) => b.price - a.price);

    if (bestParts.length === 0) {
      return {
        configuration: [],
        message: `No ${type} found within the budget of $${limit.toFixed(2)}`
      };
    }

    selected[type as PartType] = bestParts[0];
  }

  const cpu = selected['CPU'];
  const motherboard = selected['MOTHERBOARD'];
  const ram = selected['RAM'];
  const gpu = selected['GPU'];
  const psu = selected['PSU'];
  const casePC = selected['CASE'];

  const cpuData = cpu ? extractSpecificData(cpu) as CPU : null;
  const motherboardData = motherboard ? extractSpecificData(motherboard) as Motherboard : null;
  const ramData = ram ? extractSpecificData(ram) as RAM : null;
  const gpuData = gpu ? extractSpecificData(gpu) as GPU : null;
  const psuData = psu ? extractSpecificData(psu) as PSU : null;
  const caseData = casePC ? extractSpecificData(casePC) as Case : null;

  if (cpuData && motherboardData && !checkCpuMotherboardCompatibility(cpuData, motherboardData)) {
    return { configuration: [], message: "CPU and Motherboard are incompatible" };
  }

  if (ramData && motherboardData && !checkRamMotherboardCompatibility(ramData, motherboardData)) {
    return { configuration: [], message: "RAM and Motherboard are incompatible" };
  }

  if (gpuData && psuData && !checkGpuPsuCompatibility(gpuData, psuData)) {
    return { configuration: [], message: "GPU and PSU are incompatible" };
  }

  if (caseData && motherboardData && gpuData && !checkCaseCompatibility(caseData, motherboardData, gpuData)) {
    return { configuration: [], message: "Case is incompatible with GPU or Motherboard" };
  }

  const finalConfiguration = Object.values(selected) as Part[];
  const totalCost = finalConfiguration.reduce((sum, p) => sum + p.price, 0);

  if (totalCost > budget) {
    return {
      configuration: [],
      message: `Configuration exceeds the budget: $${totalCost.toFixed(2)}`
    };
  }

  return { configuration: finalConfiguration };
}
