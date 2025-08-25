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

  // Prefill email dari localStorage (UX kecil tapi berguna)
  useEffect(() => {
    const last = localStorage.getItem(LS_LAST_EMAIL) || "";
    if (last) {
      setEmail(last);
      setRemember(true);
    }
  }, []);

  // Simpan email jika "remember" aktif
  useEffect(() => {
    if (remember && email) localStorage.setItem(LS_LAST_EMAIL, email);
    if (!remember) localStorage.removeItem(LS_LAST_EMAIL);
  }, [remember, email]);

  const onKeyUpPassword = (e) => {
    setCapsOn(e.getModifierState && e.getModifierState("CapsLock"));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setOk("");
    setLoading(true);

    try {
      // 1) Login Supabase
      const { data: sign, error: signErr } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signErr) throw signErr;

      const uid = sign?.user?.id;
      if (!uid) throw new Error("Gagal mengambil sesi pengguna.");

      // 2) Verifikasi role admin via id (aman untuk RLS read-own)
      const { data: profile, error: profErr } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", uid)
        .single();

      if (profErr) {
        await supabase.auth.signOut();
        throw new Error("Profil admin tidak ditemukan.");
      }
      if (profile?.role !== "admin") {
        await supabase.auth.signOut();
        throw new Error("Akun ini bukan admin.");
      }

      // 3) Set context admin, lalu arahkan ke dashboard admin
      loginAsAdmin(email);
      setOk("Login berhasil. Mengalihkan…");
      navigate("/admin", { replace: true });
    } catch (e2) {
      setErr(e2.message || "Gagal login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Background gradient + pattern */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px circle at 10% 10%, rgba(34,98,74,0.08), transparent 50%), radial-gradient(800px circle at 90% 20%, rgba(34,98,74,0.05), transparent 40%), linear-gradient(to bottom, var(--bg-color), var(--section-bg))",
        }}
      />
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 pointer-events-none"
           style={{ background: "conic-gradient(from 45deg, rgba(34,98,74,0.18), transparent 40%)" }} />
      <div className="absolute -bottom-24 -right-24 w-[520px] h-[520px] rounded-full blur-3xl opacity-30 pointer-events-none"
           style={{ background: "conic-gradient(from 225deg, rgba(34,98,74,0.16), transparent 40%)" }} />

      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35 }}
      >
        <div className="rounded-2xl shadow-xl border border-gray-200/70 dark:border-gray-800/70 overflow-hidden bg-white/80 dark:bg-[#0f1520]/70 backdrop-blur-md">
          {/* Header */}
          <div className="px-6 py-5 bg-gradient-to-r from-emerald-600 to-green-700 text-white">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/jamu.png"
                alt="Logo"
                className="w-9 h-9 rounded shadow-sm ring-2 ring-white/20"
              />
              <div>
                <h1 className="text-lg font-semibold tracking-wide">Admin Login</h1>
                <p className="text-[11px] opacity-90">Masuk untuk mengelola pesanan & produk</p>
              </div>
            </div>
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
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none opacity-70">
                  <FiMail />
                </div>
                <input
                  type="email"
                  className="w-full rounded-lg border px-9 py-2.5 bg-white/90 dark:bg-[#0c1220]/90 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-gray-400 dark:placeholder:text-gray-500"
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
                  className="w-full rounded-lg border pl-9 pr-10 py-2.5 bg-white/90 dark:bg-[#0c1220]/90 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-gray-400 dark:placeholder:text-gray-500"
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
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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

              {/* Dummy link gaya admin; bisa diarahkan ke help center jika ada */}
              <button
                type="button"
                className="text-xs text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200 underline underline-offset-2 decoration-dotted"
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
              className="w-full rounded-lg px-4 py-2.5 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 transition flex items-center justify-center gap-2"
            >
              {loading && (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              )}
              {loading ? "Masuk…" : "Masuk"}
            </motion.button>

            {/* Small tips */}
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Pastikan akunmu punya <span className="font-semibold">role = admin</span> di tabel
              <code className="px-1 ml-1 rounded bg-gray-100 dark:bg-gray-800">profiles</code>.
            </p>
          </form>
        </div>

        {/* Footer mini */}
        <div className="mt-6 text-center text-[11px] text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Jamu Sugih Waras • Panel Admin
        </div>
      </motion.div>
    </div>
  );
}
