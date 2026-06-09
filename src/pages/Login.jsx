import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const formData = { email, password }
    const handleLogin = (e) => {
        e.preventDefault();
        const loginUser = async () => {
            try {
                const response = await axios.post("http://localhost:8000/api/v1/users/login-user", formData);
                console.log("logged in successfully");
                const token = response.data.token
                Cookies.set("token", token, {
                    expires : 7
                })
                toast.success("User logged in successfully, تم تسجيل الدخول بنجاح")
                navigate("/")
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }

        loginUser()
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">

            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
                    <p className="text-gray-500 mt-2">Login to your account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-blue-600 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:text-blue-600 transition"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-blue-600 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:text-blue-600 transition"
                            required
                        />
                    </div>

                    {/* Forgot Password */}
                    <div className="flex justify-end">
                        <Link to = "/forget-password" className="text-sm text-blue-600 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
                    >
                        Login
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-600 font-medium hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;