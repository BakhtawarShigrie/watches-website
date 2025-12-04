"use client";
import { useGlobalContext } from "@/context/GlobalContext";

export default function DashboardView() {
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
}