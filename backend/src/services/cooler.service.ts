import { COOLERRepository } from '../repositories/cooler.repository';

const coolerRepository = new COOLERRepository();

export class CoolerService {
  criarCooler(data: any) {
    return coolerRepository.criar(data);
  }

  listarCoolers() {
    return coolerRepository.listar();
  }

  buscarCooler(id: number) {
    return coolerRepository.buscarPorId(id);
  }

  atualizarCooler(id: number, data: any) {
    return coolerRepository.atualizar(id, data);
  }

  deletarCooler(id: number) {
    return coolerRepository.deletar(id);
  }
}