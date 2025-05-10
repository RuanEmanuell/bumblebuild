import { PSURepository } from '../repositories/psu.repository';

const psuRepository = new PSURepository();

export class PSUService {
  createPSU(data: any) {
    return psuRepository.create(data);
  }

  listPSUs() {
    return psuRepository.list();
  }

  searchPSU(id: number) {
    return psuRepository.searchById(id);
  }

  updatePSU(id: number, data: any) {
    return psuRepository.update(id, data);
  }

  deletePSU(id: number) {
    return psuRepository.delete(id);
  }
}