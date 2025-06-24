import React from "react";

interface MotherboardFormProps {
  formData: Record<string, any>;
  onChange: (e: React.ChangeEvent<any>) => void;
}

export default function MotherboardForm({ formData, onChange }: MotherboardFormProps) {
  return (
    <>
      <input
        name="socket"
        placeholder="Socket"
        onChange={onChange}
        value={formData.socket || ""}
        className="border-gray-300 rounded p-2 border"
      />
       <input
        name="maxRAM"
        type="number"
        placeholder="Maximo de RAM"
        onChange={onChange}
        value={formData.maxRAM || ""}
        className="border-gray-300 rounded p-2 border"
      />
      <input
        name="ramType"
        placeholder="Tipo de RAM"
        onChange={onChange}
        value={formData.ramType|| ""}
        className="border-gray-300 rounded p-2 border"
      />
      <input
        name="size"
        placeholder="Tamanho (ATX, mATX...)"
        onChange={onChange}
        value={formData.size || ""}
        className="border-gray-300 rounded p-2 border"
      />
    
      <input
        name="slots"
        type="number"
        placeholder="Nº de slots"
        onChange={onChange}
        value={formData.slots || ""}
        className="border-gray-300 rounded p-2 border"
      />
    </>
  );
}