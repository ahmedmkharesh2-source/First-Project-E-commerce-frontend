// ============================================
// Home.jsx - نسخة مُصلحة بالكامل
// البحث فوري + الفلترة صحيحة
// ============================================

import React, { useEffect, useState, useCallback } from 'react'
import axios from "axios"
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    
    const categories = ["Electronics", "Clothing", "Food", "Books", "Accessories"];

    // ============================================
    // جلب المنتجات من الـ API
    // ============================================
    const getAllProducts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("first-project-e-commerce-backend-production.up.railway.app/api/v1/products/get-all-products?");
            const allProducts = response.data.products || [];
            
            console.log("=== المنتجات جت من الـ API ===");
            console.log("عدد المنتجات:", allProducts.length);
            console.log("فئات المنتجات:", [...new Set(allProducts.map(p => p.category))]);
            
            setProducts(allProducts);
            setFilteredProducts(allProducts);
            setIsLoading(false);
        } catch (error) {
            console.log("خطأ:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    // ============================================
    // دالة الفلترة - useCallback عشان تشتغل صح
    // ============================================
    const filterProducts = useCallback((search, min, max, category, allProducts) => {
        console.log("=== فلترة ===");
        console.log("بحث:", search);
        console.log("فئة:", category);
        console.log("المنتجات:", allProducts.length);

        let result = [...allProducts];

        // فلترة بالبحث
        if (search && search.trim() !== "") {
            const query = search.toLowerCase();
            result = result.filter(product => 
                (product.title && product.title.toLowerCase().includes(query)) ||
                (product.description && product.description.toLowerCase().includes(query))
            );
        }

        // فلترة بالسعر الأدنى
        if (min !== "" && Number(min) >= 0) {
            result = result.filter(product => Number(product.price || 0) >= Number(min));
        }

        // فلترة بالسعر الأعلى
        if (max !== "" && Number(max) >= 0) {
            result = result.filter(product => Number(product.price || 0) <= Number(max));
        }

        // فلترة بالفئة
        if (category && category !== "") {
            result = result.filter(product => {
                const productCategory = (product.category || "").toString().trim();
                return productCategory === category;
            });
        }

        console.log("النتيجة:", result.length);
        return result;
    }, []);

    // ============================================
    // useEffect - يشتغل فوراً لما يتغير أي فلتر
    // ============================================
    useEffect(() => {
        if (products.length > 0) {
            const result = filterProducts(searchQuery, minPrice, maxPrice, selectedCategory, products);
            setFilteredProducts(result);
        }
    }, [searchQuery, minPrice, maxPrice, selectedCategory, products, filterProducts]);

    // ============================================
    // إعادة التعيين
    // ============================================
    const resetFilters = () => {
        setSearchQuery("");
        setMinPrice("");
        setMaxPrice("");
        setSelectedCategory("");
    };

    // ============================================
    // اختيار فئة من الكروت
    // ============================================
    const selectCategory = (cat) => {
        // لو نفس الفئة، نلغي التحديد
        if (selectedCategory === cat) {
            setSelectedCategory("");
        } else {
            setSelectedCategory(cat);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a]">
            
            {/* شريط البحث والفلاتر */}
            <div className="bg-[#1e293b] border-b border-slate-700/50 sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex flex-col lg:flex-row gap-3 items-center">
                  
                  {/* البحث - فوري */}
                  <div className="relative flex-1 w-full">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#0f172a] border border-slate-600 text-white placeholder-slate-500 pl-10 pr-10 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* السعر */}
                  <div className="flex gap-2 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-32">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                      <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val === "" || Number(val) >= 0) setMinPrice(val);
                        }}
                        min="0"
                        className="w-full bg-[#0f172a] border border-slate-600 text-white placeholder-slate-500 pl-7 pr-3 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none"
                      />
                    </div>
                    <div className="relative flex-1 lg:w-32">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val === "" || Number(val) >= 0) setMaxPrice(val);
                        }}
                        min="0"
                        className="w-full bg-[#0f172a] border border-slate-600 text-white placeholder-slate-500 pl-7 pr-3 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* الـ Select - فوري */}
                  <div className="relative w-full lg:w-44">
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-[#0f172a] border border-slate-600 text-white py-3 px-4 pr-10 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none cursor-pointer appearance-none"
                    >
                      <option value="">All Categories</option>
                      {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>

                  {/* زر إعادة التعيين */}
                  <button 
                    onClick={resetFilters}
                    className="w-full lg:w-auto bg-[#1e293b] hover:bg-red-600/20 text-red-400 border border-slate-600 hover:border-red-500 px-4 py-3 rounded-xl font-medium transition-all duration-300"
                  >
                    Reset
                  </button>

                </div>

                {/* الفلاتر النشطة */}
                {(selectedCategory || searchQuery || minPrice || maxPrice) && (
                  <div className="flex flex-wrap gap-2 mt-3 items-center">
                    <span className="text-slate-400 text-sm">Active:</span>
                    {selectedCategory && (
                      <span className="bg-[#0ea5e9]/20 text-[#38bdf8] text-xs px-3 py-1 rounded-full border border-[#0ea5e9]/30 flex items-center gap-1">
                        📂 {selectedCategory}
                        <button onClick={() => setSelectedCategory("")} className="hover:text-white">✕</button>
                      </span>
                    )}
                    {searchQuery && (
                      <span className="bg-[#0ea5e9]/20 text-[#38bdf8] text-xs px-3 py-1 rounded-full border border-[#0ea5e9]/30 flex items-center gap-1">
                        🔍 {searchQuery}
                        <button onClick={() => setSearchQuery("")} className="hover:text-white">✕</button>
                      </span>
                    )}
                    {minPrice && (
                      <span className="bg-[#0ea5e9]/20 text-[#38bdf8] text-xs px-3 py-1 rounded-full border border-[#0ea5e9]/30">
                        Min: ${minPrice}
                      </span>
                    )}
                    {maxPrice && (
                      <span className="bg-[#0ea5e9]/20 text-[#38bdf8] text-xs px-3 py-1 rounded-full border border-[#0ea5e9]/30">
                        Max: ${maxPrice}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* قسم الفئات */}
            <section className="max-w-7xl mx-auto px-4 py-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-white">
                  Shop By <span className="text-[#38bdf8]">Category</span>
                </h2>
                <p className="text-slate-500 mt-2">
                  Click to filter products
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {categories.map((cat) => (
                  <div 
                    key={cat}
                    onClick={() => selectCategory(cat)}
                    className={`group bg-[#1e293b] rounded-xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0ea5e9]/10 cursor-pointer text-center
                      ${selectedCategory === cat ? "border-[#0ea5e9] shadow-lg shadow-[#0ea5e9]/20 bg-[#0ea5e9]/10" : "border-slate-700/50 hover:border-[#0ea5e9]/50"}`}
                  >
                    <div className="w-8 h-8 bg-[#0ea5e9]/15 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-[#0ea5e9]/25 transition-colors">
                      <span className="text-3xl">
                        {cat === "Electronics" && "💻"}
                        {cat === "Clothing" && "👕"}
                        {cat === "Food" && "🍔"}
                        {cat === "Books" && "📚"}
                        {cat === "Accessories" && "⌚"}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#38bdf8] transition-colors">{cat}</h3>
                    <p className="text-slate-400 mt-1 text-sm">
                      {cat === "Electronics" && "Laptops & phones"}
                      {cat === "Clothing" && "Fashion & style"}
                      {cat === "Food" && "Fresh & tasty"}
                      {cat === "Books" && "Knowledge & learning"}
                      {cat === "Accessories" && "Watches & more"}
                    </p>
                  </div>
                ))}
                
              </div>
            </section>

            {/* قسم المنتجات */}
            <div className="max-w-7xl mx-auto px-4 pb-16">
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white">
                    Featured <span className="text-[#38bdf8]">Products</span>
                  </h2>
                  <p className="text-slate-500 mt-1 text-sm">
                    {isLoading ? "Loading..." : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'} found`}
                  </p>
                </div>
              </div>

              {/* تحميل */}
              {isLoading && (
                <div className="flex justify-center py-20">
                  <div className="w-10 h-10 border-4 border-[#0ea5e9] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {/* المنتجات */}
              {!isLoading && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                    />
                  ))}
                </div>
              )}

              {/* لا يوجد نتائج */}
              {!isLoading && filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
                  <p className="text-slate-400 mb-4">Try adjusting your search or filters</p>
                  <button 
                    onClick={resetFilters}
                    className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-6 py-2 rounded-lg transition-all"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

            </div>
        </div>
    )
}

export default Home