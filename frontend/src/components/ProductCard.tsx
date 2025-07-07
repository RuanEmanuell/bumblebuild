import { Star } from "react-feather";
import { Card, CardContent } from "./Card";

interface ProductProps {
  brand: string;
  name: string;
  price: any;
  image: string;
  link?: string;
  details?: string;
  rating?: number;
}

export function ProductCard({ brand, name, price, image, link, details, rating }: ProductProps) {
  const displayRating = rating ?? 0;
  return (
    <Card className="p-0 flex flex-col">
      <img
        src={image}
        alt={name}
        className="w-2/3 h-40 object-contain rounded-t-2xl bg-white m-auto my-2"
      />
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <div className="flex flex-col items-start gap-2">
          <h4 className="font-medium text-sm">{brand} {name}</h4>


          <p className="text-sm">{details}</p>
          <span className={`text-black font-bold text-lg ${price > 0 ? 'text-black' : 'text-red-500'}`}>
            {price > 0 ? `${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price.toFixed(2))}` : 'Produto esgotado!'}
          </span>
          {rating !== undefined && rating !== null && (
            <div className="flex items-center gap-1">
              {renderStars(displayRating)}
              <span className="text-xs text-gray-600">({displayRating.toFixed(1)})</span>
            </div>
          )}
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

function renderStars(rating?: number | null) {
  const value = rating ?? 0;
  const fullStarsCount = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStarsCount = 5 - fullStarsCount - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex text-yellow-400">
      {[...Array(fullStarsCount)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
      ))}
      {hasHalfStar && (
        <Star
          key="half"
          className="w-4 h-4 fill-gradient-to-r from-yellow-400 to-transparent stroke-yellow-400"
          style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
        />
      )}
      {[...Array(emptyStarsCount)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 stroke-yellow-400" />
      ))}
    </div>
  );
}