import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';

const contactCards = [
  {
    title: 'Email',
    value: 'hello@wedmkd.com',
    description: 'For demos, pricing, design direction, and general questions.',
    accent: 'from-sky-400 to-blue-600',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Phone',
    value: '+389 70 123 456',
    description: 'Business hours support and onboarding calls.',
    accent: 'from-emerald-400 to-teal-600',
    image: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Office',
    value: 'Skopje, North Macedonia',
    description: 'In-person meetings for partnerships and planning.',
    accent: 'from-rose-400 to-pink-600',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Hours',
    value: 'Mon-Fri 09:00-18:00',
    description: 'Saturday by appointment for consultations.',
    accent: 'from-amber-400 to-orange-600',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80',
  },
];

const faqs = [
  {
    q: 'Can you help adapt the visual style to feel more premium?',
    a: 'Yes. We can push further on visual polish with richer motion, stronger art direction, custom sample flows, and more editorial wedding layouts.',
  },
  {
    q: 'Can we show example sites before purchase?',
    a: 'Yes. The Pricing page includes sample links for each tier and each sample opens as a standalone wedding website in a new tab.',
  },
  {
    q: 'Do you support vendor partnership pages and marketplace sections?',
    a: 'Yes. We can expand vendor spotlights, collaborations, product showcases, and category-based pages based on your needs.',
  },
  {
    q: 'Can this stay fast while becoming more visual?',
    a: 'Yes. The current setup stays lightweight with Vite + React and image-heavy sections can still remain fast with optimized loading and restrained motion.',
  },
];

const demoOptions = [
  { title: 'Product Walkthrough', time: '20 min', description: 'Overview of pages, tier samples, planning tools, and current product flow.' },
  { title: 'Design Direction Session', time: '30 min', description: 'Refine colors, typography, page rhythm, and premium visual direction.' },
  { title: 'Custom Tier Planning', time: '25 min', description: 'Discuss what Basic / Plus / Premium / Platinum should include for your audience.' },
];

