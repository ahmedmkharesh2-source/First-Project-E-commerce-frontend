// ============================================
// Settings.jsx - صفحة الإعدادات
// ============================================

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";

const Settings = () => {
  const navigate = useNavigate();

  // بيانات المستخدم الحالي
  const userName = cookies.get("userName") || localStorage.getItem("userName") || "User";
  const userRole = cookies.get("userRole") || localStorage.getItem("userRole") || "user";

  // ============================================
  // دالة حذف الحساب
  // ============================================
  const handleDeleteAccount = async () => {
    const confirm1 = window.confirm("⚠️ Are you sure you want to delete your account?");
    if (!confirm1) return;
    const confirm2 = window.confirm("🚨 This action is permanent and cannot be undone!");
    if (!confirm2) return;

    try {
      await axios.delete("first-project-e-commerce-backend-production.up.railway.app/api/v1/users/delete-profile", {
        withCredentials: true
      });

      // مسح كل البيانات
      cookies.remove("token");
      cookies.remove("userName");
      cookies.remove("userAvatar");
      cookies.remove("userRole");
      localStorage.clear();

      toast.success("Account deleted successfully");
      navigate("/signup");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete account");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">⚙️ Settings</h1>
          <p className="text-slate-400 mt-2">Manage your account preferences</p>
        </div>

        {/* ============================================ */}
        {/* بطاقة: معلومات الحساب */}
        {/* ============================================ */}
        <div className="bg-[#1e293b] rounded-2xl border border-slate-700/50 p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#0ea5e9] rounded-full"></span>
            Account Info
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
              <span className="text-slate-400 text-sm">Username</span>
              <span className="text-white font-medium">{userName}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
              <span className="text-slate-400 text-sm">Role</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold
                ${userRole === "admin"
                  ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30"
                  : "bg-[#0ea5e9]/15 text-[#38bdf8] border border-[#0ea5e9]/30"
                }`}>
                {userRole === "admin" ? "👑 Admin" : "👤 User"}
              </span>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* بطاقة: إجراءات الحساب */}
        {/* ============================================ */}
        <div className="bg-[#1e293b] rounded-2xl border border-slate-700/50 p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#0ea5e9] rounded-full"></span>
            Account Actions
          </h2>
          <div className="space-y-3">

            {/* تعديل الملف الشخصي */}
            <Link to="/update-profile"
              className="flex items-center justify-between p-4 bg-[#0f172a] rounded-xl border border-slate-700/50 hover:border-[#0ea5e9]/50 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0ea5e9]/15 rounded-xl flex items-center justify-center">
                  <span className="text-lg">✏️</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Edit Profile</p>
                  <p className="text-slate-500 text-xs">Update your name, email and photo</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-slate-500 group-hover:text-[#38bdf8] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* تغيير كلمة المرور */}
            <Link to="/update-password"
              className="flex items-center justify-between p-4 bg-[#0f172a] rounded-xl border border-slate-700/50 hover:border-[#0ea5e9]/50 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0ea5e9]/15 rounded-xl flex items-center justify-center">
                  <span className="text-lg">🔐</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Change Password</p>
                  <p className="text-slate-500 text-xs">Update your account password</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-slate-500 group-hover:text-[#38bdf8] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* My Orders */}
            <Link to="/my-orders"
              className="flex items-center justify-between p-4 bg-[#0f172a] rounded-xl border border-slate-700/50 hover:border-[#0ea5e9]/50 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0ea5e9]/15 rounded-xl flex items-center justify-center">
                  <span className="text-lg">📦</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">My Orders</p>
                  <p className="text-slate-500 text-xs">View your order history</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-slate-500 group-hover:text-[#38bdf8] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

          </div>
        </div>

        {/* ============================================ */}
        {/* بطاقة: خطر - حذف الحساب */}
        {/* ============================================ */}
        <div className="bg-[#1e293b] rounded-2xl border border-red-500/30 p-6">
          <h2 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-red-500 rounded-full"></span>
            Danger Zone
          </h2>
          <div className="flex items-center justify-between p-4 bg-red-500/5 rounded-xl border border-red-500/20">
            <div>
              <p className="text-white font-medium text-sm">Delete Account</p>
              <p className="text-slate-500 text-xs mt-1">Permanently delete your account and all data</p>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
            >
              Delete
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;