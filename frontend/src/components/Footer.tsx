import { LogoPrimary } from "./Logo";

export default function Footer() {
    return (
        <footer className="bg-primary flex items-center px-4 py-6 text-center text-black text-sm mt-auto">
            <div className="text-left max-w-5xl mx-auto flex flex-col justify-center items-center">
                <LogoPrimary size={90} />
                <ul className="flex flex-row gap-6 my-2">
                    <li className="transition-all duration-250 ease-in-out hover:font-bold"><a href="#">Quem somos</a></li>
                    <li className="transition-all duration-250 ease-in-out hover:font-bold"><a href="#">Contato</a></li>
                    <li className="transition-all duration-250 ease-in-out hover:font-bold"><a href="#">Termos de uso</a></li>
                </ul>
                <p className="text opacity-60 ">©BumbleBuild 2025</p>
            </div>
        </footer>
    );
}