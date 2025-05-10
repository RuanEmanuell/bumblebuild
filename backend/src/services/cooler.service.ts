import { CoolerRepository } from '../repositories/cooler.repository';

const coolerRepository = new CoolerRepository();

export class CoolerService {
  createCooler(data: any) {
    return coolerRepository.create(data);
  }

  listCoolers() {
    return coolerRepository.list();
  }

  searchCooler(id: number) {
    return coolerRepository.searchById(id);
  }

  updateCooler(id: number, data: any) {
    return coolerRepository.update(id, data);
  }

  deleteCooler(id: number) {
    return coolerRepository.delete(id);
  }
}