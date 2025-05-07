import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeaderCustom from "../components/Header";
import Footer from "../components/Footer";
import { ButtonHome } from "../components/ButtonHome";

type ComponentType =
  | "CPU"
  | "PowerSupply"
  | "Cabinet"
  | "GPU"
  | "Motherboard"
  | "RAM";

export default function ComponentsCadaster() {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<ComponentType | "">("");
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (
    e: React.ChangeEvent<any>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleNext = () => {
    if (type) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (type === "CPU") {
      const cpuData = {
        socket: formData.socket,
        nucleos: Number(formData.nucleos),
        threads: Number(formData.threads),
        frequencia: Number(formData.frequencia),
        tdp: Number(formData.tdp),
        graficosIntegrados: !!formData.graficosIntegrados,
        peca: {
          nome: formData.nome,
          marca: formData.marca,
          preco: Number(formData.preco),
          tipo: "CPU",
        },
      };

      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/cpu/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(cpuData),
        });

        if (!response.ok) {
          throw new Error("Erro ao cadastrar CPU");
        }

        const result = await response.json();
        console.log("CPU cadastrada com sucesso:", result);
        alert("CPU cadastrada com sucesso!");
        // Você pode resetar o form aqui se quiser:
        // setFormData({});
        // setStep(1);
        // setType('');
      } catch (error) {
        console.error("Erro no cadastro:", error);
        alert("Erro ao cadastrar CPU.");
      }
    }
  };

  const renderFormFields = () => {
    switch (type) {
      case "CPU":
        return (
          <>
            <input name="nome" placeholder="Nome" onChange={handleChange} />
            <input name="marca" placeholder="Marca" onChange={handleChange} />
            <input
              name="preco"
              type="number"
              step="0.01"
              placeholder="Preço"
              onChange={handleChange}
            />
            <input name="socket" placeholder="Socket" onChange={handleChange} />
            <input
              name="nucleos"
              type="number"
              placeholder="Núcleos"
              onChange={handleChange}
            />
            <input
              name="threads"
              type="number"
              placeholder="Threads"
              onChange={handleChange}
            />
            <input
              name="frequencia"
              type="number"
              step="0.1"
              placeholder="Frequência (GHz)"
              onChange={handleChange}
            />
            <input
              name="tdp"
              type="number"
              placeholder="TDP (W)"
              onChange={handleChange}
            />
            <label
              htmlFor="graficosIntegrados"
              className="flex items-center gap-2 cursor-pointer"
            >
              Gráficos Integrados:
              <input
                id="graficosIntegrados"
                name="graficosIntegrados"
                type="checkbox"
                onChange={handleChange}
                className="cursor-pointer"
              />
            </label>
          </>
        );
      case "PowerSupply":
        return (
          <>
            <input
              name="potenciaW"
              placeholder="Potência (W)"
              onChange={handleChange}
            />
            <input
              name="certificacao"
              placeholder="Certificação"
              onChange={handleChange}
            />
            <label
              htmlFor="modular"
              className="flex items-center gap-2 cursor-pointer"
            >
              Modular:
              <input
                id="modular"
                name="modular"
                type="checkbox"
                onChange={handleChange}
                className="cursor-pointer"
              />
            </label>
          </>
        );
      case "Cabinet":
        return (
          <>
            <input
              name="tamanhoSuportado"
              placeholder="Tamanhos suportados (ex: ATX, mATX)"
              onChange={handleChange}
            />
            <input
              name="comprimentoMaximoGpuMM"
              type="number"
              placeholder="Comprimento máximo da GPU (mm)"
              onChange={handleChange}
            />
          </>
        );
      case "GPU":
        return (
          <>
            <input
              name="memoriaGB"
              type="number"
              placeholder="Memória (GB)"
              onChange={handleChange}
            />
            <input
              name="tipoMemoria"
              placeholder="Tipo de Memória"
              onChange={handleChange}
            />
            <input
              name="tdp"
              type="number"
              placeholder="TDP (W)"
              onChange={handleChange}
            />
            <input
              name="comprimentoMM"
              type="number"
              placeholder="Comprimento (mm)"
              onChange={handleChange}
            />
          </>
        );
      case "Motherboard":
        return (
          <>
            <input name="nome" placeholder="Nome" onChange={handleChange} />
            <input name="socket" placeholder="Socket" onChange={handleChange} />
            <input
              name="chipset"
              placeholder="Chipset"
              onChange={handleChange}
            />
            <input
              name="compatibilidadeLinhaCpu"
              placeholder="Compatibilidade (ex: Ryzen, Core)"
              onChange={handleChange}
            />
            <input
              name="tipoRAM"
              placeholder="Tipo de RAM"
              onChange={handleChange}
            />
            <input
              name="tamanho"
              placeholder="Tamanho (ATX, mATX...)"
              onChange={handleChange}
            />
            <input
              name="slots"
              type="number"
              placeholder="Nº de slots"
              onChange={handleChange}
            />
          </>
        );
      case "RAM":
        return (
          <>
            <input
              name="capacidadeGB"
              type="number"
              placeholder="Capacidade (GB)"
              onChange={handleChange}
            />
            <input
              name="tipo"
              placeholder="Tipo (DDR4, DDR5...)"
              onChange={handleChange}
            />
            <input
              name="frequencia"
              type="number"
              placeholder="Frequência (MHz)"
              onChange={handleChange}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <HeaderCustom />

      <main className="flex-grow flex flex-col items-center justify-start p-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full max-w-xl"
        >
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                <label className="text-lg font-medium">
                  Selecione o tipo de peça:
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as ComponentType)}
                  className="border p-2 rounded"
                >
                  <option value="">-- Selecione --</option>
                  <option value="CPU">CPU</option>
                  <option value="PowerSupply">Fonte</option>
                  <option value="Cabinet">Gabinete</option>
                  <option value="GPU">GPU</option>
                  <option value="Motherboard">Placa Mãe</option>
                  <option value="RAM">RAM</option>
                </select>

                <ButtonHome type="button" onClick={handleNext}>
                  Avançar →
                </ButtonHome>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                <h2 className="text-lg font-medium">Cadastro de {type}</h2>
                {renderFormFields()}
                <div className="flex gap-4">
                  <ButtonHome type="button" onClick={() => setStep(1)}>
                    ← Voltar
                  </ButtonHome>
                  <ButtonHome type="submit">Cadastrar {type}</ButtonHome>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </main>

      <Footer />
    </div>
  );
}
