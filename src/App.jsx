import "./App.css"
import Navbar from "./components/Navbar"
import React from "react"
import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom"
import About from "./pages/About"
import Footer from "./components/Footer"
import ProductDetail from "./pages/ProductDetail"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { ToastContainer } from 'react-toastify';
import Profile from "./pages/Profile"
import UpdateProfile from "./pages/UpdateProfile"
import UpdatePassword from "./pages/UpdatePassword"
import ForgetPasswordRequest from "./pages/ForgetPasswordRequest"
import ResetPassword from "./pages/ResetPassword"
import AdminLayout from "./pages/admin/AdminLayout";
import DashboardHome from "./pages/admin/DashboardHome";
import ViewAllUsers from "./pages/admin/ViewAllUsers";
import ViewAllOrders from "./pages/admin/ViewAllOrders"
import AddProduct from "./pages/admin/AddProduct"
import UpdateProduct from "./pages/admin/UpdateProduct"
import AdminDashboard from "./pages/admin/AdminLayout"

import ViewAllProducts from "./pages/admin/ViewAllProducts";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/forget-password" element={<ForgetPasswordRequest />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
       
        

        

        {/*  admin Routes  */}
<Route
  path="/admin-dashboard"
  element={<AdminDashboard />}
>

  {/* DASHBOARD HOME */}
  <Route
    index
    element={<DashboardHome />}
  />



  {/* USERS */}
  <Route
    path="view-all-users"
    element={<ViewAllUsers />}
  />
  {/* PRODUCTS */}
  <Route
    path="view-all-products"
    element={<ViewAllProducts />}
  />



  {/* ORDERS */}
  <Route
    path="view-all-orders"
    element={<ViewAllOrders />}
  />



  {/* ADD PRODUCT */}
  <Route
    path="add-product"
    element={<AddProduct />}
  />



  {/* UPDATE PRODUCT */}
  <Route
    path="update-product/:id"
    element={<UpdateProduct />}
  />

</Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
