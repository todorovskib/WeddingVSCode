import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, CalendarDays, Gift, Hotel, MapPin, Music2, Phone, Plane, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';
import {
  DemoRsvpForm,
  FaqAccordion,
  GalleryGrid,
  type GalleryItem,
  type LightboxState,
  SampleFooter,
  SampleLightbox,
  SectionTitle,
  cx,
  onSampleImageError,
  sampleSectionMotion,
} from './SampleShared';

type PlatinumPageKey = 'overview' | 'events' | 'concierge' | 'seating' | 'gallery' | 'registry' | 'rsvp';

const PLATINUM_PAGES: Array<{ key: PlatinumPageKey; label: string; short: string }> = [
  { key: 'overview', label: 'Overview', short: 'Welcome' },
  { key: 'events', label: 'Events', short: 'Timeline' },
  { key: 'concierge', label: 'Concierge', short: 'Guest Support' },
  { key: 'seating', label: 'Seating', short: 'Tables' },
  { key: 'gallery', label: 'Gallery', short: 'Editorial' },
  { key: 'registry', label: 'Registry', short: 'Gifts' },
  { key: 'rsvp', label: 'RSVP', short: 'Reply' },
];

const platinumGallery: GalleryItem[] = [
  { src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1400&q=80', alt: 'Luxury welcome dinner', caption: 'Private welcome dinner' },
  { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80', alt: 'Estate ceremony', caption: 'Ceremony estate' },
  { src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=80', alt: 'Editorial portraits', caption: 'Editorial portrait direction' },
  { src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=80', alt: 'Reception styling', caption: 'Reception design board' },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80', alt: 'Celebration dance floor', caption: 'Dance floor mood' },
  { src: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=1400&q=80', alt: 'Floral detail', caption: 'Floral direction' },
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80', alt: 'Ceremony portrait', caption: 'Ceremony moments' },
  { src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80', alt: 'Brunch welcome', caption: 'Farewell brunch tables' },
];

const platinumFaqs = [
  { question: 'Can I request a private transfer?', answer: 'Yes. Platinum includes concierge coordination. Select transfer needs in RSVP or contact the concierge line listed on the Concierge page.' },
  { question: 'How do I know my table?', answer: 'Guests can use the Seating page to search by name and preview table area notes before arrival.' },
  { question: 'Can I send a private note to the couple?', answer: 'Yes. The RSVP page supports private wishes and song requests for the reception set.' },
  { question: 'Do international guests get language support?', answer: 'Yes. Concierge notes and key event cards can include multilingual instructions and arrival guidance.' },
];

function normalizePlatinumPage(page?: string): PlatinumPageKey {
  const value = (page || 'overview').toLowerCase();
  return (PLATINUM_PAGES.some((p) => p.key === value) ? value : 'overview') as PlatinumPageKey;
}

const PlatinumNavTabs: React.FC<{ active: PlatinumPageKey; toPath: (page: PlatinumPageKey) => string }> = ({ active, toPath }) => (
  <div className="overflow-x-auto">
    <div className="flex min-w-max gap-2">
      {PLATINUM_PAGES.map((item) => (
        <Link
          key={item.key}
          to={toPath(item.key)}
          className={cx(
            'inline-flex items-center border px-3 py-2 text-sm font-semibold transition',
            active === item.key
              ? 'border-violet-300/80 bg-white text-[#2a1d38] shadow-[0_8px_18px_rgba(64,39,94,0.08)]'
              : 'border-violet-200/55 bg-white/65 text-[#5e4b75] hover:border-violet-300/70 hover:text-[#2a1d38]'
          )}
          style={{ borderRadius: 8 }}
        >
          {item.label}
        </Link>
      ))}
    </div>
  </div>
);

const PlatinumHero: React.FC<{ page: PlatinumPageKey; toPath: (page: PlatinumPageKey) => string }> = ({ page, toPath }) => {
  const { t } = useI18n();
  const activeMeta = PLATINUM_PAGES.find((p) => p.key === page)!;

  return (
    <section className="relative overflow-hidden px-4 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div {...sampleSectionMotion} className="platinum-panel p-3 sm:p-4">
          <div className="border border-violet-200/55 bg-white/75 p-2 sm:p-3" style={{ borderRadius: 10 }}>
            <PlatinumNavTabs active={page} toPath={toPath} />
          </div>

          <div className="relative mt-3 min-h-[440px] overflow-hidden sm:min-h-[540px]">
            <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=80" alt="Elena and Marko wedding weekend" onError={onSampleImageError} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1d122a]/38 via-[#1d122a]/18 to-[#1d122a]/76" />
            <div className="absolute inset-0 flex items-end justify-center px-4 py-6 sm:px-6 sm:py-8">
              <div className="grid w-full max-w-6xl gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                <div className="border border-white/20 bg-black/28 p-4 text-white backdrop-blur-md sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">Wedding Weekend</p>
                  <h1 className="sample-font-romantic mt-3 text-4xl sm:text-5xl lg:text-6xl">Elena & Marko</h1>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/88 sm:text-base">Saturday, October 3, 2026</p>
                  <p className="mt-2 text-sm text-white/88 sm:text-base">Aurora Estate, Ohrid · Ceremony 16:30 · Reception & Live Band</p>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/86 sm:text-base">
                    Thank you for celebrating with us. Use the navigation above for events, guest support, seating, gallery, registry, and RSVP.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <Link to={toPath('rsvp')} className="sample-btn sample-btn-primary">RSVP</Link>
                    <Link to={toPath('events')} className="sample-btn sample-btn-secondary">Events</Link>
                    <Link to={toPath('concierge')} className="sample-btn sample-btn-secondary">Guest Concierge</Link>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Aurora+Estate+Ohrid"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sample-btn sample-btn-secondary"
                    >
                      {t('Open on map')}
                    </a>
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="border border-white/18 bg-black/32 p-4 text-white/95 backdrop-blur-md sm:p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Guest Concierge</p>
                    <p className="mt-2 text-lg font-semibold text-white">Arrival support & private notes</p>
                    <p className="mt-2 text-sm leading-6 text-white/84">
                      Platinum guests get event guidance, location support, seating preview, and concierge follow-up in one place.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      ['4', 'Weekend events'],
                      ['180', 'Guests'],
                      ['7', 'Guest pages'],
                      ['12+', 'RSVP details'],
                    ].map(([value, label]) => (
                      <div key={label} className="border border-white/16 bg-black/26 p-3 text-white backdrop-blur-sm">
                        <p className="text-lg font-semibold text-white">{value}</p>
                        <p className="mt-1 text-xs text-white/80">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="border border-violet-200/55 bg-white/80 p-4 sm:p-5" style={{ borderRadius: 8 }}>
              <div className="flex items-center gap-2 text-violet-600">
                <Sparkles className="h-4 w-4" />
                <p className="text-xs font-semibold uppercase tracking-[0.18em]">Current page</p>
              </div>
              <p className="sample-font-classic mt-3 text-3xl text-[#2a1d38] sm:text-4xl">{activeMeta.short}</p>
              <p className="mt-2 text-sm leading-7 text-[#5e4b75]">
                Example of a fully built guest-facing wedding website with separate pages for the most important information guests need.
              </p>
            </div>

            <div className="border border-violet-200/55 bg-white/78 p-4 sm:p-5" style={{ borderRadius: 8 }}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600/80">Platinum experience</p>
              <p className="mt-2 text-sm leading-7 text-[#5e4b75]">
                Multi-page guest website with dedicated concierge, seating preview, events timeline, registry, gallery, and RSVP workflows.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to={toPath('seating')} className="sample-btn sample-btn-secondary !px-3 !py-2 text-xs">Seating page</Link>
                <Link to={toPath('gallery')} className="sample-btn sample-btn-secondary !px-3 !py-2 text-xs">Gallery page</Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
const PlatinumOverviewPage: React.FC<{ toPath: (page: PlatinumPageKey) => string }> = ({ toPath }) => (
  <section className="px-4 py-5 sm:px-6 lg:px-8">
    <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[1.03fr_0.97fr]">
      <motion.div {...sampleSectionMotion} className="platinum-panel p-5 sm:p-6">
        <SectionTitle kicker="Overview" title="A complete wedding guest experience, page by page" body="Guests get structure, support, and premium presentation across dedicated pages designed for a full weekend celebration." />
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            { title: 'Events page', body: 'Multi-event schedule with transport notes and optional events clearly marked.', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80', to: 'events' as PlatinumPageKey },
            { title: 'Concierge page', body: 'Support contacts, transfer windows, and guest-facing private notes.', image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80', to: 'concierge' as PlatinumPageKey },
            { title: 'Seating page', body: 'Table guidance for guests before arrival to reduce confusion at entry.', image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80', to: 'seating' as PlatinumPageKey },
            { title: 'RSVP page', body: 'Concierge-style RSVP with travel, meals, requests, and accessibility notes.', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80', to: 'rsvp' as PlatinumPageKey },
          ].map((card) => (
            <Link key={card.title} to={toPath(card.to)} className="group overflow-hidden border border-violet-200/55 bg-white/72" style={{ borderRadius: 10 }}>
              <div className="relative h-32 overflow-hidden">
                <img src={card.image} alt={card.title} onError={onSampleImageError} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute left-4 top-4 inline-flex border border-white/25 bg-black/35 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white" style={{ borderRadius: 6 }}>Open page</p>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-[#2a1d38]">{card.title}</p>
                <p className="mt-1 text-sm leading-6 text-[#5e4b75]">{card.body}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      <motion.div {...sampleSectionMotion} className="space-y-4">
        <div className="platinum-panel p-5 sm:p-6">
          <SectionTitle kicker="Signature touches" title="Looks custom because it is" />
          <div className="mt-4 grid gap-3">
            {[
              { icon: Sparkles, title: 'Distinct visual direction', body: 'Platinum uses a unique luxury visual system, typography, and image treatment.' },
              { icon: Users, title: 'Guest support systems', body: 'Seating previews, concierge guidance, and custom RSVP questions improve the guest experience.' },
              { icon: Camera, title: 'Editorial storytelling', body: 'A richer gallery presentation keeps the page beautiful before and after the celebration.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-3 border border-violet-200/55 bg-white/76 p-4" style={{ borderRadius: 8 }}>
                  <div className="inline-flex h-8 w-8 items-center justify-center border border-violet-200/60 bg-white" style={{ borderRadius: 8 }}>
                    <Icon className="h-4 w-4 text-violet-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#2a1d38]">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#5e4b75]">{item.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="platinum-panel overflow-hidden">
          <div className="grid grid-cols-3 gap-0.5 bg-violet-200/30">
            {[
              'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
            ].map((src, index) => (
              <div key={src} className={cx('relative overflow-hidden', index === 1 ? 'h-32' : 'h-28')}>
                <img src={src} alt="Platinum sample detail" onError={onSampleImageError} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600/80">Real wedding page feel</p>
            <p className="mt-2 text-sm leading-6 text-[#5e4b75]">This sample is built as a finished guest website, with separate pages and practical details, not a template preview screen.</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const PlatinumEventsPage: React.FC = () => {
  const events = [
    { day: 'Thursday', title: 'Private family dinner', time: '19:30', note: 'Invitation-only evening for close family. Concierge confirms pickup windows directly.', place: 'Vila Aurora' },
    { day: 'Friday', title: 'Welcome party', time: '20:30', note: 'Rooftop cocktails, live lounge set, and casual guest welcome.', place: 'Aurora Rooftop' },
    { day: 'Saturday', title: 'Ceremony', time: '16:30', note: 'Monastery garden ceremony. Shuttle leaves hotels at 15:45.', place: 'Monastery Garden' },
    { day: 'Saturday', title: 'Reception', time: '19:00', note: 'Dinner, speeches, live band, and midnight dessert room.', place: 'Estate Ballroom' },
    { day: 'Sunday', title: 'Brunch & farewell', time: '12:00', note: 'Relaxed poolside brunch and departure coordination.', place: 'Pool Terrace' },
  ];

  return (
    <section className="px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div {...sampleSectionMotion} className="platinum-panel p-5 sm:p-6">
          <SectionTitle kicker="Events" title="Weekend timeline" body="Guests can view the full event sequence with timing, venue notes, and transport guidance in one dedicated page." />
          <div className="mt-5 space-y-3">
            {events.map((item) => (
              <div key={`${item.day}-${item.time}-${item.title}`} className="border border-violet-200/55 bg-white/74 p-4 sm:p-5" style={{ borderRadius: 10 }}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-600/80">{item.day} · {item.time}</p>
                    <p className="mt-1 text-base font-semibold text-[#2a1d38]">{item.title}</p>
                    <p className="mt-1 text-sm text-[#4c3568]">{item.place}</p>
                    <p className="mt-2 text-sm leading-6 text-[#5e4b75]">{item.note}</p>
                  </div>
                  <span className="sample-chip">Guest guidance</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...sampleSectionMotion} className="space-y-4">
          <div className="platinum-panel p-5 sm:p-6">
            <SectionTitle kicker="Guest guidance" title="Helpful planning details for guests" />
            <div className="mt-4 grid gap-3">
              {[
                { icon: Plane, title: 'Transfer timing', body: 'Timing notes linked to event cards for airport and hotel movement.' },
                { icon: Hotel, title: 'Hotel pickup points', body: 'Pickup points listed directly on timeline cards.' },
                { icon: Sparkles, title: 'Optional event clarity', body: 'Guests immediately know what is optional vs main event.' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-3 border border-violet-200/55 bg-white/76 p-4" style={{ borderRadius: 8 }}>
                    <Icon className="mt-0.5 h-4 w-4 text-violet-500" />
                    <div>
                      <p className="text-sm font-semibold text-[#2a1d38]">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-[#5e4b75]">{item.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="platinum-panel overflow-hidden">
            <img src="https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1200&q=80" alt="Venue driveway for guest shuttles" onError={onSampleImageError} className="h-48 w-full object-cover" />
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600/80">Transport-ready content</p>
              <p className="mt-2 text-sm leading-6 text-[#5e4b75]">A real sample of how timeline pages can include useful arrival and shuttle information without cluttering the invitation itself.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PlatinumConciergePage: React.FC = () => (
  <section className="px-4 py-5 sm:px-6 lg:px-8">
    <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <motion.div {...sampleSectionMotion} className="platinum-panel p-5 sm:p-6">
        <SectionTitle kicker="Concierge" title="Personal guest support page" body="This page centralizes contact channels, private guest notes, and practical support for travel and arrivals." />
        <div className="mt-5 space-y-3">
          {[
            { icon: Phone, title: 'Concierge line', body: '+389 70 888 222 · WhatsApp and Viber support', tone: 'Available Thu-Sun 10:00-22:00' },
            { icon: Plane, title: 'Transfer requests', body: 'Airport pickup and hotel shuttle adjustments', tone: 'Requests close 48h before arrival' },
            { icon: MapPin, title: 'Location support', body: 'Arrival gates, parking notes, and pickup pins', tone: 'Shared with guests after RSVP' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="border border-violet-200/55 bg-white/74 p-4" style={{ borderRadius: 10 }}>
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-9 w-9 items-center justify-center border border-violet-200/60 bg-white" style={{ borderRadius: 8 }}>
                    <Icon className="h-4 w-4 text-violet-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#2a1d38]">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#5e4b75]">{item.body}</p>
                    <p className="mt-1 text-xs font-medium text-violet-600/80">{item.tone}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div {...sampleSectionMotion} className="space-y-4">
        <div className="platinum-panel p-5 sm:p-6">
          <SectionTitle kicker="Private notes" title="Tailored guest instructions" />
          <div className="mt-4 space-y-3">
            {[
              'International guests staying at Riverside Boutique: your shuttle pickup is at the side entrance, 15 minutes before the listed departure time.',
              'Families with strollers can use the west garden access path. Concierge team will be available from 15:30 to assist.',
              'Guests attending Thursday family dinner receive a separate QR gate note one day before arrival.',
            ].map((note) => (
              <div key={note} className="border border-violet-200/55 bg-white/76 p-4 text-sm leading-6 text-[#5e4b75]" style={{ borderRadius: 8 }}>
                {note}
              </div>
            ))}
          </div>
        </div>
        <div className="platinum-panel p-5 sm:p-6">
          <SectionTitle kicker="FAQ" title="Support questions" />
          <div className="mt-4">
            <FaqAccordion panelClass="platinum-panel !rounded-[10px] !border-violet-200/55 !bg-white/72" items={platinumFaqs} />
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

type SeatRecord = { guest: string; table: string; zone: string; host: string };

const seatRecords: SeatRecord[] = [
  { guest: 'Ivana Petrovska', table: 'Table 01', zone: 'Family lounge', host: 'Elena T.' },
  { guest: 'Filip Stojanov', table: 'Table 07', zone: 'Dance floor side', host: 'Marko P.' },
  { guest: 'Mila Kostov', table: 'Table 12', zone: 'International guests', host: 'Concierge team' },
  { guest: 'Daniela Ivanova', table: 'Table 16', zone: 'Quiet speech zone', host: 'Host team' },
  { guest: 'John Matthews', table: 'Table 12', zone: 'International guests', host: 'Concierge team' },
  { guest: 'Sara Trajkovska', table: 'Table 05', zone: 'Friends of the couple', host: 'Ivana N.' },
];

const PlatinumSeatingPage: React.FC = () => {
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return seatRecords;
    return seatRecords.filter((item) => [item.guest, item.table, item.zone, item.host].some((v) => v.toLowerCase().includes(q)));
  }, [query]);

  return (
    <section className="px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[1fr_1fr]">
        <motion.div {...sampleSectionMotion} className="platinum-panel p-5 sm:p-6">
          <SectionTitle kicker="Seating preview" title="Search your table before arrival" body="Platinum can include a guest-facing seating preview to make venue entry smoother, especially for larger weddings." />
          <div className="mt-4 border border-violet-200/55 bg-white/76 p-4" style={{ borderRadius: 10 }}>
            <label htmlFor="platinum-seat-search" className="sample-label">Search guest / table</label>
            <input id="platinum-seat-search" type="text" value={query} onChange={(event) => setQuery(event.target.value)} className="sample-input" placeholder="Try: Ivana, Table 12, International..." />
            <p className="mt-2 text-xs text-[#5e4b75]">Demo search for the seating page. In production this can be tied to secure guest tokens.</p>
          </div>
          <div className="mt-4 space-y-2">
            {filtered.map((row) => (
              <div key={`${row.guest}-${row.table}`} className="grid gap-2 border border-violet-200/55 bg-white/78 p-3 sm:grid-cols-[1.1fr_auto_auto] sm:items-center" style={{ borderRadius: 8 }}>
                <div>
                  <p className="text-sm font-semibold text-[#2a1d38]">{row.guest}</p>
                  <p className="mt-1 text-xs text-[#5e4b75]">{row.zone} · host: {row.host}</p>
                </div>
                <span className="sample-chip">{row.table}</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Aurora+Estate+Ohrid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sample-btn sample-btn-secondary !px-3 !py-2 text-xs"
                >
                  {t('View map')}
                </a>
              </div>
            ))}
            {filtered.length === 0 && <div className="border border-violet-200/55 bg-white/80 p-4 text-sm text-[#5e4b75]" style={{ borderRadius: 8 }}>No matching guest in this demo list.</div>}
          </div>
        </motion.div>

        <motion.div {...sampleSectionMotion} className="space-y-4">
          <div className="platinum-panel overflow-hidden">
            <img src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1400&q=80" alt="Reception seating hall" onError={onSampleImageError} className="h-56 w-full object-cover" />
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600/80">Venue guidance</p>
              <p className="mt-2 text-sm leading-6 text-[#5e4b75]">Table zones can be grouped by family, friends, and international guests with host names and arrival notes.</p>
            </div>
          </div>
          <div className="platinum-panel p-5 sm:p-6">
            <SectionTitle kicker="Platinum value" title="Why guests love this" />
            <ul className="mt-4 space-y-2 text-sm leading-6 text-[#5e4b75]">
              <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-500" />Less confusion at venue entrance</li>
              <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-500" />Hosts can direct guests faster</li>
              <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-500" />Feels premium and truly custom-built</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
const PlatinumGalleryPage: React.FC<{ lightbox: LightboxState; setLightbox: React.Dispatch<React.SetStateAction<LightboxState>> }> = ({ lightbox, setLightbox }) => (
  <>
    <SampleLightbox
      state={lightbox}
      onClose={() => setLightbox(null)}
      onNext={() => setLightbox((prev) => (prev ? { ...prev, index: (prev.index + 1) % prev.items.length } : prev))}
      onPrev={() => setLightbox((prev) => (prev ? { ...prev, index: (prev.index - 1 + prev.items.length) % prev.items.length } : prev))}
    />
    <section className="px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div {...sampleSectionMotion} className="platinum-panel p-5 sm:p-6">
          <SectionTitle kicker="Editorial gallery" title="Luxury visual storytelling" body="A high-end gallery experience with lightbox viewing and stronger art direction that matches premium wedding branding." />
          <div className="mt-5">
            <GalleryGrid items={platinumGallery} onOpen={(items, index) => setLightbox({ items, index })} cardClass="platinum-panel h-64 rounded-[12px] !p-0" />
          </div>
        </motion.div>
      </div>
    </section>
  </>
);

const PlatinumRegistryPage: React.FC = () => {
  const groups = [
    { title: 'Experiences', items: [['Honeymoon villa dinner', '$240', 'Available'], ['Private boat day', '$320', 'Available'], ['Wine tasting itinerary', '$180', 'Reserved']] },
    { title: 'Home collection', items: [['Designer cutlery set', '$280', 'Available'], ['Espresso setup upgrade', '$340', 'Reserved'], ['Stoneware serving set', '$210', 'Available']] },
  ];

  return (
    <section className="px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div {...sampleSectionMotion} className="platinum-panel p-5 sm:p-6">
          <SectionTitle kicker="Registry" title="Luxury registry with experiences and reserve states" />
          <div className="mt-5 space-y-5">
            {groups.map((group) => (
              <div key={group.title} className="border border-violet-200/55 bg-white/76 p-4" style={{ borderRadius: 10 }}>
                <p className="sample-font-classic text-2xl text-[#2a1d38]">{group.title}</p>
                <div className="mt-3 space-y-2">
                  {group.items.map(([item, price, status]) => (
                    <div key={item} className="flex flex-wrap items-center justify-between gap-3 border border-violet-200/50 bg-white/88 px-3 py-3" style={{ borderRadius: 8 }}>
                      <div>
                        <p className="text-sm font-semibold text-[#2a1d38]">{item}</p>
                        <p className="text-xs text-[#5e4b75]">{price}</p>
                      </div>
                      <span className="sample-chip">{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...sampleSectionMotion} className="space-y-4">
          <div className="platinum-panel p-5 sm:p-6">
            <SectionTitle kicker="Registry note" title="Elegant and personal" />
            <p className="mt-4 text-sm leading-7 text-[#5e4b75]">Your presence is our greatest gift. If you would like to contribute, we have shared a few experiences and home pieces we would treasure as we begin our next chapter.</p>
          </div>
          <div className="platinum-panel p-5 sm:p-6">
          <SectionTitle kicker="Registry details" title="Clear gifting guidance for guests" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Gift, title: 'Status labels', body: 'Available, reserved, and contribution-ready states.' },
                { icon: Sparkles, title: 'Category styling', body: 'Luxury presentation by gift type and experiences.' },
                { icon: Users, title: 'Guest clarity', body: 'Guests understand how to gift without confusion.' },
                { icon: Camera, title: 'Visual balance', body: 'Registry design matches the rest of the wedding site.' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="border border-violet-200/55 bg-white/76 p-4" style={{ borderRadius: 8 }}>
                    <Icon className="h-4 w-4 text-violet-500" />
                    <p className="mt-2 text-sm font-semibold text-[#2a1d38]">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#5e4b75]">{item.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PlatinumRsvpPage: React.FC = () => (
  <section className="px-4 py-5 sm:px-6 lg:px-8">
    <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[1fr_1fr]">
      <motion.div {...sampleSectionMotion}>
        <DemoRsvpForm
          panelClass="platinum-panel"
          submitLabel="Submit concierge RSVP"
          extraFields={
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div><label className="sample-label" htmlFor="platinum-party-size">Party size</label><select id="platinum-party-size" className="sample-select" defaultValue="2"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5+</option></select></div>
                <div><label className="sample-label" htmlFor="platinum-arrival">Arrival date</label><input id="platinum-arrival" type="date" className="sample-input" defaultValue="2026-09-10" /></div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div><label className="sample-label" htmlFor="platinum-events">Events attending</label><select id="platinum-events" className="sample-select" defaultValue="full-weekend"><option value="full-weekend">Full weekend</option><option value="wedding-day">Wedding day only</option><option value="custom">Custom selection</option></select></div>
                <div><label className="sample-label" htmlFor="platinum-transfer">Transfer support</label><select id="platinum-transfer" className="sample-select" defaultValue="airport-hotel"><option value="airport-hotel">Airport + hotel transfer</option><option value="event-only">Event shuttles only</option><option value="none">No transfer needed</option></select></div>
              </div>
              <div><label className="sample-label" htmlFor="platinum-diet">Dietary / accessibility notes</label><textarea id="platinum-diet" className="sample-textarea" rows={3} placeholder="Please include allergies, mobility support, stroller access, or seating requests." /></div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div><label className="sample-label" htmlFor="platinum-song">Song request</label><input id="platinum-song" type="text" className="sample-input" placeholder="Your dance floor favorite" /></div>
                <div><label className="sample-label" htmlFor="platinum-kids">Children attending</label><select id="platinum-kids" className="sample-select" defaultValue="0"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3+</option></select></div>
              </div>
            </>
          }
        />
      </motion.div>
      <motion.div {...sampleSectionMotion} className="space-y-4">
        <div className="platinum-panel p-5 sm:p-6">
          <SectionTitle kicker="RSVP depth" title="Planning-grade RSVP without losing elegance" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { icon: CalendarDays, title: 'Multi-event attendance', body: 'Guests choose full weekend or selected events.' },
              { icon: Plane, title: 'Transfers', body: 'Airport and shuttle support captured during RSVP.' },
              { icon: Music2, title: 'Personal requests', body: 'Song requests and private notes for the couple.' },
              { icon: Users, title: 'Family support', body: 'Kids count and accessibility notes before arrival.' },
            ].map((item) => { const Icon = item.icon; return <div key={item.title} className="border border-violet-200/55 bg-white/76 p-4" style={{ borderRadius: 8 }}><Icon className="h-4 w-4 text-violet-500" /><p className="mt-2 text-sm font-semibold text-[#2a1d38]">{item.title}</p><p className="mt-1 text-sm leading-6 text-[#5e4b75]">{item.body}</p></div>; })}
          </div>
        </div>
        <div className="platinum-panel p-5 sm:p-6">
          <SectionTitle kicker="Private note sample" title="Guest-facing yet personal" />
          <p className="mt-4 text-sm leading-7 text-[#5e4b75]">Dear international guests, our concierge team will contact you after RSVP confirmation with the shuttle timing that matches your arrival. Thank you for traveling to celebrate with us.</p>
        </div>
      </motion.div>
    </div>
  </section>
);

export const PlatinumSampleSite: React.FC<{ page?: string }> = ({ page }) => {
  const { pathFor } = useI18n();
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const activePage = normalizePlatinumPage(page);
  const pagePath = (next: PlatinumPageKey) => pathFor(next === 'overview' ? '/samples/platinum' : `/samples/platinum/${next}`);

  return (
    <div className="sample-site-root platinum-page sample-font-modern text-[#2a1d38]">
      <PlatinumHero page={activePage} toPath={pagePath} />
      {activePage === 'overview' && <PlatinumOverviewPage toPath={pagePath} />}
      {activePage === 'events' && <PlatinumEventsPage />}
      {activePage === 'concierge' && <PlatinumConciergePage />}
      {activePage === 'seating' && <PlatinumSeatingPage />}
      {activePage === 'gallery' && <PlatinumGalleryPage lightbox={lightbox} setLightbox={setLightbox} />}
      {activePage === 'registry' && <PlatinumRegistryPage />}
      {activePage === 'rsvp' && <PlatinumRsvpPage />}
      <SampleFooter title="WedMKD sample controls" subtitle="These controls are outside the client wedding page. This sample opens as a complete multi-page wedding website." toneClass="text-[#2a1d38]" />
    </div>
  );
};
