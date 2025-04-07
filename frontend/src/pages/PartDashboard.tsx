import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ButtonHome } from "../components/ButtonHome";
import { BarChart, Users, Settings, Cpu } from "lucide-react";
import setupExemplo from "../assets/setupexemplo.jpg";
import setupZe from "../assets/pc_do_ze.jpg";
import pcIcon from "../assets/pc.png";
import { Categorias } from "../components/Categorias";
import { motion } from "framer-motion";
import { ProductCard } from "../components/ProductCard";

export default function PartDashboard() {
    const [dados, setDados] = useState({
        totalUsuarios: 82,
        totalPecas: 145,
        totalMontagens: 37
    });

    const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);

    const produtosExemplos = [
        { nome: "Pc do Ruan Emanuel", preco: "R$ 5993", estrelas: 4.6, imagem: setupExemplo, categoria: "Placa de vídeo" },
        { nome: "Pc da Alyne", preco: "R$ 3992", estrelas: 4.2, imagem: setupExemplo, categoria: "SSD" },
        { nome: "Pc Do Gabriel", preco: "R$ 4920", estrelas: 4.4, imagem: setupExemplo, categoria: "Processador" },
        { nome: "Pc do Maurao", preco: "R$ 6000", estrelas: 5.0, imagem: setupExemplo, categoria: "Placa mãe" },
        { nome: "Pc do Ze Patolino", preco: "R$ 0", estrelas: 0.5, imagem: setupZe, categoria: "Cooler" },
        { nome: "PC do Bolsonaro", preco: "R$ 2230", estrelas: 3.3, imagem: setupExemplo, categoria: "Memória RAM" }
    ];

    const produtosFiltrados = categoriaSelecionada
        ? produtosExemplos.filter(p => p.categoria === categoriaSelecionada)
        : produtosExemplos;


    useEffect(() => {
      //Para buscas na nossa API
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-white text-black">
            <Navbar />

           
            <main className="flex-1">
             
                <div className="px-6 py-6">
                    <h1 className="text-3xl font-bold mb-2">Painel de Peças de PC</h1>
                    <p className="text-gray-600">Aqui você pode gerenciar todas as peças disponíveis no sistema.</p>
                </div>

                {/* Cards com métricas */}
                <section className="px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4">
                    <div className="bg-gray-100 rounded-2xl p-6 shadow">
                        <div className="flex items-center gap-3 mb-2">
                            <Cpu className="text-green-600" />
                            <h3 className="text-lg font-semibold">Peças Cadastradas</h3>
                        </div>
                        <p className="text-2xl font-bold">{dados.totalPecas}</p>
                    </div>
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


            </main>

            <Footer />
        </div>
    );
}
