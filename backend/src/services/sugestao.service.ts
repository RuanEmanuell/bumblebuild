import { Peca, CPU as CPUModel, GPU as GPUModel, RAM as RAMModel, Fonte as FonteModel, PlacaMae as PlacaMaeModel, Gabinete as GabineteModel } from "../models/peca.model";
import { TipoPeca, distribuirOrcamento } from "../utils/distribuicaoOrcamento";
import {
  verificarCompatibilidadeCpuPlacaMae,
  verificarCompatibilidadeRamPlacaMae,
  verificarCompatibilidadeGpuFonte,
  verificarCompatibilidadeGabinete
} from "./compatibilidade.service";

function extrairDadosEspecificos(peca: Peca): CPUModel | GPUModel | RAMModel | FonteModel | PlacaMaeModel | GabineteModel | null {
  switch (peca.tipo) {
    case 'CPU': return peca.cpu ?? null;
    case 'GPU': return peca.gpu ?? null;
    case 'RAM': return peca.ram ?? null;
    case 'FONTE': return peca.fonte ?? null;
    case 'PLACA_MAE': return peca.placaMae ?? null;
    case 'GABINETE': return peca.gabinete ?? null;
    default: return null;
  }
}

export function sugerirConfiguracaoComOrcamento(
  pecas: Peca[],
  orcamento: number
): { configuracao: Peca[]; mensagem?: string } {
  const distribuicao = distribuirOrcamento(orcamento);
  const selecionadas: Partial<Record<TipoPeca, Peca>> = {};

  for (const tipo in distribuicao) {
    const limite = distribuicao[tipo as TipoPeca]!;
    const melhores = pecas
      .filter(p => p.tipo === tipo && p.preco <= limite)
      .sort((a, b) => b.preco - a.preco);

    if (melhores.length === 0) {
      return {
        configuracao: [],
        mensagem: `Não há ${tipo} dentro do orçamento de R$ ${limite.toFixed(2)}`
      };
    }

    selecionadas[tipo as TipoPeca] = melhores[0];
  }

  const cpu = selecionadas['CPU'];
  const placaMae = selecionadas['PLACA_MAE'];
  const ram = selecionadas['RAM'];
  const gpu = selecionadas['GPU'];
  const fonte = selecionadas['FONTE'];
  const gabinete = selecionadas['GABINETE'];

  const cpuData = cpu ? extrairDadosEspecificos(cpu) as CPUModel : null;
  const placaMaeData = placaMae ? extrairDadosEspecificos(placaMae) as PlacaMaeModel : null;
  const ramData = ram ? extrairDadosEspecificos(ram) as RAMModel : null;
  const gpuData = gpu ? extrairDadosEspecificos(gpu) as GPUModel : null;
  const fonteData = fonte ? extrairDadosEspecificos(fonte) as FonteModel : null;
  const gabineteData = gabinete ? extrairDadosEspecificos(gabinete) as GabineteModel : null;

  if (cpuData && placaMaeData && !verificarCompatibilidadeCpuPlacaMae(cpuData, placaMaeData)) {
    return { configuracao: [], mensagem: "CPU e Placa-Mãe incompatíveis" };
  }

  if (ramData && placaMaeData && !verificarCompatibilidadeRamPlacaMae(ramData, placaMaeData)) {
    return { configuracao: [], mensagem: "RAM e Placa-Mãe incompatíveis" };
  }

  if (gpuData && fonteData && !verificarCompatibilidadeGpuFonte(gpuData, fonteData)) {
    return { configuracao: [], mensagem: "GPU e Fonte incompatíveis" };
  }

  if (gabineteData && placaMaeData && gpuData && !verificarCompatibilidadeGabinete(gabineteData, placaMaeData, gpuData)) {
    return { configuracao: [], mensagem: "Gabinete incompatível com GPU ou Placa-Mãe" };
  }

  const configuracaoFinal = Object.values(selecionadas) as Peca[];
  const custoTotal = configuracaoFinal.reduce((soma, p) => soma + p.preco, 0);

  if (custoTotal > orcamento) {
    return {
      configuracao: [],
      mensagem: `Configuração ultrapassa o orçamento: R$ ${custoTotal.toFixed(2)}`
    };
  }

  return { configuracao: configuracaoFinal };
}
