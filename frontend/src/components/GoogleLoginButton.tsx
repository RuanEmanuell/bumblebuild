import React from "react";
import GoogleIcon from "./GoogleIcon";

type ButtonProps = {
  onClick?: () => void;
  className?: string;
};

const GoogleLoginButton: React.FC<ButtonProps> = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center border border-gray-300 bg-white text-black font-medium py-3 px-6 rounded-full shadow-sm cursor-pointer transition hover:bg-gray-100 ${className}`}
    >
      <GoogleIcon></GoogleIcon>
      Entrar com Google
    </button>
  );
};

export default GoogleLoginButton;
