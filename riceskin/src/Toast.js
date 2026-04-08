import React from 'react';

export default function Toast({ message, show }) {
  return (
    <div style={{
      position: 'fixed', bottom: '32px', left: '50%',
      transform: `translateX(-50%) translateY(${show ? '0' : '20px'})`,
      background: '#2A1F14', color: 'white',
      padding: '14px 28px', borderRadius: '50px',
      fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', fontWeight: 500,
      opacity: show ? 1 : 0,
      pointerEvents: 'none',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 3000, letterSpacing: '0.04em',
      boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
      whiteSpace: 'nowrap',
    }}>
      {message}
    </div>
  );
}
