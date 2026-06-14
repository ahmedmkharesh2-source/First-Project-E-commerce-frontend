// ============================================
// Contact.jsx - صفحة التواصل
// ألوان: داكن + أزرق فاتح + ذهبي
// ============================================

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, User, ArrowLeft } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // هنا تقدر تضيف API لإرسال الرسالة
      // await axios.post("http://localhost:8000/api/v1/contact", formData)
      
      console.log("Form submitted:", formData)
      toast.success("Message sent successfully! We'll get back to you soon.")
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a]">

      {/* Header */}
      <section className="bg-[#1e293b] border-b border-slate-700/50 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Contact <span className="text-[#38bdf8]">Us</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Have a question or need help? We're here to assist you. Reach out and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Side - Contact Info */}
          <div className="lg:col-span-1 space-y-6">

            {/* Contact Cards */}
            <div className="bg-[#1e293b] rounded-2xl border border-slate-700/50 p-6 hover:border-[#0ea5e9]/50 transition-all">
              <div className="w-12 h-12 bg-[#0ea5e9]/15 rounded-xl flex items-center justify-center mb-4">
                <Mail className="text-[#0ea5e9]" size={24} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Email Us</h3>
              <p className="text-slate-400 text-sm mb-3">For general inquiries and support</p>
              <a href="mailto:support@store.com" className="text-[#38bdf8] hover:text-[#0ea5e9] transition-colors">
                support@store.com
              </a>
            </div>

            <div className="bg-[#1e293b] rounded-2xl border border-slate-700/50 p-6 hover:border-[#0ea5e9]/50 transition-all">
              <div className="w-12 h-12 bg-[#D4AF37]/15 rounded-xl flex items-center justify-center mb-4">
                <Phone className="text-[#D4AF37]" size={24} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Call Us</h3>
              <p className="text-slate-400 text-sm mb-3">Mon-Fri from 8am to 6pm</p>
              <a href="tel:+15551234567" className="text-[#38bdf8] hover:text-[#0ea5e9] transition-colors">
                +1 (555) 123-4567
              </a>
            </div>

            <div className="bg-[#1e293b] rounded-2xl border border-slate-700/50 p-6 hover:border-[#0ea5e9]/50 transition-all">
              <div className="w-12 h-12 bg-[#10b981]/15 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="text-[#10b981]" size={24} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Visit Us</h3>
              <p className="text-slate-400 text-sm mb-3">Our headquarters location</p>
              <span className="text-[#38bdf8]">
                123 Commerce St, Tech City, TC 12345
              </span>
            </div>

            <div className="bg-[#1e293b] rounded-2xl border border-slate-700/50 p-6 hover:border-[#0ea5e9]/50 transition-all">
              <div className="w-12 h-12 bg-purple-500/15 rounded-xl flex items-center justify-center mb-4">
                <Clock className="text-purple-400" size={24} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Working Hours</h3>
              <p className="text-slate-400 text-sm mb-1">Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p className="text-slate-400 text-sm">Saturday - Sunday: 10:00 AM - 4:00 PM</p>
            </div>

          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#1e293b] rounded-2xl border border-slate-700/50 p-8 shadow-xl">

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#0ea5e9]/15 rounded-xl flex items-center justify-center">
                  <MessageSquare className="text-[#0ea5e9]" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
                  <p className="text-slate-400 text-sm">Fill out the form below and we'll get back to you</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name & Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#38bdf8] mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="w-full bg-[#0f172a] border border-slate-600 text-white placeholder-slate-500 pl-10 pr-4 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#38bdf8] mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="w-full bg-[#0f172a] border border-slate-600 text-white placeholder-slate-500 pl-10 pr-4 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-[#38bdf8] mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                    className="w-full bg-[#0f172a] border border-slate-600 text-white placeholder-slate-500 px-4 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-[#38bdf8] mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    rows="6"
                    required
                    className="w-full bg-[#0f172a] border border-slate-600 text-white placeholder-slate-500 px-4 py-3 rounded-xl focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all outline-none resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-[#0ea5e9] hover:bg-[#0284c7] text-white py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-[#0ea5e9]/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>

                  <Link to="/" className="bg-[#1e293b] hover:bg-slate-700 text-white border border-slate-600 px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2">
                    <ArrowLeft size={18} />
                    Back
                  </Link>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>

      {/* Map Section (Optional) */}
      <section className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#1e293b] rounded-2xl border border-slate-700/50 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Find Us on Map</h2>
            <div className="w-full h-64 bg-[#0f172a] rounded-xl border border-slate-700/50 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="text-[#0ea5e9] mx-auto mb-2" size={32} />
                <p className="text-slate-400">Map integration coming soon</p>
                <p className="text-slate-500 text-sm">123 Commerce St, Tech City, TC 12345</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Contact