import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import { BrandLogo } from './BrandLogo';

const desktopNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `group relative inline-flex h-11 items-center justify-center py-3 text-[15px] font-semibold transition-colors ${
    isActive
      ? 'text-stone-950'
      : 'text-stone-700 hover:text-stone-900'
  }`;

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex w-full items-center justify-center rounded-md px-4 py-3 text-base font-semibold transition ${
    isActive
      ? 'bg-gradient-to-r from-rose-100/90 via-amber-50/90 to-sky-100/90 text-stone-950 ring-1 ring-rose-200/80 shadow-[0_12px_24px_rgba(28,18,13,0.08)]'
      : 'text-stone-700 hover:bg-white/70 hover:text-stone-900'
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
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="grid min-h-[78px] grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[auto_1fr_auto]">
          <div className="flex items-center">
            <Link to="/" className="shrink-0 py-1" aria-label="WedMKD">
              <BrandLogo subtitle={t('Wedding Platform')} />
            </Link>
          </div>

          <nav className="hidden items-center justify-center gap-5 xl:gap-6 lg:flex" aria-label="Primary">
            {publicLinks.map((item) => (
              <NavLink key={item.to} to={item.to} className={desktopNavLinkClass} end={item.end}>
                {({ isActive }) => (
                  <span className="relative inline-flex items-center gap-2 pb-0.5">
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 rounded-full transition ${
                        isActive ? 'scale-100 bg-gradient-to-r from-rose-500 to-sky-500 opacity-100' : 'scale-90 bg-stone-300 opacity-50 group-hover:opacity-80'
                      }`}
                    />
                    {t(item.label)}
                    <span
                      aria-hidden
                      className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-sky-500 transition-all duration-300 ${
                        isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-60'
                      }`}
                    />
                  </span>
                )}
              </NavLink>
            ))}
            {token && (
              <NavLink to="/dashboard" className={desktopNavLinkClass}>
                {({ isActive }) => (
                  <span className="relative inline-flex items-center gap-2 pb-0.5">
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 rounded-full transition ${
                        isActive ? 'scale-100 bg-gradient-to-r from-rose-500 to-sky-500 opacity-100' : 'scale-90 bg-stone-300 opacity-50 group-hover:opacity-80'
                      }`}
                    />
                    {t('Dashboard')}
                    <span
                      aria-hidden
                      className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-sky-500 transition-all duration-300 ${
                        isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-60'
                      }`}
                    />
                  </span>
                )}
              </NavLink>
            )}
          </nav>

          <div className="hidden items-center gap-2.5 md:flex">
            <div className="inline-flex h-11 items-center rounded-md border border-stone-200/80 bg-white/75 p-1.5 shadow-[0_8px_16px_rgba(28,18,13,0.05)]">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`inline-flex h-8 items-center justify-center rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                  language === 'en' ? 'bg-stone-900 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'
                }`}
                aria-label={t('English')}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('mk')}
                className={`inline-flex h-8 items-center justify-center rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                  language === 'mk' ? 'bg-stone-900 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'
                }`}
                aria-label={t('Macedonian')}
              >
                MK
              </button>
            </div>
            {token && user ? (
              <>
                <span className="hidden text-sm font-medium text-stone-600 lg:inline">{user.email}</span>
                <button onClick={handleLogout} className="btn-secondary h-11 px-5 py-2.5">
                  {t('Logout')}
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="btn-ghost h-11 rounded-md px-4 py-2.5 text-sm font-semibold text-stone-700 hover:bg-white/75">
                  {t('Sign In')}
                </button>
                <button onClick={() => navigate('/signup')} className="btn-primary h-11 rounded-md px-5 py-2.5 text-sm">
                  {t('Create Account')}
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            className="inline-flex h-11 items-center justify-center rounded-md border border-stone-200/90 bg-white/80 px-4 text-sm font-semibold text-stone-800 shadow-[0_8px_18px_rgba(28,18,13,0.06)] backdrop-blur lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {t('Menu')}
          </button>
        </div>

        {menuOpen && (
          <div className="mb-3 rounded-md border border-stone-200/80 bg-white/88 p-4 shadow-[0_18px_40px_rgba(28,18,13,0.08)] backdrop-blur-xl lg:hidden">
            <div className="mb-3 flex items-center justify-between rounded-md border border-stone-200/80 bg-white/80 px-4 py-3">
              <span className="text-xs uppercase tracking-[0.12em] text-stone-500">{t('Language')}</span>
              <div className="inline-flex rounded-md border border-stone-200 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold ${language === 'en' ? 'bg-stone-900 text-white' : 'text-stone-700'}`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('mk')}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold ${language === 'mk' ? 'bg-stone-900 text-white' : 'text-stone-700'}`}
                >
                  MK
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {publicLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={mobileNavLinkClass}
                  end={item.end}
                  onClick={() => setMenuOpen(false)}
                >
                  {({ isActive }) => (
                    <span className="inline-flex items-center gap-2">
                      <span
                        aria-hidden
                        className={`h-2 w-2 rounded-full transition ${
                          isActive ? 'scale-100 bg-gradient-to-r from-rose-500 to-sky-500 opacity-100' : 'scale-90 bg-stone-300 opacity-70'
                        }`}
                      />
                      {t(item.label)}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
            {token && (
              <NavLink to="/dashboard" className={mobileNavLinkClass} onClick={() => setMenuOpen(false)}>
                {({ isActive }) => (
                  <span className="inline-flex items-center gap-2">
                    <span
                      aria-hidden
                      className={`h-2 w-2 rounded-full transition ${
                        isActive ? 'scale-100 bg-gradient-to-r from-rose-500 to-sky-500 opacity-100' : 'scale-90 bg-stone-300 opacity-70'
                      }`}
                    />
                    {t('Dashboard')}
                  </span>
                )}
              </NavLink>
            )}
            <div className="mt-3 border-t border-stone-200/80 pt-3">
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
                    className="btn-secondary py-3"
                  >
                    {t('Sign In')}
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate('/signup');
                    }}
                    className="btn-primary py-3"
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
