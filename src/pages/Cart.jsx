// ============================================
// Cart.jsx - صفحة السلة
// ألوان: داكن + أزرق فاتح + ذهبي
// ============================================

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from '../components/PaymentForm'
// import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Truck, CreditCard, MapPin, Package, CheckCircle } from 'lucide-react'

// ✅ الحل — أضف Shield
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Truck, CreditCard, MapPin, Package, CheckCircle, Shield } from 'lucide-react'
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const Cart = ({ cartItems = [], removeFromCart, updateQuantity, clearCart }) => {
  const [step, setStep] = useState('cart') // 'cart' | 'shipping' | 'payment'
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    country: '',
    zipCode: '',
    mobileNo: '',
  })

  const navigate = useNavigate()

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleShippingChange = (e) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleShippingSubmit = (e) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePaymentSuccess = () => {
    clearCart()
    setStep('cart')
  }

  // ============================================
  // سلة فارغة
  // ============================================
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-[#1e293b] rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-700/50">
            <ShoppingCart size={40} className="text-slate-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Looks like you haven't added anything yet. Explore our products and find something you love!
          </p>
          <Link to="/products" 
            className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-8 py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-[#0ea5e9]/25 inline-flex items-center gap-2">
            <Package size={18} />
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f172a] py-10 px-4">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)}
            className="bg-[#1e293b] hover:bg-[#0ea5e9] text-white p-2.5 rounded-xl transition-all border border-slate-700/50">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <ShoppingCart className="text-[#0ea5e9]" />
              Shopping Cart
            </h1>
            <p className="text-slate-400 mt-1">{totalItems} items • ${total.toFixed(2)}</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-8 max-w-2xl">
          {['cart', 'shipping', 'payment'].map((s, index) => (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                ${step === s ? 'bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/25' : 
                  (['cart', 'shipping', 'payment'].indexOf(step) > index ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-[#1e293b] text-slate-400 border border-slate-700/50')}`}>
                {s === 'cart' && <ShoppingCart size={14} />}
                {s === 'shipping' && <Truck size={14} />}
                {s === 'payment' && <CreditCard size={14} />}
                {s.charAt(0).toUpperCase() + s.slice(1)}
                {['cart', 'shipping', 'payment'].indexOf(step) > index && <CheckCircle size={14} />}
              </div>
              {index < 2 && (
                <div className={`flex-1 h-0.5 rounded-full ${['cart', 'shipping', 'payment'].indexOf(step) > index ? 'bg-[#10b981]' : 'bg-slate-700/50'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left Side - Products */}
          <div className="lg:col-span-2 space-y-4">

            {cartItems.map((item) => (
              <div key={item._id} 
                className="bg-[#1e293b] rounded-2xl border border-slate-700/50 p-4 flex gap-4 hover:border-[#0ea5e9]/30 transition-all group">

                {/* Image */}
                <div className="relative">
                  <img
                    src={item.images?.[0]?.url || "https://via.placeholder.com/100"}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-xl border border-slate-700/50"
                  />
                  <span className="absolute -top-2 -right-2 bg-[#0ea5e9] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                    {item.quantity}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[#38bdf8] text-xs font-medium uppercase">{item.category}</span>
                      <h2 className="text-white font-bold text-lg mt-0.5">{item.title}</h2>
                      <p className="text-slate-400 text-sm mt-1 line-clamp-1">{item.description?.slice(0, 50)}...</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-slate-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-all"
                      title="Remove"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center bg-[#0f172a] rounded-xl border border-slate-700/50 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item._id, -1)}
                        className="w-10 h-10 text-slate-400 hover:text-white hover:bg-[#0ea5e9] transition-all flex items-center justify-center"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, 1)}
                        className="w-10 h-10 text-slate-400 hover:text-white hover:bg-[#0ea5e9] transition-all flex items-center justify-center"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-slate-500 text-xs line-through">${(item.price * 1.2).toFixed(2)}</p>
                      <p className="text-[#D4AF37] text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>

              </div>
            ))}

            {/* Clear Cart */}
            <button
              onClick={() => {
                if (window.confirm('Clear all items?')) clearCart()
              }}
              className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-2 transition-all"
            >
              <Trash2 size={16} />
              Clear Cart
            </button>

          </div>

          {/* Right Side - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#1e293b] rounded-2xl border border-slate-700/50 p-6 sticky top-6">

              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Package className="text-[#0ea5e9]" size={20} />
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-400 text-sm">
                  <span>Items ({totalItems})</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-sm">
                  <span>Shipping</span>
                  <span className="text-[#10b981]">Free</span>
                </div>
                <div className="flex justify-between text-slate-400 text-sm">
                  <span>Tax</span>
                  <span>${(total * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-700/50 pt-3 flex justify-between text-lg font-bold">
                  <span className="text-white">Grand Total</span>
                  <span className="text-[#D4AF37]">${(total * 1.1).toFixed(2)}</span>
                </div>
              </div>

              {/* Step: Cart */}
              {step === 'cart' && (
                <button
                  onClick={() => setStep('shipping')}
                  className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-[#0ea5e9]/25 flex items-center justify-center gap-2"
                >
                  <Truck size={18} />
                  Proceed to Checkout
                </button>
              )}

              {/* Step: Shipping */}
              {step === 'shipping' && (
                <form onSubmit={handleShippingSubmit} className="space-y-3">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                    <MapPin size={16} className="text-[#38bdf8]" />
                    Shipping Address
                  </h3>
                  
                  <div className="space-y-3">
                    <input
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      placeholder="Street Address"
                      required
                      className="w-full bg-[#0f172a] border border-slate-600 text-white placeholder-slate-500 px-4 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none text-sm"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        placeholder="City"
                        required
                        className="w-full bg-[#0f172a] border border-slate-600 text-white placeholder-slate-500 px-4 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none text-sm"
                      />
                      <input
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleShippingChange}
                        placeholder="Country"
                        required
                        className="w-full bg-[#0f172a] border border-slate-600 text-white placeholder-slate-500 px-4 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleShippingChange}
                        placeholder="Zip Code"
                        required
                        className="w-full bg-[#0f172a] border border-slate-600 text-white placeholder-slate-500 px-4 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none text-sm"
                      />
                      <input
                        name="mobileNo"
                        value={shippingInfo.mobileNo}
                        onChange={handleShippingChange}
                        placeholder="Mobile Number"
                        required
                        className="w-full bg-[#0f172a] border border-slate-600 text-white placeholder-slate-500 px-4 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep('cart')}
                      className="flex-1 bg-[#1e293b] hover:bg-slate-700 text-white border border-slate-600 py-3 rounded-xl font-medium transition-all"
                    >
                      Back
                    </button>
                    <button type="submit"
                      className="flex-1 bg-[#0ea5e9] hover:bg-[#0284c7] text-white py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-[#0ea5e9]/25 flex items-center justify-center gap-2">
                      <CreditCard size={16} />
                      Payment
                    </button>
                  </div>
                </form>
              )}

              {/* Step: Payment */}
              {step === 'payment' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <CreditCard size={16} className="text-[#38bdf8]" />
                      Card Payment
                    </h3>
                    <button
                      onClick={() => setStep('shipping')}
                      className="text-sm text-slate-400 hover:text-white transition-all"
                    >
                      Back
                    </button>
                  </div>
                  
                  <Elements stripe={stripePromise}>
                    <PaymentForm
                      total={total * 1.1}
                      cartItems={cartItems}
                      shippingInfo={shippingInfo}
                      onSuccess={handlePaymentSuccess}
                    />
                  </Elements>
                </div>
              )}

              {/* Secure Badge */}
              <div className="mt-4 flex items-center justify-center gap-2 text-slate-500 text-xs">
                <Shield size={14} className="text-[#10b981]" />
                Secure SSL Encryption
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Cart