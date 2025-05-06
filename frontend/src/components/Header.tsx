import React, { useState } from "react";
import { LogoTertiary } from "../components/Logo";
import { Heart, User, Menu, X } from "react-feather";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";
import { useAuth } from "../hooks/useAuth";

const HeaderCustom: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user } = useAuth();

    return (
        <header className="flex justify-between items-center px-12 py-5 bg-primary sticky top-0 z-20">
            <div className="flex items-center">
                <LogoTertiary size={50} />
                <h1 className="ml-2 font-bold">BUMBLEBUILD</h1>
            </div>

            {/*ícones no mobile*/}
            <div className="flex items-center gap-4 md:hidden">
                <Heart size={22} className="hover:cursor-pointer hover:opacity-80" />
                <div className="relative">
                    <CartIcon></CartIcon>
                </div>
                <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/*nav desktop*/}
            <nav className="hidden md:flex items-center gap-8 text-textPrimary">
                <Link to="/" className="font-bold hover:underline">Home</Link>

                {user ? (
                    <div className="flex items-center gap-2">
                        {user?.fotoPerfilUrl ? (
                            <img
                                src={`http://localhost:3000/uploads/${user?.fotoPerfilUrl}`}
                                alt="Foto usuário"
                                className="w-8 h-8 rounded-full object-cover border"
                            />
                        ) : (
                            <div className="w-full h-full rounded-full border border-black flex items-center justify-center">
                                <User size={20} />
                            </div>
                        )}
                        <span>Olá, <Link to="/user-profile" className="font-bold hover:underline">{user.nome}</Link></span>

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


                <Heart size={22} className="hover:cursor-pointer hover:opacity-80" />

                {/*cart com contador */}
                <div className="relative">
                    <CartIcon></CartIcon>
                </div>
            </nav>

            {/*menu mobile*/}
            {menuOpen && (
                <div className="fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg flex flex-col items-start p-6 gap-6 text-textPrimary md:hidden">
                    <button onClick={() => setMenuOpen(false)} className="self-end">
                        <X size={28} />
                    </button>

                    <div className="flex items-center p-4 border-b">
                        <LogoTertiary size={50} />
                        <h1 className="ml-2 font-bold">BUMBLEBUILD</h1>
                    </div>

                    <Link to="/" className="font-bold hover:underline">Home</Link>


                    {user ? (
                        <div className="flex items-center gap-2">
                            <User size={20} className="text-textPrimary" />
                            <span>Olá, <Link to="/user-profile" className="font-bold hover:underline">{user.nome}</Link></span>
                        </div>
                    ) : (
                        <div className="flex gap-1">
                            <span>Olá, </span>
                            <Link to="/login" className="font-bold hover:underline">Entre</Link>
                            <span> ou </span>
                            <Link to="/login" className="font-bold hover:underline">Cadastre-se</Link>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default HeaderCustom;
