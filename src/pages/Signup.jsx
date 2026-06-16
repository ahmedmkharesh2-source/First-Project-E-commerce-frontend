// ============================================
// Signup.jsx - إنشاء حساب
// ألوان: داكن + أزرق فاتح + ذهبي
// ============================================

import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [avatarBase64, setAvatarBase64] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarPreview(reader.result);
            setAvatarBase64(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        // التحقق من الاسم
        if (name.trim().length < 3) {
            toast.error("Name must be at least 3 characters");
            return;
        }

        // التحقق من البريد
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email");
            return;
        }

        // التحقق من كلمة المرور
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        // التحقق من الصورة
        if (!avatarBase64) {
            toast.error("Please select a profile picture");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                "https://first-project-e-commerce-backend-production.up.railway.app/api/v1/users/register-user",
                { name, email, password, avatar: avatarBase64 }
            );

            const { token, user } = response.data;
            
            // حفظ في الكوكيز
            Cookies.set("token", token, { expires: 7 });
            Cookies.set("userName", user?.name || name, { expires: 7 });
            Cookies.set("userAvatar", user?.avatar || avatarBase64, { expires: 7 });

            toast.success("Account created successfully! 🎉");
            
            if (user?.role === "admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4 py-8">
            <div className="w-full max-w-md bg-[#1e293b] border border-slate-700/50 shadow-2xl shadow-black/40 rounded-2xl p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <img src="/images/logo.png" alt="Logo" className="h-16 w-auto object-contain" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Create Account</h1>
                    <p className="text-slate-400 mt-2">Sign up to get started</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-5">

                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#0ea5e9] bg-[#0f172a] shadow-lg shadow-[#0ea5e9]/20">
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-500">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <label className="cursor-pointer text-sm text-[#38bdf8] hover:text-[#0ea5e9] transition-colors flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Choose Profile Picture
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-[#38bdf8] mb-1">Full Name</label>
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your full name"
                                className="w-full bg-[#0f172a] border border-slate-600 text-white placeholder-slate-500 pl-10 pr-4 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-[#38bdf8] mb-1">Email Address</label>
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full bg-[#0f172a] border border-slate-600 text-white placeholder-slate-500 pl-10 pr-4 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-[#38bdf8] mb-1">Password</label>
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-[#0f172a] border border-slate-600 text-white placeholder-slate-500 pl-10 pr-4 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold py-3 rounded-xl shadow-lg shadow-[#0ea5e9]/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Creating account...
                            </span>
                        ) : (
                            "Create Account →"
                        )}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-slate-500 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#38bdf8] font-medium hover:text-[#0ea5e9] transition-colors">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;