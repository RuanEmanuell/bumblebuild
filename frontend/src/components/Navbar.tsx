import React from "react";
import { LogoPrimary } from "./Logo";
import { ButtonHome } from "./ButtonHome";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "./Sidebar";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-yellow-400">
      <div className="flex items-center gap-4">
        <SidebarMenu />

        <div className="flex items-center gap-3">
          <LogoPrimary size={40} />
          <h1 className="text-xl font-bold text-black">BUMBLE BUILD</h1>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-4">
        <a href="#" className="text-black font-medium hover:underline">
          Home
        </a>
        <ButtonHome
          onClick={() => navigate("/login")}
          className="bg-black text-white px-6 py-2 rounded-xl text-sm"
        >
          Olá, Entre ou Cadastre-se
        </ButtonHome>
      </nav>
    </header>
  );
};

export default Navbar;
