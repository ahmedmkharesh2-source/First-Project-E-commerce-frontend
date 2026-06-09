import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const categories = [
    "furniture",
    "electronics",
    "clothing",
    "bags",
    "sports",
  ];

  const [category, setCategory] = useState(categories[0]);

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/products/create-product",
        {
          title,
          price,
          description,
          stock,
          image,
          category,
        },
        {
          withCredentials: true,
        }
      );

      toast.success(response.data.message);

      // Reset fields
      setTitle("");
      setPrice("");
      setDescription("");
      setStock("");
      setImage("");
      setCategory(categories[0]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Top Heading */}
        <div className="bg-black text-white px-8 py-6">
          <h1 className="text-3xl font-bold">
            Add New Product
          </h1>

          <p className="text-gray-300 mt-2">
            Create and upload new products to your store
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={addProduct}
          className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* Product Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Product Title
            </label>

            <input
              type="text"
              placeholder="Enter product title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Price
            </label>

            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Stock Quantity
            </label>

            <input
              type="number"
              placeholder="Available stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Description
            </label>

            <textarea
              rows="5"
              placeholder="Write product description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
            ></textarea>
          </div>

         
          {/* Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 transition duration-300 text-white py-4 rounded-2xl font-bold text-lg shadow-lg"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;