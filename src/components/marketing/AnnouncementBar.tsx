import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';

interface AnnouncementBarProps {
  tag?: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaTo?: string;
  ctaNewTab?: boolean;
  accentClass?: string;
  dismissible?: boolean;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  tag = 'New',
  title,
  description,
  ctaLabel,
  ctaTo,
  ctaNewTab = false,
  accentClass = 'from-rose-400 via-fuchsia-500 to-violet-600',
  dismissible = true,
}) => {
  const { pathname } = useLocation();
  const { t, pathFor } = useI18n();
  const storageKey = useMemo(
    () => `wedmkd-announcement-dismissed:${pathname}:${title}`,
    [pathname, title]
  );
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!dismissible) return;
    setDismissed(window.localStorage.getItem(storageKey) === '1');
  }, [dismissible, storageKey]);

  if (dismissible && dismissed) return null;

  return (
    <div className="page-wrap pt-4">
      <div className="announcement-band mesh-panel overflow-hidden px-4 py-3 sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className={`inline-flex rounded-full bg-gradient-to-r ${accentClass} px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white`}>
              {t(tag)}
            </span>
            <div>
              <p className="text-sm font-semibold text-stone-900">{t(title)}</p>
              {description && <p className="text-xs text-stone-600 sm:text-sm">{t(description)}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {ctaLabel && ctaTo && (
              <Link
                to={pathFor(ctaTo)}
                className="btn-secondary shrink-0"
                target={ctaNewTab ? '_blank' : undefined}
                rel={ctaNewTab ? 'noopener noreferrer' : undefined}
              >
                {t(ctaLabel)}
              </Link>
            )}
            {dismissible && (
              <button
                type="button"
                onClick={() => {
                  window.localStorage.setItem(storageKey, '1');
                  setDismissed(true);
                }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200/80 bg-white/80 text-sm font-semibold text-stone-600 transition hover:bg-white hover:text-stone-900"
                aria-label={t('Close')}
                title={t('Close')}
              >
                <span aria-hidden>&times;</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
