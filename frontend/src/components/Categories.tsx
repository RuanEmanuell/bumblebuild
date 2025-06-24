import React from "react";

import cpuIcon from "../assets/icons/cpu.png";
import gpuIcon from "../assets/icons/gpu.png";
import ramIcon from "../assets/icons/ram.png";
import ssdIcon from "../assets/icons/ssd.png";
import motherboardIcon from "../assets/icons/motherboard.png";
import coolerIcon from "../assets/icons/cooler.png";
import psuIcon from "../assets/icons/psu.png";

const categories = [
  { name: "Processador", value: "CPU", icon: cpuIcon },
  { name: "Placa de vídeo", value: "GPU", icon: gpuIcon },
  { name: "Memória RAM", value: "RAM", icon: ramIcon },
  { name: "SSD", value: "SSD", icon: ssdIcon },
  { name: "Placa mãe", value: "MOTHERBOARD", icon: motherboardIcon },
  { name: "Cooler", value: "COOLER", icon: coolerIcon },
  { name: "Fonte", value : "PSU", icon : psuIcon }
];

interface CategoriesProps {
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
}

export const Categories: React.FC<CategoriesProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <section className="py-8">
      <h3 className="text-xl font-semibold mb-4">Categorias</h3>
      <div className="flex flex-wrap gap-3 justify-start">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg shadow-sm hover:bg-yellow-100 transition-all text-sm ${
            selectedCategory === null ? "ring-2 ring-yellow-400" : ""
          }`}
        >
          Todas
        </button>

        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category.value)}
            className={`flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg shadow-sm hover:bg-yellow-100 transition-all text-sm ${
              selectedCategory === category.value ? "ring-2 ring-yellow-400" : ""
            }`}
          >
            <img src={category.icon} alt={category.name} className="w-5 h-5" />
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
};
