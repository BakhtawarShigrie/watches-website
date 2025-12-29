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
export const whatsappNumber = "923176402959";

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
  // { name: "Smart Watches", image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765392145/4_lsxi9t.webp" },
  { name: "Luxury Watches", image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765392142/3.Female_Fancy_fgpgyn.webp" },
  { name: "Couple Watches", image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765392146/6.Couple_Watches_giqg3i.webp" },
];

// --- MAIN PRODUCTS CATALOG ---
export const mainProductsData: Product[] = [
  {
    id: 1,
    brand: "MOONSTON",
    name: "Moonston – Arabic Aura",
    price: 999,
    originalPrice: 2499,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1767005385/23_mmlybe.jpg",
    isNew: false,
    description: "A classic stainless steel chronograph with a deep blue dial. Perfect for formal wear.",
    stock: 1871,
    reviews: 432,
    category: "Men Formal",
    gender: "Men",
    redeemCodeAvailable: false,
    videoUrl: "https://www.youtube.com/shorts/cfsogNzxK0s"
  },
  {
    id: 2,
    brand: "CITIZEN",
    name: "Citizen – EFR-539UDF",
    price: 4499,
    originalPrice: 7999,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765132038/8_jftqyq.jpg",
    isNew: true,
    description: "Watch for boy’s stainless steel water resistant.",
    stock: 876,
    reviews: 912,
    category: "Luxury Watches",
    gender: "Men",
    redeemCodeAvailable: true,
    videoUrl: "https://youtube.com/shorts/3xmAPT-fsUY"
  },
  {
    id: 3,
    brand: "ROLEX",
    name: "Rolex – EFR-539DE-8AVUDF",
    price: 3499,
    originalPrice: 5999,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765455944/4_gdnh6e.jpg",
    isNew: false,
    description: "Green dial chronograph, perfect for business meetings and daily wear.",
    stock: 1472,
    reviews: 207,
    category: "Luxury Watches",
    gender: "Men",
    redeemCodeAvailable: true,
    videoUrl: "https://youtube.com/shorts/SzCFGE-B_Xs"
  },
  {
    id: 4,
    brand: "CITIZEN",
    name: "Citizen – ECB-10DC-3A",
    price: 4599,
    originalPrice: 8999,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765132514/6_lrzp35.jpg",
    isNew: true,
    description: "Watch for boy’s stainless steel water resistant.",
    stock: 589,
    reviews: 165,
    category: "Luxury Watches",
    gender: "Men",
    redeemCodeAvailable: true,
    videoUrl: "https://youtube.com/shorts/ydP6LLWahTU"
  },
  {
    id: 5,
    brand: "FORICHS",
    name: "Forichs – ECB-10P-1ADF",
    price: 4399,
    originalPrice: 8299,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765132037/2_ydl6ub.jpg",
    isNew: false,
    description: "High-performance and durability.",
    stock: 209,
    reviews: 192,
    category: "Luxury Watches",
    gender: "Men",
    redeemCodeAvailable: true,
    videoUrl: "https://youtube.com/shorts/sm9Dm9QB6QM"
  },
  {
    id: 6,
    brand: "SUCCESS WAY",
    name: "Success way – L-237 (Silver)",
    price: 5499,
    originalPrice: 12000,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765547860/5_vrm4qi.jpg",
    isNew: true,
    description: "SUCCESS WAY ORIGINAL WATCHES - DOUBLE TIME EDITION (MODEL NO. L-237) GOOD FINISHING HIGH QUALITY CASE AND STAINLESS STEEL SILVER COLOUR AVAILABLE & DESIGN WITH BOX",
    stock: 69,
    reviews: 87,
    category: "Men Sports",
    gender: "Men",
    redeemCodeAvailable: true,
    videoUrl: "https://youtube.com/shorts/WNz6wmiiMJI"
  },
  {
    id: 7,
    brand: "CITIZEN",
    name: "Citizen (Men) – EFR-8AVUDM",
    price: 3499,
    originalPrice: 6499,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765132037/3_lyygco.jpg",
    isNew: true,
    description: "Slimline series in a sleek Golden finish. Lightweight comfort.",
    stock: 97,
    reviews: 53,
    category: "Couple Watches",
    gender: "Men",
    redeemCodeAvailable: true,
    videoUrl: "https://youtube.com/shorts/4uVWRt8oV-A"
  },
  {
    id: 8,
    brand: "ROLEX",
    name: "Rolex – ECB-2000DD-1ADF",
    price: 3999,
    originalPrice: 6999,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765132039/14_pws5wv.jpg",
    isNew: true,
    description: "High elegance.",
    stock: 615,
    reviews: 242,
    category: "Luxury Watches",
    gender: "Men",
    redeemCodeAvailable: true,
    videoUrl: "https://youtube.com/shorts/rm9zbIxM9_8"
  },
  {
    id: 9,
    brand: "FORICHS",
    name: "Forichs – ECB-2000NP-1ADF",
    price: 4899,
    originalPrice: 8999,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765132038/7_qchf3b.jpg",
    isNew: false,
    description: "Very sporty and unique finish.",
    stock: 387,
    reviews: 186,
    category: "Men Formal",
    gender: "Men",
    redeemCodeAvailable: true,
    videoUrl: "https://youtube.com/shorts/hVGxK0wA4y0"
  },
  {
    id: 10,
    brand: "CITIZEN",
    name: "Citizen (Women) – EFR-8AVUDF",
    price: 3499,
    originalPrice: 6499,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1767006113/24_zjekrj.jpg",
    isNew: true,
    description: "Slimline series in a sleek Golden finish. Lightweight comfort.",
    stock: 97,
    reviews: 29,
    category: "Couple Watches",
    gender: "Women",
    redeemCodeAvailable: true,
    videoUrl: "https://youtube.com/shorts/hdckfeOnFe8"
  },
  {
    id: 11,
    brand: "FORICHS",
    name: "Forichs – ECB-2000NP-2ADF",
    price: 4899,
    originalPrice: 8999,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765886119/10_ktspql.jpg",
    isNew: false,
    description: "Very sporty and unique finish.",
    stock: 287,
    reviews: 141,
    category: "Men Formal",
    gender: "Men",
    redeemCodeAvailable: true,
    videoUrl: "https://youtube.com/shorts/hVGxK0wA4y0"
  },
  {
    id: 12,
    brand: "MOONSTON",
    name: "Moonston – E201 (Silver)",
    price: 4499,
    originalPrice: 6999,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1766607466/15_nou7sn.jpg",
    isNew: true,
    description: "Moonston Female Watch E201 Silver Stainless Steel Band Water Resistant.",
    stock: 289,
    reviews: 341,
    category: "Female Watches",
    gender: "Women",
    redeemCodeAvailable: true,
    videoUrl: "https://www.youtube.com/shorts/Y2oer21bpMk"
  },
  {
    id: 13,
    brand: "MOONSTON",
    name: "Moonston – E202 (Silver & Gold)",
    price: 4499,
    originalPrice: 6999,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1766607466/16_ieysjx.jpg",
    isNew: true,
    description: "Moonston Female Watch E202 Silver & Gold Stainless Steel Band Water Resistant.",
    stock: 189,
    reviews: 621,
    category: "Female Watches",
    gender: "Women",
    redeemCodeAvailable: true,
    videoUrl: "https://www.youtube.com/shorts/cUCP0qaSaNo"
  },
  {
    id: 14,
    brand: "MOONSTON",
    name: "Moonston – E203 (Rose Gold)",
    price: 4499,
    originalPrice: 6999,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1766607467/17_nrb7k5.jpg",
    isNew: true,
    description: "Moonston Female Watch E203 Rose Gold Stainless Steel Band Water Resistant.",
    stock: 432,
    reviews: 121,
    category: "Female Watches",
    gender: "Women",
    redeemCodeAvailable: true,
    videoUrl: "https://www.youtube.com/shorts/XIt1MFfo0ug"
  },
  {
    id: 15,
    brand: "CARRERA",
    name: "Carrera – S121",
    price: 3999,
    originalPrice: 5999,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1766757806/18_s0e0bg.jpg",
    isNew: true,
    description: "Carrera watch S121 with elegant design and premium quality materials.",
    stock: 232,
    reviews: 423,
    category: "Men Formal",
    gender: "Men",
    redeemCodeAvailable: true,
    videoUrl: ""
  },
  {
    id: 16,
    brand: "CARRERA",
    name: "Carrera – S122",
    price: 3999,
    originalPrice: 5999,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1766757806/19_ksg5h8.jpg",
    isNew: true,
    description: "Carrera watch S122 with elegant design and premium quality materials.",
    stock: 332,
    reviews: 123,
    category: "Men Formal",
    gender: "Men",
    redeemCodeAvailable: true,
    videoUrl: ""
  },
  {
    id: 17,
    brand: "CARRERA",
    name: "Carrera – S123",
    price: 3999,
    originalPrice: 5999,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1766757806/20_peovwp.jpg",
    isNew: true,
    description: "Carrera watch S123 with elegant design and premium quality materials.",
    stock: 134,
    reviews: 623,
    category: "Men Formal",
    gender: "Men",
    redeemCodeAvailable: true,
    videoUrl: ""
  },
  {
    id: 18,
    brand: "PHILIPPE",
    name: "Philippe (Men) – M049",
    price: 6999,
    originalPrice: 11999,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1766757806/21_v1wwvu.jpg",
    isNew: true,
    description: "Philippe diamonds Men watch M049 with elegant design and premium quality materials.",
    stock: 39,
    reviews: 63,
    category: "Couple Watches",
    gender: "Men",
    redeemCodeAvailable: true,
    videoUrl: ""
  },
  {
    id: 19,
    brand: "PHILIPPE",
    name: "Philippe (Women) – F050",
    price: 6999,
    originalPrice: 11999,
    image: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1766757806/22_lksheu.jpg",
    isNew: true,
    description: "Philippe diamonds Women watch F050 with elegant design and premium quality materials.",
    stock: 39,
    reviews: 63,
    category: "Couple Watches",
    gender: "Women",
    redeemCodeAvailable: true,
    videoUrl: ""
  },
];

// --- FEATURED & LOVED LISTS ---
export const homeFeaturedProducts: Product[] = [
  mainProductsData[0], 
  mainProductsData[1], 
  mainProductsData[2], 
  mainProductsData[3], 
  mainProductsData[4] // FIXED: Changed from [10] to [9] (the last item in the array)
];

export const homeLovedProducts: Product[] = [
  {
    ...mainProductsData[0], 
    thumbnail: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1766095942/Gemini_Generated_Image_zdh7jezdh7jezdh7_w1hpd3.jpg"
  },
  {
    ...mainProductsData[1], 
    thumbnail: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1766095941/Gemini_Generated_Image_x2mjwcx2mjwcx2mj_w8tmnk.jpg"
  },
  {
    ...mainProductsData[2], 
    thumbnail: "https://res.cloudinary.com/dm7irbzcf/image/upload/v1766095941/Gemini_Generated_Image_mdccl6mdccl6mdcc_jsfpnb.jpg"
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
    question: "What are the benefits for loyal customers?",
    answer: "We value our returning customers! You will earn Royalty Points on every purchase. How it works For every Rs. 5,000 spent, you earn 100 Points. Redemption 1 Point is equal to Rs. 1. You can redeem these points on future orders."
  }
  ,
  {
    question: "How long does delivery take?",
    answer: "Once your order is confirmed, you will receive your package within 03 to 07 working days."
  }
  ,{
    question: "How do I confirm my order?",
    answer: "To confirm your order, you need to pay Rs. 200 delivery charges in advance via JazzCash or EasyPaisa. Please share the payment screenshot with our WhatsApp support team to process your order. The remaining amount will be collected via Cash on Delivery (COD) when the rider arrives."
  }
  ,{
    question: "Is there a warranty or return policy?",
    answer: "All our products are of premium quality. However, for your satisfaction, we offer an Open Parcel Policy. You can open the parcel and check the watch before making the payment to the rider. If you find any defect or do not like the product, you can return or exchange it instantly."
  }
  ,{
    question: "How can I place an order?",
    answer: "We are committed to providing premium quality watches at prices significantly lower than the market rate. You get luxury style without the heavy price tag."
  },{
    question: "What is your exchange & return policy",
    answer: "We offer a 03-day exchange and return policy for all unworn watches in original packaging. Please retain your receipt.",
  },
  {
    question: "How will my order be shipped",
    answer: "All orders are shipped via insured express courier services. You will receive a tracking number once your order is dispatched.",
  },
  {
    question: "Can I collect my order from your retail stores?",
    answer: "currently, you can purchase our products online.",
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
  "SUCCESS WAY",
  "CARRERA",
  "PHILIPPE"
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