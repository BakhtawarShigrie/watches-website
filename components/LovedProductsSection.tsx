"use client";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext, ExtendedProduct } from "@/context/GlobalContext";

export default function LovedProductsSection() {
  const { lovedProducts } = useGlobalContext();

  const renderProductBadge = (product: ExtendedProduct) => {
    if (product.stock === 0) {
      return <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">Out of Stock</span>;
    }
    if (product.isNew) {
      return <span className="absolute top-2 left-2 z-10 bg-[#49a010] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">New</span>;
    }
    return <span className="absolute top-2 left-2 z-10 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">In Stock</span>;
  };

  return (
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
            <Link href={`/product/${item.id}`} key={item.id} className="relative group cursor-pointer h-[500px] w-full bg-gray-100 overflow-hidden block">
              {renderProductBadge(item)}
              <Image 
                src={item.thumbnail ? item.thumbnail : item.image} 
                alt={item.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-sm flex items-center gap-4 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                <div className="relative w-12 h-12 flex-shrink-0 bg-gray-50 rounded-sm overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-contain" />
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
  );
}