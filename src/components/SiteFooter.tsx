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
      <div className="page-wrap py-8 sm:py-10">
        <div className="relative overflow-hidden rounded-[28px] border border-stone-200/80 bg-white/70 shadow-[0_16px_30px_rgba(28,18,13,0.06)]">
          <div className="relative overflow-hidden border-b border-white/20">
            <img
              src={footerBanner}
              onError={handleFooterImageError}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-stone-900/58" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(93,6,143,0.22),transparent_40%),radial-gradient(circle_at_84%_20%,rgba(141,115,172,0.18),transparent_42%)]" />
            <div className="relative px-5 py-6 text-white sm:px-6 sm:py-7">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">WedMKD</p>
                  <p className="mt-1 text-2xl font-semibold leading-tight sm:text-3xl">
                    {isMk
                      ? 'Покани, свадбени страници и организација во едно искуство'
                      : 'Invitations, wedding websites, and planning in one experience'}
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

          <div className="px-5 py-6 sm:px-6 sm:py-7">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr_0.9fr_1.1fr]">
              <section>
                <BrandLogo subtitle={t('Wedding Platform')} />
                <h2 className="mt-2 text-3xl font-semibold text-stone-900">
                  {t('Wedding websites, planning tools, and product showcases')}
                </h2>
                <p className="mt-3 text-sm leading-6 text-stone-600">
                  {isMk
                    ? 'Помазно, покомплетно јавно искуство со покани, пример-страници, ценовник, производи и категории на соработници.'
                    : 'A smoother, more complete public experience with invitations, sample pages, pricing, products, and collaboration categories.'}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link to="/contact" className="btn-primary">{t('Contact Us')}</Link>
                  <Link to="/samples" className="btn-secondary">{t('See Samples')}</Link>
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
                  <li><Link to="/samples/basic" className="text-sm text-stone-600 hover:text-stone-900 hover:underline">{t('Basic Sample')}</Link></li>
                  <li><Link to="/samples/pro" className="text-sm text-stone-600 hover:text-stone-900 hover:underline">{t('Pro Sample')}</Link></li>
                  <li><Link to="/samples/premium" className="text-sm text-stone-600 hover:text-stone-900 hover:underline">{t('Premium Sample')}</Link></li>
                  <li><Link to="/pricing" className="text-sm text-stone-600 hover:text-stone-900 hover:underline">{t('Pricing')}</Link></li>
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
                      aria-label={social.label}
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

            <div className="mt-6 flex flex-col gap-3 border-t border-stone-200/80 pt-4 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
              <p>{isMk ? `(c) ${currentYear} WedMKD. ${t('All rights reserved.')}` : `(c) ${currentYear} WedMKD. All rights reserved.`}</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/cookies" className="hover:text-stone-700 hover:underline">{t('Cookie Policy')}</Link>
                <Link to="/privacy" className="hover:text-stone-700 hover:underline">{t('Privacy Policy')}</Link>
                <Link to="/terms" className="hover:text-stone-700 hover:underline">{t('Terms of Service')}</Link>
                <Link to="/contact" className="hover:text-stone-700 hover:underline">{t('Contact')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
