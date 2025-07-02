import HeaderCustom from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function Terms() {
    return (
        <div className="bg-white text-black min-h-screen flex flex-col">
            <HeaderCustom />

            <main className="flex flex-col items-center justify-center px-6 py-12 flex-grow">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                    Termos de Uso
                </h1>

                <div className="max-w-3xl space-y-4 text-justify text-gray-700 text-base md:text-lg">
                    <p>
                        Bem-vindo ao <strong>BumbleBuild</strong>. Ao acessar e utilizar nossa plataforma,
                        você concorda com os termos e condições descritos neste documento.
                        Se você não concorda com algum dos termos, por favor, não utilize nosso serviço.
                    </p>

                    <h2 className="text-xl font-semibold mt-6">1. Uso da Plataforma</h2>
                    <p>
                        Nossa plataforma tem como objetivo auxiliar usuários na montagem de computadores
                        através da simulação de peças e montagem virtual. É proibido utilizar o serviço
                        para qualquer finalidade ilegal, fraudulenta ou que viole leis aplicáveis.
                    </p>

                    <h2 className="text-xl font-semibold mt-6">2. Propriedade Intelectual</h2>
                    <p>
                        Todo o conteúdo da plataforma, incluindo textos, imagens, logos, design e códigos,
                        são de propriedade dos desenvolvedores do BumbleBuild e estão protegidos por leis
                        de direitos autorais e propriedade intelectual.
                    </p>

                    <h2 className="text-xl font-semibold mt-6">3. Responsabilidades</h2>
                    <p>
                        O BumbleBuild não se responsabiliza por decisões de compra baseadas nas simulações
                        realizadas na plataforma. Apesar de prezarmos pela precisão dos dados, podem ocorrer
                        erros ou desatualizações nas informações apresentadas.
                    </p>

                    <h2 className="text-xl font-semibold mt-6">4. Alterações nos Termos</h2>
                    <p>
                        Reservamo-nos o direito de atualizar estes termos a qualquer momento.
                        Alterações passam a valer imediatamente após sua publicação no site.
                        É responsabilidade do usuário revisar periodicamente este documento.
                    </p>

                    <h2 className="text-xl font-semibold mt-6">5. Contato</h2>
                    <p>
                        Caso tenha dúvidas, sugestões ou precise de suporte, entre em contato conosco
                        através da página 
                        <Link to="/about" className="font-bold"> Sobre</Link>.
                    </p>

                    <h2 className="text-xl font-semibold mt-6">6. Uso de Marcas e Links Externos</h2>
                    <p>
                        A plataforma BumbleBuild pode conter links para sites de terceiros, como lojas (ex: Kabum) e apresentar marcas comerciais reconhecidas (ex: AMD). Esses links são fornecidos apenas para facilitar a navegação e consulta dos usuários, não configurando vínculo, patrocínio ou parceria oficial entre o BumbleBuild e tais empresas ou marcas.
                        Todas as marcas registradas exibidas são propriedade de seus respectivos donos. O BumbleBuild não se responsabiliza por quaisquer alterações, erros, preços, disponibilidade ou conteúdos presentes em sites externos vinculados à plataforma.
                    </p>

                    <h2 className="text-xl font-semibold mt-6">7. Natureza da Plataforma</h2>
                    <p>
                        O BumbleBuild é uma plataforma sem fins lucrativos, oferecida gratuitamente aos usuários.
                        Não há comercialização direta de produtos, nem recebemos qualquer tipo de pagamento, comissão, patrocínio ou parceria comercial de fabricantes, lojas ou marcas exibidas na plataforma.
                        Nosso objetivo é exclusivamente auxiliar usuários na montagem virtual de computadores.
                    </p>

                    <p className="pt-4 text-md">
                        Última atualização: Junho de 2025.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}
