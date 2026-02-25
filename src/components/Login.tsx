import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import { BrandLogo } from './BrandLogo';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const { t } = useI18n();
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

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate('/');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f2e8] via-[#f2e9de] to-[#efe4d5]" />
        <div className="orb orb-rose absolute left-[-4rem] top-24 h-44 w-44 sm:h-64 sm:w-64" />
        <div className="orb orb-sage absolute right-[8%] top-14 h-32 w-32 sm:h-48 sm:w-48" />
        <div className="orb orb-gold absolute bottom-20 left-[38%] h-32 w-32 sm:h-52 sm:w-52" />
        <div className="absolute inset-y-0 right-0 hidden w-[44%] lg:block">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80"
            alt=""
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#2a1b16]/30 via-transparent to-transparent" />
        </div>
      </div>

      <div className="relative z-10">
        <div className="w-full px-4 py-4 sm:px-6 sm:py-5 lg:px-10">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 rounded-full border border-stone-300/70 bg-white/80 px-4 py-2.5 text-sm font-semibold text-stone-800 shadow-[0_8px_20px_rgba(28,18,13,0.06)] backdrop-blur hover:bg-white"
            >
              <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                <path d="M11.75 4.5 6.25 10l5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{t('Back')} · {t('Home')}</span>
            </button>

            <Link to="/" className="shrink-0">
              <BrandLogo subtitle={t('Wedding Platform')} />
            </Link>
          </div>
        </div>

        <div className="page-wrap flex min-h-[calc(100vh-88px)] items-center py-6 sm:py-10">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] xl:gap-16">
            <div className="max-w-2xl">
              <p className="section-kicker">{t('Sign In')}</p>
              <h1 className="mt-4 text-4xl leading-tight text-stone-900 sm:text-5xl lg:text-6xl">
                Welcome back to your wedding planning space
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-stone-700 sm:text-lg">
                Pick up right where you left off. Manage guests, RSVPs, and the details that shape your celebration.
              </p>

              <div className="mt-8 max-w-xl space-y-5">
                {[
                  'Track RSVPs and guest details',
                  'Manage timeline, budget, and FAQ',
                  'Explore wedding shop products',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 border-b border-stone-200/70 pb-4">
                    <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/80 text-xs font-bold text-rose-700 shadow-sm">
                      +
                    </span>
                    <p className="text-base font-medium text-stone-800">{t(item)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute -inset-4 rounded-[34px] bg-gradient-to-br from-rose-200/45 via-amber-100/40 to-sky-200/35 blur-2xl" />
              <div className="relative rounded-[30px] border border-white/70 bg-white/84 p-6 shadow-[0_28px_60px_rgba(28,18,13,0.14)] backdrop-blur-xl sm:p-8 lg:p-10">
                <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">{t('Sign In')}</h2>
                <p className="mt-2 text-base text-stone-600">Access your wedding dashboard and planning tools.</p>

                {error && (
                  <div className="mt-5 rounded-2xl border border-red-200 bg-red-50/95 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div>
                    <label className="label" htmlFor="login-email">{t('Email')}</label>
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="field py-3.5 text-base"
                      placeholder="your@email.com"
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label className="label" htmlFor="login-password">{t('Password')}</label>
                    <input
                      id="login-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="field py-3.5 text-base"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base">
                    {loading ? 'Signing in...' : t('Sign In')}
                  </button>
                </form>

                <p className="mt-6 text-sm text-stone-600">
                  Need an account?{' '}
                  <Link to="/signup" className="font-semibold text-rose-700 hover:underline">
                    Create one
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
