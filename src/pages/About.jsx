// ============================================
// About.jsx - صفحة من نحن
// ألوان: داكن + أزرق فاتح + ذهبي
// ============================================

import React from 'react'
import { Link } from 'react-router-dom'
import { Store, Truck, Shield, Headphones, Award, Users, Globe, Heart } from 'lucide-react'

const About = () => {
  return (
    <div className="min-h-screen bg-[#0f172a]">

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9]/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          
          <div className="flex justify-center mb-6">
            <img src="/images/logo2.png" alt="Logo" className="h-20 w-auto object-contain" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            About <span className="text-[#D4AF37]">Our Store</span>
          </h1>
          
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            We are a premium e-commerce platform dedicated to providing the best products 
            with exceptional quality and fast delivery worldwide.
          </p>
          
          <div className="flex justify-center gap-4 mt-8">
            <Link to="/products" className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-8 py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-[#0ea5e9]/25">
              Shop Now →
            </Link>
            <Link to="/contact" className="border border-slate-600 hover:border-[#38bdf8] text-slate-300 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all hover:bg-slate-800/50">
              Contact Us
            </Link>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 border-y border-slate-700/50 bg-[#0f172a]/50">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="text-center">
            <div className="w-16 h-16 bg-[#0ea5e9]/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Store className="text-[#0ea5e9]" size={28} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">10K+</h3>
            <p className="text-slate-400 text-sm">Products</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-[#D4AF37]/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="text-[#D4AF37]" size={28} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">50K+</h3>
            <p className="text-slate-400 text-sm">Happy Customers</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-[#38bdf8]/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Globe className="text-[#38bdf8]" size={28} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">30+</h3>
            <p className="text-slate-400 text-sm">Countries</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-[#10b981]/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="text-[#10b981]" size={28} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">5+</h3>
            <p className="text-slate-400 text-sm">Years Experience</p>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Choose <span className="text-[#38bdf8]">Us?</span>
            </h2>
            <p className="text-slate-400">We provide the best shopping experience</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700/50 hover:border-[#0ea5e9]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0ea5e9]/10">
              <div className="w-12 h-12 bg-[#0ea5e9]/15 rounded-xl flex items-center justify-center mb-4">
                <Truck className="text-[#0ea5e9]" size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Fast Delivery</h3>
              <p className="text-slate-400 text-sm">Free shipping on orders over $50. Delivered within 2-5 business days.</p>
            </div>
            
            <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700/50 hover:border-[#0ea5e9]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0ea5e9]/10">
              <div className="w-12 h-12 bg-[#D4AF37]/15 rounded-xl flex items-center justify-center mb-4">
                <Shield className="text-[#D4AF37]" size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Secure Payment</h3>
              <p className="text-slate-400 text-sm">100% secure payment with Stripe. Your data is always protected.</p>
            </div>
            
            <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700/50 hover:border-[#0ea5e9]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0ea5e9]/10">
              <div className="w-12 h-12 bg-[#38bdf8]/15 rounded-xl flex items-center justify-center mb-4">
                <Headphones className="text-[#38bdf8]" size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">24/7 Support</h3>
              <p className="text-slate-400 text-sm">Our customer service team is available around the clock to help you.</p>
            </div>
            
            <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700/50 hover:border-[#0ea5e9]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0ea5e9]/10">
              <div className="w-12 h-12 bg-[#10b981]/15 rounded-xl flex items-center justify-center mb-4">
                <Heart className="text-[#10b981]" size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Quality Guarantee</h3>
              <p className="text-slate-400 text-sm">All products are carefully selected and tested for the highest quality.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-[#0f172a]/50 border-y border-slate-700/50">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Our <span className="text-[#D4AF37]">Team</span>
            </h2>
            <p className="text-slate-400">Meet the people behind our success</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            
            <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700/50 text-center">
              <div className="w-20 h-20 bg-[#0ea5e9]/15 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-[#0ea5e9]" size={32} />
              </div>
              <h3 className="text-lg font-bold text-white">John Doe</h3>
              <p className="text-[#38bdf8] text-sm mb-2">Founder & CEO</p>
              <p className="text-slate-400 text-sm">Visionary leader with 10+ years in e-commerce.</p>
            </div>
            
            <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700/50 text-center">
              <div className="w-20 h-20 bg-[#D4AF37]/15 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-[#D4AF37]" size={32} />
              </div>
              <h3 className="text-lg font-bold text-white">Jane Smith</h3>
              <p className="text-[#38bdf8] text-sm mb-2">Operations Manager</p>
              <p className="text-slate-400 text-sm">Ensuring smooth operations and customer satisfaction.</p>
            </div>
            
            <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700/50 text-center">
              <div className="w-20 h-20 bg-[#38bdf8]/15 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-[#38bdf8]" size={32} />
              </div>
              <h3 className="text-lg font-bold text-white">Mike Johnson</h3>
              <p className="text-[#38bdf8] text-sm mb-2">Tech Lead</p>
              <p className="text-slate-400 text-sm">Building the future of online shopping.</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-[#1e293b] rounded-3xl p-12 border border-slate-700/50 shadow-xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Start <span className="text-[#0ea5e9]">Shopping?</span>
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Join thousands of satisfied customers and discover our premium collection today.
          </p>
          <Link to="/products" className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-10 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-[#0ea5e9]/25 hover:-translate-y-0.5 inline-block">
            Explore Products →
          </Link>
        </div>
      </section>

    </div>
  )
}

export default About