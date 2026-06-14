// ============================================
// Navbar.jsx - مُصلح بالكامل
// ============================================

import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import cookies from "js-cookie"

const Navbar = ({ cartCount = 0 }) => {
  const navigate = useNavigate()

  // ============================================
  // useState عشان الـ Navbar يتحدث لما تتغير حالة الدخول
  // بدونه: يقرأ الكوكيز مرة واحدة فقط ولا يتحدث
  // ============================================
  const [isLoggedin, setIsLoggedin] = useState(
    !!cookies.get("token") || !!localStorage.getItem("token")
  );
  const [userName, setUserName] = useState(
    cookies.get("userName") || localStorage.getItem("userName") || "User"
  );
  const [userAvatar, setUserAvatar] = useState(
    cookies.get("userAvatar") || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
  );
  const [userRole, setUserRole] = useState(
    cookies.get("userRole") || localStorage.getItem("userRole") || "user"
  );

  // ============================================
  // useEffect: نراقب التغييرات كل ثانية
  // عشان الـ Navbar يتحدث فوراً بعد تسجيل الدخول أو الخروج
  // ============================================
  useEffect(() => {
    const checkAuth = () => {
      const token = cookies.get("token") || localStorage.getItem("token");
      setIsLoggedin(!!token);
      setUserName(cookies.get("userName") || localStorage.getItem("userName") || "User");
      setUserAvatar(cookies.get("userAvatar") || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp");
      setUserRole(cookies.get("userRole") || localStorage.getItem("userRole") || "user");
    };

    // نفحص كل 500ms
    const interval = setInterval(checkAuth, 500);
    return () => clearInterval(interval);
  }, []);

  // ============================================
  // دالة تسجيل الخروج
  // ============================================
  const logout = async () => {
    try {
      await axios.get("first-project-e-commerce-backend-production.up.railway.app/api/v1/users/logout", {
        withCredentials: true
      });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
    }
    
    // مسح الكوكيز
    cookies.remove("token");
    cookies.remove("userName");
    cookies.remove("userAvatar");
    cookies.remove("userRole");

    // مسح localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");

    // تحديث الـ state فوراً
    setIsLoggedin(false);
    setUserName("User");
    setUserAvatar("https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp");
    
    navigate("/login");
  }

  return (
    <div className="navbar sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-700/50 shadow-lg shadow-black/20 px-4 lg:px-8">

      {/* القسم الأيسر */}
      <div className="navbar-start gap-4">
        
        {/* الهامبرغر */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-slate-300 hover:text-[#38bdf8]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-3 shadow-xl bg-[#1e293b] border border-slate-700/50 rounded-xl w-56 z-[70]">
            <li><Link to="/" className="text-slate-300 hover:text-[#38bdf8]">🏠 Home</Link></li>
            <li><Link to="/products" className="text-slate-300 hover:text-[#38bdf8]">📦 Products</Link></li>
            <li><Link to="/about" className="text-slate-300 hover:text-[#38bdf8]">ℹ️ About</Link></li>
            <li><Link to="/contact" className="text-slate-300 hover:text-[#38bdf8]">📧 Contact</Link></li>
          </ul>
        </div>

        {/* الشعار */}
        <div className="flex flex-col">
          <Link to="/" className="flex items-center gap-2 cursor-pointer group">
            <img src="/images/logo2.png" alt="Store Logo" className="h-10 w-auto object-contain" />
            <span className="text-[#D4AF37] font-bold text-xl hidden sm:block tracking-wide">STORE</span>
          </Link>
          
          {/* رسالة الترحيب */}
          {isLoggedin && (
            <div className="hidden lg:flex items-center gap-1 mt-1">
              <span className="text-[#38bdf8] text-sm font-medium">Hi,</span>
              <span className="text-white text-sm font-bold">{userName}</span>
              <span className="text-[#D4AF37] text-xs">👋</span>
            </div>
          )}
        </div>
      </div>

      {/* القسم الأوسط */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1">
          <li><Link to="/" className="text-slate-300 hover:text-[#38bdf8] hover:bg-[#0ea5e9]/10 px-4 py-2 rounded-lg transition-all font-medium">Home</Link></li>
          <li><Link to="/products" className="text-slate-300 hover:text-[#38bdf8] hover:bg-[#0ea5e9]/10 px-4 py-2 rounded-lg transition-all font-medium">Products</Link></li>
          <li><Link to="/about" className="text-slate-300 hover:text-[#38bdf8] hover:bg-[#0ea5e9]/10 px-4 py-2 rounded-lg transition-all font-medium">About</Link></li>
          <li><Link to="/contact" className="text-slate-300 hover:text-[#38bdf8] hover:bg-[#0ea5e9]/10 px-4 py-2 rounded-lg transition-all font-medium">Contact</Link></li>
        </ul>
      </div>

      {/* القسم الأيمن */}
      <div className="navbar-end gap-2">

        {/* السلة */}
        <Link to="/cart" className="btn btn-ghost btn-circle relative group hover:bg-[#1e293b]">
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300 group-hover:text-[#38bdf8] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#0ea5e9] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>
        </Link>

        {/* ✅ أيقونة الأدمن - تظهر فقط للأدمن */}
        {isLoggedin && userRole === "admin" && (
          <Link to="/admin-dashboard" className="btn btn-ghost btn-circle group hover:bg-[#1e293b] hidden md:flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300 group-hover:text-[#38bdf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Link>
        )}

        {/* قائمة المستخدم */}
        <div className="dropdown dropdown-end z-[70]">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar group hover:bg-[#1e293b]">
            <div className="w-9 h-9 rounded-full ring-2 ring-slate-700 group-hover:ring-[#38bdf8] transition-all overflow-hidden">
              <img alt={userName} src={userAvatar} className="w-full h-full object-cover" />
            </div>
          </div>
          
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 w-56 p-2 shadow-xl bg-[#1e293b] border border-slate-700/50 rounded-xl z-[70] relative">
            
            {/* ✅ اسم المستخدم - يظهر فقط لو مسجل دخول */}
            {isLoggedin && (
              <li className="px-3 py-2 text-[#38bdf8] font-bold border-b border-slate-700/50 mb-1">
                👋 Hi, {userName}
              </li>
            )}
            
            {/* ✅ روابط تظهر فقط لو مسجل دخول */}
            {isLoggedin && (
              <>
                <li><Link to="/profile" className="text-slate-300 hover:text-[#38bdf8] hover:bg-[#0ea5e9]/10">📋 Profile</Link></li>
                {/* ✅ My Orders - يروح لصفحة الأوردرات */}
                <li><Link to="/my-orders" className="text-slate-300 hover:text-[#38bdf8] hover:bg-[#0ea5e9]/10">📦 My Orders</Link></li>
                {/* ✅ Settings - يروح لصفحة الإعدادات */}
                <li><Link to="/settings" className="text-slate-300 hover:text-[#38bdf8] hover:bg-[#0ea5e9]/10">⚙️ Settings</Link></li>
                <div className="border-t border-slate-700/50 my-1"></div>
              </>
            )}
            
            {/* ✅ Logout أو Login حسب الحالة */}
            <li>
              {isLoggedin ? (
                <span onClick={logout} className="text-red-400 hover:text-red-300 hover:bg-red-900/20 cursor-pointer">
                  🚪 Logout
                </span>
              ) : (
                <Link to="/login" className="text-[#38bdf8] hover:bg-[#0ea5e9]/10">
                  🔑 Login
                </Link>
              )}
            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default Navbar