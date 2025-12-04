"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGlobalContext, ExtendedProduct } from "@/context/GlobalContext";
import { brandsList } from "@/app/website-data"; // Creating brands list dynamically in export

// ======================= SUB-COMPONENTS (VIEWS) =======================

// 1. DASHBOARD VIEW
const DashboardView = () => {
  const { products, featuredProducts, lovedProducts, newsArticles } = useGlobalContext();
  
  const stats = [
    { title: "Total Products", value: products.length, icon: "📦", color: "bg-blue-50 text-blue-700" },
    { title: "Featured", value: featuredProducts.length, icon: "⭐", color: "bg-yellow-50 text-yellow-600" },
    { title: "Loved", value: lovedProducts.length, icon: "❤", color: "bg-red-50 text-red-600" },
    { title: "Magazines", value: newsArticles.length, icon: "📰", color: "bg-orange-50 text-orange-700" },
  ];

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 md:p-6 rounded-sm shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider truncate">{stat.title}</p>
              <p className="text-2xl font-bold text-black">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 2. GENERIC LIST VIEW
interface ListViewProps<T> {
  title: string;
  data: T[];
  onAdd?: (item: T) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete?: (id: any) => void;
  fields: { name: string; key: keyof T; type?: string }[];
  idKey: keyof T;
  showAddButton?: boolean;
}

const GenericListView = <T,>({ 
  title, 
  data, 
  onAdd, 
  onDelete, 
  fields, 
  idKey, 
  showAddButton = true 
}: ListViewProps<T>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<T>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onAdd && newItem) {
        onAdd(newItem as T);
    }
    setIsModalOpen(false);
    setNewItem({});
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        {showAddButton && (
          <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto bg-black text-white px-6 py-2 rounded-sm text-sm font-medium hover:bg-gray-800 transition-colors">
            + Add New
          </button>
        )}
      </div>

      <div className="bg-white rounded-sm border border-gray-200 overflow-hidden w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm min-w-[600px]">
            <thead className="bg-gray-50 font-bold text-gray-500 uppercase text-xs">
              <tr>
                {fields.map(f => <th key={String(f.key)} className="p-3 md:p-4 whitespace-nowrap">{f.name}</th>)}
                {onDelete && <th className="p-3 md:p-4 text-center whitespace-nowrap">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.length > 0 ? (
                data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    {fields.map(f => (
                      <td key={String(f.key)} className="p-3 md:p-4">
                        {(f.key === 'image' || f.key === 'thumbnail') && typeof item[f.key] === 'string' ? (
                          <div className="w-10 h-10 md:w-12 md:h-12 relative bg-gray-100 rounded overflow-hidden border border-gray-200 shrink-0">
                            {item[f.key] ? (
                                <Image src={item[f.key] as string} alt="img" fill className="object-cover w-full h-full" />
                            ) : null}
                          </div>
                        ) : (
                          <span className="line-clamp-2">{String(item[f.key])}</span>
                        )}
                      </td>
                    ))}
                    {onDelete && (
                      <td className="p-3 md:p-4 text-center">
                        <button onClick={() => onDelete(item[idKey])} className="text-red-500 hover:text-red-700 font-bold p-2">🗑</button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={fields.length + 1} className="p-8 text-center text-gray-400">No items found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && showAddButton && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Add Item</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map(f => (
                <div key={String(f.key)}>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">{f.name}</label>
                  <input
                    placeholder={f.name}
                    className="w-full border border-gray-300 p-2.5 rounded text-sm focus:ring-1 focus:ring-black outline-none"
                    value={String(newItem[f.key] || '')}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={e => setNewItem({ ...newItem, [f.key]: e.target.value as any })}
                    required
                  />
                </div>
              ))}
              <div className="flex gap-3 justify-end mt-6 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-500 text-sm hover:bg-gray-100 rounded">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-black text-white rounded text-sm hover:bg-gray-800">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// 3. PRODUCTS VIEW
const ProductsView = () => {
  const { products, deleteProduct, addProduct, updateProduct, toggleStock, featuredProducts, toggleFeatured, lovedProducts, toggleLoved, categories } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Product CRUD Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Love Popup States
  const [isLoveModalOpen, setIsLoveModalOpen] = useState(false);
  const [productToLove, setProductToLove] = useState<ExtendedProduct | null>(null);
  const [loveImageInput, setLoveImageInput] = useState("");

  const initialProductState: ExtendedProduct = {
    id: 0,
    name: "",
    brand: "",
    price: 0,
    originalPrice: 0,
    discountPercentage: 0,
    stock: 0,
    category: "",
    image: "",
    images: [],
    isNew: false
  };
  const [currentProduct, setCurrentProduct] = useState<ExtendedProduct>(initialProductState);
  const [imageInput, setImageInput] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- HANDLERS ---
  const handleOpenAdd = () => {
    setCurrentProduct(initialProductState);
    setImageInput("");
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: ExtendedProduct) => {
    setCurrentProduct(product);
    setImageInput(product.images ? product.images.join(",\n") : product.image);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handlePriceCalculation = (sellingPrice: number, discount: number) => {
    if (discount > 0 && discount < 100) {
      const real = Math.round(sellingPrice / (1 - discount / 100));
      setCurrentProduct(prev => ({ ...prev, price: sellingPrice, discountPercentage: discount, originalPrice: real }));
    } else {
      setCurrentProduct(prev => ({ ...prev, price: sellingPrice, discountPercentage: 0, originalPrice: sellingPrice }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const imagesArray = imageInput.split(",").map(s => s.trim()).filter(s => s !== "");
    const mainImage = imagesArray.length > 0 ? imagesArray[0] : "";

    const productToSave: ExtendedProduct = {
      ...currentProduct,
      image: mainImage,
      images: imagesArray,
    };

    if (isEditMode) {
      updateProduct(productToSave.id, productToSave);
    } else {
      addProduct(productToSave);
    }
    setIsModalOpen(false);
  };

  // --- LOVE HANDLERS ---
  const isLoved = (id: number) => lovedProducts.some(p => p.id === id);
  
  const handleHeartClick = (product: ExtendedProduct) => {
    if (isLoved(product.id)) {
        // If already loved, just toggle it off (remove)
        toggleLoved(product);
    } else {
        // If adding to loved, open the popup
        setProductToLove(product);
        setLoveImageInput(""); // Reset input
        setIsLoveModalOpen(true);
    }
  };

  const handleConfirmLove = (e: FormEvent) => {
    e.preventDefault();
    if (productToLove) {
        toggleLoved(productToLove, loveImageInput); // Pass the custom image
        setIsLoveModalOpen(false);
        setProductToLove(null);
    }
  };

  const isFeatured = (id: number) => featuredProducts.some(p => p.id === id);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold">All Products</h2>
        <button onClick={handleOpenAdd} className="w-full sm:w-auto bg-black text-white px-6 py-2 rounded-sm text-sm font-medium hover:bg-gray-800 transition-colors">
          + Add Product
        </button>
      </div>

      <div className="bg-white p-3 md:p-4 rounded-sm border border-gray-200 mb-6">
        <input 
          type="text" 
          placeholder="Search products..." 
          className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-black text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-sm border border-gray-200 overflow-hidden w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm min-w-[900px]">
            <thead className="bg-gray-50 font-bold text-gray-500 uppercase text-xs">
              <tr>
                <th className="p-3 md:p-4 whitespace-nowrap">Product</th>
                <th className="p-3 md:p-4 whitespace-nowrap">Category</th>
                <th className="p-3 md:p-4 whitespace-nowrap">Price</th>
                <th className="p-3 md:p-4 whitespace-nowrap">Stock Status (Click to Toggle)</th>
                <th className="p-3 md:p-4 text-center">Featured</th>
                <th className="p-3 md:p-4 text-center">Loved</th>
                <th className="p-3 md:p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 md:p-4 flex items-center gap-3 min-w-[200px]">
                    <div className="w-10 h-10 md:w-12 md:h-12 relative bg-gray-100 rounded-md overflow-hidden border border-gray-200 shrink-0">
                      {product.image && (
                        <Image 
                          src={product.image} 
                          alt={product.name} 
                          fill 
                          className="object-cover w-full h-full" 
                          sizes="50px"
                        />
                      )}
                    </div>
                    <div>
                      <span className="font-medium text-black line-clamp-1 block">{product.name}</span>
                      <span className="text-[10px] text-gray-500 uppercase">{product.brand}</span>
                    </div>
                  </td>
                  <td className="p-3 md:p-4 text-gray-500 whitespace-nowrap">{product.category || "-"}</td>
                  <td className="p-3 md:p-4 whitespace-nowrap">
                    <div className="flex flex-col">
                        <span className="font-bold">Rs. {product.price.toLocaleString()}</span>
                        {product.discountPercentage ? (
                            <span className="text-[10px] text-gray-400 line-through">Rs. {product.originalPrice?.toLocaleString()}</span>
                        ) : null}
                    </div>
                  </td>

                  {/* Stock Toggle Button */}
                  <td className="p-3 md:p-4 whitespace-nowrap">
                    <button 
                      onClick={() => toggleStock(product)}
                      className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                        product.stock && product.stock > 0 
                        ? "bg-green-100 text-green-700 hover:bg-green-200" 
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                    >
                      {product.stock && product.stock > 0 
                        ? `In Stock (${product.stock})` 
                        : "Out of Stock"}
                    </button>
                  </td>
                  
                  {/* Featured Toggle */}
                  <td className="p-3 md:p-4 text-center">
                    <button onClick={() => toggleFeatured(product)} className={`text-xl transition-all p-2 ${isFeatured(product.id) ? "text-yellow-400 scale-110" : "text-gray-200 hover:text-yellow-200"}`}>★</button>
                  </td>

                  {/* Loved Toggle (Opens Modal) */}
                  <td className="p-3 md:p-4 text-center">
                    <button onClick={() => handleHeartClick(product)} className={`text-lg transition-all p-2 ${isLoved(product.id) ? "text-red-500 scale-110" : "text-gray-200 hover:text-red-200"}`}>❤</button>
                  </td>

                  {/* Actions */}
                  <td className="p-3 md:p-4 text-center flex items-center justify-center gap-2">
                    <button onClick={() => handleOpenEdit(product)} className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded text-xs font-bold transition-colors">Edit</button>
                    <button onClick={() => deleteProduct(product.id)} className="text-red-500 hover:text-red-700 font-bold p-2 text-lg">×</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-gray-100">
                {isEditMode ? "Edit Product" : "Add New Product"}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Product Name <span className="text-red-500">*</span></label>
                    <input className="w-full border border-gray-300 p-2.5 rounded text-sm focus:ring-1 focus:ring-black outline-none" 
                        value={currentProduct.name} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} required />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Brand <span className="text-red-500">*</span></label>
                    <input className="w-full border border-gray-300 p-2.5 rounded text-sm focus:ring-1 focus:ring-black outline-none"
                        value={currentProduct.brand} onChange={e => setCurrentProduct({...currentProduct, brand: e.target.value})} required />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Product Category <span className="text-red-500">*</span></label>
                    <select className="w-full border border-gray-300 p-2.5 rounded text-sm focus:ring-1 focus:ring-black outline-none bg-white"
                        value={currentProduct.category} onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})} required>
                        <option value="">Select Category</option>
                        {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Discounted Price (Selling) <span className="text-red-500">*</span></label>
                    <input type="number" className="w-full border border-gray-300 p-2.5 rounded text-sm focus:ring-1 focus:ring-black outline-none" 
                        value={currentProduct.price || ''} 
                        onChange={e => handlePriceCalculation(Number(e.target.value), currentProduct.discountPercentage || 0)} required />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Discount Percentage (%)</label>
                    <input type="number" className="w-full border border-gray-300 p-2.5 rounded text-sm focus:ring-1 focus:ring-black outline-none" 
                        value={currentProduct.discountPercentage || ''} 
                        onChange={e => handlePriceCalculation(currentProduct.price, Number(e.target.value))} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Real Price (Auto-Calculated)</label>
                    <input type="number" className="w-full border border-gray-200 bg-gray-50 text-gray-500 p-2.5 rounded text-sm focus:outline-none cursor-not-allowed" 
                        value={currentProduct.originalPrice || ''} readOnly />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Stock Quantity <span className="text-red-500">*</span></label>
                    <input type="number" className="w-full border border-gray-300 p-2.5 rounded text-sm focus:ring-1 focus:ring-black outline-none" 
                        value={currentProduct.stock || ''} onChange={e => setCurrentProduct({...currentProduct, stock: Number(e.target.value)})} required />
                  </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Image URLs (Comma separated) <span className="text-red-500">*</span></label>
                <textarea rows={3} className="w-full border border-gray-300 p-2.5 rounded text-sm focus:ring-1 focus:ring-black outline-none" 
                    placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                    value={imageInput} onChange={e => setImageInput(e.target.value)} required />
                <p className="text-[10px] text-gray-400 mt-1">First image will be the main thumbnail.</p>
              </div>
              <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-gray-600 text-sm font-bold hover:bg-gray-100 rounded transition-colors">Cancel</button>
                <button type="submit" className="px-8 py-2.5 bg-black text-white rounded text-sm font-bold hover:bg-gray-800 transition-colors shadow-lg">
                    {isEditMode ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD TO LOVED POPUP MODAL */}
      {isLoveModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-4 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-2xl transform scale-100 transition-all">
            <h3 className="text-xl font-bold mb-4 text-center">Add to Loved Products</h3>
            <p className="text-sm text-gray-500 mb-6 text-center">
              Please provide a custom image URL for this product to appear in the "Loved" section.
            </p>
            
            <form onSubmit={handleConfirmLove}>
                <div className="mb-4">
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Loved Image URL <span className="text-red-500">*</span></label>
                  <input 
                    type="text"
                    className="w-full border border-gray-300 p-3 rounded text-sm focus:ring-2 focus:ring-black outline-none"
                    placeholder="https://..."
                    value={loveImageInput}
                    onChange={(e) => setLoveImageInput(e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-3">
                    <button 
                        type="button" 
                        onClick={() => setIsLoveModalOpen(false)} 
                        className="flex-1 py-3 text-gray-600 text-sm font-bold hover:bg-gray-100 rounded transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="flex-1 py-3 bg-red-600 text-white rounded text-sm font-bold hover:bg-red-700 transition-colors shadow-md"
                    >
                        Confirm & Love
                    </button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// 5. SETTINGS VIEW
const SettingsView = () => {
  const contextData = useGlobalContext();
  const [username, setUsername] = useState(contextData.adminCreds.user);
  const [password, setPassword] = useState(contextData.adminCreds.pass);

  const handleSaveSettings = () => {
    contextData.updateAdminCreds(username, password);
    alert("Credentials Updated! (Export data to save permanently)");
  };

  const handleExport = () => {
    // We construct the file string manually to match the exact TypeScript format
    const fileContent = `
// app/website-data.ts (Generated from Admin Panel)

export interface Product {
  id: number;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  image: string;
  images?: string[];
  isNew?: boolean;
  stock?: number;
  reviews?: number;
  description?: string;
  thumbnail?: string;
  category?: string;
}

export interface Category {
  name: string;
  image: string;
}

export interface Collection {
  title: string;
  description: string;
  image: string;
}

export interface Article {
  title: string;
  category: string;
  date: string;
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  title: string;
  content: string;
  verified: boolean;
}

// --- IMAGES ---
export const heroBgImage = "https://images.unsplash.com/photo-1670404160620-a3a86428560e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bHV4dXJ5JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D";
export const adBgImage = "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdhdGNofGVufDB8fDB8fHww";

// --- CATEGORIES ---
export const categoriesData: Category[] = ${JSON.stringify(contextData.categories, null, 2)};

// --- HOME PAGE DATA ---

// Featured Products
export const homeFeaturedProducts: Product[] = ${JSON.stringify(contextData.featuredProducts, null, 2)};

// Loved Products
export const homeLovedProducts: Product[] = ${JSON.stringify(contextData.lovedProducts, null, 2)};

export const featuredCollectionsData: Collection[] = ${JSON.stringify(contextData.featuredCollections, null, 2)};

export const newsArticlesData: Article[] = ${JSON.stringify(contextData.newsArticles, null, 2)};

export const faqsData: FAQ[] = ${JSON.stringify(contextData.faqs, null, 2)};

// --- MAIN PRODUCTS CATALOG ---
export const mainProductsData: Product[] = ${JSON.stringify(contextData.products, null, 2)};

// --- FILTERS & BRANDS ---
export const brandsList = [
  "All",
  "VOGUE",
  "CASIO EDIFICE",
  "CASIO G-SHOCK",
  "GC",
  "GUESS",
  "MOVADO",
  "RAY-BAN"
];

export const sidebarFiltersList = [
  "PRICE",
  "GENDER",
  "PRODUCTS",
  "WATCHES CATEGORY",
  "BRANDS",
  "CASE MATERIAL",
  "CASE SHAPE",
  "CASE SIZE",
  "STRAP / BRACELET",
  "FEATURE",
  "MOVEMENT"
];

// --- REVIEWS ---
export const reviewsData: Review[] = ${JSON.stringify(contextData.reviews, null, 2)};
`;

    const blob = new Blob([fileContent], { type: "text/typescript" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "website-data.ts";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 mb-8 text-center sm:text-left">
        <div className="relative">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-gray-100 bg-gray-800 flex items-center justify-center text-white text-3xl font-bold">BS</div>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-black">Bakhtawar Shigrie</h2>
          <p className="text-gray-500">Super Admin</p>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
          </div>
        </div>
        <div className="mt-6 text-right">
            <button onClick={handleSaveSettings} className="bg-black text-white px-6 py-2 rounded-sm text-sm font-medium hover:bg-gray-800 w-full sm:w-auto">Update Credentials</button>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-4">Export & Preview</h3>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-md">
          <div className="flex items-start gap-3">
            <div className="text-blue-500 mt-1">ℹ</div>
            <div>
              <h4 className="text-blue-800 font-bold text-sm">Ready to Deploy?</h4>
              <p className="text-blue-600 text-xs mt-1">Click &apos;Export Data&apos; to download the updated code file, then replace your project&apos;s <strong>website-data.ts</strong> file.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button onClick={() => window.open('/live-changes', '_blank')} className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors">
            View Changes
          </button>
          
          <button onClick={handleExport} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors shadow-sm">
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
};

// ======================= MAIN PAGE COMPONENT =======================

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { 
    categories, addCategory, deleteCategory,
    featuredCollections, addCollection, deleteCollection,
    newsArticles, addArticle, deleteArticle,
    faqs, addFAQ, deleteFAQ,
    featuredProducts, toggleFeatured, 
    lovedProducts, toggleLoved
  } = useGlobalContext();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/admin/login");
    } else {
        setTimeout(() => setIsLoading(false), 0);
    }
  }, [router]);

  if (isLoading) return null;

  const menuItems = [
    { name: "Dashboard", icon: "⊞" },
    { name: "Products", icon: "📦" },
    { name: "Featured", icon: "⭐" },
    { name: "Loved", icon: "❤" },
    { name: "Categories", icon: "Dg" },
    { name: "Collections", icon: "📚" },
    { name: "Magazines", icon: "📰" },
    { name: "FAQs", icon: "❓" },
    { name: "Settings", icon: "⚙" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F9F9F9] font-sans text-[#333]">
      
      {/* MOBILE HEADER */}
      <div className="fixed top-0 left-0 w-full bg-white z-50 border-b border-gray-200 md:hidden flex items-center justify-between p-4 shadow-sm">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-xs">BS</div>
           <span className="font-bold text-sm">Admin Panel</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>

      {/* OVERLAY */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 flex items-center gap-3 border-b border-gray-100">
          <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">BS</div>
          <div>
            <h3 className="text-sm font-bold text-black">Bakhtawar Shigrie</h3>
            <p className="text-[10px] text-gray-500 uppercase">Super Admin</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => { setActiveTab(item.name); setIsSidebarOpen(false); }}
              className={`flex w-full items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === item.name
                  ? "bg-black text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`}
            >
              <span className="text-lg w-6 text-center">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => {
              localStorage.removeItem("isAdmin");
              router.push("/admin/login");
            }}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md w-full"
          >
            <span>↪</span> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-8 md:ml-64 pt-20 md:pt-8 w-full max-w-full overflow-hidden">
        
        {activeTab === "Dashboard" && <DashboardView />}
        
        {activeTab === "Products" && <ProductsView />}

        {activeTab === "Featured" && (
          <GenericListView 
            title="Featured Products" 
            data={featuredProducts} 
            showAddButton={false} 
            onDelete={(id) => {
               const p = featuredProducts.find(x => x.id === id);
               if(p) toggleFeatured(p);
            }}
            idKey="id"
            fields={[{ name: "Product Name", key: "name" }, { name: "Image", key: "image" }, { name: "Price", key: "price" }]} 
          />
        )}

        {activeTab === "Loved" && (
          <GenericListView 
            title="Loved Products" 
            data={lovedProducts} 
            showAddButton={false} 
            onDelete={(id) => {
               const p = lovedProducts.find(x => x.id === id);
               if(p) toggleLoved(p);
            }}
            idKey="id"
            fields={[{ name: "Product Name", key: "name" }, { name: "Image", key: "image" }, { name: "Price", key: "price" }]} 
          />
        )}

        {activeTab === "Categories" && (
          <GenericListView 
            title="Product Categories" 
            data={categories} 
            onAdd={addCategory} 
            onDelete={(id) => deleteCategory(id as string)}
            idKey="name"
            fields={[{ name: "Name", key: "name" }, { name: "Image URL", key: "image" }]} 
          />
        )}

        {activeTab === "Collections" && (
          <GenericListView 
            title="Featured Collections" 
            data={featuredCollections} 
            onAdd={addCollection} 
            onDelete={(id) => deleteCollection(id as string)}
            idKey="title"
            fields={[{ name: "Title", key: "title" }, { name: "Description", key: "description" }, { name: "Image URL", key: "image" }]} 
          />
        )}

        {activeTab === "Magazines" && (
          <GenericListView 
            title="Magazines & News" 
            data={newsArticles} 
            onAdd={addArticle} 
            onDelete={(id) => deleteArticle(id as string)}
            idKey="title"
            fields={[{ name: "Title", key: "title" }, { name: "Category", key: "category" }, { name: "Date", key: "date" }, { name: "Image URL", key: "image" }]} 
          />
        )}

        {activeTab === "FAQs" && (
          <GenericListView 
            title="FAQs" 
            data={faqs} 
            onAdd={addFAQ} 
            onDelete={(id) => deleteFAQ(id as string)}
            idKey="question"
            fields={[{ name: "Question", key: "question" }, { name: "Answer", key: "answer" }]} 
          />
        )}

        {activeTab === "Settings" && <SettingsView />}

      </main>
    </div>
  );
}