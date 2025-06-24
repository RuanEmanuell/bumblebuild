export interface CPU {
  id: number;
  socket: string;
  name: string;
  cores: number;  
  threads: number;
  frequency: number;
  tdp: number;
  integratedGraphics: boolean;
}