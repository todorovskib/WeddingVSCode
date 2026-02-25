import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';
import { BrandLogo } from './BrandLogo';
import { SocialIcon, type SocialIconName } from './icons/BrandIcons';

type SocialLink = {
  label: string;
  href: string;
  icon: SocialIconName;
};

const socialLinks: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { label: 'TikTok', href: 'https://tiktok.com', icon: 'tiktok' },
  { label: 'Pinterest', href: 'https://pinterest.com', icon: 'pinterest' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
];

const publicNavLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/collaborations', label: 'Collaborations' },
  { to: '/products', label: 'Products' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/samples', label: 'Samples' },
  { to: '/contact', label: 'Contact' },
  { to: '/shop', label: 'Shop' },
];

const legalLinks = [
  { to: '/cookies', label: 'Cookie Policy' },
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Service' },
];

export const SiteFooter: React.FC = () => {
  const location = useLocation();
  const { t, language } = useI18n();
  const hiddenOnRoutes = ['/login', '/signup'];
  const hideForWorkspace =
    location.pathname === '/dashboard' || location.pathname.startsWith('/wedding/');
  const hidden = hiddenOnRoutes.includes(location.pathname) || hideForWorkspace;

  if (hidden) return null;

  const currentYear = new Date().getFullYear();
  const isMk = language === 'mk';
  const footerBanner =
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=80';
  const footerFallback =
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80';

  const handleFooterImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const el = event.currentTarget;
    if (el.dataset.fallbackApplied === '1') return;
    el.dataset.fallbackApplied = '1';
    el.src = footerFallback;
  };

  return (
    <footer className="mt-10 border-t border-stone-200/80 bg-[#f5efe7]/80">
      <div className="relative overflow-hidden border-b border-stone-200/70">
        <img
          src={footerBanner}
          onError={handleFooterImageError}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: 'blur(1.3px)', transform: 'scale(1.03)' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-stone-900/66" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(143,76,69,0.20),transparent_42%),radial-gradient(circle_at_84%_20%,rgba(79,127,118,0.18),transparent_42%)]" />

        <div className="page-wrap relative py-8 text-white sm:py-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl [text-shadow:0_2px_14px_rgba(0,0,0,0.45)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">WedMKD</p>
              <p className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                {isMk
                  ? 'ÐŸÐ¾ÐºÐ°Ð½Ð¸, ÑÐ²Ð°Ð´Ð±ÐµÐ½Ð¸ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð¸ Ð¸ Ð¾Ñ€Ð³Ð°Ð½Ð¸Ð·Ð°Ñ†Ð¸Ñ˜Ð° Ð²Ð¾ ÐµÐ´Ð½Ð¾ Ð¸ÑÐºÑƒÑÑ‚Ð²Ð¾'
                  : 'Invitations, wedding websites, and planning in one experience'}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
                {isMk
                  ? 'ÐÐ°Ñ˜Ð²Ð°Ð¶Ð½Ð¸Ñ‚Ðµ Ð»Ð¸Ð½ÐºÐ¾Ð²Ð¸, Ð¿Ñ€Ð¸Ð¼ÐµÑ€Ð¸ Ð¸ ÐºÐ¾Ð½Ñ‚Ð°ÐºÑ‚ Ð²ÐµÑœÐµ Ð²Ð¸ ÑÐµ Ð´Ð¾ÑÑ‚Ð°Ð¿Ð½Ð¸ Ð¿Ð¾Ð´Ð¾Ð»Ñƒ.'
                  : 'Everything important stays easy to reach below: links, samples, contact, and legal pages.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/pricing" className="btn-secondary bg-white/95">
                {t('Pricing')}
              </Link>
              <Link to="/samples" className="btn-secondary bg-white/95">
                {t('See Samples')}
              </Link>
              <Link to="/contact" className="btn-primary">
                {t('Contact Us')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#faf6ef]/88">
        <div className="page-wrap py-8 sm:py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr_0.9fr_1.1fr]">
            <section>
              <BrandLogo subtitle={t('Wedding Platform')} />
              <h2 className="mt-3 text-3xl font-semibold text-stone-900">
                {t('Wedding websites, planning tools, and product showcases')}
              </h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                {isMk
                  ? 'ÐŸÐ¾Ð¼Ð°Ð·Ð½Ð¾, Ð¿Ð¾ÐºÐ¾Ð¼Ð¿Ð»ÐµÑ‚Ð½Ð¾ Ñ˜Ð°Ð²Ð½Ð¾ Ð¸ÑÐºÑƒÑÑ‚Ð²Ð¾ ÑÐ¾ Ð¿Ð¾ÐºÐ°Ð½Ð¸, Ð¿Ñ€Ð¸Ð¼ÐµÑ€-ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð¸, Ñ†ÐµÐ½Ð¾Ð²Ð½Ð¸Ðº, Ð¿Ñ€Ð¾Ð¸Ð·Ð²Ð¾Ð´Ð¸ Ð¸ ÐºÐ°Ñ‚ÐµÐ³Ð¾Ñ€Ð¸Ð¸ Ð½Ð° ÑÐ¾Ñ€Ð°Ð±Ð¾Ñ‚Ð½Ð¸Ñ†Ð¸.'
                  : 'A smoother, more complete public experience with invitations, sample pages, pricing, products, and collaboration categories.'}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/contact" className="btn-primary">
                  {t('Contact Us')}
                </Link>
                <Link to="/samples" className="btn-secondary">
                  {t('See Samples')}
                </Link>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-stone-900">{t('Site Links')}</h3>
              <ul className="mt-3 space-y-2">
                {publicNavLinks.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="text-sm text-stone-600 transition hover:text-stone-900 hover:underline">
                      {t(item.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-stone-900">{t('Sample Tiers')}</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link to="/samples/basic" target="_blank" rel="noopener noreferrer" className="text-sm text-stone-600 hover:text-stone-900 hover:underline">
                    {t('Basic Sample')}
                  </Link>
                </li>
                <li>
                  <Link to="/samples/pro" target="_blank" rel="noopener noreferrer" className="text-sm text-stone-600 hover:text-stone-900 hover:underline">
                    {t('Pro Sample')}
                  </Link>
                </li>
                <li>
                  <Link to="/samples/premium" target="_blank" rel="noopener noreferrer" className="text-sm text-stone-600 hover:text-stone-900 hover:underline">
                    {t('Premium Sample')}
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-sm text-stone-600 hover:text-stone-900 hover:underline">
                    {t('Pricing')}
                  </Link>
                </li>
                {legalLinks.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="text-sm text-stone-600 hover:text-stone-900 hover:underline">
                      {t(item.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-stone-900">{t('Follow & Contact')}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={t(social.label)}
                    title={t(social.label)}
                    className="social-icon-btn"
                  >
                    <SocialIcon name={social.icon} className="social-icon" title={t(social.label)} />
                  </a>
                ))}
              </div>
              <div className="mt-4 space-y-2 text-sm text-stone-600">
                <p>
                  {t('Email:')}{' '}
                  <a href="mailto:hello@wedmkd.com" className="font-medium text-stone-800 hover:underline">
                    hello@wedmkd.com
                  </a>
                </p>
                <p>
                  {t('Phone:')}{' '}
                  <a href="tel:+38970123456" className="font-medium text-stone-800 hover:underline">
                    +389 70 123 456
                  </a>
                </p>
                <p>{t('Skopje, North Macedonia')}</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-200/80 bg-[#f6f0e6]/92">
        <div className="page-wrap py-4">
          <div className="flex flex-col gap-3 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              {isMk
                ? `(c) ${currentYear} WedMKD. ${t('All rights reserved.')}`
                : `(c) ${currentYear} WedMKD. All rights reserved.`}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/cookies" className="hover:text-stone-700 hover:underline">
                {t('Cookie Policy')}
              </Link>
              <Link to="/privacy" className="hover:text-stone-700 hover:underline">
                {t('Privacy Policy')}
              </Link>
              <Link to="/terms" className="hover:text-stone-700 hover:underline">
                {t('Terms of Service')}
              </Link>
              <Link to="/contact" className="hover:text-stone-700 hover:underline">
                {t('Contact')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
