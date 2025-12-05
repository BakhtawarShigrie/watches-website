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
  category?: string; // e.g., "Men Formal", "Men Sports"
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

// --- IMAGES (Static Assets) ---
export const heroBgImage = "https://images.unsplash.com/photo-1670404160620-a3a86428560e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bHV4dXJ5JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D";
export const adBgImage = "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdhdGNofGVufDB8fDB8fHww";

// --- CATEGORIES ---
export const categoriesData: Category[] = [
  { name: "11.11 Sale", image: "https://en-pk.svestonwatches.com/cdn/shop/files/12.12_Sale_Website_Icon_06500ae6-9643-43f1-b445-d65fc100837f_1024x1024.png?v=1764334753" },
  { name: "Men Formal", image: "https://en-pk.svestonwatches.com/cdn/shop/files/Men_Formal_833139bc-31be-4be7-a4a9-8a627e7b4120_1024x1024.png?v=1750671977" },
  { name: "Men Sports", image: "https://en-pk.svestonwatches.com/cdn/shop/files/Men_Sports_ed2c875c-5bf8-478c-b297-506a3d232b40_1024x1024.png?v=1750671977" },
  { name: "Smart Watches", image: "https://en-pk.svestonwatches.com/cdn/shop/files/tourque_png_1024x1024.png?v=1750671977" },
  { name: "Luxury Steel", image: "https://en-pk.svestonwatches.com/cdn/shop/files/Couple_Watches_9997088b-d0fe-4781-8101-47b5d0c33f03_1024x1024.png?v=1750671977" },
];

// --- MAIN PRODUCTS CATALOG (Only 11 Products as requested) ---
export const mainProductsData: Product[] = [
  {
    id: 1,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – EFR-539DE-2AVUDF",
    price: 51500,
    originalPrice: 65000,
    image: "https://www.lifestyle-collection.com.pk/wp-content/uploads/2025/10/EFR-539DE-2AVUDF-1-330x440.jpg",
    isNew: true,
    description: "A classic stainless steel chronograph with a deep blue dial. Perfect for formal wear.",
    stock: 10,
    reviews: 43,
    category: "Men Formal",
    gender: "Men"
  },
  {
    id: 2,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – EFR-539DE-3AVUDF",
    price: 52000,
    originalPrice: 66000,
    image: "https://www.lifestyle-collection.com.pk/wp-content/uploads/2025/10/EFR-539DE-3AVUDF-1-330x440.jpg",
    isNew: true,
    description: "Elegant green accents on a sturdy steel bracelet. Stand out from the crowd.",
    stock: 8,
    reviews: 12,
    category: "Men Formal",
    gender: "Men"
  },
  {
    id: 3,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – EFR-539DE-8AVUDF",
    price: 51500,
    originalPrice: 60000,
    image: "https://www.lifestyle-collection.com.pk/wp-content/uploads/2025/10/EFR-539DE-8AVUDF-1-330x440.jpg",
    isNew: false,
    description: "Grey dial chronograph, perfect for business meetings and daily wear.",
    stock: 12,
    reviews: 20,
    category: "Men Formal",
    gender: "Men"
  },
  {
    id: 4,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – ECB-10DC-3A",
    price: 45000,
    originalPrice: 55000,
    image: "https://www.lifestyle-collection.com.pk/wp-content/uploads/2021/12/ECB-10DC-3A_JR_DR-330x440.jpg",
    isNew: true,
    description: "Gunmetal finish with Bluetooth connectivity and smart features.",
    stock: 5,
    reviews: 15,
    category: "Smart Watches",
    gender: "Men"
  },
  {
    id: 5,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – ECB-10P-1ADF",
    price: 38000,
    originalPrice: 42000,
    image: "https://www.lifestyle-collection.com.pk/wp-content/uploads/2020/07/ECB-10P-1ADF-1-1-330x440.jpg",
    isNew: false,
    description: "Sporty rubber strap with high-performance timekeeping and durability.",
    stock: 20,
    reviews: 100,
    category: "Men Sports",
    gender: "Men"
  },
  {
    id: 6,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – EFR-S108DE-3AVUDF",
    price: 47500,
    originalPrice: 52000,
    image: "https://www.lifestyle-collection.com.pk/wp-content/uploads/2025/10/EFR-S108DE-3AVUDF-1-330x440.jpg",
    isNew: true,
    description: "Slim profile with a sapphire crystal. Minimalist and sharp.",
    stock: 6,
    reviews: 8,
    category: "Men Formal",
    gender: "Men"
  },
  {
    id: 7,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – EFR-S108DE-8AVUDF",
    price: 48000,
    originalPrice: 53000,
    image: "https://www.lifestyle-collection.com.pk/wp-content/uploads/2025/10/EFR-S108DE-8AVUDF-1-330x440.jpg",
    isNew: true,
    description: "Slimline series in a sleek grey finish. Lightweight comfort.",
    stock: 9,
    reviews: 5,
    category: "Men Formal",
    gender: "Men"
  },
  {
    id: 8,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – ECB-2000DC-1BDF",
    price: 65000,
    originalPrice: 75000,
    image: "https://www.lifestyle-collection.com.pk/wp-content/uploads/2024/04/ECB-2000DC-1BDF-330x440.jpg",
    isNew: false,
    description: "Motorsports inspired design with suspension arm lugs.",
    stock: 4,
    reviews: 30,
    category: "Men Sports",
    gender: "Men"
  },
  {
    id: 9,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – ECB-2000DD-1ADF",
    price: 62000,
    originalPrice: 70000,
    image: "https://www.lifestyle-collection.com.pk/wp-content/uploads/2024/04/ECB-2000DD-1ADF-330x440.jpg",
    isNew: true,
    description: "Solar powered with smartphone link features. High tech elegance.",
    stock: 15,
    reviews: 22,
    category: "Smart Watches",
    gender: "Men"
  },
  {
    id: 10,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – ECB-2000NP-1ADF",
    price: 68000,
    originalPrice: 80000,
    image: "https://www.lifestyle-collection.com.pk/wp-content/uploads/2024/04/ECB-2000NP-1ADF-1-330x440.jpg",
    isNew: false,
    description: "Nighttime drive inspired colorway, very sporty and unique.",
    stock: 3,
    reviews: 18,
    category: "Men Sports",
    gender: "Men"
  },
  {
    id: 11,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – ECB-2000PB-1A",
    price: 55000,
    originalPrice: 62000,
    image: "https://www.lifestyle-collection.com.pk/wp-content/uploads/2022/10/ECB-2000PB-1A-330x440.jpg",
    isNew: true,
    description: "Resin band for comfort during high-speed activities.",
    stock: 25,
    reviews: 50,
    category: "Men Sports",
    gender: "Men"
  },
];

