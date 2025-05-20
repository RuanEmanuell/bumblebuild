import { Card, CardContent } from "./Card";
import { Star } from "lucide-react";

interface ProductProps {
  name: string;
  price: string;
  stars: number;
  image: string;
  link?: string;  
}

export function ProductCard({ name, price, stars, image, link }: ProductProps) {
  return (
    <Card className="p-0 flex flex-col">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-contain rounded-t-2xl bg-white"
      />
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <div className="flex flex-col items-start gap-2">
          <h4 className="font-medium text-sm">{name}</h4>
          <span className="text-black font-bold text-lg">{price}</span>
          <div className="flex items-center text-yellow-500 gap-1">
            {[...Array(Math.floor(stars))].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400" />
            ))}
            {stars % 1 !== 0 && (
              <Star className="w-4 h-4 fill-yellow-400 opacity-50" />
            )}
            <span className="ml-1 text-sm text-gray-500">{stars.toFixed(1)}</span>
          </div>
          {/*verificando se o link existe para mostrar o botão */}
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
