import { CPU } from "./cpu.model";
import { Fonte } from "./fonte.model";
import { Gabinete } from "./gabinete.model";
import { GPU } from "./gpu.model";
import { PlacaMae } from "./placaMae.model";
import { RAM } from "./ram.model";

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

export interface SSD {
  id: number;
  capacidadeGB: number;
  tipo: string;
  leituraMBs: number;
  escritaMBs: number;
}


export interface Cooler {
  id: number;
  tipo: string;
  suporteSocket: string;
}
export { CPU, Fonte, Gabinete, GPU, PlacaMae, RAM };

