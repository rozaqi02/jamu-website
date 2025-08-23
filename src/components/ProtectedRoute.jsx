import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const [ok, setOk] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      setChecking(true);
      const { data } = await supabase.auth.getSession();
      const user = data?.session?.user;
      if (!user) {
        navigate('/admin/login', { replace: true, state: { from: location.pathname } });
        return;
      }
      if (requireAdmin) {
        const { data: u } = await supabase.from('users').select('role').eq('email', user.email).single();
        if (!u || u.role !== 'admin') {
          navigate('/admin/login', { replace: true });
          return;
        }
      }
      setOk(true);
      setChecking(false);
    })();
  }, [navigate, location, requireAdmin]);

  if (checking) return <div className="pt-28 text-center">Memeriksa akses…</div>;
  if (!ok) return null;
  return children;
}
