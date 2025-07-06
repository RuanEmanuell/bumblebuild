import { Card, CardContent } from "./Card";

interface ProductProps {
  brand: string;
  name: string;
  price: any;
  image: string;
  link?: string;  
  details?: string;
}

export function ProductCard({ brand, name, price, image, link, details }: ProductProps) {
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
        <span className={`text-black font-bold text-lg ${price > 0 ? 'text-black' : 'text-red-500'}`}>{price > 0 ? `${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price.toFixed(2))}` : 'Produto esgotado!'}</span>
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
