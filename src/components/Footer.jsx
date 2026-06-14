// ============================================
// Footer.jsx - تذييل احترافي للمتجر
// ألوان: داكن + أزرق فاتح + ذهبي (للشعار فقط)
// ============================================

import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        // الخلفية الداكنة - نفس باقي الصفحات
        <footer className="bg-[#0f172a] border-t border-slate-700/50">

            {/* ============================================ */}
            {/* القسم الرئيسي - 4 أعمدة */}
            {/* ============================================ */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* --- العمود 1: الشعار والوصف --- */}
                    <div className="space-y-4">
                        {/* الشعار الذهبي */}
                        <Link to="/" className="flex items-center gap-2">
                            <img 
                                src="/images/logo2.png" 
                                alt="Store Logo" 
                                className="h-12 w-auto object-contain"
                            />
                            <span className="text-[#D4AF37] font-bold text-xl tracking-wide">
                                STORE
                            </span>
                        </Link>
                        
                        {/* الوصف */}
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Your premium destination for quality products. 
                            Fast delivery, secure payments, and exceptional customer service.
                        </p>

                        {/* أيقونات التواصل الاجتماعي */}
                        <div className="flex gap-3 pt-2">
                            {/* Twitter/X */}
                            <a href="#" target="_blank" className="w-10 h-10 bg-[#1e293b] hover:bg-[#0ea5e9] rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 border border-slate-700/50 hover:border-[#0ea5e9]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </a>
                            
                            {/* YouTube */}
                            <a href="https://studio.youtube.com/channel/UC_1YUWcT4DIGAHQWvqmPELA" target="_blank" className="w-10 h-10 bg-[#1e293b] hover:bg-red-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 border border-slate-700/50 hover:border-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                </svg>
                            </a>
                            
                            {/* Facebook */}
                            <a href="#" target="_blank" className="w-10 h-10 bg-[#1e293b] hover:bg-blue-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 border border-slate-700/50 hover:border-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                                </svg>
                            </a>
                            
                            {/* Instagram */}
                            <a href="#" target="_blank" className="w-10 h-10 bg-[#1e293b] hover:bg-pink-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 border border-slate-700/50 hover:border-pink-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* --- العمود 2: روابط سريعة --- */}
                    <div className="space-y-4">
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="w-8 h-1 bg-[#0ea5e9] rounded-full"></span>
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-slate-400 hover:text-[#38bdf8] transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="text-[#0ea5e9] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-slate-400 hover:text-[#38bdf8] transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="text-[#0ea5e9] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-slate-400 hover:text-[#38bdf8] transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="text-[#0ea5e9] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-slate-400 hover:text-[#38bdf8] transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="text-[#0ea5e9] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* --- العمود 3: خدمة العملاء --- */}
                    <div className="space-y-4">
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="w-8 h-1 bg-[#0ea5e9] rounded-full"></span>
                            Customer Service
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/faq" className="text-slate-400 hover:text-[#38bdf8] transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="text-[#0ea5e9] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="/shipping" className="text-slate-400 hover:text-[#38bdf8] transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="text-[#0ea5e9] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link to="/returns" className="text-slate-400 hover:text-[#38bdf8] transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="text-[#0ea5e9] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    Returns & Refunds
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-slate-400 hover:text-[#38bdf8] transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="text-[#0ea5e9] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* --- العمود 4: تواصل معنا --- */}
                    <div className="space-y-4">
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="w-8 h-1 bg-[#0ea5e9] rounded-full"></span>
                            Contact Us
                        </h3>
                        
                        {/* العنوان */}
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-[#0ea5e9]/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-4 h-4 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-slate-300 text-sm font-medium">Address</p>
                                <p className="text-slate-400 text-sm">123 Commerce St, Tech City</p>
                            </div>
                        </div>

                        {/* الهاتف */}
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-[#0ea5e9]/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-4 h-4 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-slate-300 text-sm font-medium">Phone</p>
                                <p className="text-slate-400 text-sm">+1 (555) 123-4567</p>
                            </div>
                        </div>

                        {/* الإيميل */}
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-[#0ea5e9]/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-4 h-4 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-slate-300 text-sm font-medium">Email</p>
                                <p className="text-slate-400 text-sm">support@store.com</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ============================================ */}
            {/* القسم السفلي - حقوق النشر */}
            {/* ============================================ */}
            <div className="border-t border-slate-700/50 bg-[#0a0f1d]">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    
                    {/* النص */}
                    <p className="text-slate-500 text-sm text-center md:text-left">
                        © 2026 <span className="text-[#38bdf8]">STORE</span>. All rights reserved. Designed with 💙
                    </p>

                    {/* وسائل الدفع */}
                    <div className="flex items-center gap-3">
                        <span className="text-slate-500 text-xs">Payment Methods:</span>
                        {/* Visa */}
                        <div className="w-10 h-6 bg-[#1e293b] rounded border border-slate-700/50 flex items-center justify-center">
                            <span className="text-[#38bdf8] text-xs font-bold">VISA</span>
                        </div>
                        {/* Mastercard */}
                        <div className="w-10 h-6 bg-[#1e293b] rounded border border-slate-700/50 flex items-center justify-center">
                            <span className="text-[#38bdf8] text-xs font-bold">MC</span>
                        </div>
                        {/* PayPal */}
                        <div className="w-10 h-6 bg-[#1e293b] rounded border border-slate-700/50 flex items-center justify-center">
                            <span className="text-[#38bdf8] text-xs font-bold">PP</span>
                        </div>
                        {/* Stripe */}
                        <div className="w-10 h-6 bg-[#1e293b] rounded border border-slate-700/50 flex items-center justify-center">
                            <span className="text-[#38bdf8] text-xs font-bold">ST</span>
                        </div>
                    </div>

                </div>
            </div>

        </footer>
    )
}

export default Footer