import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTaskById } from "../services/taskService";

// ── Status Badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const cfg = {
    completed: {
      dot: "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.7)]",
      pill: "border-green-500/30 bg-green-500/10 text-green-500",
    },
    pending: {
      dot: "bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.7)]",
      pill: "border-amber-500/30 bg-amber-500/10 text-amber-500",
    },
  }[status] ?? {
    dot: "bg-gray-400",
    pill: "border-gray-400/30 bg-gray-400/10 text-gray-400",
  };

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold ${cfg.pill}`}>
      <span className={`h-2 w-2 shrink-0 rounded-full ${cfg.dot}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// ── Skeleton loader ───────────────────────────────────────────────────────────
const Skeleton = ({ dark }) => (
  <div className="space-y-6">
    {/* Title skeleton */}
    <div className="flex items-start justify-between gap-4">
      <div className={`h-8 w-2/3 animate-pulse rounded-lg ${dark ? "bg-white/[0.08]" : "bg-black/[0.07]"}`} />
      <div className={`h-7 w-24 animate-pulse rounded-full ${dark ? "bg-white/[0.08]" : "bg-black/[0.07]"}`} />
    </div>
    {/* Meta skeleton */}
    <div className={`h-px w-full ${dark ? "bg-white/[0.07]" : "bg-black/[0.07]"}`} />
    <div className="flex gap-8">
      {[140, 160].map((w) => (
        <div key={w} className="space-y-2">
          <div className={`h-3 w-12 animate-pulse rounded ${dark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`} />
          <div className={`h-4 animate-pulse rounded ${dark ? "bg-white/[0.08]" : "bg-black/[0.07]"}`} style={{ width: w }} />
        </div>
      ))}
    </div>
    {/* Description skeleton */}
    <div className={`h-px w-full ${dark ? "bg-white/[0.07]" : "bg-black/[0.07]"}`} />
    <div className="space-y-2.5">
      {[100, 85, 70].map((pct) => (
        <div key={pct} className={`h-4 animate-pulse rounded ${dark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`} style={{ width: `${pct}%` }} />
      ))}
    </div>
  </div>
);

