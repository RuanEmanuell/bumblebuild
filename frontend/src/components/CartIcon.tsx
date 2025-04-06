// components/CartIcon.tsx
import React from 'react';
import { ShoppingCart } from 'react-feather';
import { useCart } from '../context/CartContext';

interface CartIconProps {
  className?: string;
}

const CartIcon: React.FC<CartIconProps> = ({ className }) => {
  const { totalItems } = useCart();

  return (
    <div className={`relative ${className}`}>
      <ShoppingCart size={22} className="hover:cursor-pointer hover:opacity-80" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
