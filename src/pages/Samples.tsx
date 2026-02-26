import React from 'react';
import { Link } from 'react-router-dom';
import { SAMPLE_TIERS, type SampleTierMeta } from '../data/sampleTierCatalog';
import { useI18n } from '../context/I18nContext';
import { onSampleImageError } from '../components/sample-sites/SampleShared';

function includesPrevLabel(tier: SampleTierMeta): { prefix: string; badge?: string } {
  if (tier.id === 'basic') return { prefix: 'Standalone invite experience' };
  if (tier.id === 'plus') return { prefix: 'Everything in', badge: 'Basic' };
  if (tier.id === 'premium') return { prefix: 'Everything in', badge: 'Plus' };
  return { prefix: 'Everything in', badge: 'Premium' };
}

function visibleCardFeatures(tier: SampleTierMeta): string[] {
  const filtered = tier.cumulativeFeatures.filter((feature, index) => {
    if (tier.id === 'basic') return true;
    return !(index === 0 && /^Everything in /i.test(feature));
  });
  return filtered;
}

export const Samples: React.FC = () => {
  const { t, pathFor } = useI18n();

  return (
    <div className="app-shell" data-auto-motion>
      <section className="page-wrap section-gap">
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
          <div>
            <p className="section-kicker">{t('Sample Websites')}</p>
            <h1 className="mt-2 text-4xl font-semibold text-stone-900 sm:text-5xl lg:text-6xl">{t('Open real wedding websites by tier')}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
              {t('Each sample opens in a new tab as a standalone wedding page. These are guest-facing examples, styled as finished wedding websites rather than feature lists.')}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to={pathFor('/pricing')} className="btn-flat">{t('Open Full Pricing')}</Link>
              <Link to={pathFor('/contact')} className="btn-flat-dark">{t('Contact Us')}</Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {SAMPLE_TIERS.slice(0, 4).map((tier, idx) => (
              <div key={tier.id} className={`image-frame ${idx % 2 ? 'float-reverse' : 'float-slow'}`}>
                <div className="relative h-40 sm:h-48">
                  <img src={tier.previewImages[0] || tier.heroImage} alt={`${tier.name} sample preview`} onError={onSampleImageError} className="h-full w-full object-cover" loading="lazy" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${tier.accent} opacity-20`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-wrap pb-12">
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
          {SAMPLE_TIERS.map((tier) => {
            const includes = includesPrevLabel(tier);
            return (
              <article key={tier.id} className="relative overflow-hidden border border-stone-200/80 bg-white/88 p-4 shadow-[0_14px_26px_rgba(28,18,13,0.06)] hover-lift shimmer-card" style={{ borderRadius: 8 }}>
                <div className="relative overflow-hidden" style={{ borderRadius: 8 }}>
                  <img src={tier.heroImage} alt={`${tier.name} sample hero`} onError={onSampleImageError} className="h-52 w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-r ${tier.accent} opacity-20`} />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75">{t(tier.name)}</p>
                    <p className="mt-1 text-2xl font-semibold leading-none">{t(tier.label)}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">{t(includes.prefix)}</span>
                    {includes.badge ? (
                      <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${tier.accent} px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white`}>
                        {t(includes.badge)}
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full border border-stone-200/90 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-700">
                        {t('Invite only')}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-sm leading-6 text-stone-600">{t(tier.shortDescription)}</p>
                  <p className="mt-3 text-sm font-semibold text-stone-900">{tier.priceLabel}</p>

                  <ul className="mt-3 space-y-2 text-sm text-stone-700">
                    {visibleCardFeatures(tier).slice(0, 4).map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-[2px] text-sm font-bold leading-none text-rose-600" aria-hidden>
                          +
                        </span>
                        <span>{t(feature)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 grid gap-2">
                    <Link to={pathFor(tier.route)} target="_blank" rel="noopener noreferrer" className="btn-flat w-full justify-center">
                      {t('Open Sample')}
                    </Link>
                    <Link to={pathFor('/pricing')} className="btn-secondary w-full justify-center">
                      {t('See Pricing')}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
