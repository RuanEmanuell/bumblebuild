import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset"
};

const ButtonPrimary: React.FC<ButtonProps> = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-primary text-xl text-white font-bold py-4 px-14 rounded-[20px] cursor-pointer transition hover:bg-secondary ${className}`}
    >
      {children}
    </button>
  );
};

const ButtonSecondary: React.FC<ButtonProps> = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-black text-xl text-textYellow font-bold py-4 px-14 rounded-[20px] cursor-pointer transition hover:bg-secondary ${className}`}
    >
      {children}
    </button>
  );
};

export { ButtonPrimary, ButtonSecondary };
