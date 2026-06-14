// ============================================
// ProductCard.jsx - كرت عرض المنتج
// ألوان: داكن + أزرق فاتح
// ============================================

import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // --- صورة احتياطية لو ما فيه صورة ---
  const image =
    product?.images?.[0]?.url ||
    "https://via.placeholder.com/300x300?text=No+Image";

  return (
    // Link: يوجه للصفحة التفصيلية عند الضغط
    <Link to={`/product-detail/${product._id}`} className="block h-full">

      {/* الكرت الرئيسي - خلفية داكنة */}
      <div className="group bg-[#1e293b] rounded-xl overflow-hidden border border-slate-700/50 hover:border-[#0ea5e9]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0ea5e9]/10 h-full flex flex-col">

        {/* ============================================ */}
        {/* قسم الصورة */}
        {/* ============================================ */}
        <div className="relative overflow-hidden bg-[#0f172a]">

          {/* --- تاج NEW - أزرق أساسي --- */}
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-[#0ea5e9] text-white text-xs font-bold px-2 py-1 rounded-md">
              NEW
            </span>
          </div>

          {/* --- السعر فوق الصورة (يظهر عند hover) --- */}
          <div className="absolute top-2 right-2 z-10 bg-[#0f172a]/80 text-[#38bdf8] text-sm font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            ${product?.price}
          </div>

          {/* --- الصورة - حجم وسط h-48 --- */}
          <img
            src={image}
            alt={product?.title}
            className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

        </div>

        {/* ============================================ */}
        {/* قسم المحتوى (النصوص) */}
        {/* ============================================ */}
        <div className="p-4 flex flex-col flex-grow">

          {/* --- تاج الفئة - أزرق فاتح --- */}
          <span className="text-[#38bdf8] text-xs font-medium mb-1 uppercase tracking-wide">
            {product?.category || "General"}
          </span>

          {/* --- العنوان - أبيض + أزرق hover --- */}
          <h2 className="text-white font-bold text-base leading-tight line-clamp-2 mb-2 group-hover:text-[#38bdf8] transition-colors">
            {product?.title}
          </h2>

          {/* --- الوصف - رمادي + تقصير --- */}
          <p className="text-slate-400 text-sm line-clamp-2 mb-3 flex-grow">
            {product?.description
              ? product.description.slice(0, 60)
              : "No description available"}
          </p>

          {/* ============================================ */}
          {/* الفooter - السعر + الزر */}
          {/* ============================================ */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">

            {/* --- السعر --- */}
            <div className="flex flex-col">
              {/* السعر القديم (مقطوع) */}
              <span className="text-slate-500 text-xs line-through">
                ${(product?.price * 1.2).toFixed(2)}
              </span>
              {/* السعر الحقيقي - أزرق فاتح */}
              <span className="text-[#38bdf8] text-lg font-bold">
                ${product?.price}
              </span>
            </div>

            {/* --- زر View - أزرق أساسي --- */}
            <div className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-[#0ea5e9]/25">
              View →
            </div>

          </div>

        </div>

      </div>

    </Link>
  );
};

export default ProductCard;