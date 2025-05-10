import { GPURepository } from '../repositories/gpu.repository';

const gpuRepository = new GPURepository();

export class GPUService {
  createGPU(data: any) {
    return gpuRepository.create(data);
  }

  listGPUs() {
    return gpuRepository.list();
  }

  searchGPU(id: number) {
    return gpuRepository.searchById(id);
  }

  updateGPU(id: number, data: any) {
    return gpuRepository.update(id, data);
  }

  deleteGPU(id: number) {
    return gpuRepository.delete(id);
  }
}