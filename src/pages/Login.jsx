import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    
    // ============================================
    // من أين جاء المستخدم؟
    // لو جاء من صفحة محمية، نرجعه لها بعد الدخول
    // ============================================
    const from = location.state?.from || "/";

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // ============================================
            // إرسال بيانات تسجيل الدخول للباك اند
            // ============================================
            const response = await axios.post(
                "https://first-project-e-commerce-backend-production.up.railway.app/api/v1/users/login-user",
                { email, password },
                { withCredentials: true }
            );

            const { token, user } = response.data;

            // ============================================
            // التحقق من وجود الـ token
            // ============================================
            if (!token) {
                toast.error("Login failed: No token received from server");
                setLoading(false);
                return;
            }

            // ============================================
            // حفظ في الكوكيز مع إعدادات production
            // sameSite: "None" + secure: true
            // مهم جداً عشان الكوكيز تشتغل بين
            // Vercel و Railway (دومينات مختلفة)
            // ============================================
            Cookies.set("token", token, { expires: 7, path: "/", sameSite: "None", secure: true });
            Cookies.set("userName", user?.name || user?.username || "User", { expires: 7, path: "/", sameSite: "None", secure: true });
            Cookies.set("userAvatar", user?.avatar || "", { expires: 7, path: "/", sameSite: "None", secure: true });
            Cookies.set("userRole", user?.role || "user", { expires: 7, path: "/", sameSite: "None", secure: true });

            // ============================================
            // حفظ في localStorage أيضاً كاحتياطي
            // لأن ProtectedRoute يعتمد على localStorage
            // ============================================
            localStorage.setItem("token", token);
            localStorage.setItem("userName", user?.name || "User");
            localStorage.setItem("userRole", user?.role || "user");

            toast.success("Welcome back! تم تسجيل الدخول بنجاح");

            // ============================================
            // تحميل سلة المستخدم بعد تسجيل الدخول
            // ============================================
            if (onLogin) onLogin();

            // ============================================
            // تأخير بسيط 100ms عشان يضمن
            // حفظ البيانات في localStorage قبل التوجيه
            // بدونه: ProtectedRoute يتحقق قبل الحفظ
            // ============================================
            setTimeout(() => {
                if (user?.role === "admin") {
                    navigate("/admin-dashboard", { replace: true });
                    
                } else {
                    navigate(from === "/login" ? "/" : from, { replace: true });
                }
            }, 100);

        } catch (error) {
            console.log("Login Error:", error);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
            <div className="w-full max-w-md bg-[#1e293b] border border-slate-700/50 shadow-2xl shadow-black/40 rounded-2xl p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <img src="/images/logo.png" alt="Logo" className="h-16 w-auto object-contain" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                    <p className="text-slate-400 mt-2">Login to your account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-[#38bdf8] mb-1">
                            Email Address
                        </label>
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
                        <label className="block text-sm font-medium text-[#38bdf8] mb-1">
                            Password
                        </label>
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

                    {/* Forgot Password */}
                    <div className="flex justify-end">
                        <Link to="/forget-password" className="text-sm text-[#38bdf8] hover:text-[#0ea5e9] transition-colors">
                            Forgot password?
                        </Link>
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
                                Logging in...
                            </span>
                        ) : (
                            "Login →"
                        )}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-slate-500 mt-6">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-[#38bdf8] font-medium hover:text-[#0ea5e9] transition-colors">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;