"use client";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext, ExtendedProduct } from "@/context/GlobalContext";

export default function FeaturedProductsSection() {
  const { featuredProducts, addToCart } = useGlobalContext();

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
    <section id="featuredProducts" className="bg-white py-10 border-b border-gray-100">
      {/* UPDATED: Added extra horizontal padding (px-8 on mobile, px-16 on desktop) */}
      <div className="container mx-auto px-8 md:px-16">
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
            <div key={product.id} className="relative group block">
                <Link href={`/product/${product.id}`} className="flex flex-col items-center text-center cursor-pointer">
                    <div className="relative w-full h-[300px] mb-6 overflow-hidden">
                        {renderProductBadge(product)}
                        <Image src={product.image} alt={product.name} fill className="object-contain transition-transform duration-500 group-hover:scale-105" />
                        
                        {/* --- CART BUTTON (Updated for Mobile) --- */}
                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart(product);
                            }}
                            className="absolute top-2 right-2 bg-white text-black p-2.5 rounded-full shadow-md hover:bg-black hover:text-white transition-all z-20 
                            opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-[-10px] lg:group-hover:opacity-100 lg:group-hover:translate-y-0"
                            title="Add to Cart"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        </button>
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
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/Products">
            <button className="bg-[#1a1a1a] cursor-pointer text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#333] transition-colors rounded-sm shadow-md">
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}