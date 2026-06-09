import React, { useEffect, useState } from 'react'
import axios from "axios"
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const categories = ["Electronics", "Clothing", "Food", "Books", "Accessories"];

    const getAllProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/products/get-all-products");
            console.log(response.data.products);
            setProducts(response.data.products)
        } catch (error) {
            console.log(error);
             console.log(error.response);
            console.log(error.message);
            
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    console.log(products);
    console.log(products[0]?.images);

    
    return (
        <div>
           <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white">

  <div className="max-w-7xl mx-auto px-6 py-24">

    <div className="grid lg:grid-cols-2 gap-12 items-center">

      <div>

        <span className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full">
          New Collection
        </span>

        <h1 className="text-6xl font-extrabold mt-6">

          Discover
          <span className="text-cyan-400">
            {" "}Premium{" "}
          </span>
          Products

        </h1>

        <p className="text-gray-300 mt-6 text-lg">

          Explore the latest electronics,
          watches and accessories with
          premium quality and fast delivery.

        </p>

        <div className="flex gap-4 mt-8">

          <button className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl">
            Shop Now
          </button>

          <button className="border border-gray-600 px-8 py-4 rounded-xl">
            Explore
          </button>

        </div>

      </div>

      <div>

        <img
          src="/images/hero.png"
          alt="hero"
          className="w-full max-w-xl mx-auto"
        />

      </div>

    </div>

  </div>

</section>
<section className="max-w-7xl mx-auto px-6 py-16">

  <div className="text-center mb-12">

    <h2 className="text-4xl font-bold">
      Shop By Category
    </h2>

    <p className="text-gray-500 mt-3">
      Find your favorite products faster
    </p>

  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

    <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition cursor-pointer">
      <div className="text-5xl mb-4">💻</div>
      <h3 className="text-xl font-bold">Electronics</h3>
      <p className="text-gray-500 mt-2">
        Laptops, phones and gadgets
      </p>
    </div>

    <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition cursor-pointer">
      <div className="text-5xl mb-4">⌚</div>
      <h3 className="text-xl font-bold">Watches</h3>
      <p className="text-gray-500 mt-2">
        Premium watch collection
      </p>
    </div>

    <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition cursor-pointer">
      <div className="text-5xl mb-4">👕</div>
      <h3 className="text-xl font-bold">Fashion</h3>
      <p className="text-gray-500 mt-2">
        Modern clothing and accessories
      </p>
    </div>

    <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition cursor-pointer">
      <div className="text-5xl mb-4">📚</div>
      <h3 className="text-xl font-bold">Books</h3>
      <p className="text-gray-500 mt-2">
        Explore knowledge and learning
      </p>
    </div>

  </div>

</section>

             <div className="p-4">

            {/* 🔥 Main Layout */}
            <div className="flex flex-col lg:flex-row gap-4">

                {/* ================= LEFT SIDE (FILTER - 25%) ================= */}
               <div className="w-full lg:w-1/4 bg-white p-6 rounded-3xl shadow-lg border border-gray-100">

                    <h2 className="text-xl font-bold mb-4">Filters</h2>

                    {/* 🔍 Search */}
                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text">Search</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* 💰 Price Range */}
                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text">Price Range</span>
                        </label>

                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Min"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    {/* 📦 Categories */}
                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>

                        <select className="select select-bordered w-full">
                            <option value="">
                            Select Category
                            </option>
                            {categories.map((cat, index) => (
                                <option key={index}>{cat}</option>
                            ))}
                        </select>
                    </div>

                </div>

                {/* ================= RIGHT SIDE (PRODUCTS - 75%) ================= */}
                <div className="w-full lg:w-3/4">
                            <div className="flex items-center justify-between mb-10">

  <div>

    <h2 className="text-4xl font-bold">
      Featured Products
    </h2>

    <p className="text-gray-500 mt-2">
      Discover our latest collection
    </p>

  </div>

  <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800">
    View All
  </button>

</div>

                    {/* 🛒 Product Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {products.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                />
                ))}
                   </div>

                </div>

            </div>

        </div>
        </div>
    )
}

export default Home
