import React from 'react';
import { Link } from 'react-router-dom';
import { tierSampleList } from '../data/tierSamples';
import { AnnouncementBar } from '../components/marketing/AnnouncementBar';
import { LogoCloud } from '../components/marketing/LogoCloud';
import { TestimonialCarousel } from '../components/marketing/TestimonialCarousel';
import { useI18n } from '../context/I18nContext';

const sampleTestimonials = [
  {
    quote: 'The sample hub makes the upgrade path obvious and gives couples confidence before signup.',
    name: 'Planner studio',
    role: 'Sales demo feedback',
    metric: 'Stronger tier understanding',
  },
  {
    quote: 'Premium sample pages instantly communicate quality. This is much closer to the reference platforms.',
    name: 'Couple user test',
    role: 'Visual review',
    metric: 'Higher trust',
  },
  {
    quote: 'Great for presenting differences between plans without a long sales explanation.',
    name: 'Internal stakeholder',
    role: 'Product strategy',
    metric: 'Faster demos',
  },
];

export const Samples: React.FC = () => {
  const { t } = useI18n();
  return (
    <div className="app-shell" data-auto-motion>
      <AnnouncementBar
        tag="Samples"
        title="Tier sample websites added for Basic, Pro, and Premium"
        description="Use these as conversion tools and visual references for future design expansion."
        ctaLabel="Open Premium Sample"
        ctaTo="/samples/premium"
        accentClass="from-amber-400 via-rose-500 to-fuchsia-600"
      />

      <LogoCloud title="Sample pages are useful for demos, sales conversations, and client onboarding" items={['Basic', 'Pro', 'Premium', 'RSVP', 'Registry', 'Seating']} />

      <section className="page-wrap pt-5">
        <div className="card-surface-strong mesh-panel relative overflow-hidden px-5 py-10 sm:px-8">
          <div className="orb orb-rose left-[-40px] top-[-30px] h-40 w-40" />
          <div className="orb orb-gold right-[-24px] top-[40px] h-32 w-32 float-reverse" />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="section-kicker">{t('Sample Websites')}</p>
              <h1 className="mt-2 text-5xl font-semibold text-stone-900 sm:text-6xl">
                {t('Explore wedding website examples by tier')}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
                {t('Each sample shows how Basic, Pro, and Premium plans can look with richer visuals, more images, and stronger guest experience depth.')}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link to="/services" className="btn-secondary">{t('See Services')}</Link>
                <Link to="/products" className="btn-secondary">{t('See Products')}</Link>
                <Link to="/contact" className="btn-primary">{t('Talk to Us')}</Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {tierSampleList.flatMap((tier) => tier.collageImages.slice(0, 2)).slice(0, 4).map((image, idx) => (
                <div key={`${image}-${idx}`} className={`image-frame shimmer-card ${idx % 2 === 0 ? 'float-slow' : 'float-reverse'}`}>
                  <img src={image} alt={`Sample collage ${idx + 1}`} className="h-32 w-full object-cover sm:h-40" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap section-gap">
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {tierSampleList.map((tier) => (
            <article key={tier.key} className="card-surface-strong shimmer-card overflow-hidden p-4 hover-lift">
              <div className="image-frame rounded-2xl border-0">
                <img src={tier.heroImage} alt={`${tier.name} preview`} className="h-56 w-full object-cover" loading="lazy" />
              </div>
              <div className="mt-4">
                <div className={`inline-flex rounded-full bg-gradient-to-r ${tier.gradient} px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white`}>
                  {t(tier.name)}
                </div>
                <h2 className="mt-3 text-4xl font-semibold text-stone-900">{t(tier.label)}</h2>
                <p className="mt-1 text-sm text-stone-600">{t(tier.badge)}</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-stone-200/80 bg-white/80 p-3">
                    <p className="text-xs text-stone-500">{t('Price')}</p>
                    <p className="text-lg font-semibold text-stone-900">{tier.priceLabel}</p>
                  </div>
                  <div className="rounded-xl border border-stone-200/80 bg-white/80 p-3">
                    <p className="text-xs text-stone-500">{t('Tabs')}</p>
                    <p className="text-lg font-semibold text-stone-900">{tier.tabs.length}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-stone-700">
                  {tier.highlights.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className={`mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r ${tier.gradient}`} />
                      <span>{t(feature)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex gap-2">
                  <Link to={tier.route} className="btn-primary flex-1">
                    {t('Open Sample')}
                  </Link>
                  <Link to="/signup" className="btn-secondary">
                    {t('Choose Tier')}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-wrap section-gap">
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="card-surface p-5 sm:p-6">
            <h2 className="text-4xl font-semibold text-stone-900">{t('What changes across tiers?')}</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-stone-500">
                    <th className="px-3 py-2">{t('Feature')}</th>
                    <th className="px-3 py-2">{t('Basic')}</th>
                    <th className="px-3 py-2">{t('Pro')}</th>
                    <th className="px-3 py-2">{t('Premium')}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['RSVP page', 'Yes', 'Yes', 'Yes'],
                    ['Timeline tab', 'Basic', 'Advanced', 'Advanced'],
                    ['Budget tracker', '-', 'Yes', 'Yes'],
                    ['Gallery layout', 'Simple', 'Enhanced', 'Premium'],
                    ['Registry', '-', 'Optional', 'Yes'],
                    ['Seating preview', '-', '-', 'Yes'],
                    ['Guest interaction depth', 'Low', 'Medium', 'High'],
                  ].map((row) => (
                    <tr key={row[0]} className="border-t border-stone-200/70">
                      {row.map((cell, index) => (
                        <td key={`${row[0]}-${index}`} className="px-3 py-2 text-stone-700">{t(cell)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-5">
            <div className="card-surface-strong p-5 sm:p-6">
              <p className="section-kicker">{t('How to use these samples')}</p>
              <h3 className="mt-2 text-3xl font-semibold text-stone-900">{t('A stronger sales and onboarding tool')}</h3>
              <ul className="mt-4 space-y-2 text-sm text-stone-600">
                <li>{t('Show plan differences visually before pricing discussion')}</li>
                <li>{t('Use as inspiration for client styling choices')}</li>
                <li>{t('Demonstrate premium features like registry and seating previews')}</li>
                <li>{t('Reduce ambiguity around what each tier includes')}</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/samples/basic" className="btn-secondary">{t('Basic')}</Link>
                <Link to="/samples/pro" className="btn-secondary">{t('Pro')}</Link>
                <Link to="/samples/premium" className="btn-primary">{t('Premium')}</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {tierSampleList.flatMap((tier) => tier.collageImages.slice(0, 2)).slice(0, 4).map((img, idx) => (
                <div key={`${img}-detail-${idx}`} className={`image-frame hover-lift ${idx === 0 ? 'col-span-2' : ''}`}>
                  <img src={img} alt={`Sample detail ${idx + 1}`} className={`w-full object-cover ${idx === 0 ? 'h-40' : 'h-28'}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap pb-12">
        <TestimonialCarousel
          title="Tier demos make the product feel premium and easier to buy"
          subtitle="A showcase hub like this helps communicate quality and plan differences faster."
          items={sampleTestimonials}
          accentClass="from-amber-400 via-rose-500 to-fuchsia-600"
        />
      </section>
    </div>
  );
};

