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

function redistributeBudgetWithoutGPU(distribution: Record<PartType, number>): Record<PartType, number> {
  const gpuBudget = distribution.GPU;

  const cpuWeight = 0.30;
  const moboWeight = 0.25;
  const ramWeight = 0.15;
  const ssdWeight = 0.15;
  const psuWeight = 0.10;
  const caseWeight = 0.05;

  const totalWeight = cpuWeight + ramWeight + ssdWeight + psuWeight;

  distribution.CPU += gpuBudget * (cpuWeight / totalWeight);
  distribution.MOTHERBOARD += gpuBudget * (moboWeight / totalWeight);
  distribution.RAM += gpuBudget * (ramWeight / totalWeight);
  distribution.SSD += gpuBudget * (ssdWeight / totalWeight);
  distribution.PSU += gpuBudget * (psuWeight / totalWeight);
  distribution.CASE += gpuBudget * (caseWeight / totalWeight);

  distribution.GPU = 0;

  return distribution;
}

function tryDowngrade(
  currentConfig: Part[],
  parts: Part[],
  budget: number
): { configuration: Part[]; message?: string } {
  let config = [...currentConfig];
  let totalCost = config.reduce((sum, p) => sum + p.price, 0);

  console.log(`🔍 Custo inicial: R$${totalCost.toFixed(2)} — Orçamento: R$${budget}`);

  const downgradePriority: PartType[] = [
    PartType.CASE,
    PartType.SSD,
    PartType.PSU,
    PartType.RAM,
    PartType.MOTHERBOARD,
    PartType.CPU
  ];

  for (const partType of downgradePriority) {
    const currentPart = config.find(p => p.type === partType);
    if (!currentPart) continue;

    const cheaperOptions = parts
      .filter(p =>
        p.type === partType &&
        p.price < currentPart.price &&
        (partType !== PartType.MOTHERBOARD || checkCpuMotherboardCompatibility(
          extractSpecificData(config.find(p => p.type === PartType.CPU)!) as CPU,
          extractSpecificData(p) as Motherboard
        )) &&
        (partType !== PartType.RAM || checkRamMotherboardCompatibility(
          extractSpecificData(p) as RAM,
          extractSpecificData(config.find(p => p.type === PartType.MOTHERBOARD)!) as Motherboard
        )) &&
        (partType !== PartType.PSU || true)
      )
      .sort((a, b) => {
        if ((b.rating ?? 0) !== (a.rating ?? 0)) return (b.rating ?? 0) - (a.rating ?? 0);
        return b.price - a.price;
      })

    if (cheaperOptions.length > 0) {
      const cheaperPart = cheaperOptions[0];
      config = config.map(p => (p.id === currentPart.id ? cheaperPart : p));

      totalCost = config.reduce((sum, p) => sum + p.price, 0);
      console.log(`⚙️ Downgrade ${partType}: ${currentPart.name} → ${cheaperPart.name} — Novo custo: R$${totalCost.toFixed(2)}`);

      if (totalCost <= budget) {
        console.log('✅ Cabemos no orçamento após downgrade!');
        return { configuration: config };
      }
    }
  }

  console.log('❌ Não foi possível caber no orçamento mesmo após downgrades');
  return {
    configuration: [],
    message: 'Could not fit within budget even after downgrades.'
  };
}


