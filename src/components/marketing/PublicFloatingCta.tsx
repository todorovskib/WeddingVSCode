import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';
import { stripLocaleFromPathname } from '../../i18n/localePath';

export const PublicFloatingCta: React.FC = () => {
  const location = useLocation();
  const { t, pathFor } = useI18n();
  const [dismissed, setDismissed] = useState(false);
  const basePath = stripLocaleFromPathname(location.pathname);
  const hiddenRoutes = ['/login', '/signup', '/dashboard', '/samples', '/pricing'];
  const hidden =
    hiddenRoutes.includes(basePath) ||
    basePath.startsWith('/samples/') ||
    basePath.startsWith('/wedding/');

  useEffect(() => {
    const value = window.localStorage.getItem('wedmkd-floating-cta-dismissed');
    setDismissed(value === '1');
  }, []);

  const handleDismiss = () => {
    window.localStorage.setItem('wedmkd-floating-cta-dismissed', '1');
    setDismissed(true);
  };

  if (hidden || dismissed) return null;

  return (
    <aside className="floating-cta hidden md:block">
      <div className="flex items-start gap-3 p-4">
        <span className="glow-dot mt-2" aria-hidden />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-semibold text-stone-900">{t('Need a more luxury feel?')}</p>
            <button
              type="button"
              onClick={handleDismiss}
              className="rounded-md px-2 py-1 text-xs font-semibold text-stone-500 transition hover:bg-white/70 hover:text-stone-800"
              aria-label={t('Close')}
              title={t('Close')}
            >
              <span aria-hidden>&times;</span>
            </button>
          </div>
          <p className="mt-1 text-xs leading-5 text-stone-600">
            {t('Compare tier sample pages, view services, or contact us for a premium design direction.')}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link to={pathFor('/pricing')} className="btn-primary">{t('Pricing')}</Link>
            <Link to={pathFor('/contact')} className="btn-secondary">{t('Contact')}</Link>
          </div>
        </div>
      </div>
    </aside>
  );
};
