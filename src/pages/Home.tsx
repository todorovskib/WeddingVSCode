import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TestimonialCarousel } from '../components/marketing/TestimonialCarousel';
import { SAMPLE_TIERS } from '../data/sampleTierCatalog';
import { useI18n } from '../context/I18nContext';

const images = {
  hero: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=80',
  story: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80',
  details: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=80',
  floral: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=1600&q=80',
  fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80',
};

const homeTestimonials = [
  {
    quote: 'This feels like a real wedding brand, not a generic website builder. Guests immediately understood where to click.',
    name: 'Marija & Filip',
    role: 'Couple',
    metric: 'Guest clarity',
  },
  {
    quote: 'The tier samples make pricing easier to explain because couples see the difference instantly in a real page.',
    name: 'Planner Studio',
    role: 'Partner',
    metric: 'Faster decisions',
  },
  {
    quote: 'Beautiful visual flow, much calmer than before, and the invitation pages feel personal from the first screen.',
    name: 'Internal design review',
    role: 'UX pass',
    metric: 'More premium feel',
  },
];

function onImageError(event: React.SyntheticEvent<HTMLImageElement>) {
  const el = event.currentTarget;
  if (el.dataset.fallbackApplied === '1') return;
  el.dataset.fallbackApplied = '1';
  el.src = images.fallback;
}

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t, pathFor } = useI18n();
  const hasToken = Boolean(localStorage.getItem('token'));
  const buildLabels: Record<string, string> = {
    basic: 'Basic',
    plus: 'Basic +',
    premium: 'Plus +',
    platinum: 'Premium +',
  };

  return (
    <div className="app-shell" data-auto-motion>
      <section className="relative min-h-[calc(100vh-68px)] overflow-hidden">
        <img
          src={images.hero}
          onError={onImageError}
          alt={t('Elegant wedding atmosphere')}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: 'blur(1.8px)', transform: 'scale(1.03)' }}
        />
        <div className="absolute inset-0 bg-black/62" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(143,76,69,0.30),transparent_38%),radial-gradient(circle_at_84%_18%,rgba(79,127,118,0.16),transparent_42%),radial-gradient(circle_at_70%_84%,rgba(180,122,49,0.16),transparent_34%)]" />

        <div className="page-wrap relative flex min-h-[calc(100vh-68px)] items-center py-10 sm:py-14">
          <div className="max-w-5xl text-white [text-shadow:0_3px_18px_rgba(0,0,0,0.45)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
              {t('Wedding invitations and websites')}
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-[0.94] sm:text-6xl lg:text-7xl xl:text-[5.1rem]">
              {t('Invite your story with style')}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/88 sm:text-xl sm:leading-9">
              {t('Create an elegant wedding invitation with RSVP, event details, and a gentle guest experience that feels personal and modern.')}
            </p>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.20em] text-white/72 sm:text-sm">
              {t('Scroll for samples, pricing, and contact')}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f4ee] py-12 sm:py-16">
        <div className="page-wrap grid gap-7 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[22px] shadow-[0_20px_40px_rgba(28,18,13,0.10)]">
            <img
              src={images.story}
              onError={onImageError}
              alt={t('Couple wedding photo session')}
              className="h-[320px] w-full object-cover sm:h-[420px]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/42 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-xs uppercase tracking-[0.16em] text-white/80">{t('Your day')}</p>
              <p className="mt-2 text-xl font-semibold sm:text-2xl">{t('Gentle design, clear details, calm organization')}</p>
            </div>
          </div>

          <div>
            <p className="section-kicker">{t('How it works')}</p>
            <h2 className="mt-2 text-4xl font-semibold text-stone-900 sm:text-5xl">{t('More wedding, less chaos')}</h2>
            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              {t('We focus on what matters most: a beautiful invitation, guest confirmations, and one clear place where all the details live together.')}
            </p>

            <div className="mt-5 space-y-3">
              {[
                {
                  title: t('Choose the look'),
                  body: t('Pick the style that matches your wedding mood and edit it to feel like you.'),
                },
                {
                  title: t('Collect responses'),
                  body: t('Guests RSVP in one flow, and you keep control of the list without endless messages.'),
                },
                {
                  title: t('Share your day beautifully'),
                  body: t('Timeline, venue details, FAQ, and gallery live in a polished wedding experience.'),
                },
              ].map((step, index) => (
                <div key={step.title} className="border-b border-stone-200/85 pb-3 last:border-b-0 last:pb-0">
                  <div className="flex gap-3">
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-900 text-xs font-semibold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">{step.title}</p>
                      <p className="mt-1 text-sm leading-6 text-stone-600">{step.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="page-wrap">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="section-kicker">{t('Sample Websites')}</p>
              <h2 className="mt-2 text-4xl font-semibold text-stone-900 sm:text-5xl">
                {t('Real wedding sample pages by tier')}
              </h2>
              <p className="mt-3 text-sm leading-7 text-stone-600 sm:text-base">
                {t('Open each sample in a new tab to see a complete wedding website experience. Every tier is designed as a real guest-facing page, not a feature checklist.')}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to={pathFor('/pricing')} className="btn-primary">
                {t('Pricing')}
              </Link>
              <Link to={pathFor('/contact')} className="btn-secondary">
                {t('Contact Us')}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
            {SAMPLE_TIERS.map((tier) => (
              <article key={tier.id} className="overflow-hidden border border-stone-200/85 bg-white shadow-[0_12px_24px_rgba(28,18,13,0.06)]">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={tier.heroImage}
                    onError={onImageError}
                    alt={`${tier.name} sample preview`}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/58 to-transparent" />
                  <div className="absolute inset-x-0 top-3 flex justify-center">
                    <span className="inline-flex items-center border border-white/35 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur" style={{ borderRadius: 6 }}>
                      {t(buildLabels[tier.id] ?? tier.name)}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <div className={`inline-flex rounded-full bg-gradient-to-r ${tier.accent} px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white`}>
                      {t(tier.name)}
                    </div>
                    <p className="mt-2 text-lg font-semibold">{t(tier.label)}</p>
                    <p className="text-sm text-white/85">{tier.priceLabel}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm leading-6 text-stone-600">{t(tier.summaryLine)}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-stone-700">
                    {tier.cumulativeFeatures.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className={`mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r ${tier.accent}`} />
                        <span>{t(feature)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 grid gap-2">
                    <Link to={pathFor(tier.route)} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full">
                      {t('Open Sample')}
                    </Link>
                    <Link to={pathFor('/pricing')} className="btn-ghost w-full justify-center">
                      {t('See Pricing')}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-12 sm:py-16">
        <img src={images.floral} onError={onImageError} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-stone-900/66" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(143,76,69,0.28),transparent_42%),radial-gradient(circle_at_82%_24%,rgba(79,127,118,0.18),transparent_42%),radial-gradient(circle_at_66%_84%,rgba(180,122,49,0.20),transparent_34%)]" />

        <div className="page-wrap relative">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-3xl text-white">
              <p className="section-kicker !text-white/72">{t('Pricing')}</p>
              <h2 className="mt-2 text-4xl font-semibold sm:text-5xl">
                {t('Choose a package for your wedding invitation and website')}
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/82 sm:text-base">
                {t('Pricing is paired with sample pages so you can instantly see how each plan level looks and feels.')}
              </p>
            </div>

            <div className="overflow-hidden border border-white/20 shadow-[0_18px_34px_rgba(0,0,0,0.16)] backdrop-blur-xl">
              <img src={images.details} onError={onImageError} alt="" className="h-64 w-full object-cover sm:h-full" loading="lazy" />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link to={pathFor('/pricing')} className="btn-secondary bg-white/95">
              {t('Open Full Pricing')}
            </Link>
            <Link to={pathFor('/contact')} className="btn-secondary border-white/40 bg-white/92 text-stone-900 hover:bg-white">
              {t('Talk to Us')}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f4ee] py-12 pb-16 sm:py-16 sm:pb-20">
        <div className="page-wrap">
          <TestimonialCarousel
            title={t('How it feels for couples')}
            subtitle={t('Less noise, clearer flow, and a stronger wedding feeling.')}
            items={homeTestimonials.map((item) => ({
              quote: t(item.quote),
              name: t(item.name),
              role: t(item.role),
              metric: t(item.metric),
            }))}
            accentClass="from-[#b48a73] via-[#9c4f46] to-[#6f3733]"
          />

          <div className="mt-8 border border-stone-200/85 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="section-kicker">{t('Next step')}</p>
                <h3 className="mt-2 text-3xl font-semibold text-stone-900 sm:text-4xl">{t('Ready for your invitation?')}</h3>
                <p className="mt-2 text-sm leading-7 text-stone-600">
                  {t('Start from a sample you love and shape it for your day.')}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {!hasToken && (
                  <button type="button" onClick={() => navigate(pathFor('/signup'))} className="btn-flat-dark">
                    {t('Create Account')}
                  </button>
                )}
                <Link to={pathFor('/pricing')} className="btn-flat">
                  {t('Pricing')}
                </Link>
                <Link to={pathFor('/contact')} className="btn-flat">
                  {t('Contact')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
