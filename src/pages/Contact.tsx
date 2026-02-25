import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnnouncementBar } from '../components/marketing/AnnouncementBar';
import { LogoCloud } from '../components/marketing/LogoCloud';
import { TestimonialCarousel } from '../components/marketing/TestimonialCarousel';
import { useI18n } from '../context/I18nContext';
import { SocialIcon, type SocialIconName } from '../components/icons/BrandIcons';

const contactCards = [
  {
    title: 'Email',
    value: 'hello@wedmkd.com',
    description: 'For demos, pricing, design direction, and general questions.',
    accent: 'from-sky-400 to-blue-600',
  },
  {
    title: 'Phone',
    value: '+389 70 123 456',
    description: 'Business hours support and onboarding calls.',
    accent: 'from-emerald-400 to-teal-600',
  },
  {
    title: 'Office',
    value: 'Skopje, North Macedonia',
    description: 'In-person meetings for partnerships and planning.',
    accent: 'from-rose-400 to-pink-600',
  },
  {
    title: 'Hours',
    value: 'Mon-Fri 09:00-18:00',
    description: 'Saturday by appointment for consultations.',
    accent: 'from-amber-400 to-orange-600',
  },
];

const socialLinks: Array<{ name: string; href: string; accent: string; icon: SocialIconName }> = [
  { name: 'Instagram', href: 'https://instagram.com', accent: 'from-pink-500 to-fuchsia-600', icon: 'instagram' },
  { name: 'Facebook', href: 'https://facebook.com', accent: 'from-blue-500 to-indigo-600', icon: 'facebook' },
  { name: 'Pinterest', href: 'https://pinterest.com', accent: 'from-rose-500 to-red-600', icon: 'pinterest' },
  { name: 'TikTok', href: 'https://tiktok.com', accent: 'from-stone-700 to-stone-900', icon: 'tiktok' },
];

const faqs = [
  {
    q: 'Can you help adapt the visual style to feel more premium?',
    a: 'Yes. We can push further on visual polish with brand icons, richer motion, more editorial templates, and vendor-focused landing pages.',
  },
  {
    q: 'Do you support vendor partnership pages and marketplace sections?',
    a: 'Yes. The new Products page structure is designed so vendor spotlight modules and category discovery blocks can be expanded incrementally.',
  },
  {
    q: 'Can we show example sites before purchase?',
    a: 'Yes. The Samples section now includes example pages for Basic, Pro, and Premium tiers so couples can compare visually.',
  },
  {
    q: 'Can this stay fast while becoming more visual?',
    a: 'Yes. The current stack remains Vite + React + Tailwind with mostly native CSS animations and lazy-loaded imagery.',
  },
];

const demoOptions = [
  { title: 'Product Walkthrough', time: '20 min', description: 'Overview of pages, samples, planning tools, and product catalog.' },
  { title: 'Design Direction Session', time: '30 min', description: 'Refine visual direction, color system, and page density targets.' },
  { title: 'Vendor / Partner Setup', time: '25 min', description: 'Discuss product categories, spotlight cards, and partner flow.' },
];

const testimonials = [
  {
    quote: 'The contact page now feels like a real premium sales and support entry point, not an afterthought.',
    name: 'Internal review',
    role: 'Marketing direction',
    metric: 'Higher trust feel',
  },
  {
    quote: 'Having multiple contact paths and social links makes the product feel complete.',
    name: 'Beta tester',
    role: 'User feedback',
    metric: 'More confidence',
  },
  {
    quote: 'This matches the premium visual direction much better.',
    name: 'Stakeholder feedback',
    role: 'Visual review',
    metric: 'Closer to target',
  },
];

