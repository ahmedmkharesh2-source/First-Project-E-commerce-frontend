// ============================================
// Profile.jsx - صفحة الملف الشخصي
// التصميم: Dark Theme بنفس أسلوب Home.jsx
// ============================================

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {

    // ============================================
    // State (حالات الصفحة)
    // ============================================
    
    // user: يخزن بيانات المستخدم اللي جاية من السيرفر
    // null = لسه ما جت البيانات
    const [user, setUser] = useState(null);

    // loading: يخبرنا هل البيانات قاعدة تجي ولا لا
    // true = نعرض spinner (دائرة التحميل)
    // false = نعرض البيانات
    const [loading, setLoading] = useState(true);

    // navigate: دالة من react-router تستخدم للانتقال بين الصفحات
    // مثلاً: لو المستخدم مو مسجل دخول نوديه لصفحة login
    const navigate = useNavigate();

    // ============================================
    // دالة جلب بيانات المستخدم
    // ============================================
    // ليش async؟ لأن axios.get ياخذ وقت (طلب للسيرفر)
    // async/await تخلي الكود ينتظر الجواب بدون ما يعلق الصفحة
    const getUserProfile = async () => {

        try {
            // ============================================
            // axios.get: نرسل طلب GET للسيرفر
            // withCredentials: true = نرسل الكوكيز (JWT token)
            // ليش؟ لأن السيرفر يحتاج التوكن عشان يعرف منو المستخدم
            // ============================================
            const response = await axios.get(
                "https://first-project-e-commerce-backend-production.up.railway.app/api/v1/users/user-profile",
                {
                    withCredentials: true
                }
            );

            // ============================================
            // response.data.user: البيانات اللي رجعت من السيرفر
            // setUser: نحفظها في state عشان نستخدمها في التصميم
            // ============================================
            setUser(response.data.user);

        } catch (error) {
            // ============================================
            // catch: لو صار خطأ (مثلاً التوكن منتهي)
            // console.log: نطبع الخطأ في console للتصحيح
            // navigate("/login"): نودي المستخدم لصفحة تسجيل الدخول
            // ============================================
            console.log("خطأ في جلب البيانات:", error);
            navigate("/login");

        } finally {
            // ============================================
            // finally: يشتغل سواء نجح أو فشل
            // نوقف الـ loading عشان نعرض الصفحة
            // ============================================
            setLoading(false);
        }
    };

    // ============================================
    // useEffect: يشتغل مرة واحدة لما الصفحة تفتح
    // [] = array فارغ = يشتغل مرة واحدة فقط
    // ============================================
    useEffect(() => {
        getUserProfile();
    }, []);

    // ============================================
    // LOADING SCREEN - شاشة التحميل
    // ============================================
    // ليش نسويها؟ عشان ما يشوف المستخدم صفحة فاضية لين تجي البيانات
    if (loading) {
        return (
            // ============================================
            // min-h-screen: ارتفاع كامل الشاشة
            // bg-[#0f172a]: لون خلفية داكن (نفس Home.jsx)
            // flex items-center justify-center: توسيط محتوى
            // ============================================
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
                
                <div className="flex flex-col items-center gap-4">
                    
                    {/* ============================================ */}
                    {/* animate-spin: دائرة تدور */}
                    {/* border-t-transparent: الجزء العلوي شفاف = يعطي شكل الدوران */}
                    {/* ============================================ */}
                    <div className="w-12 h-12 border-4 border-[#0ea5e9] border-t-transparent rounded-full animate-spin"></div>
                    
                    {/* ============================================ */}
                    {/* animate-pulse: نص يتلاشى ويظهر (تأثير حيوي) */}
                    {/* ============================================ */}
                    <p className="text-slate-400 text-sm animate-pulse">
                        Loading profile...
                    </p>
                    
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
        // text-white: لون النص أبيض (لأن الخلفية داكنة)
        // ============================================
        <div className="min-h-screen bg-[#0f172a] text-white">
            
            {/* ============================================ */}
            {/* HEADER SECTION - الشريط العلوي */}
            {/* ============================================ */}
            {/* bg-[#1e293b]: لون أغمق شوي من الخلفية (تباين طبقي) */}
            {/* border-b: خط سفلي */}
            {/* border-slate-700/50: لون رمادي شفاف 50% */}
            <div className="bg-[#1e293b] border-b border-slate-700/50">
                <div className="max-w-5xl mx-auto px-4 py-8">
                    
                    {/* ============================================ */}
                    {/* flex items-center gap-3: عناصر جنب بعض مع مسافة */}
                    {/* ============================================ */}
                    <div className="flex items-center gap-3 mb-2">
                        
                        {/* ============================================ */}
                        {/* الأيقونة: دائرة خلفية + أيقونة شخص */}
                        {/* bg-[#0ea5e9]/15: لون سماوي شفاف 15% */}
                        {/* rounded-xl: زوايا دائرية */}
                        {/* ============================================ */}
                        <div className="w-10 h-10 bg-[#0ea5e9]/15 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                        
                        {/* ============================================ */}
                        {/* النصوص */}
                        {/* ============================================ */}
                        <div>
                            <h1 className="text-2xl font-bold text-white">My Profile</h1>
                            <p className="text-slate-400 text-sm">Manage your account settings</p>
                        </div>
                        
                    </div>
                </div>
            </div>

            {/* ============================================ */}
            {/* CONTAINER - حاوية المحتوى */}
            {/* max-w-5xl: أقصى عرض 1024px (متجاوب) */}
            {/* mx-auto: توسيط أفقي */}
            {/* px-4: padding يمين ويسار */}
            {/* py-8: padding فوق وتحت */}
            {/* ============================================ */}
            <div className="max-w-5xl mx-auto px-4 py-8">
                
                {/* ============================================ */}
                {/* PROFILE CARD - بطاقة الملف الشخصي */}
                {/* overflow-hidden: يخفي أي محتوى يطلع برا البطاقة */}
                {/* ============================================ */}
                <div className="bg-[#1e293b] rounded-2xl border border-slate-700/50 overflow-hidden">
                    
                    {/* ============================================ */}
                    {/* COVER BANNER - الغلاف العلوي */}
                    {/* ============================================ */}
                    {/* h-32: ارتفاع 128px */}
                    {/* bg-gradient-to-r: تدرج لوني من اليسار لليمين */}
                    {/* from-[#0ea5e9]/20: يبدأ بسماوي شفاف */}
                    {/* via-[#1e293b]: يمر بلون الخلفية */}
                    {/* to-[#0ea5e9]/10: ينتهي بسماوي خفيف */}
                    <div className="h-32 bg-gradient-to-r from-[#0ea5e9]/20 via-[#1e293b] to-[#0ea5e9]/10 relative">
                        
                        {/* ============================================ */}
                        {/* SVG Pattern: نمط زخرفي خفيف */}
                        {/* opacity-30: شفافية 30% */}
                        {/* ============================================ */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-30"></div>
                    </div>

                    {/* ============================================ */}
                    {/* CONTENT AREA - منطقة المحتوى */}
                    {/* px-6: padding أفقي */}
                    {/* pb-6: padding سفلي */}
                    {/* -mt-16: margin سالب = تقدم للأعلى (فوق البانر) */}
                    {/* relative: عشان z-index يشتغل */}
                    {/* ============================================ */}
                    <div className="px-6 pb-6 -mt-16 relative">
                        
                        {/* ============================================ */}
                        {/* FLEX ROW: صورة + معلومات + أزرار */}
                        {/* flex-col: عمودي في الموبايل */}
                        {/* md:flex-row: أفقي في التابلت والديسكتوب */}
                        {/* gap-6: مسافة بين العناصر */}
                        {/* items-start: محاذاة للأعلى */}
                        {/* ============================================ */}
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            
                            {/* ============================================ */}
                            {/* AVATAR SECTION - الصورة الشخصية */}
                            {/* ============================================ */}
                            {/* relative: عشان نحط النقطة الخضراء فوقها */}
                            {/* group: عشان hover يشتغل على الأبناء */}
                            <div className="relative group">
                                
                                {/* ============================================ */}
                                {/* الصورة */}
                                {/* w-32 h-32: 128×128px */}
                                {/* rounded-2xl: زوايا دائرية */}
                                {/* border-4: حدود سميكة */}
                                {/* overflow-hidden: يقص الصورة */}
                                {/* shadow-xl: ظل كبير */}
                                {/* ============================================ */}
                                <div className="w-32 h-32 rounded-2xl border-4 border-[#1e293b] overflow-hidden shadow-xl shadow-black/20 bg-[#0f172a]">
                                    <img
                                        src={user?.profile?.url || "https://via.placeholder.com/150"}
                                        alt="Profile"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                
                                {/* ============================================ */}
                                {/* ONLINE STATUS - النقطة الخضراء */}
                                {/* absolute: موقع مطلق فوق الصورة */}
                                {/* -bottom-1 -right-1: سالب = برا الصورة شوي */}
                                {/* bg-emerald-500: أخضر */}
                                {/* border-4: حدود بيضاء عشان تبان */}
                                {/* ============================================ */}
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-[#1e293b] rounded-full"></div>
                            </div>

                            {/* ============================================ */}
                            {/* NAME & ROLE - الاسم والصلاحية */}
                            {/* flex-1: ياخذ المساحة المتبقية */}
                            {/* pt-4: padding فوقي */}
                            {/* md:pt-16: padding أكبر في الشاشات الكبيرة */}
                            {/* ============================================ */}
                            <div className="flex-1 pt-4 md:pt-16">
                                
                                {/* ============================================ */}
                                {/* flex-col md:flex-row: الاسم والتاج */}
                                {/* items-center: توسيط عمودي */}
                                {/* gap-3: مسافة */}
                                {/* ============================================ */}
                                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                                    
                                    {/* ============================================ */}
                                    {/* الاسم */}
                                    {/* text-2xl: حجم كبير */}
                                    {/* font-bold: عريض */}
                                    {/* ============================================ */}
                                    <h2 className="text-2xl font-bold text-white">
                                        {user?.name || "User Name"}
                                    </h2>
                                    
                                    {/* ============================================ */}
                                    {/* ROLE BADGE - تاج الصلاحية */}
                                    {/* ============================================ */}
                                    {/* شرط: لو أدمن = أزرق، لو عادي = أخضر */}
                                    {/* inline-flex: flex داخل سطر */}
                                    {/* items-center: توسيط عمودي */}
                                    {/* px-3 py-1: padding داخلي */}
                                    {/* rounded-full: دائرة كاملة */}
                                    {/* text-xs: حجم صغير */}
                                    {/* ============================================ */}
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                                        user?.role === 'admin' 
                                            ? 'bg-[#0ea5e9]/15 text-[#38bdf8] border-[#0ea5e9]/30' 
                                            : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                                    }`}>
                                        
                                        {/* ============================================ */}
                                        {/* شرط: أيقونة مختلفة حسب الدور */}
                                        {/* ============================================ */}
                                        {user?.role === 'admin' ? (
                                            <>
                                                {/* أيقونة صح للأدمن */}
                                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                                </svg>
                                                Admin
                                            </>
                                        ) : (
                                            <>
                                                {/* أيقونة شخص للعميل */}
                                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                                </svg>
                                                Customer
                                            </>
                                        )}
                                    </span>
                                </div>
                                
                                {/* ============================================ */}
                                {/* الإيميل */}
                                {/* mt-1: margin فوقي بسيط */}
                                {/* ============================================ */}
                                <p className="text-slate-400 mt-1">{user?.email}</p>
                            </div>

                            {/* ============================================ */}
                            {/* QUICK ACTIONS - الأزرار السريعة */}
                            {/* pt-4: padding فوقي */}
                            {/* md:pt-14: padding أكبر في الشاشات الكبيرة */}
                            {/* gap-2: مسافة بين الأزرار */}
                            {/* ============================================ */}
                            <div className="flex gap-2 pt-4 md:pt-14">
                                
                                {/* ============================================ */}
                                {/* زر تعديل البروفايل - PRIMARY */}
                                {/* ============================================ */}
                                {/* Link: من react-router = رابط بدون تحديث الصفحة */}
                                <Link to="/update-profile">
                                    
                                    {/* ============================================ */}
                                    {/* bg-[#0ea5e9]: لون سماوي */}
                                    {/* hover:bg-[#0284c7]: يغمق لما نمر الماوس */}
                                    {/* hover:shadow-lg: ظل لما نمر */}
                                    {/* hover:shadow-[#0ea5e9]/25: ظل سماوي شفاف */}
                                    {/* hover:-translate-y-0.5: يرتفع شوي لما نمر */}
                                    {/* transition-all: كل التأثيرات تكون سلسة */}
                                    {/* duration-300: مدة 300ms */}
                                    {/* ============================================ */}
                                    <button className="flex items-center gap-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#0ea5e9]/25 hover:-translate-y-0.5">
                                        
                                        {/* أيقونة قلم */}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                        </svg>
                                        Edit Profile
                                    </button>
                                </Link>

                                {/* ============================================ */}
                                {/* زر تغيير الباسورد - SECONDARY */}
                                {/* ============================================ */}
                                {/* bg-[#1e293b]: نفس لون البطاقة */}
                                {/* border: حدود */}
                                {/* hover:text-white: يبيض لما نمر */}
                                <Link to="/update-password">
                                    <button className="flex items-center gap-2 bg-[#1e293b] hover:bg-slate-700 text-slate-300 border border-slate-600 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:text-white hover:border-slate-500">
                                        
                                        {/* أيقونة قفل */}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                        </svg>
                                        Password
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* ============================================ */}
                        {/* DIVIDER - خط فاصل */}
                        {/* h-px: ارتفاع 1px */}
                        {/* bg-slate-700/50: رمادي شفاف */}
                        {/* my-6: margin فوق وتحت */}
                        {/* ============================================ */}
                        <div className="h-px bg-slate-700/50 my-6"></div>

                        {/* ============================================ */}
                        {/* INFO GRID - شبكة المعلومات */}
                        {/* grid: شبكة */}
                        {/* grid-cols-1: عمود واحد في الموبايل */}
                        {/* md:grid-cols-2: عمودين في الشاشات الكبيرة */}
                        {/* gap-6: مسافة بين البطاقات */}
                        {/* ============================================ */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* ============================================ */}
                            {/* INFO CARD - بطاقة المعلومات الشخصية */}
                            {/* ============================================ */}
                            {/* hover:border-[#0ea5e9]/30: يضيء الحدود لما نمر */}
                            <div className="bg-[#0f172a] rounded-xl border border-slate-700/50 p-5 hover:border-[#0ea5e9]/30 transition-all duration-300 group">
                                
                                {/* ============================================ */}
                                {/* HEADER: أيقونة + عنوان */}
                                {/* ============================================ */}
                                <div className="flex items-center gap-3 mb-4">
                                    
                                    {/* bg-[#0ea5e9]/10: خلفية سماوي خفيف */}
                                    {/* group-hover: يتغير لما نمر على البطاقة كلها */}
                                    <div className="w-10 h-10 bg-[#0ea5e9]/10 rounded-lg flex items-center justify-center group-hover:bg-[#0ea5e9]/20 transition-colors">
                                        <svg className="w-5 h-5 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                    </div>
                                    
                                    <h3 className="font-semibold text-white">Personal Info</h3>
                                </div>

                                {/* ============================================ */}
                                {/* DATA ROWS - صفوف البيانات */}
                                {/* space-y-3: مسافة بين الصفوف */}
                                {/* ============================================ */}
                                <div className="space-y-3">
                                    
                                    {/* ============================================ */}
                                    {/* ROW: الاسم */}
                                    {/* flex justify-between: عنصرين على الأطراف */}
                                    {/* items-center: توسيط عمودي */}
                                    {/* py-2: padding فوق وتحت */}
                                    {/* border-b: خط سفلي */}
                                    {/* ============================================ */}
                                    <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                                        <span className="text-slate-500 text-sm">Full Name</span>
                                        <span className="text-white font-medium">{user?.name}</span>
                                    </div>

                                    {/* ROW: الإيميل */}
                                    <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                                        <span className="text-slate-500 text-sm">Email Address</span>
                                        <span className="text-white font-medium">{user?.email}</span>
                                    </div>

                                    {/* ROW: نوع الحساب */}
                                    {/* border-b لا يوجد = آخر عنصر بدون خط */}
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-slate-500 text-sm">Account Type</span>
                                        <span className="text-[#38bdf8] font-medium capitalize">{user?.role}</span>
                                    </div>
                                </div>
                            </div>

                            {/* ============================================ */}
                            {/* ACTIVITY CARD - بطاقة النشاط */}
                            {/* ============================================ */}
                            <div className="bg-[#0f172a] rounded-xl border border-slate-700/50 p-5 hover:border-[#0ea5e9]/30 transition-all duration-300 group">
                                
                                <div className="flex items-center gap-3 mb-4">
                                    {/* bg-emerald-500/10: خلفية خضراء خفيفة */}
                                    <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-white">Activity</h3>
                                </div>

                                {/* ============================================ */}
                                {/* STATS GRID - شبكة الإحصائيات */}
                                {/* grid-cols-2: عمودين */}
                                {/* gap-4: مسافة */}
                                {/* ============================================ */}
                                <div className="grid grid-cols-2 gap-4">
                                    
                                    {/* ============================================ */}
                                    {/* STAT BOX - صندوق إحصائي */}
                                    {/* text-center: توسيط النص */}
                                    {/* border: حدود خفيفة */}
                                    {/* ============================================ */}
                                    <div className="bg-[#1e293b] rounded-lg p-4 text-center border border-slate-700/30">
                                        {/* text-2xl: حجم كبير */}
                                        {/* font-bold: عريض */}
                                        {/* text-white: أبيض */}
                                        <div className="text-2xl font-bold text-white mb-1">0</div>
                                        {/* text-xs: صغير */}
                                        {/* text-slate-500: رمادي */}
                                        <div className="text-slate-500 text-xs">Orders</div>
                                    </div>

                                    <div className="bg-[#1e293b] rounded-lg p-4 text-center border border-slate-700/30">
                                        <div className="text-2xl font-bold text-[#38bdf8] mb-1">0</div>
                                        <div className="text-slate-500 text-xs">Wishlist</div>
                                    </div>

                                    <div className="bg-[#1e293b] rounded-lg p-4 text-center border border-slate-700/30">
                                        <div className="text-2xl font-bold text-emerald-400 mb-1">Active</div>
                                        <div className="text-slate-500 text-xs">Status</div>
                                    </div>

                                    <div className="bg-[#1e293b] rounded-lg p-4 text-center border border-slate-700/30">
                                        <div className="text-2xl font-bold text-purple-400 mb-1">New</div>
                                        <div className="text-slate-500 text-xs">Member</div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* ============================================ */}
                        {/* SECURITY SECTION - قسم الأمان */}
                        {/* mt-6: margin فوقي */}
                        {/* ============================================ */}
                        <div className="mt-6 bg-[#0f172a] rounded-xl border border-slate-700/50 p-5 hover:border-[#0ea5e9]/30 transition-all duration-300">
                            
                            {/* ============================================ */}
                            {/* flex justify-between: عنصرين على الأطراف */}
                            {/* items-center: توسيط عمودي */}
                            {/* ============================================ */}
                            <div className="flex items-center justify-between">
                                
                                {/* الجهة اليسرى: أيقونة + نص */}
                                <div className="flex items-center gap-3">
                                    {/* bg-amber-500/10: خلفية برتقالية خفيفة */}
                                    <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">Security</h3>
                                        <p className="text-slate-500 text-sm">Update your password regularly</p>
                                    </div>
                                </div>

                                {/* الجهة اليمنى: رابط */}
                                <Link to="/update-password">
                                    {/* text-[#38bdf8]: سماوي */}
                                    {/* hover:text-white: يبيض لما نمر */}
                                    {/* flex items-center: أيقونة + نص */}
                                    <button className="text-[#38bdf8] hover:text-white text-sm font-medium transition-colors flex items-center gap-1">
                                        Change Password
                                        {/* أيقونة سهم */}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ============================================ */}
                {/* LOGOUT BUTTON - زر تسجيل الخروج */}
                {/* mt-6: margin فوقي */}
                {/* flex justify-center: توسيط أفقي */}
                {/* ============================================ */}
                <div className="mt-6 flex justify-center">
                    
                    {/* ============================================ */}
                    {/* text-red-400: أحمر فاتح */}
                    {/* hover:text-red-300: يفتح لما نمر */}
                    {/* hover:bg-red-500/10: خلفية حمراء شفافة لما نمر */}
                    {/* hover:border-red-500/30: حدود حمراء لما نمر */}
                    {/* transition-all: سلس */}
                    <button 
                        onClick={() => {
                            // ============================================
                            // TODO: أضف دالة تسجيل الخروج هنا
                            // مثال: localStorage.removeItem("token")
                            // أو: axios.post("/logout")
                            // ============================================
                            navigate("/login");
                        }}
                        className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 px-6 py-3 rounded-xl transition-all duration-300 border border-transparent hover:border-red-500/30"
                    >
                        {/* أيقونة خروج */}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        Sign Out
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Profile;