import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, PlusCircle, Users, ShoppingBag, Bell, Search, Package } from "lucide-react";
import axios from "axios";
import cookies from "js-cookie";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // ============================================
  // state للإشعارات
  // ============================================
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New order received", time: "2 min ago", read: false },
    { id: 2, text: "New user registered", time: "10 min ago", read: false },
    { id: 3, text: "Product stock low", time: "1 hour ago", read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ============================================
  // بيانات المستخدم - نجيبها من localStorage أيضاً
  // عشان تشتغل في production
  // ============================================
  const userName = cookies.get("userName") || localStorage.getItem("userName") || "Admin";
  const userAvatar = cookies.get("userAvatar") || localStorage.getItem("userAvatar") || "";

  // عدد الإشعارات غير المقروءة
  const unreadCount = notifications.filter(n => !n.read).length;

  // ============================================
  // CHECK ADMIN - التحقق من صلاحية الأدمن
  // ============================================
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get(
          "https://first-project-e-commerce-backend-production.up.railway.app/api/v1/users/user-profile",
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
  // دالة البحث - تنقل لصفحة المنتجات بالبحث
  // ============================================
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/admin-dashboard/view-all-products?search=${searchQuery}`);
      setSearchQuery("");
    }
  };

  // ============================================
  // دالة تعليم الإشعارات كمقروءة
  // ============================================
  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const menuItems = [
    { title: "Dashboard", path: "/admin-dashboard", icon: <LayoutDashboard size={18} /> },
    { title: "Add Product", path: "/admin-dashboard/add-product", icon: <PlusCircle size={18} /> },
    { title: "All Products", path: "/admin-dashboard/view-all-products", icon: <Package size={18} /> },
    { title: "View All Users", path: "/admin-dashboard/view-all-users", icon: <Users size={18} /> },
    { title: "All Orders", path: "/admin-dashboard/view-all-orders", icon: <ShoppingBag size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#0f172a]">

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static z-50 top-0 left-0 h-screen w-64 bg-[#1e293b] border-r border-slate-700/50 text-white transition-transform duration-300 shadow-2xl
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>

        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700/50">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo2.png" alt="Logo" className="h-8 w-auto object-contain" />
            <h1 className="text-lg font-bold text-[#D4AF37]">Admin</h1>
          </Link>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

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

        {/* ============================================
            Admin Card - نعرض الصورة الحقيقية
            لو ما فيه صورة نعرض الحرف الأول من الاسم
        ============================================ */}
        <div className="absolute bottom-5 left-3 right-3">
          <div className="bg-[#0f172a] border border-slate-700/50 rounded-xl p-3 flex items-center gap-3">
            {userAvatar ? (
              <img src={userAvatar} alt="admin" className="w-10 h-10 rounded-full border-2 border-[#0ea5e9] object-cover" />
            ) : (
              // لو ما فيه صورة، نعرض الحرف الأول من الاسم
              <div className="w-10 h-10 rounded-full border-2 border-[#0ea5e9] bg-[#0ea5e9]/20 flex items-center justify-center">
                <span className="text-[#38bdf8] font-bold text-lg">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
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

            {/* ============================================
                Search - البحث يشتغل بضغط Enter
            ============================================ */}
            <div className="hidden md:flex items-center bg-[#0f172a] border border-slate-700/50 px-3 py-2 rounded-xl focus-within:border-[#0ea5e9] transition-all">
              <Search size={16} className="text-slate-500" />
              <input
                type="text"
                placeholder="Search... (Enter)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="bg-transparent outline-none px-2 text-white placeholder-slate-500 text-sm w-48"
              />
            </div>

            {/* ============================================
                Notifications - قائمة الإشعارات
            ============================================ */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative bg-[#0f172a] border border-slate-700/50 p-2 rounded-xl hover:bg-[#0ea5e9]/20 hover:border-[#0ea5e9]/50 transition-all"
              >
                <Bell size={18} className="text-slate-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* قائمة الإشعارات */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-72 bg-[#1e293b] border border-slate-700/50 rounded-xl shadow-2xl z-50">
                  <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
                    <h3 className="text-white font-bold text-sm">Notifications</h3>
                    <button onClick={markAllRead} className="text-[#38bdf8] text-xs hover:text-[#0ea5e9]">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-3 border-b border-slate-700/30 flex items-start gap-3 ${!n.read ? "bg-[#0ea5e9]/5" : ""}`}>
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!n.read ? "bg-[#0ea5e9]" : "bg-slate-600"}`} />
                        <div>
                          <p className="text-white text-xs">{n.text}</p>
                          <p className="text-slate-500 text-xs mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ============================================
                Profile - صورة الأدمن الحقيقية
            ============================================ */}
            <div className="flex items-center gap-2">
              {userAvatar ? (
                <img src={userAvatar} alt="profile" className="w-9 h-9 rounded-full border-2 border-[#0ea5e9] object-cover" />
              ) : (
                <div className="w-9 h-9 rounded-full border-2 border-[#0ea5e9] bg-[#0ea5e9]/20 flex items-center justify-center">
                  <span className="text-[#38bdf8] font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <span className="text-white text-sm font-medium hidden md:block">{userName}</span>
            </div>

          </div>
        </div>

        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;