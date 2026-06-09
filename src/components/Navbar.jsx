import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import cookies from "js-cookie"

const Navbar = ({ cartCount = 0 }) => {
  const navigate = useNavigate()
  const logout = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/users/logout", {
        withCredentials: true
      });
      toast.success(response.data.message)
      navigate("/login")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const isLoggedin = cookies.get("token");
  return (
    <div className="navbar bg-base-100 shadow-sm">

      {/* LEFT */}
      <div className="navbar-start">

        {/* Mobile Hamburger */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>

          {/* Mobile Menu */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><Link>Home</Link></li>
            <li><Link>Products</Link></li>
            <li><Link>Categories</Link></li>
            <li><Link>Contact</Link></li>
          </ul>
        </div>

        {/* Logo */}
        <Link className="text-3xl font-bold ms-4 cursor-pointer">
          Daraz
        </Link>
      </div>

      {/* CENTER (Desktop only) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end me-6">

        {/* Cart */}
        <Link to = "/cart">
        <div className="dropdown dropdown-end">

          
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5" />
              </svg>
              <span className="badge badge-sm indicator-item">{cartCount}</span>
            </div>
          </div>
        </div>

        </Link>

        {/* Profile */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="profile"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
            <li><Link to="/profile">Profile</Link></li>
            <li><Link>Settings</Link></li>
            <li onClick={logout}>{
              isLoggedin ? (
                <Link>Logout</Link>
              ) : (
                <Link to = "/login">Login</Link>
              )
            }</li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default Navbar
