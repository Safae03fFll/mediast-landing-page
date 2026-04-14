import React from 'react';
import { IMAGES } from './data';
import { MdOutlineWaterDrop, MdVerified, MdLocalFlorist, MdEco } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { FiInstagram, FiTwitter, FiFacebook, FiX } from 'react-icons/fi';

export function FeaturesSection() {
  const features = [
    { icon: <MdOutlineWaterDrop style={{ color: '#6B4F32' }} />, title: 'Extrait de riz 77%', desc: 'La plus haute concentration de riz fermenté pour des résultats visibles en 7 jours.' },
    { icon: <MdVerified style={{ color: '#6B4F32' }} />, title: 'Testé dermatologiquement', desc: 'Formules douces, non-comédogènes, adaptées à tous types de peaux même sensibles.' },
    { icon: <MdLocalFlorist style={{ color: '#6B4F32' }} />, title: '100% Naturel', desc: 'Sans parabens, sans sulfates, sans colorants artificiels. Pur et efficace.' },
    { icon: <MdEco style={{ color: '#6B4F32' }} />, title: 'Éco-responsable', desc: 'Emballages recyclables et formules respectueuses de l\'environnement.' },
  ];

  return (
    <section id="about" style={{ padding: '100px 60px', background: 'white' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          {/* Left */}
          <div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A07850', fontWeight: 600, marginBottom: '16px' }}>
              Notre philosophie
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
                  {f.icon && <div style={{ fontSize: '1.6rem', marginBottom: '10px' }}>{f.icon}</div>}
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
              <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>4.9</div>
              <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>+2000 avis vérifiés</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection({ extraFeedbacks = [] }) {
  const [showAll, setShowAll] = React.useState(false);
  const reviews = [
    { name: "Fatima Z.", city: "Casablanca", rating: 5, text: "Le Rice Toner a complètement transformé ma peau en 2 semaines. Mon teint est plus lumineux et mes pores sont minimisés. Je ne peux plus m'en passer !", product: "Rice Toner" },
    { name: "Amira K.", city: "Rabat", rating: 5, text: "Le Rice Cream est absolument divin. Il hydrate sans alourdir la peau. Ma peau est douce comme de la soie le matin. Meilleur achat beauté de l'année !", product: "Rice Cream" },
    { name: "Sofia B.", city: "Paris", rating: 5, text: "J'ai essayé tellement de toniques, mais celui-ci est le seul qui a vraiment éclairé mes taches. Ma peau a l'air en bonne santé et glowy en permanence.", product: "Rice Toner" },
  ];
  const allReviews = [...extraFeedbacks, ...reviews];
  const latestReviews = allReviews.slice(0, 3);

  return (
    <section id="testimonials" style={{ padding: '100px 60px', background: '#FAF6F0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A07850', fontWeight: 600, marginBottom: '12px', textAlign: 'center' }}>Témoignages</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 400, color: '#2A1F14', textAlign: 'center', marginBottom: '50px' }}>
          Ce que disent nos <em style={{ fontStyle: 'italic', color: '#6B4F32' }}>clientes</em>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {latestReviews.map((r, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '20px', padding: '28px', boxShadow: '0 4px 20px rgba(42,31,20,0.07)' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
                {[...Array(5)].map((_, j) => (
                  <AiFillStar key={j} size={18} color={j < r.rating ? '#C9A87C' : '#E8D5C4'} />
                ))}
              </div>
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
        {allReviews.length > 3 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
            <button onClick={() => setShowAll(true)} style={{
              background: '#6B4F32', color: 'white', border: 'none', borderRadius: '50px',
              padding: '14px 32px', fontFamily: "'Jost', sans-serif", fontSize: '0.9rem', fontWeight: 600,
              cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em', transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#2A1F14'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#6B4F32'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >Voir tout</button>
          </div>
        )}
      </div>

      {showAll && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2200, background: 'rgba(42,31,20,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
          <div style={{ width: '100%', maxWidth: '1100px', background: 'white', borderRadius: '28px', overflow: 'hidden', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 28px', borderBottom: '1px solid #EDE3D5' }}>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: '#2A1F14', marginBottom: '6px' }}>Tous les avis</h3>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.9rem', color: '#6B5A48' }}>Découvrez tous les retours de nos clientes.</p>
              </div>
              <button onClick={() => setShowAll(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B4F32' }} 
                onMouseEnter={e => e.currentTarget.style.color = '#2A1F14'}
                onMouseLeave={e => e.currentTarget.style.color = '#6B4F32'}
              >
                <FiX size={24} />
              </button>
            </div>
            <div style={{ padding: '24px', overflowY: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {allReviews.map((r, i) => (
                  <div key={i} style={{ background: 'white', borderRadius: '20px', padding: '28px', boxShadow: '0 4px 20px rgba(42,31,20,0.07)' }}>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
                      {[...Array(5)].map((_, j) => (
                        <AiFillStar key={j} size={18} color={j < r.rating ? '#C9A87C' : '#E8D5C4'} />
                      ))}
                    </div>
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
          </div>
        </div>
      )}
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
              {[
                { icon: FiInstagram, label: 'Instagram' },
                { icon: FiTwitter, label: 'Twitter' },
                { icon: FiFacebook, label: 'Facebook' },
              ].map(s => {
                const IconComponent = s.icon;
                return (
                  <div key={s.label} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1rem', transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.2)' }} 
                    onMouseEnter={e => { e.currentTarget.style.background = '#C9A87C'; e.currentTarget.style.borderColor = '#C9A87C'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                  >
                    <IconComponent color="white" size={18} />
                  </div>
                );
              })}
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
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>Paiement sécurisé SSL</p>
        </div>
      </div>
    </footer>
  );
}
