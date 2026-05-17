"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '../lib/supabase';
import { PRODUCTS } from '../data/products';

export default function Home() {
  // --- STATE ---
  const [cart, setCart] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [currentBrand, setCurrentBrand] = useState('todos');
  const [currentCategory, setCurrentCategory] = useState('all');
  const [isShowingAll, setIsShowingAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('light');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState({ show: false, msg: '' });
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [activeCategoryZoom, setActiveCategoryZoom] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState(20);
  const [paymentMethod, setPaymentMethod] = useState('deposito');
  const [sortByPrice, setSortByPrice] = useState('default');
  const [petals, setPetals] = useState([]);
  const [introPetals, setIntroPetals] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from('products').select('*');
        if (data) {
           const mappedProducts = data.map(p => ({
              id: p.id,
              brand: p.brand,
              brandName: p.brand_name,
              name: p.name,
              nameLong: p.name_long,
              price: p.price,
              size: p.size_info,
              img: p.image_url,
              desc: p.description,
              tags: p.tags || [],
              badge: p.badge,
              categories: p.categories || [],
              benefits: p.benefits || [],
              stock: p.stock
           }));
           
           // Ordenar según el orden del archivo products.js
           const orderedNames = PRODUCTS.map(p => p.name);
           mappedProducts.sort((a, b) => {
             return orderedNames.indexOf(a.name) - orderedNames.indexOf(b.name);
           });
           
           setProductsData(mappedProducts);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const pressTimerRef = useRef(null);

  const handlePressStart = (id) => {
    // Si ya hay un timer corriendo, lo limpiamos por seguridad
    if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
    
    pressTimerRef.current = setTimeout(() => {
      setActiveCategoryZoom(id);
    }, 500);
  };

  const handlePressEnd = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
    setActiveCategoryZoom(null);
  };

  const triggerConfetti = () => {
    const colors = ['#f497ad', '#b39cd0', '#e8597d', '#FFD700', '#00F5FF', '#FF6B6B', '#4ECDC4', '#FFE66D', '#FF922B'];
    const emojis = ['🌸', '✨', '⭐', '💖', '💠'];
    
    // 5 ráfagas grandes en abanico
    const bursts = [
      { x: 50, y: 50 }, // Centro
      { x: 20, y: 30 }, // Arriba Izquierda
      { x: 80, y: 30 }, // Arriba Derecha
      { x: 25, y: 70 }, // Abajo Izquierda
      { x: 75, y: 70 }  // Abajo Derecha
    ];

    bursts.forEach((burst, bIdx) => {
      setTimeout(() => {
        for (let i = 0; i < 40; i++) {
          const particle = document.createElement('div');
          particle.className = 'firework-particle big';
          
          const isEmoji = Math.random() > 0.6;
          if (isEmoji) {
            particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            particle.style.background = 'none';
          } else {
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          }
          
          particle.style.left = burst.x + 'vw';
          particle.style.top = burst.y + 'vh';
          
          const angle = Math.random() * Math.PI * 2;
          const velocity = 150 + Math.random() * 350; // Explosión más grande
          const tx = Math.cos(angle) * velocity;
          const ty = Math.sin(angle) * velocity;
          
          particle.style.setProperty('--tx', `${tx}px`);
          particle.style.setProperty('--ty', `${ty}px`);
          particle.style.fontSize = (15 + Math.random() * 15) + 'px';
          
          document.body.appendChild(particle);
          setTimeout(() => particle.remove(), 1000);
        }
      }, bIdx * 100); // Ligeramente desfasados para mayor efecto
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3200);

    // Generar pétalos para la intro (solo cliente)
    const newIntroPetals = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${3 + Math.random() * 3}s`
    }));
    setIntroPetals(newIntroPetals);

    return () => clearTimeout(timer);
  }, []);

  const heroSlides = [
    { 
      id: 1, 
      badge: '✦ MÁS VENDIDO ✦', 
      title: <>Anua Heartleaf<br/><em>Aceite Limpiador</em></>, 
      desc: 'Remueve impurezas y maquillaje profundamente con el poder calmante del Heartleaf.',
      img: '/assets/images/collage/an.jpeg',
      btnPrimary: 'Comprar Ahora',
      linkPrimary: '#productos'
    },
    { 
      id: 2, 
      badge: '✦ EFECTO PIEL DE CRISTAL ✦', 
      title: <>Mixsoon Bean<br/><em>Serum</em></>, 
      desc: 'Hidratación profunda y exfoliación suave con extracto de frijol fermentado. El secreto coreano.',
      img: '/assets/images/marcas/mixsoon/beanessence50.png',
      btnPrimary: 'Ver Producto',
      linkPrimary: '#productos'
    },
    { 
      id: 3, 
      badge: '✦ PROTECCIÓN INVISIBLE ✦', 
      title: <>Mixsoon Sun<br/><em>Protector Solar</em></>, 
      desc: 'Protección solar ultra-ligera SPF 50+ con acabado invisible y sensación refrescante de agua.',
      img: '/assets/images/marcas/mixsoon/protectorsolar.jpg',
      btnPrimary: 'Proteger mi Piel',
      linkPrimary: '#productos'
    },
    { 
      id: 4, 
      badge: '✦ RUTINA COMPLETA ✦', 
      title: <>Round Lab<br/><em>Kit</em></>, 
      desc: 'El kit perfecto para hidratar tu piel con la pureza de la savia de abedul coreano.',
      img: '/assets/images/marcas/roundlab/kitroundlab.jpg',
      btnPrimary: 'Ver Kit',
      linkPrimary: '#productos'
    },
    { 
      id: 5, 
      badge: '✦ FAVORITO GLOBAL ✦', 
      title: <>Round Lab<br/><em>Protector Solar</em></>, 
      desc: 'El protector solar más premiado de Corea. Hidratación y protección extrema SPF 50+.',
      img: '/assets/images/marcas/roundlab/spf50roundlab.jpg',
      btnPrimary: 'Comprar Ahora',
      linkPrimary: '#productos'
    },
    { 
      id: 6, 
      badge: '✦ DOBLE LIMPIEZA ✦', 
      title: <>Skin1004 Centella<br/><em>Limpiador en Aceite</em></>, 
      desc: 'Limpieza profunda y calmante con centella de Madagascar. Remueve SPF y maquillaje fácilmente.',
      img: '/assets/images/marcas/skin1004/Centella/Limpiador en Aceite Centella 200 ml.jpg',
      btnPrimary: 'Limpiar mi Piel',
      linkPrimary: '#productos'
    }
  ];

  // --- INITIALIZATION ---
  useEffect(() => {
    // Load state from localStorage
    const savedCart = JSON.parse(localStorage.getItem('flordseul_cart') || '[]');
    const savedWishlist = JSON.parse(localStorage.getItem('flordseul_wishlist') || '[]');
    const savedTheme = localStorage.getItem('flordseul_theme') || 'light';
    
    setCart(savedCart);
    setWishlist(savedWishlist);
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Scroll listener
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);

    // Escape listener
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        setIsCheckoutOpen(false);
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Auto-slide
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);

    // Petals generation (Client-side only)
    setPetals([...Array(18)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 12 + 6}px`,
      height: `${Math.random() * 12 + 6}px`,
      animationDuration: `${Math.random() * 8 + 6}s`,
      animationDelay: `${Math.random() * 8}s`,
      opacity: Math.random() * 0.6 + 0.2
    })));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('flordseul_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('flordseul_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // --- ACTIONS ---
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('flordseul_theme', next);
  };

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3000);
  };

  const addToCart = (id) => {
    const product = productsData.find(p => p.id === id);
    if (!product) return;
    
    const existing = cart.find(c => c.id === id);
    if (existing && existing.qty >= product.stock) {
      showToast(`❌ Límite alcanzado (${product.stock} disp.)`);
      return;
    }
    
    setCart(prev => {
      const existingInPrev = prev.find(c => c.id === id);
      if (existingInPrev) {
        return prev.map(c => c.id === id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { id, qty: 1 }];
    });
    
    setIsCartOpen(true);
    showToast(`🌸 ¡${product.name} agregado al carrito!`);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(c => c.id !== id));
  };

  const changeQty = (id, delta) => {
    const product = productsData.find(p => p.id === id);
    
    setCart(prev => prev.map(c => {
      if (c.id === id) {
        const nextQty = c.qty + delta;
        if (product && nextQty > product.stock) {
          showToast(`❌ Límite alcanzado (${product.stock} disp.)`);
          return c;
        }
        return nextQty > 0 ? { ...c, qty: nextQty } : null;
      }
      return c;
    }).filter(Boolean));
  };

  const toggleWishlist = (e, id) => {
    e?.stopPropagation();
    if (wishlist.includes(id)) {
      setWishlist(prev => prev.filter(w => w !== id));
      showToast('💔 Eliminado de favoritos');
    } else {
      setWishlist(prev => [...prev, id]);
      showToast('❤️ Agregado a favoritos');
    }
  };

  const DISCOUNT = 0.9;

  const cartTotal = cart.reduce((sum, c) => {
    const p = productsData.find(pr => pr.id === c.id);
    return sum + (p ? p.price * DISCOUNT * c.qty : 0);
  }, 0);

  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  const filteredProducts = productsData.filter(p => {
    const matchBrand = currentBrand === 'todos' || p.brand === currentBrand;
    const matchCategory = currentCategory === 'all' || p.categories.includes(currentCategory);
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || 
      p.name.toLowerCase().includes(q) ||
      p.brandName.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q));
    return matchBrand && matchCategory && matchSearch;
  });

  // --- GROUPING & SORTING LOGIC ---
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    // 1. Prioridad por stock: Disponibles arriba, Agotados abajo
    if (a.stock && !b.stock) return -1;
    if (!a.stock && b.stock) return 1;
    
    // 2. Prioridad por precio si el filtro está activo
    if (sortByPrice === 'low-high') return a.price - b.price;
    if (sortByPrice === 'high-low') return b.price - a.price;
    
    return 0;
  });

  // La limitación de 8 productos solo aplica en la vista predeterminada inicial.
  // Si el usuario busca, filtra por marca/categoría o pulsa "Ver Todo", mostramos todo.
  const hasActiveFilter = searchQuery !== '' || currentBrand !== 'todos' || currentCategory !== 'all' || isShowingAll;
  const featuredProducts = hasActiveFilter ? sortedProducts : sortedProducts.filter(p => p.stock).slice(0, 8);

  const renderProduct = (p) => {
    const cartQty = cart.find(c => c.id === p.id)?.qty || 0;
    const isMaxReached = cartQty >= p.stock;
    const isDisabled = !p.stock || isMaxReached;

    return (
      <article key={p.id} className={`product-card ${!p.stock ? 'out-of-stock' : ''}`}>
        <div className="product-img-wrap" onClick={() => setSelectedProduct(p)}>
          <img src={p.img} alt={p.name} loading="lazy" />
          {!p.stock && (
            <div className="out-of-stock-overlay">
              <span>Agotado</span>
            </div>
          )}
        </div>
        <div className="product-info">
          <div className="product-meta">
            <span className="product-brand">{p.brandName}</span>
            {p.size && <span className="product-size">{p.size}</span>}
          </div>
          <h3 className="product-name" onClick={() => setSelectedProduct(p)}>{p.name}</h3>
          <p className="product-desc">{p.desc}</p>
          <div className="product-tags">
            {p.tags.slice(0, 3).map(t => <span key={t} className="product-tag">{t}</span>)}
          </div>
          <div className="product-footer">
            <div className="product-price-wrap">
              <span className="product-price-original">Q{p.price.toFixed(2)}</span>
              <span className="product-price sale">Q{(p.price * 0.9).toFixed(2)}</span>
              <span className="product-discount-badge">-10%</span>
            </div>
            <button 
              className={`add-to-cart-btn ${isDisabled ? 'disabled' : ''}`} 
              onClick={() => !isDisabled && addToCart(p.id)}
              disabled={isDisabled}
            >
              {!p.stock ? 'Agotado' : (isMaxReached ? 'Límite alcanzado' : '🛍 Agregar')}
            </button>
          </div>
        </div>
      </article>
    );
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    try {
      // Enviar el pedido al servidor central
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(c => ({ id: c.id, qty: c.qty }))
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setOrderNumber(result.orderNumber);
        setOrderSuccess(true);
        
        // Actualizar el stock localmente para que se refleje de inmediato sin recargar
        setProductsData(prev => prev.map(p => {
          const inCart = cart.find(c => c.id === p.id);
          if (inCart) {
            return { ...p, stock: Math.max(0, p.stock - inCart.qty) };
          }
          return p;
        }));
        
        setCart([]);
        showToast('🌸 ¡Pedido confirmado con éxito!');
      } else {
        showToast('❌ Error al procesar el pedido. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      showToast('❌ Error de conexión con el servidor.');
    }
  };


  // --- RENDER ---
  return (
    <main className={showIntro ? 'overflow-hidden' : ''}>
      {/* ============ PRELOADER INTRO ============ */}
      {showIntro && (
        <div className="intro-overlay">
          <div className="intro-pattern"></div>
          <div className="intro-content">
            <div className="intro-logo-wrap">
              <svg viewBox="0 0 24 24" className="intro-logo-svg">
                <defs>
                  <linearGradient id="intro-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f497ad" />
                    <stop offset="100%" stopColor="#b39cd0" />
                  </linearGradient>
                </defs>
                <g transform="translate(12, 12)">
                  {[0, 72, 144, 216, 288].map(deg => (
                    <path 
                      key={deg}
                      transform={`rotate(${deg})`}
                      fill="url(#intro-grad)"
                      d="M0,0 c-2.5-4.5-4.5-5.5-4.5-8.5 0-2 2.5-3 4.5-1 2-2 4.5-1 4.5 1 0 3-2 4-4.5 8.5z" 
                    />
                  ))}
                  <circle r="1" fill="white" fillOpacity="0.8" />
                </g>
              </svg>
            </div>
            <h1 className="intro-title">Flor de Seúl</h1>
            <div className="intro-line"></div>
            <p className="intro-subtitle">아름다운 피부를 위한 여정</p>
          </div>
          <div className="intro-petals">
            {introPetals.map((p, i) => (
              <div key={i} className="intro-petal" style={{
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration
              }}></div>
            ))}
          </div>
        </div>
      )}
      {/* ============ NAVBAR ============ */}
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" className="logo-svg">
                <defs>
                  <linearGradient id="sakura-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f497ad" />
                    <stop offset="100%" stopColor="#b39cd0" />
                  </linearGradient>
                </defs>
                <g transform="translate(12, 12)">
                  {[0, 72, 144, 216, 288].map(deg => (
                    <path 
                      key={deg}
                      transform={`rotate(${deg})`}
                      fill="url(#sakura-grad)"
                      d="M0,0 c-2.5-4.5-4.5-5.5-4.5-8.5 0-2 2.5-3 4.5-1 2-2 4.5-1 4.5 1 0 3-2 4-4.5 8.5z" 
                    />
                  ))}
                  <circle r="1.5" fill="white" fillOpacity="0.5" />
                </g>
              </svg>
            </div>
            <div className="logo-text">
              <span className="logo-main">Flor de Seúl</span>
              <span className="logo-sub">Skincare Coreano</span>
            </div>
          </div>

          <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <a href="#inicio" className="nav-link" onClick={() => setIsMenuOpen(false)}>Inicio</a>
            <a href="#marcas" className="nav-link" onClick={() => setIsMenuOpen(false)}>Marcas</a>
            <a href="#productos" className="nav-link" onClick={() => setIsMenuOpen(false)}>Productos</a>
            <a href="#nosotros" className="nav-link" onClick={() => setIsMenuOpen(false)}>Nosotros</a>
            <a href="#contacto" className="nav-link" onClick={() => setIsMenuOpen(false)}>Redes</a>
          </nav>

          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Cambiar tema">
              <span className="sun-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF9D00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              </span>
              <span className="moon-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </span>
            </button>
            
            <div className={`nav-search-wrap ${isSearchOpen ? 'open' : ''}`}>
              <input 
                type="text" 
                className="nav-search-input" 
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.length > 0) {
                    const el = document.getElementById('productos');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              />
              <button className="nav-search-btn" onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Buscar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>
            <button className="cart-btn" onClick={() => setIsCartOpen(true)} aria-label="Ver carrito">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span className="cart-count">{cartCount}</span>
            </button>
            <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menú">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      {/* ============ MOTHERS DAY BANNER ============ */}
      <div className="mothers-day-banner">
        <div className="mdb-petals">
          {['🌸','💐','🌷','✨','💖','🌸','💐','🌷','✨','💖','🌸','💐'].map((e, i) => (
            <span key={i} className="mdb-petal" style={{ animationDelay: `${i * 0.4}s` }}>{e}</span>
          ))}
        </div>
        <div className="mdb-content">
          <span className="mdb-eyebrow">✦ Especial de Mayo ✦</span>
          <h2 className="mdb-title">💐 Feliz Día de la Madre 💐</h2>
          <p className="mdb-sub">¡Celebra a mamá con el mejor skincare coreano! <strong>10% OFF</strong> en todos los productos</p>
          <a href="#productos" className="mdb-btn">Ver Ofertas 🎁</a>
        </div>
      </div>

      {/* ============ HERO ============ */}
      <section className="hero" id="inicio">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div 
              key={slide.id} 
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url('${slide.img}')` }}
            >
              <div className="hero-overlay"></div>
              <div className="hero-content">
                <span className="hero-badge">{slide.badge}</span>
                <h1 className="hero-title">{slide.title}</h1>
                <p className="hero-desc">{slide.desc}</p>
                <div className="hero-btns">
                  <a href={slide.linkPrimary} className="btn-primary">{slide.btnPrimary}</a>
                  {slide.btnGhost && <a href={slide.linkGhost} className="btn-ghost">{slide.btnGhost}</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="slider-btn slider-prev" onClick={() => setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)}>&#8592;</button>
        <button className="slider-btn slider-next" onClick={() => setCurrentSlide(prev => (prev + 1) % heroSlides.length)}>&#8594;</button>
        <div className="slider-dots">
          {heroSlides.map((_, i) => (
            <button key={i} className={`slider-dot ${i === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(i)}></button>
          ))}
        </div>
        <div className="petals-container">
          {petals.map((petal) => (
            <div key={petal.id} className="petal" style={{
              left: petal.left,
              width: petal.width,
              height: petal.height,
              animationDuration: petal.animationDuration,
              animationDelay: petal.animationDelay,
              opacity: petal.opacity
            }}></div>
          ))}
        </div>
      </section>

      {/* ============ ANNOUNCEMENT BAR ============ */}
      <div className="announcement-bar">
        <div className="announcement-track">
          <span>🌸 Envíos a toda Guatemala &nbsp;·&nbsp;</span>
          <span>✨ Productos 100% Auténticos &nbsp;·&nbsp; 정품 보장</span>
          <span>🇰🇷 Productos desde Corea</span>
          <span>💳 Pago Contra Entrega disponible</span>
          <span>🌸 Envíos a toda Guatemala &nbsp;·&nbsp; 무료배송</span>
          <span>✨ Productos 100% Auténticos &nbsp;·&nbsp;</span>
          <span>🇰🇷 Productos desde Corea</span>
          <span>💳 Pago Contra Entrega disponible</span>
        </div>
      </div>

      {/* ============ CATEGORÍAS ============ */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">피부 유형</span>
            <h2 className="section-title">Encuentra tu Rutina</h2>
            <p className="section-desc">Productos seleccionados según tu tipo y preocupación de piel</p>
          </div>
          <div className="categories-grid">
            {[
              { id: 'acne', icon: '🌿', title: 'Anti-Acné', desc: 'Piel con imperfecciones' },
              { id: 'hidratacion', icon: '💧', title: 'Hidratación', desc: 'Piel seca o deshidratada' },
              { id: 'manchas', icon: '✨', title: 'Anti-Manchas', desc: 'Unifica y aclara el tono' },
              { id: 'limpieza', icon: '🫧', title: 'Limpieza', desc: 'Doble limpieza coreana' },
              { id: 'solar', icon: '☀️', title: 'Protección Solar', desc: 'Escudo contra el sol' },
              { id: 'all', icon: '💫', title: 'Ver Todo', desc: 'Explorar catálogo completo' }
            ].map(cat => (
              <div 
                key={cat.id} 
                className={`category-card ${activeCategoryZoom === cat.id ? 'zoomed' : ''}`} 
                onClick={() => { 
                  setCurrentCategory(cat.id); 
                  if (cat.id === 'all') setIsShowingAll(true);
                  else setIsShowingAll(false);
                  document.getElementById('productos').scrollIntoView({ behavior: 'smooth' }); 
                }}
                onMouseDown={() => handlePressStart(cat.id)}
                onMouseUp={handlePressEnd}
                onMouseLeave={handlePressEnd}
                onTouchStart={() => handlePressStart(cat.id)}
                onTouchEnd={handlePressEnd}
              >
                <div className="cat-icon">{cat.icon}</div>
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MARCAS ============ */}
      <section className="brands-section" id="marcas">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">브랜드</span>
            <h2 className="section-title">Nuestras Marcas</h2>
            <p className="section-desc">Las marcas de K-Beauty más reconocidas del mundo</p>
          </div>

          <div className="brand-tabs">
            {['todos', 'anua', 'beautyofjoseon', 'mixsoon', 'roundlab', 'skin1004', 'sulwhasoo', 'tirtir'].map(brand => (
              <button 
                key={brand} 
                className={`brand-tab ${currentBrand === brand ? 'active' : ''}`}
                onClick={() => { setCurrentBrand(brand); document.getElementById('productos').scrollIntoView({ behavior: 'smooth' }); }}
              >
                {brand === 'todos' ? 'Todos' : brand.charAt(0).toUpperCase() + brand.slice(1).replace(/of/g, 'of ')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRODUCTOS ============ */}
      <section className="products-section" id="productos">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">제품</span>
            <h2 className="section-title">Nuestros Productos</h2>
            <p className="section-desc">Skincare coreano auténtico, entregado en tu puerta</p>
            
            <div className="sort-container">
              <label htmlFor="sort-price" className="sort-label">Ordenar por:</label>
              <select 
                id="sort-price" 
                className="sort-select" 
                value={sortByPrice} 
                onChange={(e) => setSortByPrice(e.target.value)}
              >
                <option value="default">Relevancia</option>
                <option value="low-high">Precio: Menor a Mayor</option>
                <option value="high-low">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>


          <div className="products-grid">
            {featuredProducts.map(p => renderProduct(p))}
          </div>

          {featuredProducts.length === 0 && (
            <div className="no-results">
              <p>🌸 No se encontraron productos. Intenta otra búsqueda.</p>
            </div>
          )}
        </div>
      </section>

      {/* ============ COLECCIÓN / COLLAGE ============ */}
      <section className="collage-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">컬렉션</span>
            <h2 className="section-title">Nuestra Colección</h2>
          </div>
          <div className="collage-grid">
            <div className="collage-item large">
              <img src="/assets/images/collage/an.jpeg" alt="Anua Collection" loading="lazy" />
              <div className="collage-overlay"><span>Anua</span></div>
            </div>
            <div className="collage-item">
              <img src="/assets/images/collage/boj.jpeg" alt="Beauty of Joseon" loading="lazy" />
              <div className="collage-overlay"><span>Beauty of Joseon</span></div>
            </div>
            <div className="collage-item">
              <img src="/assets/images/collage/mix.jpeg" alt="Mixsoon" loading="lazy" />
              <div className="collage-overlay"><span>Mixsoon</span></div>
            </div>
            <div className="collage-item">
              <img src="/assets/images/collage/tirtirb.webp" alt="TirTir" loading="lazy" />
              <div className="collage-overlay"><span>TirTir</span></div>
            </div>
            <div className="collage-item large">
              <img src="/assets/images/collage/sk.jpeg" alt="Skin1004" loading="lazy" />
              <div className="collage-overlay"><span>Skin1004</span></div>
            </div>
            <div className="collage-item">
              <img src="/assets/images/collage/sul.jpeg" alt="Sulwhasoo" loading="lazy" />
              <div className="collage-overlay"><span>Sulwhasoo</span></div>
            </div>
            <div className="collage-item">
              <img src="/assets/images/collage/roundlabb.webp" alt="Round Lab" loading="lazy" />
              <div className="collage-overlay"><span>Round Lab</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ NOSOTROS ============ */}
      <section className="about-section" id="nosotros">
        <div className="container">
          <div className="about-grid">
            <div className="about-visual">
              <div className="about-img-wrap">
                <img src="/assets/images/logos/fk.png" alt="Flor de Seúl GT" />
              </div>
              <div className="about-korean-deco">
                <span>진정한 아름다움</span>
                <small>Verdadera Belleza</small>
              </div>
            </div>
            <div className="about-content">
              <span className="section-tag">우리에 대해</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>¿Quiénes Somos?</h2>
              <p>Somos <strong>Flor de Seúl GT</strong>, la tienda guatemalteca especializada en skincare coreano auténtico. Nuestra misión es acercar lo mejor de K-Beauty a Guatemala, con productos verificados y de las marcas más reconocidas del mundo.</p>
              <p>Creemos que cada persona merece una rutina de cuidado de piel efectiva y accesible. Por eso importamos directamente desde Corea del Sur, garantizando la autenticidad de cada producto.</p>
              <div className="about-stats">
                <div className="stat">
                  <span className="stat-num">8+</span>
                  <span className="stat-label">Marcas Coreanas</span>
                </div>
                <div className="stat">
                  <span className="stat-num">100%</span>
                  <span className="stat-label">Auténticos</span>
                </div>
              </div>
              <div className="about-badges">
                <span className="badge">✓ Importación Directa</span>
                <span className="badge">✓ Asesoría Personalizada</span>
                <span className="badge">✓ Entrega a Domicilio</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ POR QUÉ ELEGIRNOS ============ */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">왜 우리를 선택해야 할까요</span>
            <h2 className="section-title">¿Por qué Flor de Seúl?</h2>
          </div>
          <div className="features-grid">
            {[
              { icon: '🌸', title: 'Productos Auténticos', desc: 'Importamos directamente desde Corea del Sur. Cero imitaciones, 100% garantizados.' },
              { icon: '🚚', title: 'Envío Rápido', desc: 'Entregamos en toda Guatemala. Recibe tu skincare directamente en tu hogar.' },
              { icon: '💬', title: 'Asesoría Personalizada', desc: 'Te orientamos sobre qué productos son mejores para tu tipo de piel.' },
              { icon: '💳', title: 'Pago Flexible', desc: 'Aceptamos pago contra entrega y transferencia bancaria. Fácil y seguro.' }
            ].map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACTO ============ */}
      <section className="contact-section" id="contacto">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">소셜 미디어</span>
            <h2 className="section-title">Redes Sociales</h2>
            <p className="section-desc">Síguenos y contáctanos para encontrar el skincare perfecto</p>
          </div>
          <div className="contact-grid" style={{ display: 'flex', justifyContent: 'center', gap: '40px', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="contact-info" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '28px', width: '100%' }}>
              <div className="contact-item tiktok">
                <span className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.43-.17-.11-.34-.23-.5-.35-.02 3.11-.01 6.22-.03 9.33-.06 2.09-.76 4.14-2.18 5.67-1.74 1.88-4.32 2.81-6.87 2.49-2.58-.33-4.88-2.12-5.77-4.57-1-2.73-.25-5.9 1.93-7.85 1.51-1.35 3.52-1.95 5.51-1.63v4.13c-1.3-.24-2.73.08-3.66 1.05-.85.89-1.07 2.27-.55 3.39.52 1.11 1.7 1.87 2.92 1.87 1.15-.02 2.18-.8 2.61-1.86.19-.47.24-.98.24-1.48-.01-3.64-.01-7.29-.01-10.93-.01-1.36-.01-2.73-.01-4.09z"/>
                  </svg>
                </span>
                <div>
                  <h4>TikTok</h4>
                  <a href="https://www.tiktok.com/@flor.de.seul.gt" target="_blank" rel="noopener">@flor.de.seul.gt</a>
                </div>
              </div>
              <div className="contact-item instagram">
                <span className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </span>
                <div>
                  <h4>Instagram</h4>
                  <a href="https://www.instagram.com/flordeseul_gt" target="_blank" rel="noopener">@flordeseul_gt</a>
                </div>
              </div>
              <div className="contact-item facebook">
                <span className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </span>
                <div>
                  <h4>Facebook</h4>
                  <a href="https://www.facebook.com/people/Flor-De-Seúl-Gt/61577355537632/" target="_blank" rel="noopener">Flor De Seúl Gt</a>
                </div>
              </div>
              <div className="contact-item location">
                <span className="contact-icon">📍</span>
                <div>
                  <h4>Ubicación</h4>
                  <p>Guatemala 🇬🇹</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER (y resto de secciones) ============ */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', textAlign: 'center', alignItems: 'start' }}>
            <div className="footer-brand" style={{ margin: '0 auto' }}>
              <div className="nav-logo" style={{ justifyContent: 'center', marginBottom: '12px' }}>
                <div className="logo-icon">
                  <svg viewBox="0 0 24 24" className="logo-svg">
                    <defs>
                      <linearGradient id="sakura-grad-footer" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f497ad" />
                        <stop offset="100%" stopColor="#b39cd0" />
                      </linearGradient>
                    </defs>
                    <g transform="translate(12, 12)">
                      {[0, 72, 144, 216, 288].map(deg => (
                        <path 
                          key={deg}
                          transform={`rotate(${deg})`}
                          fill="url(#sakura-grad-footer)"
                          d="M0,0 c-2.5-4.5-4.5-5.5-4.5-8.5 0-2 2.5-3 4.5-1 2-2 4.5-1 4.5 1 0 3-2 4-4.5 8.5z" 
                        />
                      ))}
                    </g>
                  </svg>
                </div>
                <div className="logo-text">
                  <span className="logo-main">Flor de Seúl</span>
                </div>
              </div>
              <h4 style={{ color: 'var(--accent-rose)', fontSize: '1rem', marginBottom: '8px' }}>Acerca de Nosotros</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Copyright © Flor de Seúl Gt</p>
            </div>

            <div className="footer-links">
              <h4>Horarios</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '600', marginBottom: '4px' }}>8 AM a 10 PM</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Lunes a Domingo</p>
            </div>
            
            <div className="footer-links">
              <h4>Información Legal</h4>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setIsPrivacyOpen(true); }}>Políticas de Privacidad</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setIsTermsOpen(true); }}>Términos y Condiciones</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '15px', padding: '40px 0', width: '100%', borderTop: '1px solid var(--footer-border)' }}>
            <p className="designer-credit" style={{ fontSize: '1rem', margin: 0, color: 'var(--text-primary)', fontWeight: '500' }}>
              Esta página fue hecha por <a href="https://lienzoblanco.online/" target="_blank" rel="noopener" className="rainbow-text" style={{ fontSize: '1.1rem' }}>© Lienzo Blanco</a>.
            </p>
            <p className="footer-korean" style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.8rem' }}>아름다운 피부를 위한 최고의 선택</p>
          </div>
        </div>
      </footer>

      {/* ============ MODALS & OVERLAYS ============ */}
      {/* Cart Drawer */}
      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}></div>
      <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Mi Carrito 🛍️</h3>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>✕</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <span>🌸</span>
              <p>Tu carrito está vacío</p>
              <small>Agrega productos para comenzar</small>
            </div>
          ) : (
            cart.map(c => {
              const p = productsData.find(pr => pr.id === c.id);
              if (!p) return null;
              return (
                <div key={c.id} className="cart-item">
                  <div className="cart-item-img"><img src={p.img} alt={p.name} /></div>
                  <div>
                    <div className="cart-item-brand">{p.brandName}</div>
                    <div className="cart-item-name">{p.name}</div>
                    <div className="cart-item-controls">
                      <button className="qty-btn" onClick={() => changeQty(c.id, -1)}>−</button>
                      <span className="qty-num">{c.qty}</span>
                      <button className="qty-btn" onClick={() => changeQty(c.id, 1)}>+</button>
                      <button className="remove-item" onClick={() => removeFromCart(c.id)} aria-label="Eliminar producto">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                          <path d="M10 11v6M14 11v6"/>
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-price">
                    <span style={{ fontSize: '0.75rem', textDecoration: 'line-through', color: 'var(--text-muted)', opacity: 0.7 }}>Q{(p.price * c.qty).toFixed(2)}</span>
                    <span style={{ display: 'block', color: '#3aaa35', fontWeight: 700 }}>Q{(p.price * DISCOUNT * c.qty).toFixed(2)}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <strong>Q{cartTotal.toFixed(2)}</strong>
            </div>
            <button className="btn-primary full-width" onClick={() => { 
              triggerConfetti();
              setTimeout(() => {
                setIsCartOpen(false); 
                setIsCheckoutOpen(true); 
              }, 600);
            }}>
              Proceder al Pago 🌸
            </button>
          </div>
        )}
      </aside>

      {/* Checkout Modal */}
      <div className={`modal-overlay ${isCheckoutOpen ? 'open' : ''}`} onClick={() => { setIsCheckoutOpen(false); setOrderSuccess(false); if(orderSuccess) setOrderNumber(n => n + 1); }}></div>
      <div className={`checkout-modal ${isCheckoutOpen ? 'open' : ''}`}>
        <button className="close-modal" onClick={() => { setIsCheckoutOpen(false); setOrderSuccess(false); if(orderSuccess) setOrderNumber(n => n + 1); }}>✕</button>
        <div className="checkout-content">
          {orderSuccess ? (
            <div className="order-success-screen">
              <div className="success-icon">🌸</div>
              <h2 className="thanks-kr">구매해 주셔서 감사합니다!</h2>
              <h1 className="success-title">¡Gracias por tu compra!</h1>
              <p className="success-subtitle">Tu pedido ha sido recibido y está siendo procesado.</p>
              
              <div className="order-info-card">
                <span className="order-label">Número de Orden:</span>
                <span className="order-value">#0000{orderNumber}</span>
              </div>
              
              <p className="thanks-footer">Que tengas un excelente día · 좋은 하루 되세요</p>
              
              <button className="btn-primary full-width" style={{ marginTop: '30px' }} onClick={() => { setIsCheckoutOpen(false); setOrderSuccess(false); setOrderNumber(n => n + 1); }}>
                Cerrar y volver a la tienda
              </button>
            </div>
          ) : (
            <>
              <h2 className="checkout-title">🌸 Finalizar Pedido</h2>
              <div className="checkout-grid">
                <form className="checkout-form" id="checkout-form" onSubmit={handlePlaceOrder}>
                  <h3 style={{ marginBottom: '15px', color: 'var(--accent-rose)' }}>Información de Envío</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Introduce tus datos para completar la compra.</p>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nombre</label>
                      <input type="text" name="nombre" placeholder="Tu nombre" required />
                    </div>
                    <div className="form-group">
                      <label>Apellido</label>
                      <input type="text" name="apellido" placeholder="Tu apellido" required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Correo Electrónico</label>
                      <input type="email" name="email" placeholder="tu@correo.com (Opcional)" />
                    </div>
                    <div className="form-group">
                      <label>Número de Teléfono</label>
                      <input type="tel" name="tel" placeholder="Ej: 12345678" required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Dirección Exacta</label>
                    <input type="text" name="direccion" placeholder="Ej: Calle, avenida, no. de casa, etc." required />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Municipio</label>
                      <input type="text" name="municipio" placeholder="Tu municipio" required />
                    </div>
                    <div className="form-group">
                      <label>Departamento</label>
                      <input type="text" name="departamento" placeholder="Tu departamento" required />
                    </div>
                  </div>

                  <div className="form-thanks-msg">
                    <p className="thanks-kr">구매해 주셔서 감사합니다. 좋은 하루 되세요!</p>
                    <p className="thanks-es">¡GRACIAS POR TU COMPRA, QUE TENGAS UN EXCELENTE DÍA!</p>
                  </div>
                </form>

                <div className="checkout-sidebar">
                  <div className="checkout-summary">
                    <h3>Resumen del Pedido</h3>
                    <div className="summary-items">
                      {cart.map(c => {
                        const p = productsData.find(pr => pr.id === c.id);
                        if (!p) return null;
                        return (
                          <div key={c.id} className="summary-item">
                            <img src={p.img} alt={p.name} />
                            <div className="summary-item-info">
                              <div className="summary-item-name">{p.name}</div>
                              <div className="summary-item-qty">x{c.qty} · {p.brandName}</div>
                            </div>
                            <div className="summary-item-price">
                              <span style={{ fontSize: '0.72rem', textDecoration: 'line-through', color: 'var(--text-muted)', opacity: 0.7, display: 'block' }}>Q{(p.price * c.qty).toFixed(2)}</span>
                              <span style={{ color: '#3aaa35', fontWeight: 700 }}>Q{(p.price * DISCOUNT * c.qty).toFixed(2)}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="summary-totals">
                      <div className="summary-row">
                        <span>Subtotal</span>
                        <span>Q{cartTotal.toFixed(2)}</span>
                      </div>
                      {paymentMethod === 'entrega' && (
                        <div className="summary-row commission">
                          <span>Comisión Contra Entrega (4%)</span>
                          <span>Q{(cartTotal * 0.04).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="summary-row shipping">
                        <span>Envío</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Calculado al confirmar</span>
                      </div>
                      <div className="summary-row total">
                        <span>Total Final</span>
                        <strong>Q{(cartTotal + (paymentMethod === 'entrega' ? cartTotal * 0.04 : 0)).toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="payment-sidebar-section">
                    <h3 style={{ margin: '20px 0 15px', color: 'var(--accent-rose)', fontSize: '1.1rem' }}>Método de Pago</h3>
                    <div className="payment-options vertical">
                      <label className={`payment-option ${paymentMethod === 'deposito' ? 'active' : ''}`}>
                        <input type="radio" name="pago-sidebar" value="deposito" checked={paymentMethod === 'deposito'} onChange={() => setPaymentMethod('deposito')} />
                        <div className="payment-card">
                          <span>🏦</span>
                          <div>
                            <strong>Previo Depósito</strong>
                            <small>Transferencia o depósito</small>
                          </div>
                        </div>
                      </label>
                      <label className={`payment-option ${paymentMethod === 'entrega' ? 'active' : ''}`}>
                        <input type="radio" name="pago-sidebar" value="entrega" checked={paymentMethod === 'entrega'} onChange={() => setPaymentMethod('entrega')} />
                        <div className="payment-card">
                          <span>🚚</span>
                          <div>
                            <strong>Pago Contra Entrega</strong>
                            <small>+4% Comisión</small>
                          </div>
                        </div>
                      </label>
                    </div>

                    <div className="payment-info-box sidebar-style">
                      {paymentMethod === 'entrega' ? (
                        <div className="info-item">
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            <strong>Nota sobre el envío:</strong> El envio dependera de su ubicacion
                          </p>
                          <p style={{ fontSize: '0.8rem', marginTop: '8px', color: 'var(--text-primary)', background: 'var(--bg-secondary)', padding: '8px', borderRadius: '6px' }}>
                            Pagarás el monto total en efectivo al momento de recibir tu paquete.
                          </p>
                        </div>
                      ) : (
                        <div className="info-item">
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            <strong>Nota sobre el envío:</strong> El envio dependera de su ubicacion
                          </p>
                          <p style={{ fontSize: '0.8rem', marginTop: '8px', color: 'var(--accent-rose-dark)', fontWeight: '500' }}>
                            Envíanos el comprobante a nuestras redes sociales para confirmar tu pedido.
                          </p>
                        </div>
                      )}
                    </div>

                    <button type="submit" form="checkout-form" className="btn-primary full-width" style={{ marginTop: '20px', height: '55px', fontSize: '1.1rem' }}>
                      Confirmar Pedido Q{(cartTotal + (paymentMethod === 'entrega' ? cartTotal * 0.04 : 0)).toFixed(2)} 🌸
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <>
          <div className="modal-overlay open" onClick={() => setSelectedProduct(null)}></div>
          <div className="product-modal open">
            <button className="close-modal" onClick={() => setSelectedProduct(null)}>✕</button>
            <div className="product-modal-content">
              <div className="product-modal-img">
                <img src={selectedProduct.img} alt={selectedProduct.nameLong} />
              </div>
              <div className="product-modal-info">
                <div className="product-modal-brand">{selectedProduct.brandName} · K-Beauty</div>
                <h2 className="product-modal-title">{selectedProduct.nameLong}</h2>
                <p className="product-modal-desc">{selectedProduct.desc}</p>
                <div className="product-tags">
                  {(selectedProduct.benefits || selectedProduct.tags).map(b => (
                    <span key={b} className="product-tag">✓ {b}</span>
                  ))}
                </div>
                <div className="product-modal-price-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '1rem', textDecoration: 'line-through', color: 'var(--text-muted)', opacity: 0.7 }}>Q{selectedProduct.price.toFixed(2)}</span>
                    <div className="product-modal-price" style={{ color: '#e8597d' }}>Q{(selectedProduct.price * DISCOUNT).toFixed(2)}</div>
                    <span className="product-discount-badge">-10%</span>
                  </div>
                  {selectedProduct.size && <div className="product-modal-size">Contenido: {selectedProduct.size}</div>}
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button 
                    className={`btn-primary ${(!selectedProduct.stock || (cart.find(c => c.id === selectedProduct.id)?.qty >= selectedProduct.stock)) ? 'disabled' : ''}`} 
                    onClick={() => { 
                      if (selectedProduct.stock && (cart.find(c => c.id === selectedProduct.id)?.qty || 0) < selectedProduct.stock) {
                        addToCart(selectedProduct.id); 
                        setSelectedProduct(null); 
                      }
                    }} 
                    style={{ flex: 1, minWidth: '160px' }}
                    disabled={!selectedProduct.stock || (cart.find(c => c.id === selectedProduct.id)?.qty >= selectedProduct.stock)}
                  >
                    {!selectedProduct.stock ? '❌ Agotado' : ((cart.find(c => c.id === selectedProduct.id)?.qty >= selectedProduct.stock) ? 'Límite alcanzado' : '🛍 Agregar')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Privacy Policy Modal */}
      <div className={`modal-overlay ${isPrivacyOpen ? 'open' : ''}`} onClick={() => setIsPrivacyOpen(false)}></div>
      <div className={`checkout-modal info-modal ${isPrivacyOpen ? 'open' : ''}`}>
        <button className="close-modal" onClick={() => setIsPrivacyOpen(false)}>✕</button>
        <div className="checkout-content">
          <h2 className="checkout-title">🔒 Política de Privacidad</h2>
          <div className="info-text">
            <p>En <strong>Flor de Seúl</strong>, valoramos tu privacidad. Los datos recolectados (nombre, teléfono, dirección) son utilizados exclusivamente para:</p>
            <ul>
              <li>Procesar y entregar tus pedidos de manera eficiente.</li>
              <li>Brindarte asesoría personalizada vía WhatsApp o Instagram.</li>
              <li>Mantenerte informado sobre nuestras promociones (solo si lo autorizas).</li>
            </ul>
            <p>Tus datos están protegidos y nunca serán compartidos con terceros sin tu consentimiento expreso, cumpliendo con las normativas vigentes en Guatemala.</p>
          </div>
          <button className="btn-primary full-width" onClick={() => setIsPrivacyOpen(false)} style={{ marginTop: '20px' }}>Entendido 🌸</button>
        </div>
      </div>

      {/* Terms & Conditions Modal */}
      <div className={`modal-overlay ${isTermsOpen ? 'open' : ''}`} onClick={() => setIsTermsOpen(false)}></div>
      <div className={`checkout-modal info-modal ${isTermsOpen ? 'open' : ''}`}>
        <button className="close-modal" onClick={() => setIsTermsOpen(false)}>✕</button>
        <div className="checkout-content">
          <h2 className="checkout-title">📜 Términos y Condiciones</h2>
          <div className="info-text">
            <h3>1. Envíos y Entregas</h3>
            <p>Realizamos envíos a toda Guatemala. Los tiempos de entrega varían según la ubicación (usualmente de 24 a 48 horas hábiles).</p>
            
            <h3>2. Métodos de Pago</h3>
            <p>Aceptamos depósito bancario previo y pago contra entrega (sujeto a cobertura).</p>

            <div className="policy-alert">
              <h3>⚠️ Política de Devoluciones</h3>
              <p>Debido a la naturaleza de los productos de cuidado personal y por estrictos motivos de higiene y seguridad de nuestros clientes, <strong>NO SE ACEPTAN DEVOLUCIONES</strong> ni cambios una vez que el producto ha sido entregado y aceptado.</p>
              <p>Sugerimos revisar bien su pedido al momento de recibirlo.</p>
            </div>

            <h3>3. Garantía</h3>
            <p>Solo se cubrirán garantías por defectos de fábrica evidentes al momento de la entrega.</p>
          </div>
          <button className="btn-primary full-width" onClick={() => setIsTermsOpen(false)} style={{ marginTop: '20px' }}>Acepto los términos 🌸</button>
        </div>
      </div>

      {/* Toast */}
      <div className={`toast ${toast.show ? 'show' : ''}`}>{toast.msg}</div>

      {/* Back to top */}
      <button className={`back-to-top ${scrolled ? 'visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
    </main>
  );
}
