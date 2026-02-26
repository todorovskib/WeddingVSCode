import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { SAMPLE_TIER_BY_ID, type SampleTierId } from '../data/sampleTierCatalog';
import { useI18n } from '../context/I18nContext';
import { BasicSampleSite } from '../components/sample-sites/BasicSample';
import { PlusSampleSite } from '../components/sample-sites/PlusSample';
import { PremiumSampleSite } from '../components/sample-sites/PremiumSample';
import { PlatinumSampleSite } from '../components/sample-sites/PlatinumSample';
import '../styles/sample-sites.css';

function normalizeTierParam(raw: string | undefined): SampleTierId | null {
  if (!raw) return null;
  const value = raw.toLowerCase();
  if (value === 'pro') return 'plus';
  if (value === 'basic' || value === 'plus' || value === 'premium' || value === 'platinum') return value;
  return null;
}

const SampleNotFound: React.FC = () => {
  const { pathFor } = useI18n();
  return (
    <div className="sample-site-root sample-font-modern flex min-h-screen items-center justify-center bg-[#f7f2ea] p-4 text-stone-900">
      <div className="sample-surface w-full max-w-xl rounded-2xl p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Sample not found</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Choose a valid tier sample</h1>
        <p className="mt-3 text-sm leading-7 text-stone-600">
          Available sample pages: Basic, Plus, Premium, and Platinum. These open as standalone wedding websites from the pricing page.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link to={pathFor('/pricing')} className="sample-btn sample-btn-primary">
            Open pricing
          </Link>
          <Link to={pathFor('/')} className="sample-btn sample-btn-secondary">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export const TierSample: React.FC = () => {
  const { tier, page } = useParams<{ tier: string; page?: string }>();
  const normalizedTier = normalizeTierParam(tier);

  if (!normalizedTier) return <SampleNotFound />;

  void SAMPLE_TIER_BY_ID[normalizedTier];

  if (normalizedTier === 'basic') return <BasicSampleSite />;
  if (normalizedTier === 'plus') return <PlusSampleSite />;
  if (normalizedTier === 'premium') return <PremiumSampleSite page={page} />;
  if (normalizedTier === 'platinum') return <PlatinumSampleSite page={page} />;
  return <SampleNotFound />;
};