export function suggestConfigurationWithBudget(
  parts: Part[],
  budget: number,
  includeGPU: boolean = false
): { configuration: Part[]; message?: string } {
  let distribution = distributeBudget(budget);

  if (!includeGPU) {
    distribution = redistributeBudgetWithoutGPU(distribution);
  }

  const possibleCpus = parts
    .filter(p =>
      p.type === PartType.CPU &&
      p.price <= distribution.CPU &&
      (includeGPU ? true : (extractSpecificData(p) as CPU).integratedGraphics)
    )
    .sort((a, b) => {
      if ((b.rating ?? 0) !== (a.rating ?? 0)) return (b.rating ?? 0) - (a.rating ?? 0);
      return b.price - a.price;
    })

  console.log(possibleCpus);

  let cpu: Part | null = null;
  let motherboard: Part | null = null;

  for (const cpuOption of possibleCpus.sort((a, b) => b.price - a.price)) {
    const cpuData = extractSpecificData(cpuOption) as CPU;

    const possibleMotherboards = parts.filter(p =>
      p.type === PartType.MOTHERBOARD &&
      p.price <= distribution.MOTHERBOARD &&
      checkCpuMotherboardCompatibility(cpuData, extractSpecificData(p) as Motherboard)
    ).sort((a, b) => {
      if ((b.rating ?? 0) !== (a.rating ?? 0)) return (b.rating ?? 0) - (a.rating ?? 0);
      return b.price - a.price;
    })

    if (possibleMotherboards.length > 0) {
      cpu = cpuOption;
      motherboard = possibleMotherboards[0];
      console.log('CPU escolhida:', cpu.name, ' - R$', cpu.price);
      console.log('Placa-mãe escolhida:', motherboard.name, ' - R$', motherboard.price);
      break;
    }
  }

  if (!cpu || !motherboard) {
    console.log('❌ Não foi possível encontrar CPU e Motherboard compatíveis dentro do orçamento');
    return { configuration: [], message: 'No compatible CPU and Motherboard fit the budget' };
  }

  const motherboardData = extractSpecificData(motherboard) as Motherboard;

  const ram = parts.filter(p =>
    p.type === PartType.RAM &&
    p.price <= distribution.RAM &&
    checkRamMotherboardCompatibility(extractSpecificData(p) as RAM, motherboardData)
  ).sort((a, b) => {
    if ((b.rating ?? 0) !== (a.rating ?? 0)) return (b.rating ?? 0) - (a.rating ?? 0);
    return b.price - a.price;
  })[0] || null;

  if (!ram) {
    console.log('❌ Nenhuma RAM compatível');
    return { configuration: [], message: 'No compatible RAM fits the budget' };
  }
  console.log('RAM escolhida:', ram.name, ' - R$', ram.price);

  const gpu = includeGPU ? (
    parts.filter(p =>
      p.type === PartType.GPU && p.price <= distribution.GPU
    ).sort((a, b) => {
      if ((b.rating ?? 0) !== (a.rating ?? 0)) return (b.rating ?? 0) - (a.rating ?? 0);
      return b.price - a.price;
    })[0] || null
  ) : null;

  if (includeGPU && !gpu) {
    console.log('❌ Nenhuma GPU dentro do orçamento');
    return { configuration: [], message: 'No GPU fits the budget' };
  }

  if (gpu) {
    console.log('GPU escolhida:', gpu.name, ' - R$', gpu.price);
  }

  const gpuData = gpu ? extractSpecificData(gpu) as GPU : null;

  const psu = parts.filter(p =>
    p.type === PartType.PSU &&
    p.price <= distribution.PSU &&
    (gpu ? checkGpuPsuCompatibility(gpuData!, extractSpecificData(p) as PSU) : true)
  ).sort((a, b) => {
    if ((b.rating ?? 0) !== (a.rating ?? 0)) return (b.rating ?? 0) - (a.rating ?? 0);
    return b.price - a.price;
  })[0] || null;

  if (!psu) {
    console.log('❌ Nenhuma PSU compatível');
    return { configuration: [], message: 'No compatible PSU fits the budget' };
  }
  console.log('PSU escolhida:', psu.name, ' - R$', psu.price);

  const casePC = parts.filter(p =>
    p.type === PartType.CASE &&
    p.price <= distribution.CASE &&
    (gpu ? checkCaseCompatibility(extractSpecificData(p) as Case, motherboardData, gpuData!) : checkCaseCompatibility(extractSpecificData(p) as Case, motherboardData))
  ).sort((a, b) => {
    if ((b.rating ?? 0) !== (a.rating ?? 0)) return (b.rating ?? 0) - (a.rating ?? 0);
    return b.price - a.price;
  })[0] || null;

  if (!casePC) {
    console.log('❌ Nenhum Case compatível');
    return { configuration: [], message: 'No compatible Case fits the budget' };
  }
  console.log('Case escolhido:', casePC.name, ' - R$', casePC.price);

  const ssd = parts.filter(p =>
    p.type === PartType.SSD &&
    p.price <= distribution.SSD
  ).sort((a, b) => {
    if ((b.rating ?? 0) !== (a.rating ?? 0)) return (b.rating ?? 0) - (a.rating ?? 0);
    return b.price - a.price;
  })[0] || null;

  if (!ssd) {
    console.log('❌ Nenhum SSD dentro do orçamento');
    return { configuration: [], message: 'No SSD fits the budget' };
  }
  console.log('SSD escolhido:', ssd.name, ' - R$', ssd.price);

  const finalConfiguration = [
    cpu,
    motherboard,
    ram,
    ...(gpu ? [gpu] : []),
    psu,
    casePC,
    ssd
  ];

  const totalCost = finalConfiguration.reduce((sum, p) => sum + p.price, 0);

  console.log('Custo total:', totalCost);

  if (totalCost > budget) {
    console.log('❌ Configuração excede o orçamento, tentando downgrade inteligente...');

    const downgradeResult = tryDowngrade(finalConfiguration, parts, budget);

    if (downgradeResult.configuration.length === 0) {
      return {
        configuration: [],
        message: `Configuration exceeds the budget: R$${totalCost.toFixed(2)}`
      };
    } else {
      console.log('✅ Configuração ajustada após downgrade');
      return downgradeResult;
    }
  }

  console.log('✅ Configuração final gerada com sucesso!');

  return { configuration: finalConfiguration };
}


