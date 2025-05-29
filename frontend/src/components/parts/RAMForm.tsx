import React from "react";

interface RAMFormProps {
  formData: Record<string, any>;
  onChange: (e: React.ChangeEvent<any>) => void;
}

export default function RAMForm({ formData, onChange }: RAMFormProps) {
  return (
    <>
      <input
        name="capacityGB"
        type="number"
        placeholder="Capacidade (GB)"
        onChange={onChange}
        value={formData.capacityGB || ""}
        className="input"
      />
      <input
        name="type"
        placeholder="Tipo (DDR4, DDR5...)"
        onChange={onChange}
        value={formData.type || ""}
        className="input"
      />
      <input
        name="frequency"
        type="number"
        placeholder="Frequência (MHz)"
        onChange={onChange}
        value={formData.frequency || ""}
        className="input"
      />
    </>
  );
}