"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Search, 
  User,
  ArrowRight,
  Star, 
  ChevronLeft,
  Filter,
  Heart,
  Plus,
  Minus,
  Trash2,
  Mail,
  Globe
} from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dynamic Product State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Light Gray');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // --- Cart Logic ---
  const addToCart = (product:{id: number;name: string;price: string;image: string;}) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === selectedSize);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.size === selectedSize) 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
        );
      }
      return [...prev, { ...product, quantity: 1, size: selectedSize, color: selectedColor }];
    });
    setCurrentPage('cart');
  };

  const updateQuantity = (id, size, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.size === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id, size) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const cartTotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + (price * item.quantity);
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Helper to open a specific product
  const openProduct = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  // --- Data ---
  const products = [
    {
      id: 1,
      name: "Linen Shirt",
      price: "$120.00",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
      category: "Men",
      description: "Premium linen craftsmanship for effortless elegance. Tailored for a relaxed yet refined fit."
    },
    {
      id: 2,
      name: "Tailored Blazer",
      price: "$350.00",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      category: "Men",
      description: "A sharp, modern silhouette designed for professional and formal versatility."
    },
    {
      id: 3,
      name: "Minimalist Watch",
      price: "$195.00",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
      category: "Accessories",
      description: "Precision meets minimalism. A timeless timepiece for the modern professional."
    },
    {
      id: 4,
      name: "Leather Sneakers",
      price: "$180.00",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
      category: "Accessories",
      description: "Handcrafted Italian leather meets urban comfort. The ultimate versatile footwear."
    }
  ];

  // --- Sub-components (Pages) ---

  const HomePage = () => (
    <>
      <section className="relative h-[90vh] bg-[#F9F9F9] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=80" 
            alt="Velora Editorial Hero" 
            className="w-full h-full object-cover grayscale-[15%] brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent"></div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full relative z-10">
          <div className="max-w-2xl text-white lg:text-slate-900">
            <h2 className="text-5xl lg:text-8xl font-serif mb-8 leading-[1] tracking-tight">Redefining<br />Everyday Style</h2>
            <p className="text-lg lg:text-xl lg:text-slate-500 mb-12 max-w-md leading-relaxed">Pieces that blend timeless elegance with modern functionality.</p>
            <button onClick={() => setCurrentPage('shop')} className="bg-[#C5A373] text-white px-12 py-5 text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-[#B38F5F] transition-all transform hover:-translate-y-1">Shop Now</button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-serif">Best Sellers</h2>
            <button onClick={() => setCurrentPage('shop')} className="text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-[#C5A373]">View All</button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-white mb-6 cursor-pointer" onClick={() => openProduct(product)}>
                  <img src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                    className="absolute bottom-4 left-4 right-4 bg-white py-3 text-[10px] font-bold tracking-[0.1em] uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
                <h4 className="text-sm font-medium mb-1">{product.name}</h4>
                <p className="text-sm font-bold text-[#C5A373]">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const ShopPage = () => (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
      <h2 className="text-4xl font-serif mb-12">All Collections</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product, i) => (
          <div key={i} className="group">
            <div className="relative aspect-[3/4] bg-gray-50 mb-6 cursor-pointer" onClick={() => openProduct(product)}>
              <img src={product.image} className="w-full h-full object-cover" />
              <button 
                onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                className="absolute bottom-4 left-4 right-4 bg-black text-white py-3 text-[10px] font-bold tracking-[0.1em] uppercase opacity-0 group-hover:opacity-100 transition-all"
              >
                Quick Add
              </button>
            </div>
            <h4 className="text-sm font-medium mb-1">{product.name}</h4>
            <p className="text-sm font-bold text-[#C5A373]">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const CartPage = () => (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
      <h2 className="text-4xl font-serif mb-12">Your Cart ({cartCount})</h2>
      {cart.length === 0 ? (
        <div className="text-center py-20 border-y">
          <p className="text-gray-400 mb-8 uppercase tracking-widest text-xs">Your bag is currently empty</p>
          <button onClick={() => setCurrentPage('shop')} className="bg-black text-white px-12 py-5 text-[11px] font-bold tracking-[0.3em] uppercase">Continue Shopping</button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            {cart.map((item, idx) => (
              <div key={`${item.id}-${item.size}-${idx}`} className="flex gap-6 pb-8 border-b border-gray-100">
                <div className="w-32 aspect-[3/4] bg-gray-50 flex-shrink-0">
                  <img src={item.image} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-serif mb-1">{item.name}</h3>
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Size: {item.size} • Color: {item.color}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id, item.size)}><Trash2 size={18} className="text-gray-300 hover:text-red-500 transition-colors" /></button>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-gray-200 rounded-sm">
                      <button onClick={() => updateQuantity(item.id, item.size, -1)} className="p-2 hover:bg-gray-50"><Minus size={14} /></button>
                      <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, 1)} className="p-2 hover:bg-gray-50"><Plus size={14} /></button>
                    </div>
                    <p className="font-bold text-[#C5A373]">{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#FAFAFA] p-8 h-fit border border-gray-100">
            <h3 className="font-bold text-xs tracking-widest uppercase mb-8">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="text-green-600 font-bold tracking-widest uppercase text-[10px]">Free</span>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200 flex justify-between items-center mb-8">
              <span className="font-serif text-xl">Total</span>
              <span className="text-xl font-bold">${cartTotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-black text-white py-5 text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-slate-800 transition-all">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const SearchPage = () => (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 text-center">
      <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-12">Search Velora</h2>
      <div className="max-w-2xl mx-auto relative mb-20">
        <input 
          autoFocus
          type="text" 
          placeholder="What are you looking for?" 
          className="w-full text-4xl font-serif border-b border-gray-100 py-6 text-center focus:outline-none focus:border-black transition-colors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300" size={32} />
      </div>
    </div>
  );

  const ProfilePage = () => (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 flex justify-center">
      <div className="w-full max-w-md bg-white p-12 border border-gray-50 shadow-sm">
        <h2 className="text-3xl font-serif text-center mb-4">Welcome Back</h2>
        <p className="text-center text-gray-400 text-sm mb-12 tracking-wide">Enter your details to access your account.</p>
        <div className="space-y-6">
          <input type="email" placeholder="Email Address" className="w-full border-b border-gray-100 py-4 text-sm focus:outline-none focus:border-black" />
          <input type="password" placeholder="Password" className="w-full border-b border-gray-100 py-4 text-sm focus:outline-none focus:border-black" />
          <button className="w-full bg-black text-white py-5 text-[11px] font-bold tracking-[0.3em] uppercase mt-8 hover:bg-slate-900 transition-all">Sign In</button>
          <div className="text-center pt-8">
            <button className="text-[10px] font-bold tracking-widest uppercase text-gray-400 underline decoration-[#C5A373] underline-offset-8">Create Account</button>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductDetailPage = () => {
    // Safety check if no product is selected
    const product = selectedProduct || products[0];

    return (
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="aspect-[3/4] bg-gray-50 overflow-hidden">
            <img src={product.image} className="w-full h-full object-cover" />
          </div>
          <div className="py-4">
            <h1 className="text-4xl font-serif mb-4">{product.name}</h1>
            <p className="text-2xl font-bold text-[#C5A373] mb-8">{product.price}</p>
            <p className="text-gray-500 leading-relaxed mb-10">{product.description}</p>
            
            <div className="mb-8">
              <h4 className="text-[10px] font-bold tracking-widest uppercase mb-4">Select Color: <span className="text-gray-400">{selectedColor}</span></h4>
              <div className="flex gap-3">
                {[
                  { name: 'Light Gray', hex: '#E5E5E5' },
                  { name: 'Onyx', hex: '#2B2B2B' },
                  { name: 'Velora Tan', hex: '#C5A373' }
                ].map(color => (
                  <button 
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 p-0.5 transition-all ${selectedColor === color.name ? 'border-black' : 'border-transparent'}`}
                  >
                    <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }}></div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h4 className="text-[10px] font-bold tracking-widest uppercase mb-4">Select Size</h4>
              <div className="grid grid-cols-5 gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map(s => (
                  <button 
                    key={s} 
                    onClick={() => setSelectedSize(s)}
                    className={`h-12 border text-xs font-bold transition-all ${selectedSize === s ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-black'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => addToCart(product)} className="w-full bg-black text-white py-5 text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-slate-800 transition-all active:scale-[0.98]">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1A1A1A]">
      <div className="bg-[#1A1A1A] text-white text-[10px] py-2 text-center tracking-[0.2em] font-medium uppercase">
        Free Shipping on orders over $150
      </div>

      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100 py-3' : 'bg-white py-6'}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-3 items-center">
            <div className="hidden lg:flex items-center gap-8 text-[12px] font-bold tracking-widest uppercase">
              <button 
                onClick={() => setCurrentPage('shop')} 
                className={`transition-colors duration-300 cursor-pointer ${currentPage === 'shop' ? 'text-[#C5A373]' : 'hover:text-[#C5A373]'}`}
              >
                Shop
              </button>
              <button 
                onClick={() => setCurrentPage('home')} 
                className="transition-colors duration-300 cursor-pointer hover:text-[#C5A373]"
              >
                Collections
              </button>
            </div>
            <div className="text-center">
              <button onClick={() => setCurrentPage('home')} className="cursor-pointer group">
                <h1 className="text-3xl lg:text-4xl font-serif tracking-[0.15em] font-light transition-colors duration-300 group-hover:text-[#C5A373]">VELORA</h1>
              </button>
            </div>
            <div className="flex items-center justify-end gap-5">
              <button 
                onClick={() => setCurrentPage('search')}
                className={`transition-colors duration-300 cursor-pointer hover:text-[#C5A373] ${currentPage === 'search' ? 'text-[#C5A373]' : ''}`}
              >
                <Search size={20} strokeWidth={1.5} />
              </button>
              <button 
                onClick={() => setCurrentPage('profile')}
                className={`transition-colors duration-300 cursor-pointer hover:text-[#C5A373] ${currentPage === 'profile' ? 'text-[#C5A373]' : ''}`}
              >
                <User size={20} strokeWidth={1.5} />
              </button>
              <button 
                onClick={() => setCurrentPage('cart')} 
                className={`relative transition-colors duration-300 cursor-pointer hover:text-[#C5A373] ${currentPage === 'cart' ? 'text-[#C5A373]' : ''}`}
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C5A373] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="min-h-[60vh]">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'product' && <ProductDetailPage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'search' && <SearchPage />}
        {currentPage === 'profile' && <ProfilePage />}
      </main>

      <footer className="bg-[#1A1A1A] text-white pt-24 pb-12 mt-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div>
              <button onClick={() => setCurrentPage('home')} className="text-3xl font-serif tracking-[0.15em] mb-8 cursor-pointer hover:text-[#C5A373] transition-colors duration-300">VELORA</button>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">Elevating everyday style through conscious design and impeccable quality.</p>
              <div className="flex gap-4">
                {[Mail, Globe, User].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 border border-gray-800 flex items-center justify-center hover:border-[#C5A373] hover:text-[#C5A373] transition-all cursor-pointer"><Icon size={18} /></a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-900 text-center text-gray-500 text-[10px] tracking-widest uppercase">
            © 2024 VELORA GLOBAL. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;