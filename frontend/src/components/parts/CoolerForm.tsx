import React from "react";

interface CoolerFormProps {
  formData: Record<string, any>;
  onChange: (e: React.ChangeEvent<any>) => void;
}

export default function CoolerForm({ formData, onChange }: CoolerFormProps) {
  return (
    <>
      <input
        name="coolerType"
        placeholder="Tipo do cooler"
        onChange={onChange}
        value={formData.coolerType || ""}
        className="border-gray-300 rounded p-2 border"
      />
      <input
        name="socketSupport"
        type="number"
        placeholder="Socket do cooler"
        onChange={onChange}
        value={formData.socketSupport || ""}
        className="border-gray-300 rounded p-2 border"
      />
    </>
  );
}