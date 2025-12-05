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
  addToCart: (product: ExtendedProduct) => void;
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

  // Load Cart from Local Storage on Mount
  useEffect(() => {
    const savedCart = localStorage.getItem("shoppingCart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart", error);
      }
    }
  }, []);

  // Save Cart to Local Storage whenever it changes
  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ExtendedProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Open cart when item added
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

  // Admin Sync Logic (unchanged)
  useEffect(() => {
    const channel = new BroadcastChannel('watches_website_sync');
    channel.onmessage = (event) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = event.data as any;
      if (data.type === 'REQUEST_STATE') {
        channel.postMessage({ type: 'UPDATE_ALL', state: stateRef.current });
      }
      if (data.type === 'UPDATE_ALL') {
        const state = data.state as GlobalStateSnapshot;
        if (state.products) setProducts(state.products);
        if (state.featuredProducts) setFeaturedProducts(state.featuredProducts);
        if (state.lovedProducts) setLovedProducts(state.lovedProducts);
        if (state.categories) setCategories(state.categories);
        if (state.featuredCollections) setFeaturedCollections(state.featuredCollections);
        if (state.newsArticles) setNewsArticles(state.newsArticles);
        if (state.faqs) setFaqs(state.faqs);
        if (state.reviews) setReviews(state.reviews);
        if (state.adminCreds) setAdminCreds(state.adminCreds);
      }
    };
    channel.postMessage({ type: 'REQUEST_STATE' });
    return () => channel.close();
  }, []);

  const broadcastUpdate = (newState: GlobalStateSnapshot) => {
    const channel = new BroadcastChannel('watches_website_sync');
    channel.postMessage({ type: 'UPDATE_ALL', state: newState });
    channel.close();
  };

  const addProduct = (product: ExtendedProduct) => {
    const updated = [ { ...product, id: Date.now() }, ...products];
    setProducts(updated);
    broadcastUpdate({ ...stateRef.current, products: updated });
  };

  const updateProduct = (id: number, updatedProduct: ExtendedProduct) => {
    const updated = products.map(p => p.id === id ? { ...updatedProduct, id } : p);
    setProducts(updated);
    const updatedFeatured = featuredProducts.map(p => p.id === id ? { ...updatedProduct, id } : p);
    const updatedLoved = lovedProducts.map(p => p.id === id ? { ...updatedProduct, id } : p);
    setFeaturedProducts(updatedFeatured);
    setLovedProducts(updatedLoved);
    broadcastUpdate({ ...stateRef.current, products: updated, featuredProducts: updatedFeatured, lovedProducts: updatedLoved });
  };

  const deleteProduct = (id: number) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    const updatedFeatured = featuredProducts.filter(p => p.id !== id);
    const updatedLoved = lovedProducts.filter(p => p.id !== id);
    setFeaturedProducts(updatedFeatured);
    setLovedProducts(updatedLoved);
    broadcastUpdate({ ...stateRef.current, products: updated, featuredProducts: updatedFeatured, lovedProducts: updatedLoved });
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
    let updated;
    if (exists) {
      updated = featuredProducts.filter(p => p.id !== product.id);
    } else {
      updated = [product, ...featuredProducts];
    }
    setFeaturedProducts(updated);
    broadcastUpdate({ ...stateRef.current, featuredProducts: updated });
  };

  const toggleLoved = (product: ExtendedProduct, customThumbnail?: string) => {
    const exists = lovedProducts.find(p => p.id === product.id);
    let updated;
    if (exists) {
      updated = lovedProducts.filter(p => p.id !== product.id);
    } else {
      const productToAdd = customThumbnail ? { ...product, thumbnail: customThumbnail } : product;
      updated = [productToAdd, ...lovedProducts];
    }
    setLovedProducts(updated);
    broadcastUpdate({ ...stateRef.current, lovedProducts: updated });
  };

  const addCategory = (category: Category) => {
    const updated = [...categories, category];
    setCategories(updated);
    broadcastUpdate({ ...stateRef.current, categories: updated });
  };
  const deleteCategory = (name: string) => {
    const updated = categories.filter((c) => c.name !== name);
    setCategories(updated);
    broadcastUpdate({ ...stateRef.current, categories: updated });
  };
  const addCollection = (collection: Collection) => {
    const updated = [...featuredCollections, collection];
    setFeaturedCollections(updated);
    broadcastUpdate({ ...stateRef.current, featuredCollections: updated });
  };
  const deleteCollection = (title: string) => {
    const updated = featuredCollections.filter((c) => c.title !== title);
    setFeaturedCollections(updated);
    broadcastUpdate({ ...stateRef.current, featuredCollections: updated });
  };
  const addArticle = (article: Article) => {
    const updated = [...newsArticles, article];
    setNewsArticles(updated);
    broadcastUpdate({ ...stateRef.current, newsArticles: updated });
  };
  const deleteArticle = (title: string) => {
    const updated = newsArticles.filter((a) => a.title !== title);
    setNewsArticles(updated);
    broadcastUpdate({ ...stateRef.current, newsArticles: updated });
  };
  const addFAQ = (faq: FAQ) => {
    const updated = [...faqs, faq];
    setFaqs(updated);
    broadcastUpdate({ ...stateRef.current, faqs: updated });
  };
  const deleteFAQ = (question: string) => {
    const updated = faqs.filter((q) => q.question !== question);
    setFaqs(updated);
    broadcastUpdate({ ...stateRef.current, faqs: updated });
  };
  const updateAdminCreds = (user: string, pass: string) => {
    const updated = { user, pass };
    setAdminCreds(updated);
    broadcastUpdate({ ...stateRef.current, adminCreds: updated });
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