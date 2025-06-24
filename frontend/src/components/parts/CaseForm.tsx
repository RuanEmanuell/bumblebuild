import React from "react";

interface CaseFormProps {
  formData: Record<string, any>;
  onChange: (e: React.ChangeEvent<any>) => void;
}

export default function CaseForm({ formData, onChange }: CaseFormProps) {
  return (
    <>
      <input
        name="supportedSizes"
        placeholder="Tamanhos suportados (ex: ATX, mATX)"
        onChange={onChange}
        value={formData.supportedSizes || ""}
        className="border-gray-300 rounded p-2 border"
      />
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