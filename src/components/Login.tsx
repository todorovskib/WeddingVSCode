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
      </div>

      <div className="relative z-10">
        <div className="border-b border-stone-300/55 bg-[#f4ede3]/72 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-stone-300/70 bg-white/85 px-4 py-2.5 text-sm font-semibold text-stone-800 shadow-[0_8px_20px_rgba(28,18,13,0.06)] backdrop-blur hover:bg-white"
            >
              <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                <path
                  d="M11.75 4.5 6.25 10l5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{t('Back')} - {t('Home')}</span>
            </button>

            <Link to="/" className="hidden shrink-0 sm:block">
              <BrandLogo subtitle={t('Wedding Platform')} />
            </Link>
            <Link to="/" className="shrink-0 sm:hidden">
              <BrandLogo compact />
            </Link>
          </div>
        </div>

        <div className="grid min-h-[calc(100vh-88px)] w-full lg:grid-cols-[1.02fr_0.98fr]">
          <section className="relative min-h-[16rem] overflow-hidden border-b border-stone-300/45 lg:min-h-full lg:border-b-0 lg:border-r">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=80"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{ filter: 'blur(1.5px)', transform: 'scale(1.03)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120d0b]/86 via-[#120d0b]/62 to-[#120d0b]/32 lg:bg-gradient-to-r" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(79,127,118,0.18),transparent_45%),radial-gradient(circle_at_18%_78%,rgba(143,76,69,0.20),transparent_42%)]" />
            <div className="relative flex h-full items-end lg:items-center">
              <div className="w-full px-4 py-6 sm:px-7 sm:py-8 lg:px-10 xl:px-14">
                <div className="max-w-xl border-l-2 border-white/75 pl-4 text-white sm:pl-5 [text-shadow:0_2px_10px_rgba(0,0,0,0.45)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">{t('Sign In')}</p>
                  <h1 className="mt-3 text-3xl leading-tight sm:text-4xl xl:text-5xl">
                    {t('Welcome back to your wedding planning space')}
                  </h1>
                  <p className="mt-4 max-w-lg text-sm leading-7 text-white/88 sm:text-base">
                    {t('Pick up right where you left off and continue planning your celebration with calm, clarity, and one place for everything.')}
                  </p>
                  <div className="mt-6 space-y-3">
                    {[
                      'Track RSVPs and guest details',
                      'Manage timeline, budget, and FAQ',
                      'Explore wedding shop products',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3 border-l border-white/25 bg-black/30 px-3 py-3 backdrop-blur-sm">
                        <span className="inline-flex h-6 w-6 items-center justify-center border border-white/30 bg-white/12 text-xs font-bold text-white">
                          +
                        </span>
                        <p className="text-sm font-medium text-white/95 sm:text-base">{t(item)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="flex items-center bg-[#f8f4ec]/78 backdrop-blur-sm">
            <div className="w-full px-4 py-8 sm:px-7 sm:py-10 lg:px-12 xl:px-16">
              <div className="mx-auto w-full max-w-xl">
                <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">{t('Sign In')}</h2>
                <p className="mt-2 text-base text-stone-600">{t('Access your wedding dashboard and planning tools.')}</p>

                {error && (
                  <div className="mt-5 border border-red-200 bg-red-50/95 px-4 py-3 text-sm text-red-700" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div>
                    <label className="label" htmlFor="login-email">
                      {t('Email')}
                    </label>
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="field min-h-12 rounded-md py-3 text-base"
                      placeholder="your@email.com"
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label className="label" htmlFor="login-password">
                      {t('Password')}
                    </label>
                    <input
                      id="login-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="field min-h-12 rounded-md py-3 text-base"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary min-h-12 w-full rounded-md py-3 text-base">
                    {loading ? 'Signing in...' : t('Sign In')}
                  </button>
                </form>

                <p className="mt-6 text-sm text-stone-600">
                  {t('Need an account?')}{' '}
                  <Link to="/signup" className="font-semibold text-rose-700 hover:underline">
                    {t('Create one')}
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
