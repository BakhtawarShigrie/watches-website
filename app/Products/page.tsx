"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useGlobalContext, ExtendedProduct } from "@/context/GlobalContext";
import { brandsList } from "@/app/website-data";

// Main Content Component inside Suspense
function ProductsContent() {
  const { products, categories, addToCart, cart, setIsCartOpen } = useGlobalContext();
  const searchParams = useSearchParams();

  // 1. Initialize variables directly from URL
  const initialCategory = searchParams.get("category");
  
  // --- STATES ---
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [sortOption, setSortOption] = useState("default");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // --- SEARCH STATES ---
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // --- EXPAND/COLLAPSE STATE ---
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    PRICE: false,
    GENDER: false,
    "WATCHES CATEGORY": !!initialCategory,
    BRANDS: false,
  });

  // --- EFFECT: Sync with URL changes ---
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
      setExpandedSections(prev => ({ ...prev, "WATCHES CATEGORY": true }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // Removed selectedCategory to avoid linter warning and loops

  // --- EFFECT: Click Outside to Close Search ---
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // --- FILTER LOGIC ---
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Filter by Search Query (Fuzzy Match)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter((p) => 
        p.name.toLowerCase().includes(query) || 
        p.brand.toLowerCase().includes(query) || 
        (p.category && p.category.toLowerCase().includes(query))
      );
    }

    // 2. Filter by Brand
    if (selectedBrand !== "All") {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    // 3. Filter by Category
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 4. Filter by Gender
    if (selectedGender !== "All") {
      result = result.filter((p) => p.gender === selectedGender);
    }

    // 5. Filter by Price
    result = result.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);

    // 6. Sorting
    if (sortOption === "lowToHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedBrand, selectedCategory, selectedGender, priceRange, sortOption, products, searchQuery]);

  // Badge Helper
  const renderProductBadge = (product: ExtendedProduct) => {
    if (product.stock === 0) {
      return (
        <span className="absolute top-2 right-2 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">
          Out of Stock
        </span>
      );
    }
    if (product.isNew) {
      return (
        <span className="absolute top-2 right-2 z-10 bg-[#49a010] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">
          New
        </span>
      );
    }
    return (
      <span className="absolute top-2 right-2 z-10 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">
        In Stock
      </span>
    );
  };

  // Reset Filters
  const clearFilters = () => {
    setSelectedBrand("All");
    setSelectedCategory("All");
    setSelectedGender("All");
    setPriceRange({ min: 0, max: 1000000 });
    setSearchQuery("");
  };

  return (
    <div className="bg-white min-h-screen font-sans text-[#333]">
      
      {/* NAVBAR */}
      <header className="bg-black text-white w-full z-50 flex items-center justify-between px-6 py-4 md:px-12 sticky top-0">
        <Link href="/" className="text-lg font-bold tracking-[0.15em] uppercase">Watches</Link>
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-300 uppercase tracking-widest">
          <Link href="/" className="hover:text-white transition-colors">Watches</Link>
          <Link href="#" className="hover:text-white transition-colors">Accessories</Link>
          <Link href="#" className="hover:text-white transition-colors">World of Watches</Link>
        </nav>
        
        {/* RIGHT ICONS SECTION (Search + Cart) */}
        <div className="flex items-center gap-5 text-zinc-200">
           
           {/* --- SEARCH BAR (Animated) --- */}
           <div ref={searchContainerRef} className="flex items-center relative">
              <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden flex items-center ${
                  isSearchOpen ? "w-40 md:w-64 opacity-100 mr-2" : "w-0 opacity-0 mr-0"
                }`}
              >
                <input 
                  type="text" 
                  placeholder="Search brand, name..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white text-black text-xs px-3 py-1.5 rounded-sm border-none focus:ring-2 focus:ring-gray-500 outline-none"
                  autoFocus={isSearchOpen}
                />
              </div>

              {/* SEARCH ICON */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)} 
                className={`hover:text-white cursor-pointer transition-colors ${isSearchOpen ? 'text-white' : ''}`}
                title="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
           </div>

           {/* Shopping Bag Icon */}
           <button onClick={() => setIsCartOpen(true)} className="hover:text-white cursor-pointer transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
              {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                      {cart.length}
                  </span>
              )}
           </button>
        </div>
      </header>

      {/* TOP BRAND SLIDER */}
      <div className="bg-[#f9f9f9] py-4 border-b border-gray-200">
        <div className="container mx-auto px-4 flex items-center justify-start md:justify-center gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex gap-3">
            {brandsList.map((brand) => (
              <button key={brand} onClick={() => setSelectedBrand(brand)} className={`px-6 py-2 cursor-pointer rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${selectedBrand === brand ? "bg-black text-white border-black" : "bg-white text-gray-500 border-transparent hover:bg-gray-200"}`}>{brand}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* HEADER & SORTING */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="text-xs text-gray-500 font-medium">
            <Link href="/" className="hover:text-black">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-black font-bold">All Products</span>
            {searchQuery && <span className="ml-2 text-gray-400 font-normal">(Searching: &quot;{searchQuery}&quot;)</span>}
          </div>
          
          <div className="flex items-center justify-between w-full md:w-auto gap-6">
             <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden flex items-center gap-2 text-sm font-bold text-black uppercase tracking-wider border border-gray-300 px-4 py-2 rounded-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg> Filters
             </button>

            <div className="flex items-center gap-6 text-sm ml-auto md:ml-0">
                <span className="text-gray-500 font-medium hidden sm:inline-block">{filteredProducts.length} Products Found</span>
                
                {/* Custom Sort Dropdown */}
                <div className="relative">
                    <button 
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="flex items-center gap-2 font-bold text-black hover:text-gray-700 transition-colors"
                    >
                        {sortOption === "default" ? "Default Sorting" : 
                         sortOption === "lowToHigh" ? "Price: Low to High" : "Price: High to Low"}
                        <svg 
                            width="10" height="6" viewBox="0 0 10 6" fill="none" 
                            className={`transform transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`}
                        >
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    
                    {isSortOpen && (
                        <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)}></div>
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-xl z-20 py-1 overflow-hidden">
                            <button onClick={() => { setSortOption("default"); setIsSortOpen(false); }} className={`w-full text-left px-4 py-2.5 text-xs uppercase tracking-wider transition-colors ${sortOption === "default" ? "font-bold text-black bg-gray-50" : "text-gray-500 hover:bg-gray-50 hover:text-black"}`}>Default Sorting</button>
                            <button onClick={() => { setSortOption("lowToHigh"); setIsSortOpen(false); }} className={`w-full text-left px-4 py-2.5 text-xs uppercase tracking-wider transition-colors ${sortOption === "lowToHigh" ? "font-bold text-black bg-gray-50" : "text-gray-500 hover:bg-gray-50 hover:text-black"}`}>Price: Low to High</button>
                            <button onClick={() => { setSortOption("highToLow"); setIsSortOpen(false); }} className={`w-full text-left px-4 py-2.5 text-xs uppercase tracking-wider transition-colors ${sortOption === "highToLow" ? "font-bold text-black bg-gray-50" : "text-gray-500 hover:bg-gray-50 hover:text-black"}`}>Price: High to Low</button>
                        </div>
                        </>
                    )}
                </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 relative">
          
          {/* SIDEBAR BACKDROP */}
          <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsSidebarOpen(false)}></div>

          {/* ================= SIDEBAR ================= */}
          <aside className={`fixed top-0 left-0 h-full w-[85%] max-w-xs bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto lg:w-64 lg:shadow-none lg:z-auto overflow-y-auto lg:overflow-visible ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="flex items-center justify-between p-5 border-b border-gray-200 lg:hidden">
                <span className="text-sm font-bold uppercase tracking-widest text-black">Filters</span>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>

            <div className="p-5 lg:p-0 space-y-4">
                
                {/* PRICE FILTER */}
                <div className="border-b border-gray-200 py-3">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("PRICE")}>
                        <span className="text-xs font-bold text-black uppercase tracking-wider">Price Range</span>
                        <svg className={`w-3 h-3 text-black transform transition-transform duration-300 ${expandedSections["PRICE"] ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                    {expandedSections["PRICE"] && (
                        <div className="space-y-3 mt-4">
                            <div className="flex items-center gap-2">
                                <input type="number" placeholder="Min" value={priceRange.min} onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })} className="w-1/2 border border-gray-300 p-2 text-xs rounded-sm focus:border-black outline-none"/>
                                <span className="text-gray-400">-</span>
                                <input type="number" placeholder="Max" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })} className="w-1/2 border border-gray-300 p-2 text-xs rounded-sm focus:border-black outline-none"/>
                            </div>
                            <p className="text-[10px] text-gray-400">Rs {priceRange.min.toLocaleString()} — Rs {priceRange.max.toLocaleString()}</p>
                        </div>
                    )}
                </div>

                {/* GENDER FILTER */}
                <div className="border-b border-gray-200 py-3">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("GENDER")}>
                        <span className="text-xs font-bold text-black uppercase tracking-wider">Gender</span>
                        <svg className={`w-3 h-3 text-black transform transition-transform duration-300 ${expandedSections["GENDER"] ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                    {expandedSections["GENDER"] && (
                        <div className="space-y-2 mt-4">
                            {["All", "Men", "Women", "Unisex"].map((gender) => (
                                <label key={gender} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-4 h-4 border rounded-sm flex items-center justify-center ${selectedGender === gender ? "bg-black border-black" : "border-gray-300 group-hover:border-gray-400"}`}>
                                        {selectedGender === gender && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                    </div>
                                    <input type="radio" name="gender" className="hidden" checked={selectedGender === gender} onChange={() => setSelectedGender(gender)} />
                                    <span className={`text-xs ${selectedGender === gender ? "text-black font-bold" : "text-gray-600"}`}>{gender}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* CATEGORY FILTER */}
                <div className="border-b border-gray-200 py-3">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("WATCHES CATEGORY")}>
                        <span className="text-xs font-bold text-black uppercase tracking-wider">Categories</span>
                        <svg className={`w-3 h-3 text-black transform transition-transform duration-300 ${expandedSections["WATCHES CATEGORY"] ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                    {expandedSections["WATCHES CATEGORY"] && (
                        <div className="space-y-2 mt-4">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-4 h-4 border rounded-sm flex items-center justify-center ${selectedCategory === "All" ? "bg-black border-black" : "border-gray-300"}`}>
                                    {selectedCategory === "All" && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                </div>
                                <input type="radio" name="category" className="hidden" checked={selectedCategory === "All"} onChange={() => setSelectedCategory("All")} />
                                <span className="text-xs text-gray-600">All Categories</span>
                            </label>
                            {categories.map((cat, idx) => (
                                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-4 h-4 border rounded-sm flex items-center justify-center ${selectedCategory === cat.name ? "bg-black border-black" : "border-gray-300 group-hover:border-gray-400"}`}>
                                        {selectedCategory === cat.name && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                    </div>
                                    <input type="radio" name="category" className="hidden" checked={selectedCategory === cat.name} onChange={() => setSelectedCategory(cat.name)} />
                                    <span className={`text-xs ${selectedCategory === cat.name ? "text-black font-bold" : "text-gray-600"}`}>{cat.name}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* BRAND FILTER */}
                <div className="border-b border-gray-200 py-3">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("BRANDS")}>
                        <span className="text-xs font-bold text-black uppercase tracking-wider">Brands</span>
                        <svg className={`w-3 h-3 text-black transform transition-transform duration-300 ${expandedSections["BRANDS"] ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                    {expandedSections["BRANDS"] && (
                        <div className="space-y-2 mt-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {brandsList.map((brand, idx) => (
                                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-4 h-4 border rounded-sm flex items-center justify-center ${selectedBrand === brand ? "bg-black border-black" : "border-gray-300 group-hover:border-gray-400"}`}>
                                        {selectedBrand === brand && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                    </div>
                                    <input type="radio" name="brand" className="hidden" checked={selectedBrand === brand} onChange={() => setSelectedBrand(brand)} />
                                    <span className={`text-xs ${selectedBrand === brand ? "text-black font-bold" : "text-gray-600"}`}>{brand}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Clear Filters Button */}
                <button onClick={clearFilters} className="w-full py-2 text-xs font-bold text-red-600 border border-red-200 hover:bg-red-50 rounded-sm uppercase tracking-wider mt-4">
                    Clear All Filters
                </button>

            </div>
            
            {/* Mobile Apply Button */}
            <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-200 bg-white lg:hidden">
                <button onClick={() => setIsSidebarOpen(false)} className="w-full bg-black text-white text-xs font-bold uppercase tracking-widest py-3 rounded-sm hover:bg-gray-800 transition-colors">View {filteredProducts.length} Results</button>
            </div>
          </aside>

          {/* ================= MAIN PRODUCT GRID ================= */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group relative block">
                    <Link href={`/product/${product.id}`} className="cursor-pointer">
                        <div className="relative w-full aspect-[4/5] bg-white mb-4 overflow-hidden border border-gray-100 rounded-sm">
                        {renderProductBadge(product)}
                        <Image src={product.image} alt={product.name} fill className="object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
                        
                        {/* --- CART BUTTON --- */}
                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart(product);
                            }}
                            className="absolute bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all z-20 
                            opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-10 lg:group-hover:opacity-100 lg:group-hover:translate-y-0"
                            title="Add to Cart"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        </button>

                        </div>
                        <div className="text-center">
                        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{product.brand}</h4>
                        <h3 className="text-sm font-medium text-black leading-snug mb-2 px-2">{product.name}</h3>
                        <div className="text-sm font-bold text-gray-900">Rs {product.price.toLocaleString()}</div>
                        <div className="text-[9px] text-gray-400 uppercase mt-1">inc. GST</div>
                        </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
                // No Results
                <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-gray-300 rounded-sm">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-lg font-bold text-black mb-2">No Products Found</h3>
                    <p className="text-gray-500 text-sm mb-6">Try adjusting your filters or search criteria.</p>
                    <button onClick={clearFilters} className="bg-black text-white px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-gray-800 transition-colors">
                        Clear Filters
                    </button>
                </div>
            )}
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#f9f9f9] text-[#333] pt-16 pb-8 font-sans border-t border-gray-200 mt-12">
         <div className="container mx-auto px-4 text-center">
            <p className="text-xs text-gray-500">Copyright 2024 Lifestyle Collection all rights reserved.</p>
         </div>
      </footer>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}