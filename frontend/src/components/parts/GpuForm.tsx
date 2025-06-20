import React from "react";

interface GPUFormProps {
  formData: Record<string, any>;
  onChange: (e: React.ChangeEvent<any>) => void;
}

export default function GPUForm({ formData, onChange }: GPUFormProps) {
  return (
    <>
      <input
            name="memoryGB"
            type="number"
            placeholder="Memória (GB)"
            onChange={onChange}
            value={formData.memoryGB || ""}
            className="border-gray-300 rounded p-2 border"
            />
            <input
            name="memoryType"
            placeholder="Tipo de Memória"
            onChange={onChange}
            value={formData.memoryType || ""}
            className="border-gray-300 rounded p-2 border"
            />
            <input
            name="tdp"
            type="number"
            placeholder="TDP (W)"
            onChange={onChange}
            value={formData.tdp || ""}
            className="border-gray-300 rounded p-2 border"
            />
            <input
            name="lengthMM"
            type="number"
            placeholder="Comprimento (mm)"
            onChange={onChange}
            value={formData.lengthMM || ""}
            className="border-gray-300 rounded p-2 border"
        />
    </>
  );
}