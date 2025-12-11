"use client";

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import {
  mainProductsData,
  homeFeaturedProducts,
  homeLovedProducts,
  categoriesData,
  featuredCollectionsData,
  newsArticlesData,
  faqsData,
  reviewsData,
  globalRedeemCode,
  Product,
  Category,
  Collection,
  Article,
  FAQ,
  Review
} from "@/app/website-data";

export interface ExtendedProduct extends Product {
  category?: string;
  images?: string[];
  discountPercentage?: number;
  redeemCodeAvailable?: boolean;
}

// UPDATED: Added isCouponApplied to CartItem
export interface CartItem extends ExtendedProduct {
  quantity: number;
  isCouponApplied?: boolean; 
}

export interface UserProfile {
  name: string;
  phone: string;
  image?: string;
}

interface GlobalContextType {
  products: ExtendedProduct[];
  addProduct: (product: ExtendedProduct) => void;
  updateProduct: (id: number, updatedProduct: ExtendedProduct) => void;
  deleteProduct: (id: number) => void;
  toggleStock: (product: ExtendedProduct) => void;

  featuredProducts: ExtendedProduct[];
  toggleFeatured: (product: ExtendedProduct) => void;

  lovedProducts: ExtendedProduct[];
  toggleLoved: (product: ExtendedProduct, customThumbnail?: string) => void;
  
  categories: Category[];
  addCategory: (category: Category) => void;
  deleteCategory: (name: string) => void;

  featuredCollections: Collection[];
  addCollection: (collection: Collection) => void;
  deleteCollection: (title: string) => void;

  newsArticles: Article[];
  addArticle: (article: Article) => void;
  deleteArticle: (title: string) => void;

  faqs: FAQ[];
  addFAQ: (faq: FAQ) => void;
  deleteFAQ: (question: string) => void;

  reviews: Review[];
  addReview: (review: Review) => void;
  deleteReview: (id: number) => void;
  editReview: (id: number, updatedContent: string, updatedRating: number) => void;
  
