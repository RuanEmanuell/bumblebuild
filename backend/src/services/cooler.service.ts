import { COOLERRepository } from '../repositories/cooler.repository';

const coolerRepository = new COOLERRepository();

export class CoolerService {
  createCooler(data: any) {
    return coolerRepository.criar(data);
  }

  listCoolers() {
    return coolerRepository.listar();
  }

  searchCooler(id: number) {
    return coolerRepository.buscarPorId(id);
  }

  updateCooler(id: number, data: any) {
    return coolerRepository.atualizar(id, data);
  }

  deleteCooler(id: number) {
    return coolerRepository.deletar(id);
  }
}