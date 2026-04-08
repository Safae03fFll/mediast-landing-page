import React from 'react';

const navStyles = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 60px', height: '72px',
    background: 'rgba(250,246,240,0.92)',
    backdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(169,135,100,0.15)',
    transition: 'all 0.3s ease',
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.4rem', fontWeight: 500,
    color: '#2A1F14', letterSpacing: '0.02em',
    cursor: 'pointer', userSelect: 'none',
  },
  logoSub: { fontSize: '0.65rem', fontWeight: 400, letterSpacing: '0.18em', color: '#8C7B6A', textTransform: 'uppercase', display: 'block', marginTop: '-2px' },
  navCenter: { display: 'flex', gap: '40px', alignItems: 'center' },
  navLink: {
    fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', fontWeight: 500,
    letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B4F32',
    background: 'none', border: 'none', cursor: 'pointer',
    position: 'relative', padding: '4px 0',
  },
  cartBtn: {
    display: 'flex', alignItems: 'center', gap: '10px',
    background: '#6B4F32', color: 'white',
    border: 'none', borderRadius: '50px',
    padding: '10px 22px', fontSize: '0.82rem', fontWeight: 500,
    letterSpacing: '0.06em', cursor: 'pointer',
    transition: 'all 0.25s ease',
    fontFamily: "'Jost', sans-serif",
  },
  cartCount: {
    background: '#C9A87C', color: 'white', borderRadius: '50%',
    width: '20px', height: '20px', fontSize: '0.7rem', fontWeight: 700,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
};

export default function Navbar({ cartCount, onCartOpen, onNavClick }) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav style={{ ...navStyles.nav, boxShadow: scrolled ? '0 4px 24px rgba(42,31,20,0.08)' : 'none' }}>
      <div style={navStyles.logo} onClick={() => onNavClick('home')}>
        I'm From
        <span style={navStyles.logoSub}>Rice Skincare</span>
      </div>

      <div style={navStyles.navCenter}>
        <button style={navStyles.navLink} onClick={() => onNavClick('home')}>Accueil</button>
        <button style={navStyles.navLink} onClick={() => onNavClick('products')}>Produits</button>
        <button style={navStyles.navLink} onClick={() => onNavClick('about')}>À Propos</button>
      </div>

      <button
        style={navStyles.cartBtn}
        onClick={onCartOpen}
        onMouseEnter={e => { e.currentTarget.style.background = '#2A1F14'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#6B4F32'; e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        Panier
        {cartCount > 0 && <span style={navStyles.cartCount}>{cartCount}</span>}
      </button>
    </nav>
  );
}
