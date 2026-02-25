import React, { useEffect, useState, useRef } from 'react';

const TaskFormModal = ({ isOpen, onClose, onSubmit, initialTask, theme }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);
  const titleRef = useRef(null);

  const isEdit = !!initialTask;
  const dark = theme === 'dark';

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || '');
      setDescription(initialTask.description || '');
      setStatus(initialTask.status || 'pending');
    } else {
      setTitle('');
      setDescription('');
      setStatus('pending');
    }
    setError('');
    setLoading(false);
  }, [initialTask, isOpen]);

  // Auto-focus title & trap Escape key
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => titleRef.current?.focus(), 80);
      const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
    }
  }, [isOpen, onClose]);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      titleRef.current?.focus();
      return;
    }
    setLoading(true);
    setError('');
    try {
      await onSubmit({ title: title.trim(), description: description.trim(), status });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save task');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const inputBase = {
    width: '100%',
    padding: '11px 14px',
    borderRadius: '10px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
    color: dark ? '#fff' : '#1a1a24',
  };

  const borderStyle = (key) => ({
    border: focused === key ? '1.5px solid #c8b89a' : `1.5px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
  });

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: '500',
    color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)',
    marginBottom: '7px',
    letterSpacing: '0.02em',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap');
        @keyframes backdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .modal-textarea::placeholder { color: ${dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.25)'}; }
        .modal-input::placeholder { color: ${dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.25)'}; }
        .modal-select option { background: ${dark ? '#1e1e2a' : '#fff'}; color: ${dark ? '#fff' : '#1a1a24'}; }
        .submit-btn {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 11px 22px; border-radius: 10px; border: none;
          background: #c8b89a; color: #1a1a24;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
          cursor: pointer; transition: all 0.2s ease;
        }
        .submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(200,184,154,0.4); }
        .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .cancel-btn {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 11px 18px; border-radius: 10px;
          border: 1.5px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
          background: transparent;
          color: ${dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)'};
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          cursor: pointer; transition: all 0.2s ease;
        }
        .cancel-btn:hover:not(:disabled) { border-color: ${dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}; color: ${dark ? '#fff' : '#1a1a24'}; }
        .cancel-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .status-pill {
          flex: 1; padding: 9px 12px; border-radius: 9px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
          border: 1.5px solid transparent; transition: all 0.2s ease;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .close-btn:hover { background: ${dark ? 'rgba(255,255,255,0.12) !important' : 'rgba(0,0,0,0.09) !important'}; }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 50,
          background: dark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(6px)',
          animation: 'backdropIn 0.2s ease forwards',
        }}
      />

      {/* Centering container */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 51,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px',
          pointerEvents: 'none',
        }}
      >
        {/* Modal panel */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label={isEdit ? 'Edit Task' : 'Create Task'}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '480px',
            background: dark ? '#1a1a24' : '#fff',
            borderRadius: '20px',
            border: `1px solid ${dark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.08)'}`,
            boxShadow: dark ? '0 24px 64px rgba(0,0,0,0.6)' : '0 24px 64px rgba(0,0,0,0.12)',
            animation: 'modalIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            fontFamily: "'DM Sans', sans-serif",
            pointerEvents: 'all',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '22px 24px 0',
          }}>
            <div>
              <h2 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: '22px', fontWeight: '400',
                color: dark ? '#fff' : '#1a1a24',
                margin: 0, letterSpacing: '-0.3px',
              }}>
                {isEdit ? 'Edit task' : 'New task'}
              </h2>
              <p style={{ fontSize: '13px', color: dark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.38)', margin: '3px 0 0' }}>
                {isEdit ? 'Update the details below' : 'Fill in the details to get started'}
              </p>
            </div>
            <button
              className="close-btn"
              onClick={onClose}
              style={{
                background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)',
                border: 'none', borderRadius: '9px',
                width: '34px', height: '34px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.15s',
                flexShrink: 0,
              }}
              aria-label="Close"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)'} strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)', margin: '20px 0 0' }} />

          {/* Form body */}
          <form id="task-form" onSubmit={handleSubmit}>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>

              {/* Title */}
              <div>
                <label style={labelStyle}>
                  Title <span style={{ color: '#c8b89a' }}>*</span>
                </label>
                <input
                  ref={titleRef}
                  className="modal-input"
                  value={title}
                  onChange={(e) => { setTitle(e.target.value); if (error) setError(''); }}
                  placeholder="What needs to be done?"
                  onFocus={() => setFocused('title')}
                  onBlur={() => setFocused(null)}
                  style={{
                    ...inputBase,
                    ...borderStyle('title'),
                    animation: error ? 'shake 0.3s ease' : 'none',
                  }}
                />
                {error && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '6px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <span style={{ fontSize: '12px', color: '#ef4444', fontWeight: '500' }}>{error}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label style={labelStyle}>Description</label>
                <textarea
                  className="modal-textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add more details about this task…"
                  rows={3}
                  onFocus={() => setFocused('desc')}
                  onBlur={() => setFocused(null)}
                  style={{
                    ...inputBase,
                    ...borderStyle('desc'),
                    resize: 'vertical',
                    minHeight: '88px',
                    lineHeight: 1.6,
                  }}
                />
                <div style={{ textAlign: 'right', marginTop: '4px' }}>
                  <span style={{ fontSize: '11px', color: dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.25)' }}>
                    {description.length} chars
                  </span>
                </div>
              </div>

              {/* Status — pill toggle */}
              <div>
                <label style={labelStyle}>Status</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[
                    {
                      value: 'pending', label: 'Pending', dot: '#f59e0b',
                      activeBg: 'rgba(245,158,11,0.12)', activeBorder: 'rgba(245,158,11,0.4)', activeColor: '#f59e0b',
                    },
                    {
                      value: 'completed', label: 'Completed', dot: '#22c55e',
                      activeBg: 'rgba(34,197,94,0.12)', activeBorder: 'rgba(34,197,94,0.4)', activeColor: '#22c55e',
                    },
                  ].map(({ value, label, dot, activeBg, activeBorder, activeColor }) => {
                    const active = status === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        className="status-pill"
                        onClick={() => setStatus(value)}
                        style={{
                          background: active ? activeBg : dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                          borderColor: active ? activeBorder : dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                          color: active ? activeColor : dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)',
                        }}
                      >
                        <span style={{
                          width: '7px', height: '7px', borderRadius: '50%',
                          background: active ? dot : dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                          display: 'inline-block', transition: 'background 0.2s',
                        }} />
                        {label}
                        {active && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              display: 'flex', justifyContent: 'flex-end', gap: '8px',
              padding: '16px 24px',
              borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
              background: dark ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.02)',
            }}>
              <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>
                Cancel
              </button>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}>
                      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.3"/>
                      <path d="M21 12a9 9 0 00-9-9"/>
                    </svg>
                    Saving…
                  </>
                ) : isEdit ? (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                      <polyline points="17 21 17 13 7 13 7 21"/>
                      <polyline points="7 3 7 8 15 8"/>
                    </svg>
                    Save changes
                  </>
                ) : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Create task
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TaskFormModal;