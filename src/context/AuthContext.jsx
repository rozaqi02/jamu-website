// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);        // Supabase user
  const [isAdmin, setIsAdmin] = useState(false); // role === 'admin'
  const [adminEmail, setAdminEmail] = useState(""); // optional, utk display
  const [isReady, setIsReady] = useState(false); // siap dipakai (UI boleh render)

  const fetchRole = useCallback(async (uid) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("role, email")
        .eq("id", uid)
        .single();
      if (error) throw error;
      const admin = data?.role === "admin";
      setIsAdmin(admin);
      // Simpan email dari user Supabase (lebih akurat), fallback dari profile bila ada
      setAdminEmail((prev) => user?.email || data?.email || prev || "");
    } catch {
      setIsAdmin(false);
    }
  }, [user?.email]);

  const resolveSession = useCallback(async (session) => {
    const u = session?.user ?? null;
    setUser(u);
    if (u?.id) {
      await fetchRole(u.id);
    } else {
      setIsAdmin(false);
      setAdminEmail("");
    }
    setIsReady(true);
  }, [fetchRole]);

  // 1) Bootstrapping dari local session saat mount
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      await resolveSession(data?.session || null);
    })();

    // 2) Dengarkan perubahan auth di tab ini & antar-tab
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      // Event: SIGNED_IN, TOKEN_REFRESHED, USER_UPDATED, SIGNED_OUT, etc.
      resolveSession(session);
    });

    // 3) Saat tab kembali visible, re-check sesi + role lagi (menang melawan suspend)
    const onVis = async () => {
      if (document.visibilityState === "visible") {
        const { data } = await supabase.auth.getSession();
        await resolveSession(data?.session || null);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      sub?.subscription?.unsubscribe?.();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [resolveSession]);

  // Dipanggil oleh layar login hanya untuk menyimpan email (opsional, bukan penentu admin)
  const loginAsAdmin = (email) => {
    setAdminEmail(email || "");
    // isAdmin TIDAK di-set di sini, biar sumber kebenaran tetap dari profiles
  };

  const logoutAdmin = async () => {
    try {
      await supabase.auth.signOut();
    } finally {
      // Reset semua state & HARD reload supaya UI benar-benar anon
      setUser(null);
      setIsAdmin(false);
      setAdminEmail("");
      setIsReady(true);
      window.location.replace("/");
    }
  };

  const value = { user, isAdmin, isReady, adminEmail, loginAsAdmin, logoutAdmin };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
