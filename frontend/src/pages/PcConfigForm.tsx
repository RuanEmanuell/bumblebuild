import React, { useState, ChangeEvent, KeyboardEvent, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderCustom from '../components/Header';
import Footer from '../components/Footer';

interface Produto {
  nome: string;
  preco: string;
  estrelas: number;
  imagem: string;
  categoria: string;
}

interface ErrosFormulario {
  orcamento?: string;
  jogos?: string;
}

const jogosSugeridos = [
  'League of Legends', 'Valorant', 'CS:GO', 'Fortnite', 'GTA V', 'Elden Ring',
  'Call of Duty: Warzone', 'Minecraft', 'The Witcher 3', 'Cyberpunk 2077'
];

const PcConfigForm: React.FC = () => {
  const location = useLocation();
  const produtosCadastrados: Produto[] = location.state?.pecasDisponiveis || [];

  const [orcamento, setOrcamento] = useState('');
  const [jogos, setJogos] = useState<string[]>([]);
  const [jogoInput, setJogoInput] = useState('');
  const [pecasSelecionadas, setPecasSelecionadas] = useState<string[]>([]);
  const [pecaInput, setPecaInput] = useState('');
  const [pecasManuais, setPecasManuais] = useState<string[]>([]);
  const [errors, setErrors] = useState<ErrosFormulario>({});
  const [sucesso, setSucesso] = useState(false);

  const handleAddJogo = (jogo: string) => {
    if (jogo && !jogos.includes(jogo)) {
      setJogos([...jogos, jogo]);
    }
    setJogoInput('');
  };

  const handleAddPecaManual = () => {
    if (pecaInput && !pecasManuais.includes(pecaInput)) {
      setPecasManuais([...pecasManuais, pecaInput]);
    }
    setPecaInput('');
  };

  const togglePecaSelecionada = (nome: string) => {
    setPecasSelecionadas((prev) =>
      prev.includes(nome) ? prev.filter(p => p !== nome) : [...prev, nome]
    );
  };

  const validar = (): boolean => {
    const novosErros: ErrosFormulario = {};
    const orc = parseFloat(orcamento);
    if (!orcamento || orc <= 0) {
      novosErros.orcamento = 'Informe um orçamento válido.';
    }
    if (jogos.length === 0 && jogoInput.trim() === '') {
      novosErros.jogos = 'Adicione pelo menos um jogo.';
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const jogosFinal = jogoInput && !jogos.includes(jogoInput) ? [...jogos, jogoInput] : jogos;

    if (!validar()) {
      setSucesso(false);
      return;
    }

    const pecasFinal = [...pecasSelecionadas, ...pecasManuais];

    console.log({ orcamento, jogos: jogosFinal, pecas: pecasFinal });
    setJogos(jogosFinal);
    setSucesso(true);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <HeaderCustom />
      <main className="max-w-3xl mx-auto px-6 py-12 flex-1">
        <h2 className="text-3xl font-bold mb-6">Montar PC Personalizado</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Orçamento */}
          <div>
            <label className="block text-sm font-medium">Orçamento (R$)</label>
            <input
              type="number"
              className={`w-full border px-4 py-2 rounded-lg ${errors.orcamento ? 'border-red-500' : 'border-gray-300'}`}
              value={orcamento}
              onChange={(e) => setOrcamento(e.target.value)}
            />
            {errors.orcamento && <p className="text-red-600 text-sm">{errors.orcamento}</p>}
          </div>

          {/* Jogos */}
          <div>
            <label className="block text-sm font-medium">Jogos Desejados</label>
            <input
              type="text"
              list="jogos-list"
              value={jogoInput}
              onChange={(e) => setJogoInput(e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddJogo(jogoInput);
                }
              }}
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Digite e pressione Enter"
            />
            <datalist id="jogos-list">
              {jogosSugeridos.map((jogo, idx) => (
                <option key={idx} value={jogo} />
              ))}
            </datalist>
            <div className="flex flex-wrap gap-2 mt-2">
              {jogos.map((jogo, i) => (
                <span
                  key={i}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-red-200"
                  onClick={() => setJogos(jogos.filter(j => j !== jogo))}
                >
                  {jogo} ✕
                </span>
              ))}
            </div>
            {errors.jogos && <p className="text-red-600 text-sm">{errors.jogos}</p>}
          </div>

          {/* Peças Cadastradas */}
          <div>
            <label className="block text-sm font-medium mb-2">Peças Já Adquiridas (Cadastradas)</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {produtosCadastrados.map((peca, i) => (
                <label key={i} className="flex items-center gap-2 border px-3 py-2 rounded-md cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pecasSelecionadas.includes(peca.nome)}
                    onChange={() => togglePecaSelecionada(peca.nome)}
                  />
                  <span>{peca.nome} ({peca.categoria})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Peças Manuais */}
          <div>
            <label className="block text-sm font-medium mb-2">Adicionar Peças Manualmente</label>
            <input
              type="text"
              value={pecaInput}
              onChange={(e) => setPecaInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddPecaManual();
                }
              }}
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Digite e pressione Enter"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {pecasManuais.map((p, i) => (
                <span
                  key={i}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-red-200"
                  onClick={() => setPecasManuais(pecasManuais.filter(x => x !== p))}
                >
                  {p} ✕
                </span>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-500 transition"
          >
            Enviar
          </button>
          {sucesso && <p className="text-green-600 text-sm mt-2">Pc enviado para montagem com sucesso!</p>}
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default PcConfigForm;
