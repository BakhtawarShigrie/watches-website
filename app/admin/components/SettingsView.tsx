"use client";
import { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";

export default function SettingsView() {
  const contextData = useGlobalContext();
  const [username, setUsername] = useState(contextData.adminCreds.user);
  const [password, setPassword] = useState(contextData.adminCreds.pass);

  const handleSaveSettings = () => {
    contextData.updateAdminCreds(username, password);
    alert("Credentials Updated! (Export data to save permanently)");
  };

  const handleExport = () => {
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
}