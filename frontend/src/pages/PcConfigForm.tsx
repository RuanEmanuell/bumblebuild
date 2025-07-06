import React, { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';
import HeaderCustom from '../components/Header';
import Footer from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { ButtonPrimary, ButtonSecondary } from '../components/Button';
import setupExemplo from "../assets/setupexemplo.jpg";
import Dialog from '../components/Dialog';
export interface Product {
  id?: number;
  name: string;
  price: any;
  imageUrl: string;
  category: string;
  brand?: string;
  priceLink?: string;
}

interface FormErrors {
  budget?: string;
}

const PcConfigForm: React.FC = () => {

  const [budget, setBudget] = useState('');
  const [includeGPU, setIncludeGPU] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [build, setBuild] = useState<Product[]>([]);
  const [buildPrice, setBuildPrice] = useState<any>(0);
  const [responseMessage, setResponseMessage] = useState<string | null>('');
  const [buildName, setBuildName] = useState('');
  const [selectedPartIds, setSelectedPartIds] = useState<number[]>([]);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const orc = parseFloat(budget);
    if (!budget || orc < 1500) {
      newErrors.budget = 'É necessário um orçamento mínimo de R$ 1500';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  interface SuggestResponse {
    configuration: Product[];
    message?: string;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setSuccess(false);
      return;
    }

    try {
      setLoading(true);
      setBuildPrice(0);

      const res = await axios.post<SuggestResponse>(`${import.meta.env.VITE_API_URL}/builds/suggest`, {
        budget: parseFloat(budget),
        includeGPU: includeGPU
      });

      console.log(res.data.configuration);

      setBuild(res.data.configuration || []);
      setResponseMessage(res.data.message || 'PC montado com sucesso!');
      setSuccess(true);
    } catch (error: any) {
      setResponseMessage(
        "Nenhum PC dentro do orçamento foi encontrado."
      );
      setSuccess(false);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setResponseMessage(null);
      }, 5000);
    }
  };

  const handleSaveBuild = async () => {

    if (!validate()) {
      setSuccess(false);
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem('token');

      if (!token) {
        setShowLoginDialog(true);
        setSuccess(false);
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/builds/create`,
        {
          name: buildName,
          partIds: selectedPartIds
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Build criada:', res.data);

      setResponseMessage('Build salva com sucesso!');
      setSuccess(true);
    } catch (error: any) {
      console.error('Erro ao salvar build:', error);
      setSuccess(false);
      setResponseMessage(error?.response?.data?.message || 'Erro ao salvar a build.');
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success && build.length > 0) {
      setSelectedPartIds(build.map(part => part.id || 0));
      let buildPrices = build.map(part => part.price);
      let totalBuildPrice = 0;

      for (let i = 0; i < buildPrices.length; i++) {
        totalBuildPrice += buildPrices[i];
      }
      setBuildPrice(totalBuildPrice);
    }
  }, [success, build]);


  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <HeaderCustom />
      <main className="max-w-3xl mx-auto px-6 py-12 flex-1">
        <h2 className="text-3xl font-bold mb-6">Montar PC Personalizado</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/*orçamento*/}
          <div>
            <label className="block text-md font-medium">Orçamento (R$)</label>
            <input
              type="number"
              className={`w-full border px-4 py-2 rounded-lg ${errors.budget ? 'border-red-500' : 'border-gray-300'}`}
              value={budget}
              onChange={(e) => {
                setBudget(e.target.value);
                setResponseMessage(""); //limpa a mensagem ao digitar
              }}

            />
            <div className="flex flex-row pt-2">
              <label className="block text-md font-medium mr-2">Incluir placa de vídeo?</label>
              <input
                type="checkbox"
                value={includeGPU.toString()}
                className="border-2 border-red-500"
                onChange={() => setIncludeGPU(i => !i)}
              />
            </div>
            {errors.budget && <p className="text-red-600 text-sm">{errors.budget}</p>}
          </div>

          <ButtonPrimary
            type="submit">
            {loading ? 'Enviando...' : 'Montar'}
          </ButtonPrimary>
        </form>
        {loading && <p className="text-gray-600 mt-2">Carregando configuração...</p>}

        {/*mensagem do backend*/}
        {responseMessage && (
          <p className={`text-sm ${success ? 'text-green-600' : 'text-red-600'} pt-4`}>
            {responseMessage}
          </p>
        )}

        {/*mostrar as peças da montagem*/}
        {success && build.length > 0 && (
          <section className="mt-8">
            <label className="block text-sm font-medium m-2">Nome da Montagem</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded-lg"
              value={buildName}
              onChange={(e) => setBuildName(e.target.value)}
            />
            <ButtonSecondary onClick={handleSaveBuild}
              className='mt-4 mb-4'>
              Salvar montagem
            </ButtonSecondary>

            <h3 className="text-xl font-bold my-4">Configuração Recomendada</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {build.map((part, idx) => (
                <ProductCard
                  key={idx}
                  brand={part.brand || 'Marca Desconhecida'}
                  name={part.name}
                  price={part.price}
                  image={part.imageUrl ? part.imageUrl : setupExemplo}
                  link={part.priceLink}
                />
              ))}
            </div>
            <h4 className="text-lg font-bold my-4 mx-auto w-fit">Preço total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(buildPrice.toFixed(2))}</h4>

          </section>
        )}


      </main>
      <Dialog
        open={showLoginDialog}
        title="Login necessário"
        message="Você precisa estar logado para salvar a build. Deseja fazer login agora?"
        onClose={() => setShowLoginDialog(false)}
        onConfirm={() => {
          setShowLoginDialog(false);
          window.location.href = "/login";
        }}
      />

      <Footer />
    </div>
  );
};

export default PcConfigForm;
