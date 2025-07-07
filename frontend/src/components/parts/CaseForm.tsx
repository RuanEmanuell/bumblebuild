import React from "react";

interface CaseFormProps {
  formData: Record<string, any>;
  onChange: (e: React.ChangeEvent<any>) => void;
}

const sizeOptions = [
  "ATX",
  "Micro-ATX",
  "Mini-ITX",
  "E-ATX",
];

export default function CaseForm({ formData, onChange }: CaseFormProps) {
  return (
    <>
      <select
        id="size"
        name="size"
        onChange={onChange}
        value={formData.size || ""}
        className="border-gray-300 rounded p-2 border"
      >
        <option value="">Tamanhos suportados (ex: ATX, mATX)</option>
        {sizeOptions.map(sz => (
          <option key={sz} value={sz}>{sz}</option>
        ))}
      </select>
      <input
        name="maxGpuLengthMM"
        type="number"
        placeholder="Comprimento máximo da GPU (mm)"
        onChange={onChange}
        value={formData.maxGpuLengthMM || ""}
        className="border-gray-300 rounded p-2 border"
      />
    </>
  );
}