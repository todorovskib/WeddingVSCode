import React from 'react';
import { Link } from 'react-router-dom';
import { TestimonialCarousel } from '../components/marketing/TestimonialCarousel';
import { useI18n } from '../context/I18nContext';

const services = [
  {
    title: 'Guest Management',
    description: 'Track guests, plus-ones, relationships, dietary needs, and RSVP status from one dashboard.',
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1400&h=800&fit=crop',
    accent: 'from-rose-400 to-pink-600',
    bullets: ['Guest segmentation', 'RSVP tracking', 'Address collection', 'Dietary notes'],
  },
  {
    title: 'Digital Invitations',
    description: 'Create polished invitation pages and shareable links with a modern guest-facing experience.',
    image: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=1400&h=800&fit=crop',
    accent: 'from-violet-400 to-indigo-600',
    bullets: ['Save-the-date pages', 'Visual themes', 'Guest links', 'Update notices'],
  },
  {
    title: 'Planning Tools',
    description: 'Checklist, timeline, and budget views designed for actual planning, not just decoration.',
    image: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=1400&h=800&fit=crop',
    accent: 'from-emerald-400 to-teal-600',
    bullets: ['Checklist progress', 'Event timeline', 'Budget snapshots', 'Organizer workflow'],
  },
  {
    title: 'Guest Website Experience',
    description: 'Build a public-facing site with story, venue details, gallery, FAQ, and registry in one place.',
    image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1400&h=800&fit=crop',
    accent: 'from-amber-400 to-orange-600',
    bullets: ['Hero landing page', 'FAQ + registry', 'Gallery previews', 'Venue details'],
  },
  {
    title: 'Wedding Shop & Products',
    description: 'Showcase invitations, decor, candles, and gifts with a more premium storefront layout.',
    image: 'https://images.pexels.com/photos/264787/pexels-photo-264787.jpeg?auto=compress&cs=tinysrgb&w=1400&h=800&fit=crop',
    accent: 'from-sky-400 to-blue-600',
    bullets: ['Product cards', 'Category filters', 'Cart summary', 'Vendor-ready sections'],
  },
  {
    title: 'Tier-Based Samples',
    description: 'Show couples exactly what Basic, Plus, Premium, and Platinum sites can look like before choosing.',
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1400&h=800&fit=crop',
    accent: 'from-fuchsia-400 to-rose-600',
    bullets: ['Basic sample', 'Plus sample', 'Premium sample', 'Platinum sample'],
  },
];

const packages = [
  {
    name: 'Launch',
    price: '$29',
    accent: 'from-sky-400 to-cyan-500',
    copy: 'Website essentials, RSVP, checklist, and a clean starter experience.',
    features: ['Basic website', 'RSVP page', 'Checklist', 'Guest list starter'],
  },
  {
    name: 'Growth',
    price: '$79',
    accent: 'from-rose-400 to-fuchsia-600',
    copy: 'Adds planning depth, richer tabs, and a more complete guest experience.',
    features: ['Timeline', 'Budget tracker', 'Gallery', 'Advanced RSVP'],
  },
  {
    name: 'Signature',
    price: '$199',
    accent: 'from-amber-400 to-orange-600',
    copy: 'Premium visual presentation and expanded guest/registry workflows.',
    features: ['Registry', 'FAQ', 'Seating preview', 'Premium samples'],
  },
];

const processSteps = [
  ['1', 'Choose style direction', 'Pick a tier sample and visual tone inspired by premium wedding platforms.'],
  ['2', 'Set up your wedding', 'Create the event, add details, and publish your guest-facing site.'],
  ['3', 'Manage guest experience', 'Collect RSVPs, dietary notes, addresses, and questions.'],
  ['4', 'Expand with products and partners', 'Showcase items and vendor categories as the site grows.'],
];

const testimonials = [
  {
    quote: 'The Services page now looks like an actual premium platform menu, not a placeholder.',
    name: 'Studio Owner',
    role: 'Wedding planner partner',
    metric: 'More inquiries',
  },
  {
    quote: 'Clients understand the difference between tiers much faster when they can see sample pages and service bundles.',
    name: 'Sales Demo Feedback',
    role: 'Product direction',
    metric: 'Clearer positioning',
  },
  {
    quote: 'The richer visuals and image-led layout make the whole product feel more trustworthy.',
    name: 'Couple User Test',
    role: 'Beta user',
    metric: 'Higher confidence',
  },
];

