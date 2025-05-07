import { RAMRepository } from '../repositories/ram.repository';

const ramRepository = new RAMRepository();

export class RAMService {
  criarRAM(data: any) {
    return ramRepository.criar(data);
  }

  listarRAMs() {
    return ramRepository.listar();
  }

  buscarRAM(id: number) {
    return ramRepository.buscarPorId(id);
  }

  atualizarRAM(id: number, data: any) {
    return ramRepository.atualizar(id, data);
  }

  deletarRAM(id: number) {
    return ramRepository.deletar(id);
  }
}