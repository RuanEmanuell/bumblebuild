import { MotherboardRepository } from '../repositories/motherboard.repository';

const motherboardRepository = new MotherboardRepository();

export class MotherboardService {
  createMotherboard(data: any) {
    return motherboardRepository.create(data);
  }

  listMotherboard() {
    return motherboardRepository.list();
  }

  searchMotherboard(id: number) {
    return motherboardRepository.searchById(id);
  }

  updateMotherboard(id: number, data: any) {
    return motherboardRepository.update(id, data);
  }

  deleteMotherboard(id: number) {
    return motherboardRepository.delete(id);
  }
}