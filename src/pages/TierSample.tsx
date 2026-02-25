import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { SampleTabId, tierSamples, type SampleTierKey } from '../data/tierSamples';
import { useI18n } from '../context/I18nContext';

const tabLabels: Record<SampleTabId, string> = {
  home: 'Home',
  details: 'Details',
  rsvp: 'RSVP',
  checklist: 'Checklist',
  timeline: 'Timeline',
  budget: 'Budget',
  gallery: 'Gallery',
  faq: 'FAQ',
  registry: 'Registry',
  seating: 'Seating',
};

const allFeatureTabs: SampleTabId[] = [
  'home',
  'details',
  'rsvp',
  'checklist',
  'timeline',
  'budget',
  'gallery',
  'faq',
  'registry',
  'seating',
];

const tierSupportLabel: Record<SampleTierKey, string> = {
  basic: 'Starter feature preview',
  pro: 'Expanded planning preview',
  premium: 'Full premium feature preview',
};

const tierCapabilityPacks: Record<
  SampleTierKey,
  Array<{ title: string; items: string[] }>
> = {
  basic: [
    {
      title: 'Guest essentials',
      items: ['RSVP confirmations', 'Event details', 'Guest list basics', 'Simple reminders'],
    },
    {
      title: 'Website presentation',
      items: ['Hero page', 'Venue information', 'FAQ preview', 'Photo gallery starter'],
    },
    {
      title: 'Upgrade-ready previews',
      items: ['Registry preview', 'Budget overview preview', 'Seating preview', 'Timeline preview'],
    },
  ],
  pro: [
    {
      title: 'Planning tools',
      items: ['Timeline', 'Budget tracker', 'Checklist progress', 'Guest follow-up flow'],
    },
    {
      title: 'Guest experience',
      items: ['RSVP custom questions', 'Dietary preferences', 'Gallery', 'FAQ'],
    },
    {
      title: 'Premium-ready previews',
      items: ['Seating plan preview', 'Registry gifting flow', 'Advanced guest messaging', 'Custom domain-ready layout'],
    },
  ],
  premium: [
    {
      title: 'Full guest experience',
      items: ['Registry', 'Seating plan', 'Expanded gallery', 'FAQ + travel details'],
    },
    {
      title: 'Planning & hosting',
      items: ['Budget management', 'Timeline orchestration', 'Checklist tracking', 'Guest communication workflow'],
    },
    {
      title: 'Premium delivery',
      items: ['Branded design system', 'Custom domain-ready presentation', 'Private access support', 'Priority support handoff'],
    },
  ],
};

const tierGuestMetrics: Record<
  SampleTierKey,
  { invited: number; confirmed: number; maybe: number; declined: number; meals: number; households: number }
> = {
  basic: { invited: 58, confirmed: 39, maybe: 7, declined: 12, meals: 39, households: 31 },
  pro: { invited: 174, confirmed: 121, maybe: 21, declined: 32, meals: 121, households: 86 },
  premium: { invited: 246, confirmed: 191, maybe: 18, declined: 37, meals: 191, households: 123 },
};

const tierTravelNotes: Record<SampleTierKey, Array<{ title: string; body: string }>> = {
  basic: [
    { title: 'Parking', body: 'Guest parking is available on-site and monitored by venue staff.' },
    { title: 'Arrival', body: 'Guests should arrive 20 minutes early for seating and welcome.' },
    { title: 'Hotel nearby', body: 'A short list of nearby stays can be shared in the details section.' },
  ],
  pro: [
    { title: 'Room blocks', body: 'Two nearby hotel options with group rates are listed for guests.' },
    { title: 'Transport', body: 'Taxi and rideshare drop-off point is marked at the villa entrance.' },
    { title: 'Parking', body: 'Valet and self-parking are available throughout the event.' },
  ],
  premium: [
    { title: 'Airport guidance', body: 'Airport transfer timing and hotel check-in info can be shared here.' },
    { title: 'Shuttle schedule', body: 'Before/after ceremony shuttle windows are listed for guests.' },
    { title: 'Weekend stay', body: 'Premium demo shows room blocks, transport notes, and local recommendations.' },
  ],
};

