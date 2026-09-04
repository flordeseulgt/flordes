"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '../lib/supabase';
import { PRODUCTS } from '../data/products';

const collectionBrands = [
  { id: 'anua', name: 'Anua', img: '/assets/images/collage/an.jpeg', desc: 'Cuidado natural, honesto y minimalista' },
  { id: 'beautyofjoseon', name: 'Beauty of Joseon', img: '/assets/images/collage/boj.jpeg', desc: 'Hanbang: medicina tradicional coreana' },
  { id: 'mixsoon', name: 'Mixsoon', img: '/assets/images/collage/mix.jpeg', desc: 'Ingredientes puros en alta concentración' },
  { id: 'tirtir', name: 'Tirtir', img: '/assets/images/collage/tirtirb.webp', desc: 'Piel de porcelana y brillo cristalino' },
  { id: 'skin1004', name: 'Skin1004', img: '/assets/images/collage/sk.jpeg', desc: 'Especialistas en Centella de Madagascar' },
  { id: 'sulwhasoo', name: 'Sulwhasoo', img: '/assets/images/collage/sul.jpeg', desc: 'Skincare de lujo coreano premium' },
  { id: 'roundlab', name: 'Round Lab', img: '/assets/images/collage/roundlabb.webp', desc: 'Hidratación limpia con ingredientes puros' }
];

