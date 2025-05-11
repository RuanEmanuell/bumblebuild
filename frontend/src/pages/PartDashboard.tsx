import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { ButtonPrimary, ButtonSecondary } from "../components/Button";
import { Cpu } from "lucide-react";
import setupExemplo from "../assets/setupexemplo.jpg";
import { Categories } from "../components/Categories";
import { motion } from "framer-motion";
import { ProductCard } from "../components/ProductCard";
import { Modal } from "../components/Modal";
import HeaderCustom from "../components/Header";

export default function PartDashboard() {
  const [data, setData] = useState({
    totalUsers: 82,
    totalParts: 0,
    totalBuilds: 37
  });

  const [parts, setParts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [partBeingEdited, setPartBeingEdited] = useState<any | null>(null);


  const openModal = (peca?: any) => {
    setPartBeingEdited(peca || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPartBeingEdited(null);
  };

  useEffect(() => {
    fetchParts();
  }, []);

  async function fetchParts() {
    try {
      const response = await fetch(`http://${import.meta.env.VITE_API_URL}/parts`);
      const data = await response.json();
      setParts(data);
      setData(prev => ({ ...prev, totalParts: data.length }));
    } catch (error) {
      console.error("Erro ao buscar peças:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const partsFiltradas = selectedCategory
    ? parts.filter(p => p.tipo === selectedCategory)
    : parts;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const novaPeca = {
      nome: form.nome.value,
      marca: form.marca.value,
      tipo: form.tipo.value,
      preco: null,
      linkPreco: form.link1.value
    };

    const url = partBeingEdited
      ? `http://${import.meta.env.VITE_API_URL}/parts/${partBeingEdited.id}`
      : `http://${import.meta.env.VITE_API_URL}/parts/create`;

    const method = partBeingEdited ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaPeca),
      });

      if (response.ok) {
        const data = await response.json();
        closeModal();
        form.reset();
        fetchParts();

        if (method === "POST") {
          setParts((prev) => [...prev, data]);
          setData((prev) => ({ ...prev, totalParts: prev.totalParts + 1 }));
        } else {
          setParts((prev) =>
            prev.map((p) => (p.id === data.id ? data : p))
          );
        }
      } else {
        console.error("Erro ao salvar peça");
      }
    } catch (err) {
      console.error(err);
    }
  };


  const removerPeca = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta peça?")) return;

    try {
      const response = await fetch(`http://${import.meta.env.VITE_API_URL}/parts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchParts();
        setParts(prev => prev.filter(p => p.id !== id));
        setData(prev => ({ ...prev, totalParts: prev.totalParts - 1 }));
      } else {
        console.error("Erro ao remover peça");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <HeaderCustom />

      <main className="flex-1">
        <div className="px-6 py-6">
          <h1 className="text-3xl font-bold mb-2">Painel de Peças de PC</h1>
          <p className="text-gray-600">Aqui você pode gerenciar todas as peças disponíveis no sistema.</p>
        </div>

        <section className="px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4">
          <div className="bg-gray-100 rounded-2xl p-6 shadow">
            <div className="flex items-center gap-3 mb-2">
              <Cpu className="text-green-600" />
              <h3 className="text-lg font-semibold">Peças Cadastradas</h3>
            </div>
            <p className="text-2xl font-bold">{data.totalParts}</p>
          </div>
        </section>
        <div className="px-6 md:px-12 py-4 flex justify-end">
          <ButtonPrimary onClick={() => openModal()}>Adicionar Peça</ButtonPrimary>
        </div>

        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <section className="px-6 md:px-12 py-8">
          <h3 className="text-xl font-semibold mb-6">
            {selectedCategory ? `Produtos de ${selectedCategory}` : "Em destaque"}
          </h3>

          {isLoading ? (
            <p>Carregando peças...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {partsFiltradas.map((peca, index) => (
                <motion.div key={index} whileHover={{ scale: 1.03 }}>
                  <ProductCard
                    name={peca.nome}
                    price={`R$ ${peca.preco}`}
                    stars={peca.estrelas || 0}
                    image={setupExemplo}
                    link={peca.link}
                  />
                  <div className="flex justify-between mt-2">
                    <ButtonSecondary onClick={() => openModal(peca)}>Editar</ButtonSecondary>
                    <ButtonPrimary onClick={() => removerPeca(peca.id)}>Remover</ButtonPrimary>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={partBeingEdited ? "Editar Peça" : "Adicionar nova peça"}>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            name="nome"
            type="text"
            placeholder="Nome da peça"
            defaultValue={partBeingEdited?.nome || ""}
            className="border border-gray-300 rounded p-2"
          />
          <input
            name="marca"
            type="text"
            placeholder="Marca"
            defaultValue={partBeingEdited?.marca || ""}
            className="border border-gray-300 rounded p-2"
          />
          <select
            name="tipo"
            className="border border-gray-300 rounded p-2"
            defaultValue={partBeingEdited?.tipo || ""}
          >
            <option value="">Selecione o tipo</option>
            <option value="CPU">CPU</option>
            <option value="GPU">GPU</option>
            <option value="RAM">RAM</option>
            <option value="SSD">SSD</option>
            <option value="FONTE">Fonte</option>
            <option value="GABINETE">Gabinete</option>
            <option value="PLACA_MAE">Placa Mãe</option>
            <option value="COOLER">Cooler</option>
          </select>
          <input
            name="link1"
            type="text"
            placeholder="Link do produto (ex: Kabum, Amazon)"
            defaultValue={partBeingEdited?.link || ""}
            className="border border-gray-300 rounded p-2"
          />

          <div className="flex justify-end gap-4">
            <ButtonPrimary type="submit">Salvar</ButtonPrimary>
            <ButtonSecondary onClick={closeModal}>Cancelar</ButtonSecondary>
          </div>
        </form>
      </Modal>
    </div>
  );
}
