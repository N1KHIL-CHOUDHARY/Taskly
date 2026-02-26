import React, { useEffect, useState, useRef } from "react";

const TaskFormModal = ({ isOpen, onClose, onSubmit, initialTask, theme }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const titleRef = useRef(null);
  const isEdit = !!initialTask;
  const dark = theme === "dark";

  const TITLE_MAX = 80;
  const DESC_MAX = 500;

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setMounted(true));
    } else {
      setMounted(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || "");
      setDescription(initialTask.description || "");
      setStatus(initialTask.status || "pending");
    } else {
      setTitle("");
      setDescription("");
      setStatus("pending");
    }
    setError("");
    setLoading(false);
  }, [initialTask, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => titleRef.current?.focus(), 120);
      const handleKey = (e) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      titleRef.current?.focus();
      return;
    }
    setLoading(true);
    setError("");
    try {
      await onSubmit({ title: title.trim(), description: description.trim(), status });
      onClose();
    } catch (err) {
      setError(err.message || "Failed to save task");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const titleRemaining = TITLE_MAX - title.length;
  const titleNearLimit = titleRemaining <= 15;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          dark ? "bg-black/70" : "bg-black/40"
        } ${mounted ? "opacity-100" : "opacity-0"}`}
        style={{ backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
      >
        {/* Modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-lg overflow-hidden rounded-2xl transition-all duration-300 ${
            mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
          } ${
            dark
              ? "bg-[#16161f] shadow-[0_32px_64px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.07)]"
              : "bg-white shadow-[0_32px_64px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.07)]"
          }`}
        >
          {/* Top accent bar */}
          <div className="h-[3px] bg-gradient-to-r from-[#c8b89a] via-[#e8d5b7] to-[#c8b89a]" />

          {/* Header */}
          <div className="flex items-start justify-between gap-3 px-7 pt-6 pb-5">
            <div className="flex items-start gap-3">
              {/* Icon badge */}
              <div
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
                  dark
                    ? "border-[#c8b89a]/25 bg-[#c8b89a]/10"
                    : "border-[#c8b89a]/30 bg-[#c8b89a]/10"
                }`}
              >
                {isEdit ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c8b89a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c8b89a" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                )}
              </div>

              <div>
                <h2
                  className={`text-[17px] font-semibold tracking-tight ${
                    dark ? "text-[#f0ece4]" : "text-[#1a1a1a]"
                  }`}
                >
                  {isEdit ? "Edit task" : "New task"}
                </h2>
                <p
                  className={`mt-0.5 text-[13px] ${
                    dark ? "text-white/40" : "text-black/45"
                  }`}
                >
                  {isEdit ? "Update the details below" : "Fill in the details to get started"}
                </p>
              </div>
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-150 ${
                dark
                  ? "border-white/10 text-white/40 hover:border-white/20 hover:bg-white/8 hover:text-white/80"
                  : "border-black/10 text-black/40 hover:border-black/20 hover:bg-black/5 hover:text-black/80"
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className={`mx-7 h-px ${dark ? "bg-white/[0.07]" : "bg-black/[0.07]"}`} />

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-5 px-7 py-6">

              {/* Title field */}
              <div>
                <div className="mb-2 flex items-baseline justify-between">
                  <label
                    className={`text-[11px] font-semibold uppercase tracking-wider ${
                      dark ? "text-white/50" : "text-black/50"
                    }`}
                  >
                    Title <span className="text-[#c8b89a]">*</span>
                  </label>
                  <span
                    className={`text-[11px] transition-colors duration-200 ${
                      titleRemaining <= 0
                        ? "text-red-500"
                        : titleNearLimit
                        ? "text-amber-500"
                        : dark
                        ? "text-white/25"
                        : "text-black/25"
                    }`}
                  >
                    {titleRemaining} left
                  </span>
                </div>

                <input
                  ref={titleRef}
                  type="text"
                  value={title}
                  maxLength={TITLE_MAX}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="What needs to be done?"
                  className={`w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-150 ${
                    dark
                      ? "bg-white/5 text-[#f0ece4] placeholder-white/25"
                      : "bg-black/[0.04] text-[#1a1a1a] placeholder-black/30"
                  } ${
                    error
                      ? "border-2 border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : dark
                      ? "border border-white/10 focus:border-[#c8b89a] focus:ring-2 focus:ring-[#c8b89a]/15"
                      : "border border-black/10 focus:border-[#c8b89a] focus:ring-2 focus:ring-[#c8b89a]/15"
                  }`}
                />

                {error && (
                  <div className="mt-2 flex animate-[shake_300ms_ease] items-center gap-1.5 text-[12px] text-red-500">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {error}
                  </div>
                )}
              </div>

              {/* Description field */}
              <div>
                <div className="mb-2 flex items-baseline justify-between">
                  <label
                    className={`text-[11px] font-semibold uppercase tracking-wider ${
                      dark ? "text-white/50" : "text-black/50"
                    }`}
                  >
                    Description
                  </label>
                  <span
                    className={`text-[11px] transition-colors duration-200 ${
                      description.length >= DESC_MAX * 0.9
                        ? "text-amber-500"
                        : dark
                        ? "text-white/25"
                        : "text-black/25"
                    }`}
                  >
                    {description.length}/{DESC_MAX}
                  </span>
                </div>

                <textarea
                  value={description}
                  maxLength={DESC_MAX}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add more details about this task…"
                  rows={3}
                  style={{ minHeight: "80px", maxHeight: "200px" }}
                  className={`w-full resize-y rounded-xl px-4 py-3 text-sm leading-relaxed outline-none transition-all duration-150 ${
                    dark
                      ? "bg-white/5 text-[#f0ece4] placeholder-white/25 border border-white/10 focus:border-[#c8b89a] focus:ring-2 focus:ring-[#c8b89a]/15"
                      : "bg-black/[0.04] text-[#1a1a1a] placeholder-black/30 border border-black/10 focus:border-[#c8b89a] focus:ring-2 focus:ring-[#c8b89a]/15"
                  }`}
                />
              </div>

              {/* Status toggle */}
              <div>
                <label
                  className={`mb-3 block text-[11px] font-semibold uppercase tracking-wider ${
                    dark ? "text-white/50" : "text-black/50"
                  }`}
                >
                  Status
                </label>

                <div className="flex gap-2.5">
                  {/* Pending */}
                  <button
                    type="button"
                    onClick={() => setStatus("pending")}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
                      status === "pending"
                        ? "border-amber-500/35 bg-amber-500/10 text-amber-500"
                        : dark
                        ? "border-white/10 bg-white/[0.04] text-white/40 hover:border-white/20 hover:text-white/60"
                        : "border-black/10 bg-black/[0.03] text-black/40 hover:border-black/20 hover:text-black/60"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full transition-all duration-200 ${
                        status === "pending"
                          ? "bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.7)]"
                          : dark
                          ? "bg-white/20"
                          : "bg-black/20"
                      }`}
                    />
                    Pending
                  </button>

                  {/* Completed */}
                  <button
                    type="button"
                    onClick={() => setStatus("completed")}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
                      status === "completed"
                        ? "border-green-500/35 bg-green-500/10 text-green-500"
                        : dark
                        ? "border-white/10 bg-white/[0.04] text-white/40 hover:border-white/20 hover:text-white/60"
                        : "border-black/10 bg-black/[0.03] text-black/40 hover:border-black/20 hover:text-black/60"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full transition-all duration-200 ${
                        status === "completed"
                          ? "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.7)]"
                          : dark
                          ? "bg-white/20"
                          : "bg-black/20"
                      }`}
                    />
                    Completed
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className={`flex items-center justify-end gap-2.5 border-t px-7 py-4 ${
                dark ? "border-white/[0.07] bg-black/20" : "border-black/[0.07] bg-black/[0.03]"
              }`}
            >
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className={`rounded-xl border px-5 py-2 text-[13px] font-medium transition-all duration-150 disabled:opacity-50 ${
                  dark
                    ? "border-white/[0.12] text-white/55 hover:border-white/25 hover:text-white/90"
                    : "border-black/[0.12] text-black/55 hover:border-black/25 hover:text-black/90"
                }`}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-[#d4c4a0] to-[#c8b89a] px-5 py-2 text-[13px] font-semibold text-black shadow-[0_2px_12px_rgba(200,184,154,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,184,154,0.55)] disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
                    </svg>
                    Saving…
                  </>
                ) : isEdit ? (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Save changes
                  </>
                ) : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Create task
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
      `}</style>
    </>
  );
};

export default TaskFormModal;