export default function Home() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const play = () => { audio.play().catch(() => {}); document.removeEventListener('click', play); };
    audio.play().catch(() => document.addEventListener('click', play, { once: true }));
  }, []);
  // --- STATE ---
  const [cart, setCart] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [currentBrand, setCurrentBrand] = useState('todos');
  const [currentCategory, setCurrentCategory] = useState('all');
  const [isShowingAll, setIsShowingAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('light');
  const [isRotating, setIsRotating] = useState(false);
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
  const searchInputRef = useRef(null);
  const collectionCarouselRef = useRef(null);

  const scrollCollection = (direction) => {
    if (collectionCarouselRef.current) {
      const { scrollLeft, clientWidth } = collectionCarouselRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      collectionCarouselRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

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
    const colors = ['#ff75a0', '#b39cd0', '#e8597d', '#FFD700', '#00F5FF', '#FF6B6B', '#4ECDC4', '#FFE66D', '#FF922B'];
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
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 650);
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

  const DISCOUNT = 1.0;

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

  // La limitación de 9 productos solo aplica en la vista predeterminada inicial.
  // Si el usuario busca, filtra por marca/categoría o pulsa "Ver Todo", mostramos todo.
  const hasActiveFilter = searchQuery !== '' || currentBrand !== 'todos' || currentCategory !== 'all' || isShowingAll;
  const featuredProducts = hasActiveFilter ? sortedProducts : sortedProducts.filter(p => p.stock).slice(0, 9);

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
            <span className={`product-brand brand-${p.brand}`}>{p.brandName}</span>
            {p.size && <span className="product-size">{p.size}</span>}
          </div>
          <h3 className="product-name" onClick={() => setSelectedProduct(p)}>{p.name}</h3>
          <p className="product-desc">{p.desc}</p>
          <div className="product-footer">
            <div className="product-price-wrap">
              <span className="product-price">Q{p.price.toFixed(2)}</span>
            </div>
            <button 
              className={`add-to-cart-btn ${isDisabled ? 'disabled' : ''}`} 
              onClick={() => !isDisabled && addToCart(p.id)}
              disabled={isDisabled}
            >
              {!p.stock ? 'Agotado' : (isMaxReached ? 'Límite alcanzado' : <><span className="cart-icon">🛍</span> Agregar</>)}
            </button>
          </div>
        </div>
      </article>
    );
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const customer = {
      nombre: formData.get('nombre'),
      apellido: formData.get('apellido'),
      email: formData.get('email'),
      tel: formData.get('tel'),
      direccion: formData.get('direccion'),
      municipio: formData.get('municipio'),
      departamento: formData.get('departamento'),
    };
    
    try {
      // Enviar el pedido al servidor central
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(c => ({ id: c.id, qty: c.qty })),
          customer,
          paymentMethod
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


  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
    if (!audio.muted) audio.play().catch(() => {});
  };

  // --- RENDER ---
  return (
    <main className={showIntro ? 'overflow-hidden' : ''}>
      <audio ref={audioRef} src="/Sparkle (Instrumental Only).mp3" loop playsInline />
      <button className="audio-toggle" onClick={toggleMute} aria-label={muted ? 'Activar sonido' : 'Silenciar'}>
        {muted ? '🔇' : '🔊'}
      </button>
      <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
        Flor de Seúl | Tienda de Skincare Coreano en Guatemala
      </h1>
      {/* ============ PRELOADER INTRO ============ */}
      {showIntro && (
        <div className="intro-overlay">
          <div className="intro-pattern"></div>
          <div className="intro-content">
            <div className="intro-logo-wrap">
              <svg viewBox="0 0 24 24" className="intro-logo-svg">
                <defs>
                  <linearGradient id="intro-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff75a0" />
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
            <h2 className="intro-title">Flor de Seúl</h2>
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
      {/* ============ NAVBAR ============ */}
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#inicio" className="nav-logo">
            <span className="logo-main">FLOR DE SEÚL</span>
          </a>

          <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <a href="#inicio" className="nav-link" onClick={() => setIsMenuOpen(false)}>Inicio</a>
            <a href="#productos" className="nav-link" onClick={() => setIsMenuOpen(false)}>Productos</a>
            <a href="#nosotros" className="nav-link" onClick={() => setIsMenuOpen(false)}>Nosotros</a>
            <a href="#contacto" className="nav-link" onClick={() => setIsMenuOpen(false)}>Redes</a>
          </nav>

          <div className="nav-actions">
            <button className={`theme-toggle ${isRotating ? 'is-rotating' : ''}`} onClick={toggleTheme} aria-label="Cambiar tema" title="Cambiar tema">
              <span className="sun-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFA726" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sun-svg-animated">
                  <circle cx="12" cy="12" r="5" fill="#FFB74D" fillOpacity="0.3"></circle>
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
                ref={searchInputRef}
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
            <a href="#productos" className="nav-pill-btn">Explorar</a>
          </div>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="hero" id="inicio">
        <div className="hero-inner">
          <div className="hero-luxury-tag">
            <span className="kr-pill-stamp">🇰🇷 서울</span>
            <span className="tag-divider">✦</span>
            <span>Auténtico K-Beauty · Skincare Coreano</span>
          </div>
          <h2 className="hero-luxury-title">
            Tu Ritual de Belleza<br/>Directo desde Corea
          </h2>
          <p className="hero-luxury-desc">
            Descubre las fórmulas más galardonadas de Seúl elaboradas con botánicos puros y alta ciencia dermatológica. Encuentra tu rutina ideal — el secreto de una piel que cautiva.
          </p>
          <div className="hero-luxury-actions">
            <a href="#productos" className="btn-luxury-primary">
              <span>Explorar Colección</span>
              <span className="btn-arrow-icon" aria-hidden="true">→</span>
            </a>
            <a href="#nosotros" className="btn-luxury-secondary">
              <span className="btn-seal-stamp">우리</span>
              <span>Nuestro Ritual</span>
            </a>
          </div>
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
                className={`category-card cat-${cat.id} ${activeCategoryZoom === cat.id ? 'zoomed' : ''}`} 
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

      {/* ============ PRODUCTOS ============ */}
      <section className="products-section" id="productos">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">제품</span>
            <h2 className="section-title">Nuestros Productos</h2>
            <p className="section-desc">Skincare coreano auténtico, entregado en tu puerta</p>
            
            <div className="brand-tabs" style={{ marginTop: '28px', marginBottom: '8px' }}>
              {['todos', 'anua', 'beautyofjoseon', 'mixsoon', 'roundlab', 'skin1004', 'sulwhasoo', 'tirtir', 'blab', 'mary'].map(brand => (
                <button 
                  key={brand} 
                  className={`brand-tab ${currentBrand === brand ? 'active' : ''}`}
                  onClick={() => setCurrentBrand(brand)}
                >
                  {brand === 'todos' ? 'Todos' : 
                   brand === 'beautyofjoseon' ? 'Beauty of Joseon' :
                   brand === 'blab' ? 'B:Lab' :
                   brand === 'mary' ? 'Mary & May' :
                   brand.charAt(0).toUpperCase() + brand.slice(1)}
                </button>
              ))}
            </div>

            <div className="sort-container" style={{ marginTop: '20px' }}>
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

      {/* ============ COLECCIÓN / CAROUSEL ============ */}
      <section className="collection-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">컬렉션</span>
            <h2 className="section-title">Nuestra Colección</h2>
          </div>
          
          <div className="collection-carousel-container">
            <button 
              className="collection-nav-btn prev" 
              onClick={() => scrollCollection('left')} 
              aria-label="Colección anterior"
            >
              &#8592;
            </button>
            
            <div className="collection-viewport" ref={collectionCarouselRef}>
              {collectionBrands.map((item) => (
                <div 
                  key={item.id} 
                  className="collection-card"
                  onClick={() => {
                    setCurrentBrand(item.id);
                    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <img src={item.img} alt={`${item.name} Collection`} loading="lazy" />
                  <div className="collection-overlay">
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                    <span className="collection-overlay-btn">Explorar Marca</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              className="collection-nav-btn next" 
              onClick={() => scrollCollection('right')} 
              aria-label="Siguiente colección"
            >
              &#8594;
            </button>
          </div>
        </div>
      </section>

      {/* ============ NOSOTROS ============ */}
      <section className="about-section" id="nosotros">
        <div className="container">
          <div className="about-grid">
            <div className="about-visual">
              <div className="about-img-wrap">
                <img src="/assets/images/logos/fk.png?v=2" alt="Flor de Seúl GT" />
              </div>
              <div className="about-korean-deco">
                <span>진정한 아름다움</span>
                <small>Verdadera Belleza</small>
              </div>
            </div>
            <div className="about-content">
              <span className="section-tag">우리에 대해</span>
              <h2 className="section-title">¿Quiénes Somos?</h2>
              <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                Somos <strong>Flor de Seúl GT</strong>, la tienda guatemalteca especializada en skincare coreano auténtico. Nuestra misión es acercar lo mejor de K-Beauty a Guatemala, con productos verificados y de las marcas más reconocidas del mundo.
              </p>
              <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                Creemos que cada persona merece una rutina de cuidado de piel efectiva y accesible. Por eso importamos directamente desde Corea del Sur, garantizando la autenticidad de cada producto.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <span className="stat-num">7+</span>
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
                <div className="feature-icon-wrapper">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
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
                        <stop offset="0%" stopColor="#ff75a0" />
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
              <h4 className="footer-highlight-link">Acerca de Nosotros</h4>
              <p className="footer-copy-text">Copyright © Flor de Seúl Gt</p>
            </div>

            <div className="footer-links">
              <h4>Horarios</h4>
              <p className="footer-bold-info">8 AM a 10 PM</p>
              <p className="footer-sub-info">Lunes a Domingo</p>
            </div>
            
            <div className="footer-links">
              <h4>Información Legal</h4>
              <ul className="footer-links-clean">
                <li><a href="#" onClick={(e) => { e.preventDefault(); setIsPrivacyOpen(true); }}>Políticas de Privacidad</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setIsTermsOpen(true); }}>Términos y Condiciones</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <p className="designer-credit">
              Esta página fue hecha por <a href="https://lienzoblanco.online/" target="_blank" rel="noopener" className="credit-multicolor">© Lienzo Blanco</a>.
            </p>
            <p className="footer-korean">아름다운 피부를 위한 최고의 선택</p>
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
                    {DISCOUNT < 1 ? (
                      <>
                        <span style={{ fontSize: '0.75rem', textDecoration: 'line-through', color: 'var(--text-muted)', opacity: 0.7, display: 'block' }}>Q{(p.price * c.qty).toFixed(2)}</span>
                        <span style={{ display: 'block', color: '#3aaa35', fontWeight: 700 }}>Q{(p.price * DISCOUNT * c.qty).toFixed(2)}</span>
                      </>
                    ) : (
                      <span>Q{(p.price * c.qty).toFixed(2)}</span>
                    )}
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
              <h2 className="success-title">¡Gracias por tu compra!</h2>
              <p className="success-subtitle">Tu pedido ha sido recibido y está siendo procesado.</p>
              
              <div className="order-info-card">
                <span className="order-label">Número de Orden:</span>
                <span className="order-value">#0000{orderNumber}</span>
              </div>
              
              {paymentMethod === 'deposito' && (
                <div style={{ backgroundColor: '#1a0a0f', padding: '12px', borderRadius: '10px', marginTop: '15px', marginBottom: '15px', border: '1px solid #00F5FF' }}>
                  <p style={{ color: '#00F5FF', fontSize: '0.85rem', textAlign: 'center', fontWeight: 'bold', margin: 0 }}>
                    📸 Por favor, tómale una captura de pantalla a tu número de orden.
                  </p>
                </div>
              )}
              
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
                              {DISCOUNT < 1 ? (
                                <>
                                  <span style={{ fontSize: '0.72rem', textDecoration: 'line-through', color: 'var(--text-muted)', opacity: 0.7, display: 'block' }}>Q{(p.price * c.qty).toFixed(2)}</span>
                                  <span style={{ color: '#3aaa35', fontWeight: 700 }}>Q{(p.price * DISCOUNT * c.qty).toFixed(2)}</span>
                                </>
                              ) : (
                                <span>Q{(p.price * c.qty).toFixed(2)}</span>
                              )}
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
                    <div className="product-modal-price" style={{ color: '#e8597d' }}>Q{selectedProduct.price.toFixed(2)}</div>
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
                    {!selectedProduct.stock ? '❌ Agotado' : ((cart.find(c => c.id === selectedProduct.id)?.qty >= selectedProduct.stock) ? 'Límite alcanzado' : <><span className="cart-icon">🛍</span> Agregar</>)}
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

      {/* Floating Social Dock (Left Side - TikTok, Instagram, Facebook) */}
      <aside className="social-dock" aria-label="Redes Sociales">
        <div className="social-dock-item">
          <a href="https://www.tiktok.com/@flor.de.seul.gt" target="_blank" rel="noopener" className="social-dock-btn btn-tiktok" aria-label="TikTok">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .586.046.86.13V9.42a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 1 0 6.34 6.34V8.75a8.28 8.28 0 0 0 3.77.94V6.69z"/>
            </svg>
          </a>
          <div className="social-dock-tooltip tooltip-tiktok">
            <span className="tooltip-bar bar-tiktok"></span>
            <span className="tooltip-name">TIKTOK</span>
            <span className="tooltip-handle handle-tiktok">@flor.de.seul.gt</span>
          </div>
        </div>

        <div className="social-dock-item">
          <a href="https://www.instagram.com/flordeseul_gt" target="_blank" rel="noopener" className="social-dock-btn btn-instagram" aria-label="Instagram">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <div className="social-dock-tooltip tooltip-instagram">
            <span className="tooltip-bar bar-instagram"></span>
            <span className="tooltip-name">INSTAGRAM</span>
            <span className="tooltip-handle handle-instagram">@flordeseul_gt</span>
          </div>
        </div>

        <div className="social-dock-item">
          <a href="https://www.facebook.com/people/Flor-De-Seúl-Gt/61577355537632/" target="_blank" rel="noopener" className="social-dock-btn btn-facebook" aria-label="Facebook">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <div className="social-dock-tooltip tooltip-facebook">
            <span className="tooltip-bar bar-facebook"></span>
            <span className="tooltip-name">FACEBOOK</span>
            <span className="tooltip-handle handle-facebook">Flor De Seúl Gt</span>
          </div>
        </div>
      </aside>

      {/* Toast */}
      <div className={`toast ${toast.show ? 'show' : ''}`}>{toast.msg}</div>

      {/* Back to top */}
      <button className={`back-to-top ${scrolled ? 'visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
    </main>
  );
}
