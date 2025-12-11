"use client";

import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedProductsSection from "@/components/FeaturedProductsSection";
import FeaturedCollectionSection from "@/components/FeaturedCollectionSection";
import LovedProductsSection from "@/components/LovedProductsSection";
import AdSection from "@/components/AdSection";
import MagazineSection from "@/components/MagazineSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import FloatingChatButton from "@/components/FloatingChatButton";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-white font-sans text-[#333]">
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      {/* <FeaturedCollectionSection /> */}
      <LovedProductsSection />
      <AdSection />
      <MagazineSection />
      <FAQSection />
      <Footer />
      <FloatingChatButton />
    </main>
  );
}