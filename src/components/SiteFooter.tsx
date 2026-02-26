import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';
import { stripLocaleFromPathname } from '../i18n/localePath';
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
  { to: '/contact', label: 'Contact' },
  { to: '/shop', label: 'Shop' },
];

const sampleLinks = [
  { to: '/samples/basic', label: 'Basic Sample' },
  { to: '/samples/plus', label: 'Plus Sample' },
  { to: '/samples/premium', label: 'Premium Sample' },
  { to: '/samples/platinum', label: 'Platinum Sample' },
];

const legalLinks = [
  { to: '/cookies', label: 'Cookie Policy' },
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Service' },
];

export const SiteFooter: React.FC = () => {
  const location = useLocation();
  const { t, pathFor } = useI18n();
  const basePath = stripLocaleFromPathname(location.pathname);

  const hidden =
    basePath === '/login' ||
    basePath === '/signup' ||
    basePath === '/dashboard' ||
    basePath.startsWith('/wedding/') ||
    basePath.startsWith('/samples/');

  if (hidden) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-stone-200/70 bg-[#f7f1e7]">
      <div className="h-1 w-full bg-gradient-to-r from-[#9c4f46] via-[#b47a31] to-[#4f7f76]" />

      <div className="page-wrap pt-5">
        <div className="relative overflow-hidden border border-stone-200/80 shadow-[0_16px_30px_rgba(28,18,13,0.06)]" style={{ borderRadius: 10 }}>
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=80"
            alt="Wedding couple banner"
            className="h-28 w-full object-cover sm:h-32"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c130f]/72 via-[#1c130f]/48 to-[#1c130f]/34" />
          <div className="absolute inset-0 flex flex-col justify-center gap-3 px-4 py-3 text-white sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/78">WedMKD</p>
              <p className="mt-1 text-xl font-semibold leading-none sm:text-2xl">{t('Elegant wedding websites, made by hand')}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to={pathFor('/pricing')} className="btn-flat !border-white/35 !bg-white/92 !text-stone-900 backdrop-blur">{t('Pricing')}</Link>
              <Link to={pathFor('/contact')} className="btn-primary">{t('Contact Us')}</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="page-wrap py-5 sm:py-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.08fr_0.92fr_1fr]">
          <section className="border border-stone-200/80 bg-white/70 p-4 shadow-[0_10px_20px_rgba(28,18,13,0.03)]" style={{ borderRadius: 8 }}>
            <BrandLogo subtitle={t('Wedding Platform')} />
            <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600">
              {t('Wedding websites, planning tools, and product showcases')}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {sampleLinks.map((item) => (
                <Link
                  key={item.to}
                  to={pathFor(item.to)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-stone-200/90 bg-white/88 px-2.5 py-1.5 text-xs font-semibold text-stone-700 transition hover:border-stone-300 hover:text-stone-900"
                  style={{ borderRadius: 6 }}
                >
                  {t(item.label)}
                </Link>
              ))}
            </div>
          </section>

          <section className="border border-stone-200/80 bg-white/66 p-4 shadow-[0_10px_20px_rgba(28,18,13,0.03)]" style={{ borderRadius: 8 }}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">{t('Site Links')}</h3>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
              {publicNavLinks.map((item) => (
                <Link key={item.to} to={pathFor(item.to)} className="text-sm text-stone-700 transition hover:text-stone-900 hover:underline">
                  {t(item.label)}
                </Link>
              ))}
            </div>
            <div className="mt-4 border-t border-stone-200/80 pt-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">{t('Legal')}</h4>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-stone-600">
                {legalLinks.map((item) => (
                  <Link key={item.to} to={pathFor(item.to)} className="hover:text-stone-800 hover:underline">
                    {t(item.label)}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="border border-stone-200/80 bg-white/66 p-4 shadow-[0_10px_20px_rgba(28,18,13,0.03)]" style={{ borderRadius: 8 }}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">{t('Follow & Contact')}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={t(social.label)} title={t(social.label)} className="social-icon-btn">
                  <SocialIcon name={social.icon} className="social-icon" title={t(social.label)} />
                </a>
              ))}
            </div>
            <div className="mt-4 grid gap-2 text-sm text-stone-600">
              <p className="border border-stone-200/75 bg-white/78 px-3 py-2" style={{ borderRadius: 6 }}>
                {t('Email:')} <a href="mailto:hello@wedmkd.com" className="font-medium text-stone-800 hover:underline">hello@wedmkd.com</a>
              </p>
              <p className="border border-stone-200/75 bg-white/78 px-3 py-2" style={{ borderRadius: 6 }}>
                {t('Phone:')} <a href="tel:+38970123456" className="font-medium text-stone-800 hover:underline">+389 70 123 456</a>
              </p>
              <p className="border border-stone-200/75 bg-white/78 px-3 py-2" style={{ borderRadius: 6 }}>{t('Skopje, North Macedonia')}</p>
            </div>
          </section>
        </div>
      </div>

      <div className="border-t border-stone-200/80 bg-[#f2e9dc]">
        <div className="page-wrap py-3">
          <div className="grid gap-2 text-xs text-stone-500 sm:grid-cols-[1fr_auto] sm:items-center">
            <p>{`© ${currentYear} WedMKD. ${t('All rights reserved.')}`}</p>
            <p className="sm:text-right">{t('Made for modern wedding experiences.')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
