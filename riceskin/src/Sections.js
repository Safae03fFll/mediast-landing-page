import React from 'react';
import { IMAGES } from './data';

export function FeaturesSection() {
  const features = [
    { icon: '🌾', title: 'Extrait de riz 77%', desc: 'La plus haute concentration de riz fermenté pour des résultats visibles en 7 jours.' },
    { icon: '🧪', title: 'Testé dermatologiquement', desc: 'Formules douces, non-comédogènes, adaptées à tous types de peaux même sensibles.' },
    { icon: '🌿', title: '100% Naturel', desc: 'Sans parabens, sans sulfates, sans colorants artificiels. Pur et efficace.' },
    { icon: '♻️', title: 'Éco-responsable', desc: 'Emballages recyclables et formules respectueuses de l\'environnement.' },
  ];

  return (
    <section id="about" style={{ padding: '100px 60px', background: 'white' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          {/* Left */}
          <div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A07850', fontWeight: 600, marginBottom: '16px' }}>
              ✦ Notre philosophie
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400, color: '#2A1F14', lineHeight: 1.15, marginBottom: '20px' }}>
              Le secret de la peau<br /><em style={{ fontStyle: 'italic', color: '#6B4F32' }}>en Corée du Sud</em>
            </h2>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.95rem', color: '#6B5A48', lineHeight: 1.8, marginBottom: '36px' }}>
              Depuis des siècles, les femmes coréennes utilisent l'eau de rinçage du riz comme soin beauté. I'm From a capturé ce rituel ancestral dans une gamme de soins modernes, enrichis à plus de 77% d'extrait de riz fermenté.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {features.map(f => (
                <div key={f.title} style={{
                  background: '#FAF6F0', borderRadius: '16px', padding: '20px',
                  border: '1px solid #EDE3D5',
                }}>
                  <div style={{ fontSize: '1.6rem', marginBottom: '10px' }}>{f.icon}</div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', fontWeight: 500, color: '#2A1F14', marginBottom: '6px' }}>{f.title}</h4>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', color: '#8C7B6A', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image collage */}
          <div style={{ position: 'relative', height: '500px' }}>
            <img src={IMAGES.both_products} alt="Products" style={{
              position: 'absolute', right: 0, top: 0,
              width: '280px', height: '360px', borderRadius: '20px', objectFit: 'cover',
              boxShadow: '0 20px 50px rgba(42,31,20,0.15)',
            }} onError={e => { e.target.style.background = '#EDE3D5'; e.target.src = ''; }} />
            <img src={IMAGES.cream_styled} alt="Rice Cream" style={{
              position: 'absolute', left: 0, bottom: 0,
              width: '220px', height: '260px', borderRadius: '20px', objectFit: 'cover',
              boxShadow: '0 16px 40px rgba(42,31,20,0.12)',
              border: '4px solid white',
            }} onError={e => { e.target.style.background = '#E2D0BB'; e.target.src = ''; }} />

            <div style={{
              position: 'absolute', top: '40px', left: '20px',
              background: '#6B4F32', color: 'white', borderRadius: '16px',
              padding: '16px 20px', fontFamily: "'Jost', sans-serif",
              boxShadow: '0 10px 30px rgba(107,79,50,0.3)',
            }}>
              <div style={{ fontSize: '0.62rem', letterSpacing: '0.12em', opacity: 0.75, textTransform: 'uppercase', marginBottom: '4px' }}>Avis clients</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>4.9 ⭐</div>
              <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>+2000 avis vérifiés</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const reviews = [
    { name: "Fatima Z.", city: "Casablanca", rating: 5, text: "Le Rice Toner a complètement transformé ma peau en 2 semaines. Mon teint est plus lumineux et mes pores sont minimisés. Je ne peux plus m'en passer !", product: "Rice Toner" },
    { name: "Amira K.", city: "Rabat", rating: 5, text: "Le Rice Cream est absolument divin. Il hydrate sans alourdir la peau. Ma peau est douce comme de la soie le matin. Meilleur achat beauté de l'année !", product: "Rice Cream" },
    { name: "Sofia B.", city: "Paris", rating: 5, text: "J'ai essayé tellement de toniques, mais celui-ci est le seul qui a vraiment éclairé mes taches. Ma peau a l'air en bonne santé et glowy en permanence.", product: "Rice Toner" },
  ];

  return (
    <section style={{ padding: '100px 60px', background: '#FAF6F0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A07850', fontWeight: 600, marginBottom: '12px', textAlign: 'center' }}>✦ Témoignages</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 400, color: '#2A1F14', textAlign: 'center', marginBottom: '50px' }}>
          Ce que disent nos <em style={{ fontStyle: 'italic', color: '#6B4F32' }}>clientes</em>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {reviews.map((r, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '20px', padding: '28px', boxShadow: '0 4px 20px rgba(42,31,20,0.07)' }}>
              <div style={{ color: '#C9A87C', fontSize: '1rem', marginBottom: '14px' }}>{'★'.repeat(r.rating)}</div>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#6B5A48', lineHeight: 1.75, marginBottom: '20px', fontStyle: 'italic' }}>
                "{r.text}"
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', fontWeight: 500, color: '#2A1F14' }}>{r.name}</p>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', color: '#8C7B6A' }}>{r.city}</p>
                </div>
                <span style={{ background: '#FAF6F0', border: '1px solid #EDE3D5', borderRadius: '20px', padding: '4px 12px', fontFamily: "'Jost', sans-serif", fontSize: '0.68rem', color: '#6B4F32', fontWeight: 500 }}>
                  {r.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer style={{ background: '#2A1F14', color: 'white', padding: '60px 60px 30px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '50px' }}>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 500, marginBottom: '12px' }}>I'm From</h3>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: '280px' }}>
              Soins coréens enrichis en extraits de riz pour une peau lumineuse et hydratée.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              {['Instagram', 'TikTok', 'Pinterest'].map(s => (
                <div key={s} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '0.65rem', letterSpacing: '0.05em', fontFamily: "'Jost', sans-serif", transition: 'background 0.2s' }}>
                  {s[0]}
                </div>
              ))}
            </div>
          </div>
          {[
            { title: 'Produits', links: ['Rice Toner', 'Rice Cream', 'Nouveautés', 'Bestsellers'] },
            { title: 'Service', links: ['Livraison', 'Retours', 'FAQ', 'Contact'] },
            { title: 'Légal', links: ['Confidentialité', 'CGV', 'Mentions légales', 'Cookies'] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A87C', marginBottom: '16px', fontWeight: 600 }}>{col.title}</h4>
              {col.links.map(l => (
                <p key={l} style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.83rem', color: 'rgba(255,255,255,0.55)', marginBottom: '10px', cursor: 'pointer', transition: 'color 0.2s' }}>{l}</p>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>© 2024 I'm From Rice Skincare. Tous droits réservés.</p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>🔒 Paiement sécurisé SSL</p>
        </div>
      </div>
    </footer>
  );
}
