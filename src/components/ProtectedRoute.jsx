// ============================================
// ProtectedRoute.jsx - حماية الصفحات (مُصلح)
// ============================================

import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = ({ children }) => {
  
  // ✅ نتحقق من الكوكيز أولاً
  const tokenFromCookie = Cookies.get('token')
  
  // ✅ لو ما لقيناه في الكوكيز، نجرب localStorage كاحتياطي
  const tokenFromStorage = localStorage.getItem('token')
  
  // ✅ يكفي أي واحد منهم يكون موجوداً
  const token = tokenFromCookie || tokenFromStorage

  const location = useLocation()

  // ❌ لو ما فيه توكن في أي مكان، رجعه لصفحة Login
  // ونحفظ الصفحة الحالية عشان نرجعه لها بعد تسجيل الدخول
  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  // ✅ لو مسجل دخول، اعرض الصفحة
  return children
}

export default ProtectedRoute