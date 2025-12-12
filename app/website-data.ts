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
  category?: string;
  gender?: string;
  discountPercentage?: number;
  images?: string[];
  redeemCodeAvailable?: boolean;
  videoUrl?: string;
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
  productId: number;
  name: string;
  date: string;
  rating: number;
  content: string;
  verified: boolean;
}

// --- GLOBAL DATA ---
export const globalRedeemCode = "NAYAB500";
export const redeemDiscountAmount = 500;
export const whatsappNumber = "923176402959"; // UPDATED WHATSAPP NUMBER

// --- IMAGES (Static Assets) ---
export const heroBgImages = [
  "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765381368/4_wgo6py.jpg",
  "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765381910/2_wzoana.jpg",
  "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765382128/5_ggc270.jpg",
  "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765381365/6_cmws8a.jpg",
  "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765381366/7_lyrfcm.jpg"
];

export const adBgImage = "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765389587/ad-01_cnjaax.jpg";

// --- CATEGORIES ---
export const categoriesData: Category[] = [
  { name: "12.12 Sale", image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765527396/12_butjjo.webp" },
  { name: "Men Formal", image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765392141/1.Men_Formal_wzirs2.webp" },
  { name: "Men Sports", image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765392142/2.Men_Sports_skguit.webp" },
  { name: "Female Watches", image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765392142/4.Female_Bracelet_ylxlu1.webp" },
  { name: "Smart Watches", image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765392145/4_lsxi9t.webp" },
  { name: "Luxury Watches", image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765392142/3.Female_Fancy_fgpgyn.webp" },
  { name: "Couple Watches", image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765392146/6.Couple_Watches_giqg3i.webp" },
];

// --- MAIN PRODUCTS CATALOG ---
export const mainProductsData: Product[] = [
  {
    id: 1,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – EFR-539DE-2AVUDF",
    price: 51500,
    originalPrice: 65000,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765132037/2_ydl6ub.jpg",
    isNew: true,
    description: "A classic stainless steel chronograph with a deep blue dial. Perfect for formal wear.",
    stock: 10,
    reviews: 43,
    category: "Men Formal",
    gender: "Men",
    redeemCodeAvailable: true,
    videoUrl: "https://www.youtube.com/embed/S9V70Wob7MI?si=DrZ_GgXDbZuvXn_O"
  },
  {
    id: 2,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – EFR-539DE-3AVUDF",
    price: 52000,
    originalPrice: 66000,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765455944/4_gdnh6e.jpg",
    isNew: true,
    description: "Elegant green accents on a sturdy steel bracelet. Stand out from the crowd.",
    stock: 8,
    reviews: 12,
    category: "Men Formal",
    gender: "Men",
    redeemCodeAvailable: true,
    videoUrl: "https://www.youtube.com/embed/S9V70Wob7MI?si=DrZ_GgXDbZuvXn_O"
  },
  {
    id: 3,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – EFR-539DE-8AVUDF",
    price: 51500,
    originalPrice: 60000,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765132037/3_lyygco.jpg",
    isNew: false,
    description: "Grey dial chronograph, perfect for business meetings and daily wear.",
    stock: 12,
    reviews: 20,
    category: "Men Formal",
    gender: "Men",
    videoUrl: "https://www.youtube.com/embed/S9V70Wob7MI?si=DrZ_GgXDbZuvXn_O"
  },
  {
    id: 4,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – ECB-10DC-3A",
    price: 45000,
    originalPrice: 55000,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765132514/6_lrzp35.jpg",
    isNew: true,
    description: "Gunmetal finish with Bluetooth connectivity and smart features.",
    stock: 5,
    reviews: 15,
    category: "Smart Watches",
    gender: "Men",
    redeemCodeAvailable: true,
    videoUrl: "https://www.youtube.com/embed/S9V70Wob7MI?si=DrZ_GgXDbZuvXn_O"
  },
  {
    id: 5,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – ECB-10P-1ADF",
    price: 38000,
    originalPrice: 42000,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765132037/5_qkdptg.jpg",
    isNew: false,
    description: "Sporty rubber strap with high-performance timekeeping and durability.",
    stock: 20,
    reviews: 100,
    category: "Men Sports",
    gender: "Men",
    videoUrl: "https://www.youtube.com/embed/S9V70Wob7MI?si=DrZ_GgXDbZuvXn_O"
  },
  {
    id: 6,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – EFR-S108DE-3AVUDF",
    price: 47500,
    originalPrice: 52000,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765132038/8_jftqyq.jpg",
    isNew: true,
    description: "Slim profile with a sapphire crystal. Minimalist and sharp.",
    stock: 6,
    reviews: 8,
    category: "Men Formal",
    gender: "Men",
    videoUrl: "https://www.youtube.com/embed/S9V70Wob7MI?si=DrZ_GgXDbZuvXn_O"
  },
  {
    id: 7,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – EFR-S108DE-8AVUDF",
    price: 48000,
    originalPrice: 53000,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765132038/7_qchf3b.jpg",
    isNew: true,
    description: "Slimline series in a sleek grey finish. Lightweight comfort.",
    stock: 9,
    reviews: 5,
    category: "Men Formal",
    gender: "Men",
    videoUrl: "https://www.youtube.com/embed/S9V70Wob7MI?si=DrZ_GgXDbZuvXn_O"
  },
  {
    id: 8,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – ECB-2000DC-1BDF",
    price: 65000,
    originalPrice: 75000,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765132038/11_rylwwt.jpg",
    isNew: false,
    description: "Motorsports inspired design with suspension arm lugs.",
    stock: 4,
    reviews: 30,
    category: "Men Sports",
    gender: "Men",
    videoUrl: "https://www.youtube.com/embed/S9V70Wob7MI?si=DrZ_GgXDbZuvXn_O"
  },
  {
    id: 9,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – ECB-2000DD-1ADF",
    price: 62000,
    originalPrice: 70000,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765132039/1_gygzhi.jpg",
    isNew: true,
    description: "Solar powered with smartphone link features. High tech elegance.",
    stock: 15,
    reviews: 22,
    category: "Smart Watches",
    gender: "Men",
    videoUrl: "https://www.youtube.com/embed/S9V70Wob7MI?si=DrZ_GgXDbZuvXn_O"
  },
  {
    id: 10,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – ECB-2000NP-1ADF",
    price: 68000,
    originalPrice: 80000,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765132039/13_p0m1pg.jpg",
    isNew: false,
    description: "Nighttime drive inspired colorway, very sporty and unique.",
    stock: 3,
    reviews: 18,
    category: "Men Sports",
    gender: "Men",
    videoUrl: "https://www.youtube.com/embed/S9V70Wob7MI?si=DrZ_GgXDbZuvXn_O"
  },
  {
    id: 11,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – ECB-2000PB-1A",
    price: 55000,
    originalPrice: 62000,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765132039/14_pws5wv.jpg",
    isNew: true,
    description: "Resin band for comfort during high-speed activities.",
    stock: 25,
    reviews: 50,
    category: "Men Sports",
    gender: "Men",
    videoUrl: "https://www.youtube.com/embed/S9V70Wob7MI?si=DrZ_GgXDbZuvXn_O"
  },
  {
    id: 12,
    brand: "CASIO EDIFICE",
    name: "Casio Edifice – ECB-2000PB-1A",
    price: 55000,
    originalPrice: 62000,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765132038/12_is3twq.jpg",
    isNew: true,
    description: "Resin band for comfort during high-speed activities.",
    stock: 25,
    reviews: 50,
    category: "Men Sports",
    gender: "Men",
    videoUrl: "https://www.youtube.com/embed/S9V70Wob7MI?si=DrZ_GgXDbZuvXn_O"
  },
];

// --- FEATURED & LOVED LISTS ---
export const homeFeaturedProducts: Product[] = [
  mainProductsData[0], 
  mainProductsData[3], 
  mainProductsData[5], 
  mainProductsData[8], 
  mainProductsData[10] 
];

export const homeLovedProducts: Product[] = [
  {
    ...mainProductsData[1], 
    thumbnail: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D"
  },
  {
    ...mainProductsData[4], 
    thumbnail: "https://images.unsplash.com/photo-1622434641406-a158123450f9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2F0Y2h8ZW58MHx8MHx8fDA%3D"
  },
  {
    ...mainProductsData[9], 
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
    category: "Nayab Watches",
    date: "December 24, 2024",
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765527788/1_drkjfk.webp",
  },
  {
    title: "The Evolution of Chronographs",
    category: "Nayab Watches",
    date: "July 7, 2024",
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765527789/2_vicofl.webp",
  },
  {
    title: "Smart Technology in Analog Watches",
    category: "Nayab Watches",
    date: "July 27, 2024",
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765527788/3_jvprzt.webp",
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
  "CITIZEN",
  "ROLEX",
  "FORICHS",
  "MOONSTON",
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
    productId: 1, 
    name: "Fatima Nadeem",
    date: "10/16/2025",
    rating: 5,
    content: "Same as shown, even more beautiful in person. Very satisfied!",
    verified: true
  },
  {
    id: 2,
    productId: 1, 
    name: "Ali Khan",
    date: "10/18/2025",
    rating: 4,
    content: "The watch is solid and feels premium. Delivery was a bit late though.",
    verified: true
  },
  {
    id: 3,
    productId: 1, 
    name: "Sara Ahmed",
    date: "10/20/2025",
    rating: 5,
    content: "Bought this for my husband and he loves it. Highly recommended.",
    verified: true
  },
];