import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';

interface Tier {
  id: number;
  name: string;
  price: number;
  features: string[];
  maxGuests: number;
  accent: string;
  previewImage: string;
  samplePath: string;
}

const TIERS: Tier[] = [
  {
    id: 1,
    name: 'Basic',
    price: 29,
    maxGuests: 50,
    accent: 'from-sky-400 to-cyan-500',
    previewImage: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=900&h=500&fit=crop',
    samplePath: '/samples/basic',
    features: ['Wedding website', 'Guest list', 'RSVP manager', 'Checklist', 'Digital save-the-date'],
  },
  {
    id: 2,
    name: 'Pro',
    price: 79,
    maxGuests: 200,
    accent: 'from-rose-400 to-pink-600',
    previewImage: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=900&h=500&fit=crop',
    samplePath: '/samples/pro',
    features: ['Everything in Basic', 'Timeline', 'Budget tracker', 'Dietary preferences', 'Address collection', 'Gallery'],
  },
  {
    id: 3,
    name: 'Premium',
    price: 199,
    maxGuests: 500,
    accent: 'from-amber-400 to-orange-600',
    previewImage: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=900&h=500&fit=crop',
    samplePath: '/samples/premium',
    features: ['Everything in Pro', 'Registry', 'FAQ page', 'Private site password', 'Custom domain-ready', 'Priority support'],
  },
];

export const PricingTiers: React.FC<{ onSelectTier?: (tier: Tier) => void }> = ({ onSelectTier }) => {
  const [selectedTier, setSelectedTier] = useState<number | null>(2);
  const { t } = useI18n();

  const handleSelect = (tier: Tier) => {
    setSelectedTier(tier.id);
    onSelectTier?.(tier);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{t('Plans')}</p>
        <h2 className="mt-2 text-4xl font-semibold text-stone-900">{t('Choose your wedding website plan')}</h2>
        <p className="mt-2 text-sm text-stone-600">{t('Flexible tiers for intimate ceremonies and large celebrations.')}</p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {TIERS.map((tier) => {
          const selected = selectedTier === tier.id;
          const featured = tier.name === 'Pro';
          return (
            <article
              key={tier.id}
              className={`relative overflow-hidden rounded-2xl border p-5 transition ${
                selected
                  ? 'border-rose-300 bg-white shadow-xl'
                  : 'border-stone-200/80 bg-white/85 shadow-sm hover:-translate-y-0.5 hover:shadow-lg'
              } ${featured ? 'md:-mt-2 md:mb-2' : ''}`}
            >
              <div className="relative mb-4 overflow-hidden rounded-xl">
                <img
                  src={tier.previewImage}
                  alt={`${tier.name} sample preview`}
                  className="h-28 w-full object-cover transition duration-500 hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${tier.accent} opacity-30`} />
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {featured && (
                <span className="absolute right-4 top-4 rounded-full bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700">
                  {t('Most Popular')}
                </span>
              )}

              <h3 className="text-3xl font-semibold text-stone-900">{t(tier.name)}</h3>
              <p className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-stone-900">${tier.price}</span>
                <span className="text-sm text-stone-500">{t('per wedding')}</span>
              </p>
              <p className="mt-1 text-sm text-stone-600">{`${t('Up to')} ${tier.maxGuests} ${t('guests')}`}</p>

              <button
                type="button"
                onClick={() => handleSelect(tier)}
                className={`mt-4 w-full ${selected ? 'btn-primary' : 'btn-secondary'}`}
              >
                {selected ? t('Selected Plan') : t('Select Plan')}
              </button>

              <Link
                to={tier.samplePath}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost mt-2 w-full justify-center text-rose-700"
              >
                {t('View Sample Website')}
              </Link>

              <ul className="mt-5 space-y-2 text-sm text-stone-700">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    <span>{t(feature)}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
};
