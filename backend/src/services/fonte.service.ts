import { FonteRepository } from '../repositories/fonte.repository';

const fonteRepository = new FonteRepository();

export class FonteService {
  criarFonte(data: any) {
    return fonteRepository.criar(data);
  }

  listarfontes() {
    return fonteRepository.listar();
  }

  buscarFonte(id: number) {
    return fonteRepository.buscarPorId(id);
  }

  atualizarFonte(id: number, data: any) {
    return fonteRepository.atualizar(id, data);
  }

  deletarFonte(id: number) {
    return fonteRepository.deletar(id);
  }
}