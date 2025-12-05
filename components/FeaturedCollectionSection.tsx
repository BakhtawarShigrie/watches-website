"use client";
import Image from "next/image";
import { useGlobalContext } from "@/context/GlobalContext";

export default function FeaturedCollectionSection() {
  const { featuredCollections } = useGlobalContext();

  return (
    <section className="bg-white py-20 border-b border-gray-100">
      {/* UPDATED: Added extra horizontal padding (px-8 on mobile, px-16 on desktop) */}
      <div className="container mx-auto px-8 md:px-16">
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
  );
}