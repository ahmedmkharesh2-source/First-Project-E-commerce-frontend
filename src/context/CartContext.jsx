// ============================================
// CartContext.jsx - سياق سلة التسوق
// ============================================
import React from 'react'
// ✅ لا تحتاج import React في React 18/19
import { createContext, useContext, useState, useCallback } from "react";

// إنشاء الـ Context
const CartContext = createContext();

// ============================================
// Provider - المزود الرئيسي
// ============================================
export const CartProvider = ({ children }) => {
  // --- State: عناصر السلة ---
  const [cartItems, setCartItems] = useState([]);

  // ============================================
  // دالة إضافة منتج للسلة
  // ============================================
  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems((prevItems) => {
      // التحقق: هل المنتج موجود في السلة؟
      const existingItem = prevItems.find(
        (item) => item._id === product._id
      );

      if (existingItem) {
        // إذا موجود: زيادة الكمية
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // إذا جديد: أضفه للسلة
        return [...prevItems, { ...product, quantity }];
      }
    });
  }, []);

  // ============================================
  // دالة إزالة منتج من السلة
  // ============================================
  const removeFromCart = useCallback((id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== id)
    );
  }, []);

  // ============================================
  // دالة تحديث الكمية
  // ============================================
  const updateQuantity = useCallback((id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item._id === id) {
          const newQuantity = item.quantity + change;
          // لا تسمح بكمية أقل من 1
          return newQuantity >= 1
            ? { ...item, quantity: newQuantity }
            : item;
        }
        return item;
      })
    );
  }, []);

  // ============================================
  // دالة تفريغ السلة
  // ============================================
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // --- حساب الإجمالي ---
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // --- القيمة المقدمة للأبناء ---
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// ============================================
// Hook مخصص - سهل الاستخدام
// ============================================
export const useCart = () => {
  const context = useContext(CartContext);
  
  // التحقق: هل الـ Hook مستخدم داخل Provider؟
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  
  return context;
};

export default CartContext;