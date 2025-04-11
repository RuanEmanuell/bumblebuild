import React, { createContext, useContext, useState } from "react";

//define a estrutura de um item no carrinho
interface CartItem {
  produto: {
    id: string;
    nome: string;
    preco: number;
    imagem?: string;
  };
  quantity: number;
}

//define as funções e dados disponíveis no contexto do carrinho
interface CartContextType {
  cartItems: CartItem[];
  totalItems: number;
  addToCart: (item: CartItem) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

//criando o contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  //adicionar o item ao carrinho
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.produto.id === item.produto.id);
      if (existingItem) {
        //verifica antes se o item já está no carrinho pra aumentar a qtd
        return prevItems.map((i) =>
          i.produto.id === item.produto.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      //retorna a qtd de 1 item ser não tiver no carrinho antes
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  //aumentar a qtd de um item
  const incrementQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.produto.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  //diminuir a qtd de itens no carrinho (minimo de um item)
  const decrementQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.produto.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  //remover o item completo do carrinho
  const removeItem = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.produto.id !== id)
    );
  };

  //limpa todos os itens do carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

//hook para acessar o contexto do carrinho
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("o useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
