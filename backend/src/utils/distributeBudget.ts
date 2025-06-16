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
      [PartType.GPU]: total * 0.40,
      [PartType.CPU]: total * 0.20,
      [PartType.MOTHERBOARD]: total * 0.1,
      [PartType.RAM]: total * 0.1,
      [PartType.PSU]: total * 0.1,
      [PartType.CASE]: total * 0.05,
      [PartType.SSD]: total * 0.05,
    };
  }
  