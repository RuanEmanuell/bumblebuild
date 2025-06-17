import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HeaderCustom from "../components/Header";
import Footer from "../components/Footer";
import { ButtonPrimary } from '../components/Button';

export default function History() {
    interface Build {
        id: number;
        name: string;
        createdAt: string;
    }

    const [history, setHistory] = useState<Build[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); 

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem("token"); 
                const response = await axios.get<Build[]>(`${import.meta.env.VITE_API_URL}/builds/history`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setHistory(response.data);
            } catch (err) {
                console.error(err);
                setError("Erro ao carregar o histórico.");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-white text-black">
            <HeaderCustom />

            <main className="flex-1 px-4 py-8 max-w-4xl mx-auto">
                <h1 className="text-2xl font-semibold mb-6">Histórico de Montagens</h1>

                {loading ? (
                    <p>Carregando...</p>
                ) : error ? (
                    <p className="text-red-600">{error}</p>
                ) : history.length === 0 ? (
                    <p className="text-gray-600">Você ainda não possui montagens registradas.</p>
                ) : (
                    <ul className="space-y-4">
                        {history.map((item) => (
                            <li
                                key={item.id}
                                className="flex justify-between items-center gap-8 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div>
                                    <h2 className="text-lg font-medium">{item.name || "Montagem sem nome"}</h2>
                                    <p className="text-sm text-gray-500">
                                        Data: {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                                    </p>
                                </div>
                                <Link to={`/build-details/${item.id}`}>
                                    <ButtonPrimary className="min-w-[140px]">Ver Detalhes</ButtonPrimary>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </main>

            <Footer />
        </div>
    );
};
