"use client";

import { useState, use, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGlobalContext, ExtendedProduct } from "@/context/GlobalContext";
import { globalRedeemCode, redeemDiscountAmount, Review, whatsappNumber } from "@/app/website-data";
import ProfileModal from "@/components/ProfileModal";
import Footer from "@/components/Footer";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const productId = parseInt(id);
  const { products, featuredProducts, lovedProducts, addToCart, cart, setIsCartOpen, toggleWishlist, wishlist, user, reviews, addReview, deleteReview, editReview } = useGlobalContext();
  const router = useRouter();
  
  const allProducts = [...products, ...featuredProducts, ...lovedProducts];
  const product = allProducts.find((p) => p.id === productId);
  const relatedProducts = products.filter(p => p.id !== productId).slice(0, 4);

  const productReviews = reviews.filter(r => r.productId === productId);

  const [quantity, setQuantity] = useState(1);
  const [] = useState("Silver");
  const [zoom, setZoom] = useState({ x: 0, y: 0, show: false });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const [redeemInput, setRedeemInput] = useState("");
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // REVIEW FORM STATE
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, content: "" });
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  if (!product) return <div className="min-h-screen flex items-center justify-center">Product Not Found</div>;

  // --- NEW HELPER FUNCTION TO FIX YOUTUBE LINKS ---
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    
    // Agar Shorts link hai
    if (url.includes("/shorts/")) {
      const videoId = url.split("/shorts/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}`;
    }
    
    // Agar Normal Watch link hai
    if (url.includes("watch?v=")) {
      const videoId = url.split("watch?v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Agar youtu.be short link hai
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Agar pehle se embed link hai ya kuch aur hai
    return url;
  };
  // ------------------------------------------------

  const isWishlisted = wishlist.includes(product.id);
  const isOutOfStock = !product.stock || product.stock === 0;
  
  const originalPrice = product.price;
  const finalPrice = isRedeemed ? originalPrice - redeemDiscountAmount : originalPrice;
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - finalPrice) / product.originalPrice) * 100)
    : 0;

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (isOutOfStock) return;
    if (type === "inc") setQuantity(quantity + 1);
    else if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleRedeem = () => {
    if (redeemInput === globalRedeemCode) {
        setIsRedeemed(true);
        setErrorMsg("");
    } else {
        setErrorMsg("Invalid Code");
        setIsRedeemed(false);
    }
  };

  const handleWhatsApp = () => {
    const deliveryCharges = 200;
    const total = (finalPrice * quantity) + deliveryCharges;
    let message = "👋 *Hi, I want to order this product:*\n\n";
    message += `🛒 *Product:* ${product.name}\n`;
    message += `🔢 *Quantity:* ${quantity}\n`;
    message += `💰 *Price:* Rs. ${finalPrice.toLocaleString()} ${isRedeemed ? "(Discount Applied)" : ""}\n`;
    
    if (isRedeemed) {
        message += `🎟 *Coupon Applied:* ✅ (Rs. ${redeemDiscountAmount} OFF)\n`;
    }

    message += `🚚 *Delivery Charges:* Rs. 200\n`;
    message += `-----------------------------\n`;
    message += `💵 *Total Payable:* Rs. ${total.toLocaleString()}\n\n`;
    message += "Please confirm my order.";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleOpenReviewModal = () => {
    if (!user) {
        setShowLoginPrompt(true);
        return;
    }
    setEditingReviewId(null);
    setReviewForm({ rating: 5, content: "" });
    setIsReviewModalOpen(true);
  };

  const handleEditClick = (review: Review) => {
    setEditingReviewId(review.id);
    setReviewForm({ rating: review.rating, content: review.content });
    setIsReviewModalOpen(true);
  };

  const handleLoginRedirect = () => {
    router.push(`/login?redirect=/product/${productId}`);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (editingReviewId) {
        editReview(editingReviewId, reviewForm.content, reviewForm.rating);
    } else {
        const newReview: Review = {
            id: Date.now(),
            productId: product.id,
            name: user.name,
            date: new Date().toLocaleDateString(),
            rating: reviewForm.rating,
            content: reviewForm.content,
            verified: true 
        };
        addReview(newReview);
    }

    setIsReviewModalOpen(false);
    setReviewForm({ rating: 5, content: "" });
    setEditingReviewId(null);
  };

  const handleUserClick = () => {
    if (user) setIsProfileOpen(true);
    else router.push("/login");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    let x = ((e.pageX - left) / width) * 100;
    let y = ((e.pageY - window.scrollY - top) / height) * 100;
    if (x < 0) x = 0; if (x > 100) x = 100;
    if (y < 0) y = 0; if (y > 100) y = 100;
    setZoom({ x, y, show: true });
  };

  const renderProductBadge = (prod: ExtendedProduct) => {
    if (!prod.stock || prod.stock === 0) {
      return <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">Out of Stock</span>;
    }
    if (prod.isNew) {
      return <span className="absolute top-2 left-2 z-10 bg-[#49a010] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">New</span>;
    }
    return <span className="absolute top-2 left-2 z-10 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">In Stock</span>;
  };

  return (
    <div className="bg-white min-h-screen font-sans text-[#333]">
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      <header className="bg-black text-white w-full z-50 flex items-center justify-between px-6 py-4 md:px-12 sticky top-0">
        <Link href="/" className="text-lg font-bold tracking-[0.15em] uppercase">
          Nayab Watch
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-xs -ml-30 font-medium text-zinc-300 uppercase tracking-widest">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/Products" className="hover:text-white transition-colors">Products</Link>
        </nav>
        
        <div className="flex items-center gap-5 text-zinc-200">
             <button onClick={handleUserClick} className="hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A7.5 7.5 0 0 1 4.501 20.118Z" />
                </svg>
             </button>
             <button onClick={() => setIsCartOpen(true)} className="relative hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
                {cart.length > 0 && <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">{cart.length}</span>}
             </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-xs text-gray-500 font-medium mb-8">
            <Link href="/" className="hover:text-black">Home</Link> <span className="mx-2">›</span> <Link href="/Products" className="hover:text-black">Watches</Link> <span className="mx-2">›</span> <span className="text-black font-bold">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-24">
            <div className="w-full lg:w-1/2 flex flex-col items-center">
                <div ref={imageContainerRef} className="relative w-full max-w-[450px] aspect-[0.8] bg-gray-50 border border-gray-100 rounded-sm overflow-hidden mb-4 cursor-crosshair group" onMouseMove={handleMouseMove} onMouseLeave={() => setZoom({ ...zoom, show: false })}>
                    <Image src={product.image} alt={product.name} fill className={`object-cover ${isOutOfStock ? "grayscale opacity-75" : ""}`} priority />
                    <button onClick={() => toggleWishlist(product.id)} className={`absolute top-4 right-4 p-3 rounded-full shadow-lg z-30 transition-all ${isWishlisted ? "bg-red-50 text-red-600" : "bg-white text-gray-400 hover:text-red-500"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                    {zoom.show && !isOutOfStock && <div className="absolute pointer-events-none w-32 h-32 rounded-full border-2 border-gray-200 bg-white shadow-2xl z-20" style={{ top: `${zoom.y}%`, left: `${zoom.x}%`, transform: 'translate(-50%, -50%)', backgroundImage: `url(${product.image})`, backgroundPosition: `${zoom.x}% ${zoom.y}%`, backgroundSize: '500%', backgroundRepeat: 'no-repeat' }}></div>}
                </div>
                <div className="flex gap-4">
                    <div className="w-16 h-16 border border-black cursor-pointer relative"><Image src={product.image} alt="thumb1" fill className="object-cover" /></div>
                    {product.images?.map((img, idx) => (
                        <div key={idx} className="w-16 h-16 border border-gray-200 cursor-pointer relative opacity-60 hover:opacity-100"><Image src={img} alt={`thumb${idx}`} fill className="object-cover" /></div>
                    ))}
                </div>
            </div>

            <div className="w-full lg:w-1/2">
                <h1 className="text-3xl md:text-4xl font-serif text-[#1a1a1a] mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-[#D4B07B] text-sm">{"★".repeat(5)}</div>
                    <span className="text-xs text-gray-500">({productReviews.length} reviews)</span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-[#8B1A1A]">Rs. {finalPrice.toLocaleString()}</span>
                    {product.originalPrice && (
                        <>
                            <span className="text-lg text-gray-400 line-through decoration-1">Rs. {product.originalPrice.toLocaleString()}</span>
                            <span className="bg-[#8B1A1A] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">-{discountPercentage}%</span>
                        </>
                    )}
                </div>

                {product.redeemCodeAvailable && (
                    <div className="mb-6 p-3 bg-gray-50 border border-gray-200 rounded-sm animate-fade-in max-w-xs">
                        <label className="block text-[10px] font-bold uppercase text-gray-500 mb-2">Have a Coupon Code?</label>
                        <div className="flex gap-2">
                            <input type="text" value={redeemInput} onChange={(e) => setRedeemInput(e.target.value)} placeholder="Code" disabled={isRedeemed} className="flex-1 border border-gray-300 p-2 text-xs rounded-sm focus:border-black outline-none uppercase" />
                            <button onClick={handleRedeem} disabled={isRedeemed} className={`px-3 py-2 text-[10px] font-bold uppercase rounded-sm transition-colors ${isRedeemed ? "bg-green-600 text-white" : "bg-black text-white hover:bg-gray-800"}`}>{isRedeemed ? "Applied" : "Apply"}</button>
                        </div>
                        {isRedeemed && <p className="text-[10px] text-green-600 mt-1 font-bold">✓ Saved Rs. 500</p>}
                        {errorMsg && <p className="text-[10px] text-red-600 mt-1">{errorMsg}</p>}
                    </div>
                )}

                <div className="flex items-center gap-2 mb-6">
                    <div className={`w-2 h-2 rounded-full ${isOutOfStock ? "bg-red-500" : "bg-green-500 animate-pulse"}`}></div>
                    <span className={`text-xs font-medium ${isOutOfStock ? "text-red-600" : "text-green-600"}`}>{isOutOfStock ? "Currently unavailable" : `${product.stock} items in stock`}</span>
                </div>
                <div className="mb-8">
                    <span className="text-sm font-bold text-black block mb-2">Quantity</span>
                    <div className={`flex items-center border border-gray-300 w-max rounded-sm ${isOutOfStock ? "opacity-50 pointer-events-none" : ""}`}>
                        <button onClick={() => handleQuantityChange("dec")} className="px-4 py-2 hover:bg-gray-100 text-gray-600">-</button>
                        <span className="px-4 py-2 text-sm font-bold min-w-5 text-center">{quantity}</span>
                        <button onClick={() => handleQuantityChange("inc")} className="px-4 py-2 hover:bg-gray-100 text-gray-600">+</button>
                    </div>
                </div>
                <div className="space-y-3 mb-8">
                    <button onClick={handleWhatsApp} className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3.5 rounded-sm text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors">ORDER ON WHATSAPP</button>
                    <button onClick={() => setIsVideoOpen(true)} className="w-full bg-white border border-[#8B1A1A] text-[#8B1A1A] py-3.5 rounded-sm text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#8B1A1A] hover:text-white transition-colors">DETAILS & UNBOXING VIDEO</button>
                    <button onClick={() => addToCart(product, quantity)} disabled={isOutOfStock} className={`w-full py-3.5 rounded-sm text-sm font-bold uppercase tracking-wider transition-colors shadow-sm ${isOutOfStock ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-[#8B1A1A] hover:bg-[#6d1414] text-white"}`}>ADD TO CART</button>
                </div>
            </div>
        </div>

        <div className="mb-24 pt-16 border-t border-gray-200">
            <h2 className="text-3xl font-serif text-center mb-12">Customer Reviews</h2>
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                <div className="w-full md:w-auto flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                        <div className="flex text-[#D4B07B] text-xl">{"★".repeat(5)}</div>
                        <span className="text-lg font-bold">4.9 out of 5</span>
                    </div>
                    <p className="text-sm text-gray-500">Based on {productReviews.length} reviews</p>
                </div>
                <div className="w-full md:w-auto text-right">
                    <button onClick={handleOpenReviewModal} className="bg-[#B88E2F] hover:bg-[#9c7826] text-white px-8 py-3 font-bold text-sm uppercase tracking-wide transition-colors">
                        Write a review
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {productReviews.length === 0 ? (
                    <p className="text-center text-gray-500 italic">No reviews yet. Be the first to review!</p>
                ) : (
                    productReviews.map((r) => (
                        <div key={r.id} className="bg-[#f9f9f9] p-6 rounded-sm border border-gray-100 relative group">
                            
                            {user && r.name === user.name && (
                                <div className="absolute bottom-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEditClick(r)} className="text-gray-400 hover:text-black transition-colors p-1" title="Edit">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                    </button>
                                    <button onClick={() => deleteReview(r.id)} className="text-gray-400 hover:text-red-600 transition-colors p-1" title="Delete">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-3">
                                <div className="flex text-[#D4B07B] text-xs">{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</div>
                                <span className="text-xs text-gray-400">{r.date}</span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-[10px] font-bold text-white uppercase">{r.name.substring(0,2)}</div>
                                <span className="text-sm font-bold text-gray-800">{r.name}</span>
                                {r.verified && <span className="bg-[#B88E2F] text-white text-[9px] px-1.5 py-0.5 rounded-sm font-medium">Verified</span>}
                            </div>
                            
                            <p className="text-sm text-gray-600 font-light mt-2 pr-16">{r.content}</p>
                        </div>
                    ))
                )}
            </div>
        </div>

        <div className="mb-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-serif text-[#1a1a1a] mb-2">You May Also Like</h2>
                <div className="w-16 h-0.5 bg-[#B88E2F] mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((related) => {
                    const isRelatedWishlisted = wishlist.includes(related.id);
                    return (
                        <Link href={`/product/${related.id}`} key={related.id} className="group cursor-pointer block">
                            <div className="relative w-full aspect-[0.8] bg-white mb-4 overflow-hidden border border-gray-100 rounded-sm">
                                {renderProductBadge(related)}
                                <Image src={related.image} alt={related.name} fill className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"/>
                                <button onClick={(e) => {e.preventDefault(); toggleWishlist(related.id);}} className={`absolute top-2 right-2 p-2 rounded-full shadow-md z-20 transition-all ${isRelatedWishlisted ? "bg-red-50 text-red-600" : "bg-white text-gray-400 hover:text-red-500"}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={isRelatedWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                </button>
                            </div>
                            <div className="text-center">
                                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{related.brand}</h4>
                                <h3 className="text-sm font-medium text-black leading-snug mb-2 px-2 truncate">{related.name}</h3>
                                <div className="text-sm font-bold text-gray-900">Rs {related.price.toLocaleString()}</div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
      </div>
      
      <Footer />

      {/* LOGIN PROMPT MODAL */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/60 z-100 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white p-8 rounded-lg max-w-sm w-full shadow-2xl text-center">
                <div className="mb-4 text-4xl">🔒</div>
                <h3 className="text-xl font-bold mb-2">Login Required</h3>
                <p className="text-sm text-gray-500 mb-6">You need to be logged in to write a review.</p>
                <div className="flex gap-3">
                    <button onClick={() => setShowLoginPrompt(false)} className="flex-1 py-3 text-xs font-bold uppercase border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors">Cancel</button>
                    <button onClick={handleLoginRedirect} className="flex-1 py-3 text-xs font-bold uppercase bg-black text-white rounded-sm hover:bg-gray-800 transition-colors">Login Now</button>
                </div>
            </div>
        </div>
      )}

      {/* REVIEW FORM MODAL */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-100 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white p-8 rounded-lg max-w-md w-full shadow-2xl relative">
                <button onClick={() => setIsReviewModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black">✕</button>
                <h3 className="text-xl font-bold mb-6 text-center">{editingReviewId ? "Edit Review" : "Write a Review"}</h3>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Rating</label>
                        <select 
                            className="w-full border border-gray-300 p-2 rounded-sm text-sm outline-none focus:border-black"
                            value={reviewForm.rating}
                            onChange={(e) => setReviewForm({...reviewForm, rating: Number(e.target.value)})}
                        >
                            <option value="5">★★★★★ (Excellent)</option>
                            <option value="4">★★★★☆ (Good)</option>
                            <option value="3">★★★☆☆ (Average)</option>
                            <option value="2">★★☆☆☆ (Poor)</option>
                            <option value="1">★☆☆☆☆ (Terrible)</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Review</label>
                        <textarea required rows={4} placeholder="Tell us what you like or dislike..." className="w-full border border-gray-300 p-2 rounded-sm text-sm outline-none focus:border-black" value={reviewForm.content} onChange={(e) => setReviewForm({...reviewForm, content: e.target.value})}></textarea>
                    </div>
                    <button type="submit" className="w-full bg-black text-white py-3 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-gray-800 transition-colors">
                        {editingReviewId ? "Update Review" : "Submit Review"}
                    </button>
                </form>
            </div>
        </div>
      )}

      {/* MODIFIED: Video Modal with Portrait Support & URL Fix */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black/80 z-100 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
            <div className="bg-black w-full max-w-sm aspect-9/16 relative shadow-2xl rounded-lg overflow-hidden border border-gray-800">
                <button onClick={() => setIsVideoOpen(false)} className="absolute top-4 right-4 z-50 text-white hover:text-red-500 bg-black/50 rounded-full p-2 transition-colors cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <iframe 
                  width="100%" 
                  height="100%" 
                  // UPDATED: Using getEmbedUrl helper
                  src={getEmbedUrl(product.videoUrl || "https://www.youtube.com/embed/S9V70Wob7MI")} 
                  title="Product Video" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full object-cover"
                ></iframe>
            </div>
        </div>
      )}
    </div>
  );
}