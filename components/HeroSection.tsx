"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";
import { heroBgImages } from "@/app/website-data"; 
import ProfileModal from "./ProfileModal";

export default function HeroSection() {
  const { setIsCartOpen, cart, user } = useGlobalContext();
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroBgImages.length);
  };

  const handleUserClick = () => {
    if (user) {
      setIsProfileOpen(true);
    } else {
      router.push("/login");
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      <header 
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-6 md:px-12 transition-colors duration-300 ${
          isScrolled ? "bg-black shadow-md" : "bg-transparent"
        }`}
      >
        <Link href="/" className="text-lg font-bold tracking-[0.15em] uppercase">
          Nayab Watches
        </Link>

        <nav className="hidden md:flex items-center -ml-30 gap-8 text-xs font-medium text-zinc-300 uppercase tracking-widest">
          <Link href="#featuredProducts" className="hover:text-white transition-colors">Watches</Link>
          <Link href="/Products" className="hover:text-white transition-colors">Products</Link>
        </nav>

        <div className="flex items-center gap-5 text-zinc-200">
          <button onClick={handleUserClick} aria-label="User Profile" className="hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A7.5 7.5 0 0 1 4.501 20.118Z" />
            </svg>
          </button>
          
          <button onClick={() => setIsCartOpen(true)} aria-label="Open Cart" className="hover:text-white transition-colors relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                    {cart.length}
                </span>
            )}
          </button>
        </div>
      </header>

      {heroBgImages.map((img, index) => (
        <div 
          key={index} 
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image src={img} alt={`Hero Slide ${index + 1}`} fill className="object-cover object-center" priority={index === 0} />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      ))}

      <div className="absolute bottom-15 left-6 md:left-12 z-20 max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300 mb-4 animate-fade-in">Current Favorites</p>
        <h1 className="text-2xl md:text-3xl font-semibold leading-tight w-80 md:w-100 mb-8 text-white">The Seamaster Diver 300M 42 mm, Steel on Steel</h1>
        <Link href="/Products">
          <button className="px-8 py-3 border cursor-pointer border-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-white hover:text-black transition-all duration-300">Discover now</button>
        </Link>
      </div>

      <div className="absolute bottom-10 right-6 md:right-12 z-20 flex items-center justify-end">
        <button onClick={handleNextSlide} className="flex items-center gap-4 cursor-pointer group focus:outline-none">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-300 group-hover:text-white transition-colors">Next slide</span>
          <div className="h-0.5 w-24 bg-zinc-600 overflow-hidden relative">
            <div className="absolute left-0 top-0 h-full w-1/3 bg-white transition-all duration-300 group-hover:w-full"></div>
          </div>
        </button>
      </div>
    </section>
  );
}