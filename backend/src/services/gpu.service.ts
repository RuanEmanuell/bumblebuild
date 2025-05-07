import { GPURepository } from '../repositories/gpu.repository';

const gpuRepository = new GPURepository();

export class GPUService {
  criarGPU(data: any) {
    return gpuRepository.criar(data);
  }

  listarGPUs() {
    return gpuRepository.listar();
  }

  buscarGPU(id: number) {
    return gpuRepository.buscarPorId(id);
  }

  atualizarGPU(id: number, data: any) {
    return gpuRepository.atualizar(id, data);
  }

  deletarGPU(id: number) {
    return gpuRepository.deletar(id);
  }
}