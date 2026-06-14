// ============================================
// UpdateProfile.jsx - تعديل الملف الشخصي + الصورة
// التصميم: Dark Theme بنفس أسلوب Home.jsx و Profile.jsx
// ============================================

// استيراد axios لإرسال الطلبات للـ backend
import axios from "axios";

// استيراد React والـ Hooks
import React, { useState, useEffect, useRef } from "react";

// useNavigate للانتقال بين الصفحات
import { useNavigate } from "react-router-dom";

// toast لرسائل النجاح والخطأ
import { toast } from "react-toastify";


const UpdateProfile = () => {

    // ============================================
    // State - حالات الصفحة
    // ============================================
    
    // name: يخزن الاسم الجديد
    const [name, setName] = useState("");

    // email: يخزن الإيميل الجديد
    const [email, setEmail] = useState("");

    // avatar: الملف الجديد (File object من input)
    const [avatar, setAvatar] = useState(null);

    // avatarPreview: رابط المعاينة (Base64 أو من السيرفر)
    const [avatarPreview, setAvatarPreview] = useState("");

    // loading: هل البيانات قاعدة تجي؟
    const [loading, setLoading] = useState(true);

    // isUpdating: هل قاعدين نرسل التعديل؟
    const [isUpdating, setIsUpdating] = useState(false);

    // navigate: دالة الانتقال بين الصفحات
    const navigate = useNavigate();
    
    // ============================================
    // useRef: مرجع لعنصر input file (hidden)
    // ليش؟ لأننا نبغى نضغط على div بدل input القبيح
    // ============================================
    const fileInputRef = useRef(null);


    // ============================================
    // دالة جلب البيانات الحالية
    // ============================================
    const getUserProfile = async () => {

        try {
            // ============================================
            // axios.get: طلب GET للسيرفر
            // withCredentials: true = نرسل الكوكيز (JWT token)
            // ============================================
            const response = await axios.get(
                "http://localhost:8000/api/v1/users/user-profile",
                { withCredentials: true }
            );

            // ============================================
            // response.data.user: البيانات من السيرفر
            // ============================================
            const userData = response.data.user;
            
            // نحط الاسم والإيميل في input
            setName(userData.name || "");
            setEmail(userData.email || "");

            // ============================================
            // لو عنده صورة، نحطها في المعاينة
            // userData.profile?.url: صورة من Cloudinary
            // ============================================
            if (userData.profile?.url) {
                setAvatarPreview(userData.profile.url);
            }

        } catch (error) {
            console.log("❌ خطأ في جلب البيانات:", error);
            toast.error("Please login first");
            navigate("/login");

        } finally {
            // ============================================
            // finally: يشتغل سواء نجح أو فشل
            // نوقف الـ loading
            // ============================================
            setLoading(false);
        }
    };


    // ============================================
    // دالة اختيار الصورة
    // ============================================
    const handleAvatarChange = (e) => {
        
        // ============================================
        // e.target.files: ملفات المستخدم اختارها
        // [0]: أول ملف (نختار صورة واحدة)
        // ============================================
        const file = e.target.files[0];
        
        if (file) {
            // ============================================
            // setAvatar: نحفظ الملف عشان نرسله للسيرفر
            // ============================================
            setAvatar(file);

            // ============================================
            // FileReader: نقرأ الملف ونعرضه (معاينة)
            // readAsDataURL: يحول الملف لـ Base64 URL
            // ============================================
            const reader = new FileReader();
            
            reader.onload = () => {
                // ============================================
                // reader.result: رابط Base64 للصورة
                // نعرضها فوراً قبل ما نرسل للسيرفر
                // ============================================
                setAvatarPreview(reader.result);
            };
            
            reader.readAsDataURL(file);
        }
    };


    // ============================================
    // دالة تعديل البيانات + الصورة
    // ============================================
    const updateProfile = async (e) => {

        // ============================================
        // e.preventDefault(): يمنع الصفحة من التحديث
        // HTML form يرسل البيانات ويحدث الصفحة
        // نبغاها SPA (Single Page Application)
        // ============================================
        e.preventDefault();

        // ============================================
        // التحقق من البيانات قبل الإرسال
        // ============================================
        if (!name.trim() || !email.trim()) {
            toast.error("Please fill all fields");
            return;
        }

        // ============================================
        // isUpdating = true: نعطل الزر
        // عشان المستخدم ما يضغط مرتين
        // ============================================
        setIsUpdating(true);

        try {
            // ============================================
            // FormData: نرسل بيانات mix (نص + ملف)
            // JSON ما يدعم الملفات
            // FormData تدعم multipart/form-data
            // ============================================
            const formData = new FormData();
            
            // ============================================
            // append: نضيف بيانات للـ FormData
            // "name": المفتاح اللي السيرفر يتوقعه
            // ============================================
            formData.append("name", name.trim());
            formData.append("email", email.trim());

            // ============================================
            // لو المستخدم اختار صورة جديدة
            // "avatar": اسم الحقل لازم يطابق upload.single("avatar")
            // avatar: File object من input
            // ============================================
            if (avatar) {
                formData.append("avatar", avatar);
            }

            // ============================================
            // ✅ الصحيح: لا تضف headers يدوياً!
            // axios يضيف Content-Type تلقائياً مع boundary
            // boundary = فاصل بين البيانات في FormData
            // لو حددته يدوياً بدون boundary = السيرفر ما يفهم الملف
            // ============================================
            const response = await axios.put(
                "http://localhost:8000/api/v1/users/update-profile",
                formData,
                {
                    withCredentials: true
                    // ❌ لا تضف: headers: { "Content-Type": "multipart/form-data" }
                }
            );

            // ============================================
            // نتحقق من نجاح العملية
            // ============================================
            if (response.data.success) {
                toast.success("Profile Updated Successfully! 🎉");
                
                // ============================================
                // navigate: نوديه لصفحة البروفايل
                // replace: true = ما يخلي history
                // ============================================
                navigate("/profile", { replace: true });
            }

        } catch (error) {
            console.log("❌ خطأ في التعديل:", error);
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );

        } finally {
            // ============================================
            // نرجع الزر للوضع الطبيعي
            // ============================================
            setIsUpdating(false);
        }
    };


    // ============================================
    // useEffect: يشتغل مرة واحدة لما الصفحة تفتح
    // ============================================
    useEffect(() => {
        getUserProfile();
    }, []);
    // [] = array فارغ = يشتغل مرة واحدة فقط


    // ============================================
    // LOADING SCREEN - شاشة التحميل
    // ============================================
    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    {/* spinner */}
                    <div className="w-12 h-12 border-4 border-[#0ea5e9] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 text-sm animate-pulse">Loading your data...</p>
                </div>
            </div>
        );
    }


    // ============================================
    // MAIN CONTENT - المحتوى الرئيسي
    // ============================================
    return (
        // ============================================
        // min-h-screen: ارتفاع كامل الشاشة
        // bg-[#0f172a]: خلفية داكنة (نفس Home.jsx)
        // flex items-center justify-center: توسيط عمودي وأفقي
        // px-4: padding يمين ويسار (للموبايل)
        // py-8: padding فوق وتحت
        // ============================================
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4 py-8">

            {/* ============================================ */}
            {/* CARD - البطاقة الرئيسية */}
            {/* ============================================ */}
            <div className="w-full max-w-md bg-[#1e293b] border border-slate-700/50 rounded-2xl p-8 shadow-2xl shadow-black/20">

                {/* Header */}
                <div className="text-center mb-8">
                    
                    {/* أيقونة */}
                    <div className="w-14 h-14 bg-[#0ea5e9]/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-7 h-7 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold text-white">Edit Profile</h1>
                    <p className="text-slate-400 mt-2">Update your info & photo</p>
                </div>

                {/* ============================================ */}
                {/* FORM - النموذج */}
                {/* ============================================ */}
                <form onSubmit={updateProfile} className="space-y-6">

                    {/* ============================================ */}
                    {/* AVATAR UPLOAD - رفع الصورة */}
                    {/* ============================================ */}
                    <div className="flex flex-col items-center gap-3">

                        {/* ============================================ */}
                        {/* PREVIEW - معاينة الصورة */}
                        {/* onClick: لما نضغط نفتح اختيار الملف */}
                        {/* ============================================ */}
                        <div 
                            className="relative group cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {/* ============================================ */}
                            {/* الصورة */}
                            {/* w-28 h-28: 112×112px */}
                            {/* rounded-2xl: زوايا دائرية */}
                            {/* border-4: حدود سميكة */}
                            {/* object-cover: تقطع الصورة بشكل مرتب */}
                            {/* ============================================ */}
                            <img
                                src={avatarPreview || "https://via.placeholder.com/150"}
                                alt="Avatar Preview"
                                className="w-28 h-28 rounded-2xl border-4 border-[#1e293b] object-cover shadow-lg"
                            />

                            {/* ============================================ */}
                            {/* OVERLAY - طبقة التغطية لما نمر الماوس */}
                            {/* ============================================ */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>

                            {/* ============================================ */}
                            {/* BADGE - شارة "تغيير" */}
                            {/* ============================================ */}
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#0ea5e9] text-white text-xs px-3 py-1 rounded-full shadow-lg font-medium">
                                Change
                            </div>
                        </div>

                        {/* ============================================ */}
                        {/* HIDDEN INPUT - حقل الملف المخفي */}
                        {/* type="file": يسمح باختيار ملف */}
                        {/* accept="image/*": فقط صور */}
                        {/* hidden: مخفي (نضغط على الصورة بدله) */}
                        {/* ref={fileInputRef}: ربطه بـ useRef */}
                        {/* onChange: لما نختار ملف */}
                        {/* ============================================ */}
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                        />

                        {/* نص توضيحي */}
                        <p className="text-slate-500 text-xs">
                            Click image to upload new photo
                        </p>

                    </div>

                    {/* ============================================ */}
                    {/* NAME FIELD - حقل الاسم */}
                    {/* ============================================ */}
                    <div>
                        <label className="block text-sm font-medium text-[#38bdf8] mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="w-full px-4 py-3 bg-[#0f172a] border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all"
                            required
                        />
                    </div>

                    {/* ============================================ */}
                    {/* EMAIL FIELD - حقل الإيميل */}
                    {/* ============================================ */}
                    <div>
                        <label className="block text-sm font-medium text-[#38bdf8] mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 bg-[#0f172a] border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all"
                            required
                        />
                    </div>

                    {/* ============================================ */}
                    {/* BUTTONS - الأزرار */}
                    {/* ============================================ */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">

                        {/* ============================================ */}
                        {/* SUBMIT BUTTON - زر الحفظ */}
                        {/* ============================================ */}
                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="flex-1 flex items-center justify-center gap-2 bg-[#0ea5e9] hover:bg-[#0284c7] disabled:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#0ea5e9]/25 hover:-translate-y-0.5"
                        >
                            {isUpdating ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Updating...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Save Changes</span>
                                </>
                            )}
                        </button>

                        {/* ============================================ */}
                        {/* CANCEL BUTTON - زر الإلغاء */}
                        {/* ============================================ */}
                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
                            className="flex-1 flex items-center justify-center gap-2 bg-[#1e293b] hover:bg-slate-700 text-slate-300 border border-slate-600 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:border-slate-500"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            Cancel
                        </button>

                    </div>

                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-slate-500 text-sm">
                    <p>Your data is securely stored</p>
                </div>

            </div>

        </div>
    );
};


// تصدير الكمبوننت
export default UpdateProfile;