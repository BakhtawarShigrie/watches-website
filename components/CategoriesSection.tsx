"use client";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalContext";

export default function CategoriesSection() {
  const { categories } = useGlobalContext();

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 lg:mx-40 gap-8 place-items-center">
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