"use client";
import { useState, FormEvent } from "react";
import Image from "next/image";
import { useGlobalContext, ExtendedProduct } from "@/context/GlobalContext";

export default function ProductsView() {
  const { products, deleteProduct, addProduct, updateProduct, toggleStock, featuredProducts, toggleFeatured, lovedProducts, toggleLoved, categories } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Product CRUD Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Love Popup States
  const [isLoveModalOpen, setIsLoveModalOpen] = useState(false);
  const [productToLove, setProductToLove] = useState<ExtendedProduct | null>(null);
  const [loveImageInput, setLoveImageInput] = useState("");

  // Stock Popup States
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [stockProduct, setStockProduct] = useState<ExtendedProduct | null>(null);
  const [stockQtyInput, setStockQtyInput] = useState<string>("");

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
        toggleLoved(product);
    } else {
        setProductToLove(product);
        setLoveImageInput(""); 
        setIsLoveModalOpen(true);
    }
  };

  const handleConfirmLove = (e: FormEvent) => {
    e.preventDefault();
    if (productToLove) {
        toggleLoved(productToLove, loveImageInput);
        setIsLoveModalOpen(false);
        setProductToLove(null);
    }
  };

  // --- STOCK HANDLERS ---
  const handleStockClick = (product: ExtendedProduct) => {
    setStockProduct(product);
    setStockQtyInput(product.stock && product.stock > 0 ? "" : "10"); 
    setIsStockModalOpen(true);
  };

  const handleConfirmStock = (e: FormEvent) => {
    e.preventDefault();
    if (!stockProduct) return;

    let newStock = 0;
    if (stockProduct.stock && stockProduct.stock > 0) {
        newStock = 0;
    } else {
        newStock = parseInt(stockQtyInput);
        if (isNaN(newStock) || newStock < 0) newStock = 0;
    }

    updateProduct(stockProduct.id, { ...stockProduct, stock: newStock });
    setIsStockModalOpen(false);
    setStockProduct(null);
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
                      onClick={() => handleStockClick(product)}
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

                  {/* Loved Toggle */}
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
      
      {/* STOCK MODAL */}
      {isStockModalOpen && stockProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-4 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-2xl transform transition-all scale-100">
            <div className="flex flex-col items-center mb-6 text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${stockProduct.stock && stockProduct.stock > 0 ? "bg-red-50 text-red-500" : "bg-green-50 text-green-500"}`}>
                    {stockProduct.stock && stockProduct.stock > 0 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    )}
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                    {stockProduct.stock && stockProduct.stock > 0 ? "Mark Out of Stock?" : "Restock Product"}
                </h3>
                <p className="text-xs text-gray-500 mt-1 max-w-[200px]">
                    {stockProduct.name}
                </p>
            </div>

            <form onSubmit={handleConfirmStock}>
                {stockProduct.stock && stockProduct.stock > 0 ? (
                    <p className="text-sm text-gray-600 text-center mb-6">
                        This item currently has <span className="font-bold text-black">{stockProduct.stock}</span> units. 
                        Are you sure you want to mark it as <span className="text-red-600 font-bold">Out of Stock</span>?
                    </p>
                ) : (
                    <div className="mb-6">
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Enter Quantity to Add</label>
                        <input 
                            type="number" 
                            className="w-full border border-gray-300 p-3 rounded-lg text-sm focus:ring-2 focus:ring-black outline-none font-bold text-center text-lg"
                            value={stockQtyInput}
                            onChange={(e) => setStockQtyInput(e.target.value)}
                            placeholder="10"
                            min="1"
                            autoFocus
                            required
                        />
                    </div>
                )}

                <div className="flex gap-3">
                    <button type="button" onClick={() => setIsStockModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 text-sm font-bold hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
                    <button type="submit" className={`flex-1 py-3 text-white rounded-lg text-sm font-bold transition-colors shadow-md ${stockProduct.stock && stockProduct.stock > 0 ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}>
                        {stockProduct.stock && stockProduct.stock > 0 ? "Yes, Unstock" : "Update Stock"}
                    </button>
                </div>
            </form>
          </div>
        </div>
      )}

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
              Please provide a custom image URL for this product to appear in the &quot;Loved&quot; section.
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
                    <button type="button" onClick={() => setIsLoveModalOpen(false)} className="flex-1 py-3 text-gray-600 text-sm font-bold hover:bg-gray-100 rounded transition-colors">Cancel</button>
                    <button type="submit" className="flex-1 py-3 bg-red-600 text-white rounded text-sm font-bold hover:bg-red-700 transition-colors shadow-md">Confirm & Love</button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}