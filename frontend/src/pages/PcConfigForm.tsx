import React, { useState, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderCustom from '../components/Header';
import Footer from '../components/Footer';
import { ButtonPrimary } from '../components/Button';

//enum para os tipos de peças
export type PartTypeEnum = 'CPU' | 'GPU' | 'RAM' | 'SSD' | 'PSU' | 'CASE' | 'MOTHERBOARD' | 'COOLER';

export type SuggestedConfiguration = SuggestedPart[];

//erros do form
interface FormErrors {
  budget?: string;
}

const PcConfigForm: React.FC = () => {
  const location = useLocation();

  const registeredProducts: BasePart[] = location.state?.availableParts || [];

  const [budget, setBudget] = useState('');
  const [selectedRegisteredPartIds, setSelectedRegisteredPartIds] = useState<number[]>([]);
  const [partInput, setPartInput] = useState('');
  const [manualParts, setManualParts] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [suggestedConfig, setSuggestedConfig] = useState<SuggestedConfiguration | null>(null);
  const [suggestedCost, setSuggestedCost] = useState<number>(0);

  const handleAddManualPart = () => {
    if (partInput.trim() && !manualParts.includes(partInput.trim())) {
      setManualParts([...manualParts, partInput.trim()]);
    }
    setPartInput('');
  };

  const toggleSelectedRegisteredPart = (partId: number) => {
    setSelectedRegisteredPartIds((prev) =>
      prev.includes(partId) ? prev.filter(id => id !== partId) : [...prev, partId]
    );
  };

  //validação do form
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const orc = parseFloat(budget);
    if (!budget || isNaN(orc) || orc <= 0) {
      newErrors.budget = 'Informe um orçamento válido.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    setSuggestedConfig(null);
    setSuggestedCost(0);

    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ budget: parseFloat(budget) }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao obter sugestão de configuração.');
      }

      const result = await response.json();
      setSuggestedConfig(result.configuration);
      setSuggestedCost(result.totalCost || 0);

      setSuccessMessage('Configuração sugerida com sucesso!');
    } catch (error: any) {
      setErrorMessage(error.message || 'Erro ao processar sua solicitação.');
      console.error('Erro ao sugerir configuração:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBuild = async () => {
    if (!suggestedConfig || suggestedConfig.length === 0) {
      setErrorMessage('Nenhuma configuração sugerida para salvar.');
      return;
    }

    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const partIdsToSave = suggestedConfig.map(part => part.id);
    const buildName = `Montagem Sugerida - ${new Date().toLocaleString('pt-BR')}`; 

    try {
      const response = await fetch('/api/builds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${seuTokenDeAutenticacao}`
        },
        body: JSON.stringify({
          name: buildName,
          partIds: partIdsToSave,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao salvar a montagem.');
      }

      const result = await response.json();
      setSuccessMessage(`Montagem "${result.name}" salva com sucesso!`);
    } catch (error: any) {
      setErrorMessage(error.message || 'Erro ao salvar a montagem.');
      console.error('Erro ao salvar montagem:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black flex flex-col">
      <HeaderCustom />
      <main className="max-w-3xl mx-auto px-6 py-12 flex-1 w-full">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Monte seu PC Personalizado</h2>

        {/*msg para erro ou sucesso*/}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Erro!</strong>
            <span className="block sm:inline"> {errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Sucesso!</strong>
            <span className="block sm:inline"> {successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">


          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Orçamento (R$)</label>
            <input
              id="budget"
              type="number"
              className={`w-full border px-4 py-2 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 ${errors.budget ? 'border-red-500' : 'border-gray-300'}`}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Ex: 5000"
              required
            />
            {errors.budget && <p className="text-red-600 text-sm mt-1">{errors.budget}</p>}
          </div>

          {registeredProducts.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Peças Já Adquiridas (Cadastradas)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {registeredProducts.map((peca) => (
                  <label key={peca.id} className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                    <input
                      type="checkbox"
                      checked={selectedRegisteredPartIds.includes(peca.id)}
                      onChange={() => toggleSelectedRegisteredPart(peca.id)}
                      className="form-checkbox h-4 w-4 text-yellow-500 rounded"
                    />
                    <span>{peca.name} ({peca.type.replace('_', ' ')})</span> {/* Exibindo o tipo da peça */}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div>
            <label htmlFor="manual-parts" className="block text-sm font-medium text-gray-700 mb-1">Adicionar Peças Manualmente (para informação da sugestão)</label>
            <input
              id="manual-parts"
              type="text"
              value={partInput}
              onChange={(e) => setPartInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddManualPart();
                }
              }}
              className="w-full border px-4 py-2 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Ex: Teclado Mecânico (pressione Enter)"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {manualParts.map((p, i) => (
                <span
                  key={i}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-red-200 transition-colors duration-200"
                  onClick={() => setManualParts(manualParts.filter(x => x !== p))}
                >
                  {p} ✕
                </span>
              ))}
            </div>
          </div>

          <ButtonPrimary
          type="submit"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-3 text-gray-900" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Obter Sugestão de PC'
            )}
          </ButtonPrimary>
        </form>

        {/*mostrando sugestão*/}
        {suggestedConfig && suggestedConfig.length > 0 && (
          <section className="mt-12 bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Sugestão de Configuração</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedConfig.map((part) => (
                <div key={part.id} className="border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                  <img
                    src={part.imageUrl || `https://placehold.co/100x100/FEEB00/000?text=${part.type.replace('_', ' ')}`}
                    alt={part.name || 'Imagem da Peça'}
                    className="w-24 h-24 object-contain mb-3 rounded-md border border-gray-100"
                    onError={(e) => { e.currentTarget.src = `https://placehold.co/100x100/FEEB00/000?text=${part.type.replace('_', ' ')}`; }}
                  />
                  <h4 className="font-semibold text-lg text-gray-800">{part.name}</h4>
                  <p className="text-sm text-gray-600">{part.brand} | {part.type.replace('_', ' ')}</p>
                  <p className="text-xl font-bold text-green-600 mt-2">R$ {part.price.toFixed(2)}</p>
                  {part.priceLink && (
                    <a href={part.priceLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline mt-2">
                      Ver Oferta
                    </a>
                  )}
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-8 pt-6 flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-800">Custo Total Sugerido:</span>
              <span className="text-3xl font-bold text-green-700">R$ {suggestedCost.toFixed(2)}</span>
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={handleSaveBuild}
                className="px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading} 
              >
                {loading ? 'Salvando...' : 'Salvar Esta Montagem'}
              </button>
            </div>
          </section>
        )}
        {suggestedConfig && suggestedConfig.length === 0 && (
          <div className="mt-12 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p className="font-bold">Nenhuma configuração encontrada</p>
            <p>Não foi possível encontrar uma configuração que se encaixe no seu orçamento.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PcConfigForm;