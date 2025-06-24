// src/pages/PartDashboard.tsx
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
import PartFormFields from "../components/PartFormFields";
import Loading from "../components/Loading";
import { useAuth } from "../hooks/useAuth";

export default function PartDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState({
    totalUsers: 82,
    totalParts: 0,
    totalBuilds: 37,
  });
  const [parts, setParts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [partBeingEdited, setPartBeingEdited] = useState<any | null>(null);
  const [selectedPartType, setSelectedPartType] = useState<string>("");
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    fetchParts();
  }, []);

  async function fetchParts() {
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/parts`);
      const list = await resp.json();
      setParts(list);
      setData((prev) => ({ ...prev, totalParts: list.length }));
    } catch (err) {
      console.error("Erro ao buscar peças:", err);
    } finally {
      setIsLoading(false);
    }
  }

  function openModal(peca?: any) {
    setPartBeingEdited(peca || null);
    setSelectedPartType(peca?.type || "");
    setFormData(peca || {});
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
    setPartBeingEdited(null);
    setSelectedPartType("");
    setFormData({});
  }

  function handleChange(e: React.ChangeEvent<any>) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);

    e.preventDefault();
    if (!selectedPartType) {
      alert("Selecione um tipo de peça.");
      return;
    }
    const token = localStorage.getItem("token");
    // payload base
    const base = {
      name: formData.name,
      brand: formData.brand,
      type: selectedPartType,
      priceLink: formData.priceLink,
      imageUrl: formData.imageUrl,
    };
    // nested specs
    const specKey = selectedPartType.toLowerCase(); // e.g. "cpu"
    const nested = {
      [specKey]: {
        create: PartFormFields.buildPayload(selectedPartType, formData),
      },
    };
    const payload = { ...base, ...nested };

    const url = partBeingEdited
      ? `${import.meta.env.VITE_API_URL}/parts/${partBeingEdited.id}`
      : `${import.meta.env.VITE_API_URL}/parts/create`;

    const method = partBeingEdited ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Erro ao salvar peça");
      const { part } = await res.json();
      alert(partBeingEdited ? "Peça atualizada!" : "Peça cadastrada!");
      closeModal();
      fetchParts();
      if (!partBeingEdited) {
        setParts((prev) => [...prev, part]);
        setData((prev) => ({ ...prev, totalParts: prev.totalParts + 1 }));
      } else {
        setParts((prev) => prev.map((p) => (p.id === part.id ? part : p)));
      }
    } catch (err) {
      console.error("Erro no cadastro:", err);
      alert("Erro ao salvar peça.");
    }

    setIsLoading(false);
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <HeaderCustom />
      <main className="flex-1 px-6 md:px-12 py-4 max-w-6xl mx-auto">
        {/* Estatísticas */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-100 rounded-2xl p-6 shadow">
            <div className="flex items-center gap-3 mb-2">
              <Cpu className="text-green-600" />
              <h3 className="text-lg font-semibold">Peças Cadastradas</h3>
            </div>
            <p className="text-2xl font-bold">{data.totalParts}</p>
          </div>
        </section>
        {/* Filtros e botão */}
        <div className="flex justify-between items-center mb-4">
          <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          {user?.userType === "ADMIN" && (
            <ButtonPrimary onClick={() => openModal()}>
              Adicionar Peça
            </ButtonPrimary>
          )}
        </div>
        {/* Grid de Peças */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {isLoading ? (
            <Loading />
          ) : (
            parts
              .filter((p) => !selectedCategory || p.type === selectedCategory)
              .map((part, idx) => (
                <motion.div key={idx} whileHover={{ scale: 1.03 }}>
                  <ProductCard
                    brand={part.brand}
                    name={part.name}
                    price={part.price}
                    image={part.imageUrl ? part.imageUrl : setupExemplo}
                    link={part.priceLink}
                  />
                  {user?.userType === "ADMIN" && (
                    <div className="flex justify-between mt-2">
                      <ButtonSecondary onClick={() => openModal(part)}>
                        Editar
                      </ButtonSecondary>
                      <ButtonPrimary
                        onClick={() => {
                          if (confirm("Excluir?")) {
                            fetch(
                              `${
                                import.meta.env.VITE_API_URL
                              }/${part.type.toLowerCase()}/${part.id}`,
                              {
                                method: "DELETE",
                              }
                            ).then(fetchParts);
                          }
                        }}
                      >
                        Remover
                      </ButtonPrimary>
                    </div>
                  )}
                </motion.div>
              ))
          )}
        </section>
      </main>
      <Footer />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={partBeingEdited ? "Editar Peça" : "Adicionar nova peça"}
      >
        {isLoading && <Loading />}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Nome da peça"
            value={formData.name || ""}
            onChange={handleChange}
            required
            className="border-gray-300 rounded p-2 border"
          />
          <input
            name="brand"
            placeholder="Marca"
            value={formData.brand || ""}
            onChange={handleChange}
            required
            className="border-gray-300 rounded p-2 border"
          />
          <input
            name="priceLink"
            placeholder="Link de preço"
            value={formData.priceLink || ""}
            onChange={handleChange}
            className="border-gray-300 rounded p-2 border"
          />
          <input
            name="imageUrl"
            placeholder="Link da Imagem"
            value={formData.imageUrl || ""}
            onChange={handleChange}
            className="border-gray-300 rounded p-2 border"
          />
          <select
            name="type"
            value={selectedPartType}
            onChange={(e) => {
              setSelectedPartType(e.target.value);
              handleChange(e);
            }}
            required
            className="border-gray-300 rounded p-2 border"
          >
            <option value="">Selecione o tipo</option>
            {[
              "CPU",
              "GPU",
              "RAM",
              "SSD",
              "PSU",
              "CASE",
              "MOTHERBOARD",
              "COOLER",
            ].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* campos específicos ficam aqui */}
          <PartFormFields
            selectedPartType={selectedPartType}
            partBeingEdited={formData}
            onChange={handleChange}
          />

          <div className="flex justify-between gap-4">
            <ButtonPrimary type="submit">Salvar</ButtonPrimary>
            <ButtonSecondary type="button" onClick={closeModal}>
              Cancelar
            </ButtonSecondary>
          </div>
        </form>
      </Modal>
    </div>
  );
}