const tierContactBlocks: Record<SampleTierKey, Array<{ role: string; name: string; contact: string }>> = {
  basic: [
    { role: 'Couple contact', name: 'Family coordinator', contact: '+389 70 111 222' },
    { role: 'Venue desk', name: 'Reception team', contact: 'venue@hotel.mk' },
  ],
  pro: [
    { role: 'Planner', name: 'Event coordinator', contact: '+389 70 222 333' },
    { role: 'RSVP support', name: 'Guest support inbox', contact: 'rsvp@wedmkd.com' },
  ],
  premium: [
    { role: 'Wedding planner', name: 'Lead planning desk', contact: '+389 70 333 444' },
    { role: 'Guest concierge', name: 'Premium support contact', contact: 'concierge@wedmkd.com' },
    { role: 'Transport support', name: 'Shuttle coordination', contact: '+389 70 555 888' },
  ],
};

const sectionCard = 'card-surface p-5 sm:p-6';

export const TierSample: React.FC = () => {
  const { tier } = useParams<{ tier: string }>();
  const navigate = useNavigate();
  const sample = tier && tier in tierSamples ? tierSamples[tier as SampleTierKey] : null;
  const { t, language } = useI18n();
  const [activeTab, setActiveTab] = useState<SampleTabId>('home');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    email: '',
    attending: 'yes',
    guests: '2',
    dietary: '',
    songRequest: '',
    note: '',
  });

  useEffect(() => {
    if (sample) {
      setActiveTab('home');
      setRsvpSubmitted(false);
    }
  }, [sample]);

  const daysToWedding = useMemo(() => {
    if (!sample) return 0;
    const date = new Date(sample.couple.date);
    const diff = date.getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [sample]);

  if (!sample) {
    return (
      <div className="page-wrap section-gap">
        <div className="card-surface p-8 text-center">
          <h1 className="text-3xl font-semibold text-stone-900">{t('Sample not found')}</h1>
          <p className="mt-2 text-sm text-stone-600">{t('Choose one of the available sample tiers.')}</p>
          <Link to="/samples" className="btn-primary mt-4">
            {t('Go to Samples')}
          </Link>
        </div>
      </div>
    );
  }

  const filteredRegistry = showAvailableOnly
    ? sample.registry.filter((item) => item.status === 'available')
    : sample.registry;

  const includedTabs = new Set(sample.tabs);
  const previewOnlyTabs = allFeatureTabs.filter((tab) => !includedTabs.has(tab));
  const guestMetrics = tierGuestMetrics[sample.key];
  const checklistDone = sample.checklist.filter((item) => item.done).length;
  const checklistProgress = sample.checklist.length
    ? Math.round((checklistDone / sample.checklist.length) * 100)
    : 0;
  const totalBudget = sample.budget.reduce((sum, item) => sum + item.budgeted, 0);
  const actualBudget = sample.budget.reduce((sum, item) => sum + item.actual, 0);
  const budgetRemaining = totalBudget - actualBudget;
  const registryAvailableCount = sample.registry.filter((item) => item.status === 'available').length;
  const registryReservedCount = sample.registry.length - registryAvailableCount;
  const registryValue = sample.registry.reduce((sum, item) => {
    const numeric = Number(item.price.replace(/[^0-9.]/g, ''));
    return Number.isFinite(numeric) ? sum + numeric : sum;
  }, 0);

  const featureCoverage = allFeatureTabs.map((tab) => ({
    id: tab,
    label: tabLabels[tab],
    included: includedTabs.has(tab),
  }));

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSubmitted(true);
    window.setTimeout(() => setRsvpSubmitted(false), 2500);
  };

  return (
    <div className="app-shell" data-auto-motion>
      <section className="page-wrap pt-5">
        <div className="card-surface-strong relative overflow-hidden px-5 py-6 sm:px-8">
          <div className="orb orb-rose left-[-60px] top-[-50px] h-44 w-44" />
          <div className="orb orb-gold right-[-30px] top-[20px] h-40 w-40 float-reverse" />
          <div className="orb orb-sage bottom-[-35px] left-[35%] h-32 w-32" />

          <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className={`inline-flex items-center rounded-full bg-gradient-to-r ${sample.gradient} px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white`}>
                {sample.badge}
              </div>
              <h1 className="mt-3 text-5xl font-semibold text-stone-900">{t(sample.label)}</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">
                {t('A premium showcase sample adapted to your current WedMKD stack.')}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/samples" className="btn-secondary">{t('All Samples')}</Link>
              <button type="button" onClick={() => navigate('/signup')} className="btn-primary">
                {t('Use This Style')}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap section-gap">
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="card-surface-strong relative overflow-hidden p-3 sm:p-4">
            <div className="relative image-frame rounded-3xl border-0">
              <img src={sample.heroImage} alt={`${sample.couple.names} wedding sample`} className="h-[340px] w-full object-cover sm:h-[440px]" />
              <div className={`absolute inset-0 bg-gradient-to-t ${sample.gradient} opacity-35`} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent p-6 text-white sm:p-8">
                <p className="text-sm uppercase tracking-[0.18em] text-white/85">{t(sample.name)} {t('Tier Demo')}</p>
                <h2 className="mt-1 text-5xl font-semibold">{sample.couple.names}</h2>
                <p className="mt-1 text-lg">{sample.couple.date} | {sample.couple.city}</p>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/90">{t(sample.couple.story)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="card-surface grid grid-cols-2 gap-3 p-4">
              <div className="rounded-xl border border-stone-200/80 bg-white/80 p-4 text-center">
                <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t('Price Tier')}</p>
                <p className="mt-2 text-2xl font-semibold text-stone-900">{sample.priceLabel}</p>
              </div>
              <div className="rounded-xl border border-stone-200/80 bg-white/80 p-4 text-center">
                <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t('Days Left')}</p>
                <p className="mt-2 text-2xl font-semibold text-stone-900">{daysToWedding}</p>
              </div>
              <div className="rounded-xl border border-stone-200/80 bg-white/80 p-4 text-center">
                <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t('Included Tabs')}</p>
                <p className="mt-2 text-2xl font-semibold text-stone-900">{sample.tabs.length}</p>
              </div>
              <div className="rounded-xl border border-stone-200/80 bg-white/80 p-4 text-center">
                <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t('All feature previews')}</p>
                <p className="mt-2 text-2xl font-semibold text-stone-900">{allFeatureTabs.length}</p>
              </div>
            </div>

            <div className="card-surface p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-2xl font-semibold text-stone-900">{t('Included sample highlights')}</h3>
                <span className="chip">{t(tierSupportLabel[sample.key])}</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-stone-700">
                {sample.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className={`mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r ${sample.gradient}`} />
                    <span>{t(item)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl border border-stone-200/80 bg-white/80 px-3 py-2 text-stone-700">
                  {t('Included')}: <span className="font-semibold text-stone-900">{sample.tabs.length}</span>
                </div>
                <div className="rounded-xl border border-stone-200/80 bg-white/80 px-3 py-2 text-stone-700">
                  {t('Preview extras')}: <span className="font-semibold text-stone-900">{previewOnlyTabs.length}</span>
                </div>
              </div>
            </div>

            <div className="card-surface p-4">
              <h3 className="text-lg font-semibold text-stone-900">{t('Guest snapshot')}</h3>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl border border-stone-200/80 bg-white/80 px-3 py-3">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-stone-500">{t('Invited')}</p>
                  <p className="mt-1 text-lg font-semibold text-stone-900">{guestMetrics.invited}</p>
                </div>
                <div className="rounded-xl border border-stone-200/80 bg-white/80 px-3 py-3">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-stone-500">{t('Confirmed')}</p>
                  <p className="mt-1 text-lg font-semibold text-stone-900">{guestMetrics.confirmed}</p>
                </div>
                <div className="rounded-xl border border-stone-200/80 bg-white/80 px-3 py-3">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-stone-500">{t('Households')}</p>
                  <p className="mt-1 text-lg font-semibold text-stone-900">{guestMetrics.households}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {sample.collageImages.slice(0, 4).map((image, idx) => (
                <div key={image} className={`image-frame ${idx % 2 === 0 ? 'float-slow' : 'float-reverse'}`}>
                  <img src={image} alt={`Sample detail ${idx + 1}`} className="h-24 w-full object-cover sm:h-28" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap section-gap">
        <div className="sticky top-[96px] z-10 mb-4 overflow-x-auto rounded-2xl border border-stone-200/80 bg-[#f7f3ee]/90 p-2 backdrop-blur">
          <div className="flex w-max min-w-full gap-2">
            {allFeatureTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:bg-white/70 hover:text-stone-900'
                }`}
                aria-pressed={activeTab === tab}
              >
                {t(tabLabels[tab])}
                {!includedTabs.has(tab) && (
                  <span className="rounded-full border border-stone-200/80 bg-stone-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-500">
                    {t('Preview')}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {previewOnlyTabs.length > 0 && (
          <div className="mb-4 rounded-2xl border border-stone-200/80 bg-white/85 px-4 py-3 text-sm text-stone-600">
            <span className="font-semibold text-stone-900">{t('Included in this tier')}:</span>{' '}
            {sample.tabs.map((tab) => t(tabLabels[tab])).join(', ')}
            {' · '}
            <span className="font-semibold text-stone-900">{t('Also previewed here')}:</span>{' '}
            {previewOnlyTabs.map((tab) => t(tabLabels[tab])).join(', ')}
          </div>
        )}

        {activeTab === 'home' && (
          <div className="space-y-4">
            <div className={sectionCard}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-4xl font-semibold text-stone-900">{t('Welcome to our wedding')}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-stone-600">{t(sample.couple.story)}</p>
                </div>
                <span className="chip">{t('Complete feature showcase')}</span>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ['Date', sample.couple.date],
                  ['Time', sample.couple.time],
                  ['Venue', sample.couple.venue],
                  ['City', sample.couple.city],
                  ['Invited', String(guestMetrics.invited)],
                  ['Confirmed', String(guestMetrics.confirmed)],
                  ['Checklist Progress', `${checklistProgress}%`],
                  ['Budget tracked', `$${actualBudget.toLocaleString()}`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-stone-200/80 bg-white/80 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t(label)}</p>
                    <p className="mt-1 font-semibold text-stone-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className={sectionCard}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-3xl font-semibold text-stone-900">{t('Everything shown in this sample')}</h3>
                  <span className="chip">{sample.name}</span>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {featureCoverage.map((feature) => (
                    <div
                      key={feature.id}
                      className={`flex items-center justify-between gap-3 rounded-xl border p-3 ${
                        feature.included
                          ? 'border-emerald-200 bg-emerald-50/70'
                          : 'border-stone-200/80 bg-white/80'
                      }`}
                    >
                      <span className="text-sm font-medium text-stone-900">{t(feature.label)}</span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                          feature.included
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {feature.included ? t('Included') : t('Preview')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className={sectionCard}>
                  <h3 className="text-3xl font-semibold text-stone-900">{t('Platform features preview')}</h3>
                  <div className="mt-4 space-y-3">
                    {tierCapabilityPacks[sample.key].map((pack) => (
                      <div key={pack.title} className="rounded-xl border border-stone-200/80 bg-white/80 p-4">
                        <p className="text-sm font-semibold text-stone-900">{t(pack.title)}</p>
                        <ul className="mt-2 space-y-1.5 text-sm text-stone-600">
                          {pack.items.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span className={`mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r ${sample.gradient}`} />
                              <span>{t(item)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={sectionCard}>
                  <h3 className="text-xl font-semibold text-stone-900">{t('Guest experience notes')}</h3>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-xl border border-stone-200/80 bg-white/80 px-3 py-2 text-stone-700">{t('Dietary questions')}</div>
                    <div className="rounded-xl border border-stone-200/80 bg-white/80 px-3 py-2 text-stone-700">{t('Music requests')}</div>
                    <div className="rounded-xl border border-stone-200/80 bg-white/80 px-3 py-2 text-stone-700">{t('Address collection')}</div>
                    <div className="rounded-xl border border-stone-200/80 bg-white/80 px-3 py-2 text-stone-700">{t('FAQ / travel info')}</div>
                    <div className="rounded-xl border border-stone-200/80 bg-white/80 px-3 py-2 text-stone-700">{t('Mobile-friendly RSVP')}</div>
                    <div className="rounded-xl border border-stone-200/80 bg-white/80 px-3 py-2 text-stone-700">{t('Registry and seating previews')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {sample.collageImages.map((image, idx) => (
                <div key={`${image}-${idx}`} className={`image-frame hover-lift ${idx === 0 ? 'md:col-span-2' : ''}`}>
                  <img src={image} alt={`Wedding scene ${idx + 1}`} className={`w-full object-cover ${idx === 0 ? 'h-64' : 'h-64 md:h-full'}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className={sectionCard}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-4xl font-semibold text-stone-900">{t('Event Details')}</h2>
                {!includedTabs.has('details') && <span className="chip">{t('Preview')}</span>}
              </div>
              <div className="mt-4 space-y-3">
                {sample.timeline.map((item) => (
                  <div key={`${item.time}-${item.title}`} className="rounded-xl border border-stone-200/80 bg-white/80 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-semibold text-stone-900">{t(item.title)}</p>
                        <p className="text-sm text-stone-600">{t(item.description)}</p>
                      </div>
                      <span className="chip">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-stone-200/80 bg-white/80 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t('Ceremony')}</p>
                  <p className="mt-2 text-sm font-semibold text-stone-900">{sample.couple.venue}</p>
                  <p className="mt-1 text-sm text-stone-600">{sample.couple.city}</p>
                </div>
                <div className="rounded-xl border border-stone-200/80 bg-white/80 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t('Guest guidance')}</p>
                  <p className="mt-2 text-sm text-stone-700">{t('Arrival time, parking, transport, and room information can live in one clean details area.')}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className={sectionCard}>
                <h3 className="text-3xl font-semibold text-stone-900">{t('Travel & Stay')}</h3>
                <div className="mt-3 space-y-3">
                  {tierTravelNotes[sample.key].map((item) => (
                    <div key={item.title} className="rounded-xl border border-stone-200/80 bg-white/80 p-4">
                      <p className="font-semibold text-stone-900">{t(item.title)}</p>
                      <p className="mt-1 text-sm leading-6 text-stone-600">{t(item.body)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={sectionCard}>
                <h3 className="text-3xl font-semibold text-stone-900">{t('Dress Code')}</h3>
                <p className="mt-2 text-sm text-stone-600">{t('Formal / elegant attire. A dedicated style note section can be customized per wedding.')}</p>
                <div className={`mt-4 rounded-xl bg-gradient-to-r ${sample.gradient} p-4 text-sm font-semibold text-white`}>
                  {language === 'mk' ? `${t(sample.name)} ${t('tier styling preview')}` : `${sample.name} tier styling preview`}
                </div>
              </div>
              <div className={sectionCard}>
                <h3 className="text-3xl font-semibold text-stone-900">{t('Contact & Support')}</h3>
                <div className="mt-3 space-y-3">
                  {tierContactBlocks[sample.key].map((contact) => (
                    <div key={`${contact.role}-${contact.name}`} className="rounded-xl border border-stone-200/80 bg-white/80 p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t(contact.role)}</p>
                      <p className="mt-1 font-semibold text-stone-900">{contact.name}</p>
                      <p className="text-sm text-stone-600">{contact.contact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rsvp' && (
          <div className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
            <div className={sectionCard}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-4xl font-semibold text-stone-900">{t('RSVP')}</h2>
                {!includedTabs.has('rsvp') && <span className="chip">{t('Preview')}</span>}
              </div>
              <p className="mt-2 text-sm text-stone-600">
                {t('This demo shows how a guest RSVP flow can feel for the selected tier, including custom questions and a polished confirmation step.')}
              </p>

              {rsvpSubmitted && (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {t('RSVP submitted (demo only)')}
                </div>
              )}

              <form onSubmit={handleRsvpSubmit} className="mt-4 space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="label">{t('Full Name')}</label>
                    <input className="field" value={rsvpForm.name} onChange={(e) => setRsvpForm((f) => ({ ...f, name: e.target.value }))} required />
                  </div>
                  <div>
                    <label className="label">{t('Email')}</label>
                    <input className="field" type="email" value={rsvpForm.email} onChange={(e) => setRsvpForm((f) => ({ ...f, email: e.target.value }))} required />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="label">{t('Attendance')}</label>
                    <select className="field" value={rsvpForm.attending} onChange={(e) => setRsvpForm((f) => ({ ...f, attending: e.target.value }))}>
                      <option value="yes">{t('Yes, attending')}</option>
                      <option value="no">{t('Sorry, cannot attend')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">{t('Guests')}</label>
                    <select className="field" value={rsvpForm.guests} onChange={(e) => setRsvpForm((f) => ({ ...f, guests: e.target.value }))}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </div>

                {sample.key !== 'basic' && (
                  <>
                    <div>
                      <label className="label">{t('Dietary requirements')}</label>
                      <textarea className="field min-h-[84px]" value={rsvpForm.dietary} onChange={(e) => setRsvpForm((f) => ({ ...f, dietary: e.target.value }))} />
                    </div>
                    <div>
                      <label className="label">{t('Song request')}</label>
                      <input className="field" value={rsvpForm.songRequest} onChange={(e) => setRsvpForm((f) => ({ ...f, songRequest: e.target.value }))} />
                    </div>
                  </>
                )}

                {sample.key === 'premium' && (
                  <div>
                    <label className="label">{t('Message to the couple')}</label>
                    <textarea className="field min-h-[100px]" value={rsvpForm.note} onChange={(e) => setRsvpForm((f) => ({ ...f, note: e.target.value }))} />
                  </div>
                )}

                <button type="submit" className="btn-primary w-full">
                  {t('Submit RSVP')}
                </button>
              </form>
            </div>

            <div className="space-y-4">
              <div className={sectionCard}>
                <h3 className="text-3xl font-semibold text-stone-900">{t('Why this feels richer')}</h3>
                <ul className="mt-3 space-y-2 text-sm text-stone-600">
                  <li>{t('Polished visual hierarchy and branded backgrounds')}</li>
                  <li>{t('Tier-specific fields and guest experience depth')}</li>
                  <li>{t('Space for dietary, songs, notes, or future custom questions')}</li>
                </ul>
              </div>
              <div className={sectionCard}>
                <h3 className="text-2xl font-semibold text-stone-900">{t('RSVP management preview')}</h3>
                <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                  <div className="rounded-xl border border-stone-200/80 bg-white/80 px-3 py-3">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-stone-500">{t('Confirmed')}</p>
                    <p className="mt-1 text-lg font-semibold text-stone-900">{guestMetrics.confirmed}</p>
                  </div>
                  <div className="rounded-xl border border-stone-200/80 bg-white/80 px-3 py-3">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-stone-500">{t('Pending')}</p>
                    <p className="mt-1 text-lg font-semibold text-stone-900">{guestMetrics.maybe}</p>
                  </div>
                  <div className="rounded-xl border border-stone-200/80 bg-white/80 px-3 py-3">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-stone-500">{t('Declined')}</p>
                    <p className="mt-1 text-lg font-semibold text-stone-900">{guestMetrics.declined}</p>
                  </div>
                  <div className="rounded-xl border border-stone-200/80 bg-white/80 px-3 py-3">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-stone-500">{t('Meals')}</p>
                    <p className="mt-1 text-lg font-semibold text-stone-900">{guestMetrics.meals}</p>
                  </div>
                </div>
                <div className="mt-3 space-y-2 text-sm text-stone-600">
                  <div className="rounded-xl border border-stone-200/80 bg-white/80 px-3 py-2">{t('Address collection and reminder messages can be added to this flow.')}</div>
                  <div className="rounded-xl border border-stone-200/80 bg-white/80 px-3 py-2">{t('Premium demos can include private access and deeper guest messaging experiences.')}</div>
                </div>
              </div>
              <div className="image-frame hover-lift">
                <img src={sample.collageImages[0]} alt="RSVP sample visual" className="h-60 w-full object-cover" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'checklist' && (
          <div className="space-y-4">
            <div className={sectionCard}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-4xl font-semibold text-stone-900">{t('Checklist Preview')}</h2>
                {!includedTabs.has('checklist') && <span className="chip">{t('Preview')}</span>}
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-stone-200/80 bg-white/80 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t('Completed')}</p>
                  <p className="mt-1 text-2xl font-semibold text-stone-900">{checklistDone}</p>
                </div>
                <div className="rounded-xl border border-stone-200/80 bg-white/80 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t('Total')}</p>
                  <p className="mt-1 text-2xl font-semibold text-stone-900">{sample.checklist.length}</p>
                </div>
                <div className="rounded-xl border border-stone-200/80 bg-white/80 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t('Progress')}</p>
                  <p className="mt-1 text-2xl font-semibold text-stone-900">{checklistProgress}%</p>
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-stone-200">
                <div className={`h-2 rounded-full bg-gradient-to-r ${sample.gradient}`} style={{ width: `${checklistProgress}%` }} />
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {sample.checklist.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-xl border border-stone-200/80 bg-white/80 p-4">
                    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${item.done ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-200 text-stone-600'}`}>
                      {item.done ? 'OK' : '*'}
                    </span>
                    <span className={item.done ? 'text-stone-500 line-through' : 'text-stone-900'}>{t(item.label)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-4">
            <div className={sectionCard}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-4xl font-semibold text-stone-900">{t('Timeline')}</h2>
                {!includedTabs.has('timeline') && <span className="chip">{t('Preview')}</span>}
              </div>
              <p className="mt-2 text-sm text-stone-600">{t('Show ceremony flow, reception moments, and guest guidance in one clear timeline.')}</p>
              <div className="mt-4 space-y-3">
                {sample.timeline.map((item, idx) => (
                  <div key={`${item.time}-${idx}`} className="relative rounded-xl border border-stone-200/80 bg-white/85 p-4 pl-6">
                    <span className={`absolute left-2 top-5 h-2 w-2 rounded-full bg-gradient-to-r ${sample.gradient}`} />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-semibold text-stone-900">{t(item.title)}</p>
                        <p className="text-sm text-stone-600">{t(item.description)}</p>
                      </div>
                      <span className="chip">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="space-y-4">
            <div className={sectionCard}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-4xl font-semibold text-stone-900">{t('Budget Overview')}</h2>
                {!includedTabs.has('budget') && <span className="chip">{t('Preview')}</span>}
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-stone-200/80 bg-white/85 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t('Budgeted')}</p>
                  <p className="mt-1 text-2xl font-semibold text-stone-900">${totalBudget.toLocaleString()}</p>
                </div>
                <div className="rounded-xl border border-stone-200/80 bg-white/85 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t('Actual')}</p>
                  <p className="mt-1 text-2xl font-semibold text-stone-900">${actualBudget.toLocaleString()}</p>
                </div>
                <div className="rounded-xl border border-stone-200/80 bg-white/85 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t('Remaining')}</p>
                  <p className={`mt-1 text-2xl font-semibold ${budgetRemaining >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    ${Math.abs(budgetRemaining).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-4">
                {sample.budget.map((line) => {
                  const ratio = line.budgeted > 0 ? Math.min(100, (line.actual / line.budgeted) * 100) : 0;
                  return (
                    <div key={line.category} className="rounded-xl border border-stone-200/80 bg-white/85 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold text-stone-900">{t(line.category)}</p>
                        <p className="text-sm text-stone-600">${line.actual} / ${line.budgeted}</p>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-stone-200">
                        <div className={`h-2 rounded-full bg-gradient-to-r ${sample.gradient}`} style={{ width: `${ratio}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className={sectionCard}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-4xl font-semibold text-stone-900">{t('Gallery')}</h2>
                {!includedTabs.has('gallery') && <span className="chip">{t('Preview')}</span>}
              </div>
              <span className="chip">{sample.collageImages.length} {t('sample images')}</span>
            </div>
            <p className="mb-4 text-sm text-stone-600">{t('Use galleries to share engagement sessions, venue previews, and wedding-day moments in one polished space.')}</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {sample.collageImages.map((image, idx) => (
                <div key={`${image}-${idx}`} className={`image-frame hover-lift ${idx % 4 === 0 ? 'sm:col-span-2 xl:col-span-2' : ''}`}>
                  <img src={image} alt={`Gallery item ${idx + 1}`} className={`w-full object-cover ${idx % 4 === 0 ? 'h-52' : 'h-52'}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-4">
            <div className={sectionCard}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-4xl font-semibold text-stone-900">{t('FAQ')}</h2>
                {!includedTabs.has('faq') && <span className="chip">{t('Preview')}</span>}
              </div>
              <div className="mt-4 space-y-3">
                {sample.faq.map((item, idx) => {
                  const open = openFaq === idx;
                  return (
                    <div key={item.q} className="rounded-xl border border-stone-200/80 bg-white/85">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? null : idx)}
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
            <div className={sectionCard}>
              <h3 className="text-2xl font-semibold text-stone-900">{t('What this FAQ can cover')}</h3>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {['Travel and parking', 'Dress code', 'Children policy', 'Accommodation', 'Gift guidance', 'Venue timing'].map((item) => (
                  <div key={item} className="rounded-xl border border-stone-200/80 bg-white/80 px-3 py-2 text-sm text-stone-700">
                    {t(item)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'registry' && (
          <div className="space-y-4">
            <div className={sectionCard}>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-4xl font-semibold text-stone-900">{t('Registry')}</h2>
                  {!includedTabs.has('registry') && <span className="chip">{t('Preview')}</span>}
                </div>
                <button type="button" className="btn-secondary" onClick={() => setShowAvailableOnly((v) => !v)}>
                  {showAvailableOnly ? t('Show All') : t('Available Only')}
                </button>
              </div>
              <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-stone-200/80 bg-white/85 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t('Items')}</p>
                  <p className="mt-1 text-2xl font-semibold text-stone-900">{sample.registry.length}</p>
                </div>
                <div className="rounded-xl border border-stone-200/80 bg-white/85 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t('Available')}</p>
                  <p className="mt-1 text-2xl font-semibold text-emerald-700">{registryAvailableCount}</p>
                </div>
                <div className="rounded-xl border border-stone-200/80 bg-white/85 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t('Reserved')}</p>
                  <p className="mt-1 text-2xl font-semibold text-stone-900">{registryReservedCount}</p>
                </div>
              </div>
              <div className="mb-4 rounded-xl border border-stone-200/80 bg-white/85 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t('Displayed gift value')}</p>
                <p className="mt-1 text-xl font-semibold text-stone-900">${registryValue.toLocaleString()}</p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {filteredRegistry.map((item) => (
                  <div key={`${item.name}-${item.price}`} className="rounded-xl border border-stone-200/80 bg-white/85 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-stone-900">{t(item.name)}</p>
                      <span className="chip">{item.price}</span>
                    </div>
                    <p className={`mt-2 text-sm font-medium ${item.status === 'available' ? 'text-emerald-700' : 'text-stone-500'}`}>
                      {item.status === 'available' ? t('Available to gift') : t('Reserved')}
                    </p>
                    <button type="button" className={`mt-3 w-full ${item.status === 'available' ? 'btn-primary' : 'btn-secondary'}`}>
                      {item.status === 'available' ? t('Gift This Item') : t('Already Reserved')}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'seating' && (
          <div className={sectionCard}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-4xl font-semibold text-stone-900">{t('Seating Preview')}</h2>
              {!includedTabs.has('seating') && <span className="chip">{t('Preview')}</span>}
            </div>
            <p className="mt-2 text-sm text-stone-600">{t('Seating table previews help guests find their section and help organizers confirm table grouping before the event.')}</p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-stone-200/80 bg-white/85 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t('Tables')}</p>
                <p className="mt-1 text-2xl font-semibold text-stone-900">{(sample.seating || []).length}</p>
              </div>
              <div className="rounded-xl border border-stone-200/80 bg-white/85 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t('Guests grouped')}</p>
                <p className="mt-1 text-2xl font-semibold text-stone-900">
                  {(sample.seating || []).reduce((sum, table) => sum + table.guests.length, 0)}
                </p>
              </div>
              <div className="rounded-xl border border-stone-200/80 bg-white/85 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{t('Mode')}</p>
                <p className="mt-1 text-sm font-semibold text-stone-900">{t(includedTabs.has('seating') ? 'Guest-facing & planner preview' : 'Preview layout')}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              {(sample.seating || []).map((table) => (
                <div key={table.table} className={`rounded-xl border bg-white/85 p-4`}>
                  <div className={`rounded-lg bg-gradient-to-r ${sample.gradient} px-3 py-2 text-center text-sm font-semibold text-white`}>
                    {table.table}
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-stone-700">
                    {table.guests.map((guest) => (
                      <li key={guest} className="rounded-lg border border-stone-200/70 bg-white/85 px-3 py-2">{guest}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

