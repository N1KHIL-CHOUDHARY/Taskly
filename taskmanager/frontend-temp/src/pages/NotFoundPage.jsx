import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = ({ theme, toggleTheme }) => {
  const dark = theme === 'dark';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: dark ? '#0f0f13' : '#f5f3ef',
      fontFamily: "'DM Sans', sans-serif",
      transition: 'background 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      padding: '24px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display:ital@0;1&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .home-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #c8b89a;
          color: #1a1a24;
          border: none;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .home-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(200, 184, 154, 0.4);
        }
      `}</style>

      {/* Background decoration */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{
          fontSize: '320px',
          fontFamily: "'DM Serif Display', serif",
          fontWeight: '400',
          color: 'rgba(0,0,0,0.04)',
          userSelect: 'none',
          lineHeight: 1,
          letterSpacing: '-10px',
        }}>
          404
        </div>
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
          border: 'none',
          borderRadius: '10px',
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Toggle theme"
      >
        {dark
          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8b89a" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2d2d3a" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
        }
      </button>

      {/* Content */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, animation: 'fadeUp 0.5s ease forwards' }}>
        {/* Floating icon */}
        <div style={{
          width: '80px',
          height: '80px',
          background: dark ? 'rgba(200,184,154,0.1)' : 'rgba(200,184,154,0.15)',
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 28px',
          animation: 'float 3s ease-in-out infinite',
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c8b89a" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
        </div>

        <div style={{
          display: 'inline-block',
          background: dark ? 'rgba(200,184,154,0.1)' : 'rgba(200,184,154,0.15)',
          color: '#c8b89a',
          fontSize: '12px',
          fontWeight: '700',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '5px 14px',
          borderRadius: '20px',
          marginBottom: '20px',
        }}>
          Error 404
        </div>

        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: '42px',
          fontWeight: '400',
          color: dark ? '#fff' : '#1a1a24',
          margin: '0 0 12px',
          letterSpacing: '-0.5px',
          lineHeight: 1.15,
        }}>
          Page not found
        </h1>

        <p style={{
          fontSize: '16px',
          color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)',
          margin: '0 0 36px',
          maxWidth: '340px',
          lineHeight: 1.6,
        }}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/" className="home-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Go back home
        </Link>

        {/* Subtle back link */}
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={() => window.history.back()}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', fontSize: '14px', fontFamily: "'DM Sans', sans-serif" }}
          >
            or go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;