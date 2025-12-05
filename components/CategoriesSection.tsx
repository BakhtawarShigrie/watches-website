"use client";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalContext";

export default function CategoriesSection() {
  const { categories } = useGlobalContext();

  return (
    <section className="bg-white py-20">
      {/* UPDATED: Added extra horizontal padding (px-8 on mobile, px-16 on desktop) */}
      <div className="container mx-auto px-8 md:px-12">
        <div className="flex flex-wrap justify-center gap-2 lg:gap-2">
          {categories.map((category, index) => (
            <Link 
              href={`/Products?category=${encodeURIComponent(category.name)}`} 
              key={index} 
              className="group flex flex-col items-center gap-4 cursor-pointer"
            >
              <div className="relative w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-110">
                <Image src={category.image} alt={category.name} fill className="object-cover" />
              </div>
              <span className="text-sm font-semibold text-gray-800 text-center tracking-wide group-hover:text-black">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}