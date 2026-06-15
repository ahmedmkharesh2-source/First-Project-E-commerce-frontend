// ============================================
// ProtectedRoute.jsx - حماية الصفحات
// ============================================

import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  
  // ============================================
  // نتحقق من localStorage فقط
  // لأن في production (Vercel) الكوكيز بين
  // دومينين مختلفين (Vercel و Railway) لا تعمل بشكل موثوق
  // لذلك نعتمد على localStorage كمصدر رئيسي
  // ============================================
  const token = localStorage.getItem('token')

  // ============================================
  // useLocation: نحفظ الصفحة الحالية
  // عشان بعد تسجيل الدخول نرجع المستخدم
  // للصفحة اللي كان يحاول يدخلها
  // مثال: حاول يدخل /profile → رجعناه لـ /login
  // بعد تسجيل الدخول → نرجعه لـ /profile
  // ============================================
  const location = useLocation()

  // ============================================
  // لو ما فيه token = المستخدم مش مسجل دخول
  // نوجهه لصفحة Login
  // state: نحفظ الصفحة الحالية عشان نرجعه لها بعدين
  // replace: نستبدل التاريخ عشان ما يرجع بالـ back button
  // ============================================
  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  // ============================================
  // لو فيه token = المستخدم مسجل دخول
  // نعرض الصفحة المطلوبة (children)
  // ============================================
  return children
}

export default ProtectedRoute