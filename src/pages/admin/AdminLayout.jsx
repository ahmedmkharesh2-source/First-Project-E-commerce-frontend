// ============================================
// AdminDashboard.jsx - إطار لوحة التحكم
// ألوان: داكن + أزرق فاتح + ذهبي
// ============================================

import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, PlusCircle, Users, ShoppingBag, Bell, Search, Package } from "lucide-react";
import axios from "axios";
import cookies from "js-cookie";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // --- بيانات المستخدم من الكوكيز ---
  const userName = cookies.get("userName") || "Admin";
  const userAvatar = cookies.get("userAvatar") || "https://i.pravatar.cc/100";

  // ============================================
  // CHECK ADMIN
  // ============================================
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/users/user-profile",
          { withCredentials: true }
        );
        const role = response.data.user.role;
        if (role !== "admin") {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };
    checkAdmin();
  }, [navigate]);

  // ============================================
  // SIDEBAR LINKS
  // ============================================
  const menuItems = [
    { title: "Dashboard", path: "/admin-dashboard", icon: <LayoutDashboard size={18} /> },
    { title: "Add Product", path: "/admin-dashboard/add-product", icon: <PlusCircle size={18} /> },
    { title: "All Products", path: "/admin-dashboard/view-all-products", icon: <Package size={18} /> },
    { title: "View All Users", path: "/admin-dashboard/view-all-users", icon: <Users size={18} /> },
    { title: "All Orders", path: "/admin-dashboard/view-all-orders", icon: <ShoppingBag size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#0f172a]">

      {/* Overlay للجوال */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static z-50 top-0 left-0 h-screen w-64 bg-[#1e293b] border-r border-slate-700/50 text-white transition-transform duration-300 shadow-2xl
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>

        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700/50">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
            <h1 className="text-lg font-bold text-[#D4AF37]">Admin</h1>
          </Link>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <div className="mt-6 px-3">
          <p className="text-slate-500 text-xs uppercase mb-4 font-semibold tracking-wider">Main Menu</p>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-200
                  ${location.pathname === item.path 
                    ? "bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/25" 
                    : "text-slate-400 hover:bg-[#0ea5e9]/10 hover:text-[#38bdf8]"}`}
              >
                <span className={location.pathname === item.path ? "text-white" : "text-[#38bdf8]"}>
                  {item.icon}
                </span>
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Admin Card */}
        <div className="absolute bottom-5 left-3 right-3">
          <div className="bg-[#0f172a] border border-slate-700/50 rounded-xl p-3 flex items-center gap-3">
            <img src={userAvatar} alt="admin" className="w-10 h-10 rounded-full border-2 border-[#0ea5e9] object-cover" />
            <div>
              <h3 className="text-sm font-semibold text-white">{userName}</h3>
              <p className="text-xs text-[#38bdf8]">Admin Panel</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <div className="bg-[#1e293b]/80 backdrop-blur-md border-b border-slate-700/50 px-6 py-4 flex items-center justify-between sticky top-0 z-30">

          <div className="flex items-center gap-4">
            <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <h2 className="text-xl font-bold text-white hidden sm:block">
              Admin <span className="text-[#38bdf8]">Dashboard</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">

            {/* Search */}
            <div className="hidden md:flex items-center bg-[#0f172a] border border-slate-700/50 px-3 py-2 rounded-xl">
              <Search size={16} className="text-slate-500" />
              <input type="text" placeholder="Search..." className="bg-transparent outline-none px-2 text-white placeholder-slate-500 text-sm w-48" />
            </div>

            {/* Notification */}
            <button className="relative bg-[#0f172a] border border-slate-700/50 p-2 rounded-xl hover:bg-[#0ea5e9]/20 hover:border-[#0ea5e9]/50 transition-all">
              <Bell size={18} className="text-slate-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-2">
              <img src={userAvatar} alt="profile" className="w-9 h-9 rounded-full border-2 border-[#0ea5e9] object-cover" />
              <span className="text-white text-sm font-medium hidden md:block">{userName}</span>
            </div>

          </div>
        </div>

        {/* الصفحات الداخلية */}
        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;