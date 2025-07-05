import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderCustom from '../components/Header';
import Footer from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { ButtonPrimary, ButtonSecondary } from '../components/Button';
import setupExemplo from "../assets/setupexemplo.jpg";
import Dialog from '../components/Dialog';

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
  const [newName, setNewName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [buildPrice, setBuildPrice] = useState<any>(0);
  const [dialogData, setDialogData] = useState<{
    open: boolean;
    title: string;
    message: string;
    onConfirm?: () => void;
  }>({
    open: false,
    title: "",
    message: "",
  });

  useEffect(() => {
    const fetchBuildDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/builds/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const buildData = response.data as Build;
        setBuild(buildData);
        setNewName(buildData.name);

        let buildPrices = buildData.buildParts.map(item => item.part.price);
        let totalBuildPrice = 0;

        for (let i = 0; i < buildPrices.length; i++) {
          totalBuildPrice += buildPrices[i];
        }
        setBuildPrice(totalBuildPrice);

        console.log(buildData.buildParts);
      } catch (err) {
        console.error("Erro ao buscar detalhes da montagem:", err);
        setError("Erro ao carregar a montagem.");
      } finally {
        setLoading(false);
      }
    };

    fetchBuildDetails();
  }, [id]);

  const handleUpdateName = async () => {
    if (!newName.trim()) {
      setDialogData({
        open: true,
        title: "Erro",
        message: "O nome da montagem não pode ser vazio.",
        onConfirm: () => setDialogData(prev => ({ ...prev, open: false })),
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_API_URL}/builds/${id}`,
        { name: newName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBuild((prev) => prev ? { ...prev, name: newName } : null);
      setIsEditing(false);

      setDialogData({
        open: true,
        title: "Sucesso",
        message: "Nome atualizado com sucesso!",
        onConfirm: () => setDialogData(prev => ({ ...prev, open: false })),
      });
    } catch (err) {
      console.error("Erro ao atualizar nome:", err);
      setDialogData({
        open: true,
        title: "Erro",
        message: "Erro ao atualizar o nome.",
        onConfirm: () => setDialogData(prev => ({ ...prev, open: false })),
      });
    }
  };

  const handleDelete = async () => {
    setDialogData({
      open: true,
      title: "Confirmar exclusão",
      message: `Tem certeza que deseja excluir a montagem "${build?.name}"?`,
      onConfirm: async () => {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`${import.meta.env.VITE_API_URL}/builds/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          navigate("/history");
        } catch (err) {
          console.error("Erro ao excluir montagem:", err);
          setDialogData({
            open: true,
            title: "Erro",
            message: "Erro ao excluir montagem",
            onConfirm: () => setDialogData(prev => ({ ...prev, open: false })),
          });
        } finally {
          setDialogData(prev => ({ ...prev, open: false }));
        }
      }
    });
  };

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
              <label className="block text-sm font-medium mb-1">Nome da Montagem</label>

              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                  />
                  <div className="flex gap-3 mt-3">
                    <ButtonPrimary onClick={handleUpdateName}>Salvar</ButtonPrimary>
                    <ButtonSecondary onClick={() => {
                      setNewName(build.name); //restaura o valor original
                      setIsEditing(false);
                    }}>Cancelar</ButtonSecondary>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{build.name}</h2>
                  <ButtonPrimary onClick={() => setIsEditing(true)}>Editar</ButtonPrimary>
                </div>
              )}

              <div className="mt-4">
                <ButtonSecondary onClick={handleDelete} className='hover:bg-red-700'>Excluir Montagem</ButtonSecondary>
              </div>

              <p className="text-gray-500 mt-2">
                Criada em: {new Date(build.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>

            <h3 className="text-xl font-bold mb-4">Peças da Montagem</h3>
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

            <h4 className="text-lg font-bold my-4 mx-auto w-fit">Preço total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(buildPrice.toFixed(2))}</h4>

            <div className="mt-8">
              <ButtonSecondary onClick={() => navigate(-1)}>Voltar</ButtonSecondary>
            </div>
          </>
        ) : (
          <p className="text-gray-600">Montagem não encontrada.</p>
        )}
      </main>
      <Dialog
        open={dialogData.open}
        title={dialogData.title}
        message={dialogData.message}
        onClose={() => setDialogData(prev => ({ ...prev, open: false }))}
        onConfirm={() => {
          dialogData.onConfirm?.();
        }}
      />

      <Footer />
    </div>
  );
}
