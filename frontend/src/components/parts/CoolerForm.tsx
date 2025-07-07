import React from "react";

interface CoolerFormProps {
  formData: Record<string, any>;
  onChange: (e: React.ChangeEvent<any>) => void;
}


export default function CoolerForm({ formData, onChange }: CoolerFormProps) {
  return (
    <>
      <select
        name="type"
        onChange={onChange}
        value={formData.type || ""}
        className="border-gray-300 rounded p-2 border"
      >
        <option value="">Selecione o tipo</option>
        <option value="Air">Air</option>
        <option value="Liquid">Liquid</option>
      </select>

       <input
        name="socketSupport"
        type="number"
        placeholder="Socket do cooler"
        onChange={onChange}
        value={formData.socketSupport || ""}
        className="border-gray-300 rounded p-2 border"
      />

      <input
        name="noiseLevel"
        type="number"
        placeholder="Nível de Ruído (dB)"
        onChange={onChange}
        value={formData.noiseLevel || ""}
        className="border-gray-300 rounded p-2 border"
      />

      <input
        name="maxTdp"
        type="number"
        placeholder="TDP Máximo (W)"
        onChange={onChange}
        value={formData.maxTdp || ""}
        className="border-gray-300 rounded p-2 border"
      />
    </>
  );
}
