import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderCustom from '../components/Header';
import Footer from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { ButtonSecondary } from '../components/Button';
import setupExemplo from "../assets/setupexemplo.jpg";

interface Product {
  id?: number;
  name: string;
  price: any;
  imageUrl: string;
  category: string;
  brand?: string;
  priceLink?: string;
}

interface Build {
  id: number;
  name: string;
  createdAt: string;
  buildParts: {
    part: Product;
  }[];
}

export default function BuildDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [build, setBuild] = useState<Build | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBuildDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/builds/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBuild(response.data as Build);
      } catch (err) {
        console.error("Erro ao buscar detalhes da montagem:", err);
        setError("Erro ao carregar a montagem.");
      } finally {
        setLoading(false);
      }
    };

    fetchBuildDetails();
  }, [id]);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <HeaderCustom />

      <main className="max-w-4xl mx-auto px-6 py-12 flex-1">
        {loading ? (
          <p>Carregando montagem...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : build ? (
          <>
            <div className="mb-6">
              <h2 className="text-3xl font-bold">{build.name}</h2>
              <p className="text-gray-500">
                Criada em: {new Date(build.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {build.buildParts.map((bp, idx) => (
                <ProductCard
                  key={idx}
                  brand={bp.part.brand || 'Marca Desconhecida'}
                  name={bp.part.name}
                  price={bp.part.price}
                  image={bp.part.imageUrl || setupExemplo}
                  link={bp.part.priceLink}
                />
              ))}
            </div>

            <div className="mt-8">
              <ButtonSecondary onClick={() => navigate(-1)}>
                Voltar
              </ButtonSecondary>
            </div>
          </>
        ) : (
          <p className="text-gray-600">Montagem não encontrada.</p>
        )}
      </main>

      <Footer />
    </div>
  );
}
