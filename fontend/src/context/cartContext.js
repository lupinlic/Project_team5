// src/CartContext.js
import React, { createContext, useState } from 'react';

// Tạo context để quản lý cartCount và setCartCount
export const CartContext = createContext();

// Tạo một component Provider để bọc quanh toàn bộ ứng dụng
export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
