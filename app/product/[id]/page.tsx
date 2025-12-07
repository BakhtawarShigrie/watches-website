"use client";

import { useState, use, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext, ExtendedProduct } from "@/context/GlobalContext";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params
  const { id } = use(params);
  const productId = parseInt(id);

  // Use Global Context
  const { products, featuredProducts, lovedProducts, addToCart, cart, setIsCartOpen } = useGlobalContext();
  
  // Merge all products to find the correct one
  const allProducts = [...products, ...featuredProducts, ...lovedProducts];
  const product = allProducts.find((p) => p.id === productId);

  // Related products
  const relatedProducts = products.filter(p => p.id !== productId).slice(0, 4);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Silver");

  // --- ZOOM STATE ---
  const [zoom, setZoom] = useState({ x: 0, y: 0, show: false });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Scroll To Top Helper
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!product) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-black">
            Product Not Found
        </div>
    );
  }

  // Define mainImage
  const mainImage = product.image;
  const isOutOfStock = !product.stock || product.stock === 0;

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (isOutOfStock) return;
    if (type === "inc") {
      setQuantity(quantity + 1);
    } else {
      if (quantity > 1) setQuantity(quantity - 1);
    }
  };

  // WhatsApp Logic
  const handleSingleProductWhatsApp = () => {
    const phoneNumber = "923264555275";
    const deliveryCharges = 300;
    const total = (product.price * quantity) + deliveryCharges;

    let message = "👋 *Hi, I want to order this specific product:*\n\n";
    message += `🛒 *Product:* ${product.name}\n`;
    message += `🔢 *Quantity:* ${quantity}\n`;
    message += `🎨 *Color:* ${selectedColor}\n`;
    message += `💰 *Price:* Rs. ${(product.price * quantity).toLocaleString()}\n`;
    message += `🚚 *Delivery Charges:* Rs. 300\n`;
    message += `-----------------------------\n`;
    message += `💵 *Total Payable:* Rs. ${total.toLocaleString()}\n\n`;
    message += "ℹ️ *Note:* I agree to pay delivery charges in advance.\n";
    message += "Please confirm my order.";

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Product Badge Helper
  const renderProductBadge = (prod: ExtendedProduct) => {
    if (!prod.stock || prod.stock === 0) {
      return <span className="absolute top-2 right-2 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">Out of Stock</span>;
    }
    if (prod.isNew) {
      return <span className="absolute top-2 right-2 z-10 bg-[#49a010] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">New</span>;
    }
    return <span className="absolute top-2 right-2 z-10 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">In Stock</span>;
  };

  // --- ZOOM HANDLERS ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    
    // Calculate percentage position
    let x = ((e.pageX - left) / width) * 100;
    let y = ((e.pageY - window.scrollY - top) / height) * 100;

    // Bounds check
    if (x < 0) x = 0; if (x > 100) x = 100;
    if (y < 0) y = 0; if (y > 100) y = 100;

    setZoom({ x, y, show: true });
  };

  const handleMouseLeave = () => {
    setZoom({ ...zoom, show: false });
  };

  return (
    <div className="bg-white min-h-screen font-sans text-[#333]">
      {/* ================= NAVBAR ================= */}
      <header className="bg-black text-white w-full z-50 flex items-center justify-between px-6 py-4 md:px-12 sticky top-0">
        <Link href="/" className="text-lg font-bold tracking-[0.15em] uppercase">
          Nayab Watches
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-300 uppercase tracking-widest">
          <Link href="/" className="hover:text-white transition-colors">Watches</Link>
          <Link href="/Products" className="hover:text-white transition-colors">Products</Link>
          <Link href="#" className="hover:text-white transition-colors">Accessories</Link>
        </nav>
        <div className="flex items-center gap-5 text-zinc-200">
          <div className="flex gap-4">
             <button><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 5.197 5.197Z" /></svg></button>
             
             {/* CART ICON */}
             <button onClick={() => setIsCartOpen(true)} className="relative hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
                {cart.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                        {cart.length}
                    </span>
                )}
             </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <div className="container mx-auto px-4 py-8">
        
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 font-medium mb-8">
            <Link href="/" className="hover:text-black">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/Products" className="hover:text-black">Watches</Link>
            <span className="mx-2">›</span>
            <span className="text-black font-bold">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-24">
            
            {/* --- LEFT: IMAGES (With Zoom) --- */}
            <div className="w-full lg:w-1/2 flex flex-col items-center">
                
                {/* Image Container with Zoom */}
                <div 
                    ref={imageContainerRef}
                    className="relative w-full max-w-[450px] aspect-[0.8] bg-gray-50 border border-gray-100 rounded-sm overflow-hidden mb-4 cursor-crosshair group"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    {isOutOfStock && (
                        <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-[2px]">
                            <span className="bg-red-600 text-white px-6 py-2 text-lg font-bold uppercase tracking-widest shadow-lg -rotate-12 border-2 border-white">
                                Out of Stock
                            </span>
                        </div>
                    )}
                    
                    {/* Main Image */}
                    <Image 
                        src={mainImage} 
                        alt={product.name} 
                        fill 
                        className={`object-cover ${isOutOfStock ? "grayscale opacity-75" : ""}`}
                        priority
                    />

                    {/* Magnifying Glass Lens */}
                    {zoom.show && !isOutOfStock && (
                        <div 
                            className="absolute pointer-events-none w-32 h-32 rounded-full border-2 border-gray-200 bg-white shadow-2xl z-20"
                            style={{
                                top: `${zoom.y}%`,
                                left: `${zoom.x}%`,
                                transform: 'translate(-50%, -50%)',
                                backgroundImage: `url(${mainImage})`,
                                backgroundPosition: `${zoom.x}% ${zoom.y}%`,
                                backgroundSize: '500%', // 5x Zoom
                                backgroundRepeat: 'no-repeat'
                            }}
                        ></div>
                    )}
                </div>

                {/* Thumbnails */}
                <div className="flex gap-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 border border-black cursor-pointer relative">
                        <Image src={product.image} alt="thumb1" fill className="object-cover" />
                    </div>
                    {product.images && product.images.length > 0 && product.images.map((img, idx) => (
                        <div key={idx} className="w-16 h-16 md:w-20 md:h-20 border border-gray-200 cursor-pointer relative opacity-60 hover:opacity-100">
                            <Image src={img} alt={`thumb${idx}`} fill className="object-cover" />
                        </div>
                    ))}
                </div>
            </div>

            {/* --- RIGHT: DETAILS --- */}
            <div className="w-full lg:w-1/2">
                <h1 className="text-3xl md:text-4xl font-serif text-[#1a1a1a] mb-2">
                    {product.name}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-[#D4B07B] text-sm">{"★".repeat(5)}</div>
                    <span className="text-xs text-gray-500">({product.reviews || 0} reviews)</span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-[#8B1A1A]">Rs. {product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                        <>
                            <span className="text-lg text-gray-400 line-through decoration-1">Rs. {product.originalPrice.toLocaleString()}</span>
                            <span className="bg-[#8B1A1A] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">-{discountPercentage}%</span>
                        </>
                    )}
                </div>

                {/* STOCK STATUS */}
                <div className="flex items-center gap-2 mb-6">
                    <div className={`w-2 h-2 rounded-full ${isOutOfStock ? "bg-red-500" : "bg-green-500 animate-pulse"}`}></div>
                    <span className={`text-xs font-medium ${isOutOfStock ? "text-red-600" : "text-green-600"}`}>
                        {isOutOfStock ? "Currently unavailable" : `${product.stock} items in stock`}
                    </span>
                </div>

                <div className="border-b border-gray-200 pb-2 mb-4">
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">DESCRIPTION</h3>
                </div>
                <p className="text-sm text-gray-600 font-light leading-relaxed mb-6">
                    {product.description || "No description available."}
                </p>
                <div className="text-sm text-gray-700 space-y-1 mb-8">
                    <p><span className="font-bold">Brand:</span> {product.brand}</p>
                    <p><span className="font-bold">Category:</span> {product.category || "General"}</p>
                </div>

                {/* Color Selection */}
                <div className="mb-6">
                    <span className="text-sm font-bold text-black block mb-2">Color</span>
                    <div className="flex gap-3">
                        {['Silver', 'Black', 'Gold'].map(color => (
                            <button 
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                disabled={isOutOfStock}
                                className={`px-4 py-2 text-xs border rounded-sm transition-all ${
                                    selectedColor === color 
                                    ? 'bg-black text-white border-black' 
                                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                                } ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                {color}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-8">
                    <span className="text-sm font-bold text-black block mb-2">Quantity</span>
                    <div className={`flex items-center border border-gray-300 w-max rounded-sm ${isOutOfStock ? "opacity-50 pointer-events-none" : ""}`}>
                        <button onClick={() => handleQuantityChange("dec")} className="px-4 py-2 hover:bg-gray-100 text-gray-600">-</button>
                        <span className="px-4 py-2 text-sm font-bold min-w-5 text-center">{quantity}</span>
                        <button onClick={() => handleQuantityChange("inc")} className="px-4 py-2 hover:bg-gray-100 text-gray-600">+</button>
                    </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="space-y-3 mb-8">
                    <button 
                        onClick={handleSingleProductWhatsApp}
                        disabled={isOutOfStock}
                        className={`w-full py-3.5 rounded-sm text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
                            isOutOfStock 
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                            : "bg-[#25D366] hover:bg-[#128C7E] text-white"
                        }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                        </svg>
                        {isOutOfStock ? "Out of Stock" : "ORDER ON WHATSAPP"}
                    </button>
                    
                    <button className="w-full bg-white border border-[#8B1A1A] text-[#8B1A1A] py-3.5 rounded-sm text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#8B1A1A] hover:text-white transition-colors">
                        DETAILS OF PRODUCT
                    </button>
                    
                    {/* Add to Cart Button */}
                    <button 
                        onClick={() => addToCart(product, quantity)}
                        disabled={isOutOfStock}
                        className={`w-full py-3.5 rounded-sm text-sm font-bold uppercase tracking-wider transition-colors shadow-sm ${
                            isOutOfStock
                            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                            : "bg-[#8B1A1A] hover:bg-[#6d1414] text-white"
                        }`}
                    >
                        ADD TO CART
                    </button>
                </div>

                <div className="text-center pt-4 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">GUARANTEE SAFE & SECURE CHECKOUT</p>
                    <div className="flex justify-center items-center gap-4 grayscale opacity-70">
                        <div className="flex items-center gap-1 font-bold text-sm text-red-500"><span className="text-yellow-500">Jazz</span>Cash</div>
                        <div className="font-bold text-sm text-green-600">easypaisa</div>
                        <div className="font-bold text-sm text-blue-500">SADAPAY</div>
                    </div>
                </div>
            </div>
        </div>

        {/* ================= CUSTOMER REVIEWS SECTION ================= */}
        <div className="mb-24 pt-16 border-t border-gray-200">
            <h2 className="text-3xl font-serif text-center mb-12">Customer Reviews</h2>
            
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                
                {/* Review Stats */}
                <div className="w-full md:w-auto flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                        <div className="flex text-[#D4B07B] text-xl">{"★".repeat(5)}</div>
                        <span className="text-lg font-bold">4.84 out of 5</span>
                    </div>
                    <p className="text-sm text-gray-500">Based on {product.reviews || 0} reviews</p>
                </div>

                {/* Rating Bars */}
                <div className="w-full md:w-1/3 flex flex-col gap-2">
                    {[5, 4, 3, 2, 1].map((star, index) => (
                        <div key={star} className="flex items-center gap-3 text-xs">
                            <div className="flex text-[#D4B07B] min-w-[60px]">
                                {"★".repeat(star)}{"☆".repeat(5-star)}
                            </div>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-[#B88E2F]" 
                                    style={{ width: index === 0 ? '90%' : index === 1 ? '7%' : '0%' }}
                                ></div>
                            </div>
                            <span className="text-gray-400 min-w-[20px] text-right">
                                {index === 0 ? 39 : index === 1 ? 3 : 0}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Write Review Button */}
                <div className="w-full md:w-auto text-right">
                    <button className="bg-[#B88E2F] hover:bg-[#9c7826] text-white px-8 py-3 font-bold text-sm uppercase tracking-wide transition-colors">
                        Write a review
                    </button>
                </div>
            </div>

            {/* Filter */}
            <div className="border-b border-gray-200 pb-4 mb-8 flex justify-end">
                <select className="text-sm text-gray-600 bg-transparent border-none focus:ring-0 cursor-pointer">
                    <option>Most Recent</option>
                    <option>Highest Rating</option>
                    <option>Lowest Rating</option>
                </select>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
                <div className="bg-[#f9f9f9] p-6 rounded-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex text-[#D4B07B] text-xs">★★★★★</div>
                        <span className="text-xs text-gray-400">10/16/2025</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-[10px] font-bold text-white">FN</div>
                        <span className="text-sm font-bold text-gray-800">Fatima Nadeem</span>
                        <span className="bg-[#B88E2F] text-white text-[9px] px-1.5 py-0.5 rounded-sm font-medium">Verified</span>
                    </div>
                    <h4 className="text-sm font-bold text-black mb-1">Beautiful</h4>
                    <p className="text-sm text-gray-600 font-light">Same as shown, even more beautiful in person. Very satisfied!</p>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-12">
                <button className="w-8 h-8 border-b-2 border-black text-black font-bold">1</button>
                <button className="w-8 h-8 text-gray-400 hover:text-black transition-colors">2</button>
                <button className="w-8 h-8 text-gray-400 hover:text-black transition-colors">3</button>
                <button className="text-gray-400 hover:text-black text-lg">›</button>
            </div>
        </div>

        {/* ================= YOU MAY ALSO LIKE SECTION ================= */}
        <div className="mb-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-serif text-[#1a1a1a] mb-2">You May Also Like</h2>
                <div className="w-16 h-0.5 bg-[#B88E2F] mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((related) => (
                    <Link href={`/product/${related.id}`} key={related.id} className="group cursor-pointer block">
                        <div className="relative w-full aspect-[0.8] bg-white mb-4 overflow-hidden border border-gray-100 rounded-sm">
                            
                            {/* BADGE ADDED HERE for Related Products */}
                            {renderProductBadge(related)}

                            <Image 
                                src={related.image} 
                                alt={related.name} 
                                fill 
                                className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="text-center">
                            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{related.brand}</h4>
                            <h3 className="text-sm font-medium text-black leading-snug mb-2 px-2 truncate">{related.name}</h3>
                            <div className="text-sm font-bold text-gray-900">
                                Rs {related.price.toLocaleString()}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

      </div>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#f9f9f9] text-[#333] pt-16 pb-8 font-sans border-t border-gray-200">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
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
                <div>
                    <h3 className="font-bold text-sm uppercase mb-6 tracking-wider">Information</h3>
                    <ul className="space-y-4 text-sm text-gray-600">
                        <li><Link href="#" className="hover:text-black transition-colors">Store Location</Link></li>
                        <li><Link href="#" className="hover:text-black transition-colors">Gift Card</Link></li>
                        <li><Link href="#" className="hover:text-black transition-colors">Orders Tracking</Link></li>
                        <li><Link href="#" className="hover:text-black transition-colors">FAQs</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-sm uppercase mb-6 tracking-wider">Account</h3>
                    <ul className="space-y-4 text-sm text-gray-600">
                        <li><Link href="#" className="hover:text-black transition-colors">Login / Register</Link></li>
                        <li><Link href="#" className="hover:text-black transition-colors">Wishlist</Link></li>
                        <li><Link href="#" className="hover:text-black transition-colors">Cart</Link></li>
                        <li><Link href="#" className="hover:text-black transition-colors">Checkout</Link></li>
                    </ul>
                </div>
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
                <div className="lg:col-span-1">
                    <h3 className="font-bold text-sm uppercase mb-6 tracking-wider">Subscribe & Follow Us</h3>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                        Get the latest updates on promotions, new products, much more.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="text-gray-500 hover:text-black transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"/></svg>
                        </Link>
                        <Link href="#" className="text-gray-500 hover:text-black transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0-3-3Z"/></svg>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-300 mb-8"></div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="bg-black text-white px-4 py-2 font-serif text-xl tracking-widest border border-black cursor-pointer">
                    Nayab <span className="block text-[8px] text-center tracking-[0.2em] -mt-1 text-gray-300">WATCHES</span>
                </div>
                <div className="text-xs text-gray-500 text-center md:text-left">
                    Copyright 2024 Nayab Watches all rights reserved.
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex gap-2 opacity-60 grayscale hover:grayscale-0 transition-all cursor-default">
                       <span className="text-xs font-bold text-blue-900">VISA</span>
                       <span className="text-[10px] font-bold text-gray-600 border border-gray-400 px-1 rounded-sm">CASH ON DELIVERY</span>
                       <span className="text-xs font-bold text-red-600">UnionPay</span>
                       <span className="text-[10px] font-bold text-gray-600 border border-gray-400 px-1 rounded-sm">BANK TRANSFER</span>
                       <span className="text-xs font-bold text-orange-600">MasterCard</span>
                    </div>
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