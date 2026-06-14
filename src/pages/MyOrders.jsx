// ============================================
// MyOrders.jsx - صفحة طلباتي
// ============================================

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Package, ShoppingBag } from "lucide-react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================================
  // جلب طلبات المستخدم من الباك اند
  // ============================================
  useEffect(() => {
    const getMyOrders = async () => {
      try {
        const response = await axios.get(
          "https://first-project-e-commerce-backend-production.up.railway.app/api/v1/orders/my-order",
          { withCredentials: true }
        );
        setOrders(response.data.orders || []);
      } catch (error) {
        console.log(error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    getMyOrders();
  }, []);

  // ============================================
  // شاشة التحميل
  // ============================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#0ea5e9] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ============================================
  // لو ما فيه طلبات
  // ============================================
  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-[#1e293b] rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-700/50">
            <Package size={40} className="text-slate-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">No Orders Yet</h1>
          <p className="text-slate-400 mb-6">You haven't placed any orders yet.</p>
          <Link to="/products"
            className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-6 py-3 rounded-xl font-semibold transition-all inline-flex items-center gap-2">
            <ShoppingBag size={18} />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Package className="text-[#0ea5e9]" />
            My Orders
          </h1>
          <p className="text-slate-400 mt-2">{orders.length} orders found</p>
        </div>

        {/* قائمة الطلبات */}
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={index}
              className="bg-[#1e293b] rounded-2xl border border-slate-700/50 p-6 hover:border-[#0ea5e9]/30 transition-all">

              {/* Header الطلب */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-slate-400 text-xs">Order ID</p>
                  <p className="text-white font-mono text-sm">{order._id}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-xs">Date</p>
                  <p className="text-white text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* المنتجات */}
              <div className="space-y-3 mb-4">
                {order.orderItems?.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#0f172a] rounded-xl p-3">
                    <img
                      src={item.image || "https://via.placeholder.com/60"}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg border border-slate-700/50"
                    />
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{item.name}</p>
                      <p className="text-slate-400 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-[#38bdf8] font-bold">${item.price}</p>
                  </div>
                ))}
              </div>

              {/* Footer الطلب */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                {/* حالة الطلب */}
                <span className={`px-3 py-1 rounded-full text-xs font-bold
                  ${order.orderStatus === "Delivered"
                    ? "bg-green-500/15 text-green-400 border border-green-500/30"
                    : order.orderStatus === "Processing"
                    ? "bg-[#0ea5e9]/15 text-[#38bdf8] border border-[#0ea5e9]/30"
                    : order.orderStatus === "Shipped"
                    ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30"
                    : "bg-slate-500/15 text-slate-400 border border-slate-500/30"
                  }`}>
                  {order.orderStatus || "Processing"}
                </span>

                {/* المجموع */}
                <div className="text-right">
                  <p className="text-slate-400 text-xs">Total</p>
                  <p className="text-[#D4AF37] font-bold text-lg">${order.totalPrice?.toFixed(2)}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MyOrders;