import { Card, CardContent } from "./Card";

interface ProductProps {
  name: string;
  price: string;
  image: string;
  link?: string;  
}

export function ProductCard({ name, price, image, link }: ProductProps) {
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
