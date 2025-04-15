import React from "react";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";

type LogoProps = {
  size?: number;
};

export const LogoPrimary: React.FC<LogoProps> = ({ size }) => {
  return <img src={logo1} alt="Logo Primary" style={{ width: size }} />;
};

export const LogoSecondary: React.FC<LogoProps> = ({ size }) => {
  return <img src={logo2} alt="Logo Secondary" style={{ width: size }} />;
};

export const LogoTertiary: React.FC<LogoProps> = ({ size }) => {
  return <img src={logo3} alt="Logo Tertiary" style={{ width: size }} />;
};