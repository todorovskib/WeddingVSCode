import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCatalog } from '../components/ProductCatalog';
import { AnnouncementBar } from '../components/marketing/AnnouncementBar';
import { LogoCloud } from '../components/marketing/LogoCloud';
import { TestimonialCarousel } from '../components/marketing/TestimonialCarousel';
import { useI18n } from '../context/I18nContext';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'invitations', label: 'Invitations' },
  { id: 'decor', label: 'Decor' },
  { id: 'gifts', label: 'Gifts' },
  { id: 'vendors', label: 'Vendors' },
];

const showcaseProducts = [
  {
    id: 'invitations',
    title: 'Premium Invitation Suite',
    category: 'invitations',
    price: 'From $3.50 / card',
    image: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=1400&h=800&fit=crop',
    badge: 'Best seller',
    accent: 'from-rose-400 to-pink-600',
  },
  {
    id: 'decor',
    title: 'Table Styling Collection',
    category: 'decor',
    price: 'From $45 / set',
    image: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=1400&h=800&fit=crop',
    badge: 'Decor',
    accent: 'from-amber-400 to-orange-600',
  },
  {
    id: 'gifts',
    title: 'Traditional Gift Packages',
    category: 'gifts',
    price: 'From $90',
    image: 'https://images.pexels.com/photos/264787/pexels-photo-264787.jpeg?auto=compress&cs=tinysrgb&w=1400&h=800&fit=crop',
    badge: 'Gift idea',
    accent: 'from-violet-400 to-indigo-600',
  },
  {
    id: 'vendors',
    title: 'Partner Vendor Network',
    category: 'vendors',
    price: 'Partnerships',
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1400&h=800&fit=crop',
    badge: 'Partner',
    accent: 'from-emerald-400 to-teal-600',
  },
];

const curatedCollections = [
  {
    name: 'Stationery & Invitations',
    description: 'Image-first collection blocks with premium card language and showcase cards.',
    image: showcaseProducts[0].image,
    accent: 'from-rose-400 to-fuchsia-600',
  },
  {
    name: 'Tabletop & Decor',
    description: 'Category sections for decor sets, candles, and reception styling.',
    image: showcaseProducts[1].image,
    accent: 'from-amber-400 to-orange-600',
  },
  {
    name: 'Local Vendor Spotlights',
    description: 'Colorful partner tiles for florists, cake studios, photographers, and venue collaborators.',
    image: showcaseProducts[3].image,
    accent: 'from-sky-400 to-blue-600',
  },
];

const vendorSpotlights = [
  { name: 'Flora Atelier', category: 'Florist', rating: '4.9', reviews: '128', accent: 'from-emerald-400 to-teal-500' },
  { name: 'Paper House MK', category: 'Invitations', rating: '4.8', reviews: '92', accent: 'from-rose-400 to-fuchsia-500' },
  { name: 'Frame & Film', category: 'Photo/Video', rating: '4.9', reviews: '174', accent: 'from-violet-400 to-indigo-500' },
  { name: 'Grand Reception Studio', category: 'Venue Decor', rating: '4.7', reviews: '81', accent: 'from-amber-400 to-orange-500' },
];

const testimonials = [
  {
    quote: 'The new product page feels much closer to an actual wedding marketplace than a simple catalog grid.',
    name: 'Vendor Partner',
    role: 'Decor supplier',
    metric: 'Better showcase quality',
  },
  {
    quote: 'The curated collections and category cards make browsing much more intuitive for couples.',
    name: 'Beta Couple',
    role: 'Product browsing test',
    metric: 'Higher engagement',
  },
  {
    quote: 'This now supports both products and vendor partnerships visually, which was missing before.',
    name: 'Product Owner',
    role: 'Marketplace direction',
    metric: 'Stronger positioning',
  },
];

