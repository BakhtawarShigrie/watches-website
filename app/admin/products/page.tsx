// app/admin/products/page.tsx
"use client";

import { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import Image from "next/image";

export default function AdminProducts() {
  const { products, deleteProduct, addProduct } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState("");
  
  // State for Add Product Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    brand: "",
    name: "",
    price: 0,
    image: "",
    category: "Watches"
  });

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      id: 0, // ID is handled in context
      ...newProduct,
      originalPrice: newProduct.price * 1.2, // Mock original price
    });
    setIsModalOpen(false);
    setNewProduct({ brand: "", name: "", price: 0, image: "", category: "Watches" });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Products</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-6 py-2 rounded-sm text-sm font-medium hover:bg-gray-800"
        >
          + Add Product
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-sm border border-gray-200 mb-6">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 relative bg-gray-100 rounded-md overflow-hidden">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  </div>
                  <span className="font-medium">{product.name}</span>
                </td>
                <td className="p-4 text-gray-500">{product.brand}</td>
                <td className="p-4 font-bold">Rs. {product.price}</td>
                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                    In Stock
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal (Simple) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                placeholder="Product Name" 
                className="w-full border p-2 rounded" 
                value={newProduct.name}
                onChange={e => setNewProduct({...newProduct, name: e.target.value})} 
                required 
              />
              <input 
                placeholder="Brand" 
                className="w-full border p-2 rounded" 
                value={newProduct.brand}
                onChange={e => setNewProduct({...newProduct, brand: e.target.value})} 
                required 
              />
              <input 
                placeholder="Price" 
                type="number" 
                className="w-full border p-2 rounded" 
                value={newProduct.price}
                onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} 
                required 
              />
              <input 
                placeholder="Image URL" 
                className="w-full border p-2 rounded" 
                value={newProduct.image}
                onChange={e => setNewProduct({...newProduct, image: e.target.value})} 
                required 
              />
              <div className="flex gap-2 justify-end mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-500">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-black text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}