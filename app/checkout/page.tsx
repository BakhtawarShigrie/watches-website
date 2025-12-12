"use client";
import Link from "next/link";
import Image from "next/image";
import { useGlobalContext, CartItem } from "@/context/GlobalContext";
import { useEffect, useState } from "react";
import { whatsappNumber, redeemDiscountAmount } from "@/app/website-data";

export default function CheckoutPage() {
  const { cart, updateCartQuantity, removeFromCart, applyCouponToItem, removeCouponFromItem } = useGlobalContext();
  const [mounted, setMounted] = useState(false);
  const [couponInputs, setCouponInputs] = useState<Record<number, string>>({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const subtotal = cart.reduce((total, item) => {
    const price = item.isCouponApplied ? item.price - redeemDiscountAmount : item.price;
    return total + (price * item.quantity);
  }, 0);

  const deliveryCharges = 300;
  const grandTotal = subtotal + deliveryCharges;

  const handleInputChange = (id: number, value: string) => {
    setCouponInputs(prev => ({ ...prev, [id]: value }));
  };

  const handleApply = (item: CartItem) => {
    const code = couponInputs[item.id] || "";
    if (applyCouponToItem(item.id, code)) {
      setCouponInputs(prev => ({ ...prev, [item.id]: "" }));
    } else {
      alert("Invalid Coupon Code");
    }
  };

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

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-black">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven&apos;t added anything yet.</p>
          <Link href="/Products" className="bg-black text-white px-8 py-3 rounded-sm uppercase font-bold text-xs tracking-widest hover:bg-gray-800 cursor-pointer">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white border-b border-gray-200 p-6 flex justify-between items-center sticky top-0 z-50">
        <Link href="/" className="text-xl font-bold tracking-widest uppercase text-black cursor-pointer">Nayab Watches</Link>
        <span className="text-xs font-medium uppercase tracking-wider text-gray-500">Secure Checkout</span>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold uppercase tracking-wide text-black">Review Your Cart ({cart.length})</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {cart.map((item) => {
                  const currentPrice = item.isCouponApplied ? item.price - redeemDiscountAmount : item.price;
                  return (
                    <div key={item.id} className="p-6 flex flex-col gap-4">
                        <div className="flex gap-4 sm:gap-6 items-start">
                            {/* FIX: Changed flex-shrink-0 to shrink-0 */}
                            <Link href={`/product/${item.id}`} className="relative w-20 h-24 sm:w-28 sm:h-32 bg-white border border-gray-200 rounded-sm shrink-0 cursor-pointer">
                                <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                            </Link>
                            
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <Link href={`/product/${item.id}`} className="hover:underline cursor-pointer">
                                        <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">{item.name}</h3>
                                    </Link>
                                    <div className="text-right">
                                        {item.isCouponApplied && <span className="block text-xs text-gray-400 line-through">Rs {item.price.toLocaleString()}</span>}
                                        <p className={`text-sm sm:text-base font-bold ${item.isCouponApplied ? "text-green-600" : "text-gray-900"}`}>Rs {currentPrice.toLocaleString()}</p>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 uppercase">{item.brand}</p>
                                
                                <div className="mt-4 flex justify-between items-center">
                                    <div className="flex items-center border border-gray-300 rounded-sm">
                                    <button onClick={() => updateCartQuantity(item.id, 'dec')} className="px-3 py-1 hover:bg-gray-100 text-gray-600 cursor-pointer">-</button>
                                    <span className="px-3 py-1 text-sm font-bold min-w-[30px] text-center text-black">{item.quantity}</span>
                                    <button onClick={() => updateCartQuantity(item.id, 'inc')} className="px-3 py-1 hover:bg-gray-100 text-gray-600 cursor-pointer">+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:text-red-700 font-medium underline cursor-pointer">
                                    Remove
                                    </button>
                                </div>
                            </div>
                        </div>

                        {item.redeemCodeAvailable && (
                            <div className="ml-0 sm:ml-[130px] bg-gray-50 p-2 rounded-sm flex items-center justify-between gap-2 max-w-sm">
                                {item.isCouponApplied ? (
                                    <div className="flex justify-between w-full items-center">
                                        <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                                            ✓ Coupon Applied
                                        </span>
                                        <button onClick={() => removeCouponFromItem(item.id)} className="text-xs text-red-500 hover:underline cursor-pointer">Remove</button>
                                    </div>
                                ) : (
                                    <>
                                        <input 
                                            type="text" 
                                            placeholder="Enter Coupon" 
                                            className="flex-1 border border-gray-300 p-1.5 text-xs rounded-sm focus:border-black outline-none uppercase"
                                            value={couponInputs[item.id] || ""}
                                            onChange={(e) => handleInputChange(item.id, e.target.value)}
                                        />
                                        <button 
                                            onClick={() => handleApply(item)} 
                                            className="bg-black text-white px-4 py-1.5 text-xs font-bold uppercase rounded-sm hover:bg-gray-800 cursor-pointer"
                                        >
                                            Apply
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                )})}
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-lg font-bold uppercase tracking-wide mb-6 text-black">Order Summary</h3>
              
              <div className="space-y-4 mb-6 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-black">Rs {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-bold text-black">Rs {deliveryCharges}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold text-black">
                  <span>Total</span>
                  <span>Rs {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs p-3 rounded-md mb-6 leading-relaxed">
                <strong>Note:</strong> Rs. 300 Delivery Charges must be paid in advance to confirm your order.
              </div>

              <button 
                onClick={handleWhatsAppOrder}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-md font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg text-sm cursor-pointer"
              >
                Confirm on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}