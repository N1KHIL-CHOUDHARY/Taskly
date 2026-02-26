import React, { useCallback, useState } from "react";
import useTasks from "../hooks/useTasks";
import TaskCard from "../components/tasks/TaskCard";
import TaskFormModal from "../components/tasks/TaskFormModal";
import Pagination from "../components/common/Pagination";

const DashboardPage = ({ theme }) => {
  const {
    tasks,
    pagination,
    filters,
    loading,
    error,
    reload,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [localSearch, setLocalSearch] = useState(filters.search || "");
  const [localStatus, setLocalStatus] = useState(filters.status || "");
  const [searchFocused, setSearchFocused] = useState(false);

  const dark = theme === "dark";

  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    await deleteTask(id);
  };

  const handleFilterApply = useCallback(() => {
    reload({
      page: 1,
      status: localStatus || undefined,
      search: localSearch || undefined,
    });
  }, [reload, localStatus, localSearch]);

  const handleClearFilters = () => {
    setLocalSearch("");
    setLocalStatus("");
    reload({ page: 1, status: undefined, search: undefined });
  };

  const handlePageChange = (page) => reload({ page });

  const handleSubmitTask = async (payload) => {
    if (editingTask) {
      await updateTask(editingTask._id, payload);
    } else {
      await createTask(payload);
    }
  };

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const pendingCount = tasks.filter((t) => t.status === "pending").length;
  const hasFilters = localSearch || localStatus;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? "bg-[#0f0f13]" : "bg-[#f5f3ef]"}`}>
      <div className="mx-auto max-w-[1100px] px-6 py-10">

        {/* ── Header ── */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className={`mb-1 text-[11px] font-semibold uppercase tracking-widest ${dark ? "text-[#c8b89a]/60" : "text-[#c8b89a]"}`}>
              Dashboard
            </p>
            <h1 className={`font-serif text-4xl tracking-tight ${dark ? "text-white" : "text-[#1a1a24]"}`}>
              My Tasks
            </h1>
            <p className={`mt-1.5 text-sm ${dark ? "text-white/40" : "text-black/45"}`}>
              {loading
                ? "Loading…"
                : tasks.length > 0
                ? `${pagination.total ?? tasks.length} task${(pagination.total ?? tasks.length) !== 1 ? "s" : ""} · Page ${pagination.page} of ${pagination.totalPages}`
                : "Nothing here yet — create your first task"}
            </p>
          </div>

          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 rounded-xl bg-[#c8b89a] px-5 py-2.5 text-sm font-semibold text-[#1a1a24] shadow-[0_2px_12px_rgba(200,184,154,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,184,154,0.5)]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Task
          </button>
        </div>

        {/* ── Stats ── */}
        {tasks.length > 0 && (
          <div className="mb-7 flex flex-wrap gap-3">
            {[
              {
                label: "Total",
                count: tasks.length,
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                ),
                cardCls: dark ? "bg-white/[0.06] border-white/[0.08]" : "bg-white border-black/[0.08]",
                textCls: dark ? "text-white" : "text-[#1a1a24]",
                iconCls: dark ? "text-white/40" : "text-black/35",
                labelCls: dark ? "text-white/40" : "text-black/45",
              },
              {
                label: "Pending",
                count: pendingCount,
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
                cardCls: "bg-amber-500/[0.08] border-amber-500/20",
                textCls: "text-amber-500",
                iconCls: "text-amber-500/60",
                labelCls: "text-amber-500/70",
              },
              {
                label: "Completed",
                count: completedCount,
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ),
                cardCls: "bg-green-500/[0.08] border-green-500/20",
                textCls: "text-green-500",
                iconCls: "text-green-500/60",
                labelCls: "text-green-500/70",
              },
            ].map(({ label, count, icon, cardCls, textCls, iconCls, labelCls }) => (
              <div
                key={label}
                className={`flex min-w-[130px] flex-1 items-center gap-4 rounded-xl border px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 ${cardCls}`}
              >
                <div className={`shrink-0 ${iconCls}`}>{icon}</div>
                <div>
                  <div className={`text-2xl font-bold leading-none ${textCls}`}>{count}</div>
                  <div className={`mt-1 text-[11px] font-semibold uppercase tracking-wider ${labelCls}`}>
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Filters ── */}
        <div
          className={`mb-7 flex flex-wrap items-center gap-3 rounded-xl border p-3 ${
            dark ? "bg-white/[0.04] border-white/[0.08]" : "bg-white border-black/[0.08]"
          }`}
        >
          {/* Search */}
          <div
            className={`flex min-w-[200px] flex-1 items-center gap-2.5 rounded-lg px-4 py-2.5 transition-all duration-150 ${
              dark ? "bg-white/[0.07]" : "bg-black/[0.04]"
            } ${searchFocused ? "ring-2 ring-[#c8b89a]/50" : "ring-1 ring-transparent"}`}
          >
            <svg
              className={`shrink-0 transition-colors ${searchFocused ? "text-[#c8b89a]" : dark ? "text-white/30" : "text-black/30"}`}
              width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className={`flex-1 bg-transparent text-sm outline-none ${
                dark ? "text-white placeholder-white/30" : "text-[#1a1a24] placeholder-black/30"
              }`}
              placeholder="Search tasks…"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              onKeyDown={(e) => e.key === "Enter" && handleFilterApply()}
            />
            {localSearch && (
              <button
                onClick={() => setLocalSearch("")}
                className={`shrink-0 transition-opacity hover:opacity-70 ${dark ? "text-white/40" : "text-black/40"}`}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

            
          <select
            value={localStatus}
            onChange={(e) => setLocalStatus(e.target.value)}
            className={`cursor-pointer rounded-lg px-4 py-2.5 text-sm outline-none transition-all duration-150 ${
              dark
                ? "bg-white/[0.07] text-white border border-white/[0.08] focus:border-[#c8b89a]/50 focus:ring-2 focus:ring-[#c8b89a]/20"
                : "bg-black/[0.04] text-[#1a1a24] border border-black/[0.08] focus:border-[#c8b89a]/60 focus:ring-2 focus:ring-[#c8b89a]/20"
            }`}
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <button
            onClick={handleFilterApply}
            className="rounded-lg bg-[#c8b89a] px-5 py-2.5 text-sm font-semibold text-[#1a1a24] shadow-[0_2px_8px_rgba(200,184,154,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(200,184,154,0.45)]"
          >
            Apply
          </button>

          {hasFilters && (
            <button
              onClick={handleClearFilters}
              className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-150 ${
                dark
                  ? "border-white/10 text-white/50 hover:border-white/20 hover:text-white/80"
                  : "border-black/10 text-black/50 hover:border-black/20 hover:text-black/80"
              }`}
            >
              Clear
            </button>
          )}
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 py-24">
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 rounded-full border-4 border-[#c8b89a]/15" />
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#c8b89a]" />
            </div>
            <span className={`text-sm ${dark ? "text-white/40" : "text-black/40"}`}>
              Loading tasks…
            </span>
          </div>
        )}

        {/* ── Error ── */}
        {!loading && error && (
          <div className="flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/[0.08] px-5 py-4 text-red-500">
            <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <p className="text-sm font-semibold">Something went wrong</p>
              <p className="mt-0.5 text-[13px] opacity-75">{error}</p>
            </div>
          </div>
        )}

        {/* ── Empty State ── */}
        {!loading && !error && tasks.length === 0 && (
          <div
            className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-10 py-24 text-center ${
              dark ? "border-white/[0.08] bg-white/[0.02]" : "border-black/[0.08] bg-white/60"
            }`}
          >
            <div
              className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border ${
                dark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"
              }`}
            >
              {hasFilters ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8b89a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8b89a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <line x1="12" y1="14" x2="12" y2="18" />
                  <line x1="10" y1="16" x2="14" y2="16" />
                </svg>
              )}
            </div>

            <p className={`mb-1.5 text-base font-semibold ${dark ? "text-white" : "text-[#1a1a24]"}`}>
              {hasFilters ? "No matching tasks" : "No tasks yet"}
            </p>
            <p className={`mb-6 max-w-xs text-sm leading-relaxed ${dark ? "text-white/40" : "text-black/45"}`}>
              {hasFilters
                ? "Try adjusting your search or filters to find what you're looking for."
                : "Create your first task to get started — it only takes a second."}
            </p>

            {hasFilters ? (
              <button
                onClick={handleClearFilters}
                className={`rounded-lg border px-5 py-2 text-sm font-medium transition-all duration-150 ${
                  dark
                    ? "border-white/[0.12] text-white/60 hover:border-white/25 hover:text-white"
                    : "border-black/[0.12] text-black/60 hover:border-black/25 hover:text-black"
                }`}
              >
                Clear filters
              </button>
            ) : (
              <button
                onClick={handleOpenCreate}
                className="flex items-center gap-2 rounded-xl bg-[#c8b89a] px-5 py-2.5 text-sm font-semibold text-[#1a1a24] shadow-[0_2px_12px_rgba(200,184,154,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,184,154,0.5)]"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Create first task
              </button>
            )}
          </div>
        )}

        {/* ── Tasks Grid ── */}
        {!loading && !error && tasks.length > 0 && (
          <>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  theme={theme}
                />
              ))}
            </div>

            <div className="mt-7">
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