import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
  <CartProvider>
    <App />
  </CartProvider>
  </StrictMode>
  </BrowserRouter>,
)
