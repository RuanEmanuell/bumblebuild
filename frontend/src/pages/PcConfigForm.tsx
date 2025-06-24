import React, { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';
import HeaderCustom from '../components/Header';
import Footer from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { ButtonPrimary, ButtonSecondary } from '../components/Button';
import setupExemplo from "../assets/setupexemplo.jpg";

interface Product {
  id?: number;
  name: string;
  price: string;
  imageUrl: string;
  category: string;
  brand?: string;
  link?: string;
}

interface FormErrors {
  budget?: string;
}

const PcConfigForm: React.FC = () => {

  const [budget, setBudget] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [build, setBuild] = useState<Product[]>([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [buildName, setBuildName] = useState('');
  const [selectedPartIds, setSelectedPartIds] = useState<number[]>([]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const orc = parseFloat(budget);
    if (!budget || orc < 5000) {
      newErrors.budget = 'É necessário um orçamento mínimo de 5000';
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

      const res = await axios.post<SuggestResponse>('http://localhost:3000/builds/suggest', {
        budget: parseFloat(budget),
      });

      console.log(res.data.configuration);

      setBuild(res.data.configuration || []);
      setResponseMessage(res.data.message || 'PC montado com sucesso!');
      setSuccess(true);
    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
      setSuccess(false);
      alert('Erro ao enviar os dados. Verifique o console.');
    } finally {
      setLoading(false);
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
        alert('Você precisa estar logado para salvar a build.');
        setSuccess(false);
        return;
      }

      const res = await axios.post(
        'http://localhost:3000/builds/create',
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
    } catch (error) {
      console.error('Erro ao salvar build:', error);
      setSuccess(false);
      alert('Erro ao salvar a build. Verifique o console.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success && build.length > 0) {
      setSelectedPartIds(build.map(part => part.id || 0));
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
            <label className="block text-sm font-medium">Orçamento (R$)</label>
            <input
              type="number"
              className={`w-full border px-4 py-2 rounded-lg ${errors.budget ? 'border-red-500' : 'border-gray-300'}`}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
            {errors.budget && <p className="text-red-600 text-sm">{errors.budget}</p>}
          </div>

          <ButtonPrimary
            type="submit">
            {loading ? 'Enviando...' : 'Montar'}
          </ButtonPrimary>

          {loading && <p className="text-gray-600 mt-2">Carregando configuração...</p>}

          {/*mensagem do backend*/}
          {responseMessage && (
            <p className={`text-sm ${success ? 'text-green-600' : 'text-red-600'}`}>
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
                required
              />
              <ButtonSecondary onClick={handleSaveBuild}
              className='mt-4 mb-4'>
                Salvar montagem
              </ButtonSecondary>

              <h3 className="text-xl font-bold mb-4">Configuração Recomendada</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {build.map((part, idx) => (
                  <ProductCard
                    key={idx}
                    brand={part.brand || 'Marca Desconhecida'}
                    name={part.name}
                    price={`R$ ${part.price}`}
                    image={part.imageUrl ? part.imageUrl : setupExemplo}
                    link={part.link}
                  />
                ))}
              </div>

            </section>
          )}

        </form>
      </main>
      <Footer />
    </div>
  );
};

export default PcConfigForm;
