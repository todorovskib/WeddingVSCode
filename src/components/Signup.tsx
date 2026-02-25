import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import { BrandLogo } from './BrandLogo';

export const Signup: React.FC = () => {
  const { signup } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(formData.email, formData.password, formData.firstName, formData.lastName);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f3ea] via-[#f2eadf] to-[#eee1d0]" />
        <div className="orb orb-rose absolute right-[-2rem] top-20 h-44 w-44 sm:h-64 sm:w-64" />
        <div className="orb orb-sage absolute left-[-1rem] top-28 h-36 w-36 sm:h-52 sm:w-52" />
        <div className="orb orb-gold absolute bottom-16 right-[34%] h-28 w-28 sm:h-44 sm:w-44" />
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

        <div className="grid min-h-[calc(100vh-88px)] w-full lg:grid-cols-[1fr_1.05fr]">
          <section className="order-2 flex items-center border-t border-stone-300/45 bg-[#f8f4ec]/78 backdrop-blur-sm lg:order-1 lg:border-r lg:border-t-0">
            <div className="w-full px-4 py-8 sm:px-7 sm:py-10 lg:px-12 xl:px-16">
              <div className="mx-auto w-full max-w-xl">
                <p className="section-kicker">{t('Create Account')}</p>
                <h1 className="mt-4 text-4xl leading-tight text-stone-900 sm:text-5xl xl:text-6xl">
                  {t('Start building your wedding story online')}
                </h1>
                <p className="mt-4 text-base leading-8 text-stone-700 sm:text-lg">
                  {t('Create your account and set up a beautiful space for your guests, your timeline, and every detail of the day.')}
                </p>

                {error && (
                  <div className="mt-5 border border-red-200 bg-red-50/95 px-4 py-3 text-sm text-red-700" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="label" htmlFor="firstName">
                        {t('First Name')}
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="field min-h-12 rounded-md py-3 text-base"
                        autoComplete="given-name"
                      />
                    </div>
                    <div>
                      <label className="label" htmlFor="lastName">
                        {t('Last Name')}
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="field min-h-12 rounded-md py-3 text-base"
                        autoComplete="family-name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label" htmlFor="signup-email">
                      {t('Email')}
                    </label>
                    <input
                      id="signup-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="field min-h-12 rounded-md py-3 text-base"
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label className="label" htmlFor="signup-password">
                      {t('Password')}
                    </label>
                    <input
                      id="signup-password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="field min-h-12 rounded-md py-3 text-base"
                      autoComplete="new-password"
                    />
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary min-h-12 w-full rounded-md py-3 text-base">
                    {loading ? 'Creating account...' : t('Create Account')}
                  </button>
                </form>

                <p className="mt-6 text-sm text-stone-600">
                  {t('Already registered?')}{' '}
                  <Link to="/login" className="font-semibold text-rose-700 hover:underline">
                    {t('Sign In')}
                  </Link>
                </p>
              </div>
            </div>
          </section>

          <section className="order-1 relative min-h-[16rem] overflow-hidden border-b border-stone-300/45 lg:order-2 lg:min-h-full lg:border-b-0">
            <img
              src="https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1800&q=80"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{ filter: 'blur(1.5px)', transform: 'scale(1.03)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120c0a]/85 via-[#120c0a]/62 to-[#120c0a]/34 lg:bg-gradient-to-l" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,0,0,0.18),transparent_45%),radial-gradient(circle_at_80%_25%,rgba(143,76,69,0.22),transparent_46%)]" />
            <div className="relative flex h-full items-end lg:items-center">
              <div className="w-full px-4 py-6 sm:px-7 sm:py-8 lg:px-10 xl:px-14">
                <div className="max-w-xl border-l-2 border-white/75 pl-4 text-white sm:pl-5 [text-shadow:0_2px_10px_rgba(0,0,0,0.45)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">WedMKD</p>
                  <h2 className="mt-3 text-3xl leading-tight sm:text-4xl xl:text-5xl">
                    {t('A beautiful, calm start to planning your day')}
                  </h2>
                  <p className="mt-4 max-w-lg text-sm leading-7 text-white/88 sm:text-base">
                    {t('Create your account, choose your style, and build a guest experience that feels personal from the very first click.')}
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="border border-white/28 bg-black/30 px-3 py-3 backdrop-blur-sm">
                      <p className="text-xs uppercase tracking-[0.14em] text-white/70">01</p>
                      <p className="mt-1 text-sm font-semibold text-white">{t('Set your wedding basics')}</p>
                    </div>
                    <div className="border border-white/28 bg-black/30 px-3 py-3 backdrop-blur-sm">
                      <p className="text-xs uppercase tracking-[0.14em] text-white/70">02</p>
                      <p className="mt-1 text-sm font-semibold text-white">{t('Invite and organize guests')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
