export enum PartType {
  GPU = "GPU",
  CPU = "CPU",
  MOTHERBOARD = "MOTHERBOARD",
  RAM = "RAM",
  PSU = "PSU",
  CASE = "CASE",
  SSD = "SSD",
}

export function distributeBudget(total: number): Record<PartType, number> {
  return {
    [PartType.GPU]: total * 0.38,
    [PartType.CPU]: total * 0.20,
    [PartType.MOTHERBOARD]: total * 0.10,
    [PartType.RAM]: total * 0.075,
    [PartType.PSU]: total * 0.075,
    [PartType.CASE]: total * 0.10,
    [PartType.SSD]: total * 0.10
  };
}


export function redistributeBudgetWithoutGPU(distribution: Record<PartType, number>): Record<PartType, number> {
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
