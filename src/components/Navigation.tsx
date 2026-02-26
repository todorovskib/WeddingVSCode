import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import { BrandLogo } from './BrandLogo';
import { stripLocaleFromPathname, withLocalePath } from '../i18n/localePath';

const desktopNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `group relative inline-flex h-10 items-center justify-center py-2 text-[14px] font-semibold transition-colors ${
    isActive
      ? 'text-stone-950'
      : 'text-stone-700 hover:text-stone-900'
  }`;

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex w-full items-center justify-center rounded-md px-4 py-2.5 text-[15px] font-semibold transition ${
    isActive
      ? 'bg-gradient-to-r from-rose-100/90 via-amber-50/90 to-sky-100/90 text-stone-950 ring-1 ring-rose-200/80 shadow-[0_12px_24px_rgba(28,18,13,0.08)]'
      : 'text-stone-700 hover:bg-white/70 hover:text-stone-900'
  }`;

const FlagIcon: React.FC<{ country: 'uk' | 'mk'; className?: string }> = ({ country, className }) => {
  if (country === 'uk') {
    return (
      <svg viewBox="0 0 60 40" className={className} aria-hidden focusable="false">
        <defs>
          <clipPath id="flag-uk-clip-nav">
            <rect width="60" height="40" rx="2" ry="2" />
          </clipPath>
        </defs>
        <g clipPath="url(#flag-uk-clip-nav)">
          <rect width="60" height="40" fill="#012169" />
          <path d="M0 0 60 40M60 0 0 40" stroke="#fff" strokeWidth="8" />
          <path d="M0 0 60 40M60 0 0 40" stroke="#C8102E" strokeWidth="4" />
          <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="12" />
          <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="7" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden focusable="false">
      <rect width="60" height="40" rx="2" ry="2" fill="#D20000" />
      <circle cx="30" cy="20" r="5" fill="#FFE600" />
      <path d="M30 20 60 20M30 20 0 20M30 20 30 0M30 20 30 40" stroke="#FFE600" strokeWidth="3.5" />
      <path d="M30 20 53 5M30 20 7 5M30 20 53 35M30 20 7 35" stroke="#FFE600" strokeWidth="3" />
      <path d="M30 20 60 8M30 20 0 8M30 20 60 32M30 20 0 32" stroke="#FFE600" strokeWidth="2.4" />
    </svg>
  );
};

const FlagButton: React.FC<{
  active: boolean;
  country: 'uk' | 'mk';
  label: string;
  onClick: () => void;
}> = ({ active, country, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex h-8 min-w-10 items-center justify-center border px-2 text-sm transition ${
      active
        ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
        : 'border-transparent text-stone-700 hover:bg-white/75 hover:text-stone-900'
    }`}
    style={{ borderRadius: 6 }}
    aria-label={label}
    title={label}
  >
    <FlagIcon country={country} className="h-4 w-6 rounded-[2px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]" />
  </button>
);

export const Navigation: React.FC = () => {
  const { user, logout, token } = useAuth();
  const { language, t, pathFor } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const basePath = stripLocaleFromPathname(location.pathname);
  const isAuthPage = basePath === '/login' || basePath === '/signup';
  const isStandaloneSample = basePath.startsWith('/samples/');
  if (isAuthPage || isStandaloneSample) return null;

  const switchLanguage = (next: 'en' | 'mk') => {
    if (language === next) return;
    setMenuOpen(false);
    navigate(`${withLocalePath(basePath || '/', next)}${location.search}${location.hash}`);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate(pathFor('/'), { replace: true });
  };

  const publicLinks: Array<{ to: string; label: string; end?: boolean }> = [
    { to: '/', label: 'Home', end: true },
    { to: '/services', label: 'Services' },
    { to: '/collaborations', label: 'Collaborations' },
    { to: '/products', label: 'Products' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-stone-300/60 bg-[#f4ede3]/88 backdrop-blur-xl">
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="grid min-h-[68px] grid-cols-[1fr_auto] items-center gap-3 md:grid-cols-[auto_1fr_auto]">
          <div className="flex items-center">
            <Link to={pathFor('/')} className="shrink-0 py-1" aria-label="WedMKD">
              <BrandLogo subtitle={t('Wedding Platform')} />
            </Link>
          </div>

          <nav className="hidden items-center justify-center gap-4 xl:gap-5 lg:flex" aria-label="Primary">
            {publicLinks.map((item) => (
              <NavLink key={item.to} to={pathFor(item.to)} className={desktopNavLinkClass} end={item.end}>
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
              <NavLink to={pathFor('/dashboard')} className={desktopNavLinkClass}>
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
            <div className="inline-flex h-10 items-center border border-stone-200/80 bg-white/75 p-1 shadow-[0_8px_16px_rgba(28,18,13,0.05)]" style={{ borderRadius: 7 }}>
              <FlagButton active={language === 'en'} country="uk" label={t('English')} onClick={() => switchLanguage('en')} />
              <FlagButton active={language === 'mk'} country="mk" label={t('Macedonian')} onClick={() => switchLanguage('mk')} />
            </div>
            {token ? (
              <>
                {user?.email && <span className="hidden text-sm font-medium text-stone-600 lg:inline">{user.email}</span>}
                <button onClick={handleLogout} className="btn-secondary h-10 px-4 py-2 text-sm">
                  {t('Logout')}
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate(pathFor('/login'))} className="btn-ghost h-10 rounded-md px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-white/75">
                  {t('Sign In')}
                </button>
                <button onClick={() => navigate(pathFor('/signup'))} className="btn-primary h-10 rounded-md px-4 py-2 text-sm">
                  {t('Create Account')}
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            className="inline-flex h-10 items-center justify-center rounded-md border border-stone-200/90 bg-white/80 px-4 text-sm font-semibold text-stone-800 shadow-[0_8px_18px_rgba(28,18,13,0.06)] backdrop-blur lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {t('Menu')}
          </button>
        </div>

        {menuOpen && (
          <div className="mb-3 rounded-md border border-stone-200/80 bg-white/88 p-3 shadow-[0_18px_40px_rgba(28,18,13,0.08)] backdrop-blur-xl lg:hidden">
            <div className="mb-3 flex items-center justify-between rounded-md border border-stone-200/80 bg-white/80 px-4 py-3">
              <span className="text-xs uppercase tracking-[0.12em] text-stone-500">{t('Language')}</span>
              <div className="inline-flex rounded-md border border-stone-200 bg-white p-1">
                <FlagButton active={language === 'en'} country="uk" label={t('English')} onClick={() => switchLanguage('en')} />
                <FlagButton active={language === 'mk'} country="mk" label={t('Macedonian')} onClick={() => switchLanguage('mk')} />
              </div>
            </div>
            <div className="space-y-2">
              {publicLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={pathFor(item.to)}
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
              <NavLink to={pathFor('/dashboard')} className={mobileNavLinkClass} onClick={() => setMenuOpen(false)}>
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
              {token ? (
                <div className="space-y-2">
                  {user?.email && <p className="text-xs text-stone-600">{user.email}</p>}
                  <button
                    onClick={() => {
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
                      navigate(pathFor('/login'));
                    }}
                    className="btn-secondary py-3"
                  >
                    {t('Sign In')}
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(pathFor('/signup'));
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

