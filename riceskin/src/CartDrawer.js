import React from 'react';
import { FiX, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';

export default function CartDrawer({ cart, open, onClose, onUpdateQty, onRemove, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(42,31,20,0.4)',
          zIndex: 1100, opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.35s ease',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: '420px', maxWidth: '95vw',
        background: 'white', zIndex: 1200,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-20px 0 60px rgba(42,31,20,0.12)',
      }}>

        {/* Header */}
        <div style={{
          padding: '28px 28px 20px', borderBottom: '1px solid #EDE3D5',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: '#FAF6F0',
        }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 500, color: '#2A1F14' }}>
              Votre Panier
            </h2>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', color: '#8C7B6A', marginTop: '2px' }}>
              {count} article{count !== 1 ? 's' : ''}
            </p>
          </div>
          <button onClick={onClose} style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: '#EDE3D5', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#DDD0BE'}
            onMouseLeave={e => e.currentTarget.style.background = '#EDE3D5'}
          >
            <FiX size={20} color="#6B4F32" />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: '#B0A090' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 10L20 15C20 18 22 20 25 20H35C38 20 40 18 40 15V10M25 20V50M35 20V50M20 20H40C42 20 44 22 44 24V52C44 54 42 56 40 56H20C18 56 16 54 16 52V24C16 22 18 20 20 20Z" />
                </svg>
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#6B5A48', marginBottom: '8px' }}>Votre panier est vide</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem' }}>Ajoutez des produits pour commencer</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} style={{
              display: 'flex', gap: '16px', padding: '18px 0',
              borderBottom: '1px solid #F5EFE6',
            }}>
              {/* Image */}
              <div style={{
                width: '80px', height: '80px', borderRadius: '14px',
                background: '#F5EFE6', overflow: 'hidden', flexShrink: 0,
              }}>
                <img src={item.cardImage} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { e.target.style.display = 'none'; }} />
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.68rem', color: '#A07850', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{item.brand}</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 500, color: '#2A1F14', margin: '2px 0 6px' }}>{item.name}</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', color: '#8C7B6A' }}>{item.size}</p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                  {/* Qty */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button onClick={() => onUpdateQty(item.id, -1)} style={{
                      width: '30px', height: '30px', borderRadius: '50%',
                      border: '1.5px solid #EDE3D5', background: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#EDE3D5'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
                    >
                      <FiMinus size={14} color="#6B4F32" />
                    </button>
                    <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.95rem', minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.id, 1)} style={{
                      width: '30px', height: '30px', borderRadius: '50%',
                      border: '1.5px solid #EDE3D5', background: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#EDE3D5'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
                    >
                      <FiPlus size={14} color="#6B4F32" />
                    </button>
                  </div>

                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 500, color: '#2A1F14' }}>
                    {(item.price * item.qty).toFixed(2)}€
                  </span>
                </div>

                <button onClick={() => onRemove(item.id)} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: "'Jost', sans-serif", fontSize: '0.72rem',
                  color: '#B0A090', marginTop: '8px', padding: '2px 0',
                  transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '6px',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#6B4F32'}
                  onMouseLeave={e => e.currentTarget.style.color = '#B0A090'}
                >
                  <FiTrash2 size={14} /> Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '20px 28px 28px', borderTop: '1px solid #EDE3D5', background: '#FAF6F0' }}>
            {/* Free shipping notice */}
            {total < 60 && (
              <div style={{
                background: '#F5EFE6', borderRadius: '12px', padding: '12px 16px',
                marginBottom: '16px', fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', color: '#6B4F32',
                textAlign: 'center',
              }}>
                Plus que <strong>{(60 - total).toFixed(2)}€</strong> pour la livraison gratuite
              </div>
            )}
            {total >= 60 && (
              <div style={{
                background: '#EAF2E8', borderRadius: '12px', padding: '12px 16px',
                marginBottom: '16px', fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', color: '#5A7A54',
                textAlign: 'center', fontWeight: 500,
              }}>
                ✓ Livraison gratuite offerte !
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '18px' }}>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8C7B6A' }}>Total</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 400, color: '#2A1F14' }}>
                {total.toFixed(2)}€
              </span>
            </div>

            <button onClick={onCheckout} style={{
              width: '100%', background: '#6B4F32', color: 'white',
              border: 'none', padding: '18px', borderRadius: '50px',
              fontFamily: "'Jost', sans-serif", fontSize: '0.92rem',
              fontWeight: 600, letterSpacing: '0.08em', cursor: 'pointer',
              textTransform: 'uppercase', transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#2A1F14'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#6B4F32'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Passer la commande →
            </button>

            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', color: '#B0A090', textAlign: 'center', marginTop: '12px' }}>
              Paiement sécurisé · Retours sous 30 jours
            </p>
          </div>
        )}
      </div>
    </>
  );
}
