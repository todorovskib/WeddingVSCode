import React from 'react';
import { Link } from 'react-router-dom';
import { PricingTiers } from '../components/PricingTiers';
import { TestimonialCarousel } from '../components/marketing/TestimonialCarousel';
import { useI18n } from '../context/I18nContext';

const testimonials = [
  {
    quote: 'Packages and previews are much clearer now. Clients decide faster without long explanations.',
    name: 'Planner studio',
    role: 'Sales conversation',
    metric: 'Faster decisions',
  },
  {
    quote: 'The combination of pricing and sample pages helped us understand plan differences immediately.',
    name: 'Couple test user',
    role: 'Pre-signup flow',
    metric: 'More confidence',
  },
];

const faqs: Array<[string, string]> = [
  ['What is included in the plans?', 'Plans cover sample pages, invitation flow, RSVP experience, and planning features depending on tier level.'],
  ['Can I upgrade later?', 'Yes. You can start with a lower tier and move to a higher one later as your needs grow.'],
  ['Do you support printed invitations?', 'Yes. We support a printed + digital invitation direction through the Products page and partner categories.'],
];

export const PricingPage: React.FC = () => {
  const { t, pathFor } = useI18n();

  return (
    <div className="app-shell" data-auto-motion>
      <section className="bg-[#f7f1e6] py-12 sm:py-16">
        <div className="page-wrap">
          <div className="grid gap-6 lg:grid-cols-[1.06fr_0.94fr] lg:items-end">
            <div>
              <p className="section-kicker">{t('Pricing')}</p>
              <h1 className="mt-2 text-5xl font-semibold text-stone-900 sm:text-6xl">
                {t('Choose a package for your wedding invitation and website')}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600 sm:text-base">
                {t('Pricing is paired with sample pages so you can instantly see how each plan level looks and feels.')}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link to={pathFor('/samples')} className="btn-secondary">
                  {t('View Samples')}
                </Link>
                <Link to={pathFor('/contact')} className="btn-primary">
                  {t('Contact Us')}
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="overflow-hidden border border-stone-200/80 shadow-[0_10px_24px_rgba(28,18,13,0.06)]">
                <img
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80"
                  alt="Wedding couple portrait"
                  className="h-36 w-full object-cover sm:h-44"
                  loading="eager"
                />
              </div>
              <div className="overflow-hidden border border-stone-200/80 shadow-[0_10px_24px_rgba(28,18,13,0.06)]">
                <img
                  src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80"
                  alt="Wedding details styling"
                  className="h-36 w-full object-cover sm:h-44"
                  loading="eager"
                />
              </div>
              <div className="col-span-2 overflow-hidden border border-stone-200/80 shadow-[0_10px_24px_rgba(28,18,13,0.06)]">
                <img
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80"
                  alt="Guests celebrating wedding reception"
                  className="h-40 w-full object-cover sm:h-48"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 border border-stone-200/80 bg-white p-4 shadow-[0_14px_28px_rgba(28,18,13,0.05)] sm:p-6">
            <PricingTiers />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="page-wrap">
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-2xl border border-stone-200/85 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">
                {t('What you get with each package')}
              </h2>
              <ul className="mt-4 space-y-3">
                {[
                  'Tier-based sample pages for a clear visual difference',
                  'Guest experience with RSVP and rich tabs',
                  'Planning features connected to the backend',
                  'Collaboration categories and invitation direction',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-[#5d068f]" />
                    <span className="text-sm leading-7 text-stone-600">{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-stone-200/85 bg-[#f8f4ee] p-5 shadow-sm sm:p-6">
              <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">
                {t('Frequently asked questions')}
              </h2>
              <div className="mt-4 space-y-3">
                {faqs.map(([q, a]) => (
                  <article key={q} className="rounded-xl border border-stone-200/80 bg-white p-4">
                    <h3 className="text-lg font-semibold text-stone-900">{t(q)}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">{t(a)}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f4ee] pb-16 pt-10 sm:pb-20 sm:pt-12">
        <div className="page-wrap">
          <TestimonialCarousel
            title={t('Pricing that is easier to understand')}
            subtitle={t('Sample pages + pricing + contact in one clear flow.')}
            items={testimonials.map((item) => ({
              quote: t(item.quote),
              name: t(item.name),
              role: t(item.role),
              metric: t(item.metric),
            }))}
            accentClass="from-[#8d73ac] via-[#7f58b7] to-[#5d068f]"
          />
        </div>
      </section>
    </div>
  );
};
