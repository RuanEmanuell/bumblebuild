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

      <select
        name="memoryType"
        onChange={onChange}
        value={formData.memoryType || ""}
        className="border-gray-300 rounded p-2 border"
      >
        <option value="">Selecione o tipo</option>
        <option value="GDDR5">GDDR5</option>
        <option value="GDDR6">GDDR6</option>
        <option value="GDDR7">GDDR7</option>
      </select>


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

      <input
        name="gpuClock"
        type="number"
        placeholder="Clock da GPU (MHz)"
        onChange={onChange}
        value={formData.gpuClock || ""}
        className="border-gray-300 rounded p-2 border"
      />

      <input
        name="memoryBus"
        type="number"
        placeholder="Barramento de Memória (bits)"
        onChange={onChange}
        value={formData.memoryBus || ""}
        className="border-gray-300 rounded p-2 border"
      />
    </>
  );
}
