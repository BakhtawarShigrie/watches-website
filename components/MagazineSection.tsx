"use client";
import Image from "next/image";
import { useGlobalContext } from "@/context/GlobalContext";

export default function MagazineSection() {
  const { newsArticles } = useGlobalContext();

  return (
    <section className="bg-white py-24 border-b border-gray-100">
      <div className="container mx-auto px-8 md:px-16">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          {/* Updated Subtitle */}
          <p className="text-xs font-bold text-gray-400 tracking-[0.25em] uppercase mb-3">NAYAB WATCHES</p>
          <h2 className="text-4xl font-bold text-black mb-6">Magazine & Press</h2>
          <p className="text-sm text-gray-500 leading-relaxed font-light">
            {/* Updated Description */}
            Updated monthly, follow the Nayab Watches blog for everything you want to know about watches & Eyewear.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {newsArticles.map((article, index) => (
            <div key={index} className="flex flex-col group cursor-pointer text-center">
              <div className="relative w-full h-[250px] overflow-hidden mb-6">
                <Image 
                  src={article.image} 
                  alt={article.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-base font-semibold text-black mb-3 px-4 leading-snug group-hover:text-gray-600 transition-colors">
                {article.title}
              </h3>
              <div className="flex items-center justify-center gap-3 text-xs text-gray-400 font-light mb-6">
                <span>{article.category}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>{article.date}</span>
              </div>
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
  );
}