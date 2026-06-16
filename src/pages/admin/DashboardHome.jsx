// ============================================
// DashboardHome.jsx - الصفحة الرئيسية للأدمن
// ألوان: داكن + أزرق فاتح + ذهبي
// ============================================

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Users, Package, ShoppingCart, DollarSign, Pencil, Trash2 } from "lucide-react";

const DashboardHome = () => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, total: 0 });
  const navigate = useNavigate();

  const { users: totalUsers, products: totalProducts, orders: totalOrders, total: totalRevenue } = stats;

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await axios.get("https://first-project-e-commerce-backend-production.up.railway.app/api/v1/products/get-all-products");
        setProducts(response.data.products);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };

    const getCombineData = async () => {
      try {
        const response = await axios.get("https://first-project-e-commerce-backend-production.up.railway.app/api/v1/users/combin-data", { withCredentials: true });
        setStats(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };

    getAllProducts();
    getCombineData();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://first-project-e-commerce-backend-production.up.railway.app/api/v1/products/delete-product/${id}`, { withCredentials: true });
      setProducts(products.filter((item) => item._id !== id));
      toast.success("Product Deleted Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div>

      {/* عنوان الصفحة */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-slate-400 mt-2">Welcome back, Admin 👋</p>
      </div>

      {/* الكروت العلوية */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* PRODUCTS */}
        <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700/50 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Products</p>
              <h1 className="text-4xl text-white font-bold mt-2">{totalProducts}</h1>
            </div>
            <div className="bg-[#0ea5e9]/15 p-4 rounded-2xl">
              <Package className="text-[#0ea5e9]" size={24} />
            </div>
          </div>
        </div>

        {/* USERS */}
        <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700/50 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Users</p>
              <h1 className="text-4xl text-white font-bold mt-2">{totalUsers}</h1>
            </div>
            <div className="bg-purple-500/15 p-4 rounded-2xl">
              <Users className="text-purple-400" size={24} />
            </div>
          </div>
        </div>

        {/* REVENUE */}
        <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700/50 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Revenue</p>
              <h1 className="text-4xl font-bold mt-2 text-[#D4AF37]">${totalRevenue}</h1>
            </div>
            <div className="bg-[#D4AF37]/15 p-4 rounded-2xl">
              <DollarSign className="text-[#D4AF37]" size={24} />
            </div>
          </div>
        </div>

        {/* ORDERS */}
        <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700/50 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Orders</p>
              <h1 className="text-4xl font-bold mt-2 text-[#38bdf8]">{totalOrders}</h1>
            </div>
            <div className="bg-[#38bdf8]/15 p-4 rounded-2xl">
              <ShoppingCart className="text-[#38bdf8]" size={24} />
            </div>
          </div>
        </div>

      </div>

      {/* جدول المنتجات */}
      <div className="bg-[#1e293b] rounded-2xl shadow-lg mt-10 overflow-hidden border border-slate-700/50">

        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-bold text-white">Recent Products</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">

            <thead className="bg-[#0f172a] text-white">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Product</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Category</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Price</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Stock</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item) => (
                <tr key={item._id} className="border-b border-slate-700/50 hover:bg-[#0f172a]/50 transition">
                  
                  <td className="px-6 py-4 font-medium text-white">{item.title}</td>
                  <td className="px-6 py-4 text-slate-400">{item.category}</td>
                  <td className="px-6 py-4 text-[#38bdf8] font-semibold">${item.price}</td>
                  <td className="px-6 py-4 text-slate-400">{item.stock}</td>
                  
                  <td className="px-6 py-4">
                    <span className="bg-[#06402B]/30 text-[#10b981] px-3 py-1 rounded-full text-xs font-medium border border-[#06402B]/30">
                      Active
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => navigate(`/admin-dashboard/update-product/${item._id}`)}
                        className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white p-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-[#0ea5e9]/25">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => deleteProduct(item._id)}
                        className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white p-2.5 rounded-xl transition-all border border-red-500/30 hover:border-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
};

export default DashboardHome;