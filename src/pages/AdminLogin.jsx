// src/pages/AdminLogin.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const LS_LAST_EMAIL = "admin_last_email";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState(true);
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [capsOn, setCapsOn] = useState(false);

  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { loginAsAdmin } = useAuth();

  useEffect(() => {
    const last = localStorage.getItem(LS_LAST_EMAIL) || "";
    if (last) { setEmail(last); setRemember(true); }
  }, []);
  useEffect(() => {
    if (remember && email) localStorage.setItem(LS_LAST_EMAIL, email);
    if (!remember) localStorage.removeItem(LS_LAST_EMAIL);
  }, [remember, email]);

  const onKeyUpPassword = (e) => setCapsOn(e.getModifierState && e.getModifierState("CapsLock"));

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setOk(""); setLoading(true);
    try {
      const { data: sign, error: signErr } = await supabase.auth.signInWithPassword({ email, password });
      if (signErr) throw signErr;
      const uid = sign?.user?.id;
      if (!uid) throw new Error("Gagal mengambil sesi pengguna.");

      const { data: profile, error: profErr } = await supabase
        .from("profiles").select("role").eq("id", uid).single();
      if (profErr) { await supabase.auth.signOut(); throw new Error("Profil admin tidak ditemukan."); }
      if (profile?.role !== "admin") { await supabase.auth.signOut(); throw new Error("Akun ini bukan admin."); }

      loginAsAdmin(email);
      setOk("Login berhasil. Mengalihkan…");
      // Arahkan ke Home, bukan ke Kelola Produk
      navigate("/", { replace: true });
    } catch (e2) {
      setErr(e2.message || "Gagal login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Background halus (ikut theme via CSS vars) */}
      <div
        className="absolute inset-0 -z-10 transition-colors duration-500"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg-color), var(--section-bg))",
        }}
      />
      {/* Accent blur */}
      <div className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full blur-3xl opacity-25 pointer-events-none bg-emerald-600/20" />
      <div className="absolute -bottom-24 -right-24 w-[520px] h-[520px] rounded-full blur-3xl opacity-25 pointer-events-none bg-emerald-600/20" />

      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35 }}
      >
        {/* Kartu login */}
        <div className="rounded-2xl shadow-xl border border-gray-200/70 dark:border-gray-800/70 bg-white/90 dark:bg-gray-900/80 backdrop-blur-md transition-colors duration-500 overflow-hidden">
          {/* Heading */}
          <div className="px-6 py-5 bg-gradient-to-r from-emerald-600 to-green-700 text-white">
            <h1 className="text-lg font-semibold tracking-wide">Admin Login</h1>
            <p className="text-[11px] opacity-90">Masuk untuk mengelola pesanan & produk</p>
          </div>

          {/* Alerts */}
          <div className="px-6 pt-4">
            <AnimatePresence>
              {err && (
                <motion.div
                  className="mb-3 rounded-lg border border-red-200 bg-red-50 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300 px-3 py-2 text-sm flex items-center gap-2"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <FiAlertCircle className="shrink-0" />
                  <span>{err}</span>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {ok && (
                <motion.div
                  className="mb-3 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-300 px-3 py-2 text-sm flex items-center gap-2"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <FiCheckCircle className="shrink-0" />
                  <span>{ok}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="px-6 pb-6 space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs mb-1.5 text-gray-600 dark:text-gray-300 tracking-wide">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none opacity-70">
                  <FiMail />
                </div>
                <input
                  type="email"
                  className="w-full rounded-lg border px-9 py-2.5 bg-white/95 dark:bg-gray-800/90 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@domain.com"
                  required
                  autoFocus
                  inputMode="email"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs mb-1.5 text-gray-600 dark:text-gray-300 tracking-wide">
                  Password
                </label>
                <span className="text-[11px] text-gray-400">
                  {capsOn ? "Caps Lock aktif" : ""}
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none opacity-70">
                  <FiLock />
                </div>
                <input
                  type={showPass ? "text" : "password"}
                  className="w-full rounded-lg border pl-9 pr-10 py-2.5 bg-white/95 dark:bg-gray-800/90 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyUp={onKeyUpPassword}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  aria-label={showPass ? "Sembunyikan password" : "Tampilkan password"}
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 select-none cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-emerald-500"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Ingat email ini
              </label>

              <button
                type="button"
                className=""
                onClick={() => alert("Hubungi owner untuk reset password.")}
              >
                Lupa password?
              </button>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-lg px-4 py-2.5 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              )}
              {loading ? "Masuk…" : "Masuk"}
            </motion.button>
          </form>
        </div>

        <div className="mt-6 text-center text-[11px] text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Jamu Sugih Waras • Panel Admin
        </div>
      </motion.div>
    </div>
  );
}
