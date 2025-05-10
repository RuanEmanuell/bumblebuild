import { SSDRepository } from '../repositories/ssd.repository';

const ssdRepository = new SSDRepository();

export class SSDService {
  createSSD(data: any) {
    return ssdRepository.create(data);
  }

  listSSDs() {
    return ssdRepository.list();
  }

  searchSSD(id: number) {
    return ssdRepository.searchById(id);
  }

  updateSSD(id: number, data: any) {
    return ssdRepository.update(id, data);
  }

  deleteSSD(id: number) {
    return ssdRepository.delete(id);
  }
}