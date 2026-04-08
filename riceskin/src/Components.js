import React from 'react';

const ITEMS = ["Rice Extract 77%", "Niacinamide", "Ceramides", "Fermented Rice Water", "Hyaluronic Acid", "Squalane", "Rice Bran", "Glass Skin"];

export function MarqueeStrip() {
  return (
    <div style={{
      background: '#6B4F32', color: 'white',
      padding: '16px 0', overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
    }}>
      <div style={{ display: 'flex', animation: 'marquee 22s linear infinite', whiteSpace: 'nowrap' }}>
        {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} style={{
            fontFamily: "'Jost', sans-serif", fontSize: '0.72rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            padding: '0 36px', opacity: 0.85,
          }}>
            ✦ {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ProductCard({ product, onAddToCart, onViewProduct }) {
  const [hovered, setHovered] = React.useState(false);
  const [imgIdx, setImgIdx] = React.useState(0);
  const [added, setAdded] = React.useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      style={{
        background: 'white', borderRadius: '24px', overflow: 'hidden',
        boxShadow: hovered ? '0 20px 56px rgba(42,31,20,0.15)' : '0 4px 20px rgba(42,31,20,0.08)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        cursor: 'pointer', position: 'relative',
      }}
      onMouseEnter={() => { setHovered(true); setImgIdx(1); }}
      onMouseLeave={() => { setHovered(false); setImgIdx(0); }}
      onClick={() => onViewProduct(product)}
    >
      {/* Badge */}
      <div style={{
        position: 'absolute', top: '16px', left: '16px', zIndex: 2,
        background: product.badgeColor, color: 'white',
        padding: '5px 14px', borderRadius: '20px',
        fontFamily: "'Jost', sans-serif", fontSize: '0.68rem',
        fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
      }}>
        {product.badge}
      </div>

      {/* Save badge */}
      {product.originalPrice && (
        <div style={{
          position: 'absolute', top: '16px', right: '16px', zIndex: 2,
          background: '#2A1F14', color: 'white',
          padding: '5px 12px', borderRadius: '20px',
          fontFamily: "'Jost', sans-serif", fontSize: '0.68rem', fontWeight: 600,
        }}>
          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
        </div>
      )}

      {/* Image */}
      <div style={{
        height: '320px', overflow: 'hidden', position: 'relative',
        background: '#F5EFE6',
      }}>
        {product.images.map((src, i) => (
          <img key={i} src={src} alt={product.name} style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            opacity: imgIdx === i ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }} onError={e => { e.target.style.display = 'none'; }} />
        ))}

        {/* Hover overlay with thumbnails */}
        <div style={{
          position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: '6px', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
        }}>
          {product.images.map((_, i) => (
            <button key={i} onClick={e => { e.stopPropagation(); setImgIdx(i); }} style={{
              width: '28px', height: '4px', borderRadius: '2px', border: 'none', cursor: 'pointer',
              background: imgIdx === i ? 'white' : 'rgba(255,255,255,0.5)',
              transition: 'all 0.2s',
            }} />
          ))}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '26px 28px 28px' }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', color: '#A07850', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '6px' }}>
          {product.brand} · {product.size}
        </p>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 500, marginBottom: '8px', color: '#2A1F14' }}>
          {product.name}
        </h3>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.87rem', color: '#6B5A48', lineHeight: 1.65, marginBottom: '18px' }}>
          {product.description}
        </p>

        {/* Benefits */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '22px' }}>
          {product.benefits.map(b => (
            <span key={b} style={{
              background: '#FAF6F0', border: '1px solid #EDE3D5',
              borderRadius: '20px', padding: '4px 12px',
              fontFamily: "'Jost', sans-serif", fontSize: '0.7rem',
              color: '#6B4F32', fontWeight: 500, letterSpacing: '0.04em',
            }}>
              {b}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 500, color: '#2A1F14' }}>
              {product.price.toFixed(2)}€
            </span>
            {product.originalPrice && (
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.9rem', color: '#B0A090', textDecoration: 'line-through', marginLeft: '8px' }}>
                {product.originalPrice.toFixed(2)}€
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            style={{
              background: added ? '#8FA688' : '#6B4F32', color: 'white',
              border: 'none', padding: '12px 24px', borderRadius: '50px',
              fontFamily: "'Jost', sans-serif", fontSize: '0.82rem',
              fontWeight: 600, letterSpacing: '0.06em', cursor: 'pointer',
              transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '8px',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { if (!added) e.currentTarget.style.background = '#2A1F14'; }}
            onMouseLeave={e => { if (!added) e.currentTarget.style.background = '#6B4F32'; }}
          >
            {added ? (
              <><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Acheté !</>
            ) : (
              <><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg> Acheter</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
