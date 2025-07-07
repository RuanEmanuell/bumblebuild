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

function HalfStar(
) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-yellow-400"
    >
      <defs>
        <linearGradient id="halfGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path
        fill="url(#halfGrad)"
        stroke="currentColor"
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );
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
  const score = rating ?? 0;
  const fullStars = Math.floor(score);
  const hasHalfStar = score % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
    );
  }

  if (hasHalfStar) {
    stars.push(<HalfStar key="half" />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star key={`empty-${i}`} className="w-4 h-4 stroke-yellow-400" />
    );
  }

  return <div className="flex text-yellow-400">{stars}</div>;
}
