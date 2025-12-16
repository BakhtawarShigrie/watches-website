"use client";
import { useState } from "react";
import { useGlobalContext, CartItem } from "@/context/GlobalContext";
import Image from "next/image";
import Link from "next/link";
import { whatsappNumber, redeemDiscountAmount } from "@/app/website-data";

export default function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateCartQuantity, applyCouponToItem, removeCouponFromItem } = useGlobalContext();
  
  // FIX: isCheckoutModalOpen was defined but unused (now used in JSX)
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  
  const [couponInputs, setCouponInputs] = useState<Record<number, string>>({});

  const subtotal = cart.reduce((total, item) => {
    const price = item.isCouponApplied ? item.price - redeemDiscountAmount : item.price;
    return total + (price * item.quantity);
  }, 0);

  const deliveryCharges = 300;
  
  // FIX: grandTotal was defined but unused (now used in Checkout Modal)
  const grandTotal = subtotal + deliveryCharges;

  const handleInputChange = (id: number, value: string) => {
    setCouponInputs(prev => ({ ...prev, [id]: value }));
  };

  const handleApply = (item: CartItem) => {
    const code = couponInputs[item.id] || "";
    const success = applyCouponToItem(item.id, code);
    if (success) {
      setCouponInputs(prev => ({ ...prev, [item.id]: "" }));
    } else {
      alert("Invalid Coupon Code");
    }
  };

  // FIX: handleWhatsAppOrder was defined but unused (now used in Checkout Modal)
  // FIX: whatsappNumber was imported but unused (used here)
  const handleWhatsAppOrder = () => {
    let message = "👋 *Hi, I want to place an order via Website Checkout.*\n\n";
    message += "*🛒 ORDER DETAILS:*\n";
    
    cart.forEach((item, index) => {
      const price = item.isCouponApplied ? item.price - redeemDiscountAmount : item.price;
      message += `${index + 1}. ${item.name} (x${item.quantity}) - Rs. ${(price * item.quantity).toLocaleString()}`;
      if (item.isCouponApplied) message += ` ✅ (Coupon Applied)`;
      message += `\n`;
    });

    message += `\n*📦 Subtotal:* Rs. ${subtotal.toLocaleString()}`;
    message += `\n*🚚 Delivery Charges:* Rs. ${deliveryCharges}`;
    message += `\n*💰 Grand Total:* Rs. ${grandTotal.toLocaleString()}\n\n`;
    message += "-----------------------------\n";
    message += "ℹ️ *Note:* I agree to pay Rs. 300 Delivery Charges in advance.\n";
    message += "Please confirm my order.";

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div 
        // FIX: Changed z-[60] to z-60
        className={`fixed inset-0 bg-black/50 z-60 transition-opacity duration-300 ${isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* FIX: Changed z-[70] to z-70 */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-70 shadow-2xl transform transition-transform duration-300 ease-in-out ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="text-lg font-bold uppercase tracking-wider text-black">Shopping Cart ({cart.length})</h2>
            <button onClick={() => setIsCartOpen(false)} aria-label="Close Cart" className="p-2  hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="black" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <p className="text-sm font-medium">Your cart is empty</p>
                <button onClick={() => setIsCartOpen(false)} className="mt-4 text-xs font-bold underline text-black cursor-pointer">Continue Shopping</button>
              </div>
            ) : (
              cart.map((item) => {
                const currentPrice = item.isCouponApplied ? item.price - redeemDiscountAmount : item.price;
                return (
                  <div key={item.id} className="flex flex-col border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex gap-4">
                      
                      {/* FIX: Changed flex-shrink-0 to shrink-0 */}
                      <Link href={`/product/${item.id}`} className="relative w-20 h-24 bg-white border border-gray-100 rounded-sm overflow-hidden shrink-0 cursor-pointer" onClick={() => setIsCartOpen(false)}>
                        <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                      </Link>

                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <Link href={`/product/${item.id}`} className="text-sm font-bold text-black line-clamp-2 leading-tight hover:underline cursor-pointer" onClick={() => setIsCartOpen(false)}>
                                {item.name}
                            </Link>
                            <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer">✕</button>
                          </div>
                          <p className="text-xs text-gray-500 uppercase mt-1">{item.brand}</p>
                        </div>
                        <div className="flex justify-between items-end mt-2">
                          <div className="flex items-center border border-gray-300 rounded-sm">
                            <button onClick={() => updateCartQuantity(item.id, 'dec')} className="px-2 py-1 text-xs hover:bg-gray-100 text-gray-600 cursor-pointer">-</button>
                            {/* FIX: Changed min-w-[20px] to min-w-5 */}
                            <span className="px-2 text-xs font-bold min-w-5 text-center text-black">{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.id, 'inc')} className="px-2 py-1 text-xs hover:bg-gray-100 text-gray-600 cursor-pointer">+</button>
                          </div>
                          <div className="text-right">
                             {item.isCouponApplied && (
                                <span className="block text-[10px] text-gray-400 line-through">Rs {item.price.toLocaleString()}</span>
                             )}
                             <p className={`text-sm font-bold ${item.isCouponApplied ? "text-green-600" : "text-black"}`}>Rs {currentPrice.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {item.redeemCodeAvailable && (
                        <div className="mt-3 bg-gray-50 p-2 rounded-sm flex items-center justify-between gap-2">
                            {item.isCouponApplied ? (
                                <div className="flex justify-between w-full items-center">
                                    <span className="text-[10px] font-bold text-green-600 flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>
                                        Coupon Applied
                                    </span>
                                    <button onClick={() => removeCouponFromItem(item.id)} className="text-[10px] text-red-500 hover:underline cursor-pointer">Remove</button>
                                </div>
                            ) : (
                                <>
                                    <input 
                                        type="text" 
                                        placeholder="Enter Coupon" 
                                        className="flex-1 border border-gray-300 text-black p-1.5 text-[10px] rounded-sm focus:border-black outline-none uppercase"
                                        value={couponInputs[item.id] || ""}
                                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                                    />
                                    <button 
                                        onClick={() => handleApply(item)} 
                                        className="bg-black text-white px-3 py-1.5 text-[10px] font-bold uppercase rounded-sm hover:bg-gray-800 cursor-pointer"
                                    >
                                        Apply
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-600">Subtotal</span>
                <span className="text-lg font-bold text-black">Rs {subtotal.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-gray-400 mb-4 text-center">Shipping & taxes calculated at checkout.</p>
              
              {/* This Button triggers the modal where handleWhatsAppOrder is used */}
              <button 
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full bg-black text-white py-3.5 rounded-sm text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal - Uses grandTotal and handleWhatsAppOrder */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-80 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setIsCheckoutModalOpen(false)}>
          <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="bg-[#25D366] p-4 text-white text-center">
                <h3 className="text-lg font-bold uppercase tracking-wider">Confirm Your Order</h3>
            </div>
            <div className="p-6">
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-md mb-6 text-sm">
                    <strong>Note:</strong> Order is <strong>Cash on Delivery</strong>. However, you must pay <strong>Rs. 300 Delivery Charges</strong> in advance via JazzCash/EasyPaisa to confirm.
                </div>

                <h4 className="text-sm font-bold text-gray-700 mb-3 border-b pb-1">Order Summary:</h4>
                <div className="max-h-40 overflow-y-auto space-y-2 mb-4 text-sm text-gray-600">
                    {cart.map((item) => {
                        const price = item.isCouponApplied ? item.price - redeemDiscountAmount : item.price;
                        return (
                            <div key={item.id} className="flex justify-between">
                                <span>{item.quantity}x {item.name} {item.isCouponApplied && <span className="text-green-600 text-xs">(Coupon)</span>}</span>
                                <span className="font-bold">Rs. {(price * item.quantity).toLocaleString()}</span>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-between items-center border-t border-gray-200 pt-3 mb-6">
                    <span className="font-bold text-black">Total Amount:</span>
                    {/* grandTotal used here */}
                    <span className="font-bold text-xl text-[#8B1A1A]">Rs. {grandTotal.toLocaleString()}</span>
                </div>

                {/* handleWhatsAppOrder used here */}
                <button 
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3.5 rounded-md text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
                >
                    Confirm Order on WhatsApp
                </button>
                <button onClick={() => setIsCheckoutModalOpen(false)} className="w-full mt-3 text-gray-500 text-sm hover:underline cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}