// --- FEATURED & LOVED LISTS (Derived from Main Products) ---

// Featured Products
export const homeFeaturedProducts: Product[] = [
  mainProductsData[0], // EFR-539DE-2AVUDF
  mainProductsData[3], // ECB-10DC-3A
  mainProductsData[5], // EFR-S108DE-3AVUDF
  mainProductsData[8], // ECB-2000DD-1ADF
  mainProductsData[10] // ECB-2000PB-1A
];

// Loved Products
export const homeLovedProducts: Product[] = [
  {
    ...mainProductsData[1], // EFR-539DE-3AVUDF
    thumbnail: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D"
  },
  {
    ...mainProductsData[4], // ECB-10P-1ADF
    thumbnail: "https://images.unsplash.com/photo-1622434641406-a158123450f9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2F0Y2h8ZW58MHx8MHx8fDA%3D"
  },
  {
    ...mainProductsData[9], // ECB-2000NP-1ADF
    thumbnail: "https://images.unsplash.com/photo-1582150264904-e0bea5ef0ad1?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d3Jpc3R3YXRjaHxlbnwwfHwwfHx8MA%3D%3D"
  }
];

// --- OTHER DATA ---

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
    title: "Sport Watches",
    description: "Designed for performance and durability without compromising style.",
    image: "https://cdn.shopify.com/s/files/1/0257/0017/1839/collections/patek-philippe-collection-350726.jpg?v=1746544799",
  },
];

export const newsArticlesData: Article[] = [
  {
    title: "Casio Edifice – Speed & Intelligence",
    category: "LifeStyle Collection",
    date: "December 24, 2024",
    image: "https://i.pinimg.com/736x/dd/de/51/ddde51bee1994e52a67c9883c9f0a824.jpg",
  },
  {
    title: "The Evolution of Chronographs",
    category: "LifeStyle Collection",
    date: "July 7, 2024",
    image: "https://sharpmagazine.com/wp-content/uploads/2025/11/moser-streamliner-dubai-watch-week.png",
  },
  {
    title: "Smart Technology in Analog Watches",
    category: "LifeStyle Collection",
    date: "July 27, 2024",
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

// --- FILTERS & BRANDS ---
export const brandsList = [
  "All",
  "CASIO EDIFICE",
];

export const sidebarFiltersList = [
  "PRICE",
  "GENDER",
  "WATCHES CATEGORY",
  "BRANDS",
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