import React from "react";

import processadorIcon from "../assets/icons/cpu.png";
import gpuIcon from "../assets/icons/gpu.png";
import ramIcon from "../assets/icons/ram.png";
import ssdIcon from "../assets/icons/ssd.png";
import placaMaeIcon from "../assets/icons/motherboard.png";
import coolerIcon from "../assets/icons/cooler.png";

const categorias = [
  { nome: "Processador", valor: "CPU", icon: processadorIcon },
  { nome: "Placa de vídeo", valor: "GPU", icon: gpuIcon },
  { nome: "Memória RAM", valor: "RAM", icon: ramIcon },
  { nome: "SSD", valor: "SSD", icon: ssdIcon },
  { nome: "Placa mãe", valor: "PLACA_MAE", icon: placaMaeIcon },
  { nome: "Cooler", valor: "COOLER", icon: coolerIcon },
];

interface CategoriasProps {
  categoriaSelecionada: string | null;
  setCategoriaSelecionada: (cat: string | null) => void;
}

export const Categorias: React.FC<CategoriasProps> = ({
  categoriaSelecionada,
  setCategoriaSelecionada,
}) => {
  return (
    <section className="px-6 md:px-12 py-8">
      <h3 className="text-xl font-semibold mb-4">Categorias</h3>
      <div className="flex flex-wrap gap-3 justify-start">
        <button
          onClick={() => setCategoriaSelecionada(null)}
          className={`flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg shadow-sm hover:bg-yellow-100 transition-all text-sm ${
            categoriaSelecionada === null ? "ring-2 ring-yellow-400" : ""
          }`}
        >
          Todas
        </button>

        {categorias.map((cat, index) => (
          <button
            key={index}
            onClick={() => setCategoriaSelecionada(cat.valor)}
            className={`flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg shadow-sm hover:bg-yellow-100 transition-all text-sm ${
              categoriaSelecionada === cat.valor ? "ring-2 ring-yellow-400" : ""
            }`}
          >
            <img src={cat.icon} alt={cat.nome} className="w-5 h-5" />
            {cat.nome}
          </button>
        ))}
      </div>
    </section>
  );
};
