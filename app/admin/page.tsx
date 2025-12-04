"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";

// Importing sub-components from the new folder
import DashboardView from "./components/DashboardView";
import ProductsView from "./components/ProductsView";
import GenericListView from "./components/GenericListView";
import SettingsView from "./components/SettingsView";

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