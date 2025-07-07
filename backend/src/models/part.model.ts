import { CPU } from "./cpu.model";
import { PSU } from "./psu.model"; 
import { Case } from "./case.model"; 
import { GPU } from "./gpu.model";
import { Motherboard } from "./motherboard.model"; 
import { RAM } from "./ram.model";
import { SSD } from "./ssd.model";
import { Cooler } from "./cooler.model";


export type PartType =
  | 'CPU'
  | 'GPU'
  | 'RAM'
  | 'SSD'
  | 'PSU'  
  | 'CASE' 
  | 'MOTHERBOARD'
  | 'COOLER';

export interface Part {
  id?: number;
  name: string;
  brand: string;
  price: number;
  type: PartType;
  imageUrl?: string;
  priceLink?: string;
  createdAt:  Date;
  rating: number;

  cpu?: CPU;
  gpu?: GPU;
  ram?: RAM;
  ssd?: SSD;
  psu?: PSU; 
  case?: Case; 
  motherboard?: Motherboard; 
  cooler?: Cooler;
}

export { CPU, PSU, Case, GPU, Motherboard, RAM };
