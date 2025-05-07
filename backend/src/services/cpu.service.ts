import { CPURepository } from '../repositories/cpu.repository';

const cpuRepository = new CPURepository();

export class CPUService {
  async criarCPU(data: any) {
    const cpuData = {
      socket: data.socket,
      nucleos: data.nucleos,
      threads: data.threads,
      frequencia: data.frequencia,
      tdp: data.tdp,
      graficosIntegrados: data.graficosIntegrados,
      peca: {
        create: {
          nome: data.peca.nome,
          marca: data.peca.marca,
          preco: data.peca.preco,
          tipo: data.peca.tipo,
          imagemUrl: data.peca.imagemUrl || null,
          createdAt: data.peca.createdAt || new Date(),
        },
      },
    };

    return cpuRepository.criar(cpuData);
  }

  listarCPUs() {
    return cpuRepository.listar();
  }

  buscarCPU(id: number) {
    return cpuRepository.buscarPorId(id);
  }

  atualizarCPU(id: number, data: any) {
    return cpuRepository.atualizar(id, data);
  }

  deletarCPU(id: number) {
    return cpuRepository.deletar(id);
  }
}