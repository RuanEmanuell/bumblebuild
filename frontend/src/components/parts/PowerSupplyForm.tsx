import React from "react";

interface PowerSupplyFormProps {
  formData: Record<string, any>;
  onChange: (e: React.ChangeEvent<any>) => void;
}

export default function PowerSupplyForm({ formData, onChange }: PowerSupplyFormProps) {
  return (
    <>
      <input
        name="powerW"
        placeholder="Potência (W)"
        onChange={onChange}
        value={formData.powerW || ""}
        className="border-gray-300 rounded p-2 border"
      />
      <input
        name="certification"
        placeholder="Certificação"
        onChange={onChange}
        value={formData.certification || ""}
        className="border-gray-300 rounded p-2 border"
      />
      <label htmlFor="modular" className="flex items-center gap-2 cursor-pointer">
        Modular:
        <input
          id="modular"
          name="modular"
          type="checkbox"
          onChange={onChange}
          checked={!!formData.modular}
          className="cursor-pointer ml-2"
        />
      </label>
    </>
  );
}