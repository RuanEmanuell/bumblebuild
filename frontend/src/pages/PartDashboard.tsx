import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { ButtonPrimary, ButtonSecondary } from "../components/Button";
import { Cpu } from "lucide-react";
import setupExemplo from "../assets/setupexemplo.jpg";
import { Categorias } from "../components/Categorias";
import { motion } from "framer-motion";
import { ProductCard } from "../components/ProductCard";
import { Modal } from "../components/Modal";
import HeaderCustom from "../components/Header";

export default function PartDashboard() {
  const [dados, setDados] = useState({
    totalUsuarios: 82,
    totalPecas: 0,
    totalMontagens: 37
  });

  const [pecas, setPecas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pecaEmEdicao, setPecaEmEdicao] = useState<any | null>(null);

  const abrirModal = (peca?: any) => {
    setPecaEmEdicao(peca || null);
    setIsModalOpen(true);
  };
  const fecharModal = () => {
    setIsModalOpen(false);
    setPecaEmEdicao(null);
  };

  useEffect(() => {
    fetchPecas();
  }, []);

  async function fetchPecas() {
    try {
      const response = await fetch("http://localhost:3000/pecas");
      const data = await response.json();
      setPecas(data);
      setDados(prev => ({ ...prev, totalPecas: data.length }));
    } catch (error) {
      console.error("Erro ao buscar peças:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const pecasFiltradas = categoriaSelecionada
    ? pecas.filter(p => p.tipo === categoriaSelecionada)
    : pecas;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const novaPeca = {
      nome: form.nome.value,
      preco: Number(form.preco.value),
      marca: form.marca.value,
      tipo: form.tipo.value,
    };

    const url = pecaEmEdicao
      ? `http://localhost:3000/pecas/${pecaEmEdicao.id}`
      : "http://localhost:3000/pecas/create";

    const method = pecaEmEdicao ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novaPeca)
      });

      if (response.ok) {
        const data = await response.json();
        fecharModal();
        form.reset();
        fetchPecas();

        if (method === "POST") {
          setPecas(prev => [...prev, data]);
          setDados(prev => ({ ...prev, totalPecas: prev.totalPecas + 1 }));
        } else {
          setPecas(prev => prev.map(p => (p.id === data.id ? data : p)));
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
      const response = await fetch(`http://localhost:3000/pecas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchPecas();
        setPecas(prev => prev.filter(p => p.id !== id));
        setDados(prev => ({ ...prev, totalPecas: prev.totalPecas - 1 }));
      } else {
        console.error("Erro ao remover peça");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <HeaderCustom/>

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
            <p className="text-2xl font-bold">{dados.totalPecas}</p>
          </div>
        </section>

        <div className="px-6 md:px-12 py-4 flex justify-end">
          <ButtonPrimary onClick={() => abrirModal()}>Adicionar Peça</ButtonPrimary>
        </div>

        <Categorias
          categoriaSelecionada={categoriaSelecionada}
          setCategoriaSelecionada={setCategoriaSelecionada}
        />

        <section className="px-6 md:px-12 py-8">
          <h3 className="text-xl font-semibold mb-6">
            {categoriaSelecionada ? `Produtos de ${categoriaSelecionada}` : "Em destaque"}
          </h3>

          {isLoading ? (
            <p>Carregando peças...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {pecasFiltradas.map((peca, index) => (
                <motion.div key={index} whileHover={{ scale: 1.03 }}>
                  <ProductCard
                    nome={peca.nome}
                    preco={`R$ ${peca.preco}`}
                    estrelas={peca.estrelas || 0}
                    imagem={setupExemplo}
                  />
                  <div className="flex justify-between mt-2">
                    <ButtonSecondary onClick={() => abrirModal(peca)}>Editar</ButtonSecondary>
                    <ButtonPrimary onClick={() => removerPeca(peca.id)}>Remover</ButtonPrimary>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />

      <Modal isOpen={isModalOpen} onClose={fecharModal} title={pecaEmEdicao ? "Editar Peça" : "Adicionar nova peça"}>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input name="nome" type="text" placeholder="Nome da peça" defaultValue={pecaEmEdicao?.nome || ""} className="border border-gray-300 rounded p-2" />
          <input name="preco" type="number" placeholder="Preço" defaultValue={pecaEmEdicao?.preco || ""} className="border border-gray-300 rounded p-2" />
          <input name="marca" type="text" placeholder="Marca" defaultValue={pecaEmEdicao?.marca || ""} className="border border-gray-300 rounded p-2" />
          <select name="tipo" className="border border-gray-300 rounded p-2" defaultValue={pecaEmEdicao?.tipo || ""}>
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

          <div className="flex justify-end gap-4">
            <ButtonPrimary type="submit">Salvar</ButtonPrimary>
            <ButtonSecondary onClick={fecharModal}>Cancelar</ButtonSecondary>
          </div>
        </form>
      </Modal>
    </div>
  );
}