export const Services: React.FC = () => {
  const { t, pathFor } = useI18n();
  return (
    <div className="app-shell" data-auto-motion>
      <section className="relative min-h-[52vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          style={{ filter: 'blur(1.2px)', transform: 'scale(1.02)' }}
        />
        <div className="absolute inset-0 bg-black/58" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(156,79,70,0.28),transparent_38%),radial-gradient(circle_at_84%_18%,rgba(79,127,118,0.18),transparent_42%)]" />
        <div className="page-wrap relative flex min-h-[52vh] items-end py-10">
          <div className="max-w-4xl text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/74">{t('Services')}</p>
            <h1 className="mt-3 text-5xl font-semibold leading-[0.96] sm:text-6xl">{t('Custom wedding services, designed by hand')}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/84 sm:text-base">
              {t('From invitation pages and RSVP flows to planning tools and premium presentation, every wedding experience is designed to feel personal, elegant, and clear for guests.')}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to={pathFor('/pricing')} className="btn-secondary bg-white/95">{t('Pricing')}</Link>
              <Link to={pathFor('/samples')} className="btn-secondary bg-white/95">{t('View Samples')}</Link>
              <Link to={pathFor('/contact')} className="btn-primary">{t('Contact Us')}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap section-gap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="card-surface-strong shimmer-card overflow-hidden p-4 hover-lift">
              <div className="image-frame rounded-2xl border-0">
                <img src={service.image} alt={service.title} className="h-48 w-full object-cover transition duration-700 hover:scale-105" loading="lazy" />
              </div>
              <div className="mt-4">
                <div className={`inline-flex rounded-full bg-gradient-to-r ${service.accent} px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white`}>
                  {t('Service')}
                </div>
                <h2 className="mt-3 text-3xl font-semibold text-stone-900">{t(service.title)}</h2>
                <p className="mt-2 text-sm leading-6 text-stone-600">{t(service.description)}</p>
                <ul className="mt-4 space-y-2 text-sm text-stone-700">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className={`mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r ${service.accent}`} />
                      <span>{t(bullet)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-wrap section-gap">
        <div className="card-surface-strong p-5 sm:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">{t('Packages')}</p>
              <h2 className="mt-2 text-4xl font-semibold text-stone-900">{t('Service bundles by wedding stage')}</h2>
            </div>
            <Link to={pathFor('/samples')} className="btn-secondary">{t('Compare via samples')}</Link>
          </div>
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            {packages.map((pack) => (
              <article key={pack.name} className="color-panel overflow-hidden p-4 hover-lift">
                <div className={`inline-flex rounded-full bg-gradient-to-r ${pack.accent} px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white`}>
                  {t(pack.name)}
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-3xl font-semibold text-stone-900">{t(pack.name)}</h3>
                  <span className="badge-pill">{pack.price}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-stone-600">{t(pack.copy)}</p>
                <ul className="mt-4 space-y-2 text-sm text-stone-700">
                  {pack.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className={`mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r ${pack.accent}`} />
                      <span>{t(feature)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-wrap section-gap">
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="card-surface p-5 sm:p-6">
            <p className="section-kicker">{t('Process')}</p>
            <h2 className="mt-2 text-4xl font-semibold text-stone-900">{t('How couples use WedMKD')}</h2>
            <div className="mt-4 space-y-3">
              {processSteps.map(([step, title, body]) => (
                <div key={step} className="rounded-xl border border-stone-200/80 bg-white/80 p-4">
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-900 text-xs font-semibold text-white">
                      {step}
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">{t(title)}</p>
                      <p className="text-sm text-stone-600">{t(body)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="card-surface-strong p-5 sm:p-6">
              <p className="section-kicker">{t('Visual Showcase')}</p>
              <h2 className="mt-2 text-4xl font-semibold text-stone-900">{t('Need a richer demo before choosing?')}</h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                {t('Open the tier samples to show clients exactly what each plan level looks like in a guest-facing experience.')}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link to={pathFor('/samples/basic')} target="_blank" rel="noopener noreferrer" className="btn-secondary">{t('Basic')}</Link>
                <Link to={pathFor('/samples/plus')} target="_blank" rel="noopener noreferrer" className="btn-secondary">{t('Plus')}</Link>
                <Link to={pathFor('/samples/premium')} target="_blank" rel="noopener noreferrer" className="btn-secondary">{t('Premium')}</Link>
                <Link to={pathFor('/samples/platinum')} target="_blank" rel="noopener noreferrer" className="btn-primary">{t('Platinum')}</Link>
                <Link to={pathFor('/collaborations')} className="btn-secondary">{t('Collaborations')}</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {services.slice(2, 6).map((service, idx) => (
                <div key={service.title} className={`image-frame hover-lift ${idx === 0 ? 'col-span-2' : ''}`}>
                  <img src={service.image} alt={`${service.title} visual`} className={`w-full object-cover ${idx === 0 ? 'h-44' : 'h-28'}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap pb-12">
        <TestimonialCarousel
          title={t('A service page that feels premium and credible')}
          subtitle={t('Custom service presentation with clearer structure, richer visuals, and more wedding-first storytelling.')}
          items={testimonials}
          accentClass="from-violet-400 via-fuchsia-500 to-rose-500"
        />
      </section>
    </div>
  );
};

