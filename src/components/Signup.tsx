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
        <div className="absolute inset-y-0 left-0 hidden w-[42%] lg:block">
          <img
            src="https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1400&q=80"
            alt=""
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2a1b16]/28 via-transparent to-transparent" />
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
          <div className="grid w-full items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] xl:gap-16">
            <div className="order-2 max-w-2xl lg:order-1">
              <p className="section-kicker">{t('Create Account')}</p>
              <h1 className="mt-4 text-4xl leading-tight text-stone-900 sm:text-5xl lg:text-6xl">
                Start building your wedding story online
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-stone-700 sm:text-lg">
                Create your account and set up a beautiful space for your guests, your timeline, and every detail of the day.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="space-y-2 border-b border-stone-200/70 pb-4 sm:border-b-0 sm:border-r sm:pr-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-stone-500">01</p>
                  <p className="text-base font-semibold text-stone-900">Set your wedding basics</p>
                  <p className="text-sm leading-6 text-stone-600">Names, date, venue, and your website style direction.</p>
                </div>
                <div className="space-y-2 border-b border-stone-200/70 pb-4 sm:border-b-0 sm:pl-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-stone-500">02</p>
                  <p className="text-base font-semibold text-stone-900">Invite and organize guests</p>
                  <p className="text-sm leading-6 text-stone-600">Track RSVPs and keep planning details in one place.</p>
                </div>
              </div>
            </div>

            <div className="order-1 relative lg:order-2">
              <div className="pointer-events-none absolute -inset-4 rounded-[34px] bg-gradient-to-br from-sky-200/40 via-rose-100/35 to-amber-100/35 blur-2xl" />
              <div className="relative rounded-[30px] border border-white/70 bg-white/84 p-6 shadow-[0_28px_60px_rgba(28,18,13,0.14)] backdrop-blur-xl sm:p-8 lg:p-10">
                <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">{t('Create Account')}</h2>
                <p className="mt-2 text-base text-stone-600">Set up your planning workspace in a few steps.</p>

                {error && (
                  <div className="mt-5 rounded-2xl border border-red-200 bg-red-50/95 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="label" htmlFor="firstName">{t('First Name')}</label>
                      <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="field py-3.5 text-base"
                      />
                    </div>
                    <div>
                      <label className="label" htmlFor="lastName">{t('Last Name')}</label>
                      <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="field py-3.5 text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label" htmlFor="signup-email">{t('Email')}</label>
                    <input
                      id="signup-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="field py-3.5 text-base"
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label className="label" htmlFor="signup-password">{t('Password')}</label>
                    <input
                      id="signup-password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="field py-3.5 text-base"
                      autoComplete="new-password"
                    />
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base">
                    {loading ? 'Creating account...' : t('Create Account')}
                  </button>
                </form>

                <p className="mt-6 text-sm text-stone-600">
                  Already registered?{' '}
                  <Link to="/login" className="font-semibold text-rose-700 hover:underline">
                    {t('Sign In')}
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
