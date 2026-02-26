import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedLayout = ({ theme, toggleTheme }) => {
  const { isAuthenticated, loading, user, logout } = useAuth();
  const location = useLocation();
  const dark = theme === 'dark';

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: dark ? '#0f0f13' : '#f5f3ef',
        fontFamily: "'DM Sans', sans-serif",
        flexDirection: 'column',
        gap: '16px',
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,600;9..40,700&display=swap');
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}</style>
        <div style={{
          width: '36px', height: '36px', background: '#c8b89a',
          borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'pulse 1.5s ease-in-out infinite',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a24" strokeWidth="2.5">
            <path d="M9 11l3 3L22 4"/>
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
          </svg>
        </div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8b89a" strokeWidth="2" style={{ animation: 'spin 0.8s linear infinite' }}>
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.2"/>
          <path d="M21 12a9 9 0 00-9-9"/>
        </svg>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: dark ? '#0f0f13' : '#f5f3ef',
      fontFamily: "'DM Sans', sans-serif",
      transition: 'background 0.3s ease',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 12px;
          border-radius: 9px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.15s ease;
          background: transparent;
        }
        .theme-btn, .logout-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          border-radius: 9px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          border: none;
          transition: all 0.15s ease;
        }
      `}</style>

      {/* Navbar */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
        background: dark ? 'rgba(15,15,19,0.85)' : 'rgba(245,243,239,0.85)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        animation: 'fadeIn 0.3s ease forwards',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 24px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <div style={{
              width: '32px', height: '32px',
              background: '#c8b89a',
              borderRadius: '9px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1a1a24" strokeWidth="2.5">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </div>
            <span style={{
              fontWeight: '700',
              fontSize: '16px',
              color: dark ? '#fff' : '#1a1a24',
              letterSpacing: '-0.3px',
            }}>
              Taskly
            </span>
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>

            {/* User chip */}
            {user?.name && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 12px 5px 6px',
                borderRadius: '20px',
                background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                marginRight: '4px',
              }}>
                {/* Avatar */}
                <div style={{
                  width: '26px', height: '26px',
                  borderRadius: '50%',
                  background: '#c8b89a',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#1a1a24',
                  flexShrink: 0,
                  letterSpacing: '-0.3px',
                }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  color: dark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.55)',
                  maxWidth: '120px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {user.name}
                </span>
              </div>
            )}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="theme-btn"
              style={{
                padding: '7px',
                background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)',
                color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)',
                width: '36px', height: '36px',
                justifyContent: 'center',
              }}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={dark ? 'Light mode' : 'Dark mode'}
            >
              {dark
                ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c8b89a" strokeWidth="2">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2d2d3a" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                  </svg>
                )
              }
            </button>

            {/* Logout */}
            {logout && (
              <button
                onClick={logout}
                className="logout-btn"
                style={{
                  padding: '7px 13px',
                  background: 'transparent',
                  color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.38)',
                  border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ef4444';
                  e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)';
                  e.currentTarget.style.background = 'rgba(239,68,68,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.38)';
                  e.currentTarget.style.borderColor = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
                  e.currentTarget.style.background = 'transparent';
                }}
                title="Sign out"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                <span style={{ fontSize: '13px' }}>Sign out</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      <main>
        <Outlet context={{ theme, toggleTheme }} />
      </main>
    </div>
  );
};

export default ProtectedLayout;