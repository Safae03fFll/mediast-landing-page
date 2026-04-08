import React, { useState } from 'react';

export function ProductModal({ product, open, onClose, onAddToCart }) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  if (!product || !open) return null;

  const handleAdd = () => {
    onAddToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(42,31,20,0.5)',
        zIndex: 2000, backdropFilter: 'blur(6px)',
        animation: 'fadeIn 0.2s ease',
      }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90vw', maxWidth: '900px', maxHeight: '90vh',
        background: 'white', borderRadius: '28px',
        boxShadow: '0 30px 80px rgba(42,31,20,0.2)',
        zIndex: 2001, overflow: 'hidden',
        display: 'flex',
        animation: 'fadeUp 0.35s ease',
      }}>
        {/* Left: Images */}
        <div style={{ flex: '1', background: '#F5EFE6', position: 'relative', minHeight: '500px' }}>
          <img src={product.images[selectedImg]} alt={product.name} style={{
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
          }} onError={e => e.target.style.display = 'none'} />

          {/* Thumbnails */}
          <div style={{
            position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: '8px',
          }}>
            {product.images.map((src, i) => (
              <button key={i} onClick={() => setSelectedImg(i)} style={{
                width: '52px', height: '52px', borderRadius: '10px', overflow: 'hidden',
                border: selectedImg === i ? '2px solid #6B4F32' : '2px solid transparent',
                cursor: 'pointer', padding: 0, transition: 'border 0.2s',
              }}>
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
              </button>
            ))}
          </div>

          {/* Badge */}
          <div style={{
            position: 'absolute', top: '20px', left: '20px',
            background: product.badgeColor, color: 'white',
            padding: '5px 14px', borderRadius: '20px',
            fontFamily: "'Jost', sans-serif", fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em',
          }}>{product.badge}</div>
        </div>

        {/* Right: Info */}
        <div style={{ flex: '1', padding: '40px 36px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <button onClick={onClose} style={{
            position: 'absolute', top: '20px', right: '20px',
            width: '36px', height: '36px', borderRadius: '50%',
            background: '#EDE3D5', border: 'none', cursor: 'pointer',
            fontSize: '1rem', color: '#6B4F32', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>

          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', color: '#A07850', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px' }}>
            {product.brand} · {product.size}
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: '#2A1F14', marginBottom: '8px' }}>
            {product.name}
          </h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', color: '#8C7B6A', fontStyle: 'italic', marginBottom: '20px' }}>
            {product.tagline}
          </p>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px' }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: '#2A1F14' }}>{product.price.toFixed(2)}€</span>
            {product.originalPrice && <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '1rem', color: '#B0A090', textDecoration: 'line-through' }}>{product.originalPrice.toFixed(2)}€</span>}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid #EDE3D5', marginBottom: '20px' }}>
            {['description', 'utilisation', 'ingrédients'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', fontWeight: 500,
                letterSpacing: '0.06em', textTransform: 'capitalize',
                color: activeTab === tab ? '#6B4F32' : '#8C7B6A',
                borderBottom: activeTab === tab ? '2px solid #6B4F32' : '2px solid transparent',
                marginBottom: '-1px', transition: 'all 0.2s',
              }}>{tab}</button>
            ))}
          </div>

          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#6B5A48', lineHeight: 1.75, marginBottom: '24px', flex: 1 }}>
            {activeTab === 'description' && product.longDescription}
            {activeTab === 'utilisation' && product.howToUse}
            {activeTab === 'ingrédients' && product.ingredients}
          </div>

          {/* Benefits */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
            {product.benefits.map(b => (
              <span key={b} style={{
                background: '#FAF6F0', border: '1px solid #EDE3D5',
                borderRadius: '20px', padding: '4px 12px',
                fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', color: '#6B4F32', fontWeight: 500,
              }}>{b}</span>
            ))}
          </div>

          {/* Qty + Add */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', border: '1.5px solid #EDE3D5', borderRadius: '50px', padding: '6px 16px' }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#6B4F32' }}>−</button>
              <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.95rem', minWidth: '20px', textAlign: 'center' }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#6B4F32' }}>+</button>
            </div>
            <button onClick={handleAdd} style={{
              flex: 1, background: added ? '#8FA688' : '#6B4F32', color: 'white',
              border: 'none', padding: '14px 24px', borderRadius: '50px',
              fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', fontWeight: 600,
              letterSpacing: '0.06em', cursor: 'pointer', transition: 'all 0.3s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}>
              {added ? '✓ Acheté !' : '+ Acheter'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function SuccessPage({ order, onContinue }) {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #FAF6F0 0%, #EDE3D5 100%)',
      padding: '40px 20px',
    }}>
      <div style={{
        background: 'white', borderRadius: '32px', padding: '64px 56px',
        maxWidth: '520px', width: '100%', textAlign: 'center',
        boxShadow: '0 20px 70px rgba(42,31,20,0.12)',
        animation: 'fadeUp 0.5s ease',
      }}>
        {/* Animated checkmark */}
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #C9A87C, #6B4F32)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px', fontSize: '2rem',
          boxShadow: '0 12px 32px rgba(107,79,50,0.3)',
          animation: 'pulse 2s ease infinite',
        }}>✨</div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.4rem', fontWeight: 400, color: '#2A1F14', marginBottom: '12px' }}>
          Merci pour votre <em style={{ fontStyle: 'italic', color: '#6B4F32' }}>commande</em> !
        </h1>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.95rem', color: '#8C7B6A', lineHeight: 1.7, marginBottom: '32px' }}>
          Votre commande <strong style={{ color: '#6B4F32' }}>#{order?.orderNumber}</strong> a été confirmée et enregistrée. Un email de confirmation vous sera envoyé à <strong>{order?.email}</strong>.
        </p>

        <div style={{ background: '#FAF6F0', borderRadius: '16px', padding: '20px', marginBottom: '32px', textAlign: 'left' }}>
          {[['📦', 'Préparation', '1-2 jours ouvrables'], ['🚚', 'Livraison', '2-5 jours ouvrables'], ['💌', 'Suivi', 'Par email']].map(([icon, label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', fontFamily: "'Jost', sans-serif", fontSize: '0.83rem' }}>
              <span style={{ color: '#6B5A48' }}>{icon} {label}</span>
              <span style={{ color: '#6B4F32', fontWeight: 500 }}>{val}</span>
            </div>
          ))}
        </div>

        <button onClick={onContinue} style={{
          background: '#6B4F32', color: 'white', border: 'none',
          padding: '16px 44px', borderRadius: '50px', cursor: 'pointer',
          fontFamily: "'Jost', sans-serif", fontSize: '0.9rem',
          fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
          transition: 'all 0.3s ease',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = '#2A1F14'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#6B4F32'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          Continuer mes achats
        </button>
      </div>
    </div>
  );
}
