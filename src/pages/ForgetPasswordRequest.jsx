// ============================================
// ForgetPasswordRequest.jsx - طلب إعادة تعيين كلمة المرور
// التصميم: Dark Theme بنفس أسلوب Home.jsx و Profile.jsx
// ============================================

import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgetPasswordRequest = () => {
    // ============================================
    // State - حالات الصفحة
    // ============================================
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // ============================================
    // دالة طلب إعادة التعيين
    // ============================================
    const handleForgetPassword = (e) => {
        // منع تحديث الصفحة
        e.preventDefault();

        // ============================================
        // التحقق: صيغة الإيميل
        // ============================================
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return toast.error("Please enter a valid email address");
        }

        const forgetPassword = async () => {
            setIsLoading(true);

            try {
                const formData = { email };

                const response = await axios.post(
                    "http://localhost:8000/api/v1/users/reset-password-request",
                    formData
                );

                console.log("Reset password request sent");
                toast.success(response.data.message);

                // ============================================
                // ننتظر شوي ثم ننتقل لصفحة تسجيل الدخول
                // ============================================
                setTimeout(() => {
                    navigate("/login");
                }, 2000);

            } catch (error) {
                console.log("❌ خطأ:", error);
                toast.error(
                    error.response?.data?.message || "Something went wrong"
                );
            } finally {
                setIsLoading(false);
            }
        };

        forgetPassword();
    };

    // ============================================
    // MAIN CONTENT
    // ============================================
    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4 py-8">

            {/* ============================================ */}
            {/* CARD - البطاقة الرئيسية */}
            {/* ============================================ */}
            <div className="w-full max-w-md bg-[#1e293b] border border-slate-700/50 rounded-2xl p-8 shadow-2xl shadow-black/20">

                {/* Header */}
                <div className="text-center mb-8">

                    {/* أيقونة البريد */}
                    <div className="w-14 h-14 bg-[#0ea5e9]/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-7 h-7 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        Forgot Password?
                    </h1>
                    <p className="text-slate-400 mt-2">
                        Enter your email to receive reset link
                    </p>
                </div>

                {/* ============================================ */}
                {/* FORM - النموذج */}
                {/* ============================================ */}
                <form onSubmit={handleForgetPassword} className="space-y-5">

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-[#38bdf8] mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            {/* أيقونة */}
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                                </svg>
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full pl-10 pr-4 py-3 bg-[#0f172a] border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 bg-[#0ea5e9] hover:bg-[#0284c7] disabled:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#0ea5e9]/25 hover:-translate-y-0.5"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Sending...</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                                <span>Send Reset Link</span>
                            </>
                        )}
                    </button>

                </form>

                {/* Footer */}
                <div className="mt-6 text-center space-y-3">
                    <p className="text-slate-500 text-sm">
                        Remember your password?{" "}
                        <button
                            onClick={() => navigate("/login")}
                            className="text-[#38bdf8] hover:text-white transition-colors font-medium"
                        >
                            Login here
                        </button>
                    </p>
                    
                    {/* خط فاصل */}
                    <div className="h-px bg-slate-700/50"></div>
                    
                    <p className="text-slate-500 text-sm">
                        Don't have an account?{" "}
                        <button
                            onClick={() => navigate("/register")}
                            className="text-[#38bdf8] hover:text-white transition-colors font-medium"
                        >
                            Sign up
                        </button>
                    </p>
                </div>

            </div>

        </div>
    );
};

export default ForgetPasswordRequest;