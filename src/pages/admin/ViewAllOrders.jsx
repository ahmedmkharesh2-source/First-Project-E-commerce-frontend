// ============================================
// ViewAllOrders.jsx - مُصلح
// أضفنا DollarSign في الـ import
// ============================================

import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig.js";
import { Package, Truck, CheckCircle, Clock, DollarSign } from "lucide-react";  // ← أضفنا DollarSign هنا

const ViewAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await axiosInstance.get("/orders/all-orders");
        if (response.data.orders && Array.isArray(response.data.orders)) {
          setOrders(response.data.orders.filter((o) => o.orderStatus !== "Delivered"));
        } else {
          setOrders([]);
        }
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load orders");
        setOrders([]);
      }
    };
    getAllOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setLoadingId(orderId);
    try {
      await axiosInstance.put(`/orders/update-order-status/${orderId}`, { status: newStatus });
      if (newStatus === "Delivered") {
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to update");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">All Orders</h1>
            <p className="text-slate-400 mt-1">Manage customer orders</p>
          </div>
          <div className="bg-[#1e293b] border border-slate-700/50 text-[#38bdf8] px-4 py-2 rounded-xl font-semibold">
            Total: {orders.length}
          </div>
        </div>

        {/* Orders */}
        <div className="grid gap-6">
          {orders?.map((order) => (
            <div key={order._id} className="bg-[#1e293b] rounded-2xl shadow-xl overflow-hidden border border-slate-700/50">

              {/* Top Section */}
              <div className="bg-[#0f172a] border-b border-slate-700/50 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                
                <div>
                  <h2 className="font-bold text-lg text-white">Order ID</h2>
                  <p className="text-sm text-slate-400 font-mono">{order._id}</p>
                </div>

                <div className="flex gap-3 flex-wrap items-center">
                  {/* Payment Status */}
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold
                    ${order.paymentInfo?.status === "succeeded" ? "bg-[#0ea5e9]/20 text-[#0ea5e9] border border-[#0ea5e9]/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
                    {order.paymentInfo?.status === "succeeded" ? "✓ Paid" : "✗ Unpaid"}
                  </span>

                  {/* Status Select */}
                  <select value={order.orderStatus} disabled={loadingId === order._id}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="bg-[#0f172a] text-white border border-slate-600 rounded-xl px-3 py-2 text-sm focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 disabled:opacity-50 cursor-pointer outline-none">
                    <option value="Processing">⏳ Processing</option>
                    <option value="Shipped">🚚 Shipped</option>
                    <option value="Delivered">✓ Delivered</option>
                  </select>

                  {loadingId === order._id && (
                    <span className="text-sm text-[#38bdf8] animate-pulse">Updating...</span>
                  )}
                </div>
              </div>

              {/* Main Content */}
              <div className="p-6 grid md:grid-cols-3 gap-8">

                {/* Products */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                    <Package size={18} className="text-[#0ea5e9]" />
                    Products
                  </h3>
                  <div className="space-y-4">
                    {order.orderItems?.map((item) => (
                      <div key={item._id} className="flex items-center gap-4 bg-[#0f172a] rounded-xl p-3 border border-slate-700/50">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                        <div>
                          <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                          <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                          <p className="font-bold text-[#D4AF37]">${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                    <Truck size={18} className="text-[#0ea5e9]" />
                    Shipping Info
                  </h3>
                  <div className="space-y-3 text-slate-400 text-sm">
                    <p><span className="text-white font-medium">Address:</span> {order.shippingInfo?.address}</p>
                    <p><span className="text-white font-medium">City:</span> {order.shippingInfo?.city}</p>
                    <p><span className="text-white font-medium">Country:</span> {order.shippingInfo?.country}</p>
                    <p><span className="text-white font-medium">Zip:</span> {order.shippingInfo?.zipCode}</p>
                    <p><span className="text-white font-medium">Phone:</span> {order.shippingInfo?.mobileNo}</p>
                  </div>
                </div>

                {/* Pricing */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                    <DollarSign size={18} className="text-[#D4AF37]" />
                    Pricing
                  </h3>
                  <div className="space-y-3 bg-[#0f172a] rounded-xl p-4 border border-slate-700/50">
                    <div className="flex justify-between text-slate-400 text-sm">
                      <span>Tax</span>
                      <span>${order.taxPrice}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-sm">
                      <span>Shipping</span>
                      <span>${order.shippingCost}</span>
                    </div>
                    <div className="border-t border-slate-700/50 pt-3 flex justify-between text-lg font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-[#D4AF37]">${order.totalPrice}</span>
                    </div>
                    <p className="text-xs text-slate-500 pt-2">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Empty */}
        {orders.length === 0 && (
          <div className="bg-[#1e293b] rounded-2xl border border-slate-700/50 p-10 text-center mt-6">
            <CheckCircle size={48} className="text-[#0ea5e9] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white">No Active Orders</h2>
            <p className="text-slate-400 mt-2">All orders have been delivered!</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ViewAllOrders;