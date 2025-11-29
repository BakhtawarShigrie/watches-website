"use client";

import Home from "../page"; // Import the existing Home component

export default function LivePreviewPage() {
  return (
    <div className="relative border-4 border-blue-500 min-h-screen">
      <div className="bg-blue-600 text-white text-center text-xs font-bold py-1 uppercase tracking-widest sticky top-0 z-[60]">
        Live Preview Mode • (Content from Admin Panel)
      </div>
      {/* Render the actual Home Page */}
      <Home />
    </div>
  );
}