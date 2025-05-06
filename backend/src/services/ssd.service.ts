import { SSDRepository } from '../repositories/ssd.repository';

const ssdRepository = new SSDRepository();

export class SSDService {
  criarSSD(data: any) {
    return ssdRepository.criar(data);
  }

  listarSSDs() {
    return ssdRepository.listar();
  }

  buscarSSD(id: number) {
    return ssdRepository.buscarPorId(id);
  }

  atualizarSSD(id: number, data: any) {
    return ssdRepository.atualizar(id, data);
  }

  deletarSSD(id: number) {
    return ssdRepository.deletar(id);
  }
}