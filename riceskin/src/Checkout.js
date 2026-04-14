import React, { useState } from 'react';
import { FiLock, FiTruck, FiRefreshCw, FiFeather } from 'react-icons/fi';
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
    paymentMethod: 'cod',
    cardName: '', cardNumber: '', expiry: '', cvv: '',
    notes: '',
  });

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = total >= 600 ? 0 : 59.9;
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
      items: cart.map(i => `${i.name} x${i.qty} (${(i.price * i.qty).toFixed(2)} MAD)`).join(' | '),
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
                  <div style={{ flex: '1 1 100%' }}>
                    <label style={labelStyle}>Ville</label>
                    <input
                      list="moroccoCities"
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={update}
                      placeholder="Tapez ou sélectionnez une ville..."
                      required
                      style={{
                        ...inputStyle,
                        borderColor: form.city ? '#C9A87C' : '#EDE3D5',
                        background: form.city ? 'white' : '#FDFAF7',
                      }}
                    />
                    <datalist id="moroccoCities">
                      <option value="Agadir" />
                      <option value="Al Hoceïma" />
                      <option value="Azilal" />
                      <option value="Béni Mellal" />
                      <option value="Berkane" />
                      <option value="Bouarfa" />
                      <option value="Boujdour" />
                      <option value="Boulmane" />
                      <option value="Boumalne Dadès" />
                      <option value="Casablanca" />
                      <option value="Chefchaouen" />
                      <option value="Dakhla" />
                      <option value="El Jadida" />
                      <option value="El Kelaâ des Sragh" />
                      <option value="Erfoud" />
                      <option value="Errachidia" />
                      <option value="Essaouira" />
                      <option value="Fès" />
                      <option value="Figuig" />
                      <option value="Fnideq" />
                      <option value="Guelmim" />
                      <option value="Guercif" />
                      <option value="Ifrane" />
                      <option value="Inezgane" />
                      <option value="Jerada" />
                      <option value="Khenifra" />
                      <option value="Khemisset" />
                      <option value="Khouribga" />
                      <option value="Ksar El Kebir" />
                      <option value="Laâyoune" />
                      <option value="Larache" />
                      <option value="Marrakech" />
                      <option value="Mechra Belksiri" />
                      <option value="Meknès" />
                      <option value="Midelt" />
                      <option value="Missour" />
                      <option value="Mohammadia" />
                      <option value="Moulay Idriss" />
                      <option value="Nador" />
                      <option value="Oued Zem" />
                      <option value="Ouezzane" />
                      <option value="Oujda" />
                      <option value="Ouled Driss" />
                      <option value="Oulmes" />
                      <option value="Ourika" />
                      <option value="Ourzazate" />
                      <option value="Rabat" />
                      <option value="Safi" />
                      <option value="Saïdia" />
                      <option value="Salé" />
                      <option value="Sefrou" />
                      <option value="Settat" />
                      <option value="Sidi Ahmed Ou Moussa" />
                      <option value="Sidi Bennour" />
                      <option value="Sidi Ifni" />
                      <option value="Sidi Kacem" />
                      <option value="Sidi Slimane" />
                      <option value="Skhira" />
                      <option value="Skoura" />
                      <option value="Souel" />
                      <option value="Souk El Arbaa" />
                      <option value="Tafraout" />
                      <option value="Tahla" />
                      <option value="Tanger" />
                      <option value="Taounate" />
                      <option value="Taourirt" />
                      <option value="Taroudannt" />
                      <option value="Taza" />
                      <option value="Taznakht" />
                      <option value="Tétouan" />
                      <option value="Tichla" />
                      <option value="Timhadit" />
                      <option value="Tinghir" />
                      <option value="Tiznit" />
                      <option value="Tizimmine" />
                      <option value="Tizi N'Test" />
                      <option value="Tizi N'Tichka" />
                      <option value="Tolba" />
                      <option value="Toundout" />
                      <option value="Zagora" />
                      <option value="Zarquia" />
                      <option value="Zeghanghane" />
                      <option value="Zejoul" />
                      <option value="Abdelaziz">Abdelaziz</option>
                      <option value="Abelkheir">Abelkheir</option>
                      <option value="Abou El Amel">Abou El Amel</option>
                      <option value="Al Akhawayn">Al Akhawayn</option>
                      <option value="Al Arba Aroub">Al Arba Aroub</option>
                      <option value="Al Attaouia">Al Attaouia</option>
                      <option value="Al Basatine">Al Basatine</option>
                      <option value="Al Bayada">Al Bayada</option>
                      <option value="Al Gaada">Al Gaada</option>
                      <option value="Al Gharbia">Al Gharbia</option>
                      <option value="Al Ghouta">Al Ghouta</option>
                      <option value="Al Hossein">Al Hossein</option>
                      <option value="Al Hoceïma">Al Hoceïma</option>
                      <option value="Al Jadida">Al Jadida</option>
                      <option value="Al Jadidya">Al Jadidya</option>
                      <option value="Al Jadidy">Al Jadidy</option>
                      <option value="Al Jarida">Al Jarida</option>
                      <option value="Al Jassira">Al Jassira</option>
                      <option value="Al Jisra">Al Jisra</option>
                      <option value="Al Jizeyra">Al Jizeyra</option>
                      <option value="Agadir">Agadir</option>
                      <option value="Aïn Chock">Aïn Chock</option>
                      <option value="Aïn Diab">Aïn Diab</option>
                      <option value="Casablanca">Casablanca</option>
                      <option value="Chefchaouen">Chefchaouen</option>
                      <option value="Dakhla">Dakhla</option>
                      <option value="El Jadida">El Jadida</option>
                      <option value="Erfoud">Erfoud</option>
                      <option value="Errachidia">Errachidia</option>
                      <option value="Essaouira">Essaouira</option>
                      <option value="Fès">Fès</option>
                      <option value="Figuig">Figuig</option>
                      <option value="Fnideq">Fnideq</option>
                      <option value="Guelmim">Guelmim</option>
                      <option value="Guercif">Guercif</option>
                      <option value="Ifrane">Ifrane</option>
                      <option value="Inezgane">Inezgane</option>
                      <option value="Jerada">Jerada</option>
                      <option value="Khenifra">Khenifra</option>
                      <option value="Khemisset">Khemisset</option>
                      <option value="Khouribga">Khouribga</option>
                      <option value="Ksar El Kebir">Ksar El Kebir</option>
                      <option value="Laâyoune">Laâyoune</option>
                      <option value="Larache">Larache</option>
                      <option value="Marrakech">Marrakech</option>
                      <option value="Meknes">Meknès</option>
                      <option value="Mohammedia">Mohammedia</option>
                      <option value="Nador">Nador</option>
                      <option value="Oujda">Oujda</option>
                      <option value="Ourzazate">Ourzazate</option>
                      <option value="Rabat">Rabat</option>
                      <option value="Safi">Safi</option>
                      <option value="Sale">Salé</option>
                      <option value="Sefrou">Sefrou</option>
                      <option value="Settat">Settat</option>
                      <option value="Tangier">Tanger</option>
                      <option value="Taounate">Taounate</option>
                      <option value="Taroudannt">Taroudannt</option>
                      <option value="Taza">Taza</option>
                      <option value="Tetouan">Tétouan</option>
                      <option value="Tiznit">Tiznit</option>
                      <option value="Tizi N'Test">Tizi N'Test</option>
                      <option value="Tizi N'Tichka">Tizi N'Tichka</option>
                      <option value="Zagora">Zagora</option>
                    </datalist>
                  </div>
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
                <div style={{ background: '#F0F7EE', borderRadius: '12px', padding: '20px', marginTop: '16px', fontFamily: "'Jost', sans-serif", color: '#4A6B45', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  Cash on Delivery
                </div>
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
              ) : step === 1 ? 'Continuer vers le paiement →' : `Confirmer · ${grandTotal.toFixed(2)} MAD`}
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
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 500 }}>{(item.price * item.qty).toFixed(2)} MAD</span>
              </div>
            ))}

            <div style={{ marginTop: '16px' }}>
              {[['Sous-total', `${total.toFixed(2)} MAD`], ['Livraison', shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} MAD`]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', color: '#8C7B6A' }}>
                  <span>{k}</span><span style={{ color: shipping === 0 && k === 'Livraison' ? '#8FA688' : '#6B4F32' }}>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '14px', marginTop: '6px', borderTop: '2px solid #EDE3D5' }}>
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Total</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 400, color: '#6B4F32' }}>{grandTotal.toFixed(2)} MAD</span>
              </div>
            </div>

            {/* Trust */}
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { icon: <FiLock size={14} />, text: 'Paiement 100% sécurisé' },
                { icon: <FiTruck size={14} />, text: 'Livraison rapide 2-5 jours' },
                { icon: <FiRefreshCw size={14} />, text: 'Retours gratuits 30 jours' },
                { icon: <FiFeather size={14} />, text: 'Formules 100% naturelles' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', color: '#8C7B6A' }}>
                  <span style={{ color: '#6B4F32', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
