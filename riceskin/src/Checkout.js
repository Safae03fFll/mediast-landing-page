import React, { useState } from 'react';
import { GOOGLE_SHEET_URL } from './data';

const inputStyle = {
  width: '100%', padding: '13px 16px',
  border: '1.5px solid #EDE3D5', borderRadius: '12px',
  fontFamily: "'Jost', sans-serif", fontSize: '0.9rem',
  color: '#2A1F14', background: '#FDFAF7', outline: 'none',
  transition: 'border-color 0.2s, background 0.2s',
};
const labelStyle = {
  fontFamily: "'Jost', sans-serif", fontSize: '0.72rem',
  letterSpacing: '0.1em', textTransform: 'uppercase',
  color: '#8C7B6A', fontWeight: 500, marginBottom: '6px', display: 'block',
};

function Field({ label, name, value, onChange, type = 'text', placeholder, required, half }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ flex: half ? '1 1 calc(50% - 8px)' : '1 1 100%', minWidth: half ? '140px' : '100%' }}>
      <label style={labelStyle}>{label}{required && ' *'}</label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          ...inputStyle,
          borderColor: focused ? '#C9A87C' : '#EDE3D5',
          background: focused ? 'white' : '#FDFAF7',
        }}
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div style={{ flex: '1 1 100%' }}>
      <label style={labelStyle}>{label}</label>
      <select name={name} value={value} onChange={onChange} style={{
        ...inputStyle, appearance: 'none', cursor: 'pointer',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238C7B6A' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center',
        paddingRight: '36px',
      }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

export default function Checkout({ cart, onBack, onSuccess }) {
  const [step, setStep] = useState(1); // 1 = shipping, 2 = payment
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '',
    city: '',
    paymentMethod: 'card',
    cardName: '', cardNumber: '', expiry: '', cvv: '',
    notes: '',
  });

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = total >= 60 ? 0 : 5.99;
  const grandTotal = total + shipping;

  const update = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const sendToSheets = async (orderData) => {
    try {
      const params = new URLSearchParams();
      params.append('data', JSON.stringify(orderData));
      await fetch(`${GOOGLE_SHEET_URL}?${params.toString()}`, { method: 'GET', mode: 'no-cors' });
    } catch (err) {
      console.warn('Google Sheets submission:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }

    setLoading(true);
    const orderData = {
      orderNumber: `RS-${Date.now()}`,
      date: new Date().toLocaleString('fr-FR'),
      customer: `${form.firstName} ${form.lastName}`,
      phone: form.phone,
      city: form.city,
      items: cart.map(i => `${i.name} x${i.qty} (${(i.price * i.qty).toFixed(2)}€)`).join(' | '),
      subtotal: total.toFixed(2),
      shipping: shipping.toFixed(2),
      total: grandTotal.toFixed(2),
      payment: form.paymentMethod,
      notes: form.notes,
    };

    await sendToSheets(orderData);
    setTimeout(() => { setLoading(false); onSuccess(orderData); }, 1800);
  };

  const SectionTitle = ({ children, step: s }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #EDE3D5' }}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '50%',
        background: '#6B4F32', color: 'white', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', fontWeight: 700,
      }}>{s}</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 500, color: '#2A1F14' }}>{children}</h3>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#FAF6F0', padding: '90px 40px 60px' }}>
      {/* Back */}
      <button onClick={onBack} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', color: '#A07850',
        display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px',
        letterSpacing: '0.06em', padding: 0,
      }}>
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Retour à la boutique
      </button>

      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 400, color: '#2A1F14', marginBottom: '40px' }}>
        Finaliser ma <em style={{ fontStyle: 'italic', color: '#6B4F32' }}>commande</em>
      </h1>

      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '40px', maxWidth: '400px' }}>
        {['Livraison', 'Paiement'].map((label, i) => (
          <React.Fragment key={label}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700,
                background: step >= i + 1 ? '#6B4F32' : '#EDE3D5',
                color: step >= i + 1 ? 'white' : '#8C7B6A',
                fontFamily: "'Jost', sans-serif",
              }}>{step > i + 1 ? '✓' : i + 1}</div>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', color: step >= i + 1 ? '#6B4F32' : '#8C7B6A', fontWeight: step >= i + 1 ? 600 : 400 }}>{label}</span>
            </div>
            {i < 1 && <div style={{ flex: 1, height: '2px', background: step > 1 ? '#6B4F32' : '#EDE3D5', margin: '0 12px', transition: 'background 0.3s' }} />}
          </React.Fragment>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', maxWidth: '1050px' }}>
        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '36px', boxShadow: '0 4px 24px rgba(42,31,20,0.08)', marginBottom: '20px' }}>

            {step === 1 && (
              <>
                <SectionTitle step={1}>Informations de livraison</SectionTitle>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                  <Field label="Prénom" name="firstName" value={form.firstName} onChange={update} placeholder="Youssef" required half />
                  <Field label="Nom" name="lastName" value={form.lastName} onChange={update} placeholder="Alami" required half />
                  <Field label="Téléphone" name="phone" value={form.phone} onChange={update} placeholder="+212 6XX XXX XXX" required half />
                  <SelectField label="Ville" name="city" value={form.city} onChange={update} options={[
                    { value: '', label: 'Sélectionnez une ville' },
                    { value: 'Casablanca', label: 'Casablanca' },
                    { value: 'Rabat', label: 'Rabat' },
                    { value: 'Marrakech', label: 'Marrakech' },
                    { value: 'Fès', label: 'Fès' },
                    { value: 'Tanger', label: 'Tanger' },
                    { value: 'Agadir', label: 'Agadir' },
                    { value: 'Oujda', label: 'Oujda' },
                    { value: 'Meknès', label: 'Meknès' },
                    { value: 'Essaouira', label: 'Essaouira' },
                    { value: 'Nador', label: 'Nador' },
                    { value: 'Safi', label: 'Safi' },
                    { value: 'Kenitra', label: 'Kénitra' },
                    { value: 'Tétouan', label: 'Tétouan' },
                    { value: 'El Jadida', label: 'El Jadida' },
                  ]} />
                  <div style={{ flex: '1 1 100%' }}>
                    <label style={labelStyle}>Notes de commande (optionnel)</label>
                    <textarea name="notes" value={form.notes} onChange={update} placeholder="Instructions spéciales de livraison..." rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <SectionTitle step={2}>Paiement</SectionTitle>
                <SelectField label="Méthode de paiement" name="paymentMethod" value={form.paymentMethod} onChange={update} options={[
                  { value: 'card', label: '💳 Carte bancaire' },
                  { value: 'paypal', label: '🅿️ PayPal' },
                  { value: 'cod', label: '💵 Paiement à la livraison' },
                  { value: 'virement', label: '🏦 Virement bancaire' },
                ]} />

                {form.paymentMethod === 'card' && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '20px' }}>
                    <Field label="Nom sur la carte" name="cardName" value={form.cardName} onChange={update} placeholder="YOUSSEF ALAMI" required />
                    <Field label="Numéro de carte" name="cardNumber" value={form.cardNumber} onChange={update} placeholder="4242 4242 4242 4242" required />
                    <Field label="Date d'expiration" name="expiry" type="date" value={form.expiry} onChange={update} required half />
                    <Field label="CVV" name="cvv" value={form.cvv} onChange={update} placeholder="123" required half />
                  </div>
                )}

                {form.paymentMethod === 'paypal' && (
                  <div style={{ background: '#FFF9F0', borderRadius: '12px', padding: '20px', marginTop: '16px', textAlign: 'center', fontFamily: "'Jost', sans-serif", color: '#6B5A48' }}>
                    Vous serez redirigé vers PayPal pour compléter votre paiement.
                  </div>
                )}

                {form.paymentMethod === 'cod' && (
                  <div style={{ background: '#F0F7EE', borderRadius: '12px', padding: '20px', marginTop: '16px', fontFamily: "'Jost', sans-serif", color: '#4A6B45', fontSize: '0.88rem', lineHeight: 1.6 }}>
                    ✓ Vous paierez en espèces à la réception de votre colis. Des frais supplémentaires peuvent s'appliquer.
                  </div>
                )}

                {form.paymentMethod === 'virement' && (
                  <div style={{ background: '#F5F0FA', borderRadius: '12px', padding: '20px', marginTop: '16px', fontFamily: "'Jost', sans-serif", color: '#5A4A7A', fontSize: '0.85rem', lineHeight: 1.7 }}>
                    <strong>Coordonnées bancaires :</strong><br />
                    IBAN : MA XX XXXX XXXX XXXX XXXX XXXX XXX<br />
                    BIC : BNCMMAMC<br />
                    Référence : votre n° de commande
                  </div>
                )}
              </>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            {step === 2 && (
              <button type="button" onClick={() => setStep(1)} style={{
                flex: '0 0 auto', padding: '16px 28px', borderRadius: '50px',
                border: '1.5px solid #EDE3D5', background: 'none', cursor: 'pointer',
                fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#6B4F32', fontWeight: 500,
                transition: 'all 0.2s',
              }}>← Retour</button>
            )}
            <button type="submit" disabled={loading} style={{
              flex: 1, background: loading ? '#B0A090' : '#6B4F32', color: 'white',
              border: 'none', padding: '18px', borderRadius: '50px',
              fontFamily: "'Jost', sans-serif", fontSize: '0.92rem',
              fontWeight: 700, letterSpacing: '0.08em', cursor: loading ? 'not-allowed' : 'pointer',
              textTransform: 'uppercase', transition: 'all 0.3s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            }}>
              {loading ? (
                <><div style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Traitement...</>
              ) : step === 1 ? 'Continuer vers le paiement →' : `Confirmer · ${grandTotal.toFixed(2)}€`}
            </button>
          </div>
        </form>

        {/* ORDER SUMMARY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '28px', boxShadow: '0 4px 24px rgba(42,31,20,0.08)', position: 'sticky', top: '90px' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 500, marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #EDE3D5' }}>
              Récapitulatif
            </h3>

            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F5EFE6' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '10px',
                    background: '#F5EFE6', overflow: 'hidden', flexShrink: 0,
                    position: 'relative',
                  }}>
                    <img src={item.cardImage} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
                    <div style={{
                      position: 'absolute', top: '-6px', right: '-6px',
                      width: '18px', height: '18px', background: '#6B4F32', borderRadius: '50%',
                      color: 'white', fontSize: '0.62rem', fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Jost', sans-serif",
                    }}>{item.qty}</div>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', fontWeight: 500, color: '#2A1F14' }}>{item.name}</p>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', color: '#8C7B6A' }}>{item.size}</p>
                  </div>
                </div>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 500 }}>{(item.price * item.qty).toFixed(2)}€</span>
              </div>
            ))}

            <div style={{ marginTop: '16px' }}>
              {[['Sous-total', `${total.toFixed(2)}€`], ['Livraison', shipping === 0 ? '🎁 Gratuite' : `${shipping.toFixed(2)}€`]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', color: '#8C7B6A' }}>
                  <span>{k}</span><span style={{ color: shipping === 0 && k === 'Livraison' ? '#8FA688' : '#6B4F32' }}>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '14px', marginTop: '6px', borderTop: '2px solid #EDE3D5' }}>
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Total</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 400, color: '#6B4F32' }}>{grandTotal.toFixed(2)}€</span>
              </div>
            </div>

            {/* Trust */}
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[['🔒', 'Paiement 100% sécurisé'], ['🚚', 'Livraison rapide 2-5 jours'], ['↩️', 'Retours gratuits 30 jours'], ['🌿', 'Formules 100% naturelles']].map(([icon, text]) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', color: '#8C7B6A' }}>
                  <span style={{ fontSize: '1rem' }}>{icon}</span>{text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
