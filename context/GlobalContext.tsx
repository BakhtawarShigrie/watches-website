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
}

// Cart Item Interface
export interface CartItem extends ExtendedProduct {
  quantity: number;
}

interface GlobalStateSnapshot {
  products: ExtendedProduct[];
  featuredProducts: ExtendedProduct[];
  lovedProducts: ExtendedProduct[];
  categories: Category[];
  featuredCollections: Collection[];
  newsArticles: Article[];
  faqs: FAQ[];
  reviews: Review[];
  adminCreds: { user: string; pass: string };
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
  
  adminCreds: { user: string; pass: string };
  updateAdminCreds: (user: string, pass: string) => void;

  // --- CART TYPES ---
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (product: ExtendedProduct, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateCartQuantity: (id: number, type: 'inc' | 'dec') => void;
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

  // --- CART STATE ---
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  // Load Cart from Local Storage on Mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("shoppingCart");
      if (savedCart) {
        try {
          // ESLint rule disabled because this is a necessary initialization pattern in Next.js
          // eslint-disable-next-line react-hooks/exhaustive-deps
          setCart(JSON.parse(savedCart));
        } catch (error) {
          console.error("Failed to parse cart", error);
        }
      }
      setIsCartLoaded(true);
    }
  }, []);

  // Save Cart to Local Storage whenever it changes
  useEffect(() => {
    if (isCartLoaded) {
      localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }
  }, [cart, isCartLoaded]);

  const addToCart = (product: ExtendedProduct, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity: quantity }];
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

  const stateRef = useRef<GlobalStateSnapshot>({
    products, featuredProducts, lovedProducts, categories, 
    featuredCollections, newsArticles, faqs, reviews, adminCreds
  });

  useEffect(() => {
    stateRef.current = {
      products, featuredProducts, lovedProducts, categories, 
      featuredCollections, newsArticles, faqs, reviews, adminCreds
    };
  }, [products, featuredProducts, lovedProducts, categories, featuredCollections, newsArticles, faqs, reviews, adminCreds]);

  // Admin Sync Logic removed for production as per previous instruction, 
  // but keeping provider structure clean.

  const addProduct = (product: ExtendedProduct) => {
    setProducts([ { ...product, id: Date.now() }, ...products]);
  };

  const updateProduct = (id: number, updatedProduct: ExtendedProduct) => {
    setProducts(products.map(p => p.id === id ? { ...updatedProduct, id } : p));
    setFeaturedProducts(featuredProducts.map(p => p.id === id ? { ...updatedProduct, id } : p));
    setLovedProducts(lovedProducts.map(p => p.id === id ? { ...updatedProduct, id } : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    setFeaturedProducts(featuredProducts.filter(p => p.id !== id));
    setLovedProducts(lovedProducts.filter(p => p.id !== id));
  };

  const toggleStock = (product: ExtendedProduct) => {
    if (product.stock && product.stock > 0) {
      const confirmUnstock = window.confirm("Are you sure you want to mark this product as Out of Stock?");
      if (confirmUnstock) {
        updateProduct(product.id, { ...product, stock: 0 });
      }
    } else {
      const qtyStr = window.prompt("Enter stock quantity to add:", "10");
      if (qtyStr) {
        const qty = parseInt(qtyStr);
        if (!isNaN(qty) && qty > 0) {
          updateProduct(product.id, { ...product, stock: qty });
        }
      }
    }
  };

  const toggleFeatured = (product: ExtendedProduct) => {
    const exists = featuredProducts.find(p => p.id === product.id);
    if (exists) {
      setFeaturedProducts(featuredProducts.filter(p => p.id !== product.id));
    } else {
      setFeaturedProducts([product, ...featuredProducts]);
    }
  };

  const toggleLoved = (product: ExtendedProduct, customThumbnail?: string) => {
    const exists = lovedProducts.find(p => p.id === product.id);
    if (exists) {
      setLovedProducts(lovedProducts.filter(p => p.id !== product.id));
    } else {
      const productToAdd = customThumbnail ? { ...product, thumbnail: customThumbnail } : product;
      setLovedProducts([productToAdd, ...lovedProducts]);
    }
  };

  const addCategory = (category: Category) => {
    setCategories([...categories, category]);
  };
  const deleteCategory = (name: string) => {
    setCategories(categories.filter((c) => c.name !== name));
  };
  const addCollection = (collection: Collection) => {
    setFeaturedCollections([...featuredCollections, collection]);
  };
  const deleteCollection = (title: string) => {
    setFeaturedCollections(featuredCollections.filter((c) => c.title !== title));
  };
  const addArticle = (article: Article) => {
    setNewsArticles([...newsArticles, article]);
  };
  const deleteArticle = (title: string) => {
    setNewsArticles(newsArticles.filter((a) => a.title !== title));
  };
  const addFAQ = (faq: FAQ) => {
    setFaqs([...faqs, faq]);
  };
  const deleteFAQ = (question: string) => {
    setFaqs(faqs.filter((q) => q.question !== question));
  };
  const updateAdminCreds = (user: string, pass: string) => {
    setAdminCreds({ user, pass });
  };

  return (
    <GlobalContext.Provider
      value={{
        products, addProduct, updateProduct, deleteProduct,
        toggleStock,
        featuredProducts, toggleFeatured,
        lovedProducts, toggleLoved,
        categories, addCategory, deleteCategory,
        featuredCollections, addCollection, deleteCollection,
        newsArticles, addArticle, deleteArticle,
        faqs, addFAQ, deleteFAQ,
        reviews,
        adminCreds, updateAdminCreds,
        cart, addToCart, removeFromCart, updateCartQuantity, isCartOpen, setIsCartOpen
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