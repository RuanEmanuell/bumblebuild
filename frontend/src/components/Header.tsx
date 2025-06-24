import React, { useState } from "react";
import { LogoTertiary } from "../components/Logo";
import { User, Menu, X } from "react-feather";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ButtonPrimary } from "../components/Button";

const HeaderCustom: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="flex justify-between items-center px-12 py-5 bg-primary sticky top-0 z-20">
      <div className="flex items-center">
        <LogoTertiary size={50} />
        <h1 className="ml-2 font-bold">BUMBLEBUILD</h1>
      </div>

      {/* Ícones no mobile */}
      <div className="flex items-center gap-4 md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Nav desktop */}
      <nav className="hidden md:flex items-center gap-8 text-textPrimary">
        <Link to="/" className="font-bold hover:underline">Home</Link>
        <Link to="/parts" className="font-bold hover:underline">Peças</Link>

        {user ? (
          <div className="flex items-center gap-4">
            {user?.profilePictureUrl ? (
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${user?.profilePictureUrl}`}
                alt="Foto usuário"
                className="w-8 h-8 rounded-full object-cover border"
              />
            ) : (
              <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center">
                <User size={20} />
              </div>
            )}
            <span>Olá, <Link to="/user-profile" className="font-bold hover:underline">{user.name}</Link></span>
            <ButtonPrimary onClick={logout}>Sair</ButtonPrimary>
          </div>
        ) : (
          <div className="flex gap-1">
            <User size={20} className="text-textPrimary" />
            <span>Olá, </span>
            <Link to="/login" className="font-bold hover:underline">Entre</Link>
            <span> ou </span>
            <Link to="/login" className="font-bold hover:underline">Cadastre-se</Link>
          </div>
        )}
      </nav>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg flex flex-col items-start p-6 gap-6 text-textPrimary md:hidden">
          <button onClick={() => setMenuOpen(false)} className="self-end">
            <X size={28} />
          </button>

          <div className="flex items-center p-4 border-b">
            <LogoTertiary size={50} />
            <h1 className="ml-2 font-bold">BUMBLEBUILD</h1>
          </div>

          {user ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <User size={20} className="text-textPrimary" />
                <span>Olá, <Link to="/user-profile" className="font-bold hover:underline">{user.name}</Link></span>
              </div>
              <ButtonPrimary onClick={logout}>Sair</ButtonPrimary>
            </div>
          ) : (
            <div className="flex gap-1">
              <span>Olá, </span>
              <Link to="/login" className="font-bold hover:underline">Entre</Link>
              <span> ou </span>
              <Link to="/login" className="font-bold hover:underline">Cadastre-se</Link>
            </div>
          )}

          <Link to="/" className="font-bold hover:underline">Home</Link>
          <Link to="/parts" className="font-bold hover:underline">Peças</Link>
        </div>
      )}
    </header>
  );
};

export default HeaderCustom;