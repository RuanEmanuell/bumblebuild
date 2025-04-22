import { Card, CardContent } from "./Card";
import { Star } from "lucide-react";

interface ProductProps {
  nome: string;
  preco: string;
  estrelas: number;
  imagem: string;
  link?: string;  // Novo campo link
}

export function ProductCard({ nome, preco, estrelas, imagem, link }: ProductProps) {
  return (
    <Card className="p-0 flex flex-col">
      <img
        src={imagem}
        alt={nome}
        className="w-full h-40 object-contain rounded-t-2xl bg-white"
      />
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <div className="flex flex-col items-start gap-2">
          <h4 className="font-medium text-sm">{nome}</h4>
          <span className="text-black font-bold text-lg">{preco}</span>
          <div className="flex items-center text-yellow-500 gap-1">
            {[...Array(Math.floor(estrelas))].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400" />
            ))}
            {estrelas % 1 !== 0 && (
              <Star className="w-4 h-4 fill-yellow-400 opacity-50" />
            )}
            <span className="ml-1 text-sm text-gray-500">{estrelas.toFixed(1)}</span>
          </div>
          {/* Verificando se o link existe para mostrar o botão */}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-blue-600 hover:underline text-sm"
            >
              Ver no site
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
