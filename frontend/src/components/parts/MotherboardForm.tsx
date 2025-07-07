import React from "react";

interface MotherboardFormProps {
  formData: Record<string, any>;
  onChange: (e: React.ChangeEvent<any>) => void;
}

const socketOptions = [
  "LGA1200",
  "LGA1700",
  "LGA1851",
  "AM4",
  "AM5",
  "TR4",
  "sWRX8",
  "LGA2066",
];

const ramTypeOptions = [
  "DDR4",
  "DDR5",
];

const sizeOptions = [
  "ATX",
  "Micro-ATX",
  "Mini-ITX",
  "E-ATX",
];

export default function MotherboardForm({ formData, onChange }: MotherboardFormProps) {
  return (
    <>
      <select
        id="socket"
        name="socket"
        onChange={onChange}
        value={formData.socket || ""}
        className="border-gray-300 rounded p-2 border"
      >
        <option value="">Selecione o socket</option>
        {socketOptions.map(sock => (
          <option key={sock} value={sock}>{sock}</option>
        ))}
      </select>

      <input
        id="maxRAM"
        name="maxRAM"
        type="number"
        placeholder="Máximo de RAM"
        onChange={onChange}
        value={formData.maxRAM || ""}
        className="border-gray-300 rounded p-2 border"
      />

      <select
        id="ramType"
        name="ramType"
        onChange={onChange}
        value={formData.ramType || ""}
        className="border-gray-300 rounded p-2 border"
      >
        <option value="">Selecione o tipo de RAM</option>
        {ramTypeOptions.map(rt => (
          <option key={rt} value={rt}>{rt}</option>
        ))}
      </select>

      <select
        id="size"
        name="size"
        onChange={onChange}
        value={formData.size || ""}
        className="border-gray-300 rounded p-2 border"
      >
        <option value="">Selecione o tamanho</option>
        {sizeOptions.map(sz => (
          <option key={sz} value={sz}>{sz}</option>
        ))}
      </select>

      <input
        id="slots"
        name="slots"
        type="number"
        placeholder="Número de slots"
        onChange={onChange}
        value={formData.slots || ""}
        className="border-gray-300 rounded p-2 border"
      />
    </>
  );
}
