"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { globalRedeemCode, brandsList, whatsappNumber } from "@/app/website-data";

export default function Footer() {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(globalRedeemCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBrandClick = (brand: string) => {
    setActivePopup(null);
    router.push(`/Products?brand=${encodeURIComponent(brand)}`);
  };

  // Popup Content Helper
  const renderPopupContent = () => {
    switch (activePopup) {
      case "About":
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-1 bg-black mx-auto mb-4"></div>
            <h3 className="text-2xl font-serif font-bold uppercase tracking-widest text-black">About Nayab Watches</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-light">
              Welcome to <span className="font-bold text-black">Nayab Watches</span>, your premier destination for luxury and sport timepieces. 
              We are dedicated to providing the finest selection of watches that combine elegance with durability. 
              Our mission is to deliver quality and style to your wrist.
            </p>
            <div className="flex justify-center gap-6 pt-2 text-[10px] uppercase font-bold tracking-widest text-gray-400">
                <span>Authentic</span> • <span>Reliable</span> • <span>Luxury</span>
            </div>
          </div>
        );
      case "Contact":
        return (
          <div className="text-center space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-wider text-black">Contact Support</h3>
            <p className="text-sm text-gray-600 font-light">
              Need help with your order or have a question? Our support team is available on WhatsApp to assist you.
            </p>
            <a 
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-3.5 rounded-full font-bold uppercase text-sm transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
        );
      case "Terms":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase">Terms & Conditions</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              By using our website, you agree to our terms. We ensure that all products are authentic. Prices are subject to change without notice. We reserve the right to cancel orders if products are out of stock or pricing errors occur.
            </p>
          </div>
        );
      case "Returns":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase">Returns & Exchanges</h3>
            <p className="text-sm text-gray-600 leading-relaxed bg-yellow-50 p-4 border border-yellow-200 rounded-sm">
              You are allowed to open the parcel and inspect the product upon receipt. Please make the payment only after you are satisfied. If you find any fault at that moment, you may request a return or exchange immediately, and your product will be replaced. The company will not be responsible for any claims made afterwards.
            </p>
          </div>
        );
      case "Shipping":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase">Shipping & Delivery</h3>
            <div className="text-sm text-gray-600 leading-relaxed bg-blue-50 p-4 border border-blue-200 rounded-sm space-y-2">
              <p>Shipping charges are <span className="font-bold">Rs. 200</span> nationwide, which must be paid in advance to confirm your order.</p>
              <p>After depositing the shipping fee into our account, please forward the payment screenshot to our support team on WhatsApp; otherwise, your order will not be confirmed.</p>
              <p>You will receive your delivery within <span className="font-bold">3 to 7 working days</span>.</p>
              <p className="text-xs italic">Kindly coordinate with our delivery rider. Thank you.</p>
            </div>
          </div>
        );
      case "Redeem":
        return (
          <div className="space-y-4 text-center">
            <h3 className="text-xl font-bold uppercase">Redeem Code</h3>
            <p className="text-sm text-gray-500">Copy the code below and paste it at checkout for a discount.</p>
            <div className="bg-gray-100 p-4 rounded-md border border-gray-300 flex flex-col items-center gap-3">
              <span className="text-2xl font-mono font-bold tracking-widest text-black">{globalRedeemCode}</span>
              <button 
                onClick={handleCopyCode}
                className="bg-black text-white px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-gray-800 transition-colors"
              >
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
            <p className="text-xs text-green-600 font-bold mt-2">Get Rs. 500 OFF on select items!</p>
          </div>
        );
      case "Tracking":
        return (
          <div className="space-y-4 text-center">
            <h3 className="text-xl font-bold uppercase">Order Tracking</h3>
            <p className="text-sm text-gray-600">Please contact our support team to track your order.</p>
            <a 
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-sm font-bold uppercase text-sm hover:bg-[#128C7E] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
        );
      case "Brands":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase text-center mb-6">Select a Brand</h3>
            <div className="grid grid-cols-2 gap-3">
              {brandsList.filter(b => b !== "All").map((brand, idx) => (
                <button
                  key={idx}
                  onClick={() => handleBrandClick(brand)}
                  className="bg-gray-50 border border-gray-200 text-gray-800 py-3 rounded-sm font-bold text-xs uppercase hover:bg-black hover:text-white transition-colors"
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <footer className="bg-[#f9f9f9] text-[#333] pt-16 pb-8 font-sans border-t border-gray-200">
        <div className="container mx-auto px-4">
          
          {/* GRID LAYOUT FOR MOBILE ROWS & DESKTOP COLUMNS */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-12 gap-x-4 md:gap-8 mb-12">
            
            {/* 1. HELP */}
            <div>
              <h3 className="font-bold text-sm uppercase mb-6 tracking-wider">Help</h3>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><button onClick={() => setActivePopup("About")} className="hover:text-black transition-colors text-left">About Us</button></li>
                <li><button onClick={() => setActivePopup("Contact")} className="hover:text-black transition-colors text-left">Contact Us</button></li>
                <li><button onClick={() => setActivePopup("Terms")} className="hover:text-black transition-colors text-left">Terms & Conditions</button></li>
                <li><button onClick={() => setActivePopup("Returns")} className="hover:text-black transition-colors text-left">Returns & Exchanges</button></li>
                <li><button onClick={() => setActivePopup("Shipping")} className="hover:text-black transition-colors text-left">Shipping & Delivery</button></li>
              </ul>
            </div>

            {/* 3. ACCOUNT (Starts 2nd Row on Mobile) */}
            <div>
              <h3 className="font-bold text-sm uppercase mb-6 tracking-wider">Account</h3>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><Link href="/login" className="hover:text-black transition-colors">Login / Register</Link></li>
                <li><Link href="/wishlist" className="hover:text-black transition-colors">Wishlist</Link></li>
                <li><Link href="/checkout" className="hover:text-black transition-colors">Checkout</Link></li>
              </ul>
            </div>

            {/* 4. CATEGORIES (Next to Account) */}
            <div>
              <h3 className="font-bold text-sm uppercase mb-6 tracking-wider">Categories</h3>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><Link href="/Products" className="hover:text-black transition-colors">Watches</Link></li>
                <li><button onClick={() => setActivePopup("Brands")} className="hover:text-black transition-colors text-left">Brands</button></li>
                <li><Link href="/Products" className="text-[#d95e00] hover:text-red-700 transition-colors">Sale</Link></li>
              </ul>
            </div>

            {/* 2. INFORMATION (Moved next to Help for 1st Row) */}
            <div>
              <h3 className="font-bold text-sm uppercase mb-6 tracking-wider">Information</h3>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><button onClick={() => setActivePopup("Redeem")} className="hover:text-black transition-colors text-left">Redeem Codes</button></li>
                <li><button onClick={() => setActivePopup("Tracking")} className="hover:text-black transition-colors text-left">Orders Tracking</button></li>
              </ul>
            </div>


            {/* 5. SUBSCRIBE (3rd Row Full Width on Mobile) */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-bold text-sm uppercase mb-6 tracking-wider">Subscribe & Follow Us</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Get the latest updates on promotions, new products, much more.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://www.facebook.com/nayabwatch/" target="_blank" className="text-gray-500 hover:text-black transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"/></svg>
                </a>
                <a href="https://www.instagram.com/nayab_watch/" target="_blank" className="text-gray-500 hover:text-black transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0-3-3Z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 mb-8"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="bg-black text-white px-4 py-2 font-serif text-xl tracking-widest border border-black cursor-pointer">
              Nayab <span className="block text-[8px] text-center tracking-[0.2em] -mt-1 text-gray-300">WATCHES</span>
            </div>
            <div className="text-xs text-gray-500 text-center md:text-left">
              Copyright 2025 Nayab Watches all rights reserved.
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

      {/* POPUP MODAL */}
      {activePopup && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in" onClick={() => setActivePopup(null)}>
          <div className="bg-white p-8 rounded-lg max-w-md w-full relative shadow-2xl" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setActivePopup(null)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            {renderPopupContent()}
          </div>
        </div>
      )}
    </>
  );
}