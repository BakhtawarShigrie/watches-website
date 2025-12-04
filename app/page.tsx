"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext, ExtendedProduct } from "@/context/GlobalContext";
import { heroBgImage, adBgImage } from "@/app/website-data";

export default function Home() {
  const { 
    products, 
    categories, 
    featuredCollections, 
    newsArticles, 
    faqs,
    featuredProducts, // Use specific lists from Context
    lovedProducts     // Use specific lists from Context
  } = useGlobalContext();

  const [showAll, setShowAll] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const visibleCount = showAll ? faqs.length : 4;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to render Product Badge
  const renderProductBadge = (product: ExtendedProduct) => {
    if (product.stock === 0) {
      return (
        <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">
          Out of Stock
        </span>
      );
    }
    if (product.isNew) {
      return (
        <span className="absolute top-2 left-2 z-10 bg-[#49a010] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">
          New
        </span>
      );
    }
    return (
      <span className="absolute top-2 left-2 z-10 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">
        In Stock
      </span>
    );
  };

  return (
    <main className="relative min-h-screen w-full bg-white font-sans text-[#333]">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen w-full overflow-hidden bg-black text-white">
        <header className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-6 md:px-12">
          <div className="text-lg font-bold tracking-[0.15em] uppercase">Watches</div>
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-300 uppercase tracking-widest">
            <Link href="#featuredProducts" className="hover:text-white transition-colors">Watches</Link>
            <Link href="/Products" className="hover:text-white transition-colors">Products</Link>
            <Link href="#" className="hover:text-white transition-colors">World of Watches</Link>
          </nav>
          <div className="flex items-center gap-5 text-zinc-200">
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
        <div className="absolute inset-0 z-0">
          <Image src={heroBgImage} alt="Hero" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="absolute bottom-15 left-6 md:left-12 z-20 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300 mb-4">Current Favorites</p>
          <h1 className="text-2xl md:text-3xl font-semibold leading-tight w-80 md:w-100 mb-8 text-white">The Seamaster Diver 300M 42 mm, Steel on Steel</h1>
          <Link href="Products">
          <button className="px-8 py-3 border cursor-pointer border-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-white hover:text-black transition-all duration-300">Discover now</button>
          </Link>
        </div>
        <div className="absolute bottom-10 right-6 md:right-12 z-20 flex items-center justify-end">
          <div className="flex items-center gap-4 cursor-pointer group">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-300 group-hover:text-white transition-colors">Next slide</span>
            <div className="h-[2px] w-24 bg-zinc-600 overflow-hidden relative">
              <div className="absolute left-0 top-0 h-full w-1/3 bg-white"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCT CATEGORIES ================= */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 lg:mx-40 gap-8 place-items-center">
            {categories.map((category, index) => (
              <div key={index} className="group flex flex-col items-center gap-4 cursor-pointer">
                <div className="relative w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-110 ">
                  <Image src={category.image} alt={category.name} fill className="object-cover" />
                  {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" /> */}
                </div>
                <span className="text-sm font-semibold text-gray-800 text-center tracking-wide group-hover:text-black">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section id="featuredProducts" className="bg-white py-10 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-gray-400 tracking-[0.2em] uppercase mb-3">New Arrivals</p>
            <h2 className="text-4xl font-bold text-black mb-8">Featured Products</h2>
            <div className="flex justify-center items-center gap-8 text-sm font-medium tracking-widest uppercase">
              <button className="text-black border-b-2 border-black pb-1">Watches</button>
              <button className="text-gray-400 hover:text-black transition-colors pb-1 border-b-2 border-transparent hover:border-gray-200">Eyewear</button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
            {featuredProducts.slice(0, 5).map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="flex flex-col items-center text-center group cursor-pointer block">
                <div className="relative w-full h-[300px] mb-6 overflow-hidden">
                  {/* BADGE ADDED HERE */}
                  {renderProductBadge(product)}
                  
                  <Image src={product.image} alt={product.name} fill className="object-contain transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <h3 className="text-sm font-bold text-black uppercase tracking-wider">{product.brand}</h3>
                  <p className="text-xs text-gray-500 font-light leading-relaxed max-w-[200px]">{product.name}</p>
                  <div className="flex items-center gap-3 mt-2">
                    {product.originalPrice && (
                        <span className="text-xs text-orange-600 line-through font-medium">Rs {product.originalPrice.toLocaleString()}</span>
                    )}
                    <span className="text-sm text-black font-bold">Rs {product.price.toLocaleString()}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wide">inc. GST</span>
                </div>
              </Link>
            ))}
          </div>
          {/* View All Products Button */}
          <div className="mt-12 text-center">
            <Link href="/Products">
              <button className="bg-[#1a1a1a] cursor-pointer text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#333] transition-colors rounded-sm shadow-md">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURED COLLECTION ================= */}
      <section className="bg-white py-20 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-xs font-bold text-gray-400 tracking-[0.25em] uppercase mb-3">DISCOVER</p>
            <h2 className="text-4xl font-bold text-black mb-6">Featured Collection</h2>
            <p className="text-sm text-gray-500 leading-relaxed font-light">
              Our brand was built on our passion and love for what we do – browse our featured categories for our most popular pieces.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCollections.map((item, index) => (
              <div key={index} className="flex flex-col group cursor-pointer">
                <div className="relative w-full h-[400px] overflow-hidden bg-gray-100">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="pt-8 text-center px-4">
                  <h3 className="text-lg font-bold text-black mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed mb-6 max-w-xs mx-auto">{item.description}</p>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black hover:text-gray-600 transition-colors">
                    Shop The Collection <span className="text-base">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LOVED PRODUCTS ================= */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-xs font-bold text-gray-400 tracking-[0.25em] uppercase mb-3">DISCOVER</p>
            <h2 className="text-4xl font-bold text-black mb-6">Loved Products</h2>
            <p className="text-sm text-gray-500 leading-relaxed font-light">
              Our brand was built on our passion and love for what we do – browse our featured categories for our most popular pieces.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {lovedProducts.slice(0, 3).map((item) => (
              // REVERTED HEIGHT TO 500px
              <Link href={`/product/${item.id}`} key={item.id} className="relative group cursor-pointer h-[500px] w-full bg-gray-100 overflow-hidden block">
                {/* BADGE ADDED HERE */}
                {renderProductBadge(item)}

                {/* USING ACTUAL PRODUCT IMAGE AS BACKGROUND */}
                <Image 
                    src={item.thumbnail ? item.thumbnail : item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-sm flex items-center gap-4 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative w-12 h-12 flex-shrink-0 bg-gray-50 rounded-sm overflow-hidden">
                    {/* Small thumbnail uses the custom image if available */}
                    <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-contain" 
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{item.brand}</h4>
                    <h3 className="text-sm font-semibold text-black">{item.name}</h3>
                    <p className="text-xs font-bold text-gray-800 mt-1">Rs. {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex-shrink-0 text-gray-400 group-hover:text-black transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ADVERTISEMENT SECTION ================= */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <Image 
          src={adBgImage} 
          alt="Dark Side of the Moon Watch" 
          fill 
          className="object-cover object-center" 
          priority 
        />
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-16">
          <div className="text-white/80 text-xs font-bold uppercase tracking-widest mt-4">Speedmaster</div>
          <div className="max-w-lg mb-8">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">Dark Side of the Moon</h2>
            <p className="text-white/80 text-sm md:text-base mb-8 leading-relaxed font-light">
              Honouring OMEGA&apos;s legacy of space exploration, this Speedmaster Dark Side of the Moon features a 44.25 mm case in polished-brushed black ceramic.
            </p>
            <button className="bg-[#D4B07B] text-black px-8 py-3.5 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-[#c29e6b] transition-colors duration-300">
              Explore the Collection
            </button>
          </div>
        </div>
      </section>

      {/* ================= NEWS / MAGAZINE SECTION ================= */}
      <section className="bg-white py-24 border-b border-gray-100">
        <div className="container mx-auto px-4">
          
          {/* Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-xs font-bold text-gray-400 tracking-[0.25em] uppercase mb-3">LIFESTYLE COLLECTION</p>
            <h2 className="text-4xl font-bold text-black mb-6">Magazine & Press</h2>
            <p className="text-sm text-gray-500 leading-relaxed font-light">
              Updated monthly, follow the lifestyle collection blog for everything you want to know about watches & Eyewear.
            </p>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {newsArticles.map((article, index) => (
              <div key={index} className="flex flex-col group cursor-pointer text-center">
                {/* Image */}
                <div className="relative w-full h-[250px] overflow-hidden mb-6">
                  <Image 
                    src={article.image} 
                    alt={article.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* Content */}
                <h3 className="text-base font-semibold text-black mb-3 px-4 leading-snug group-hover:text-gray-600 transition-colors">
                  {article.title}
                </h3>
                
                <div className="flex items-center justify-center gap-3 text-xs text-gray-400 font-light mb-6">
                  <span>{article.category}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{article.date}</span>
                </div>

                {/* Link */}
                <div className="inline-block relative">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black pb-1 border-b border-black group-hover:text-gray-600 group-hover:border-gray-600 transition-all">
                    CONTINUE READING...
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="bg-[#f0f2eb] py-24 text-[#1a1a1a]">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#1a1a1a] mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-light">
              Find quick answers to your questions in our comprehensive FAQ section.
            </p>
          </div>

          {/* FAQ List */}
          <div className="relative">
            <div className="border-t border-gray-300">
              {faqs.slice(0, visibleCount).map((faq, index) => {
                const isLastVisible = !showAll && index === 3;
                
                return (
                  <div 
                    key={index} 
                    className={`border-b border-gray-300 transition-all duration-300 ${isLastVisible ? 'opacity-30 blur-[1px] pointer-events-none' : ''}`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full py-6 flex justify-between items-center text-left hover:text-gray-600 transition-colors focus:outline-none"
                    >
                      <span className="text-lg md:text-xl font-serif text-[#1a1a1a]">
                        {faq.question}
                      </span>
                      <span className="text-2xl font-light text-gray-500 ml-4">
                        {openIndex === index ? "−" : "+"}
                      </span>
                    </button>
                    
                    {/* Dropdown Content */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openIndex === index ? "max-h-40 opacity-100 pb-6" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-gray-600 font-light leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Show More Button Overlay */}
            {!showAll && (
              <div className="absolute bottom-0 left-0 w-full pt-10 pb-2 bg-gradient-to-t from-[#f0f2eb] to-transparent flex justify-start pl-0">
                <button
                  onClick={() => setShowAll(true)}
                  className="bg-[#dcdccf] hover:bg-[#cfcfc2] text-[#1a1a1a] px-8 py-3 text-sm font-medium transition-colors rounded-sm"
                >
                  Show More
                </button>
              </div>
            )}
          </div>
          
          {/* Show Less Button */}
          {showAll && (
             <div className="mt-8">
                <button
                  onClick={() => setShowAll(false)}
                  className="bg-[#dcdccf] hover:bg-[#cfcfc2] text-[#1a1a1a] px-8 py-3 text-sm font-medium transition-colors rounded-sm"
                >
                  Show Less
                </button>
             </div>
          )}

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#f9f9f9] text-[#333] pt-16 pb-8 font-sans border-t border-gray-200">
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0-3-3Z"/></svg>
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

    </main>
  );
}