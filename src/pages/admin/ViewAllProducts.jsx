import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAllProducts = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const getProducts = async () => {

      const response = await axios.get(
        "http://localhost:8000/api/v1/products/get-all-products"
      );

      setProducts(response.data.products);
    };

    getProducts();

  }, []);
  console.log(products);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        All Products
      </h1>

      {products.map((product) => (
        <div key={product._id}>
          {product.title}
        </div>
      ))}
    </div>
  );
};

export default ViewAllProducts;