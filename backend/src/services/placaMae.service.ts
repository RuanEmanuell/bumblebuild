import { PlacaMaeRepository } from '../repositories/placaMae.repository';

const placaMaeRepository = new PlacaMaeRepository();

export class PlacaMaeService {
  criarPlacaMae(data: any) {
    return placaMaeRepository.criar(data);
  }

  listarPlacaMaes() {
    return placaMaeRepository.listar();
  }

  buscarPlacaMae(id: number) {
    return placaMaeRepository.buscarPorId(id);
  }

  atualizarPlacaMae(id: number, data: any) {
    return placaMaeRepository.atualizar(id, data);
  }

  deletarPlacaMae(id: number) {
    return placaMaeRepository.deletar(id);
  }
}