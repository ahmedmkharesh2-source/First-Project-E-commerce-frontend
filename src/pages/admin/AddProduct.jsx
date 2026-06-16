// ============================================
// AddProduct.jsx - إضافة منتج جديد
// ألوان: داكن + أزرق فاتح + ذهبي
// ============================================

import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Upload, X, Plus, ArrowLeft } from "lucide-react";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const categories = ["Electronics", "Clothing", "Food", "Books", "Accessories"];
  const [category, setCategory] = useState(categories[0]);

  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://first-project-e-commerce-backend-production.up.railway.app/api/v1/products/create-product",
        { title, price, description, stock, images, category },
        { withCredentials: true }
      );

      toast.success(response.data.message);

      // Reset
      setTitle("");
      setPrice("");
      setDescription("");
      setStock("");
      setImages([]);
      setImagePreviews([]);
      setCategory(categories[0]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleImagesChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    let loadedCount = 0;
    const newImages = [];
    const newPreviews = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        newPreviews.push(reader.result);
        loadedCount++;
        if (loadedCount === files.length) {
          setImages((prev) => [...prev, ...newImages]);
          setImagePreviews((prev) => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate("/admin-dashboard/view-all-products")}
            className="bg-[#1e293b] hover:bg-[#0ea5e9] text-white p-2.5 rounded-xl transition-all border border-slate-700/50">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <Plus className="text-[#0ea5e9]" />
              Add New Product
            </h1>
            <p className="text-slate-400 mt-1">Create and upload new products to your store</p>
          </div>
        </div>

        <div className="bg-[#1e293b] rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden">

          <form onSubmit={addProduct} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#38bdf8] mb-2">Product Title</label>
              <input type="text" placeholder="Enter product title" value={title} onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-600 text-white placeholder-slate-500 px-4 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none" />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-[#38bdf8] mb-2">Price ($)</label>
              <input type="number" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-600 text-white placeholder-slate-500 px-4 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none" />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-[#38bdf8] mb-2">Stock Quantity</label>
              <input type="number" placeholder="Available stock" value={stock} onChange={(e) => setStock(e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-600 text-white placeholder-slate-500 px-4 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none" />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-[#38bdf8] mb-2">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-600 text-white px-4 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none cursor-pointer">
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#38bdf8] mb-2">Description</label>
              <textarea rows="5" placeholder="Write product description..." value={description} onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-600 text-white placeholder-slate-500 px-4 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none resize-none"></textarea>
            </div>

            {/* Images */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#38bdf8] mb-2">Product Images</label>
              <div className="flex flex-col gap-4">
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-3 bg-[#0f172a] border border-slate-600 rounded-xl hover:bg-[#0ea5e9]/10 hover:border-[#0ea5e9]/50 transition-all text-slate-300 w-fit">
                  <Upload size={18} className="text-[#0ea5e9]" />
                  Choose Images
                  <input type="file" accept="image/*" multiple onChange={handleImagesChange} className="hidden" />
                </label>
                
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img src={preview} alt={`preview ${index}`} className="w-full h-24 object-cover rounded-xl border border-slate-700/50" />
                        <button type="button" onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex gap-4 pt-4">
              <button type="button" onClick={() => navigate("/admin-dashboard/view-all-products")}
                className="flex-1 bg-[#1e293b] hover:bg-slate-700 text-white border border-slate-600 py-3 rounded-xl font-semibold transition-all">
                Cancel
              </button>
              <button type="submit"
                className="flex-1 bg-[#0ea5e9] hover:bg-[#0284c7] text-white py-3 rounded-xl font-semibold shadow-lg shadow-[#0ea5e9]/25 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
                <Plus size={18} />
                Add Product
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default AddProduct;