  adminCreds: { user: string; pass: string };
  updateAdminCreds: (user: string, pass: string) => void;

  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (product: ExtendedProduct, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateCartQuantity: (id: number, type: 'inc' | 'dec') => void;

  wishlist: number[];
  toggleWishlist: (id: number) => void;
  user: UserProfile | null;
  loginUser: (profile: UserProfile) => void;
  logoutUser: () => void;

  // --- UPDATED COUPON FUNCTIONS ---
  applyCouponToItem: (itemId: number, code: string) => boolean;
  removeCouponFromItem: (itemId: number) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ExtendedProduct[]>(mainProductsData);
  const [featuredProducts, setFeaturedProducts] = useState<ExtendedProduct[]>(homeFeaturedProducts);
  const [lovedProducts, setLovedProducts] = useState<ExtendedProduct[]>(homeLovedProducts);
  const [categories, setCategories] = useState<Category[]>(categoriesData);
  const [featuredCollections, setFeaturedCollections] = useState<Collection[]>(featuredCollectionsData);
  const [newsArticles, setNewsArticles] = useState<Article[]>(newsArticlesData);
  const [faqs, setFaqs] = useState<FAQ[]>(faqsData);
  const [reviews, setReviews] = useState<Review[]>(reviewsData);
  const [adminCreds, setAdminCreds] = useState({ user: "admin", pass: "watches123@" });

  // --- CART & USER ---
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Load Data
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("shoppingCart");
      const savedWishlist = localStorage.getItem("wishlist");
      const savedUser = localStorage.getItem("userProfile");
      const savedReviews = localStorage.getItem("reviews"); 

      if (savedCart) try { setCart(JSON.parse(savedCart)); } catch (e) { console.error(e); }
      if (savedWishlist) try { setWishlist(JSON.parse(savedWishlist)); } catch (e) { console.error(e); }
      if (savedUser) try { setUser(JSON.parse(savedUser)); } catch (e) { console.error(e); }
      if (savedReviews) try { setReviews(JSON.parse(savedReviews)); } catch (e) { console.error(e); }
      
      setIsDataLoaded(true);
    }
  }, []);

  // Save Data
  useEffect(() => {
    if (isDataLoaded) {
      localStorage.setItem("shoppingCart", JSON.stringify(cart));
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      localStorage.setItem("reviews", JSON.stringify(reviews));
      if (user) localStorage.setItem("userProfile", JSON.stringify(user));
      else localStorage.removeItem("userProfile");
    }
  }, [cart, wishlist, user, reviews, isDataLoaded]);

  // --- CART FUNCTIONS ---
  const addToCart = (product: ExtendedProduct, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      // Initialize isCouponApplied as false
      return [...prev, { ...product, quantity: quantity, isCouponApplied: false }];
    });
    setIsCartOpen(true); 
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCartQuantity = (id: number, type: 'inc' | 'dec') => {
    setCart((prev) => 
      prev.map((item) => {
        if (item.id === id) {
          const newQty = type === 'inc' ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  // --- COUPON FUNCTIONS (PER ITEM) ---
  const applyCouponToItem = (itemId: number, code: string) => {
    if (code === globalRedeemCode) {
      setCart((prev) => prev.map(item => {
        if (item.id === itemId && item.redeemCodeAvailable) {
          return { ...item, isCouponApplied: true };
        }
        return item;
      }));
      return true;
    }
    return false;
  };

  const removeCouponFromItem = (itemId: number) => {
    setCart((prev) => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, isCouponApplied: false };
      }
      return item;
    }));
  };

  // --- OTHER FUNCTIONS ---
  const toggleWishlist = (id: number) => {
    setWishlist((prev) => {
      if (prev.includes(id)) return prev.filter((pid) => pid !== id);
      else return [...prev, id];
    });
  };

  const loginUser = (profile: UserProfile) => setUser(profile);
  const logoutUser = () => setUser(null);

  const addReview = (review: Review) => setReviews([review, ...reviews]);
  const deleteReview = (id: number) => setReviews((prev) => prev.filter(r => r.id !== id));
  const editReview = (id: number, content: string, rating: number) => setReviews((prev) => prev.map(r => r.id === id ? { ...r, content, rating } : r));

  const addProduct = (p: ExtendedProduct) => setProducts([{ ...p, id: Date.now() }, ...products]);
  const updateProduct = (id: number, p: ExtendedProduct) => {
    setProducts(products.map(prod => prod.id === id ? { ...p, id } : prod));
    setFeaturedProducts(featuredProducts.map(prod => prod.id === id ? { ...p, id } : prod));
    setLovedProducts(lovedProducts.map(prod => prod.id === id ? { ...p, id } : prod));
  };
  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    setFeaturedProducts(featuredProducts.filter(p => p.id !== id));
    setLovedProducts(lovedProducts.filter(p => p.id !== id));
  };
  const toggleStock = (product: ExtendedProduct) => {
     if (product.stock && product.stock > 0) {
       if(window.confirm("Mark Out of Stock?")) updateProduct(product.id, {...product, stock: 0});
     } else {
       const qty = parseInt(window.prompt("Enter quantity:", "10") || "0");
       if(qty > 0) updateProduct(product.id, {...product, stock: qty});
     }
  };
  const toggleFeatured = (p: ExtendedProduct) => {
    const exists = featuredProducts.find(fp => fp.id === p.id);
    if(exists) setFeaturedProducts(featuredProducts.filter(fp => fp.id !== p.id));
    else setFeaturedProducts([p, ...featuredProducts]);
  };
  const toggleLoved = (p: ExtendedProduct, thumb?: string) => {
    const exists = lovedProducts.find(lp => lp.id === p.id);
    if(exists) setLovedProducts(lovedProducts.filter(lp => lp.id !== p.id));
    else setLovedProducts([thumb ? {...p, thumbnail: thumb} : p, ...lovedProducts]);
  };

  // Keep simple list updaters
  const addCategory = (c: Category) => setCategories([...categories, c]);
  const deleteCategory = (name: string) => setCategories(categories.filter(c => c.name !== name));
  const addCollection = (c: Collection) => setFeaturedCollections([...featuredCollections, c]);
  const deleteCollection = (title: string) => setFeaturedCollections(featuredCollections.filter(c => c.title !== title));
  const addArticle = (a: Article) => setNewsArticles([...newsArticles, a]);
  const deleteArticle = (title: string) => setNewsArticles(newsArticles.filter(a => a.title !== title));
  const addFAQ = (f: FAQ) => setFaqs([...faqs, f]);
  const deleteFAQ = (q: string) => setFaqs(faqs.filter(f => f.question !== q));
  const updateAdminCreds = (u: string, p: string) => setAdminCreds({user: u, pass: p});

  return (
    <GlobalContext.Provider
      value={{
        products, addProduct, updateProduct, deleteProduct, toggleStock,
        featuredProducts, toggleFeatured, lovedProducts, toggleLoved,
        categories, addCategory, deleteCategory,
        featuredCollections, addCollection, deleteCollection,
        newsArticles, addArticle, deleteArticle,
        faqs, addFAQ, deleteFAQ, 
        reviews, addReview, deleteReview, editReview,
        adminCreds, updateAdminCreds,
        cart, addToCart, removeFromCart, updateCartQuantity, isCartOpen, setIsCartOpen,
        wishlist, toggleWishlist, user, loginUser, logoutUser,
        applyCouponToItem, removeCouponFromItem // Exported new functions
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobalContext must be used within a GlobalProvider");
  return context;
};