// app/website-data.ts

// --- Types (Data ka structure define karne ke liye) ---
export interface Product {
  id: number;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number; // Optional, discount dikhane ke liye
  image: string;
  isNew?: boolean;
  stock?: number;
  reviews?: number;
  description?: string;
  thumbnail?: string; // Loved products ke liye choti image
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
  { name: "11.11 Sale", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=300&auto=format&fit=crop" },
  { name: "Men Formal", image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=300&auto=format&fit=crop" },
  { name: "Men Sports", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=300&auto=format&fit=crop" },
  { name: "Female Fancy", image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=300&auto=format&fit=crop" },
  { name: "Female Bracelets", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=300&auto=format&fit=crop" },
  { name: "Smart Watches", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=300&auto=format&fit=crop" },
  { name: "Couple Watches", image: "https://images.unsplash.com/photo-1622434641406-a15810545182?q=80&w=300&auto=format&fit=crop" },
];

// --- HOME PAGE DATA ---

// Featured Products (Home Page)
export const homeFeaturedProducts: Product[] = [
  {
    id: 101, 
    brand: "GUESS",
    name: "Guess Womens Watch – GW0471L1",
    originalPrice: 39500,
    price: 27650,
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 102,
    brand: "CASIO GENERAL",
    name: "Casio General Watch – MTP-VD200BL-5BUDF",
    originalPrice: 25000,
    price: 12500,
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 103,
    brand: "VICTORINOX",
    name: "Victorinox Swiss Army Watch – 241693",
    originalPrice: 309000,
    price: 262650,
    image: "https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 104,
    brand: "BREITLING",
    name: "Breitling Watch – A13314101B1A1",
    originalPrice: 2120000,
    price: 1802000,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 105,
    brand: "CASIO GENERAL",
    name: "Casio General Watch – MTP-VD01B-5BVUDF",
    originalPrice: 18400,
    price: 12880,
    image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=400&auto=format&fit=crop",
  },
];

// Loved Products (Home Page)
export const homeLovedProducts: Product[] = [
  {
    id: 106,
    brand: "Parfums de Marly",
    name: "Castley",
    price: 87000,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1594035910387-fea4779426e9?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: 107,
    brand: "INITIO Parfums Privés",
    name: "Narcotic Delight",
    price: 82000,
    image: "https://images.unsplash.com/photo-1615160936637-299a9a3b6805?q=80&w=600&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: 108,
    brand: "Clive Christian",
    name: "L Red Tea Vetiver",
    price: 120000,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=150&auto=format&fit=crop",
  },
];

export const featuredCollectionsData: Collection[] = [
  {
    title: "Luxury Watches",
    description: "Explore our Watches collection. We have a wide range of luxurious and unique Watches.",
    image: "https://images.unsplash.com/photo-1596516109370-29001ec8ec36?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Eyewear Collection",
    description: "Explore our Eyewear collection. We have a wide range of luxury glasses for both men and women.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Accessories",
    description: "Accessories are the utmost best way to update your look and your wardrobe.",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=600&auto=format&fit=crop",
  },
];

export const newsArticlesData: Article[] = [
  {
    title: "Guess Watches – BLACK & GOLD",
    category: "LifeStyle Collection",
    date: "December 24, 2015",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Guess Watches – Breast Health Awareness and Education",
    category: "LifeStyle Collection",
    date: "July 7, 2020",
    image: "https://images.unsplash.com/photo-1585123334904-845d60e97b29?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Victorinox I.N.O.X. PROFESSIONAL DIVER",
    category: "LifeStyle Collection",
    date: "July 27, 2020",
    image: "https://images.unsplash.com/photo-1533139502658-0198f920d3e8?q=80&w=600&auto=format&fit=crop",
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
  {
    question: "Are your watches authentic?",
    answer: "Absolutely. We are an authorized retailer for all the brands we carry, guaranteeing 100% authenticity.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers.",
  },
  {
    question: "How do I track my order?",
    answer: "Once shipped, you will receive an email with a tracking link to monitor your shipment's progress.",
  },
  {
    question: "Do you offer watch repair services?",
    answer: "Yes, we have a dedicated service center for repairs and maintenance of watches purchased from us.",
  },
  {
    question: "Can I change my order after placing it?",
    answer: "Please contact our customer service immediately. If the order hasn't been processed, we may be able to modify it.",
  },
];

// --- MAIN PRODUCTS CATALOG (Products Page & Detail Page) ---
export const mainProductsData: Product[] = [
  {
    id: 1,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – EFR-539DE-2AVUDF",
    price: 51500,
    originalPrice: 65000,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop",
    isNew: true,
    description: "Enhance your elegance with our premium Casio Edifice Watch. Handcrafted with precision, featuring high-quality stainless steel and intricate detailing. Perfect for formal and casual occasions.",
    stock: 10,
    reviews: 43
  },
  {
    id: 2,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – EFR-539DE-3AVUDF",
    price: 51500,
    originalPrice: 65000,
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=600&auto=format&fit=crop",
    isNew: true,
    description: "Experience the perfect blend of style and functionality with this green dial Casio Edifice.",
    stock: 5,
    reviews: 12
  },
  {
    id: 3,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – EFR-539DE-8AVUDF",
    price: 51500,
    originalPrice: 60000,
    image: "https://images.unsplash.com/photo-1622434641406-a15810545182?q=80&w=600&auto=format&fit=crop",
    isNew: true,
    description: "A classic grey dial timepiece for the modern man.",
    stock: 8,
    reviews: 20
  },
  {
    id: 4,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – EFR-S108DE-2AVUDF",
    price: 47500,
    originalPrice: 55000,
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=600&auto=format&fit=crop",
    isNew: true,
    description: "Slim and sophisticated, the EFR-S108DE series.",
    stock: 15,
    reviews: 5
  },
  {
    id: 5,
    brand: "CASIO G-SHOCK",
    name: "G-Shock Rugged – GA-2100",
    price: 35000,
    originalPrice: 42000,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&auto=format&fit=crop",
    isNew: false,
    description: "The ultimate tough watch. G-Shock GA-2100 series.",
    stock: 20,
    reviews: 100
  },
  {
    id: 6,
    brand: "GUESS",
    name: "Guess Gold Plated",
    price: 65000,
    originalPrice: 80000,
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=600&auto=format&fit=crop",
    isNew: true,
    description: "Luxurious gold plated watch for a statement look.",
    stock: 3,
    reviews: 8
  },
  {
    id: 7,
    brand: "MOVADO",
    name: "Movado Museum Classic",
    price: 120000,
    originalPrice: 150000,
    image: "https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=600&auto=format&fit=crop",
    isNew: false,
    description: "Minimalist icon. The Museum Classic by Movado.",
    stock: 2,
    reviews: 30
  },
  {
    id: 8,
    brand: "RAY-BAN",
    name: "Aviator Classic",
    price: 45000,
    originalPrice: 50000,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop",
    isNew: true,
    description: "Timeless Aviator sunglasses.",
    stock: 50,
    reviews: 200
  },
];

// --- FILTERS & BRANDS (Products Page) ---
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

// --- REVIEWS (Product Detail Page) ---
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
    name: "Fatima Nadeem",
    date: "10/16/2025",
    rating: 5,
    title: "Beautiful",
    content: "Same as shown, even more beautiful in person. Very satisfied!",
    verified: true
  },
  {
    id: 3,
    name: "Fatima Nadeem",
    date: "10/16/2025",
    rating: 5,
    title: "Beautiful",
    content: "Same as shown, even more beautiful in person. Very satisfied!",
    verified: true
  },
];