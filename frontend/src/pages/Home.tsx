import { Link } from 'react-router-dom';
import { ButtonHome } from "../components/ButtonHome";
import Footer from '../components/Footer';
import pcIcon from "../assets/pc.png";
import HeaderCustom from '../components/Header';
import { useAuth } from '../hooks/useAuth';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ProductCard } from '../components/ProductCard';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';

export default function Home() {
    const { user } = useAuth();
    const [parts, setParts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchParts();
    }, []);

    async function fetchParts() {
        try {
            const resp = await fetch(`${import.meta.env.VITE_API_URL}/parts`);
            const list = await resp.json();
            const filteredList = list.filter((part: { price: number; }) => part.price > 0);
            setParts(filteredList);
        } catch (err) {
            console.error("Erro ao buscar peças:", err);
        } finally {
            setIsLoading(false);
        }
    }

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

            <div className="px-6 pb-12">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Algumas peças em destaque</h3>
                    <Link
                        to="/parts"
                        className="text-sm font-bold text-textYellow hover:underline"
                    >
                        Ver mais
                    </Link>
                </div>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={16}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 1.5 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="swiper-custom-yellow"
                >
                    {isLoading ? (
                        <Loading />
                    ) : (
                        [...parts]
                            .sort(() => Math.random() - 0.5)
                            .slice(0, 10)
                            .map((part, idx) => (
                                <SwiperSlide key={part.id || idx}>
                                    <ProductCard
                                        key={idx}
                                        brand={part.brand || 'Marca Desconhecida'}
                                        name={part.name}
                                        price={part.price}
                                        image={part.imageUrl}
                                        link={part.priceLink}
                                    />
                                </SwiperSlide>
                            ))
                    )}
                </Swiper>
                <style>
                {`
                  .swiper-custom-yellow .swiper-button-next,
                  .swiper-custom-yellow .swiper-button-prev {
                    color: var(--primary);
                  }
                  .swiper-custom-yellow .swiper-pagination-bullet {
                    background: var(--primary);
                    opacity: 0.5;
                  }
                  .swiper-custom-yellow .swiper-pagination-bullet-active {
                    background: var(--primary);
                    opacity: 1;
                  }
                `}
                </style>
            </div>

            <Footer />
        </div>
    );
}
