// استيراد axios لإرسال الطلبات إلى الـ backend
import axios from "axios";

// استيراد React وبعض الـ Hooks المهمة
import React, { useState, useEffect } from "react";

// استيراد useNavigate للتنقل بين الصفحات
import { useNavigate } from "react-router-dom";

// استيراد toast لإظهار رسائل النجاح والخطأ
import { toast } from "react-toastify";


// إنشاء الكمبوننت
const Updateforfile = () => {

    // useState لتخزين الاسم داخل state
    // name = القيمة الحالية
    // setName = لتغيير القيمة
    const [name, setName] = useState("");

    // useState لتخزين الإيميل داخل state
    const [email, setEmail] = useState("");

    // useNavigate يسمح لنا بالتنقل بين الصفحات
    const navigate = useNavigate();


    // =========================================
    // دالة جلب بيانات المستخدم من الـ backend
    // =========================================
    const getUserProfile = async () => {

        try {

            // إرسال طلب GET لجلب بيانات المستخدم
            const response = await axios.get(
                "http://localhost:8000/api/v1/users/user-profile",

                // withCredentials يسمح بإرسال الكوكيز والتوكن
                {
                    withCredentials: true
                }
            );

            // أخذ بيانات المستخدم من response
            const userData = response.data.user;

            // تعبئة input الاسم بالاسم الموجود في قاعدة البيانات
            setName(userData.name || "");

            // تعبئة input الإيميل بالإيميل الموجود في قاعدة البيانات
            setEmail(userData.email || "");

        } catch (error) {

            // طباعة الخطأ في console إذا فشل الطلب
            console.log(error);

        }
    };


    // =========================================
    // دالة تعديل بيانات المستخدم
    // =========================================
    const updateProfile = async (e) => {

        // منع تحديث الصفحة تلقائيًا عند submit
        e.preventDefault();

        try {

            // إنشاء object يحتوي البيانات الجديدة
            const formData = {
                name,
                email
            };

            // إرسال طلب PUT لتعديل البيانات
            const response = await axios.put(

                // رابط الـ API
                "http://localhost:8000/api/v1/users/update-profile",

                // البيانات التي سيتم إرسالها
                formData,

                // إرسال الكوكيز مع الطلب
                {
                    withCredentials: true
                }
            );

            // طباعة رسالة نجاح في console
            console.log("profile updated successfully");

            // إظهار رسالة نجاح للمستخدم
            toast.success("Profile Updated Successfully");

            // بعد نجاح التعديل ينقلك لصفحة البروفايل
            navigate("/profile");

        } catch (error) {

            // طباعة الخطأ في console
            console.log(error);

            // إظهار رسالة الخطأ القادمة من السيرفر
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }
    };


    // =========================================
    // useEffect يعمل عند تحميل الصفحة أول مرة
    // =========================================
    useEffect(() => {

        // تشغيل دالة جلب بيانات المستخدم
        getUserProfile();

    }, []);
    // [] معناها يشتغل مرة واحدة فقط


    // =========================================
    // JSX الخاص بالواجهة
    // =========================================
    return (

        // div رئيسي يغطي كامل الشاشة
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">

            {/* البوكس الأبيض */}
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

                {/* عنوان الصفحة */}
                <div className="text-center mb-8">

                    {/* عنوان كبير */}
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome Back
                    </h1>

                    {/* وصف صغير */}
                    <p className="text-gray-500 mt-2">
                        Update Your Profile
                    </p>

                </div>


                {/* الفورم */}
                <form
                    // عند الضغط على submit يتم تشغيل updateProfile
                    onSubmit={updateProfile}

                    // مسافات بين العناصر
                    className="space-y-5"
                >

                    {/* حقل الاسم */}
                    <div>

                        {/* عنوان الحقل */}
                        <label className="block text-sm font-medium text-blue-600 mb-1">
                            User Name
                        </label>

                        <input
                            // نوع الحقل
                            type="text"

                            // القيمة الحالية
                            value={name}

                            // عند الكتابة يتم تحديث state
                            onChange={(e) => setName(e.target.value)}

                            // النص داخل الحقل
                            placeholder="Your name"

                            // تنسيقات Tailwind
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 text-blue-600 transition"

                            // الحقل مطلوب
                            required
                        />

                    </div>


                    {/* حقل الإيميل */}
                    <div>

                        <label className="block text-sm font-medium text-blue-600 mb-1">
                            Email
                        </label>

                        <input

                            // نوع الحقل إيميل
                            type="email"

                            // القيمة الحالية
                            value={email}

                            // تحديث state عند الكتابة
                            onChange={(e) => setEmail(e.target.value)}

                            // placeholder
                            placeholder="example@gmail.com"

                            // تنسيقات Tailwind
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 text-blue-600 transition"

                            // الحقل مطلوب
                            required
                        />

                    </div>


                    {/* زر التعديل */}
                    <button

                        // عند الضغط يرسل الفورم
                        type="submit"

                        // تنسيقات Tailwind
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
                    >

                        Update Profile

                    </button>

                </form>

            </div>

        </div>
    );
};


// تصدير الكمبوننت لاستخدامه في صفحات أخرى
export default Updateforfile;