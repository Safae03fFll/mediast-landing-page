import React from 'react';
import { IMAGES } from './data';

const S = {
  hero: {
    minHeight: '100vh', display: 'flex', alignItems: 'center',
    padding: '100px 60px 60px',
    background: 'linear-gradient(135deg, #FAF6F0 0%, #EDE3D5 50%, #E2D0BB 100%)',
    position: 'relative', overflow: 'hidden',
  },
  bgCircle1: {
    position: 'absolute', top: '-200px', right: '-150px',
    width: '700px', height: '700px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(201,168,124,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgCircle2: {
    position: 'absolute', bottom: '-100px', left: '30%',
    width: '400px', height: '400px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(143,166,136,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  left: { flex: '1', maxWidth: '560px', position: 'relative', zIndex: 1 },
  eyebrow: {
    display: 'inline-flex', alignItems: 'center', gap: '10px',
    fontFamily: "'Jost', sans-serif", fontSize: '0.72rem',
    letterSpacing: '0.22em', textTransform: 'uppercase',
    color: '#A07850', fontWeight: 600, marginBottom: '24px',
  },
  eyebrowDot: { width: '6px', height: '6px', borderRadius: '50%', background: '#C9A87C' },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
    fontWeight: 400, lineHeight: 1.08,
    color: '#2A1F14', marginBottom: '24px',
  },
  titleItalic: { fontStyle: 'italic', color: '#6B4F32' },
  desc: {
    fontFamily: "'Jost', sans-serif", fontSize: '1.02rem',
    color: '#6B5A48', lineHeight: 1.75, maxWidth: '420px', marginBottom: '44px',
  },
  ctaRow: { display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' },
  ctaPrimary: {
    background: '#6B4F32', color: 'white',
    padding: '16px 40px', borderRadius: '50px',
    fontFamily: "'Jost', sans-serif", fontSize: '0.9rem',
    fontWeight: 600, letterSpacing: '0.08em', border: 'none', cursor: 'pointer',
    transition: 'all 0.3s ease', textTransform: 'uppercase',
  },
  ctaSecondary: {
    background: 'transparent', color: '#6B4F32',
    padding: '16px 32px', borderRadius: '50px',
    fontFamily: "'Jost', sans-serif", fontSize: '0.9rem',
    fontWeight: 500, letterSpacing: '0.06em',
    border: '1.5px solid rgba(107,79,50,0.35)', cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  statsRow: {
    display: 'flex', gap: '40px', marginTop: '56px',
    paddingTop: '40px', borderTop: '1px solid rgba(169,135,100,0.2)',
  },
  stat: { display: 'flex', flexDirection: 'column', gap: '4px' },
  statNum: { fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: '#2A1F14' },
  statLabel: { fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', color: '#8C7B6A', letterSpacing: '0.08em' },
  right: {
    flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center',
    position: 'relative', zIndex: 1,
  },
  imageStack: { position: 'relative', width: '420px', height: '480px' },
  imgMain: {
    position: 'absolute', right: 0, top: 0,
    width: '340px', height: '420px',
    borderRadius: '200px 200px 180px 180px',
    objectFit: 'cover', objectPosition: 'center top',
    boxShadow: '0 24px 70px rgba(42,31,20,0.18)',
  },
  imgSecond: {
    position: 'absolute', left: 0, bottom: 0,
    width: '200px', height: '200px', borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: '0 16px 40px rgba(42,31,20,0.14)',
    border: '4px solid white',
  },
  floatCard: {
    position: 'absolute', top: '40px', left: '-20px',
    background: 'white', borderRadius: '16px',
    padding: '14px 20px', boxShadow: '0 12px 36px rgba(42,31,20,0.12)',
    fontFamily: "'Jost', sans-serif",
  },
  floatCardLabel: { fontSize: '0.65rem', letterSpacing: '0.12em', color: '#8C7B6A', textTransform: 'uppercase' },
  floatCardValue: { fontSize: '0.95rem', fontWeight: 600, color: '#2A1F14', marginTop: '2px' },
  floatCard2: {
    position: 'absolute', bottom: '60px', right: '-30px',
    background: '#6B4F32', color: 'white', borderRadius: '16px',
    padding: '14px 20px', boxShadow: '0 12px 36px rgba(42,31,20,0.2)',
    fontFamily: "'Jost', sans-serif",
  },
};

export default function Hero({ onShopClick }) {
  return (
    <section style={S.hero}>
      <div style={S.bgCircle1} />
      <div style={S.bgCircle2} />

      <div style={S.left}>
        <div className="fade-up" style={S.eyebrow}>
          <span style={S.eyebrowDot} />
          Skincare Coréen · Rituel du Riz
          <span style={S.eyebrowDot} />
        </div>

        <h1 className="fade-up-d1" style={S.title}>
          La peau <em style={S.titleItalic}>lumineuse</em><br />
          que vous méritez
        </h1>

        <p className="fade-up-d2" style={S.desc}>
          Découvrez nos soins enrichis à 77% d'extrait de riz fermenté.
          Une formule douce, efficace et inspirée des rituels beauté japonais.
        </p>

        <div className="fade-up-d3" style={S.ctaRow}>
          <button
            style={S.ctaPrimary}
            onClick={onShopClick}
            onMouseEnter={e => { e.currentTarget.style.background = '#2A1F14'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(42,31,20,0.25)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#6B4F32'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            Acheter maintenant
          </button>
          <button
            style={S.ctaSecondary}
            onClick={onShopClick}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(107,79,50,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            Voir les produits ↓
          </button>
        </div>

        <div className="fade-up-d4" style={S.statsRow}>
          {[['77%', "Extrait de riz"], ['10K+', "Clientes satisfaites"], ['2018', "Depuis"], ['', "100% Naturel"]].map(([num, label]) => (
            <div key={label} style={S.stat}>
              <span style={S.statNum}>{num}</span>
              <span style={S.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={S.right} className="fade-up-d2">
        <div style={S.imageStack}>
          <img src={IMAGES.toner_bottle} alt="Rice Toner" style={S.imgMain}
            onError={e => { e.target.style.background = '#EDE3D5'; e.target.src = ''; }} />
          <img src={IMAGES.cream_hand} alt="Rice Cream" style={S.imgSecond}
            onError={e => { e.target.style.background = '#E2D0BB'; e.target.src = ''; }} />

          <div style={S.floatCard}>
            <div style={S.floatCardLabel}>Ingrédient principal</div>
            <div style={S.floatCardValue}>Riz Fermenté</div>
          </div>

          <div style={S.floatCard2}>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', opacity: 0.8, textTransform: 'uppercase' }}>Texture</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '2px' }}>Glass Skin</div>
          </div>
        </div>
      </div>
    </section>
  );
}
