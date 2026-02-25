import React, { useCallback, useState } from 'react';
import useTasks from '../hooks/useTasks';
import TaskCard from '../components/tasks/TaskCard';
import TaskFormModal from '../components/tasks/TaskFormModal';
import Pagination from '../components/common/Pagination';

const DashboardPage = ({ theme, toggleTheme }) => {
  const { tasks, pagination, filters, loading, error, reload, createTask, updateTask, deleteTask } =
    useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [localSearch, setLocalSearch] = useState(filters.search || '');
  const [localStatus, setLocalStatus] = useState(filters.status || '');
  const [searchFocused, setSearchFocused] = useState(false);

  const dark = theme === 'dark';

  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    await deleteTask(id);
  };

  const handleFilterApply = useCallback(() => {
    reload({ page: 1, status: localStatus || undefined, search: localSearch || undefined });
  }, [reload, localStatus, localSearch]);

  const handlePageChange = (page) => reload({ page });

  const handleSubmitTask = async (payload) => {
    if (editingTask) {
      await updateTask(editingTask._id, payload);
    } else {
      await createTask(payload);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleFilterApply();
  };

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const pendingCount = tasks.filter(t => t.status === 'pending').length;

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
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .task-grid-item {
          animation: fadeUp 0.4s ease forwards;
        }
        .dash-btn {
          padding: 10px 20px;
          border-radius: 10px;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .dash-btn-primary {
          background: #c8b89a;
          color: #1a1a24;
        }
        .dash-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(200, 184, 154, 0.4);
        }
        .dash-btn-secondary {
          border: 1.5px solid;
        }
        .filter-input {
          background: transparent;
          border: none;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          flex: 1;
          min-width: 0;
        }
        .stat-card {
          border-radius: 14px;
          padding: 20px 24px;
          flex: 1;
          transition: transform 0.2s ease;
        }
        .stat-card:hover {
          transform: translateY(-2px);
        }
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
        
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '36px', fontWeight: '400', color: dark ? '#fff' : '#1a1a24', margin: 0, letterSpacing: '-0.5px' }}>
              My Tasks
            </h1>
            <p style={{ color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)', fontSize: '14px', margin: '6px 0 0' }}>
              {tasks.length > 0 ? `${tasks.length} task${tasks.length !== 1 ? 's' : ''} total` : 'Nothing here yet'}
            </p>
          </div>
          <button className="dash-btn dash-btn-primary" onClick={handleOpenCreate}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New Task
          </button>
        </div>

       
        {tasks.length > 0 && (
          <div style={{ display: 'flex', gap: '14px', marginBottom: '28px', flexWrap: 'wrap' }}>
            {[
              { label: 'Total', count: tasks.length, color: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', textColor: dark ? '#fff' : '#1a1a24' },
              { label: 'Pending', count: pendingCount, color: 'rgba(245, 158, 11, 0.12)', textColor: '#f59e0b' },
              { label: 'Completed', count: completedCount, color: 'rgba(34, 197, 94, 0.12)', textColor: '#22c55e' },
            ].map(({ label, count, color, textColor }) => (
              <div key={label} className="stat-card" style={{ background: color, minWidth: '120px' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', color: textColor, lineHeight: 1 }}>{count}</div>
                <div style={{ fontSize: '12px', color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)', marginTop: '4px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
              </div>
            ))}
          </div>
        )}

       
        <div style={{
          background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.8)',
          border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
          borderRadius: '14px',
          padding: '16px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '28px',
        }}>
          {/* Search */}
          <div style={{
            flex: 1,
            minWidth: '200px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
            borderRadius: '10px',
            padding: '10px 14px',
            border: searchFocused ? '1.5px solid #c8b89a' : `1.5px solid transparent`,
            transition: 'border 0.2s',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)'} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              className="filter-input"
              placeholder="Search tasks..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              onKeyDown={handleKeyDown}
              style={{ color: dark ? '#fff' : '#1a1a24' }}
            />
            {localSearch && (
              <button onClick={() => { setLocalSearch(''); reload({ page: 1, search: undefined, status: localStatus || undefined }); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)'} strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}
          </div>

          {/* Status select */}
          <select
            value={localStatus}
            onChange={(e) => setLocalStatus(e.target.value)}
            style={{
              background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
              border: `1.5px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              borderRadius: '10px',
              padding: '10px 14px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
              color: dark ? '#fff' : '#1a1a24',
              cursor: 'pointer',
              outline: 'none',
              minWidth: '130px',
            }}
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <button className="dash-btn dash-btn-primary" onClick={handleFilterApply} style={{ padding: '10px 18px' }}>
            Apply
          </button>
        </div>

        {/* Task list */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '80px', flexDirection: 'column', gap: '16px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c8b89a" strokeWidth="2" style={{ animation: 'spin 0.8s linear infinite' }}>
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.2"/>
              <path d="M21 12a9 9 0 00-9-9"/>
            </svg>
            <span style={{ color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)', fontSize: '14px' }}>Loading tasks...</span>
          </div>
        )}

        {!loading && error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: '12px',
            padding: '16px 20px',
            color: '#ef4444',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {error}
          </div>
        )}

        {!loading && !error && tasks.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 40px',
            background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.6)',
            border: `1.5px dashed ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            borderRadius: '20px',
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: dark ? 'rgba(200,184,154,0.1)' : 'rgba(200,184,154,0.15)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c8b89a" strokeWidth="1.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
            </div>
            <p style={{ fontWeight: '600', fontSize: '16px', color: dark ? '#fff' : '#1a1a24', margin: '0 0 8px' }}>
              {localSearch || localStatus ? 'No matching tasks' : 'No tasks yet'}
            </p>
            <p style={{ fontSize: '14px', color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', margin: '0 0 24px' }}>
              {localSearch || localStatus ? 'Try adjusting your filters.' : 'Create your first task to get started.'}
            </p>
            {!localSearch && !localStatus && (
              <button className="dash-btn dash-btn-primary" onClick={handleOpenCreate}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Create a task
              </button>
            )}
          </div>
        )}

        {!loading && !error && tasks.length > 0 && (
          <>
            <div style={{ display: 'grid', gap: '14px', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
              {tasks.map((task, i) => (
                <div key={task._id} className="task-grid-item" style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}>
                  <TaskCard task={task} onEdit={handleEdit} onDelete={handleDelete} theme={theme} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: '28px' }}>
              <Pagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitTask}
        initialTask={editingTask}
        theme={theme}
      />
    </div>
  );
};

export default DashboardPage;