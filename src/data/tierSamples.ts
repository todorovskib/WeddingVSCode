export type SampleTierKey = 'basic' | 'pro' | 'premium';

export type SampleTabId =
  | 'home'
  | 'details'
  | 'rsvp'
  | 'checklist'
  | 'timeline'
  | 'budget'
  | 'gallery'
  | 'faq'
  | 'registry'
  | 'seating';

export interface TierSampleConfig {
  key: SampleTierKey;
  name: string;
  label: string;
  priceLabel: string;
  route: string;
  badge: string;
  heroImage: string;
  collageImages: string[];
  couple: {
    names: string;
    date: string;
    time: string;
    venue: string;
    city: string;
    story: string;
  };
  gradient: string;
  tabs: SampleTabId[];
  highlights: string[];
  checklist: Array<{ label: string; done: boolean }>;
  timeline: Array<{ time: string; title: string; description: string }>;
  budget: Array<{ category: string; budgeted: number; actual: number }>;
  faq: Array<{ q: string; a: string }>;
  registry: Array<{ name: string; price: string; status: 'available' | 'reserved' }>;
  seating?: Array<{ table: string; guests: string[] }>;
}

const imageSet = [
  'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
  'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
  'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
  'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
  'https://images.pexels.com/photos/264787/pexels-photo-264787.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
];

