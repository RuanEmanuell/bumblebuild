export interface Motherboard {
  id: number;
  name: string;
  socket: string;
  chipset: string;
  cpuCompatibilityLine: string[]; 
  ramType: string; 
  size: string; 
  slots: number;
  maxRAM : number;
}
