// ============================================
// ViewAllProducts.jsx - مُصلح مع تحققات
// ============================================

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Pencil, Trash2, Eye, Package, Search, Filter } from "lucide-react";

const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const categories = ["Electronics", "Clothing", "Food", "Books", "Accessories"];

  // ============================================
  // جلب المنتجات - مع تحققات
  // ============================================
  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log("=== بدء جلب المنتجات ===");
        
        const response = await axios.get(
          "http://localhost:8000/api/v1/products/get-all-products"
        );
        
        console.log("الرد الكامل:", response);
        console.log("response.data:", response.data);
        console.log("response.data.products:", response.data?.products);
        
        // التحقق من البيانات
        let allProducts = [];
        
        if (response.data && Array.isArray(response.data.products)) {
          allProducts = response.data.products;
        } else if (Array.isArray(response.data)) {
          // لو الـ API يرجع array مباشرة
          allProducts = response.data;
        } else {
          console.log("شكل البيانات غير متوقع:", typeof response.data);
        }
        
        console.log("المنتجات المستخرجة:", allProducts);
        console.log("عدد المنتجات:", allProducts.length);
        
        if (allProducts.length > 0) {
          console.log("أول منتج:", allProducts[0]);
        }
        
        setProducts(allProducts);
        setFilteredProducts(allProducts);
        setIsLoading(false);
        
      } catch (error) {
        console.log("=== خطأ في جلب المنتجات ===");
        console.log("Error:", error);
        console.log("Error response:", error.response);
        console.log("Error message:", error.message);
        
        setError(error.response?.data?.message || error.message || "Failed to load");
        toast.error("Failed to load products: " + (error.response?.data?.message || error.message));
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  // ============================================
  // فلترة المنتجات
  // ============================================
  useEffect(() => {
    console.log("=== فلترة ===");
    console.log("البحث:", searchQuery);
    console.log("الفئة:", selectedCategory);
    console.log("عدد المنتجات:", products.length);
    
    let result = [...products];

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        (product.title && product.title.toLowerCase().includes(query)) ||
        (product.description && product.description.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== "") {
      result = result.filter(product => product.category === selectedCategory);
    }

    console.log("النتيجة:", result.length);
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, products]);

  // ============================================
  // حذف منتج
  // ============================================
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/products/delete-product/${id}`,
        { withCredentials: true }
      );
      
      const updated = products.filter(p => p._id !== id);
      setProducts(updated);
      setFilteredProducts(updated);
      toast.success("Deleted!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  // ============================================
  // عرض حالة التحميل
  // ============================================
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0ea5e9] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading products...</p>
        </div>
      </div>
    );
  }

  // ============================================
  // عرض خطأ
  // ============================================
  if (error) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">⚠️ Error</p>
          <p className="text-slate-400">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-[#0ea5e9] text-white px-6 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // العرض الرئيسي
  // ============================================
  return (
    <div className="min-h-screen bg-[#0f172a] p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <Package className="text-[#0ea5e9]" size={28} />
              All Products
            </h1>
            <p className="text-slate-400 mt-1">
              Total: {products.length} | Showing: {filteredProducts.length}
            </p>
          </div>
          
          <button 
            onClick={() => navigate("/admin-dashboard/add-product")}
            className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2"
          >
            + Add Product
          </button>
        </div>

        {/* Filters */}
        <div className="bg-[#1e293b] rounded-xl border border-slate-700/50 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-600 text-white pl-10 pr-4 py-2.5 rounded-xl focus:border-[#0ea5e9] outline-none"
              />
            </div>

            <div className="relative md:w-48">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-600 text-white pl-10 pr-4 py-2.5 rounded-xl outline-none cursor-pointer appearance-none"
              >
                <option value="">All Categories</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Debug Info - اعرض هذا في Console */}
        <div className="hidden">
          Products: {products.length}, Filtered: {filteredProducts.length}
        </div>

        {/* Products Table */}
        <div className="bg-[#1e293b] rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden">
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">

              <thead className="bg-[#0f172a]">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Product</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Category</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Price</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Stock</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-20 text-center">
                      <Package size={48} className="text-slate-600 mx-auto mb-4" />
                      <h2 className="text-xl font-bold text-white mb-2">No Products</h2>
                      <p className="text-slate-400 mb-4">
                        {products.length === 0 
                          ? "No products in database" 
                          : "No products match your filters"}
                      </p>
                      {products.length === 0 && (
                        <button 
                          onClick={() => navigate("/admin-dashboard/add-product")}
                          className="bg-[#0ea5e9] text-white px-6 py-2 rounded-lg"
                        >
                          Add First Product
                        </button>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product._id} className="border-b border-slate-700/50 hover:bg-[#0f172a]/50 transition">
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={product.images?.[0]?.url || "https://via.placeholder.com/50?text=No+Image"} 
                            alt={product.title || "Product"}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-700/50 bg-[#0f172a]"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/50?text=Error";
                            }}
                          />
                          <div>
                            <h4 className="font-medium text-white text-sm">
                              {product.title || "Untitled"}
                            </h4>
                            <p className="text-xs text-slate-500">
                              {product.description?.slice(0, 30) || "No description"}...
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="bg-[#0ea5e9]/15 text-[#38bdf8] px-3 py-1 rounded-full text-xs font-medium border border-[#0ea5e9]/20">
                          {product.category || "N/A"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-[#D4AF37] font-bold">
                        ${product.price || 0}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border
                          ${(product.stock || 0) > 0 
                            ? "bg-[#06402B]/30 text-[#10b981] border-[#06402B]/30" 
                            : "bg-red-900/30 text-red-400 border-red-700/30"}`}>
                          {product.stock || 0}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => navigate(`/product-detail/${product._id}`)}
                            className="bg-[#0f172a] hover:bg-[#0ea5e9]/20 text-slate-400 hover:text-[#0ea5e9] p-2 rounded-lg border border-slate-700/50"
                            title="View"
                          >
                            <Eye size={16} />
                          </button>
                          
                          <button 
                            onClick={() => navigate(`/admin-dashboard/update-product/${product._id}`)}
                            className="bg-[#0ea5e9]/15 hover:bg-[#0ea5e9] text-[#0ea5e9] hover:text-white p-2 rounded-lg border border-[#0ea5e9]/30"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </button>
                          
                          <button 
                            onClick={() => deleteProduct(product._id)}
                            className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white p-2 rounded-lg border border-red-500/30"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ViewAllProducts;