import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
const navigate = useNavigate();
const { addToCart } = useCart();
  const getProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/products/product-detail/${id}`
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
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-12">

          {/* LEFT SIDE */}
          <div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border">

              <img
                src={product?.images?.[activeImage]?.url}
                alt={product?.title}
                className="w-full h-[550px] object-cover hover:scale-105 transition duration-500"
              />

            </div>

            <div className="flex gap-3 mt-5 flex-wrap">

              {product?.images?.map((image, index) => (

                <img
                  key={index}
                  src={image.url}
                  alt="product"
                  onClick={() => setActiveImage(index)}
                  className={`w-24 h-24 rounded-2xl object-cover cursor-pointer border-2 transition-all

                  ${
                    activeImage === index
                      ? "border-cyan-500 scale-105"
                      : "border-gray-200"
                  }`}
                />

              ))}

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border flex flex-col justify-between">

            <div>

              <span className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold">
                {product?.category}
              </span>

              <h1 className="text-5xl font-bold text-slate-900 mt-5 leading-tight">
                {product?.title}
              </h1>

              <div className="flex items-center gap-3 mt-5">

                <div className="text-yellow-400 text-xl">
                  ⭐⭐⭐⭐⭐
                </div>

                <span className="text-gray-500">
                  4.8 Rating
                </span>

              </div>

              <div className="mt-6">

                <span className="text-5xl font-extrabold text-cyan-600">
                  ${product?.price}
                </span>

              </div>

              <div className="mt-6">

                <span
                  className={`px-5 py-2 rounded-full font-semibold

                  ${
                    product?.stock > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product?.stock > 0
                    ? "In Stock"
                    : "Out Of Stock"}
                </span>

              </div>

              <div className="mt-8">

                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  Description
                </h3>

                <p className="text-gray-600 leading-8">
                  {product?.description}
                </p>

              </div>

            </div>

            {/* BOTTOM ACTIONS */}
            <div className="mt-10">

              <div className="flex items-center gap-4 mb-8">

                <span className="font-semibold text-gray-700">
                  Quantity
                </span>

                <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">

                  <button
                    onClick={() =>
                      quantity > 1 &&
                      setQuantity(quantity - 1)
                    }
                    className="w-12 h-12 text-xl hover:bg-gray-200"
                  >
                    -
                  </button>

                  <span className="w-14 text-center font-bold">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity(quantity + 1)
                    }
                    className="w-12 h-12 text-xl hover:bg-gray-200"
                  >
                    +
                  </button>

                </div>

              </div>

              <div className="flex flex-col md:flex-row gap-4"> 

                {/* <button
                disabled={product.stock <= 0}
                onClick={()=>
                addToCart(product,quantity)}
                 className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-4 rounded-2xl text-lg font-semibold transition">
                  Add To Cart
                </button> */}

                 {/* Add to Cart */}
                        <button
                            onClick={() => addToCart(product, quantity)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition"
                        >
                            Add to Cart
                        </button>

                <button  
                disabled={product.stock <= 0}
                onClick={() => {
                        addToCart(product,quantity);
                        navigate("/cart");
                        }}
                className="flex-1 bg-slate-900 hover:bg-black text-white py-4 rounded-2xl text-lg font-semibold transition">
                  Buy Now
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