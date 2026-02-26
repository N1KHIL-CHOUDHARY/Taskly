import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = ({ theme, toggleTheme }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [logoutHovered, setLogoutHovered] = useState(false);
  const dark = theme === 'dark';

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <nav style={{
      borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
      background: dark ? 'rgba(15,15,19,0.85)' : 'rgba(245,243,239,0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      fontFamily: "'DM Sans', sans-serif",
      transition: 'background 0.3s ease, border-color 0.3s ease',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        .nav-logout-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 9px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          border: 1px solid;
        }
        .nav-theme-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 9px;
          border: none;
          cursor: pointer;
          transition: all 0.15s ease;
          flex-shrink: 0;
        }
      `}</style>

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
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            background: '#c8b89a',
            borderRadius: '9px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
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
        </button>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* User pill */}
          {user && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 12px 5px 6px',
              borderRadius: '30px',
              background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
              border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
            }}>
              {/* Avatar */}
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #c8b89a, #a89578)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: '700',
                color: '#1a1a24',
                flexShrink: 0,
                letterSpacing: '0.02em',
              }}>
                {initials}
              </div>
              <span style={{
                fontSize: '13px',
                fontWeight: '500',
                color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                maxWidth: '140px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {user.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;