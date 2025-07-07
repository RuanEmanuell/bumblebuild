import React from "react";

interface CoolerFormProps {
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

      <select
        id="socketSupport"
        name="socketSupport"
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
