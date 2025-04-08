import React from "react";

type ButtonHomeProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const ButtonHome: React.FC<ButtonHomeProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-primary text-white text-lg font-semibold py-3 px-8 rounded-2xl transition hover:bg-secondary ${className}`}
    >
      {children}
    </button>
  );
};

export { ButtonHome };