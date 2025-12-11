"use client";
import Link from "next/link";
import Image from "next/image";
import { useGlobalContext } from "@/context/GlobalContext";

export default function WishlistPage() {
  const { wishlist, products, featuredProducts, lovedProducts, addToCart, toggleWishlist } = useGlobalContext();
  
  const allProducts = [...products, ...featuredProducts, ...lovedProducts];
  const uniqueProducts = Array.from(new Map(allProducts.map(item => [item.id, item])).values());
  
  const wishlistItems = uniqueProducts.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-black text-white p-6 flex justify-between items-center sticky top-0 z-50">
        <Link href="/" className="text-lg font-bold tracking-widest uppercase cursor-pointer">Nayab Watches</Link>
        <span className="text-xs font-medium uppercase tracking-wider">My Wishlist</span>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* UPDATED: text-black */}
        <h1 className="text-3xl font-bold mb-8 text-center uppercase tracking-wider text-black">Your Wishlist ({wishlistItems.length})</h1>
        
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-6">Your wishlist is empty.</p>
            <Link href="/Products">
              <button className="bg-black text-white px-8 py-3 rounded-sm uppercase font-bold text-xs tracking-widest hover:bg-gray-800 cursor-pointer">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistItems.map((item) => (
              <div key={item.id} className="border border-gray-100 rounded-sm relative group overflow-hidden">
                
                {/* IMAGE CONTAINER (Clickable & White Background) */}
                <div className="relative h-64 w-full bg-white cursor-pointer">
                  <Link href={`/product/${item.id}`} className="block w-full h-full">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
                  </Link>
                  
                  {/* Remove Button */}
                  <button 
                    onClick={(e) => {
                        e.stopPropagation(); 
                        toggleWishlist(item.id);
                    }}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md text-red-500 hover:bg-red-50 z-10 cursor-pointer"
                    title="Remove from Wishlist"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                  </button>
                </div>

                {/* DETAILS */}
                <div className="p-4 text-center">
                  <Link href={`/product/${item.id}`} className="block hover:underline cursor-pointer">
                    <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1">{item.name}</h3>
                  </Link>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">{item.brand}</p>
                  <p className="text-sm font-bold text-black mb-4">Rs {item.price.toLocaleString()}</p>
                  <button 
                    onClick={() => addToCart(item)}
                    className="w-full bg-black text-white py-2 text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}