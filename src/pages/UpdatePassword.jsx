import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdatePassword = () => {

    // تخزين كلمة المرور القديمة
    const [oldPassword, setOldPassword] = useState("");

    // تخزين كلمة المرور الجديدة
    const [newPassword, setNewPassword] = useState("");

    // تخزين تأكيد كلمة المرور الجديدة
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    // للتنقل بين الصفحات
    const navigate = useNavigate();

    // البيانات التي سيتم إرسالها للسيرفر
    const formData = {
        oldPassword,
        newPassword,
        confirmNewPassword
    };



    // =========================================
    // UPDATE PASSWORD FUNCTION
    // =========================================
    const handleUpdatePassword = (e) => {

        // منع تحديث الصفحة
        e.preventDefault();



        // التأكد أن كلمة المرور الجديدة مطابقة للتأكيد
        if (newPassword !== confirmNewPassword) {

            return toast.error("Passwords do not match");

        }



        // دالة تحديث كلمة المرور
        const updatePassword = async () => {

            try {

                // إرسال طلب تعديل كلمة المرور
                const response = await axios.put(
                    "http://localhost:8000/api/v1/users/update-password",
                    formData,
                    {
                        // مهم جدًا لإرسال الكوكيز والتوكن
                        withCredentials: true
                    }
                );



                // إظهار رسالة نجاح
                toast.success(response.data.message);



                // ننتظر نصف ثانية حتى يتم حفظ التوكن الجديد
                setTimeout(() => {

                    // الانتقال إلى صفحة البروفايل
                    navigate("/profile");

                }, 500);



            } catch (error) {

                // إظهار رسالة الخطأ القادمة من السيرفر
                toast.error(
                    error.response?.data?.message
                );

            }
        };



        // تشغيل الدالة
        updatePassword();
    };



    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">

            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

                {/* HEADER */}
                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Update Password
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Change your account password
                    </p>

                </div>



                {/* FORM */}
                <form
                    onSubmit={handleUpdatePassword}
                    className="space-y-5"
                >

                    {/* OLD PASSWORD */}
                    <div>

                        <label className="block text-sm font-medium text-blue-600 mb-1">

                            Old Password

                        </label>

                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) =>
                                setOldPassword(e.target.value)
                            }
                            placeholder="Enter old password"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:text-blue-600 transition"
                            required
                        />

                    </div>



                    {/* NEW PASSWORD */}
                    <div>

                        <label className="block text-sm font-medium text-blue-600 mb-1">

                            New Password

                        </label>

                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                            placeholder="Enter new password"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:text-blue-600 transition"
                            required
                        />

                    </div>



                    {/* CONFIRM PASSWORD */}
                    <div>

                        <label className="block text-sm font-medium text-blue-600 mb-1">

                            Confirm New Password

                        </label>

                        <input
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) =>
                                setConfirmNewPassword(e.target.value)
                            }
                            placeholder="Confirm new password"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:text-blue-600 transition"
                            required
                        />

                    </div>



                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
                    >

                        Update Password

                    </button>

                </form>

            </div>

        </div>
    );
};

export default UpdatePassword;