// ============================================
// ProductDetail.jsx - صفحة تفاصيل المنتج
// ============================================

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProductDetail = ({ addToCart }) => {
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ التحقق من تسجيل الدخول
  const isLoggedIn = Cookies.get("token") || localStorage.getItem("token");

    // ✅ أضف هنا
  console.log("isLoggedIn:", isLoggedIn);
  console.log("Cookie token:", Cookies.get("token"));
  console.log("LocalStorage token:", localStorage.getItem("token"));


  const getProductDetails = async () => {
    try {
      const response = await axios.get(
        `https://first-project-e-commerce-backend-production.up.railway.app/api/v1/products/product-detail/${id}`
      );
      setProduct(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a]">
        <div className="w-10 h-10 border-4 border-[#0ea5e9] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">

        <div className="grid lg:grid-cols-2 gap-8">

          {/* ===== LEFT - الصور ===== */}
          <div className="space-y-4">
            <div className="bg-[#1e293b] rounded-xl overflow-hidden border border-slate-700/50 shadow-lg">
              <img
                src={product?.images?.[activeImage]?.url}
                alt={product?.title}
                className="w-full h-[350px] object-cover hover:scale-105 transition duration-500"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {product?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt="product"
                  onClick={() => setActiveImage(index)}
                  className={`w-16 h-16 rounded-lg object-cover cursor-pointer border-2 transition-all duration-300 hover:scale-105
                  ${activeImage === index
                    ? "border-[#0ea5e9] shadow-lg shadow-[#0ea5e9]/20"
                    : "border-slate-700/50 hover:border-[#0ea5e9]/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ===== RIGHT - التفاصيل ===== */}
          <div className="bg-[#1e293b] rounded-xl p-6 border border-slate-700/50 shadow-lg flex flex-col justify-between">

            <div>
              <span className="inline-block bg-[#0ea5e9]/20 text-[#38bdf8] px-3 py-1.5 rounded-full text-xs font-semibold border border-[#0ea5e9]/30">
                {product?.category}
              </span>

              <h1 className="text-2xl lg:text-3xl font-bold text-white mt-4 leading-tight">
                {product?.title}
              </h1>

              <div className="flex items-center gap-2 mt-3">
                <div className="text-[#0ea5e9] text-base tracking-wider">★★★★★</div>
                <span className="text-slate-400 text-xs">4.8 (128 reviews)</span>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#38bdf8]">${product?.price}</span>
                <span className="text-slate-500 text-base line-through">${(product?.price * 1.25).toFixed(2)}</span>
                <span className="bg-[#0ea5e9]/20 text-[#38bdf8] text-xs font-bold px-2 py-0.5 rounded">SAVE 20%</span>
              </div>

              <div className="mt-4">
                <span className={`inline-block px-3 py-1.5 rounded-full font-semibold text-xs
                  ${product?.stock > 0
                    ? "bg-[#0ea5e9]/20 text-[#38bdf8] border border-[#0ea5e9]/30"
                    : "bg-red-900/30 text-red-400 border border-red-700/30"
                  }`}>
                  {product?.stock > 0 ? `✓ In Stock (${product?.stock})` : "✗ Out Of Stock"}
                </span>
              </div>

              <div className="mt-5">
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#0ea5e9] rounded-full"></span>
                  Description
                </h3>
                <p className="text-slate-400 leading-7 text-sm">{product?.description}</p>
              </div>
            </div>

            {/* ===== ACTIONS ===== */}
            <div className="mt-6 pt-5 border-t border-slate-700/50">

              {/* Quantity */}
              <div className="flex items-center gap-3 mb-5">
                <span className="font-semibold text-slate-300 text-sm">Quantity</span>
                <div className="flex items-center bg-[#0f172a] rounded-lg border border-slate-700/50 overflow-hidden">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="w-10 h-10 text-lg text-slate-400 hover:text-white hover:bg-[#0ea5e9] transition-all duration-200"
                  >−</button>
                  <span className="w-10 text-center font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 text-lg text-slate-400 hover:text-white hover:bg-[#0ea5e9] transition-all duration-200"
                  >+</button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">

                {/* ✅ Add to Cart */}
                <button
                  onClick={() => {
                    if (!isLoggedIn) {
                      navigate("/login", { state: { from: location.pathname } });
                      return;
                    }
                    addToCart(product, quantity);
                  }}
                  className="flex-1 bg-[#1e293b] hover:bg-[#0ea5e9] text-white border border-slate-600 hover:border-[#0ea5e9] px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#0ea5e9]/20"
                >
                  🛒 Add to Cart
                </button>

                {/* ✅ Buy Now */}
                <button
                  disabled={product.stock <= 0}
                  onClick={() => {
                    if (!isLoggedIn) {
                      navigate("/login", { state: { from: location.pathname } });
                      return;
                    }
                    addToCart(product, quantity);
                    navigate("/cart");
                  }}
                  className="flex-1 bg-[#0ea5e9] hover:bg-[#0284c7] text-white py-3 rounded-lg text-base font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#0ea5e9]/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ⚡ Buy Now
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetail;