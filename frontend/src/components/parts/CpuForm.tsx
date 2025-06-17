import React from "react";

interface CPUFormProps {
  formData: Record<string, any>;
  onChange: (e: React.ChangeEvent<any>) => void;
}

export default function CPUForm({ formData, onChange }: CPUFormProps) {
  return (
    <>
      {/* Especificações da CPU */}
      <input
        name="socket"
        placeholder="Socket"
        onChange={onChange}
        value={formData.socket || ""}
        className="border-gray-300 rounded p-2 border"
        required
      />
      <input
        name="cores"
        type="number"
        placeholder="Cores"
        onChange={onChange}
        value={formData.cores || ""}
        className="border-gray-300 rounded p-2 border"
        required
      />
      <input
        name="threads"
        type="number"
        placeholder="Threads"
        onChange={onChange}
        value={formData.threads || ""}
        className="border-gray-300 rounded p-2 border"
        required
      />
      <input
        name="frequency"
        type="number"
        step="0.1"
        placeholder="Frequência (GHz)"
        onChange={onChange}
        value={formData.frequency || ""}
        className="border-gray-300 rounded p-2 border"
        required
      />
      <input
        name="tdp"
        type="number"
        placeholder="TDP (W)"
        onChange={onChange}
        value={formData.tdp || ""}
        className="border-gray-300 rounded p-2 border"
        required
      />
      <label htmlFor="integratedGraphics" className="flex items-center gap-2 cursor-pointer">
        Gráficos Integrados:
        <input
          id="integratedGraphics"
          name="integratedGraphics"
          type="checkbox"
          onChange={onChange}
          checked={!!formData.integratedGraphics}
          className="cursor-pointer ml-2"
        />
      </label>
    </>
  );
}
