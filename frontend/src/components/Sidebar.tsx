import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        className="text-black p-2 z-50"
        onClick={toggleMenu}
        aria-label="Abrir menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}

      {/* Menu lateral */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">BumbleBuild</h2>
        </div>
        <nav className="flex flex-col p-4 gap-4">
          <Link to="/" onClick={toggleMenu} className="text-gray-800 hover:text-black">
            Home
          </Link>
          <Link to="/categorias" onClick={toggleMenu} className="text-gray-800 hover:text-black">
            Categorias
          </Link>
          <Link to="/montar-pc" onClick={toggleMenu} className="text-gray-800 hover:text-black">
            Montar PC
          </Link>
          <Link to="/login" onClick={toggleMenu} className="text-gray-800 hover:text-black">
            Entrar
          </Link>
        </nav>
      </div>
    </>
  );
}
