import { CPURepository } from '../repositories/cpu.repository';

const cpuRepository = new CPURepository();

export class CPUService {
  async createCPU(data: any) {
    return cpuRepository.create(data);
  }

  listCPUs() {
    return cpuRepository.list();
  }

  searchCPU(id: number) {
    return cpuRepository.searchById(id);
  }

  updateCPU(id: number, data: any) {
    return cpuRepository.update(id, data);
  }

  deleteCPU(id: number) {
    return cpuRepository.delete(id);
  }
}