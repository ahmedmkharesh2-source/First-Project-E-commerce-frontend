import { createContext, useContext, useState } from "react";
import React from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    const existItem = cartItems.find(
      (item) => item._id === product._id
    );

    if (existItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity,
        },
      ]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(
      cartItems.filter((item) => item._id !== id)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

export const useCart = () => useContext(CartContext);