import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import { toast } from "react-toastify";

const ForgetPasswordRequest = () => {
    const [email, setEmail] = useState("");

    const navigate = useNavigate()

    const formData = { email }
    const handleForgetPassword = (e) => {
        e.preventDefault();
        const forgetPassword = async () => {
            try {
                const response = await axios.post("http://localhost:8000/api/v1/users/reset-password-request", formData);
                console.log("logged in successfully");
               
                toast.success(response.data.message)
                navigate("/")
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }

        forgetPassword()
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">

            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
                    <p className="text-gray-500 mt-2">Enter your email to reset password</p>
                </div>

                {/* Form */}
                <form onSubmit={handleForgetPassword} className="space-y-5">

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
                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPasswordRequest