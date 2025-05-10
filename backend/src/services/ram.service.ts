import { RAMRepository } from '../repositories/ram.repository';

const ramRepository = new RAMRepository();

export class RAMService {
  createRAM(data: any) {
    return ramRepository.create(data);
  }

  listRAMs() {
    return ramRepository.list();
  }

  searchRAM(id: number) {
    return ramRepository.searchById(id);
  }

  updateRAM(id: number, data: any) {
    return ramRepository.update(id, data);
  }

  deleteRAM(id: number) {
    return ramRepository.delete(id);
  }
}