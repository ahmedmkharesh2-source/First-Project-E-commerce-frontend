// ============================================
// Navbar.jsx - مُصلح بالكامل
// إصلاح 1: القائمة في الجوال (hamburger) - تحولت من DaisyUI dropdown إلى state
// إصلاح 2: صورة المستخدم - تتحقق من الـ URL قبل العرض
// ============================================

import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom"
import { toast } from 'react-toastify'
import cookies from "js-cookie"

const DEFAULT_AVATAR = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

// ============================================
// دالة تجيب الصورة الصحيحة
// تتحقق إن الـ URL مو فاضي ومو undefined
// ============================================
const getValidAvatar = () => {
  const av = cookies.get("userAvatar") || localStorage.getItem("userAvatar");
  return (av && av.trim() !== "" && av !== "undefined" && av !== "null")
    ? av
    : DEFAULT_AVATAR;
};

const Navbar = ({ cartCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // ============================================
  // State الأساسي
  // ============================================
  const [isLoggedin, setIsLoggedin] = useState(
    !!cookies.get("token") || !!localStorage.getItem("token")
  );
  const [userName, setUserName] = useState(
    cookies.get("userName") || localStorage.getItem("userName") || "User"
  );
  const [userAvatar, setUserAvatar] = useState(getValidAvatar);
  const [userRole, setUserRole] = useState(
    cookies.get("userRole") || localStorage.getItem("userRole") || "user"
  );

  // ============================================
  // إصلاح القائمة: state بدل DaisyUI dropdown
  // mobileOpen = هل القائمة مفتوحة أم لا
  // userMenuOpen = هل قائمة المستخدم مفتوحة أم لا
  // ============================================
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Refs عشان نغلق القوائم لو المستخدم ضغط برا
  const mobileRef = useRef(null);
  const userMenuRef = useRef(null);

  // ============================================
  // نغلق القوائم لما يتغير الصفحة
  // ============================================
  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // ============================================
  // نغلق القوائم لو المستخدم ضغط برا
  // ============================================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // ============================================
  // مراقبة التغييرات كل 500ms
  // ============================================
  useEffect(() => {
    const checkAuth = () => {
      const token = cookies.get("token") || localStorage.getItem("token");
      setIsLoggedin(!!token);
      setUserName(cookies.get("userName") || localStorage.getItem("userName") || "User");
      setUserAvatar(getValidAvatar());
      setUserRole(cookies.get("userRole") || localStorage.getItem("userRole") || "user");
    };
    const interval = setInterval(checkAuth, 500);
    return () => clearInterval(interval);
  }, []);

  // ============================================
  // تسجيل الخروج
  // ============================================
  const logout = async () => {
    try {
      await axios.get("https://first-project-e-commerce-backend-production.up.railway.app/api/v1/users/logout", {
        withCredentials: true
      });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
    }

    cookies.remove("token");
    cookies.remove("userName");
    cookies.remove("userAvatar");
    cookies.remove("userRole");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userAvatar");

    setIsLoggedin(false);
    setUserName("User");
    setUserAvatar(DEFAULT_AVATAR);
    setMobileOpen(false);
    setUserMenuOpen(false);

    navigate("/login");
  };

  return (
    <div className="navbar sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-700/50 shadow-lg shadow-black/20 px-4 lg:px-8">

      {/* ==================== القسم الأيسر ==================== */}
      <div className="navbar-start gap-4">

        {/* ============================================
            الهامبرغر - مصلح بـ state بدل DaisyUI dropdown
            السبب: DaisyUI dropdown يعتمد على focus وهذا
            لا يشتغل صح على الجوال مع touch events
        ============================================ */}
        <div className="relative lg:hidden" ref={mobileRef}>

          {/* زر الهامبرغر */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="btn btn-ghost btn-circle text-slate-300 hover:text-[#38bdf8]"
            aria-label="Toggle menu"
          >
            {/* أيقونة X لما القائمة مفتوحة، وأيقونة هامبرغر لما مغلقة */}
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* القائمة المنسدلة - تظهر/تختفي حسب mobileOpen */}
          {mobileOpen && (
            <ul className="absolute top-full left-0 mt-2 p-3 shadow-xl bg-[#1e293b] border border-slate-700/50 rounded-xl w-56 z-[70]">
              <li>
                <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-[#38bdf8] hover:bg-[#0ea5e9]/10 transition-all">
                  🏠 Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-[#38bdf8] hover:bg-[#0ea5e9]/10 transition-all">
                  📦 Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-[#38bdf8] hover:bg-[#0ea5e9]/10 transition-all">
                  ℹ️ About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-[#38bdf8] hover:bg-[#0ea5e9]/10 transition-all">
                  📧 Contact
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* الشعار */}
        <div className="flex flex-col">
          <Link to="/" className="flex items-center gap-2 cursor-pointer group">
            <img src="/images/logo2.png" alt="Store Logo" className="h-10 w-auto object-contain" />
            <span className="text-[#D4AF37] font-bold text-xl hidden sm:block tracking-wide">STORE</span>
          </Link>
          {isLoggedin && (
            <div className="hidden lg:flex items-center gap-1 mt-1">
              <span className="text-[#38bdf8] text-sm font-medium">Hi,</span>
              <span className="text-white text-sm font-bold">{userName}</span>
              <span className="text-[#D4AF37] text-xs">👋</span>
            </div>
          )}
        </div>
      </div>

      {/* ==================== القسم الأوسط ==================== */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1">
          <li><Link to="/" className="text-slate-300 hover:text-[#38bdf8] hover:bg-[#0ea5e9]/10 px-4 py-2 rounded-lg transition-all font-medium">Home</Link></li>
          <li><Link to="/products" className="text-slate-300 hover:text-[#38bdf8] hover:bg-[#0ea5e9]/10 px-4 py-2 rounded-lg transition-all font-medium">Products</Link></li>
          <li><Link to="/about" className="text-slate-300 hover:text-[#38bdf8] hover:bg-[#0ea5e9]/10 px-4 py-2 rounded-lg transition-all font-medium">About</Link></li>
          <li><Link to="/contact" className="text-slate-300 hover:text-[#38bdf8] hover:bg-[#0ea5e9]/10 px-4 py-2 rounded-lg transition-all font-medium">Contact</Link></li>
        </ul>
      </div>

      {/* ==================== القسم الأيمن ==================== */}
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

        {/* أيقونة الأدمن */}
        {isLoggedin && userRole === "admin" && (
          <Link to="/admin-dashboard" className="btn btn-ghost btn-circle group hover:bg-[#1e293b] hidden md:flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300 group-hover:text-[#38bdf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Link>
        )}

        {/* ============================================
            قائمة المستخدم - مصلحة بنفس طريقة الهامبرغر
        ============================================ */}
        <div className="relative" ref={userMenuRef}>

          {/* زر الأفاتار */}
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="btn btn-ghost btn-circle avatar group hover:bg-[#1e293b]"
          >
            <div className="w-9 h-9 rounded-full ring-2 ring-slate-700 group-hover:ring-[#38bdf8] transition-all overflow-hidden">
              {/* ============================================
                  إصلاح الصورة: نضيف onError عشان لو فشلت
                  تحط الصورة الافتراضية تلقائياً
              ============================================ */}
              <img
                alt={userName}
                src={userAvatar}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
              />
            </div>
          </button>

          {/* القائمة المنسدلة */}
          {userMenuOpen && (
            <ul className="absolute top-full right-0 mt-2 w-56 p-2 shadow-xl bg-[#1e293b] border border-slate-700/50 rounded-xl z-[70]">

              {isLoggedin && (
                <li className="px-3 py-2 text-[#38bdf8] font-bold border-b border-slate-700/50 mb-1">
                  👋 Hi, {userName}
                </li>
              )}

              {isLoggedin && (
                <>
                  <li>
                    <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-[#38bdf8] hover:bg-[#0ea5e9]/10 transition-all">
                      📋 Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-orders" className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-[#38bdf8] hover:bg-[#0ea5e9]/10 transition-all">
                      📦 My Orders
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-[#38bdf8] hover:bg-[#0ea5e9]/10 transition-all">
                      ⚙️ Settings
                    </Link>
                  </li>
                  <div className="border-t border-slate-700/50 my-1"></div>
                </>
              )}

              <li>
                {isLoggedin ? (
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all text-left"
                  >
                    🚪 Logout
                  </button>
                ) : (
                  <Link to="/login" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#38bdf8] hover:bg-[#0ea5e9]/10 transition-all">
                    🔑 Login
                  </Link>
                )}
              </li>
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;