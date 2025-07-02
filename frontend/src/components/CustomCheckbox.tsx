import React from "react";

type CustomCheckboxProps = {
  id: string;
  label: React.ReactNode;
  required?: boolean;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  label,
  required = false,
  checked = false,
  onChange,
}) => {
  return (
    <div className="flex items-center">
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <div
          className={`mr-2 w-5 h-5 flex items-center justify-center rounded-sm outline-none appearance-none 
            ${checked ? "bg-[#F6BD19]" : "bg-gray-300"}`}
        >
          {checked && (
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
        <input
          type="checkbox"
          id={id}
          className="hidden"
          required={required}
          checked={checked}
          onChange={onChange}
        />
        <span className="text-textPrimary text-sm">{label}</span>
      </label>
    </div>
  );
};

export default CustomCheckbox;