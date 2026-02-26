export type SampleTierId = 'basic' | 'plus' | 'premium' | 'platinum';

export interface SampleTierMeta {
  id: SampleTierId;
  name: string;
  label: string;
  route: string;
  priceLabel: string;
  accent: string;
  heroImage: string;
  previewImages: string[];
  shortDescription: string;
  summaryLine: string;
  cumulativeFeatures: string[];
}

export const SAMPLE_TIERS: SampleTierMeta[] = [
  {
    id: 'basic',
    name: 'Basic',
    label: 'Essential Invite Page',
    route: '/samples/basic',
    priceLabel: '$29',
    accent: 'from-sky-400 to-cyan-500',
    heroImage: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
    ],
    shortDescription: 'A beautiful invitation page with date, venue, RSVP, and a clean guest-first flow.',
    summaryLine: 'A simple wedding page that invites guests beautifully.',
    cumulativeFeatures: [
      'Beautiful hero invitation page',
      'Event date, time, and venue section',
      'Simple RSVP form',
      'Dress code and FAQ basics',
    ],
  },
  {
    id: 'plus',
    name: 'Plus',
    label: 'Interactive Wedding Story',
    route: '/samples/plus',
    priceLabel: '$79',
    accent: 'from-rose-400 to-pink-600',
    heroImage: 'https://raw.githubusercontent.com/todorovskib/css-exercises/refs/heads/main/irinanadrej.jpg',
    previewImages: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    ],
    shortDescription: 'Everything in Basic, plus an animated invite opening, richer sections, gallery, and a more personal wedding experience.',
    summaryLine: 'Basic + animated invitation opening + richer guest experience.',
    cumulativeFeatures: [
      'Everything in Basic',
      'Animated envelope intro',
      'Story-led couple landing page',
      'Gallery and location sections',
      'Enhanced RSVP with guest message',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    label: 'Wedding Weekend Experience',
    route: '/samples/premium',
    priceLabel: '$199',
    accent: 'from-amber-400 to-orange-500',
    heroImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80',
    ],
    shortDescription: 'Plus + travel details, timeline, registry, FAQ, and a polished full wedding-weekend guest website.',
    summaryLine: 'Plus + timeline, travel, registry, and full wedding-weekend presentation.',
    cumulativeFeatures: [
      'Everything in Plus',
      'Weekend schedule / timeline',
      'Travel and accommodation details',
      'Gift registry section',
      'Gallery with modal viewing',
      'Expanded FAQ and guest guidance',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    label: 'Signature Concierge Wedding Site',
    route: '/samples/platinum',
    priceLabel: '$399',
    accent: 'from-fuchsia-500 to-violet-600',
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=80',
    ],
    shortDescription: 'Premium + concierge-style guest communication, seating preview, multiple events, private notes, and luxury storytelling design.',
    summaryLine: 'Premium + concierge guest flow, seating, and signature multi-event experience.',
    cumulativeFeatures: [
      'Everything in Premium',
      'Multi-event weekend pages',
      'Seating and table preview',
      'Concierge contact / guest support',
      'Private notes and custom RSVP questions',
      'Signature luxury visual direction',
    ],
  },
];

export const SAMPLE_TIER_BY_ID = SAMPLE_TIERS.reduce<Record<SampleTierId, SampleTierMeta>>((acc, tier) => {
  acc[tier.id] = tier;
  return acc;
}, {} as Record<SampleTierId, SampleTierMeta>);
