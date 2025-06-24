import React from "react";

interface SSDFormProps {
  formData: Record<string, any>;
  onChange: (e: React.ChangeEvent<any>) => void;
}

export default function SSDForm({ formData, onChange }: SSDFormProps) {
  return (
    <>
      <input
            name="capacityGB"
            type="number"
            placeholder="Memória (GB)"
            onChange={onChange}
            value={formData.capacityGB || ""}
            className="border-gray-300 rounded p-2 border"
            />
            <input
            name="typeSSD"
            placeholder="Tipo do SSD (M2, SATA)"
            onChange={onChange}
            value={formData.typeSSD || ""}
            className="border-gray-300 rounded p-2 border"
            />
            <input
            name="readMBs"
            type="number"
            placeholder="Capacidade de leitura (MBs)"
            onChange={onChange}
            value={formData.readMBs || ""}
            className="border-gray-300 rounded p-2 border"
            />
            <input
            name="writeMBs"
            type="number"
            placeholder="Capacidade de escrita (MBs)"
            onChange={onChange}
            value={formData.writeMBs|| ""}
            className="border-gray-300 rounded p-2 border"
        />
    </>
  );
}