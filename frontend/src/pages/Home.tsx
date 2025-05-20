import { Link } from 'react-router-dom';
import { ButtonHome } from "../components/ButtonHome";
import Footer from '../components/Footer';

//imagens dos produtos
import setupExemplo from "../assets/setupexemplo.jpg";
import setupZe from "../assets/pc_do_ze.jpg";
import pcIcon from "../assets/pc.png";
import HeaderCustom from '../components/Header';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
    const { user } = useAuth();

    const sampleProducts = [
        { name: "Pc do Ruan Emanuel", price: "R$ 5993", stars: 4.6, image: setupExemplo, category: "GPU" },
        { name: "Pc da Alyne", price: "R$ 3992", stars: 4.2, image: setupExemplo, category: "SSD" },
        { name: "Pc Do Gabriel", price: "R$ 4920", stars: 4.4, image: setupExemplo, category: "CPU" },
        { name: "Pc do Maurao", price: "R$ 6000", stars: 5.0, image: setupExemplo, category: "RAM" },
        { name: "Pc do Ze Patolino", price: "R$ 0", stars: 0.5, image: setupZe, category: "COOLER" },
        { name: "PC do Bolsonaro", price: "R$ 2230", stars: 3.3, image: setupExemplo, category: "MOTHERBOARD" }
    ];

    /*
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredProducts = selectedCategory
        ? sampleProducts.filter(p => p.category === selectedCategory)
        : sampleProducts;
    */


    return (
        <div className="bg-white text-black min-h-screen flex flex-col">
            <HeaderCustom />

            <div className="px-6 py-4 text-lg md:text-xl font-medium">
                {user ? `Olá, ${user.name}! Bem-vindo de volta.` : "Olá! Faça login para aproveitar melhor a experiência."}
            </div>

            <section className="flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-12 flex-grow">
                <div className="flex flex-col items-start text-left">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug mb-4">
                        Encontre as <br /> melhores peças <br /> para seu PC!
                    </h2>
                    <Link
                        to="/pc-registration"
                        state={{ pecasDisponiveis: sampleProducts }}
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

            {/*
            <Categories
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <section className="px-6 md:px-12 py-8">
                <h3 className="text-xl font-semibold mb-6">
                    {selectedCategory ? `Produtos de ${selectedCategory}` : "Em destaque"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredProducts.map((product, index) => (
                        <motion.div key={index} whileHover={{ scale: 1.03 }}>
                            <ProductCard
                                name={product.name}
                                price={product.price}
                                stars={product.stars}
                                image={product.image}
                            />
                        </motion.div>
                    ))}
                </div>
            </section>
            */}

            {/*
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
           */}

            <Footer />
        </div>
    );
}