export const Contact: React.FC = () => {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div className="app-shell" data-auto-motion>
      <AnnouncementBar
        tag="Contact"
        title="Premium contact experience with social links, demo options, FAQ, and conversion-ready layout"
        description="Designed as a complete premium contact experience with demos, social channels, and support paths."
        ctaLabel="View Samples"
        ctaTo="/samples"
        accentClass="from-rose-400 via-fuchsia-500 to-violet-600"
      />

      <LogoCloud title="Typical collaborators and audiences who might contact you" items={['Couples', 'Planners', 'Vendors', 'Studios', 'Venues']} />

      <section className="page-wrap pt-5">
        <div className="card-surface-strong mesh-panel relative overflow-hidden px-5 py-10 sm:px-8">
          <div className="orb orb-rose left-[-24px] top-[5%] h-40 w-40" />
          <div className="orb orb-gold right-[10%] top-[-15px] h-32 w-32 float-reverse" />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="section-kicker">{t('Contact')}</p>
              <h1 className="mt-2 text-5xl font-semibold text-stone-900 sm:text-6xl">{t('Let us shape the premium version of WedMKD')}</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600">
                {t('Tell us whether you want stronger wedding aesthetics, richer editorial sections, vendor marketplace expansion, or more advanced guest features. We can prioritize the next iteration.')}
              </p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {contactCards.slice(0, 2).map((card) => (
                  <div key={card.title} className="rounded-xl border border-stone-200/80 bg-white/80 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t(card.title)}</p>
                    <p className="mt-1 font-semibold text-stone-900">{t(card.value)}</p>
                    <p className="mt-1 text-xs text-stone-500">{t(card.description)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link to="/services" className="btn-secondary">{t('Services')}</Link>
                <Link to="/products" className="btn-secondary">{t('Products')}</Link>
                <Link to="/samples" className="btn-primary">{t('Samples')}</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="image-frame shimmer-card col-span-2 hover-lift">
                <img
                  src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&fit=crop"
                  alt="Wedding consultation"
                  className="h-48 w-full object-cover sm:h-56"
                  loading="lazy"
                />
              </div>
              <div className="image-frame hover-lift">
                <img
                  src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
                  alt="Planning mood board"
                  className="h-32 w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="color-panel p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t('Fast reply')}</p>
                <p className="mt-1 text-2xl font-semibold text-stone-900">{t('Within 1 business day')}</p>
                <p className="mt-1 text-sm text-stone-600">{t('For design and product direction inquiries')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap section-gap">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {contactCards.map((card) => (
            <article key={card.title} className="card-surface-strong shimmer-card p-4 hover-lift">
              <div className={`inline-flex rounded-full bg-gradient-to-r ${card.accent} px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white`}>
                {t(card.title)}
              </div>
              <p className="mt-4 text-lg font-semibold text-stone-900">{t(card.value)}</p>
              <p className="mt-1 text-sm text-stone-600">{t(card.description)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-wrap section-gap">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card-surface p-5 sm:p-6">
            <h2 className="text-4xl font-semibold text-stone-900">{t('Send us a message')}</h2>
            <p className="mt-2 text-sm text-stone-600">{t('A conversion-ready contact form with room to wire into backend email or CRM later.')}</p>

            {submitted && (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {t('Message sent (demo only). We can wire this to backend/email later.')}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="label">{t('Name')}</label>
                  <input className="field" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
                </div>
                <div>
                  <label className="label">{t('Email')}</label>
                  <input className="field" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="label">{t('Phone')}</label>
                  <input className="field" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
                </div>
                <div>
                  <label className="label">{t('Inquiry Type')}</label>
                  <select className="field" value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
                    <option value="general">{t('General')}</option>
                    <option value="design">{t('Design update')}</option>
                    <option value="pricing">{t('Pricing and tiers')}</option>
                    <option value="vendor">{t('Vendor partnership')}</option>
                    <option value="support">{t('Support')}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label">{t('Subject')}</label>
                <input className="field" value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} required />
              </div>
              <div>
                <label className="label">{t('Message')}</label>
                <textarea className="field min-h-[140px]" value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} required />
              </div>
              <button type="submit" className="btn-primary w-full">{t('Send Message')}</button>
            </form>
          </div>

          <div className="space-y-5">
            <div className="card-surface-strong p-5 sm:p-6">
              <p className="section-kicker">{t('Social & Community')}</p>
              <h3 className="mt-2 text-3xl font-semibold text-stone-900">{t('Follow us')}</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-xl border border-stone-200/80 bg-white/85 p-4 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r ${social.accent} text-white shadow-sm`}>
                      <SocialIcon name={social.icon} className="h-5 w-5" title={t(social.name)} />
                    </div>
                    <p className="mt-3 font-semibold text-stone-900">{t(social.name)}</p>
                    <p className="text-sm text-stone-600">{t('Wedding inspiration and updates')}</p>
                  </a>
                ))}
              </div>
            </div>

            <div className="card-surface p-5 sm:p-6">
              <p className="section-kicker">{t('Book a Demo')}</p>
              <h3 className="mt-2 text-3xl font-semibold text-stone-900">{t('Choose a conversation type')}</h3>
              <div className="mt-4 space-y-3">
                {demoOptions.map((option) => (
                  <div key={option.title} className="rounded-xl border border-stone-200/80 bg-white/85 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-stone-900">{t(option.title)}</p>
                      <span className="badge-pill">{option.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-stone-600">{t(option.description)}</p>
                  </div>
                ))}
              </div>
              <Link to="/samples" className="btn-secondary mt-4 w-full">{t('Preview Samples Before Demo')}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap section-gap">
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="card-surface-strong p-5 sm:p-6">
            <h3 className="text-3xl font-semibold text-stone-900">{t('Common Questions')}</h3>
            <div className="mt-4 space-y-3">
              {faqs.map((item, idx) => {
                const open = activeFaq === idx;
                return (
                  <div key={item.q} className="rounded-xl border border-stone-200/80 bg-white/85">
                    <button
                      type="button"
                      onClick={() => setActiveFaq(open ? null : idx)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                    >
                      <span className="font-medium text-stone-900">{t(item.q)}</span>
                      <span className="chip">{open ? '-' : '+'}</span>
                    </button>
                    {open && <p className="px-4 pb-4 text-sm leading-6 text-stone-600">{t(item.a)}</p>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="image-frame hover-lift col-span-2">
              <img
                src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop"
                alt="Office and consultation"
                className="h-44 w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="image-frame hover-lift">
              <img
                src="https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
                alt="Team planning visual"
                className="h-32 w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="color-panel p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t('Next step')}</p>
              <p className="mt-1 text-xl font-semibold text-stone-900">{t('Share your visual references')}</p>
              <p className="mt-1 text-sm text-stone-600">{t('We can tune the design toward softer or bolder luxury aesthetics.')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap pb-12">
        <TestimonialCarousel
          title="Contact page now feels like a real premium conversion page"
          subtitle="Multiple contact paths, social links, demo options, and FAQ content make the public site feel complete."
          items={testimonials}
          accentClass="from-rose-400 via-fuchsia-500 to-violet-600"
        />
      </section>
    </div>
  );
};

