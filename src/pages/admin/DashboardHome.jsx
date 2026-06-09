import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Pencil,
  Trash2,
} from "lucide-react";

const DashboardHome = () => {

  // هنا نخزن جميع المنتجات القادمة من الباك اند
  const [products, setProducts] = useState([]);

  // هذا يساعدنا على التنقل بين الصفحات
  const navigate = useNavigate();

 

  // أنشئ state جديد للإحصائيات:
  const [stats,setStats] = useState({
    users:0,
    products:0,
    orders:0,
    total:0
  });
  
  // استخدم البيانات من state الإحصائيات:
  const totalUsers = stats.users;
  const totalOrders = stats.orders;
  const totalRevenue = stats.total;
  const totalProducts = stats.products;
  // =========================================
  // جلب جميع المنتجات عند فتح الصفحة
  // =========================================
  useEffect(() => {

    const getAllProducts = async () => {

      try {

        // طلب جلب المنتجات من السيرفر
        const response = await axios.get(
          "http://localhost:8000/api/v1/products/get-all-products"
        );

        // تخزين المنتجات داخل state
        setProducts(response.data.products);

      } catch (error) {

        toast.error(error.response?.data?.message);

      }
    };


    const getCombineData = async () =>{
      try {
        const response = await axios.get("http://localhost:8000/api/v1/users/combin-data",
          {
          withCredentials:true,
        });
        setStats(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    }
    getAllProducts();
    getCombineData();


  }, []);




  // =========================================
  // حذف منتج
  // =========================================
  const deleteProduct = async (id) => {

    try {

      // إرسال طلب حذف المنتج
      await axios.delete(
        `http://localhost:8000/api/v1/products/delete-product/${id}`,
        {
          withCredentials: true,
        }
      );

      // حذف المنتج مباشرة من الواجهة بدون تحديث الصفحة
      setProducts(
        products.filter((item) => item._id !== id)
      );

      toast.success("Product Deleted Successfully");

    } catch (error) {

      toast.error(error.response?.data?.message);

    }
  };



  return (

    <div>

      {/* عنوان الصفحة */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Dashboard Overview
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back Admin 👋
        </p>

      </div>



      {/* الكروت العلوية */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* PRODUCTS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">
                Total Products
              </p>

              <h1 className="text-5xl text-black font-bold mt-3">
                {totalProducts}
              </h1>

            </div>

            <div className="bg-blue-100 p-4 rounded-2xl">

              <Package className="text-blue-600" />

            </div>

          </div>
        </div>



        {/* USERS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">
                Total Users
              </p>

              <h1 className="text-black text-5xl font-bold mt-3">
                {totalUsers}
              </h1>

            </div>

            <div className="bg-purple-100 p-4 rounded-2xl">

              <Users className="text-purple-600" />

            </div>

          </div>
        </div>



        {/* REVENUE */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">
                Revenue
              </p>

              <h1 className="text-5xl font-bold mt-3 text-green-500">
                ${totalRevenue}
              </h1>

            </div>

            <div className="bg-green-100 p-4 rounded-2xl">

              <DollarSign className="text-green-600" />

            </div>

          </div>
        </div>



        {/* ORDERS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">
                Orders
              </p>

              <h1 className="text-5xl font-bold mt-3 text-cyan-500">
                {totalOrders}
              </h1>

            </div>

            <div className="bg-cyan-100 p-4 rounded-2xl">

              <ShoppingCart className="text-cyan-600" />

            </div>

          </div>
        </div>

      </div>




      {/* جدول المنتجات */}
      <div className="bg-white rounded-3xl shadow-sm mt-10 overflow-hidden border border-gray-100">

        {/* عنوان الجدول */}
        <div className="p-6 border-b">

          <h2 className="text-2xl font-bold text-gray-800">
            Recent Products
          </h2>

        </div>



        {/* الجدول */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            {/* رأس الجدول */}
            <thead className="bg-gray-800 text-white">

              <tr>

                <th className="text-left px-6 py-4">
                  Product
                </th>

                <th className="text-left px-6 py-4">
                  Category
                </th>

                <th className="text-left px-6 py-4">
                  Price
                </th>

                <th className="text-left px-6 py-4">
                  Stock
                </th>

                <th className="text-left px-6 py-4">
                  Status
                </th>

                <th className="text-left px-6 py-4">
                  Actions
                </th>

              </tr>

            </thead>




            {/* بيانات المنتجات */}
            <tbody>

              {products.map((item) => (

                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  {/* اسم المنتج */}
                  <td className="px-6 py-5 font-medium text-gray-700">
                    {item.title}
                  </td>



                  {/* التصنيف */}
                  <td className="px-6 py-5 text-gray-600">
                    {item.category}
                  </td>



                  {/* السعر */}
                  <td className="px-6 py-5 text-gray-600">
                    ${item.price}
                  </td>



                  {/* المخزون */}
                  <td className="px-6 py-5 text-gray-600">
                    {item.stock}
                  </td>



                  {/* الحالة */}
                  <td className="px-6 py-5">

                    <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
                      Active
                    </span>

                  </td>



                  {/* أزرار التعديل والحذف */}
                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      {/* تعديل المنتج */}
                      <button
                        onClick={() =>
                          navigate(`/admin-dashboard/update-product/${item._id}`)
                        }
                        className="bg-black text-white p-3 rounded-xl hover:bg-gray-800 transition"
                      >

                        <Pencil size={18} />

                      </button>



                      {/* حذف المنتج */}
                      <button
                        onClick={() =>
                          deleteProduct(item._id)
                        }
                        className="bg-red-500 text-white p-3 rounded-xl hover:bg-red-600 transition"
                      >

                        <Trash2 size={18} />

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default DashboardHome;