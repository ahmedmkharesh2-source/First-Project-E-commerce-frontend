// ============================================
// ResetPassword.jsx - إعادة تعيين كلمة المرور
// التصميم: Dark Theme بنفس أسلوب Home.jsx و Profile.jsx
// ============================================

import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
    // ============================================
    // token: من URL (reset-password/:token)
    // useParams: يجيب المعاملات من الـ Route
    // ============================================
    const { token } = useParams();

    // ============================================
    // State - حالات الصفحة
    // ============================================
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // navigate: للانتقال بين الصفحات
    const navigate = useNavigate();

    // ============================================
    // دالة إعادة التعيين
    // ============================================
    const handleResetPassword = (e) => {
        // منع تحديث الصفحة
        e.preventDefault();

        // ============================================
        // التحقق: كلمة المرور = التأكيد
        // ============================================
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        // ============================================
        // التحقق: طول كلمة المرور
        // ============================================
        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }

        // ============================================
        // إرسال الطلب
        // ============================================
        const resetPassword = async () => {
            setIsLoading(true);

            try {
                const formData = { password, confirmPassword };

                const response = await axios.put(
                    `https://first-project-e-commerce-backend-production.up.railway.app/api/v1/users/reset-password/${token}`,
                    formData
                );

                console.log("Password reset successfully");
                toast.success(response.data.message);

                // الانتقال لصفحة تسجيل الدخول بعد نجاح
                setTimeout(() => {
                    navigate("/login");
                }, 1500);

            } catch (error) {
                console.log("❌ خطأ:", error);
                toast.error(
                    error.response?.data?.message || "Something went wrong"
                );
            } finally {
                setIsLoading(false);
            }
        };

        resetPassword();
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

                    {/* أيقونة القفل */}
                    <div className="w-14 h-14 bg-[#0ea5e9]/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-7 h-7 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        Reset Password
                    </h1>
                    <p className="text-slate-400 mt-2">
                        Enter your new password
                    </p>
                </div>

                {/* ============================================ */}
                {/* FORM - النموذج */}
                {/* ============================================ */}
                <form onSubmit={handleResetPassword} className="space-y-5">

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-[#38bdf8] mb-1">
                            New Password
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 bg-[#0f172a] border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all"
                                required
                                minLength={6}
                            />
                        </div>
                        <p className="text-slate-500 text-xs mt-1">
                            At least 6 characters
                        </p>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-[#38bdf8] mb-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
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
                                <span>Resetting...</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
                                <span>Reset Password</span>
                            </>
                        )}
                    </button>

                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-slate-500 text-sm">
                        Remember your password?{" "}
                        <button
                            onClick={() => navigate("/login")}
                            className="text-[#38bdf8] hover:text-white transition-colors font-medium"
                        >
                            Login here
                        </button>
                    </p>
                </div>

            </div>

        </div>
    );
};

export default ResetPassword;