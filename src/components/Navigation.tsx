import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import { BrandLogo } from './BrandLogo';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
    isActive
      ? 'bg-gradient-to-r from-rose-100 via-amber-50 to-sky-100 text-stone-950 ring-1 ring-rose-200 shadow-[0_10px_20px_rgba(28,18,13,0.10)]'
      : 'text-stone-700 hover:bg-white/75 hover:text-stone-900'
  }`;

export const Navigation: React.FC = () => {
  const { user, logout, token } = useAuth();
  const { language, setLanguage, t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  if (isAuthPage) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const publicLinks: Array<{ to: string; label: string; end?: boolean }> = [
    { to: '/', label: 'Home', end: true },
    { to: '/services', label: 'Services' },
    { to: '/collaborations', label: 'Collaborations' },
    { to: '/products', label: 'Products' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/samples', label: 'Samples' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-stone-300/60 bg-[#f4ede3]/88 backdrop-blur-xl">
      <div className="page-wrap py-2.5">
        <div className="card-surface flex items-center justify-between gap-3 px-3 py-2 sm:px-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="rounded-xl px-2 py-1.5 hover:bg-white/60" aria-label="WedMKD">
              <BrandLogo subtitle={t('Wedding Platform')} />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {publicLinks.map((item) => (
                <NavLink key={item.to} to={item.to} className={navLinkClass} end={item.end}>
                  {({ isActive }) => (
                    <span className="inline-flex items-center gap-2">
                      <span
                        aria-hidden
                        className={`h-1.5 w-1.5 rounded-full transition ${
                          isActive ? 'scale-100 bg-gradient-to-r from-rose-500 to-sky-500 opacity-100' : 'scale-0 opacity-0'
                        }`}
                      />
                      {t(item.label)}
                    </span>
                  )}
                </NavLink>
              ))}
              {token && (
                <NavLink to="/dashboard" className={navLinkClass}>
                  {({ isActive }) => (
                    <span className="inline-flex items-center gap-2">
                      <span
                        aria-hidden
                        className={`h-1.5 w-1.5 rounded-full transition ${
                          isActive ? 'scale-100 bg-gradient-to-r from-rose-500 to-sky-500 opacity-100' : 'scale-0 opacity-0'
                        }`}
                      />
                      {t('Dashboard')}
                    </span>
                  )}
                </NavLink>
              )}
            </nav>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <div className="inline-flex items-center rounded-lg border border-stone-200 bg-white/80 p-1">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`rounded-md px-2 py-1 text-xs font-semibold transition ${
                  language === 'en' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
                aria-label={t('English')}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('mk')}
                className={`rounded-md px-2 py-1 text-xs font-semibold transition ${
                  language === 'mk' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
                aria-label={t('Macedonian')}
              >
                MK
              </button>
            </div>
            {token && user ? (
              <>
                <span className="chip">{user.email}</span>
                <button onClick={handleLogout} className="btn-secondary">
                  {t('Logout')}
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="btn-ghost">
                  {t('Sign In')}
                </button>
                <button onClick={() => navigate('/signup')} className="btn-primary">
                  {t('Create Account')}
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            className="btn-secondary lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {t('Menu')}
          </button>
        </div>

        {menuOpen && (
          <div className="card-surface mt-2 space-y-2 p-3 lg:hidden">
            <div className="mb-1 flex items-center justify-between rounded-lg border border-stone-200/80 bg-white/80 px-3 py-2">
              <span className="text-xs uppercase tracking-[0.12em] text-stone-500">{t('Language')}</span>
              <div className="inline-flex rounded-md border border-stone-200 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`rounded px-2 py-1 text-xs font-semibold ${language === 'en' ? 'bg-stone-900 text-white' : 'text-stone-700'}`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('mk')}
                  className={`rounded px-2 py-1 text-xs font-semibold ${language === 'mk' ? 'bg-stone-900 text-white' : 'text-stone-700'}`}
                >
                  MK
                </button>
              </div>
            </div>
            {publicLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={navLinkClass}
                end={item.end}
                onClick={() => setMenuOpen(false)}
              >
                {({ isActive }) => (
                  <span className="inline-flex items-center gap-2">
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 rounded-full transition ${
                        isActive ? 'scale-100 bg-gradient-to-r from-rose-500 to-sky-500 opacity-100' : 'scale-0 opacity-0'
                      }`}
                    />
                    {t(item.label)}
                  </span>
                )}
              </NavLink>
            ))}
            {token && (
              <NavLink to="/dashboard" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                {({ isActive }) => (
                  <span className="inline-flex items-center gap-2">
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 rounded-full transition ${
                        isActive ? 'scale-100 bg-gradient-to-r from-rose-500 to-sky-500 opacity-100' : 'scale-0 opacity-0'
                      }`}
                    />
                    {t('Dashboard')}
                  </span>
                )}
              </NavLink>
            )}
            <div className="border-t border-stone-200/80 pt-2">
              {token && user ? (
                <div className="space-y-2">
                  <p className="text-xs text-stone-600">{user.email}</p>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="btn-secondary w-full"
                  >
                    {t('Logout')}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate('/login');
                    }}
                    className="btn-secondary"
                  >
                    {t('Sign In')}
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate('/signup');
                    }}
                    className="btn-primary"
                  >
                    {t('Sign Up')}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
