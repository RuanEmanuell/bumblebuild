import HeaderCustom from '../components/Header';
import Footer from '../components/Footer';
import ProfileCard from '../components/ProfileCard';

export default function About() {

    return (
        <div className="bg-white text-black min-h-screen flex flex-col">
            <HeaderCustom />

            <main className="flex flex-col items-center justify-center px-6 pt-12 pb-6 flex-grow">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                    Sobre o BumbleBuild
                </h1>

                <p className="text-center max-w-3xl text-lg text-gray-700 mb-4">
                    O <strong>BumbleBuild</strong> é uma plataforma desenvolvida com o objetivo de facilitar a montagem de PCs,
                    permitindo que usuários encontrem, comparem e escolham as melhores peças para suas necessidades.
                </p>

                <p className="text-center max-w-3xl text-lg text-gray-700 mb-4">
                    Nosso sistema conta com um algoritmo inteligente de compatibilidade que garante que você nunca
                    escolha peças incompatíveis. Além disso, você pode visualizar seu histórico de montagens, comparar preços
                    e otimizar seus setups de acordo com seu orçamento.
                </p>

                <p className="text-center max-w-3xl text-lg text-gray-700 mb-4">
                    Este projeto foi desenvolvido por apaixonados por tecnologia e hardware, com foco em entregar
                    uma experiência simples, eficiente e acessível para todos que desejam montar seu próprio PC.
                </p>

                <p className="text-center max-w-3xl text-lg text-gray-700">
                    Nosso compromisso é ajudar você a construir o melhor setup possível, seja para trabalho, estudos ou games!
                </p>
            </main>

            <section className="w-full max-w-5xl mx-auto pt-6 pb-12 px-6">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 text-center">
                    Nossa equipe
                </h2>

                <div className="flex flex-row flex-wrap mx-auto justify-center">
                    <ProfileCard
                        photo="/aliny.jpeg"
                        name="Aliny Dutra"
                        role="Designer e Desenvolvedora"
                        description="Estudante do 6º período de Análise e Desenvolvimento de Sistemas no IFTM, com experiência em desenvolvimento web e mobile. No BumbleBuild, ficou responsável principalmente pelo design e desenvolvimento front-end, além de contribuir no back-end."
                        githubUrl="https://github.com/linyoff"
                        linkedinUrl="https://www.linkedin.com/in/aliny1505dutra/"
                    />
                    <ProfileCard
                        photo="/gabriel.jpeg"
                        name="Gabriel Marçal"
                        role="Desenvolvedor Web Fullstack"
                        description="Estudante do 6º período de Análise e Desenvolvimento de Sistemas no IFTM, com foco em back-end. Atuou no desenvolvimento do back-end e também contribuiu no front-end do projeto BumbleBuild, colaborando na integração das APIs e funcionalidades essenciais para o sistema."
                        githubUrl="https://github.com/gabriel-marcal"
                        linkedinUrl="https://github.com/Gabrielm221"
                    />
                    <ProfileCard
                        photo="/jose.jpeg"
                        name="José Marcolino"
                        role="Desenvolvedor Web Fullstack"
                        description="Estudante do 6º período de Análise e Desenvolvimento de Sistemas no IFTM, atualmente Desenvolvedor Web Júnior na Codiub. Nesse projeto, atuou especialmente no back-end com foco em banco de dados e containers Docker, contribuindo para a infraestrutura do BumbleBuild."
                        githubUrl="https://github.com/jose-marcolino"
                        linkedinUrl="https://www.linkedin.com/in/josé-marcolino-114980236/"
                    />
                    <ProfileCard
                        photo="/ruan.jpeg"
                        name="Ruan Emanuell"
                        role="Desenvolvedor Web e Mobile"
                        description="Estudante do 5º período de Análise e Desenvolvimento de Sistemas no IFTM, atuando como Analista de Sistemas II na Bravo Serviços Logísticos. No BumbleBuild, foi responsável pela idealização, bem como apoio no front-end, back-end e modelagem do banco de dados."
                        githubUrl="https://github.com/ruanemanuell"
                        linkedinUrl="https://www.linkedin.com/in/ruanemanuell"
                    />

                </div>
            </section>

            <Footer />
        </div>
    );
}
