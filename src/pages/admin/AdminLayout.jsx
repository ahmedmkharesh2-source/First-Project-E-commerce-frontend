import React, { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Menu,
  X,
  LayoutDashboard,
  PlusCircle,
  Users,
  ShoppingBag,
  Bell,
  Search,
} from "lucide-react";

import axios from "axios";
import { Package } from "lucide-react";

const AdminDashboard = () => {

  // فتح وإغلاق السايد بار في الجوال
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // التنقل بين الصفحات
  const navigate = useNavigate();

  // معرفة الصفحة الحالية
  const location = useLocation();

  // ==========================
  // CHECK ADMIN
  // ==========================
  useEffect(() => {

    const checkAdmin = async () => {

      try {

        const response = await axios.get(
          "http://localhost:8000/api/v1/users/user-profile",
          {
            withCredentials: true,
          }
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



  // ==========================
  // SIDEBAR LINKS
  // ==========================
  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin-dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      title: "Add Product",
      path: "/admin-dashboard/add-product",
      icon: <PlusCircle size={18} />,
    },
    {
      title: "View All Users",
      path: "/admin-dashboard/view-all-users",
      icon: <Users size={18} />,
    },
    {
      title: "All Orders",
      path: "/admin-dashboard/view-all-orders",
      icon: <ShoppingBag size={18} />,
    },
  {
  title: "All Products",
  path: "/admin-dashboard/view-all-products",
  icon: <Package size={18} />,
},
  ];



  return (  
    <div className="flex min-h-screen bg-gray-100">

      {/* Overlay للجوال */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static z-50 top-0 left-0 h-screen w-64 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white transition-transform duration-300 shadow-2xl
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >

        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">

          <h1 className="text-lg font-bold">
            Admin
            <span className="text-cyan-400">
              Panel
            </span>
          </h1>

          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X />
          </button>

        </div>



        {/* Menu */}
        <div className="mt-6 px-3">

          <p className="text-gray-400 text-xs uppercase mb-4">
            Main Menu
          </p>

          <div className="space-y-2">

            {menuItems.map((item) => (

              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition

                ${
                  location.pathname === item.path
                    ? "bg-cyan-500"
                    : "hover:bg-gray-800"
                }`}
              >

                {item.icon}

                <span>{item.title}</span>

              </Link>

            ))}

          </div>
        </div>



        {/* Admin Card */}
        <div className="absolute bottom-5 left-3 right-3">

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 flex items-center gap-3">

            <img
              src="https://i.pravatar.cc/100"
              alt="admin"
              className="w-10 h-10 rounded-full border border-cyan-400"
            />

            <div>

              <h3 className="text-sm font-semibold">
                Admin
              </h3>

              <p className="text-xs text-gray-400">
                Control Panel
              </p>

            </div>

          </div>

        </div>

      </div>



      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu />
            </button>

            <h2 className="text-xl font-bold text-gray-800">
              Admin Dashboard
            </h2>

          </div>

          <div className="flex items-center gap-4">

            <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-xl">

              <Search size={16} className="text-gray-500" />

              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none px-2"
              />

            </div>

            <button className="relative bg-gray-100 p-2 rounded-xl hover:bg-gray-200">

              <Bell size={18} />

              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>

            </button>

            <img
              src="https://i.pravatar.cc/150"
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-cyan-500"
            />

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