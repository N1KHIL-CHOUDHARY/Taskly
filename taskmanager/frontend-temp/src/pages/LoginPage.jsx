import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LoginPage = ({ theme, toggleTheme }) => {
  const { login } = useAuth();
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
      await login({ email, password });
    } catch (err) {
      setError(err.message || "Failed to login");
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 ${
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
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .login-animate { animation: fadeUp 0.45s ease forwards; }
        .error-shake   { animation: shake 0.35s ease; }
        .btn-spin      { animation: spin 0.8s linear infinite; }
      `}</style>

      {/* ── Side panel (lg+) ── */}
      <aside
        className={`relative hidden w-[400px] shrink-0 flex-col justify-between overflow-hidden p-14 lg:flex ${
          dark ? "bg-[#1a1a24]" : "bg-[#2d2d3a]"
        }`}
      >
        {/* Concentric rings */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]"
            style={{ width: 280 + i * 110, height: 280 + i * 110 }}
          />
        ))}

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c8b89a]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
          </div>
          <span className="text-[15px] font-bold tracking-tight text-white">Taskly</span>
        </div>

        {/* Feature list */}
        <div className="relative z-10">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-white/40">
            What you get
          </p>
          {[
            { text: "Organize tasks effortlessly", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
            { text: "Track progress in real-time", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
            { text: "Simple, distraction-free design", icon: "M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5z" },
          ].map(({ text, icon }, i) => (
            <div key={i} className="mb-4 flex items-center gap-3.5 last:mb-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.07]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8b89a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={icon} />
                </svg>
              </div>
              <span className="text-[14px] text-white/65">{text}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* ── Main form area ── */}
      <div className="relative flex flex-1 items-center justify-center px-6 py-14">

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-150 ${
            dark
              ? "border-white/10 bg-white/[0.06] text-white/60 hover:bg-white/[0.10] hover:text-white"
              : "border-black/10 bg-black/[0.05] text-black/50 hover:bg-black/[0.08] hover:text-black"
          }`}
        >
          {dark ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8b89a" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="5" />
              {[0,45,90,135,180,225,270,315].map((deg, i) => {
                const r = deg * Math.PI / 180;
                const x1 = 12 + 8 * Math.cos(r), y1 = 12 + 8 * Math.sin(r);
                const x2 = 12 + 10 * Math.cos(r), y2 = 12 + 10 * Math.sin(r);
                return <line key={i} x1={x1.toFixed(2)} y1={y1.toFixed(2)} x2={x2.toFixed(2)} y2={y2.toFixed(2)} />;
              })}
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          )}
        </button>

        {/* Card */}
        <div className="login-animate w-full max-w-[400px]">

          {/* Logo + heading */}
          <div className="mb-10">
            <div className="mb-8 flex items-center gap-2.5">
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

            <h1
              className={`text-[34px] font-normal leading-tight tracking-tight ${dark ? "text-white" : "text-[#1a1a24]"}`}
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Welcome back
            </h1>
            <p className={`mt-2 text-[15px] ${dark ? "text-white/45" : "text-black/45"}`}>
              Sign in to continue to your tasks
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

            {/* Email */}
            <div>
              <label className={`mb-1.5 block text-[12px] font-semibold uppercase tracking-wider ${dark ? "text-white/50" : "text-black/50"}`}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                className={`w-full rounded-xl px-4 py-3 text-[15px] outline-none transition-all duration-150 ${
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

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className={`text-[12px] font-semibold uppercase tracking-wider ${dark ? "text-white/50" : "text-black/50"}`}>
                  Password
                </label>
                <button
                  type="button"
                  className={`text-[12px] font-medium transition-colors hover:text-[#c8b89a] ${dark ? "text-white/35" : "text-black/35"}`}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  className={`w-full rounded-xl px-4 py-3 pr-11 text-[15px] outline-none transition-all duration-150 ${
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
                  className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-80 ${dark ? "text-white/35" : "text-black/35"}`}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
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
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
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
            No account yet?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#c8b89a] transition-opacity hover:opacity-75"
            >
              Create one →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;