"use client";
import { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import Image from "next/image";

export default function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateCartQuantity } = useGlobalContext();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryCharges = 300;
  const grandTotal = subtotal + deliveryCharges;

  // --- WHATSAPP ORDER LOGIC ---
  const handleWhatsAppOrder = () => {
    const phoneNumber = "923264555275";
    
    let message = "👋 *Hi, I want to place an order from your website.*\n\n";
    message += "*🛒 ORDER DETAILS:*\n";
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (x${item.quantity}) - Rs. ${(item.price * item.quantity).toLocaleString()}\n`;
    });

    message += `\n*📦 Subtotal:* Rs. ${subtotal.toLocaleString()}`;
    message += `\n*🚚 Delivery Charges:* Rs. ${deliveryCharges}`;
    message += `\n*💰 Grand Total:* Rs. ${grandTotal.toLocaleString()}\n\n`;
    message += "-----------------------------\n";
    message += "ℹ️ *Note:* I agree to pay Rs. 300 Delivery Charges in advance.\n";
    message += "Please confirm my order.";

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {/* 1. CART BACKDROP */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* 2. CART SIDEBAR */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="text-lg font-bold uppercase tracking-wider">Shopping Cart ({cart.length})</h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" className="mb-4 opacity-50"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
                <p className="text-sm font-medium">Your cart is empty</p>
                <button onClick={() => setIsCartOpen(false)} className="mt-4 text-xs font-bold underline text-black">Continue Shopping</button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-24 bg-gray-50 border border-gray-100 rounded-sm overflow-hidden flex-shrink-0">
                    <Image src={item.thumbnail || item.image} alt={item.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-sm font-bold text-black line-clamp-2 leading-tight">{item.name}</h3>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 uppercase mt-1">{item.brand}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-gray-300 rounded-sm">
                        <button onClick={() => updateCartQuantity(item.id, 'dec')} className="px-2 py-1 text-xs hover:bg-gray-100 text-gray-600">-</button>
                        <span className="px-2 text-xs font-bold min-w-[20px] text-center">{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.id, 'inc')} className="px-2 py-1 text-xs hover:bg-gray-100 text-gray-600">+</button>
                      </div>
                      <p className="text-sm font-bold text-black">Rs {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-600">Subtotal</span>
                <span className="text-lg font-bold text-black">Rs {subtotal.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-gray-400 mb-4 text-center">Shipping & taxes calculated at checkout.</p>
              <button 
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full bg-black text-white py-3.5 rounded-sm text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. CHECKOUT POPUP MODAL (NEW) */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[80] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="bg-[#25D366] p-4 text-white text-center">
                <h3 className="text-lg font-bold uppercase tracking-wider">Confirm Your Order</h3>
            </div>

            {/* Modal Body */}
            <div className="p-6">
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-md mb-6 text-sm">
                    <strong>Note:</strong> Order is <strong>Cash on Delivery</strong>. However, you must pay <strong>Rs. 300 Delivery Charges</strong> in advance via JazzCash/EasyPaisa to confirm.
                </div>

                <h4 className="text-sm font-bold text-gray-700 mb-3 border-b pb-1">Order Summary:</h4>
                <div className="max-h-40 overflow-y-auto space-y-2 mb-4 text-sm text-gray-600">
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between">
                            <span>{item.quantity}x {item.name}</span>
                            <span className="font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center border-t border-gray-200 pt-3 mb-6">
                    <span className="font-bold text-black">Total Amount:</span>
                    <span className="font-bold text-xl text-[#8B1A1A]">Rs. {grandTotal.toLocaleString()}</span>
                </div>

                <button 
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3.5 rounded-md text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                    </svg>
                    Confirm Order on WhatsApp
                </button>

                <button 
                    onClick={() => setIsCheckoutModalOpen(false)}
                    className="w-full mt-3 text-gray-500 text-sm hover:underline"
                >
                    Cancel
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}