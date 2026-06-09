import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {

  return (

    <Link to={`/product-detail/${product._id}`}>
        <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
       
        {/* <div className="overflow-hidden"> */}     
        {/* <div className="absolute top-4 right-4 bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
        ${product.price}
        </div>
          <img
            src={product?.images?.[0]?.url}
            alt={product?.title}
            className="h-64 w-full object-cover hover:scale-110 transition duration-500"
          />

        </div> */}
        {/* ---------- */}

<div className="relative overflow-hidden group">

 <div
  className="
    absolute top-4 right-4 z-10
    bg-cyan-500 text-white
    px-3 py-1 rounded-full text-sm font-semibold
    opacity-0
    translate-y-[-10px]
    group-hover:opacity-100
    group-hover:translate-y-0
    transition-all duration-300
  "
>
  ${product.price}
</div>

  <img
    src={product?.images?.[0]?.url}
    alt={product?.title}
    className="h-64 w-full object-cover hover:scale-110 transition duration-500"
  />

</div>
{/* ---------- */}

        <div className="p-5">

          <h2 className="text-xl font-bold text-gray-800">

            {product?.title}

          </h2>

          <p className="text-gray-500 text-sm mt-2">

            {product?.description?.slice(0, 70)}...

          </p>

          <div className="flex justify-between items-center mt-5">

            <span className="text-2xl font-bold text-cyan-600">

              ${product?.price}

            </span>

            <button className="bg-black text-white px-4 py-2 rounded-xl hover:bg-cyan-600 transition">

              View

            </button>

          </div>

        </div>
        

      </div>
      

    </Link>
    
  );
};

export default ProductCard;