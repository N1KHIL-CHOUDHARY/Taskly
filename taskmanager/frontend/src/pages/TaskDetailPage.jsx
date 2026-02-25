import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTaskById } from '../services/taskService';

const StatusBadge = ({ status }) => {
  const configs = {
    completed: { bg: 'rgba(34, 197, 94, 0.12)', color: '#22c55e', label: 'Completed', dot: '#22c55e' },
    pending: { bg: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b', label: 'Pending', dot: '#f59e0b' },
  };
  const cfg = configs[status] || { bg: 'rgba(156,163,175,0.12)', color: '#9ca3af', label: status, dot: '#9ca3af' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      background: cfg.bg, color: cfg.color,
      padding: '5px 12px', borderRadius: '20px',
      fontSize: '13px', fontWeight: '600',
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: cfg.dot, display: 'inline-block' }} />
      {cfg.label}
    </span>
  );
};

const TaskDetailPage = ({ theme, toggleTheme }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const dark = theme === 'dark';

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchTaskById(id);
        setTask(data.data);
      } catch (err) {
        setError(err.message || 'Failed to load task');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  return (
    <div style={{
      minHeight: '100vh',
      background: dark ? '#0f0f13' : '#f5f3ef',
      fontFamily: "'DM Sans', sans-serif",
      transition: 'background 0.3s ease',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          padding: 8px 0;
          transition: gap 0.2s ease;
        }
        .back-btn:hover { gap: 12px; }
      `}</style>

      {/* Top nav */}
      <div style={{
        borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
        background: dark ? 'rgba(15,15,19,0.8)' : 'rgba(245,243,239,0.8)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '30px', height: '30px', background: '#c8b89a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a24" strokeWidth="2.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
            </div>
            <span style={{ fontWeight: '700', fontSize: '16px', color: dark ? '#fff' : '#1a1a24', letterSpacing: '-0.3px' }}>Taskly</span>
          </div>
          <button
            onClick={toggleTheme}
            style={{ background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)', border: 'none', borderRadius: '10px', width: '38px', height: '38px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Toggle theme"
          >
            {dark
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8b89a" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2d2d3a" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            }
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Back button */}
        <button className="back-btn" onClick={() => navigate(-1)} style={{ color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', marginBottom: '28px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to tasks
        </button>

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '80px', flexDirection: 'column', gap: '16px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c8b89a" strokeWidth="2" style={{ animation: 'spin 0.8s linear infinite' }}>
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.2"/>
              <path d="M21 12a9 9 0 00-9-9"/>
            </svg>
            <span style={{ color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)', fontSize: '14px' }}>Loading task...</span>
          </div>
        )}

        {!loading && (error || !task) && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: '16px',
            padding: '32px',
            textAlign: 'center',
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5" style={{ margin: '0 auto 16px', display: 'block' }}>
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p style={{ color: '#ef4444', fontSize: '15px', fontWeight: '500', margin: 0 }}>{error || 'Task not found'}</p>
          </div>
        )}

        {!loading && !error && task && (
          <div style={{ animation: 'fadeUp 0.4s ease forwards' }}>
            {/* Main card */}
            <div style={{
              background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.85)',
              border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              borderRadius: '20px',
              padding: '36px',
              backdropFilter: 'blur(12px)',
            }}>
              {/* Title + status */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
                <h1 style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: '28px',
                  fontWeight: '400',
                  color: dark ? '#fff' : '#1a1a24',
                  margin: 0,
                  letterSpacing: '-0.3px',
                  lineHeight: 1.3,
                  flex: 1,
                }}>
                  {task.title}
                </h1>
                <StatusBadge status={task.status} />
              </div>

              {/* Meta */}
              <div style={{
                display: 'flex',
                gap: '24px',
                flexWrap: 'wrap',
                paddingTop: '20px',
                borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
                marginBottom: task.description ? '28px' : 0,
              }}>
                {[
                  { label: 'Created', value: new Date(task.createdAt).toLocaleString() },
                  { label: 'Updated', value: new Date(task.updatedAt).toLocaleString() },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div style={{ fontSize: '11px', color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{label}</div>
                    <div style={{ fontSize: '13px', color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              {task.description && (
                <div style={{ borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`, paddingTop: '24px' }}>
                  <h2 style={{ fontSize: '12px', fontWeight: '600', color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>Description</h2>
                  <p style={{
                    fontSize: '15px',
                    color: dark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.7)',
                    lineHeight: 1.7,
                    whiteSpace: 'pre-line',
                    margin: 0,
                  }}>
                    {task.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetailPage;