import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const { error: signErr } = await supabase.auth.signInWithPassword({ email, password });
      if (signErr) throw signErr;

      // cek role admin di tabel users
      const { data: u, error: roleErr } = await supabase
        .from('users')
        .select('role')
        .eq('email', email)
        .single();

      if (roleErr || !u || u.role !== 'admin') {
        await supabase.auth.signOut();
        throw new Error('Akun ini bukan admin.');
      }

      navigate('/admin');
    } catch (e2) {
      setErr(e2.message || 'Gagal login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto pt-28 px-4">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full rounded border px-3 py-2 bg-white dark:bg-gray-900"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full rounded border px-3 py-2 bg-white dark:bg-gray-900"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>
        {err && <p className="text-red-500 text-sm">{err}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-full px-5 py-2 bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-60"
        >
          {loading ? 'Masuk…' : 'Masuk'}
        </button>
      </form>
    </div>
  );
}
