// ============================================
// Products.jsx - صفحة عرض كل المنتجات
// ألوان: داكن + أزرق فاتح + ذهبي
// ============================================

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Search, Filter, Grid3X3, List, SlidersHorizontal } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // newest, price-low, price-high, name
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const categories = ["Electronics", "Clothing", "Food", "Books", "Accessories"];

  // ============================================
  // جلب المنتجات
  // ============================================
  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:8000/api/v1/products/get-all-products");
        const allProducts = response.data.products || [];
        
        console.log("Products loaded:", allProducts.length);
        setProducts(allProducts);
        setFilteredProducts(allProducts);
        setIsLoading(false);
      } catch (error) {
        console.log("Error:", error);
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  // ============================================
  // فلترة وترتيب
  // ============================================
  useEffect(() => {
    let result = [...products];

    // بحث
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.title?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      );
    }

    // فئة
    if (selectedCategory !== "") {
      result = result.filter(product => product.category === selectedCategory);
    }

    // ترتيب
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "name":
        result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        break;
      case "newest":
      default:
        // Keep original order (newest first)
        break;
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, sortBy, products]);

  return (
    <div className="min-h-screen bg-[#0f172a]">

      {/* Header */}
      <section className="bg-[#1e293b] border-b border-slate-700/50 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            All <span className="text-[#38bdf8]">Products</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Discover our premium collection of {products.length} products
          </p>
        </div>
      </section>

      {/* Filters Bar */}
      <div className="sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-700/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-3 items-center">

          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e293b] border border-slate-600 text-white placeholder-slate-500 pl-10 pr-4 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                ✕
              </button>
            )}
          </div>

          {/* Category */}
          <div className="relative w-full lg:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#1e293b] border border-slate-600 text-white pl-10 pr-4 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none cursor-pointer appearance-none"
            >
              <option value="">All Categories</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="relative w-full lg:w-48">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-[#1e293b] border border-slate-600 text-white pl-10 pr-4 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none cursor-pointer appearance-none"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>
          </div>

          {/* View Mode */}
          <div className="flex gap-2 bg-[#1e293b] border border-slate-600 rounded-xl p-1">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-[#0ea5e9] text-white" : "text-slate-400 hover:text-white"}`}
            >
              <Grid3X3 size={18} />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-[#0ea5e9] text-white" : "text-slate-400 hover:text-white"}`}
            >
              <List size={18} />
            </button>
          </div>

        </div>

        {/* Active Filters */}
        {(selectedCategory || searchQuery) && (
          <div className="max-w-7xl mx-auto flex flex-wrap gap-2 mt-3">
            <span className="text-slate-400 text-sm">Active:</span>
            {selectedCategory && (
              <span className="bg-[#0ea5e9]/20 text-[#38bdf8] text-xs px-3 py-1 rounded-full border border-[#0ea5e9]/30 flex items-center gap-1">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("")} className="hover:text-white">✕</button>
              </span>
            )}
            {searchQuery && (
              <span className="bg-[#0ea5e9]/20 text-[#38bdf8] text-xs px-3 py-1 rounded-full border border-[#0ea5e9]/30 flex items-center gap-1">
                "{searchQuery}"
                <button onClick={() => setSearchQuery("")} className="hover:text-white">✕</button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#0ea5e9] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Results Count */}
        {!isLoading && (
          <div className="mb-6">
            <p className="text-slate-400 text-sm">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
        )}

        {/* Grid View */}
        {!isLoading && viewMode === "grid" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* List View */}
        {!isLoading && viewMode === "list" && (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-[#1e293b] rounded-xl border border-slate-700/50 p-4 flex gap-4 hover:border-[#0ea5e9]/50 transition-all">
                <img 
                  src={product.images?.[0]?.url || "https://via.placeholder.com/150"} 
                  alt={product.title}
                  className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <span className="text-[#38bdf8] text-xs font-medium uppercase">{product.category}</span>
                  <h3 className="text-white font-bold text-lg mt-1">{product.title}</h3>
                  <p className="text-slate-400 text-sm mt-2 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[#D4AF37] text-xl font-bold">${product.price}</span>
                    <span className="text-slate-500 text-sm">{product.stock} in stock</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
            <p className="text-slate-400">Try adjusting your search or filters</p>
          </div>
        )}

      </div>

    </div>
  );
};

export default Products;