export const Contact: React.FC = () => {
  const { t, pathFor } = useI18n();
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

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const el = event.currentTarget;
    if (el.dataset.fallbackApplied === '1') return;
    el.dataset.fallbackApplied = '1';
    el.src =
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80';
  };

  return (
    <div className="app-shell" data-auto-motion>
      <section className="page-wrap pt-8 pb-2 sm:pt-10">
        <div className="relative overflow-hidden border border-stone-200/80 shadow-[0_18px_34px_rgba(28,18,13,0.06)]" style={{ borderRadius: 10 }}>
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=80"
            alt=""
            onError={handleImageError}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1f1712]/72 via-[#1f1712]/58 to-[#1f1712]/36" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.16),transparent_38%),radial-gradient(circle_at_90%_12%,rgba(255,184,158,0.12),transparent_40%)]" />

          <div className="relative px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
            <div className="mx-auto max-w-3xl text-center text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/78">{t('Contact')}</p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                {t('Let us design a wedding website that feels truly yours')}
              </h1>
              <p className="mt-4 text-sm leading-7 text-white/82 sm:text-base">
                {t('Share your wedding date, style, and the kind of guest experience you want. We will recommend the right tier and shape the design direction with you.')}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/85 backdrop-blur-sm" style={{ borderRadius: 8 }}>
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                {t('Elegant, guest-first, custom by tier')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap relative z-10 -mt-4 section-gap pt-0 sm:-mt-8">
        <div className="mx-auto max-w-4xl">
          <div className="card-surface-strong relative overflow-hidden p-5 sm:p-6 lg:p-7">
            <div className="mb-5 overflow-hidden border border-stone-200/80" style={{ borderRadius: 8 }}>
              <div className="relative h-32 sm:h-36">
                <img
                  src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=80"
                  alt={t('Wedding flowers and stationery')}
                  onError={handleImageError}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/45 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 border border-white/25 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur" style={{ borderRadius: 6 }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                  {t('Wedding Project Inquiry')}
                </div>
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-[#9c4f46] via-[#b47a31] to-[#4f7f76]" />
            </div>

            <div className="text-center">
              <h2 className="text-4xl font-semibold text-stone-900 sm:text-5xl">{t('Send us a message')}</h2>
              <p className="mt-2 text-sm text-stone-600">
                {t('We reply with recommended tier, timeline, and next steps based on your wedding style and needs.')}
              </p>
            </div>

            {submitted && (
              <div className="mt-4 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700" style={{ borderRadius: 8 }}>
                {t('Message sent (demo only). We can wire this to backend/email later.')}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="contact-name">{t('Name')}</label>
                  <input
                    id="contact-name"
                    className="field"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="label" htmlFor="contact-email">{t('Email')}</label>
                  <input
                    id="contact-email"
                    className="field"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="contact-phone">{t('Phone')}</label>
                  <input
                    id="contact-phone"
                    className="field"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="label" htmlFor="contact-type">{t('Inquiry Type')}</label>
                  <select
                    id="contact-type"
                    className="field"
                    value={form.type}
                    onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                  >
                    <option value="general">{t('General')}</option>
                    <option value="design">{t('Design update')}</option>
                    <option value="pricing">{t('Pricing and tiers')}</option>
                    <option value="vendor">{t('Vendor partnership')}</option>
                    <option value="support">{t('Support')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label" htmlFor="contact-subject">{t('Subject')}</label>
                <input
                  id="contact-subject"
                  className="field"
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="label" htmlFor="contact-message">{t('Message')}</label>
                <textarea
                  id="contact-message"
                  className="field min-h-[150px]"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full min-h-[44px]">
                {t('Send Message')}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="page-wrap pt-1 pb-10 sm:pb-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {contactCards.map((card) => (
              <article key={card.title} className="card-surface overflow-hidden p-0">
                <div className="relative h-20 overflow-hidden">
                  <img src={card.image} alt="" onError={handleImageError} className="h-full w-full object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-r ${card.accent} opacity-45`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                </div>
                <div className="p-4 sm:p-5">
                  <div
                    className={`inline-flex bg-gradient-to-r ${card.accent} px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white`}
                    style={{ borderRadius: 6 }}
                  >
                    {t(card.title)}
                  </div>
                  <p className="mt-3 text-base font-semibold text-stone-900">{t(card.value)}</p>
                  <p className="mt-1 text-sm leading-6 text-stone-600">{t(card.description)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-wrap pb-12 sm:pb-14">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="card-surface overflow-hidden p-0">
            <div className="relative h-36 sm:h-40">
              <img
                src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1600&q=80"
                alt={t('Wedding planning consultation')}
                onError={handleImageError}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#201812]/70 via-[#201812]/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">{t('Book a Demo')}</p>
                <p className="mt-1 text-lg font-semibold">{t('Choose a conversation type')}</p>
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <div className="space-y-3">
                {demoOptions.map((option) => (
                  <div key={option.title} className="border border-stone-200/80 bg-white/85 p-4" style={{ borderRadius: 8 }}>
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-stone-900">{t(option.title)}</p>
                      <span className="badge-pill">{option.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-stone-600">{t(option.description)}</p>
                  </div>
                ))}
              </div>
              <Link to={pathFor('/samples')} className="btn-secondary mt-4 w-full justify-center">
                {t('Preview Samples Before Demo')}
              </Link>
            </div>
          </div>

          <div className="card-surface-strong overflow-hidden p-0">
            <div className="relative h-36 sm:h-40">
              <img
                src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1600&q=80"
                alt={t('Wedding couple and guests')}
                onError={handleImageError}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#211813]/70 via-[#211813]/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">{t('FAQ')}</p>
                <p className="mt-1 text-lg font-semibold">{t('Common Questions')}</p>
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <div className="space-y-3">
                {faqs.map((item, idx) => {
                  const open = activeFaq === idx;
                  return (
                    <div key={item.q} className="border border-stone-200/80 bg-white/85" style={{ borderRadius: 8 }}>
                      <button
                        type="button"
                        onClick={() => setActiveFaq(open ? null : idx)}
                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                        aria-expanded={open}
                      >
                        <span className="font-medium text-stone-900">{t(item.q)}</span>
                        <span className="chip" aria-hidden>{open ? '-' : '+'}</span>
                      </button>
                      {open && <p className="px-4 pb-4 text-sm leading-6 text-stone-600">{t(item.a)}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
