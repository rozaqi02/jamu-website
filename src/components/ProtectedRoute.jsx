// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, isAdmin, isReady } = useAuth();
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isReady) return; // tunggu auth siap
    // Jika butuh admin: harus ada user & isAdmin = true
    if (requireAdmin) {
      if (user && isAdmin) {
        setOk(true);
      } else {
        navigate("/admin/login", { replace: true, state: { from: location.pathname } });
      }
      return;
    }
    // Jika tidak butuh admin, tapi butuh user (opsional): di sini kasusmu /admin saja yang protected
    setOk(true);
  }, [isReady, user, isAdmin, navigate, location, requireAdmin]);

  if (!isReady) {
    return <div className="pt-28 text-center">Memeriksa akses…</div>;
  }
  if (!ok) return null;
  return children;
}
