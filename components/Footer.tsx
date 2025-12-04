"use client";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
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
            LifeStyle <span className="block text-[8px] text-center tracking-[0.2em] -mt-1 text-gray-300">COLLECTION</span>
          </div>
          <div className="text-xs text-gray-500 text-center md:text-left">
            Copyright 2024 Lifestyle Collection all rights reserved.
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
  );
}