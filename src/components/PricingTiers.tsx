import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SAMPLE_TIERS, type SampleTierMeta } from '../data/sampleTierCatalog';
import { useI18n } from '../context/I18nContext';
import { onSampleImageError } from './sample-sites/SampleShared';

export const PricingTiers: React.FC<{ onSelectTier?: (tier: SampleTierMeta) => void }> = ({ onSelectTier }) => {
  const [selectedTier, setSelectedTier] = useState<string>('plus');
  const { t, pathFor } = useI18n();

  const handleSelect = (tier: SampleTierMeta) => {
    setSelectedTier(tier.id);
    onSelectTier?.(tier);
  };

  const previousTierFor = (tier: SampleTierMeta): SampleTierMeta | null => {
    if (tier.id === 'plus') return SAMPLE_TIERS.find((t) => t.id === 'basic') ?? null;
    if (tier.id === 'premium') return SAMPLE_TIERS.find((t) => t.id === 'plus') ?? null;
    if (tier.id === 'platinum') return SAMPLE_TIERS.find((t) => t.id === 'premium') ?? null;
    return null;
  };

  const visibleFeatures = (tier: SampleTierMeta) =>
    tier.cumulativeFeatures.filter((feature, index) => {
      if (tier.id === 'basic') return true;
      return !(index === 0 && /^Everything in /i.test(feature));
    });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{t('Plans')}</p>
        <h2 className="mt-2 text-4xl font-semibold text-stone-900">{t('Choose your wedding website plan')}</h2>
        <p className="mt-2 text-sm text-stone-600">{t('Each tier builds on the previous one and unlocks a richer guest experience.')}</p>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
        {SAMPLE_TIERS.map((tier) => {
          const selected = selectedTier === tier.id;
          const featured = tier.id === 'plus';
          const previousTier = previousTierFor(tier);
          const buildOnLabel =
            tier.id === 'basic'
              ? 'Basic'
              : tier.id === 'plus'
                ? 'Basic +'
                : tier.id === 'premium'
                  ? 'Plus +'
                  : 'Premium +';

          return (
            <article
              key={tier.id}
              className={`relative overflow-hidden border p-4 transition ${
                selected
                  ? 'border-rose-300 bg-white shadow-[0_20px_34px_rgba(28,18,13,0.10)]'
                  : 'border-stone-200/80 bg-white/88 shadow-[0_8px_20px_rgba(28,18,13,0.05)] hover:-translate-y-0.5 hover:shadow-[0_14px_26px_rgba(28,18,13,0.08)]'
              }`}
              style={{ borderRadius: 8 }}
            >
              <div className="relative mb-4 overflow-hidden" style={{ borderRadius: 8 }}>
                <img
                  src={tier.heroImage}
                  alt={`${tier.name} sample preview`}
                  onError={onSampleImageError}
                  className="h-32 w-full object-cover transition duration-500 hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${tier.accent} opacity-25`} />
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute inset-x-0 top-3 flex justify-center">
                  <span
                    className="inline-flex items-center border border-white/30 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur"
                    style={{ borderRadius: 6 }}
                  >
                    {t(buildOnLabel)}
                  </span>
                </div>
              </div>

              {featured && (
                <span className="absolute right-3 top-3 border border-rose-200 bg-rose-50 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-rose-700" style={{ borderRadius: 6 }}>
                  {t('Most Popular')}
                </span>
              )}

              <div className={`inline-flex bg-gradient-to-r ${tier.accent} px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white`} style={{ borderRadius: 6 }}>
                {t(tier.name)}
              </div>
              <h3 className="mt-3 text-2xl font-semibold text-stone-900">{t(tier.label)}</h3>
              <p className="mt-2 text-sm text-stone-600">{t(tier.summaryLine)}</p>

              <p className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-stone-900">{tier.priceLabel}</span>
                <span className="text-sm text-stone-500">{t('per wedding')}</span>
              </p>

              <div className="mt-4 grid gap-2">
                <button
                  type="button"
                  onClick={() => handleSelect(tier)}
                  className={`w-full ${selected ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {selected ? t('Selected Plan') : t('Select Plan')}
                </button>
                <Link
                  to={pathFor(tier.route)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-flat w-full justify-center text-rose-700"
                >
                  {t('Open Sample')}
                </Link>
              </div>

              <div className="mt-4 border-t border-stone-200/70 pt-4">
                {tier.id === 'basic' ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
                      {t('Includes')}
                    </p>
                    <span
                      className={`inline-flex items-center rounded-full bg-gradient-to-r ${tier.accent} px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white`}
                    >
                      {t('Invite Basics')}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
                      {t('Everything in')}
                    </p>
                    {previousTier ? (
                      <span
                        className={`inline-flex items-center rounded-full bg-gradient-to-r ${previousTier.accent} px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white`}
                      >
                        {t(previousTier.name)}
                      </span>
                    ) : null}
                  </div>
                )}
                <ul className="mt-2 space-y-2 text-sm text-stone-700">
                  {visibleFeatures(tier).map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-[2px] text-sm font-bold leading-none text-rose-600" aria-hidden>
                        +
                      </span>
                      <span>{t(feature)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
