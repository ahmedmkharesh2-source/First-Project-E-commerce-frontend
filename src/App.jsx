// ============================================
// App.jsx - السلة مرتبطة بكل مستخدم
// ============================================

import "./App.css"
import Navbar from "./components/Navbar"
import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from "js-cookie"

// --- Pages (Public) ---
import Home from "./pages/Home"
import About from "./pages/About"
import Products from "./pages/Products"
import ProductDetail from "./pages/ProductDetail"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgetPasswordRequest from "./pages/ForgetPasswordRequest"
import ResetPassword from "./pages/ResetPassword"
import Contact from "./pages/Contact" 

// --- Pages (Protected) ---
import Profile from "./pages/Profile"
import UpdateProfile from "./pages/UpdateProfile"
import UpdatePassword from "./pages/UpdatePassword"
import Cart from "./pages/Cart"

// --- Admin Pages ---
import AdminLayout from "./pages/admin/AdminLayout"
import DashboardHome from "./pages/admin/DashboardHome"
import ViewAllUsers from "./pages/admin/ViewAllUsers"
import ViewAllOrders from "./pages/admin/ViewAllOrders"
import AddProduct from "./pages/admin/AddProduct"
import UpdateProduct from "./pages/admin/UpdateProduct"
import ViewAllProducts from "./pages/admin/ViewAllProducts"

// --- Components ---
import Footer from "./components/Footer"
import ProtectedRoute from "./components/ProtectedRoute"
import MyOrders from "./pages/MyOrders"
import Settings from "./pages/Settings"
const App = () => {

  // ============================================
  // دالة تجيب مفتاح السلة الخاص بكل مستخدم
  // كل مستخدم له مفتاح مختلف في localStorage
  // مثال: "cartItems_user123" و "cartItems_user456"
  // ============================================
  const getCartKey = () => {
    // نجيب الـ token من localStorage أو الكوكيز
    const token = localStorage.getItem("token") || Cookies.get("token");
    
    if (!token) {
      // لو ما فيه token = زائر، نستخدم مفتاح عام
      return "cartItems_guest";
    }

    // ============================================
    // نستخرج الـ user ID من الـ JWT token
    // الـ JWT مكوّن من 3 أجزاء مفصولة بنقطة:
    // header.payload.signature
    // الـ payload هو الجزء الثاني وفيه بيانات المستخدم
    // ============================================
    try {
      const payload = token.split(".")[1]; // نأخذ الجزء الثاني
      const decoded = JSON.parse(atob(payload)); // نفك التشفير Base64
      return `cartItems_${decoded.id}`; // مفتاح فريد لكل مستخدم
    } catch {
      // لو فشل فك التشفير، نستخدم مفتاح عام
      return "cartItems_guest";
    }
  };

  // ============================================
  // State للسلة
  // نقرأ السلة من localStorage بناءً على مفتاح المستخدم
  // ============================================
  const [cartItems, setCartItems] = useState(() => {
    try {
      const key = getCartKey(); // نجيب المفتاح الخاص بالمستخدم الحالي
      const saved = localStorage.getItem(key); // نقرأ سلته
      return saved ? JSON.parse(saved) : []; // نرجع البيانات أو مصفوفة فارغة
    } catch {
      return [];
    }
  });

  // ============================================
  // useEffect: كل ما تغيرت السلة، نحفظها في localStorage
  // بمفتاح المستخدم الحالي
  // ============================================
  useEffect(() => {
    const key = getCartKey();
    localStorage.setItem(key, JSON.stringify(cartItems));
  }, [cartItems]);

  // ============================================
  // دالة إضافة منتج للسلة
  // لو المنتج موجود: نزيد كميته
  // لو جديد: نضيفه
  // ============================================
  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        // المنتج موجود → زيادة الكمية
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // منتج جديد → أضفه للسلة
      return [...prev, { ...product, quantity }];
    });
  };

  // ============================================
  // دالة حذف منتج من السلة
  // نفلتر المصفوفة ونحذف العنصر بالـ ID
  // ============================================
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  };

  // ============================================
  // دالة تحديث الكمية
  // delta: +1 زيادة أو -1 نقصان
  // لو الكمية وصلت 0: نحذف المنتج من السلة
  // ============================================
  const updateQuantity = (productId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0) // نحذف اللي كميته 0
    );
  };

  // ============================================
  // دالة تفريغ السلة بالكامل
  // تُستخدم بعد إتمام الدفع
  // ============================================
  const clearCart = () => {
    setCartItems([]);
    // نمسح سلة المستخدم من localStorage أيضاً
    const key = getCartKey();
    localStorage.removeItem(key);
  };

  // ============================================
  // دالة تُستدعى عند تسجيل الدخول
  // تحمّل سلة المستخدم الجديد من localStorage
  // ============================================
  const loadUserCart = () => {
    try {
      const key = getCartKey();
      const saved = localStorage.getItem(key);
      setCartItems(saved ? JSON.parse(saved) : []);
    } catch {
      setCartItems([]);
    }
  };

  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      {/* نمرر cartCount للـ Navbar عشان يظهر عدد المنتجات */}
      <Navbar 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onLogin={loadUserCart} // ✅ نمرر دالة تحميل السلة عند تسجيل الدخول
      />
      
      <Routes>
        {/* === Public Routes === */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-detail/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* ✅ نمرر onLogin لصفحة Login عشان تحمّل السلة بعد تسجيل الدخول */}
        <Route path="/login" element={<Login onLogin={loadUserCart} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPasswordRequest />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
// داخل Routes:
<Route path="/my-orders" element={
  <ProtectedRoute><MyOrders /></ProtectedRoute>
} />
<Route path="/settings" element={
  <ProtectedRoute><Settings /></ProtectedRoute>
} />
        {/* === Protected Routes === */}
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart 
              cartItems={cartItems} 
              removeFromCart={removeFromCart} 
              updateQuantity={updateQuantity} 
              clearCart={clearCart} 
            />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />

        <Route path="/update-profile" element={
          <ProtectedRoute><UpdateProfile /></ProtectedRoute>
        } />

        <Route path="/update-password" element={
          <ProtectedRoute><UpdatePassword /></ProtectedRoute>
        } />

        {/* === Admin Routes === */}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute><AdminLayout /></ProtectedRoute>
        }>
          <Route index element={<DashboardHome />} />
          <Route path="view-all-users" element={<ViewAllUsers />} />
          <Route path="view-all-products" element={<ViewAllProducts />} />
          <Route path="view-all-orders" element={<ViewAllOrders />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="update-product/:id" element={<UpdateProduct />} />
        </Route>
      </Routes>
      
      <Footer />
    </>
  );
};

export default App;