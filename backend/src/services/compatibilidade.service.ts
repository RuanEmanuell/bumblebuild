interface CPU {
  id: string;
  nome: string;
  socket: string;
  linha: string;
}

interface PlacaMae {
  id: string;
  nome: string;
  socket: string;
  chipset: string;
  compatibilidadeLinhaCpu: string[];
}

//para teste
export function verificarCompatibilidadeCpuPlacaMae(
  cpu: CPU,
  placaMae: PlacaMae
): boolean {
  const socketCompatível = cpu.socket === placaMae.socket;
  const chipsetCompatível = placaMae.compatibilidadeLinhaCpu.includes(
    cpu.linha
  );

  return socketCompatível && chipsetCompatível;
}