// ── Main page ─────────────────────────────────────────────────────────────────
const TaskDetailPage = ({ theme, toggleTheme }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dark = theme === "dark";

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchTaskById(id);
        setTask(data.data);
      } catch (err) {
        setError(err.message || "Failed to load task");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // Relative time helper
  const relativeTime = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? "bg-[#0f0f13]" : "bg-[#f5f3ef]"}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .task-detail-animate { animation: fadeUp 0.4s ease forwards; }
      `}</style>

      {/* ── Sticky nav ── */}
      <header
        className={`sticky top-0 z-20 border-b transition-colors duration-300 ${
          dark
            ? "border-white/[0.07] bg-[#0f0f13]/80"
            : "border-black/[0.07] bg-[#f5f3ef]/80"
        }`}
        style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
      >
        <div className="mx-auto flex h-[60px] max-w-[800px] items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c8b89a]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1a1a24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
            </div>
            <span className={`text-[15px] font-bold tracking-tight ${dark ? "text-white" : "text-[#1a1a24]"}`}>
              Taskly
            </span>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-150 ${
              dark
                ? "border-white/10 bg-white/[0.06] hover:bg-white/[0.10]"
                : "border-black/10 bg-black/[0.05] hover:bg-black/[0.08]"
            }`}
          >
            {dark ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c8b89a" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="5" />
                {[0,45,90,135,180,225,270,315].map((deg, i) => {
                  const r = (deg * Math.PI) / 180;
                  return (
                    <line key={i}
                      x1={(12 + 8  * Math.cos(r)).toFixed(2)} y1={(12 + 8  * Math.sin(r)).toFixed(2)}
                      x2={(12 + 10 * Math.cos(r)).toFixed(2)} y2={(12 + 10 * Math.sin(r)).toFixed(2)}
                    />
                  );
                })}
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2d2d3a" strokeWidth="2" strokeLinecap="round">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="mx-auto max-w-[800px] px-6 py-10">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className={`group mb-8 flex items-center gap-2 text-[14px] font-medium transition-all duration-150 ${
            dark ? "text-white/45 hover:text-white/80" : "text-black/45 hover:text-black/80"
          }`}
        >
          <svg
            className="transition-transform duration-150 group-hover:-translate-x-1"
            width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to tasks
        </button>

        {/* ── Loading ── */}
        {loading && (
          <div
            className={`rounded-2xl border p-9 ${
              dark
                ? "border-white/[0.08] bg-white/[0.04]"
                : "border-black/[0.08] bg-white/85"
            }`}
            style={{ backdropFilter: "blur(12px)" }}
          >
            <Skeleton dark={dark} />
          </div>
        )}

        {/* ── Error ── */}
        {!loading && (error || !task) && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/[0.07] px-8 py-14 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p className="mb-1 text-[16px] font-semibold text-red-500">
              {error ? "Something went wrong" : "Task not found"}
            </p>
            <p className="mb-6 text-[13px] text-red-500/65">
              {error || "This task may have been deleted or doesn't exist."}
            </p>
            <button
              onClick={() => navigate(-1)}
              className="rounded-xl border border-red-500/25 px-5 py-2 text-[13px] font-medium text-red-500/80 transition-all duration-150 hover:border-red-500/40 hover:text-red-500"
            >
              ← Go back
            </button>
          </div>
        )}

        {/* ── Task card ── */}
        {!loading && !error && task && (
          <div className="task-detail-animate">
            <div
              className={`overflow-hidden rounded-2xl border ${
                dark
                  ? "border-white/[0.08] bg-white/[0.04]"
                  : "border-black/[0.08] bg-white/85"
              }`}
              style={{ backdropFilter: "blur(12px)" }}
            >
              {/* Status accent bar */}
              <div
                className={`h-[3px] ${
                  task.status === "completed"
                    ? "bg-gradient-to-r from-green-500/60 via-green-400 to-green-500/60"
                    : "bg-gradient-to-r from-amber-500/60 via-amber-400 to-amber-500/60"
                }`}
              />

              <div className="p-9">
                {/* Title + badge */}
                <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                  <h1
                    className={`flex-1 text-[28px] font-normal leading-snug tracking-tight ${
                      dark ? "text-white" : "text-[#1a1a24]"
                    }`}
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {task.title}
                  </h1>
                  <StatusBadge status={task.status} />
                </div>

                {/* Meta row */}
                <div className={`flex flex-wrap gap-6 border-t py-5 ${dark ? "border-white/[0.07]" : "border-black/[0.07]"}`}>
                  {[
                    {
                      label: "Created",
                      value: new Date(task.createdAt).toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }),
                      relative: relativeTime(task.createdAt),
                      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                    },
                    {
                      label: "Last updated",
                      value: new Date(task.updatedAt).toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }),
                      relative: relativeTime(task.updatedAt),
                      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                    },
                  ].map(({ label, value, relative, icon }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                          dark ? "bg-white/[0.06]" : "bg-black/[0.05]"
                        }`}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c8b89a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={icon} />
                        </svg>
                      </div>
                      <div>
                        <div className={`text-[11px] font-semibold uppercase tracking-wider ${dark ? "text-white/35" : "text-black/35"}`}>
                          {label}
                        </div>
                        <div className={`mt-0.5 text-[13px] font-medium ${dark ? "text-white/65" : "text-black/65"}`}>
                          {value}
                        </div>
                        <div className={`text-[11px] ${dark ? "text-white/30" : "text-black/30"}`}>
                          {relative}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                {task.description ? (
                  <div className={`border-t pt-6 ${dark ? "border-white/[0.07]" : "border-black/[0.07]"}`}>
                    <h2 className={`mb-3 text-[11px] font-semibold uppercase tracking-widest ${dark ? "text-white/35" : "text-black/35"}`}>
                      Description
                    </h2>
                    <p
                      className={`whitespace-pre-line text-[15px] leading-[1.75] ${
                        dark ? "text-white/72" : "text-black/68"
                      }`}
                    >
                      {task.description}
                    </p>
                  </div>
                ) : (
                  <div className={`border-t pt-6 ${dark ? "border-white/[0.07]" : "border-black/[0.07]"}`}>
                    <p className={`text-[14px] italic ${dark ? "text-white/25" : "text-black/25"}`}>
                      No description provided.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer action bar */}
              <div className={`flex items-center justify-between border-t px-9 py-4 ${dark ? "border-white/[0.07] bg-black/20" : "border-black/[0.07] bg-black/[0.03]"}`}>
                <span className={`text-[12px] ${dark ? "text-white/25" : "text-black/25"}`}>
                  ID: <span className="font-mono">{task._id}</span>
                </span>
                <button
                  onClick={() => navigate(-1)}
                  className={`flex items-center gap-1.5 rounded-lg border px-4 py-1.5 text-[13px] font-medium transition-all duration-150 ${
                    dark
                      ? "border-white/[0.10] text-white/50 hover:border-white/20 hover:text-white/80"
                      : "border-black/[0.10] text-black/50 hover:border-black/20 hover:text-black/80"
                  }`}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  Back
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TaskDetailPage;