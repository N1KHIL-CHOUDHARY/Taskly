import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RegisterPage = ({ theme, toggleTheme }) => {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(null);

  const dark = theme === "dark";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register({ name, email, password });
    } catch (err) {
      setError(err.message || "Failed to register");
      setLoading(false);
    }
  };

  // Password strength
  const strength =
    password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthMeta = [
    null,
    { label: "Weak",   color: "text-red-500",   bar: "bg-red-500"   },
    { label: "Good",   color: "text-amber-500", bar: "bg-amber-500" },
    { label: "Strong", color: "text-green-500", bar: "bg-green-500" },
  ][strength];

  // Field completion for progress bar
  const filledCount = [name, email, password].filter(Boolean).length;

  return (
    <div
      className={`relative flex min-h-screen items-center justify-center px-6 py-14 transition-colors duration-300 ${
        dark ? "bg-[#0f0f13]" : "bg-[#f5f3ef]"
      }`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%,60%  { transform: translateX(-5px); }
          40%,80%  { transform: translateX(5px); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .reg-animate  { animation: fadeUp 0.45s ease forwards; }
        .error-shake  { animation: shake 0.35s ease; }
        .btn-spin     { animation: spin 0.8s linear infinite; }
      `}</style>

      

      {/* Card */}
      <div className="reg-animate w-full max-w-[420px]">

        {/* Logo */}
        <div className="mb-9 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c8b89a] shadow-[0_4px_14px_rgba(200,184,154,0.45)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
          </div>
          <span className={`text-[16px] font-bold tracking-tight ${dark ? "text-white" : "text-[#1a1a24]"}`}>
            Taskly
          </span>
        </div>

        {/* Heading */}
        <h1
          className={`text-[34px] font-normal leading-tight tracking-tight ${dark ? "text-white" : "text-[#1a1a24]"}`}
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Create your account
        </h1>
        <p className={`mb-7 mt-2 text-[15px] ${dark ? "text-white/45" : "text-black/45"}`}>
          Start organizing your tasks in minutes.
        </p>

        {/* Progress bar */}
        <div className="mb-7">
          <div className="mb-2 flex items-center justify-between">
            <span className={`text-[11px] font-semibold uppercase tracking-wider ${dark ? "text-white/35" : "text-black/35"}`}>
              Progress
            </span>
            <span className={`text-[11px] font-semibold ${dark ? "text-white/35" : "text-black/35"}`}>
              {filledCount} / 3 fields
            </span>
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-[3px] flex-1 rounded-full transition-all duration-300 ${
                  i < filledCount
                    ? "bg-[#c8b89a]"
                    : dark
                    ? "bg-white/[0.10]"
                    : "bg-black/[0.10]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

          {/* Full name */}
          <div>
            <label className={`mb-1.5 block text-[12px] font-semibold uppercase tracking-wider ${dark ? "text-white/50" : "text-black/50"}`}>
              Full name
            </label>
            <div className="relative">
              <span className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${dark ? "text-white/25" : "text-black/25"}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                className={`w-full rounded-xl py-3 pl-11 pr-4 text-[15px] outline-none transition-all duration-150 ${
                  dark
                    ? "bg-white/[0.06] text-white placeholder-white/25"
                    : "bg-black/[0.04] text-[#1a1a24] placeholder-black/25"
                } ${
                  focused === "name"
                    ? "border-2 border-[#c8b89a] ring-2 ring-[#c8b89a]/15"
                    : dark
                    ? "border border-white/[0.10]"
                    : "border border-black/[0.10]"
                }`}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={`mb-1.5 block text-[12px] font-semibold uppercase tracking-wider ${dark ? "text-white/50" : "text-black/50"}`}>
              Email address
            </label>
            <div className="relative">
              <span className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${dark ? "text-white/25" : "text-black/25"}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                className={`w-full rounded-xl py-3 pl-11 pr-4 text-[15px] outline-none transition-all duration-150 ${
                  dark
                    ? "bg-white/[0.06] text-white placeholder-white/25"
                    : "bg-black/[0.04] text-[#1a1a24] placeholder-black/25"
                } ${
                  focused === "email"
                    ? "border-2 border-[#c8b89a] ring-2 ring-[#c8b89a]/15"
                    : dark
                    ? "border border-white/[0.10]"
                    : "border border-black/[0.10]"
                }`}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className={`text-[12px] font-semibold uppercase tracking-wider ${dark ? "text-white/50" : "text-black/50"}`}>
                Password
              </label>
              {password && strengthMeta && (
                <span className={`text-[12px] font-bold ${strengthMeta.color}`}>
                  {strengthMeta.label}
                </span>
              )}
            </div>
            <div className="relative">
              <span className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${dark ? "text-white/25" : "text-black/25"}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                className={`w-full rounded-xl py-3 pl-11 pr-11 text-[15px] outline-none transition-all duration-150 ${
                  dark
                    ? "bg-white/[0.06] text-white placeholder-white/25"
                    : "bg-black/[0.04] text-[#1a1a24] placeholder-black/25"
                } ${
                  focused === "password"
                    ? "border-2 border-[#c8b89a] ring-2 ring-[#c8b89a]/15"
                    : dark
                    ? "border border-white/[0.10]"
                    : "border border-black/[0.10]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70 ${dark ? "text-white/35" : "text-black/35"}`}
              >
                {showPassword ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {/* Strength bar */}
            {password && (
              <div className="mt-2.5 flex gap-1.5">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-[3px] flex-1 rounded-full transition-all duration-300 ${
                      strength >= s
                        ? strengthMeta?.bar
                        : dark
                        ? "bg-white/[0.10]"
                        : "bg-black/[0.10]"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Password hint */}
            {password && strength < 2 && (
              <p className={`mt-1.5 text-[12px] ${dark ? "text-white/35" : "text-black/35"}`}>
                Try adding numbers or symbols to strengthen your password.
              </p>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="error-shake flex items-center gap-2.5 rounded-xl border border-red-500/25 bg-red-500/[0.08] px-4 py-3 text-[13px] text-red-500">
              <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-[#c8b89a] py-3.5 text-[15px] font-semibold text-[#1a1a24] shadow-[0_2px_14px_rgba(200,184,154,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(200,184,154,0.5)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <svg className="btn-spin shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
                  <path d="M21 12a9 9 0 00-9-9" strokeLinecap="round" />
                </svg>
                Creating account…
              </>
            ) : (
              <>
                Create account
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-7 flex items-center gap-3">
          <div className={`h-px flex-1 ${dark ? "bg-white/[0.08]" : "bg-black/[0.08]"}`} />
          <span className={`text-[12px] ${dark ? "text-white/25" : "text-black/25"}`}>or</span>
          <div className={`h-px flex-1 ${dark ? "bg-white/[0.08]" : "bg-black/[0.08]"}`} />
        </div>

        {/* Footer */}
        <p className={`text-center text-[14px] ${dark ? "text-white/40" : "text-black/40"}`}>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#c8b89a] transition-opacity hover:opacity-75"
          >
            Sign in →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;