import { CPURepository } from '../repositories/cpu.repository';

const cpuRepository = new CPURepository();

export class CPUService {
  criarCPU(data: any) {
    return cpuRepository.criar(data);
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