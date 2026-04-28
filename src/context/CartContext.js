'use client';

import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const toggleCartItem = (item) => {
    setCartItems((prevItems) => {
      const itemInCart = prevItems.find((i) => i.id === item.id);
      if (itemInCart) {
        return prevItems.filter((i) => i.id !== item.id);
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, toggleCartItem }}>
      {children}
    </CartContext.Provider>
  );
};
