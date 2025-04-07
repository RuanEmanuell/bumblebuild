import { LogoPrimary } from "./Logo";

export default function Footer() {
    return (
        <footer className="bg-yellow-300 px-6 py-8 text-center text-black text-sm mt-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto mb-6">
                <div>
                    <h4 className="font-bold mb-2">Sobre nós</h4>
                    <ul>
                        <li><a href="#">Quem somos</a></li>
                        <li><a href="#">Parcerias</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-2">Atendimento</h4>
                    <ul>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Contato</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-2">Políticas</h4>
                    <ul>
                        <li><a href="#">Termos de uso</a></li>
                        <li><a href="#">Privacidade</a></li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col items-center gap-1">
                <LogoPrimary size={24} />
                <p className="mt-2">©BumbleBuild 2025</p>
            </div>
        </footer>
    );
}
