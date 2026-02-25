import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrap flex min-h-screen items-center justify-center py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-stone-200/80 bg-white/90 shadow-2xl lg:grid-cols-2">
        <div className="hidden bg-gradient-to-br from-rose-100 via-stone-50 to-emerald-50 p-10 lg:block">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">WedMKD</p>
          <h2 className="mt-4 text-5xl font-semibold text-stone-900">Welcome back</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-stone-600">
            Sign in to continue managing your wedding website, guests, timeline, and planning tools.
          </p>
          <div className="mt-8 space-y-3 text-sm text-stone-700">
            <div className="card-surface p-4">Track RSVPs and guest details</div>
            <div className="card-surface p-4">Manage timeline, budget, and FAQ</div>
            <div className="card-surface p-4">Explore wedding shop products</div>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <h1 className="text-4xl font-semibold text-stone-900">Sign In</h1>
          <p className="mt-2 text-sm text-stone-600">Access your wedding dashboard and planning tools.</p>

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="label" htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="field"
                placeholder="your@email.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="label" htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="field"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-5 text-sm text-stone-600">
            Need an account?{' '}
            <Link to="/signup" className="font-semibold text-rose-700 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

