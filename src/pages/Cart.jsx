import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from '../components/PaymentForm'



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

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

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

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
        <Link to="/" className="btn btn-primary">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">My Cart ({cartItems.length})</h1>

      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div key={item._id} className="flex items-center gap-4 bg-base-200 p-4 rounded-xl shadow">
            <img
              src={item.images[0]?.url}
              alt={item.title}
              className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
            />

            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-500 text-sm">{item.category}</p>
              <p className="text-green-600 font-semibold mt-1">
                Rs {item.price * item.quantity}
              </p>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item._id, -1)}
                className="btn btn-sm btn-outline w-8 h-8 p-0 text-lg"
              >
                −
              </button>
              <span className="w-6 text-center font-semibold">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item._id, 1)}
                className="btn btn-sm btn-outline w-8 h-8 p-0 text-lg"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item._id)}
              className="btn btn-error btn-sm text-white"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Elements stripe={stripePromise}>
          <div className="bg-base-200 p-6 rounded-xl shadow w-full max-w-sm">
            <h2 className="text-xl font-bold mb-2">Order Summary</h2>
            <div className="flex justify-between text-gray-600 mb-1">
              <span>Items</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-4">
              <span>Total Quantity</span>
              <span>{cartItems.reduce((s, i) => s + i.quantity, 0)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-3">
              <span>Grand Total</span>
              <span className="text-green-600">Rs {total.toLocaleString()}</span>
            </div>

            {step === 'cart' && (
              <button
                onClick={() => setStep('shipping')}
                className="btn btn-primary w-full mt-4"
              >
                Proceed to Checkout
              </button>
            )}

            {step === 'shipping' && (
              <form onSubmit={handleShippingSubmit} className="mt-4 flex flex-col gap-3">
                <h3 className="font-semibold text-base">Shipping Info</h3>
                <input
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                  placeholder="Address"
                  required
                  className="input input-bordered w-full text-sm"
                />
                <input
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleShippingChange}
                  placeholder="City"
                  required
                  className="input input-bordered w-full text-sm"
                />
                <input
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleShippingChange}
                  placeholder="Country"
                  required
                  className="input input-bordered w-full text-sm"
                />
                <input
                  name="zipCode"
                  value={shippingInfo.zipCode}
                  onChange={handleShippingChange}
                  placeholder="Zip Code"
                  required
                  className="input input-bordered w-full text-sm"
                />
                <input
                  name="mobileNo"
                  value={shippingInfo.mobileNo}
                  onChange={handleShippingChange}
                  placeholder="Mobile No"
                  required
                  className="input input-bordered w-full text-sm"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="btn btn-outline btn-sm flex-1"
                  >
                    Back
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm flex-1">
                    Continue to Payment
                  </button>
                </div>
              </form>
            )}

            {step === 'payment' && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-base">Card Details</h3>
                  <button
                    onClick={() => setStep('shipping')}
                    className="text-sm text-gray-500 hover:text-gray-800"
                  >
                    Back
                  </button>
                </div>
                <PaymentForm
                  total={total}
                  cartItems={cartItems}
                  shippingInfo={shippingInfo}
                  onSuccess={handlePaymentSuccess}
                />
              </div>
            )}
          </div>
        </Elements>
      </div>
    </div>
  )
}

export default Cart