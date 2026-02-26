import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Camera, Clock3, Gift, Hotel, MapPin, Plane, Sparkles, Users } from 'lucide-react';
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

type PremiumPageKey = 'overview' | 'timeline' | 'travel' | 'registry' | 'gallery' | 'rsvp';

const PREMIUM_PAGES: Array<{ key: PremiumPageKey; label: string; kicker: string }> = [
  { key: 'overview', label: 'Overview', kicker: 'Weekend Welcome' },
  { key: 'timeline', label: 'Timeline', kicker: 'Event Flow' },
  { key: 'travel', label: 'Travel', kicker: 'Stay & Transport' },
  { key: 'registry', label: 'Registry', kicker: 'Gifts & Notes' },
  { key: 'gallery', label: 'Gallery', kicker: 'Visual Story' },
  { key: 'rsvp', label: 'RSVP', kicker: 'Guest Reply' },
];

const premiumGallery: GalleryItem[] = [
  { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80', alt: 'Welcome evening setting', caption: 'Friday welcome terrace' },
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80', alt: 'Ceremony vows', caption: 'Garden ceremony' },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80', alt: 'Guests celebrating', caption: 'Reception dance floor' },
  { src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=80', alt: 'Table styling', caption: 'Dinner tablescape' },
  { src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=80', alt: 'Couple portrait', caption: 'Sunset portrait session' },
  { src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1400&q=80', alt: 'Friends and family', caption: 'Weekend guests' },
  { src: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=1400&q=80', alt: 'Flowers', caption: 'Floral details' },
  { src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=80', alt: 'Editorial detail portrait', caption: 'Editorial detail moments' },
];

const premiumFaqs = [
  {
    question: 'Where should we stay?',
    answer: 'We reserved room blocks at Hotel Garden and City House. Use code LINA-VIKTOR when booking. Shuttle timing is listed on the Travel page.',
  },
  {
    question: 'Are all weekend events required?',
    answer: 'No. Friday welcome drinks and Sunday brunch are optional. Please use the RSVP page to mark which events you will attend.',
  },
  {
    question: 'Can I share dietary needs?',
    answer: 'Yes. The RSVP page includes meal selection and a notes field for allergies, accessibility, and seating preferences.',
  },
  {
    question: 'Is there a registry?',
    answer: 'Yes. The Registry page includes experiences, home gifts, and partial contribution options with availability status.',
  },
];

function normalizePremiumPage(page?: string): PremiumPageKey {
  const value = (page || 'overview').toLowerCase();
  const valid = PREMIUM_PAGES.some((p) => p.key === value);
  return (valid ? value : 'overview') as PremiumPageKey;
}

function badgeForPremium(page: PremiumPageKey) {
  return PREMIUM_PAGES.find((p) => p.key === page) ?? PREMIUM_PAGES[0];
}

function eventOverviewCards() {
  return [
    {
      day: 'Friday',
      time: '20:00',
      title: 'Welcome cocktails',
      place: 'Hotel Garden rooftop',
      note: 'A relaxed arrival evening with music and signature cocktails.',
      image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1000&q=80',
    },
    {
      day: 'Saturday',
      time: '17:00',
      title: 'Ceremony & reception',
      place: 'Olive Estate, Skopje',
      note: 'Ceremony, dinner, speeches, and dancing in one estate venue.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    },
    {
      day: 'Sunday',
      time: '11:30',
      title: 'Farewell brunch',
      place: 'Garden Terrace',
      note: 'Casual brunch before departures and airport shuttles.',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80',
    },
  ];
}

const PremiumPageTabs: React.FC<{
  active: PremiumPageKey;
  toPath: (page: PremiumPageKey) => string;
}> = ({ active, toPath }) => (
  <div className="overflow-x-auto">
    <div className="flex min-w-max gap-2 pb-1">
      {PREMIUM_PAGES.map((item) => (
        <Link
          key={item.key}
          to={toPath(item.key)}
          className={cx(
            'inline-flex items-center border px-3 py-2 text-sm font-semibold transition',
            active === item.key
              ? 'border-[#8a6a50] bg-[#fff8ef] text-[#2f261f] shadow-[0_6px_14px_rgba(47,33,25,0.08)]'
              : 'border-[#d7c6b1]/80 bg-white/80 text-[#5b4b3f] hover:border-[#c9b399] hover:text-[#2f261f]'
          )}
          style={{ borderRadius: 8 }}
        >
          {item.label}
        </Link>
      ))}
    </div>
  </div>
);

const PremiumHero: React.FC<{
  page: PremiumPageKey;
  toPath: (page: PremiumPageKey) => string;
}> = ({ page, toPath }) => {
  const active = badgeForPremium(page);

  return (
    <section className="relative overflow-hidden px-4 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div {...sampleSectionMotion} className="premium-card p-3 sm:p-4">
          <div className="border border-[#d5c3ac]/75 bg-white/85 p-2 sm:p-3" style={{ borderRadius: 10 }}>
            <PremiumPageTabs active={page} toPath={toPath} />
          </div>

          <div className="relative mt-3 min-h-[420px] overflow-hidden sm:min-h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=80"
              alt="Lina and Viktor celebration weekend"
              onError={onSampleImageError}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1d150f]/34 via-[#1d150f]/26 to-[#1d150f]/72" />
            <div className="absolute inset-0 flex items-center justify-center px-4 py-8">
              <div className="w-full max-w-3xl text-center text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">Wedding Weekend</p>
                <h1 className="sample-font-romantic mt-3 text-4xl leading-tight sm:text-5xl lg:text-6xl">Lina & Viktor</h1>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/88 sm:text-base">Saturday, September 12, 2026</p>
                <p className="mt-2 text-sm text-white/86 sm:text-base">Olive Estate, Skopje · Ceremony 17:00 · Reception to Follow</p>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/84 sm:text-base">
                  We are so happy to celebrate with you. Use the menu above to explore the weekend schedule, travel details, registry, gallery, and RSVP.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                  <Link to={toPath('rsvp')} className="sample-btn sample-btn-primary">RSVP</Link>
                  <Link to={toPath('timeline')} className="sample-btn sample-btn-secondary">Timeline</Link>
                  <Link to={toPath('travel')} className="sample-btn sample-btn-secondary">Travel</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="border border-[#d5c3ac]/75 bg-white/78 p-4 sm:p-5" style={{ borderRadius: 10 }}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a705c]">Current page</p>
              <p className="mt-2 sample-font-classic text-2xl text-[#2f261f]">{active.kicker}</p>
              <p className="mt-1 text-sm text-[#5b4b3f]">{active.label}</p>
              <p className="mt-3 text-sm leading-6 text-[#5b4b3f]">
                Guest-ready wedding website example with separate pages for key information so guests can quickly find what they need.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                ['3', 'Weekend events'],
                ['2', 'Hotel room blocks'],
                ['6+', 'RSVP details'],
                ['8', 'Gallery moments'],
              ].map(([value, label]) => (
                <div key={label} className="border border-[#d5c3ac]/75 bg-white/75 p-4" style={{ borderRadius: 8 }}>
                  <p className="text-2xl font-semibold text-[#8a5b36]">{value}</p>
                  <p className="mt-1 text-sm text-[#5b4b3f]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PremiumOverviewPage: React.FC<{ toPath: (page: PremiumPageKey) => string }> = ({ toPath }) => {
  const events = useMemo(() => eventOverviewCards(), []);

  return (
    <>
      <section className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div {...sampleSectionMotion} className="premium-card p-5 sm:p-6">
            <SectionTitle
              kicker="Weekend at a glance"
              title="One elegant guest hub for the entire celebration"
              body="A complete wedding weekend website example with a clear event sequence, travel planning, registry details, and RSVP pages guests can actually use."
            />
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {events.map((event) => (
                <Link key={event.title} to={toPath('timeline')} className="group overflow-hidden border border-[#d5c3ac]/70 bg-white/78" style={{ borderRadius: 10 }}>
                  <div className="relative h-28 overflow-hidden">
                    <img src={event.image} alt={event.title} onError={onSampleImageError} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute left-3 top-3 inline-flex border border-white/20 bg-black/40 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white" style={{ borderRadius: 6 }}>
                      {event.day}
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a705c]">{event.time}</p>
                    <p className="mt-1 text-sm font-semibold text-[#2f261f]">{event.title}</p>
                    <p className="mt-1 text-sm text-[#5b4b3f]">{event.place}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div {...sampleSectionMotion} className="space-y-4">
            <div className="premium-card p-5 sm:p-6">
              <SectionTitle kicker="Guest flow" title="Designed to answer questions before guests ask" />
              <div className="mt-4 grid gap-3">
                {[
                  { icon: CalendarDays, title: 'Timeline page', body: 'Exact sequence, locations, and notes for each event.' },
                  { icon: Plane, title: 'Travel page', body: 'Room blocks, transfers, and local guidance for out-of-town guests.' },
                  { icon: Gift, title: 'Registry page', body: 'Experiences and gifts with clear availability status.' },
                  { icon: Camera, title: 'Gallery page', body: 'Visual story and inspiration moments in a lightbox gallery.' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-3 border border-[#d5c3ac]/70 bg-white/78 p-4" style={{ borderRadius: 8 }}>
                      <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center border border-[#d5c3ac]/70 bg-white" style={{ borderRadius: 8 }}>
                        <Icon className="h-4 w-4 text-[#8a705c]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#2f261f]">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-[#5b4b3f]">{item.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="premium-card p-5 sm:p-6">
              <SectionTitle kicker="Personal note" title="A warmer experience for guests" />
              <p className="mt-4 text-sm leading-7 text-[#5b4b3f]">
                “We wanted a page that felt calm and personal, but also practical for family traveling from different cities. This format gave us the beauty of an invitation and the clarity of a full guest guide.”
              </p>
              <p className="mt-3 text-sm font-semibold text-[#2f261f]">Lina & Viktor</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to={toPath('travel')} className="sample-btn sample-btn-secondary">Open travel page</Link>
                <Link to={toPath('registry')} className="sample-btn sample-btn-secondary">Open registry page</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

const PremiumTimelinePage: React.FC = () => {
  const days = [
    {
      day: 'Friday · Arrival & Welcome',
      image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80',
      events: [
        ['15:00', 'Check-in at room block hotels', 'Early arrivals can use concierge WhatsApp for transfer support.'],
        ['18:30', 'Guest shuttle to rooftop', 'Pickup from Hotel Garden and City House lobbies.'],
        ['20:00', 'Welcome cocktails', 'Signature drinks, live saxophone, and light bites.'],
      ],
    },
    {
      day: 'Saturday · Ceremony Day',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      events: [
        ['15:45', 'Shuttle departs for estate', 'Please be in the lobby 10 minutes early.'],
        ['17:00', 'Ceremony', 'Garden ceremony begins promptly.'],
        ['18:15', 'Cocktail hour', 'Terrace service while photos are taken.'],
        ['19:15', 'Dinner & reception', 'Seated dinner, speeches, and dancing.'],
      ],
    },
    {
      day: 'Sunday · Farewell',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
      events: [
        ['11:30', 'Brunch gathering', 'Optional brunch at the terrace.'],
        ['13:15', 'Airport transfer windows begin', 'Shared vans depart every 45 minutes.'],
      ],
    },
  ];

  return (
    <section className="px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div {...sampleSectionMotion} className="premium-card p-5 sm:p-6">
          <SectionTitle kicker="Timeline" title="A full weekend schedule guests can actually use" body="Premium supports multiple events and timing notes so guests know where to be, when to leave, and what is optional." />
          <div className="mt-5 space-y-5">
            {days.map((day) => (
              <div key={day.day} className="overflow-hidden border border-[#d5c3ac]/70 bg-white/76" style={{ borderRadius: 10 }}>
                <div className="relative h-36">
                  <img src={day.image} alt={day.day} onError={onSampleImageError} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
                  <p className="absolute bottom-4 left-4 sample-font-classic text-2xl text-white">{day.day}</p>
                </div>
                <div className="space-y-3 p-4 sm:p-5">
                  {day.events.map(([time, title, note]) => (
                    <div key={`${day.day}-${time}-${title}`} className="grid gap-2 border border-[#e2d4c4]/70 bg-white/88 p-3 sm:grid-cols-[auto_1fr] sm:items-start" style={{ borderRadius: 8 }}>
                      <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8a705c] sm:min-w-[120px]">
                        <Clock3 className="h-3.5 w-3.5" />
                        {time}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#2f261f]">{title}</p>
                        <p className="mt-1 text-sm leading-6 text-[#5b4b3f]">{note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...sampleSectionMotion} className="space-y-4">
          <div className="premium-card p-5 sm:p-6">
            <SectionTitle kicker="Day-of guidance" title="Quick reminders" />
            <div className="mt-4 grid gap-3">
              {[
                ['Dress code', 'Elegant evening attire. Garden paths are stone, so block heels are recommended.'],
                ['Children', 'Family-friendly welcome and brunch. Ceremony/reception seating reserved by household.'],
                ['Transport', 'Use the Travel page for hotel shuttle times and airport windows.'],
              ].map(([label, body]) => (
                <div key={label} className="border border-[#d5c3ac]/70 bg-white/78 p-4" style={{ borderRadius: 8 }}>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a705c]">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-[#5b4b3f]">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="premium-card p-5 sm:p-6">
            <SectionTitle kicker="Why this matters" title="Timeline pages reduce guest confusion" />
            <p className="mt-4 text-sm leading-7 text-[#5b4b3f]">
              Instead of sending details across chats, guests can return to one source for updated timing, optional events, and transport notes.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PremiumTravelPage: React.FC = () => {
  const hotels = [
    ['Hotel Garden', 'Primary room block', 'Central location · shuttle pickup', 'From €94/night'],
    ['City House', 'Boutique option', 'Walkable old town area', 'From €88/night'],
    ['Vista Suites', 'Upgrade option', 'Late checkout available on request', 'From €140/night'],
  ];

  return (
    <section className="px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[1fr_1fr]">
        <motion.div {...sampleSectionMotion} className="premium-card overflow-hidden">
          <div className="relative h-60 sm:h-72">
            <img src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=1600&q=80" alt="Travel details illustration" onError={onSampleImageError} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e1813]/65 via-[#1e1813]/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">Travel page</p>
              <p className="sample-font-classic mt-2 text-3xl sm:text-4xl">Stay, arrive, move easily</p>
            </div>
          </div>
          <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
            <div className="border border-[#d5c3ac]/70 bg-white/78 p-4" style={{ borderRadius: 8 }}>
              <div className="flex items-center gap-2 text-[#7c5c3b]"><Plane className="h-4 w-4" /><span className="text-sm font-semibold">Airport transfers</span></div>
              <p className="mt-2 text-sm leading-6 text-[#5b4b3f]">Shared vans on Thursday and Friday. Guests select transfer needs in the RSVP page.</p>
            </div>
            <div className="border border-[#d5c3ac]/70 bg-white/78 p-4" style={{ borderRadius: 8 }}>
              <div className="flex items-center gap-2 text-[#7c5c3b]"><MapPin className="h-4 w-4" /><span className="text-sm font-semibold">Venue movement</span></div>
              <p className="mt-2 text-sm leading-6 text-[#5b4b3f]">Shuttle pickup points are listed per event so guests never guess where to wait.</p>
            </div>
          </div>
        </motion.div>

        <motion.div {...sampleSectionMotion} className="premium-card p-5 sm:p-6">
          <SectionTitle kicker="Hotel blocks" title="Accommodation options" body="Premium supports room-block notes, booking codes, and travel guidance in one place." />
          <div className="mt-5 space-y-3">
            {hotels.map(([name, type, notes, price]) => (
              <div key={name} className="grid gap-2 border border-[#d5c3ac]/70 bg-white/80 p-4 sm:grid-cols-[1fr_auto] sm:items-center" style={{ borderRadius: 8 }}>
                <div>
                  <p className="text-sm font-semibold text-[#2f261f]">{name}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.13em] text-[#8a705c]">{type}</p>
                  <p className="mt-1 text-sm text-[#5b4b3f]">{notes}</p>
                </div>
                <p className="text-sm font-semibold text-[#8a5b36]">{price}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 border border-[#d5c3ac]/70 bg-white/78 p-4" style={{ borderRadius: 8 }}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a705c]">Booking code</p>
            <p className="mt-1 text-sm font-semibold text-[#2f261f]">LINA-VIKTOR-SEP</p>
            <p className="mt-2 text-sm leading-6 text-[#5b4b3f]">Guests can book directly through the hotel links or request assistance in the RSVP form.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PremiumRegistryPage: React.FC = () => {
  const registrySections = [
    {
      title: 'Experiences',
      items: [
        ['Honeymoon dinner in Tuscany', '$120', 'Available'],
        ['Wine tasting day', '$90', 'Available'],
        ['Train tickets across Florence', '$65', 'Reserved'],
      ],
    },
    {
      title: 'Home gifts',
      items: [
        ['Handmade dinner set', '$180', 'Available'],
        ['Espresso machine', '$260', 'Reserved'],
        ['Linen bedding set', '$140', 'Available'],
      ],
    },
  ];

  return (
    <section className="px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[1.04fr_0.96fr]">
        <motion.div {...sampleSectionMotion} className="premium-card p-5 sm:p-6">
          <SectionTitle kicker="Registry" title="Gift and experience contributions" body="Guests can choose meaningful gifts or contribute to experiences. Premium supports item status, categories, and notes." />
          <div className="mt-5 space-y-5">
            {registrySections.map((section) => (
              <div key={section.title} className="border border-[#d5c3ac]/70 bg-white/78 p-4" style={{ borderRadius: 10 }}>
                <p className="sample-font-classic text-2xl text-[#2f261f]">{section.title}</p>
                <div className="mt-3 space-y-2">
                  {section.items.map(([item, amount, status]) => (
                    <div key={item} className="flex flex-wrap items-center justify-between gap-3 border border-[#e2d4c4]/70 bg-white/85 px-3 py-3" style={{ borderRadius: 8 }}>
                      <div>
                        <p className="text-sm font-semibold text-[#2f261f]">{item}</p>
                        <p className="text-xs text-[#7d6a5a]">{amount}</p>
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
          <div className="premium-card p-5 sm:p-6">
            <SectionTitle kicker="Thank you note" title="Personal and tasteful" />
            <p className="mt-4 text-sm leading-7 text-[#5b4b3f]">
              Your presence means everything to us. If you would like to gift something, we would love support toward our honeymoon and a few home items we will enjoy for years.
            </p>
          </div>
          <div className="premium-card p-5 sm:p-6">
            <SectionTitle kicker="Questions" title="Registry FAQs" />
            <div className="mt-4">
              <FaqAccordion panelClass="premium-card !rounded-[10px] !border-[#d5c3ac]/70 !bg-white/78" items={premiumFaqs} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PremiumGalleryPage: React.FC<{
  lightbox: LightboxState;
  setLightbox: React.Dispatch<React.SetStateAction<LightboxState>>;
}> = ({ lightbox, setLightbox }) => (
  <>
    <SampleLightbox
      state={lightbox}
      onClose={() => setLightbox(null)}
      onNext={() => setLightbox((prev) => (prev ? { ...prev, index: (prev.index + 1) % prev.items.length } : prev))}
      onPrev={() => setLightbox((prev) => (prev ? { ...prev, index: (prev.index - 1 + prev.items.length) % prev.items.length } : prev))}
    />
    <section className="px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div {...sampleSectionMotion} className="premium-card p-5 sm:p-6">
          <SectionTitle kicker="Gallery" title="Weekend mood, portraits, and celebration moments" body="Premium supports a richer image presentation so the page feels personal before and after the wedding." />
          <div className="mt-5">
            <GalleryGrid items={premiumGallery} onOpen={(items, index) => setLightbox({ items, index })} cardClass="premium-card h-64 rounded-[12px] !p-0" />
          </div>
        </motion.div>
      </div>
    </section>
  </>
);

const PremiumRsvpPage: React.FC = () => (
  <section className="px-4 py-5 sm:px-6 lg:px-8">
    <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[0.96fr_1.04fr]">
      <motion.div {...sampleSectionMotion} className="premium-card p-5 sm:p-6">
        <SectionTitle kicker="RSVP page" title="Weekend attendance and guest details" body="Premium RSVP collects more useful planning information while staying simple for guests." />
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            { icon: Users, title: 'Party size', body: 'Household and plus-one planning support' },
            { icon: CalendarDays, title: 'Event selection', body: 'Wedding day only or full weekend attendance' },
            { icon: Hotel, title: 'Room block request', body: 'Hotel assistance can be requested directly in RSVP' },
            { icon: Sparkles, title: 'Meal preferences', body: 'Dietary notes and service preferences before the event' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="border border-[#d5c3ac]/70 bg-white/78 p-4" style={{ borderRadius: 8 }}>
                <Icon className="h-4 w-4 text-[#8a705c]" />
                <p className="mt-2 text-sm font-semibold text-[#2f261f]">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-[#5b4b3f]">{item.body}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div {...sampleSectionMotion}>
        <DemoRsvpForm
          panelClass="premium-card"
          submitLabel="Send weekend RSVP"
          extraFields={
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sample-label" htmlFor="premium-events">Events attending</label>
                  <select id="premium-events" className="sample-select" defaultValue="all">
                    <option value="all">All weekend events</option>
                    <option value="wedding-only">Wedding day only</option>
                    <option value="welcome-wedding">Welcome + wedding day</option>
                  </select>
                </div>
                <div>
                  <label className="sample-label" htmlFor="premium-meal">Meal preference</label>
                  <select id="premium-meal" className="sample-select" defaultValue="standard">
                    <option value="standard">Standard</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="gluten-free">Gluten free</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sample-label" htmlFor="premium-hotel">Hotel needed</label>
                  <select id="premium-hotel" className="sample-select" defaultValue="yes">
                    <option value="yes">Yes, reserve from room block</option>
                    <option value="no">No, I will arrange it</option>
                  </select>
                </div>
                <div>
                  <label className="sample-label" htmlFor="premium-arrival">Arrival date</label>
                  <input id="premium-arrival" type="date" className="sample-input" defaultValue="2026-09-11" />
                </div>
              </div>
            </>
          }
        />
      </motion.div>
    </div>
  </section>
);

export const PremiumSampleSite: React.FC<{ page?: string }> = ({ page }) => {
  const { pathFor } = useI18n();
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const activePage = normalizePremiumPage(page);

  const pagePath = (next: PremiumPageKey) => pathFor(next === 'overview' ? '/samples/premium' : `/samples/premium/${next}`);

  return (
    <div className="sample-site-root premium-page sample-font-modern text-[#2f261f]">
      <PremiumHero page={activePage} toPath={pagePath} />

      {activePage === 'overview' && <PremiumOverviewPage toPath={pagePath} />}
      {activePage === 'timeline' && <PremiumTimelinePage />}
      {activePage === 'travel' && <PremiumTravelPage />}
      {activePage === 'registry' && <PremiumRegistryPage />}
      {activePage === 'gallery' && <PremiumGalleryPage lightbox={lightbox} setLightbox={setLightbox} />}
      {activePage === 'rsvp' && <PremiumRsvpPage />}

      <SampleFooter
        title="WedMKD sample controls"
        subtitle="These controls are outside the client wedding page. This sample opens as a complete multi-page wedding weekend website."
        toneClass="text-[#2f261f]"
      />
    </div>
  );
};