export const tierSamples: Record<SampleTierKey, TierSampleConfig> = {
  basic: {
    key: 'basic',
    name: 'Basic',
    label: 'Basic Sample Website',
    priceLabel: '$29',
    route: '/samples/basic',
    badge: 'Simple wedding website essentials',
    heroImage: imageSet[1],
    collageImages: [imageSet[1], imageSet[3], imageSet[4]],
    couple: {
      names: 'Maria & Stefan',
      date: 'June 15, 2027',
      time: '18:00',
      venue: 'Hotel Aleksandar Palace',
      city: 'Skopje',
      story:
        'A warm, minimal wedding website focused on the essentials: date, venue, RSVP, and a few planning updates for guests.',
    },
    gradient: 'from-sky-400 via-cyan-400 to-blue-500',
    tabs: ['home', 'details', 'rsvp', 'checklist'],
    highlights: ['RSVP form', 'Wedding details', 'Checklist summary', 'Simple hero page'],
    checklist: [
      { label: 'Reserve venue', done: true },
      { label: 'Book photographer', done: true },
      { label: 'Finalize guest list', done: false },
      { label: 'Send invitations', done: false },
      { label: 'Confirm music set', done: false },
    ],
    timeline: [
      { time: '18:00', title: 'Ceremony', description: 'Ceremony begins at the church.' },
      { time: '20:00', title: 'Reception', description: 'Dinner and celebration start.' },
    ],
    budget: [
      { category: 'Venue', budgeted: 2500, actual: 2400 },
      { category: 'Photo', budgeted: 900, actual: 900 },
    ],
    faq: [
      { q: 'What should I wear?', a: 'Formal attire is recommended.' },
      { q: 'Can I bring a plus one?', a: 'Please follow the invitation details for your seat count.' },
    ],
    registry: [
      { name: 'Coffee machine', price: '$180', status: 'available' },
      { name: 'Dinner set', price: '$120', status: 'reserved' },
    ],
  },
  pro: {
    key: 'pro',
    name: 'Pro',
    label: 'Pro Sample Website',
    priceLabel: '$79',
    route: '/samples/pro',
    badge: 'Planning tools plus richer guest experience',
    heroImage: imageSet[2],
    collageImages: [imageSet[2], imageSet[0], imageSet[3], imageSet[4]],
    couple: {
      names: 'Milica & Aleksandar',
      date: 'September 10, 2027',
      time: '16:00',
      venue: 'Villa Vodno',
      city: 'Skopje',
      story:
        'A polished website for medium and larger weddings with timeline, budget, gallery, and advanced RSVP details.',
    },
    gradient: 'from-rose-400 via-pink-500 to-fuchsia-600',
    tabs: ['home', 'details', 'rsvp', 'timeline', 'budget', 'gallery', 'faq'],
    highlights: ['Timeline', 'Budget tracker', 'Gallery', 'Dietary RSVP notes', 'FAQ'],
    checklist: [
      { label: 'Finalize catering menu', done: true },
      { label: 'Approve floral mockups', done: false },
      { label: 'Send hotel details', done: false },
    ],
    timeline: [
      { time: '15:00', title: 'Guest arrival', description: 'Welcome drinks in the garden.' },
      { time: '16:00', title: 'Ceremony', description: 'Outdoor ceremony begins.' },
      { time: '18:00', title: 'Cocktail hour', description: 'Music and photos with guests.' },
      { time: '20:00', title: 'Dinner & party', description: 'Dinner service and dancing.' },
    ],
    budget: [
      { category: 'Venue', budgeted: 6000, actual: 5850 },
      { category: 'Catering', budgeted: 8500, actual: 7900 },
      { category: 'Photography', budgeted: 2200, actual: 2100 },
      { category: 'Decor', budgeted: 1800, actual: 1650 },
    ],
    faq: [
      { q: 'Is parking available?', a: 'Yes, valet and self-parking are both available at the venue entrance.' },
      { q: 'Do you have hotel suggestions?', a: 'We’ve reserved rates at two nearby hotels; see the details tab for links.' },
      { q: 'Can I submit dietary requirements?', a: 'Yes, use the RSVP form and include allergies or preferences.' },
    ],
    registry: [
      { name: 'Travel fund', price: '$500', status: 'available' },
      { name: 'Stand mixer', price: '$320', status: 'available' },
      { name: 'Cookware set', price: '$240', status: 'reserved' },
    ],
  },
  premium: {
    key: 'premium',
    name: 'Premium',
    label: 'Premium Sample Website',
    priceLabel: '$199',
    route: '/samples/premium',
    badge: 'Full guest experience with seating and registry',
    heroImage: imageSet[0],
    collageImages: [imageSet[0], imageSet[1], imageSet[2], imageSet[3], imageSet[4]],
    couple: {
      names: 'Elena & Dimitar',
      date: 'October 5, 2027',
      time: '15:30',
      venue: 'Grand Hotel',
      city: 'Ohrid',
      story:
        'A premium wedding website demo with seating plan previews, registry, gallery, and more polished guest communication sections.',
    },
    gradient: 'from-amber-400 via-orange-500 to-rose-500',
    tabs: ['home', 'details', 'rsvp', 'seating', 'gallery', 'registry', 'faq', 'checklist'],
    highlights: ['Registry', 'Seating plan preview', 'Expanded gallery', 'FAQ', 'Premium visual style'],
    checklist: [
      { label: 'Seat guests by table', done: true },
      { label: 'Finalize registry links', done: true },
      { label: 'Approve website hero photos', done: true },
      { label: 'Confirm ceremony script', done: false },
      { label: 'Send final reminder email', done: false },
    ],
    timeline: [
      { time: '14:30', title: 'Welcome lounge', description: 'Guests arrive and check in.' },
      { time: '15:30', title: 'Ceremony', description: 'Ceremony begins on the terrace.' },
      { time: '17:00', title: 'Portraits & aperitif', description: 'Couple photos and drinks.' },
      { time: '19:00', title: 'Dinner service', description: 'Multi-course dinner reception.' },
      { time: '21:30', title: 'Music & dancing', description: 'Live band and party set.' },
    ],
    budget: [
      { category: 'Venue', budgeted: 12000, actual: 11800 },
      { category: 'Catering', budgeted: 14000, actual: 13600 },
      { category: 'Photo/Video', budgeted: 4500, actual: 4400 },
      { category: 'Florals', budgeted: 3200, actual: 3000 },
      { category: 'Entertainment', budgeted: 2800, actual: 2750 },
    ],
    faq: [
      { q: 'What airport should we fly into?', a: 'Skopje International Airport is the easiest option; Ohrid is available seasonally.' },
      { q: 'Will there be transportation?', a: 'Yes, hotel shuttles will run before and after the ceremony and reception.' },
      { q: 'Can I view my seating table in advance?', a: 'Yes, the seating tab on this demo shows how that experience looks.' },
      { q: 'Are children invited?', a: 'Please refer to your invitation; some family tables include children seating.' },
    ],
    registry: [
      { name: 'Honeymoon contribution', price: '$100+', status: 'available' },
      { name: 'Luxury bedding set', price: '$430', status: 'reserved' },
      { name: 'Dining table fund', price: '$800', status: 'available' },
      { name: 'Wine glasses set', price: '$95', status: 'reserved' },
    ],
    seating: [
      { table: 'Table 1', guests: ['Kum & Kuma', 'Parents', 'Close Family', 'Witnesses'] },
      { table: 'Table 2', guests: ['University Friends', 'Best Friends', 'Plus Ones'] },
      { table: 'Table 3', guests: ['Work Colleagues', 'Family Friends', 'Guests'] },
    ],
  },
};

export const tierSampleList = Object.values(tierSamples);

