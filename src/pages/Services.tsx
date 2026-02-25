import React from 'react';
import { Link } from 'react-router-dom';
import { AnnouncementBar } from '../components/marketing/AnnouncementBar';
import { LogoCloud } from '../components/marketing/LogoCloud';
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
    description: 'Show couples exactly what Basic, Pro, and Premium sites can look like before choosing.',
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1400&h=800&fit=crop',
    accent: 'from-fuchsia-400 to-rose-600',
    bullets: ['Basic sample', 'Pro sample', 'Premium sample', 'Upgrade prompts'],
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
  const { t } = useI18n();
  return (
    <div className="app-shell" data-auto-motion>
      <AnnouncementBar
        tag="Services"
        title="Service page expanded with richer sections, visual bundles, and tier-aligned positioning"
        description="Designed with richer visual density, stronger hierarchy, and premium service presentation."
        ctaLabel="View Samples"
        ctaTo="/samples"
        accentClass="from-violet-400 via-fuchsia-500 to-rose-500"
      />

      <LogoCloud items={['Planner Studio', 'Venue Atlas', 'Flora Lab', 'Frame House', 'Paper Atelier']} />

      <section className="page-wrap pt-5">
        <div className="card-surface-strong mesh-panel relative overflow-hidden px-5 py-10 sm:px-8">
          <div className="orb orb-rose left-[-30px] top-[-20px] h-40 w-40" />
          <div className="orb orb-sage right-[8%] top-[10%] h-36 w-36 float-reverse" />
          <div className="relative grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <p className="section-kicker">{t('Services')}</p>
              <h1 className="mt-2 text-5xl font-semibold text-stone-900 sm:text-6xl">{t('A full wedding platform service layer')}</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600 sm:text-base">
                {t('WedMKD now presents planning, guest, website, and marketplace capabilities in a more premium, image-led way.')}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link to="/samples" className="btn-primary">{t('View Tier Samples')}</Link>
                <Link to="/collaborations" className="btn-secondary">{t('Collaborations')}</Link>
                <Link to="/products" className="btn-secondary">{t('Products')}</Link>
                <Link to="/contact" className="btn-secondary">{t('Contact Us')}</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {services.slice(0, 4).map((service, idx) => (
                <div key={service.title} className={`image-frame shimmer-card ${idx % 2 === 0 ? 'float-slow' : 'float-reverse'}`}>
                  <img src={service.image} alt={service.title} className="h-36 w-full object-cover sm:h-44" loading="lazy" />
                </div>
              ))}
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
            <Link to="/samples" className="btn-secondary">{t('Compare via samples')}</Link>
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
                <Link to="/samples/basic" className="btn-secondary">{t('Basic')}</Link>
                <Link to="/samples/pro" className="btn-secondary">{t('Pro')}</Link>
                <Link to="/samples/premium" className="btn-primary">{t('Premium')}</Link>
                <Link to="/collaborations" className="btn-secondary">{t('Collaborations')}</Link>
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
          title="A service page that feels premium and credible"
          subtitle="Added visual density, color, and section variety closer to leading wedding platforms while keeping your current app architecture."
          items={testimonials}
          accentClass="from-violet-400 via-fuchsia-500 to-rose-500"
        />
      </section>
    </div>
  );
};

