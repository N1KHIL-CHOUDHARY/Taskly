import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';

const LoginPage = ({ theme, toggleTheme }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login({ email, password });
    } catch (err) {
      setError(err.message || 'Failed to login');
      setLoading(false);
    }
  };

  const dark = theme === 'dark';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: dark
        ? 'linear-gradient(135deg, #0f0f13 0%, #1a1a24 50%, #0f0f13 100%)'
        : 'linear-gradient(135deg, #f5f3ef 0%, #eceae4 50%, #f5f3ef 100%)',
      fontFamily: "'DM Sans', sans-serif",
      transition: 'background 0.3s ease',
    }}>
      {/* Decorative side panel */}
      <div style={{
        display: 'none',
        width: '420px',
        background: dark ? '#1e1e2a' : '#2d2d3a',
        padding: '60px 48px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        '@media (minWidth: 1024px)': { display: 'flex' },
      }} className="side-panel">
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              borderRadius: '50%',
              border: `1px solid rgba(255,255,255,${0.03 + i * 0.01})`,
              width: `${300 + i * 120}px`,
              height: `${300 + i * 120}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }} />
          ))}
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', background: '#c8b89a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a24" strokeWidth="2.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
            </div>
            <span style={{ color: '#fff', fontWeight: '700', fontSize: '16px', letterSpacing: '-0.3px' }}>Taskly</span>
          </div>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>What you get</p>
          {['Organize tasks effortlessly', 'Track progress in real-time', 'Simple, distraction-free design'].map((text, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c8b89a', flexShrink: 0 }} />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main form area */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        position: 'relative',
      }}>
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          style={{
            position: 'absolute',
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
            transition: 'background 0.2s',
          }}
          aria-label="Toggle theme"
        >
          {dark
            ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c8b89a" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2d2d3a" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
          }
        </button>

        <div style={{
          width: '100%',
          maxWidth: '420px',
          animation: 'fadeUp 0.5s ease forwards',
        }}>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display&display=swap');
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              20%, 60% { transform: translateX(-6px); }
              40%, 80% { transform: translateX(6px); }
            }
            .login-input {
              width: 100%;
              padding: 12px 16px;
              border-radius: 10px;
              font-family: 'DM Sans', sans-serif;
              font-size: 15px;
              outline: none;
              transition: all 0.2s ease;
              box-sizing: border-box;
            }
            .login-btn {
              width: 100%;
              padding: 13px;
              border-radius: 10px;
              border: none;
              font-family: 'DM Sans', sans-serif;
              font-size: 15px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s ease;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
            }
            .login-btn:hover:not(:disabled) {
              transform: translateY(-1px);
              box-shadow: 0 8px 24px rgba(200, 184, 154, 0.35);
            }
            .login-btn:active:not(:disabled) {
              transform: translateY(0);
            }
            .side-panel {
              display: none;
            }
            @media (min-width: 1024px) {
              .side-panel {
                display: flex !important;
              }
            }
          `}</style>

          {/* Logo */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
              <div style={{ width: '36px', height: '36px', background: '#c8b89a', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a24" strokeWidth="2.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
              </div>
              <span style={{ fontWeight: '700', fontSize: '17px', color: dark ? '#fff' : '#1a1a24', letterSpacing: '-0.3px' }}>Taskly</span>
            </div>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '32px', fontWeight: '400', color: dark ? '#fff' : '#1a1a24', margin: 0, lineHeight: 1.15, letterSpacing: '-0.5px' }}>
              Welcome back
            </h1>
            <p style={{ marginTop: '8px', color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)', fontSize: '15px', margin: '8px 0 0' }}>
              Sign in to continue to your tasks
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)', marginBottom: '7px', letterSpacing: '0.02em' }}>Email address</label>
              <input
                className="login-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                style={{
                  background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                  border: focused === 'email' ? '1.5px solid #c8b89a' : `1.5px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  color: dark ? '#fff' : '#1a1a24',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)', marginBottom: '7px', letterSpacing: '0.02em' }}>Password</label>
              <input
                className="login-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
                style={{
                  background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                  border: focused === 'password' ? '1.5px solid #c8b89a' : `1.5px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  color: dark ? '#fff' : '#1a1a24',
                }}
              />
            </div>

            {error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#ef4444',
                fontSize: '14px',
                animation: 'shake 0.35s ease',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
              style={{
                background: loading ? (dark ? 'rgba(200,184,154,0.4)' : 'rgba(200,184,154,0.6)') : '#c8b89a',
                color: '#1a1a24',
                marginTop: '4px',
                opacity: loading ? 0.8 : 1,
              }}
            >
              {loading ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}>
                    <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.3"/>
                    <path d="M21 12a9 9 0 00-9-9"/>
                  </svg>
                  Signing in...
                </>
              ) : 'Sign in'}
            </button>
          </form>

          <p style={{ marginTop: '28px', textAlign: 'center', fontSize: '14px', color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>
            No account yet?{' '}
            <Link to="/register" style={{ color: '#c8b89a', fontWeight: '600', textDecoration: 'none' }}>
              Create one →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;