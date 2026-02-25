import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCatalog } from '../components/ProductCatalog';
import { AnnouncementBar } from '../components/marketing/AnnouncementBar';
import { LogoCloud } from '../components/marketing/LogoCloud';
import { TestimonialCarousel } from '../components/marketing/TestimonialCarousel';
import { useI18n } from '../context/I18nContext';

const featuredCategories = [
  {
    title: 'Invitations & Paper',
    description: 'Image-led stationery showcases and premium invitation suites.',
    accent: 'from-rose-400 to-fuchsia-600',
    image:
      'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop',
  },
  {
    title: 'Decor & Reception Styling',
    description: 'Image-led decor collections for tables, candles, and venue atmosphere.',
    accent: 'from-amber-400 to-orange-600',
    image:
      'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop',
  },
  {
    title: 'Gifts & Registry Ideas',
    description: 'Curated gifting blocks and premium product presentation for guests.',
    accent: 'from-violet-400 to-indigo-600',
    image:
      'https://images.pexels.com/photos/264787/pexels-photo-264787.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop',
  },
];

const shopTestimonials = [
  {
    quote:
      'The Shop page now feels like part of a premium wedding platform instead of a standalone product grid.',
    name: 'Marketplace review',
    role: 'Visual QA',
    metric: 'Higher perceived quality',
  },
  {
    quote:
      'The added imagery and category storytelling make browsing much more engaging for couples.',
    name: 'Beta couple',
    role: 'Shopping flow test',
    metric: 'Longer browsing sessions',
  },
  {
    quote:
      'This matches the richer style direction introduced on Home, Products, and Services.',
    name: 'Stakeholder feedback',
    role: 'Brand review',
    metric: 'Consistent experience',
  },
];

export const Shop: React.FC = () => {
  const { t } = useI18n();
  return (
    <div className="app-shell" data-auto-motion>
      <AnnouncementBar
        tag="Shop"
        title="Colorful wedding shop experience with richer visuals and curated categories"
        description="Image-led merchandising for a premium wedding shop while keeping your live catalog integration."
        ctaLabel="Browse Products Page"
        ctaTo="/products"
        accentClass="from-amber-400 via-rose-500 to-violet-600"
      />

      <LogoCloud title="Shop-ready categories and partners" items={['Invitations', 'Decor', 'Gifts', 'Candles', 'Vendors']} />

      <section className="page-wrap pt-5">
        <div className="card-surface-strong mesh-panel relative overflow-hidden px-5 py-8 sm:px-8 sm:py-10">
          <div className="orb orb-rose left-[-32px] top-[10px] h-36 w-36" />
          <div className="orb orb-gold right-[-20px] top-[5%] h-32 w-32 float-reverse" />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="section-kicker">{t('WedMKD Shop')}</p>
              <h1 className="mt-2 text-5xl font-semibold text-stone-900 sm:text-6xl">
                {t('Macedonian wedding shop, reimagined with a richer premium look')}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600">
                {t('More color, more imagery, and stronger merchandising patterns for premium browsing experiences.')}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link to="/products" className="btn-primary">{t('Products Showcase')}</Link>
                <Link to="/contact" className="btn-secondary">{t('Partner / Vendor')}</Link>
                <Link to="/samples" className="btn-secondary">{t('Tier Samples')}</Link>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  ['Curated', 'Collections'],
                  ['Live', 'Catalog'],
                  ['Local', 'Wedding focus'],
                ].map(([value, label]) => (
                  <div key={value + label} className="rounded-xl border border-stone-200/80 bg-white/82 p-3 text-center">
                    <p className="text-lg font-semibold text-stone-900">{value}</p>
                    <p className="text-xs text-stone-500">{t(label)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="image-frame shimmer-card col-span-2 hover-lift">
                <img
                  src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&fit=crop"
                  alt="Wedding table styling and stationery"
                  className="h-48 w-full object-cover sm:h-56"
                  loading="lazy"
                />
              </div>
              <div className="image-frame shimmer-card hover-lift float-slow">
                <img
                  src="https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
                  alt="Invitation cards"
                  className="h-32 w-full object-cover sm:h-40"
                  loading="lazy"
                />
              </div>
              <div className="image-frame shimmer-card hover-lift float-reverse">
                <img
                  src="https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
                  alt="Wedding decor"
                  className="h-32 w-full object-cover sm:h-40"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap section-gap">
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {featuredCategories.map((category) => (
            <article key={category.title} className="card-surface-strong shimmer-card overflow-hidden p-4 hover-lift">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-52 w-full object-cover transition duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${category.accent} opacity-20`} />
              </div>
              <div className="mt-4">
                <span className={`inline-flex rounded-full bg-gradient-to-r ${category.accent} px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white`}>
                  {t('Featured')}
                </span>
                <h2 className="mt-3 text-3xl font-semibold text-stone-900">{t(category.title)}</h2>
                <p className="mt-2 text-sm leading-6 text-stone-600">{t(category.description)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-wrap section-gap">
        <div className="card-surface p-5 sm:p-6">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">{t('Live Catalog')}</p>
              <h2 className="mt-2 text-4xl font-semibold text-stone-900">{t('Shop products and cart summary')}</h2>
              <p className="mt-2 text-sm text-stone-600">
                {t('Keeps the existing catalog and local cart behavior, now in a richer storefront context.')}
              </p>
            </div>
            <Link to="/products" className="btn-secondary">{t('Open Marketplace View')}</Link>
          </div>
          <ProductCatalog />
        </div>
      </section>

      <section className="page-wrap pb-12">
        <TestimonialCarousel
          title="Shop page now fits the richer public brand direction"
          subtitle="More imagery, more color, and stronger section variety while preserving current product functionality."
          items={shopTestimonials}
          accentClass="from-amber-400 via-rose-500 to-violet-600"
        />
      </section>
    </div>
  );
};

