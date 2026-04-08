import React, { useState, useCallback, useRef } from 'react';
import './index.css';
import { PRODUCTS, IMAGES } from './data';
import Navbar from './Navbar';
import Hero from './Hero';
import { MarqueeStrip, ProductCard } from './Components';
import CartDrawer from './CartDrawer';
import Checkout from './Checkout';
import { ProductModal, SuccessPage } from './Modals';
import { FeaturesSection, TestimonialsSection, Footer } from './Sections';
import Toast from './Toast';

export default function App() {
  const [page, setPage] = useState('home'); // 'home' | 'checkout' | 'success'
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '' });
  const [order, setOrder] = useState(null);
  const productsRef = useRef(null);

  // Toast helper
  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3000);
  };

  // Cart operations
  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`✓ ${product.name} ajouté au panier`);
  }, []);

  const updateQty = useCallback((id, delta) => {
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
        .filter(i => i.qty > 0)
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // Navigation
  const handleNavClick = (dest) => {
    if (dest === 'home') { setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    if (dest === 'products') {
      setPage('home');
      setTimeout(() => productsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
    if (dest === 'about') {
      setPage('home');
      setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  const handleCheckoutSuccess = (orderData) => {
    setOrder(orderData);
    setCart([]);
    setPage('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render
  if (page === 'checkout') {
    return (
      <>
        <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} onNavClick={() => { setPage('home'); window.scrollTo(0, 0); }} />
        <CartDrawer cart={cart} open={cartOpen} onClose={() => setCartOpen(false)} onUpdateQty={updateQty} onRemove={removeFromCart} onCheckout={() => setCartOpen(false)} />
        <Checkout cart={cart} onBack={() => setPage('home')} onSuccess={handleCheckoutSuccess} />
        <Toast message={toast.msg} show={toast.show} />
      </>
    );
  }

  if (page === 'success') {
    return (
      <>
        <Navbar cartCount={0} onCartOpen={() => {}} onNavClick={() => { setPage('home'); window.scrollTo(0, 0); }} />
        <SuccessPage order={order} onContinue={() => { setPage('home'); window.scrollTo(0, 0); }} />
      </>
    );
  }

  return (
    <>
      {/* Global nav */}
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onNavClick={handleNavClick}
      />

      {/* Cart */}
      <CartDrawer
        cart={cart} open={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        onCheckout={() => { setCartOpen(false); setPage('checkout'); window.scrollTo(0, 0); }}
      />

      {/* Product modal */}
      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddToCart={(p) => { addToCart(p); setModalOpen(false); setCartOpen(true); }}
      />

      {/* Toast */}
      <Toast message={toast.msg} show={toast.show} />

      {/* ===== HOME PAGE ===== */}
      <main>
        {/* Hero */}
        <Hero onShopClick={() => productsRef.current?.scrollIntoView({ behavior: 'smooth' })} />

        {/* Marquee */}
        <MarqueeStrip />

        {/* Products section */}
        <section ref={productsRef} style={{ padding: '100px 60px', background: '#FAF6F0' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A07850', fontWeight: 600, marginBottom: '12px' }}>
              ✦ Notre collection
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400, color: '#2A1F14', lineHeight: 1.15 }}>
                Nos soins <em style={{ fontStyle: 'italic', color: '#6B4F32' }}>signature</em>
              </h2>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', color: '#8C7B6A', maxWidth: '280px', lineHeight: 1.6, textAlign: 'right' }}>
                Deux héros pour sublimer votre routine beauté quotidienne
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px' }}>
              {PRODUCTS.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(p) => { addToCart(p); setCartOpen(true); }}
                  onViewProduct={(p) => { setSelectedProduct(p); setModalOpen(true); }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How to use lifestyle strip */}
        <section style={{
          background: '#6B4F32', padding: '80px 60px',
          display: 'flex', alignItems: 'center', gap: '60px',
          overflow: 'hidden',
        }}>
          <div style={{ flex: '0 0 380px', position: 'relative', height: '320px' }}>
            <img src={IMAGES.toner_pour} alt="Application" style={{
              width: '280px', height: '280px', objectFit: 'cover', borderRadius: '50%',
              position: 'absolute', top: 0, left: 0,
              boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
            }} onError={e => { e.target.style.background = '#A07850'; e.target.src = ''; }} />
            <img src={IMAGES.cream_hand} alt="Application" style={{
              width: '180px', height: '180px', objectFit: 'cover', borderRadius: '50%',
              position: 'absolute', right: 20, bottom: 0,
              border: '4px solid rgba(255,255,255,0.2)',
              boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
            }} onError={e => { e.target.style.background = '#8F6540'; e.target.src = ''; }} />
          </div>

          <div style={{ color: 'white', flex: 1 }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.65, marginBottom: '16px' }}>
              Rituel quotidien
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 400, lineHeight: 1.15, marginBottom: '28px' }}>
              Comment utiliser <em style={{ fontStyle: 'italic', opacity: 0.8 }}>nos soins</em> ?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                ['1', 'Nettoyez', 'Commencez par un nettoyant doux pour préparer votre peau.'],
                ['2', 'Appliquez le Toner', 'Tapotez le Rice Toner sur votre visage avec les paumes ou un coton.'],
                ['3', 'Hydratez', 'Terminez avec le Rice Cream en massages circulaires ascendants.'],
              ].map(([n, title, desc]) => (
                <div key={n} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', fontWeight: 700 }}>{n}</div>
                  <div>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 500, marginBottom: '4px' }}>{title}</p>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', opacity: 0.7, lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features / About */}
        <FeaturesSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* CTA Banner */}
        <section style={{
          padding: '80px 60px', textAlign: 'center',
          background: 'linear-gradient(135deg, #EDE3D5 0%, #FAF6F0 100%)',
        }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A07850', fontWeight: 600, marginBottom: '16px' }}>
            ✦ Offre limitée
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, color: '#2A1F14', marginBottom: '14px' }}>
            Livraison gratuite dès <em style={{ color: '#6B4F32', fontStyle: 'italic' }}>60€</em>
          </h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.95rem', color: '#6B5A48', marginBottom: '36px' }}>
            Commandez les deux produits et économisez sur la livraison
          </p>
          <button onClick={() => productsRef.current?.scrollIntoView({ behavior: 'smooth' })} style={{
            background: '#6B4F32', color: 'white', border: 'none',
            padding: '18px 48px', borderRadius: '50px', cursor: 'pointer',
            fontFamily: "'Jost', sans-serif", fontSize: '0.9rem', fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.3s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#2A1F14'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(42,31,20,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#6B4F32'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            Commander maintenant
          </button>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
