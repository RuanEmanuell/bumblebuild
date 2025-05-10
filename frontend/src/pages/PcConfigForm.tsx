import React, { useState, KeyboardEvent, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderCustom from '../components/Header';
import Footer from '../components/Footer';

interface Product {
  name: string;
  price: string;
  stars: number;
  image: string;
  category: string;
}

interface FormErrors {
  budget?: string;
  games?: string;
}

const suggestedGames = [
  'League of Legends', 'Valorant', 'CS:GO', 'Fortnite', 'GTA V', 'Elden Ring',
  'Call of Duty: Warzone', 'Minecraft', 'The Witcher 3', 'Cyberpunk 2077'
];

const PcConfigForm: React.FC = () => {
  const location = useLocation();
  const registeredProducts: Product[] = location.state?.availableParts || [];

  const [budget, setBudget] = useState('');
  const [games, setGames] = useState<string[]>([]);
  const [gameInput, setGameInput] = useState('');
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [partInput, setPartInput] = useState('');
  const [manualParts, setManualParts] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);


  const handleAddGame = (game: string) => {
    if (game && !games.includes(game)) {
      setGames([...games, game]);
    }
    setGameInput('');
  };

  const handleAddManualPart = () => {
    if (partInput && !manualParts.includes(partInput)) {
      setManualParts([...manualParts, partInput]);
    }
    setPartInput('');
  };

  const toggleSelectedPart = (name: string) => {
    setSelectedParts((prev) =>
      prev.includes(name) ? prev.filter(p => p !== name) : [...prev, name]
    );
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const orc = parseFloat(budget);
    if (!budget || orc <= 0) {
      newErrors.budget = 'Informe um orçamento válido.';
    }
    if (games.length === 0 && gameInput.trim() === '') {
      newErrors.games = 'Adicione pelo menos um game.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const gamesFinal = gameInput && !games.includes(gameInput) ? [...games, gameInput] : games;

    if (!validate()) {
      setSuccess(false);
      return;
    }

    const finalParts = [...selectedParts, ...manualParts];

    console.log({ budget, games: gamesFinal, pecas: finalParts });
    setGames(gamesFinal);
    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <HeaderCustom />
      <main className="max-w-3xl mx-auto px-6 py-12 flex-1">
        <h2 className="text-3xl font-bold mb-6">Montar PC Personalizado</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/*orçamento */}
          <div>
            <label className="block text-sm font-medium">Orçamento (R$)</label>
            <input
              type="number"
              className={`w-full border px-4 py-2 rounded-lg ${errors.budget ? 'border-red-500' : 'border-gray-300'}`}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
            {errors.budget && <p className="text-red-600 text-sm">{errors.budget}</p>}
          </div>

          {/* games */}
          <div>
            <label className="block text-sm font-medium">games Desejados</label>
            <input
              type="text"
              list="games-list"
              value={gameInput}
              onChange={(e) => setGameInput(e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddGame(gameInput);
                }
              }}
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Digite e pressione Enter"
            />
            <datalist id="games-list">
              {suggestedGames.map((game, idx) => (
                <option key={idx} value={game} />
              ))}
            </datalist>
            <div className="flex flex-wrap gap-2 mt-2">
              {games.map((game, i) => (
                <span
                  key={i}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-red-200"
                  onClick={() => setGames(games.filter(j => j !== game))}
                >
                  {game} ✕
                </span>
              ))}
            </div>
            {errors.games && <p className="text-red-600 text-sm">{errors.games}</p>}
          </div>

          {/* Peças Cadastradas */}
          <div>
            <label className="block text-sm font-medium mb-2">Peças Já Adquiridas (Cadastradas)</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {registeredProducts.map((peca, i) => (
                <label key={i} className="flex items-center gap-2 border px-3 py-2 rounded-md cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedParts.includes(peca.name)}
                    onChange={() => toggleSelectedPart(peca.name)}
                  />
                  <span>{peca.name} ({peca.category})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Peças Manuais */}
          <div>
            <label className="block text-sm font-medium mb-2">Adicionar Peças Manualmente</label>
            <input
              type="text"
              value={partInput}
              onChange={(e) => setPartInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddManualPart();
                }
              }}
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Digite e pressione Enter"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {manualParts.map((p, i) => (
                <span
                  key={i}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-red-200"
                  onClick={() => setManualParts(manualParts.filter(x => x !== p))}
                >
                  {p} ✕
                </span>
              ))}
            </div>
          </div>

          {/*submit */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-500 transition"
          >
            Enviar
          </button>
          {success && <p className="text-green-600 text-sm mt-2">Pc enviado para montagem com sucesso!</p>}
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default PcConfigForm;