export const ProductsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hovered, setHovered] = useState<string | null>(null);
  const { t } = useI18n();

  const filteredShowcase = useMemo(
    () =>
      activeCategory === 'all'
        ? showcaseProducts
        : showcaseProducts.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="app-shell" data-auto-motion>
      <AnnouncementBar
        tag="Marketplace"
        title="Products page expanded with curated collections, vendor spotlight cards, and richer merchandising"
        description="Built around premium browsing and discovery patterns for products and vendors."
        ctaLabel="Contact for Partnership"
        ctaTo="/contact"
        accentClass="from-sky-400 via-violet-500 to-rose-500"
      />

      <LogoCloud title="Example partner categories and storefront collaborators" items={['Flora Atelier', 'Paper House', 'Frame & Film', 'Velvet Decor', 'Cake Studio']} />

      <section className="page-wrap pt-5">
        <div className="card-surface-strong mesh-panel relative overflow-hidden px-5 py-10 sm:px-8">
          <div className="orb orb-rose left-[-24px] top-[10%] h-36 w-36" />
          <div className="orb orb-sage right-[-30px] top-0 h-44 w-44 float-reverse" />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="section-kicker">{t('Products & Partnerships')}</p>
              <h1 className="mt-2 text-5xl font-semibold text-stone-900 sm:text-6xl">
                {t('Colorful marketplace experience with premium product storytelling')}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600">
                {t('This page uses richer imagery, collection cards, and vendor-oriented sections while preserving your live product catalog and filters.')}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link to="/contact" className="btn-primary">{t('Partner With Us')}</Link>
                <Link to="/collaborations" className="btn-secondary">{t('Collaborations')}</Link>
                <Link to="/services" className="btn-secondary">{t('See Services')}</Link>
                <Link to="/samples" className="btn-secondary">{t('See Samples')}</Link>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  ['4+', 'Curated groups'],
                  ['Vendor', 'Spotlights'],
                  ['Live', 'Catalog data'],
                ].map(([value, label]) => (
                  <div key={value + label} className="rounded-xl border border-stone-200/80 bg-white/80 p-3 text-center">
                    <p className="text-lg font-semibold text-stone-900">{value}</p>
                    <p className="text-xs text-stone-500">{t(label)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {showcaseProducts.map((item, idx) => (
                <div key={item.id} className={`image-frame shimmer-card ${idx % 2 === 0 ? 'float-slow' : 'float-reverse'}`}>
                  <img src={item.image} alt={item.title} className="h-36 w-full object-cover sm:h-44" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap section-gap">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">{t('Curated Collections')}</p>
            <h2 className="mt-2 text-4xl font-semibold text-stone-900">{t('Image-first merchandising blocks')}</h2>
          </div>
          <Link to="/contact" className="btn-secondary">{t('Start a vendor conversation')}</Link>
        </div>
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {curatedCollections.map((collection) => (
            <article key={collection.name} className="editorial-card shimmer-card">
              <div className="relative overflow-hidden rounded-2xl">
                <img src={collection.image} alt={collection.name} className="h-52 w-full object-cover transition duration-700 hover:scale-105" loading="lazy" />
                <div className={`absolute inset-0 bg-gradient-to-r ${collection.accent} opacity-20`} />
              </div>
              <p className={`mt-4 inline-flex rounded-full bg-gradient-to-r ${collection.accent} px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white`}>
                {t('Collection')}
              </p>
              <h3 className="mt-3 text-3xl font-semibold text-stone-900">{t(collection.name)}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{t(collection.description)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-wrap section-gap">
        <div className="card-surface p-4 sm:p-5">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={activeCategory === category.id ? 'btn-primary' : 'btn-secondary'}
              >
                {t(category.label)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {filteredShowcase.map((item) => (
            <article
              key={item.id}
              className="card-surface-strong shimmer-card overflow-hidden p-4 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`h-44 w-full object-cover transition duration-700 ${hovered === item.id ? 'scale-105' : 'scale-100'}`}
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${item.accent} opacity-25`} />
                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-stone-900">
                  {t(item.badge)}
                </div>
              </div>
              <div className="mt-4">
                <h2 className="text-2xl font-semibold text-stone-900">{t(item.title)}</h2>
                <p className="mt-1 text-sm text-stone-600">{t(item.price)}</p>
                <button type="button" className="btn-secondary mt-4 w-full">
                  {t('Explore')}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-wrap section-gap">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card-surface p-5 sm:p-6">
            <h2 className="text-4xl font-semibold text-stone-900">{t('Live Product Catalog')}</h2>
            <p className="mt-2 text-sm text-stone-600">
              {t('This keeps your real catalog endpoint integration and cart summary behavior, now wrapped in a richer marketplace-oriented page.')}
            </p>
            <div className="mt-4">
              <ProductCatalog />
            </div>
          </div>

          <div className="space-y-5">
            <div className="card-surface-strong p-5 sm:p-6">
              <p className="section-kicker">{t('Vendor Spotlights')}</p>
              <h3 className="mt-2 text-3xl font-semibold text-stone-900">{t('Review-ready partner cards')}</h3>
              <div className="mt-4 space-y-3">
                {vendorSpotlights.map((vendor) => (
                  <div key={vendor.name} className="rounded-xl border border-stone-200/80 bg-white/85 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-semibold text-stone-900">{t(vendor.name)}</p>
                        <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t(vendor.category)}</p>
                      </div>
                      <div className={`rounded-full bg-gradient-to-r ${vendor.accent} px-2.5 py-1 text-xs font-semibold text-white`}>
                        {vendor.rating} ({vendor.reviews})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-primary mt-4 w-full">{t('Become a Partner')}</Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {showcaseProducts.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className={`image-frame hover-lift ${idx === 0 ? 'col-span-2' : ''}`}>
                  <img src={item.image} alt={`${item.title} visual`} className={`w-full object-cover ${idx === 0 ? 'h-44' : 'h-28'}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap pb-12">
        <TestimonialCarousel
          title="A stronger product page for couples and vendors"
          subtitle="Richer visual merchandising and discovery flow inspired by wedding marketplaces while preserving your fast, integrated catalog."
          items={testimonials}
          accentClass="from-sky-400 via-violet-500 to-rose-500"
        />
      </section>
    </div>
  );
};

