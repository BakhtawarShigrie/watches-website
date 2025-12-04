// app/website-data.ts

// --- Types ---
export interface Product {
  id: number;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  stock?: number;
  reviews?: number;
  description?: string;
  thumbnail?: string;
  category?: string; // e.g., "Men Sports", "Female Fancy"
  gender?: string;   // "Men", "Women", "Unisex"
  discountPercentage?: number;
  images?: string[];
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
export const categoriesData: Category[] = [
  { name: "11.11 Sale", image: "https://en-pk.svestonwatches.com/cdn/shop/files/12.12_Sale_Website_Icon_06500ae6-9643-43f1-b445-d65fc100837f_1024x1024.png?v=1764334753" },
  { name: "Men Formal", image: "https://en-pk.svestonwatches.com/cdn/shop/files/Men_Formal_833139bc-31be-4be7-a4a9-8a627e7b4120_1024x1024.png?v=1750671977" },
  { name: "Men Sports", image: "https://en-pk.svestonwatches.com/cdn/shop/files/Men_Sports_ed2c875c-5bf8-478c-b297-506a3d232b40_1024x1024.png?v=1750671977" },
  { name: "Female Fancy", image: "https://en-pk.svestonwatches.com/cdn/shop/files/Female_Fancy_fe1e3bd7-a82a-4d40-a5f0-6a8b51681a49_1024x1024.png?v=1750671977" },
  { name: "Female Bracelets", image: "https://en-pk.svestonwatches.com/cdn/shop/files/Female_Bracelet_29118e56-ffe6-40b4-ab00-3e960548cb9e_1024x1024.png?v=1750671977" },
  { name: "Smart Watches", image: "https://en-pk.svestonwatches.com/cdn/shop/files/tourque_png_1024x1024.png?v=1750671977" },
  { name: "Couple Watches", image: "https://en-pk.svestonwatches.com/cdn/shop/files/Couple_Watches_9997088b-d0fe-4781-8101-47b5d0c33f03_1024x1024.png?v=1750671977" },
];

// --- HOME PAGE DATA ---

export const featuredCollectionsData: Collection[] = [
  {
    title: "Luxury Watches",
    description: "Explore our Watches collection. We have a wide range of luxurious and unique Watches.",
    image: "https://www.swisswatchexpo.com/thewatchclub/wp-content/uploads/2023/06/How-to-Start-a-Watch-Collection-Rolex-Daytona-Panerai-Radiomir-Vacheron-Constantin-Overseas-Omega-Seamaster.jpg",
  },
  {
    title: "Classic Watches",
    description: "Accessories are the utmost best way to update your look and your wardrobe.",
    image: "https://wornandwound.com/library/uploads/2023/04/Traska_Crossroads_Formex_header.jpg",
  },
  {
    title: "Fancy Watches",
    description: "Explore our Eyewear collection. We have a wide range of luxury glasses for both men and women.",
    image: "https://cdn.shopify.com/s/files/1/0257/0017/1839/collections/patek-philippe-collection-350726.jpg?v=1746544799",
  },
];

export const newsArticlesData: Article[] = [
  {
    title: "Guess Watches – BLACK & GOLD",
    category: "LifeStyle Collection",
    date: "December 24, 2015",
    image: "https://i.pinimg.com/736x/dd/de/51/ddde51bee1994e52a67c9883c9f0a824.jpg",
  },
  {
    title: "Guess Watches – Breast Health Awareness and Education",
    category: "LifeStyle Collection",
    date: "July 7, 2020",
    image: "https://sharpmagazine.com/wp-content/uploads/2025/11/moser-streamliner-dubai-watch-week.png",
  },
  {
    title: "Victorinox I.N.O.X. PROFESSIONAL DIVER",
    category: "LifeStyle Collection",
    date: "July 27, 2020",
    image: "https://bezlmagazine.com/wp-content/uploads/2025/09/cropped-Omslag-Artikel-About.jpg",
  },
];

export const faqsData: FAQ[] = [
  {
    question: "What is your exchange & return policy",
    answer: "We offer a 30-day exchange and return policy for all unworn watches in original packaging. Please retain your receipt.",
  },
  {
    question: "How will my order be shipped",
    answer: "All orders are shipped via insured express courier services. You will receive a tracking number once your order is dispatched.",
  },
  {
    question: "How can I become part of the Loyalty Program",
    answer: "You can join our Loyalty Program by creating an account on our website. Points are earned on every purchase.",
  },
  {
    question: "Can I collect my order form your retail stores?",
    answer: "Yes, you can choose the 'Click & Collect' option at checkout to pick up your order from your nearest store.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to select countries worldwide. Shipping costs and delivery times vary by location.",
  },
];

// --- MAIN PRODUCTS CATALOG (Total 8 Products) ---
export const mainProductsData: Product[] = [
  // 1. Men's Formal
  {
    id: 1,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – EFR-539DE-2AVUDF",
    price: 51500,
    originalPrice: 65000,
    image: "https://www.lifestyle-collection.com.pk/wp-content/uploads/2025/10/EFR-539DE-2AVUDF-1-330x440.jpg",
    isNew: true,
    description: "Enhance your elegance with our premium Casio Edifice Watch. Perfect for formal occasions.",
    stock: 10,
    reviews: 43,
    category: "Men Formal",
    gender: "Men"
  },
  // 2. Men's Sports
  {
    id: 2,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – EFR-539DE-3AVUDF",
    price: 51500,
    originalPrice: 65000,
    image: "https://www.lifestyle-collection.com.pk/wp-content/uploads/2025/10/EFR-539DE-3AVUDF-1-330x440.jpg",
    isNew: true,
    stock: 5,
    reviews: 12,
    category: "Men Sports",
    gender: "Men"
  },
  // 3. Women's Fancy
  {
    id: 3,
    brand: "GUESS",
    name: "Guess Collection – Gold Chic",
    price: 45000,
    originalPrice: 50000,
    image: "https://images.unsplash.com/photo-1507682723113-4d6769000738?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdvbWVuJTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
    isNew: true,
    stock: 8,
    reviews: 20,
    category: "Female Fancy",
    gender: "Women"
  },
  // 4. Women's Bracelet
  {
    id: 4,
    brand: "VOGUE",
    name: "Vogue – Silver Elegance",
    price: 32000,
    originalPrice: 38000,
    image: "https://images.unsplash.com/photo-1619134778706-7015533a6150?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
    isNew: true,
    stock: 15,
    reviews: 5,
    category: "Female Bracelets",
    gender: "Women"
  },
  // 5. Unisex / Smart
  {
    id: 5,
    brand: "CASIO G-SHOCK",
    name: "G-Shock – Digital Sport",
    price: 35000,
    originalPrice: 42000,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D",
    isNew: false,
    stock: 20,
    reviews: 100,
    category: "Smart Watches",
    gender: "Unisex"
  },
  // 6. Men's Classic
  {
    id: 6,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – ECB-2000DD-1ADF",
    price: 65000,
    originalPrice: 80000,
    image: "https://www.lifestyle-collection.com.pk/wp-content/uploads/2024/04/ECB-2000DD-1ADF-330x440.jpg",
    isNew: true,
    stock: 3,
    reviews: 8,
    category: "Men Formal",
    gender: "Men"
  },
  // 7. Unisex / Couple
  {
    id: 7,
    brand: "MOVADO",
    name: "Movado – Minimalist Black",
    price: 120000,
    originalPrice: 150000,
    image: "https://images.unsplash.com/photo-1616348436918-d22d80184640?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWluaW1hbGlzdCUyMHdhdGNofGVufDB8fDB8fHww",
    isNew: false,
    stock: 2,
    reviews: 30,
    category: "Couple Watches",
    gender: "Unisex"
  },
  // 8. Men's Sport
  {
    id: 8,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – ECB-2000PB-1A",
    price: 45000,
    originalPrice: 50000,
    image: "https://www.lifestyle-collection.com.pk/wp-content/uploads/2022/10/ECB-2000PB-1A-330x440.jpg",
    isNew: true,
    stock: 50,
    reviews: 200,
    category: "Men Sports",
    gender: "Men"
  },
];

// --- FEATURED & LOVED LISTS (Derived from Main Products) ---

// Featured Products: A mix of Men and Women
export const homeFeaturedProducts: Product[] = [
  mainProductsData[0], // Men Formal
  mainProductsData[2], // Women Fancy
  mainProductsData[4], // Unisex
  mainProductsData[1], // Men Sports
  mainProductsData[3], // Women Bracelet
];

// Loved Products: Special items
export const homeLovedProducts: Product[] = [
  {
    ...mainProductsData[5], // Men Formal
    thumbnail: "https://images.unsplash.com/photo-1582150264904-e0bea5ef0ad1?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d3Jpc3R3YXRjaHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    ...mainProductsData[6], // Unisex Movado
    thumbnail: "https://images.unsplash.com/photo-1622434641406-a158123450f9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2F0Y2h8ZW58MHx8MHx8fDA%3D"
  },
  {
    ...mainProductsData[7], // Men Sports
    thumbnail: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D"
  }
];

// --- FILTERS & BRANDS ---
export const brandsList = [
  "All",
  "CASIO EDIFICE",
  "GUESS",
  "VOGUE",
  "CASIO G-SHOCK",
  "MOVADO",
  "GC",
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
export const reviewsData: Review[] = [
  {
    id: 1,
    name: "Fatima Nadeem",
    date: "10/16/2025",
    rating: 5,
    title: "Beautiful",
    content: "Same as shown, even more beautiful in person. Very satisfied!",
    verified: true
  },
  {
    id: 2,
    name: "Ali Khan",
    date: "10/18/2025",
    rating: 4,
    title: "Good Quality",
    content: "The watch is solid and feels premium. Delivery was a bit late though.",
    verified: true
  },
  {
    id: 3,
    name: "Sara Ahmed",
    date: "10/20/2025",
    rating: 5,
    title: "Love it!",
    content: "Bought this for my husband and he loves it. Highly recommended.",
    verified: true
  },
];