import React, { useState } from "react";
import { LogoSecondary } from "../components/Logo";
import { Heart, User, Menu, X } from "react-feather";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";

interface HeaderProps {
    user?: {
        name: string;
        photo?: string;
    };
}

const HeaderCustom: React.FC<HeaderProps> = ({ user }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="flex justify-between items-center px-12 py-5 bg-primary sticky top-0 z-20">
            <div className="flex items-center">
                <LogoSecondary size={90} />
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
                        {user?.photo ? (
                            <img src={user.photo} alt="Foto usuário" className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                            <User size={20} className="text-textPrimary" />
                        )}
                        <span>Olá, <span className="font-bold">{user.name.split(' ')[0]}</span></span>
                    </div>
                ) : (
                    <div className="flex gap-1">
                        <User size={20} className="text-textPrimary" />
                        <span>Olá, </span>
                        <Link to="/login" className="font-bold hover:underline">Entre</Link>
                        <span> ou </span>
                        <Link to="/register" className="font-bold hover:underline">Cadastre-se</Link>
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

                    <Link to="/" className="font-bold hover:underline">Home</Link>

                    {user ? (
                        <div className="flex items-center gap-2">
                            <User size={20} className="text-textPrimary" />
                            <span>Olá, <span className="font-bold">{user.name.split(' ')[0]}</span></span>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <span>Olá, </span>
                            <Link to="/login" className="font-bold hover:underline">Entre</Link>
                            <span> ou </span>
                            <Link to="/register" className="font-bold hover:underline">Cadastre-se</Link>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default HeaderCustom;
