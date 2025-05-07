import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { ButtonHome } from "../components/ButtonHome";
import { ProductCard } from "../components/ProductCard";
import Footer from '../components/Footer';
import { Categorias } from "../components/Categorias";

//imagens dos produtos
import setupExemplo from "../assets/setupexemplo.jpg";
import setupZe from "../assets/pc_do_ze.jpg";
import pcIcon from "../assets/pc.png";
import HeaderCustom from '../components/Header';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
    const {user} = useAuth();

    const produtosExemplos = [
        { nome: "Pc do Ruan Emanuel", preco: "R$ 5993", estrelas: 4.6, imagem: setupExemplo, categoria: "GPU" },
        { nome: "Pc da Alyne", preco: "R$ 3992", estrelas: 4.2, imagem: setupExemplo, categoria: "SSD" },
        { nome: "Pc Do Gabriel", preco: "R$ 4920", estrelas: 4.4, imagem: setupExemplo, categoria: "CPU" },
        { nome: "Pc do Maurao", preco: "R$ 6000", estrelas: 5.0, imagem: setupExemplo, categoria: "RAM" },
        { nome: "Pc do Ze Patolino", preco: "R$ 0", estrelas: 0.5, imagem: setupZe, categoria: "COOLER" },
        { nome: "PC do Bolsonaro", preco: "R$ 2230", estrelas: 3.3, imagem: setupExemplo, categoria: "MOTHERBOARD" }
    ];

    const produtosFiltrados = categoriaSelecionada
        ? produtosExemplos.filter(p => p.categoria === categoriaSelecionada)
        : produtosExemplos;

    return (
        <div className="bg-white text-black min-h-screen">
            <HeaderCustom />

            <div className="px-6 py-4 text-lg md:text-xl font-medium">
                {user ? `Olá, ${user.nome}! Bem-vindo de volta.` : "Olá! Faça login para aproveitar melhor a experiência."}
            </div>

            <section className="flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-12">
                <div className="flex flex-col items-start text-left">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug mb-4">
                        Encontre as <br /> melhores peças <br /> para seu PC!
                    </h2>
                    <Link
                        to="/pc-registration"
                        state={{ pecasDisponiveis: produtosExemplos }}
                    >
                        <ButtonHome className="bg-black text-white px-6 py-3 rounded-xl text-sm font-bold hover:underline">
                            Montar meu PC →
                        </ButtonHome>
                    </Link>

                </div>
                <img
                    src={pcIcon}
                    alt="PC build illustration"
                    className="w-44 md:w-60"
                />
            </section>

            <Categorias
                categoriaSelecionada={categoriaSelecionada}
                setCategoriaSelecionada={setCategoriaSelecionada}
            />

            <section className="px-6 md:px-12 py-8">
                <h3 className="text-xl font-semibold mb-6">
                    {categoriaSelecionada ? `Produtos de ${categoriaSelecionada}` : "Em destaque"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {produtosFiltrados.map((produto, index) => (
                        <motion.div key={index} whileHover={{ scale: 1.03 }}>
                            <ProductCard
                                nome={produto.nome}
                                preco={produto.preco}
                                estrelas={produto.estrelas}
                                imagem={produto.imagem}
                            />
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="px-6 md:px-12 py-8 bg-gray-100">
                <h3 className="text-xl font-semibold mb-4">Histórico de Montagens</h3>
                <ul className="space-y-4">
                    <li className="border border-gray-300 rounded-xl p-4 bg-white shadow-sm">
                        <p className="font-semibold">Build Ryzen Gamer</p>
                        <p className="text-sm text-gray-600">Data: 2024-03-12</p>
                        <p className="text-sm text-gray-700">Configuração: Ryzen 5 + RTX 3060</p>
                    </li>
                    <li className="border border-gray-300 rounded-xl p-4 bg-white shadow-sm">
                        <p className="font-semibold">Setup Streaming</p>
                        <p className="text-sm text-gray-600">Data: 2024-01-05</p>
                        <p className="text-sm text-gray-700">Configuração: i7 + 32GB RAM</p>
                    </li>
                </ul>
            </section>

            <Footer />
        </div>
    );
}
