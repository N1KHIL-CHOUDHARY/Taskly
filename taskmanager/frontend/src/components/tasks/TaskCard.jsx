import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StatusBadge = ({ status }) => {
  const configs = {
    completed: { bg: 'rgba(34, 197, 94, 0.12)', color: '#22c55e', label: 'Completed', dot: '#22c55e' },
    pending: { bg: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b', label: 'Pending', dot: '#f59e0b' },
  };
  const cfg = configs[status] || { bg: 'rgba(156,163,175,0.12)', color: '#9ca3af', label: status, dot: '#9ca3af' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      background: cfg.bg, color: cfg.color,
      padding: '4px 10px', borderRadius: '20px',
      fontSize: '12px', fontWeight: '600', flexShrink: 0,
    }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: cfg.dot, display: 'inline-block' }} />
      {cfg.label}
    </span>
  );
};

const TaskCard = ({ task, onEdit, onDelete, theme }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [deleteHovered, setDeleteHovered] = useState(false);
  const [editHovered, setEditHovered] = useState(false);
  const dark = theme === 'dark';

  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: dark
            ? hovered ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)'
            : hovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.85)',
          border: `1px solid ${dark
            ? hovered ? 'rgba(200,184,154,0.25)' : 'rgba(255,255,255,0.08)'
            : hovered ? 'rgba(200,184,154,0.4)' : 'rgba(0,0,0,0.08)'}`,
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          transition: 'all 0.2s ease',
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          boxShadow: hovered
            ? dark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.08)'
            : 'none',
          cursor: 'default',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Subtle top accent line on hover */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: task.status === 'completed' ? '#22c55e' : '#c8b89a',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.2s ease',
          borderRadius: '16px 16px 0 0',
        }} />

        {/* Title + badge */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
          <h3
            onClick={() => navigate(`/tasks/${task._id}`)}
            style={{
              margin: 0,
              fontSize: '15px',
              fontWeight: '600',
              color: dark ? (hovered ? '#fff' : 'rgba(255,255,255,0.9)') : (hovered ? '#1a1a24' : '#2d2d3a'),
              cursor: 'pointer',
              lineHeight: 1.4,
              letterSpacing: '-0.2px',
              transition: 'color 0.15s ease',
              flex: 1,
            }}
          >
            {task.title}
          </h3>
          <StatusBadge status={task.status} />
        </div>

        {/* Description */}
        {task.description && (
          <p style={{
            margin: 0,
            fontSize: '13px',
            color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {task.description}
          </p>
        )}

        {/* Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '12px',
          borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
          gap: '12px',
          flexWrap: 'wrap',
        }}>
          {/* Date */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'} strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span style={{ fontSize: '12px', color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)', fontWeight: '500' }}>
              {formattedDate}
            </span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {/* Edit */}
            <button
              onClick={() => onEdit(task)}
              onMouseEnter={() => setEditHovered(true)}
              onMouseLeave={() => setEditHovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 12px',
                borderRadius: '8px',
                border: `1px solid ${dark
                  ? editHovered ? 'rgba(200,184,154,0.5)' : 'rgba(255,255,255,0.12)'
                  : editHovered ? 'rgba(200,184,154,0.7)' : 'rgba(0,0,0,0.1)'}`,
                background: editHovered
                  ? dark ? 'rgba(200,184,154,0.1)' : 'rgba(200,184,154,0.08)'
                  : 'transparent',
                color: editHovered ? '#c8b89a' : dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)',
                fontSize: '12px',
                fontWeight: '600',
                fontFamily: "'DM Sans', sans-serif",
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit
            </button>

            {/* Delete */}
            <button
              onClick={() => onDelete(task._id)}
              onMouseEnter={() => setDeleteHovered(true)}
              onMouseLeave={() => setDeleteHovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 12px',
                borderRadius: '8px',
                border: `1px solid ${deleteHovered ? 'rgba(239,68,68,0.4)' : dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}`,
                background: deleteHovered ? 'rgba(239,68,68,0.08)' : 'transparent',
                color: deleteHovered ? '#ef4444' : dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)',
                fontSize: '12px',
                fontWeight: '600',
                fontFamily: "'DM Sans', sans-serif",
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskCard;