import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ButtonHome } from "../components/ButtonHome";
import { BarChart, Users, Settings, Cpu } from "lucide-react";

export default function AdminDashboard() {
    const [dados, setDados] = useState({
        totalUsuarios: 82,
        totalPecas: 145,
        totalMontagens: 37
    });

    useEffect(() => {
      //Para buscas na nossa API
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-white text-black">
            <Navbar />

           
            <main className="flex-1">
             
                <div className="px-6 py-6">
                    <h1 className="text-3xl font-bold mb-2">Painel do Administrador</h1>
                    <p className="text-gray-600">Bem-vindo de volta! Aqui estão os dados do sistema.</p>
                </div>

                {/* Cards com métricas */}
                <section className="px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4">
                    <div className="bg-gray-100 rounded-2xl p-6 shadow">
                        <div className="flex items-center gap-3 mb-2">
                            <Users className="text-blue-600" />
                            <h3 className="text-lg font-semibold">Usuários</h3>
                        </div>
                        <p className="text-2xl font-bold">{dados.totalUsuarios}</p>
                    </div>

                    <div className="bg-gray-100 rounded-2xl p-6 shadow">
                        <div className="flex items-center gap-3 mb-2">
                            <Cpu className="text-green-600" />
                            <h3 className="text-lg font-semibold">Peças Cadastradas</h3>
                        </div>
                        <p className="text-2xl font-bold">{dados.totalPecas}</p>
                    </div>

                    <div className="bg-gray-100 rounded-2xl p-6 shadow">
                        <div className="flex items-center gap-3 mb-2">
                            <BarChart className="text-purple-600" />
                            <h3 className="text-lg font-semibold">Montagens Realizadas</h3>
                        </div>
                        <p className="text-2xl font-bold">{dados.totalMontagens}</p>
                    </div>
                </section>

                {/* Nossos Atalhos */}
                <section className="px-6 md:px-12 py-8">
                    <h2 className="text-xl font-semibold mb-4">Gerenciar Sistema</h2>
                    <div className="flex flex-wrap gap-4">
                        <ButtonHome className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2">
                            <Cpu size={18} /> Gerenciar Peças
                        </ButtonHome>
                        <ButtonHome className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2">
                            <Users size={18} /> Gerenciar Usuários
                        </ButtonHome>
                        <ButtonHome className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2">
                            <Settings size={18} /> Configurações
                        </ButtonHome>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
