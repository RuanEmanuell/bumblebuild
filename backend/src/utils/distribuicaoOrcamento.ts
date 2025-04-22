export enum TipoPeca {
    GPU = "GPU",
    CPU = "CPU",
    PLACA_MAE = "PLACA_MAE",
    RAM = "RAM",
    FONTE = "FONTE",
    GABINETE = "GABINETE",
    SSD = "SSD",
  }
  
  export function distribuirOrcamento(total: number): Record<TipoPeca, number> {
    return {
      [TipoPeca.GPU]: total * 0.45,
      [TipoPeca.CPU]: total * 0.25,
      [TipoPeca.PLACA_MAE]: total * 0.1 || 0.15,
      [TipoPeca.RAM]: total * 0.1,
      [TipoPeca.FONTE]: total * 0.05,
      [TipoPeca.GABINETE]: total * 0.05,
      [TipoPeca.SSD]: total * 0.05,
    };
  }
  