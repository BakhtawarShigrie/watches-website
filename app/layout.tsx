import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GlobalProvider } from "@/context/GlobalContext";
import CartSidebar from "@/components/CartSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- GOOGLE SEO CONFIGURATION START ---
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nayabwatches.com"), // Apni real domain yahan likhein
  title: {
    default: "Nayab Watches | No.1 Luxury Watch Store in Pakistan | Sale Live",
    template: "%s | Nayab Watches Pakistan",
  },
  description:
    "Buy premium quality watches in Pakistan at the cheapest rates. We offer Citizen, Rolex, Forichs, Moonston, Success Way, and Arabic Aura watches. Enjoy Cash on Delivery (COD) in Lahore, Karachi, Islamabad, and all cities. 12.12 Sale is live on Men's, Women's, and Couple watches.",
  applicationName: "Nayab Watches",
  authors: [{ name: "Nayab Watches Team", url: "https://nayabwatches.com" }],
  generator: "Next.js",
  keywords: [
    // --- BRAND KEYWORDS ---
    "Citizen Watches Price in Pakistan",
    "Rolex Watches Price in Pakistan",
    "Forichs Watches Online",
    "Moonston Arabic Dial Watches",
    "Success Way Watches L-237",
    "Arabic Aura Watches Pakistan",
    "Casio Edifice Pakistan",
    "Casio G-Shock Pakistan",
    "Ray-Ban Sunglasses Pakistan",
    "Movado Watches Pakistan",
    "Guess Watches Price",
    "GC Watches Pakistan",
    "Vogue Watches",
    
    // --- CATEGORY KEYWORDS ---
    "Luxury Watches in Pakistan",
    "Men Sports Watches Pakistan",
    "Men Formal Watches Pakistan",
    "Female Watches Price in Pakistan",
    "Ladies Branded Watches",
    "Couple Watches Set Box",
    "Smart Watches Price in Pakistan",
    "Automatic Watches Pakistan",
    "Chronograph Watches for Men",
    "Quartz Watches Online",
    "Stainless Steel Watches",
    "Leather Strap Watches",
    "Skeleton Watches",
    
    // --- INTENT & SALE KEYWORDS ---
    "Online Watch Store Pakistan",
    "Buy Watches Online Cash on Delivery",
    "Cheap Watches in Pakistan",
    "Best Watch Website in Pakistan",
    "Watches Sale 2025",
    "12.12 Sale Watches",
    "Azadi Sale Watches",
    "Eid Sale Watches",
    "Premium Quality Watches Copy",
    "Master Copy Watches Pakistan",
    "Branded Watches First Copy",
    "Gift for Husband Pakistan",
    "Gift for Wife Pakistan",
    "Wedding Gift Watches",
    
    // --- LOCATION SPECIFIC KEYWORDS ---
    "Watches in Lahore",
    "Watches in Karachi",
    "Watches in Islamabad",
    "Watches in Rawalpindi",
    "Watches in Faisalabad",
    "Watches in Multan",
    "Watches in Peshawar",
    "Watches in Quetta",
    "Watches in Sialkot",
    "Watches in Gujranwala",
    "Watches Delivery All Over Pakistan",
    
    // --- SPECIFIC PRODUCT SEARCHES ---
    "Citizen EFR-539 Price",
    "Rolex Submariner Price Pakistan",
    "Moonston Blue Dial Watch",
    "Forichs ECB-10 Price",
    "Trending Watches 2025"
  ],
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://nayabwatches.com",
    title: "Nayab Watches - Premium Watches at Cheap Rates in Pakistan",
    description:
      "Shop the best Citizen, Rolex, Forichs, and Arabic Aura watches. Cash on Delivery available nationwide. High quality, low prices.",
    siteName: "Nayab Watches",
    images: [
      {
        url: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765381368/4_wgo6py.jpg", // Hero image from your data
        width: 1200,
        height: 630,
        alt: "Nayab Watches Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nayab Watches Pakistan | Sale is Live",
    description: "Best prices for Rolex, Citizen, and Moonston watches in Pakistan. Order via WhatsApp now!",
    images: ["https://res.cloudinary.com/dm7irbzcf/image/upload/v1765381368/4_wgo6py.jpg"],
  },
  category: "E-commerce",
  classification: "Fashion & Accessories",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
// --- GOOGLE SEO CONFIGURATION END ---

// --- STRUCTURED DATA (JSON-LD) FOR GOOGLE ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "Nayab Watches",
  "image": "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765381368/4_wgo6py.jpg",
  "description": "Premium luxury and sports watches in Pakistan including Citizen, Rolex, Forichs, and Moonston.",
  "url": "https://nayabwatches.com",
  "telephone": "+923176402959",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Online Store",
    "addressLocality": "Lahore",
    "addressRegion": "Punjab",
    "postalCode": "54000",
    "addressCountry": "PK"
  },
  "priceRange": "PKR 1000 - PKR 50000",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "sameAs": [
    "https://www.facebook.com/nayabwatch/",
    "https://www.instagram.com/nayab_watch/"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Google Structured Data Script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <GlobalProvider>
          {children}
          <CartSidebar />
        </GlobalProvider>
      </body>
    </html>
  );
}