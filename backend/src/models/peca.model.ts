// Tipo de peça (enum textual)
export type TipoPeca =
  | 'CPU'
  | 'GPU'
  | 'RAM'
  | 'SSD'
  | 'FONTE'
  | 'GABINETE'
  | 'PLACA_MAE'
  | 'COOLER';

export interface Peca {
  id?: number;
  nome: string;
  marca: string;
  preco: number;
  tipo: TipoPeca;
  imagemUrl?: string;

  cpu?: CPU;
  gpu?: GPU;
  ram?: RAM;
  ssd?: SSD;
  fonte?: Fonte;
  gabinete?: Gabinete;
  placaMae?: PlacaMae;
  cooler?: Cooler;
}

export interface CPU {
  id: number;
  socket: string;
  nucleos: number;
  threads: number;
  frequencia: number; 
  tdp: number; 
  graficosIntegrados: boolean;
}

export interface GPU {
  id: number;
  memoriaGB: number;
  tipoMemoria: string;
  tdp: number;
}

export interface RAM {
  id: number;
  capacidadeGB: number;
  tipo: string; 
  frequencia: number; 
}

export interface SSD {
  id: number;
  capacidadeGB: number;
  tipo: string;
  leituraMBs: number;
  escritaMBs: number;
}

export interface Fonte {
  id: number;
  potenciaW: number;
  certificacao: string; 
  modular: boolean;
}

export interface Gabinete {
  id: number;
  tamanhoSuportado: string; 
  comVidro: boolean;
}

export interface PlacaMae {
  id: number;
  socket: string;
  tipoRAM: string;
  slotsRAM: number;
  maxRAM: number;
  tamanho: string; 
}

export interface Cooler {
  id: number;
  tipo: string;
  suporteSocket: string;
}
