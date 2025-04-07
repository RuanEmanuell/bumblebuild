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
      className={`bg-primary text-white font-bold rounded-[20px] cursor-pointer transition hover:bg-secondary
        text-sm sm:text-base md:text-lg lg:text-xl
        py-2 px-4 sm:py-3 sm:px-5 md:py-4 md:px-6
        ${className}`}
    >
      {children}
    </button>
  );
};

const ButtonSecondary: React.FC<ButtonProps> = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-black text-textYellow font-bold rounded-[20px] cursor-pointer transition hover:bg-secondary
        text-sm sm:text-base md:text-lg lg:text-xl
        py-2 px-4 sm:py-3 sm:px-5 md:py-4 md:px-6
        ${className}`}
    >
      {children}
    </button>
  );
};

export { ButtonPrimary, ButtonSecondary };
