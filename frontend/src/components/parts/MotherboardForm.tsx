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
        className="input"
      />
      <input
        name="chipset"
        placeholder="Chipset"
        onChange={onChange}
        value={formData.chipset || ""}
        className="input"
      />
       <input
        name="maxRAM"
        type="number"
        placeholder="Maximo de RAM"
        onChange={onChange}
        value={formData.maxRAM || ""}
        className="input"
      />
      <input
        name="cpuCompatibilityLine"
        placeholder="Compatibilidade (ex: Ryzen, Core)"
        onChange={onChange}
        value={formData.cpuCompatibilityLine || ""}
        className="input"
      />
      <input
        name="ramType"
        placeholder="Tipo de RAM"
        onChange={onChange}
        value={formData.ramType|| ""}
        className="input"
      />
      <input
        name="size"
        placeholder="Tamanho (ATX, mATX...)"
        onChange={onChange}
        value={formData.size || ""}
        className="input"
      />
    
      <input
        name="slots"
        type="number"
        placeholder="Nº de slots"
        onChange={onChange}
        value={formData.slots || ""}
        className="input"
      />
    </>
  );
}