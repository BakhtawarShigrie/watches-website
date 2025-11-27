"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

// --- NAVBAR & FOOTER CONSTANTS (Reused from Home) ---
const categoriesData = [
  { name: "11.11 Sale", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=300&auto=format&fit=crop" },
  { name: "Men Formal", image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=300&auto=format&fit=crop" },
  { name: "Men Sports", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=300&auto=format&fit=crop" },
  { name: "Female Fancy", image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=300&auto=format&fit=crop" },
  { name: "Female Bracelets", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=300&auto=format&fit=crop" },
  { name: "Smart Watches", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=300&auto=format&fit=crop" },
  { name: "Couple Watches", image: "https://images.unsplash.com/photo-1622434641406-a15810545182?q=80&w=300&auto=format&fit=crop" },
];

// --- PRODUCT PAGE DATA ---

// Brands for Top Slider
const brands = [
  "All",
  "VOGUE",
  "CASIO EDIFICE",
  "CASIO G-SHOCK",
  "GC",
  "GUESS",
  "MOVADO",
  "RAY-BAN"
];

// Sidebar Filter Options
const sidebarFilters = [
  "PRICE",
  "GENDER",
  "PRODUCTS",
  "WATCHES CATEGORY",
  "BRANDS",
  "CASE MATERIAL",
  "CASE SHAPE",
  "CASE SIZE",
  "STRAP / BRACELET",
  "FEATURE",
  "MOVEMENT"
];

// Mock Products Data
const productsData = [
  {
    id: 1,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – EFR-539DE-2AVUDF",
    price: 51500,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop", // Blue/Silver
    isNew: true,
  },
  {
    id: 2,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – EFR-539DE-3AVUDF",
    price: 51500,
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=600&auto=format&fit=crop", // Green/Silver
    isNew: true,
  },
  {
    id: 3,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – EFR-539DE-8AVUDF",
    price: 51500,
    image: "https://images.unsplash.com/photo-1622434641406-a15810545182?q=80&w=600&auto=format&fit=crop", // Grey/Silver
    isNew: true,
  },
  {
    id: 4,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – EFR-S108DE-2AVUDF",
    price: 47500,
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=600&auto=format&fit=crop", // White/Silver
    isNew: true,
  },
  {
    id: 5,
    brand: "CASIO G-SHOCK",
    name: "G-Shock Rugged – GA-2100",
    price: 35000,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&auto=format&fit=crop", // Black
    isNew: false,
  },
  {
    id: 6,
    brand: "GUESS",
    name: "Guess Gold Plated",
    price: 65000,
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=600&auto=format&fit=crop", // Gold
    isNew: true,
  },
  {
    id: 7,
    brand: "MOVADO",
    name: "Movado Museum Classic",
    price: 120000,
    image: "https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=600&auto=format&fit=crop", // Black/Gold
    isNew: false,
  },
  {
    id: 8,
    brand: "RAY-BAN",
    name: "Aviator Classic",
    price: 45000,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop", // Sunglasses
    isNew: true,
  },
];

export default function ProductsPage() {
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortOption, setSortOption] = useState("default"); // default, lowToHigh, highToLow
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...productsData];

    // Filter by Brand
    if (selectedBrand !== "All") {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    // Sort
    if (sortOption === "lowToHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      result.sort((a, b) => b.price - a.price);
    } 
    // "default" doesn't change order (or could be by id)

    return result;
  }, [selectedBrand, sortOption]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white min-h-screen font-sans text-[#333]">
      
      {/* ================= NAVBAR (Copied from Home) ================= */}
      <header className="bg-black text-white w-full z-50 flex items-center justify-between px-6 py-4 md:px-12 sticky top-0">
        <Link href="/" className="text-lg font-bold tracking-[0.15em] uppercase">
          Watches
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-300 uppercase tracking-widest">
          <Link href="/" className="hover:text-white transition-colors">Watches</Link>
          <Link href="#" className="hover:text-white transition-colors">Accessories</Link>
          <Link href="#" className="hover:text-white transition-colors">World of Watches</Link>
        </nav>
        <div className="flex items-center gap-5 text-zinc-200">
          <button className="hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 5.197 5.197Z" />
            </svg>
          </button>
          <button className="hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A7.5 7.5 0 0 1 4.501 20.118Z" />
            </svg>
          </button>
          <button className="hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </button>
        </div>
      </header>

      {/* ================= PAGE CONTENT ================= */}
      
      {/* --- Top Brand Slider --- */}
      <div className="bg-[#f9f9f9] py-4 border-b border-gray-200">
        {/* Added classes to hide scrollbar: [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] */}
        <div className="container mx-auto px-4 flex items-center justify-start md:justify-center gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Left Arrow (Hidden on small mobile for simpler UX, visible md+) */}
          <button className="hidden md:flex w-8 h-8 flex-shrink-0 rounded-full bg-white shadow-sm items-center justify-center text-gray-400 hover:text-black">
            ‹
          </button>
          
          <div className="flex gap-3">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                  selectedBrand === brand
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-500 border-transparent hover:bg-gray-200"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Right Arrow (Hidden on small mobile for simpler UX, visible md+) */}
          <button className="hidden md:flex w-8 h-8 flex-shrink-0 rounded-full bg-white shadow-sm items-center justify-center text-gray-400 hover:text-black">
            ›
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* --- Breadcrumb & Sorting Header --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          
          {/* Breadcrumb */}
          <div className="text-xs text-gray-500 font-medium">
            <Link href="/" className="hover:text-black">Home</Link>
            <span className="mx-2">›</span>
            <span>Watches</span>
            <span className="mx-2">›</span>
            <span>Mens Watches</span>
            <span className="mx-2">›</span>
            <span className="text-black font-bold">{selectedBrand === 'All' ? 'All Products' : selectedBrand}</span>
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-6">
             {/* Mobile Filter Button (Visible only on lg and below) */}
             <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 text-sm font-bold text-black uppercase tracking-wider border border-gray-300 px-4 py-2 rounded-sm"
             >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                </svg>
                Filters
             </button>

            {/* Sorting & Count */}
            <div className="flex items-center gap-6 text-sm ml-auto md:ml-0">
                <span className="text-gray-500 font-medium hidden sm:inline-block">{filteredProducts.length} Total Products</span>
                <div className="relative group">
                <select 
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="appearance-none bg-transparent border-none font-bold text-black focus:ring-0 cursor-pointer pr-6"
                >
                    <option value="default">Default Sorting</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                </select>
                {/* Custom Arrow */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 relative">
          
          {/* --- MOBILE SIDEBAR BACKDROP --- */}
          {/* Gray overlay when sidebar is open */}
          <div 
            className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
                isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          {/* --- SIDEBAR (Left) --- */}
          {/* Using transform translate to slide in/out on mobile */}
          <aside 
            className={`fixed top-0 left-0 h-full w-[80%] max-w-xs bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto lg:w-64 lg:shadow-none lg:z-auto ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Mobile Sidebar Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200 lg:hidden">
                <span className="text-sm font-bold uppercase tracking-widest text-black">Filters</span>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Filter Content */}
            <div className="h-[calc(100%-130px)] overflow-y-auto lg:h-auto lg:overflow-visible p-5 lg:p-0">
                <div className="lg:border-t lg:border-gray-200">
                {sidebarFilters.map((filter, index) => (
                    <div key={index} className="border-b border-gray-200 py-4 group cursor-pointer">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-black uppercase tracking-wider">{filter}</span>
                        <svg className="w-3 h-3 text-black transform group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    {/* Expanded content placeholder specifically for 'Products' or 'Category' to mimic user request */}
                    {filter === "WATCHES CATEGORY" && (
                        <div className="mt-3 pl-2 space-y-2">
                            {categoriesData.map((cat, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <div className="w-3 h-3 border border-gray-300 rounded-sm"></div>
                                    <span className="text-xs text-gray-600 hover:text-black">{cat.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    </div>
                ))}
                </div>
            </div>

            {/* Mobile View Results Button */}
            <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-200 bg-white lg:hidden">
                <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="w-full bg-black text-white text-xs font-bold uppercase tracking-widest py-3 rounded-sm hover:bg-gray-800 transition-colors"
                >
                    View Results
                </button>
            </div>
          </aside>

          {/* --- MAIN PRODUCT GRID (Right) --- */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Link href={`/product/${product.id}`} key={product.id} className="group cursor-pointer block">
                    <div className="relative w-full aspect-[4/5] bg-gray-50 mb-4 overflow-hidden border border-gray-100 rounded-sm">
                      {/* New Badge */}
                      {product.isNew && (
                        <span className="absolute top-2 right-2 bg-[#49a010] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase z-10">
                          New
                        </span>
                      )}
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill 
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="text-center">
                      <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{product.brand}</h4>
                      <h3 className="text-sm font-medium text-black leading-snug mb-2 px-2">{product.name}</h3>
                      <div className="text-sm font-bold text-gray-900">
                        Rs {product.price.toLocaleString()}
                      </div>
                      <div className="text-[9px] text-gray-400 uppercase mt-1">inc. GST</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500">No products found for this category.</p>
                <button onClick={() => setSelectedBrand("All")} className="mt-4 text-black underline text-sm">View All Products</button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ================= FOOTER (Copied from Home) ================= */}
      <footer className="bg-[#f9f9f9] text-[#333] pt-16 pb-8 font-sans border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4">
            {/* Top Footer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                {/* HELP */}
                <div>
                    <h3 className="font-bold text-sm uppercase mb-6 tracking-wider">Help</h3>
                    <ul className="space-y-4 text-sm text-gray-600">
                        <li><Link href="#" className="hover:text-black transition-colors">About Us</Link></li>
                        <li><Link href="#" className="hover:text-black transition-colors">Contact Us</Link></li>
                        <li><Link href="#" className="hover:text-black transition-colors">Terms & Conditions</Link></li>
                        <li><Link href="#" className="hover:text-black transition-colors">Returns & Exchanges</Link></li>
                        <li><Link href="#" className="hover:text-black transition-colors">Shipping & Delivery</Link></li>
                        <li><Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* INFORMATION */}
                <div>
                    <h3 className="font-bold text-sm uppercase mb-6 tracking-wider">Information</h3>
                    <ul className="space-y-4 text-sm text-gray-600">
                        <li><Link href="#" className="hover:text-black transition-colors">Store Location</Link></li>
                        <li><Link href="#" className="hover:text-black transition-colors">Gift Card</Link></li>
                        <li><Link href="#" className="hover:text-black transition-colors">Orders Tracking</Link></li>
                        <li><Link href="#" className="hover:text-black transition-colors">FAQs</Link></li>
                    </ul>
                </div>

                {/* ACCOUNT */}
                <div>
                    <h3 className="font-bold text-sm uppercase mb-6 tracking-wider">Account</h3>
                    <ul className="space-y-4 text-sm text-gray-600">
                        <li><Link href="#" className="hover:text-black transition-colors">Login / Register</Link></li>
                        <li><Link href="#" className="hover:text-black transition-colors">Wishlist</Link></li>
                        <li><Link href="#" className="hover:text-black transition-colors">Cart</Link></li>
                        <li><Link href="#" className="hover:text-black transition-colors">Checkout</Link></li>
                    </ul>
                </div>

                {/* CATEGORIES */}
                <div>
                    <h3 className="font-bold text-sm uppercase mb-6 tracking-wider">Categories</h3>
                    <ul className="space-y-4 text-sm text-gray-600">
                        <li><Link href="#" className="hover:text-black transition-colors">Watches</Link></li>
                        <li><Link href="#" className="hover:text-black transition-colors">Eyewear</Link></li>
                        <li><Link href="#" className="hover:text-black transition-colors">Brands</Link></li>
                        <li><Link href="#" className="hover:text-black transition-colors">Accessories</Link></li>
                        <li><Link href="#" className="text-[#d95e00] hover:text-red-700 transition-colors">Sale</Link></li>
                    </ul>
                </div>

                {/* SUBSCRIBE & FOLLOW US */}
                <div className="lg:col-span-1">
                    <h3 className="font-bold text-sm uppercase mb-6 tracking-wider">Subscribe & Follow Us</h3>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                        Get the latest updates on promotions, new products, much more.
                    </p>
                    <div className="flex items-center gap-4">
                        {/* Facebook Icon */}
                        <Link href="#" className="text-gray-500 hover:text-black transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"/></svg>
                        </Link>
                        {/* Instagram Icon */}
                        <Link href="#" className="text-gray-500 hover:text-black transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z"/></svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 mb-8"></div>

            {/* Bottom Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Logo */}
                <div className="bg-black text-white px-4 py-2 font-serif text-xl tracking-widest border border-black cursor-pointer">
                    LifeStyle <span className="block text-[8px] text-center tracking-[0.2em] -mt-1 text-gray-300">COLLECTION</span>
                </div>

                {/* Copyright */}
                <div className="text-xs text-gray-500 text-center md:text-left">
                    Copyright 2024 Lifestyle Collection all rights reserved.
                </div>

                {/* Payment Icons & Scroll Top */}
                <div className="flex items-center gap-4">
                    <div className="flex gap-2 opacity-60 grayscale hover:grayscale-0 transition-all cursor-default">
                        {/* Simulated Payment Icons using Text */}
                       <span className="text-xs font-bold text-blue-900">VISA</span>
                       <span className="text-[10px] font-bold text-gray-600 border border-gray-400 px-1 rounded-sm">CASH ON DELIVERY</span>
                       <span className="text-xs font-bold text-red-600">UnionPay</span>
                       <span className="text-[10px] font-bold text-gray-600 border border-gray-400 px-1 rounded-sm">BANK TRANSFER</span>
                       <span className="text-xs font-bold text-orange-600">MasterCard</span>
                    </div>
                    
                    {/* Scroll Top Button */}
                    <button onClick={scrollToTop} className="bg-[#666] hover:bg-[#444] text-white w-10 h-10 flex items-center justify-center rounded-sm transition-colors shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
      </footer>

       {/* Floating Chat Button */}
       <button className="fixed bottom-6 right-6 z-50 h-12 w-12 bg-[#1a1a1a] rounded-full flex items-center justify-center hover:bg-[#333] transition-colors shadow-xl border border-zinc-800/50">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
       </button>

    </div>
  );
}