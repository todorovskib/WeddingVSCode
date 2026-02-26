import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';

type LocalizedText = {
  en: string;
  mk: string;
};

type PartnerPreview = {
  name: string;
  note: LocalizedText;
  image: string;
};

type CollaborationSection = {
  id: string;
  navLabel: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  toneClass: string;
  chips: LocalizedText[];
  partners: PartnerPreview[];
  ctaHref?: string;
  ctaLabel?: LocalizedText;
};

const heroImage =
  'https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1100&fit=crop';

const sections: CollaborationSection[] = [
  {
    id: 'venues',
    navLabel: { en: 'Venues & Villas', mk: 'Ресторани и вили' },
    title: { en: 'Exclusive restaurants and villas', mk: 'Ексклузивни ресторани и вили' },
    description: {
      en: 'Curated venues for intimate dinners and large celebrations, chosen for atmosphere, service, and photo-ready interiors.',
      mk: 'Курирани локации за интимни вечери и големи прослави, избрани по амбиент, услуга и фотогеничен ентериер.',
    },
    image:
      'https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&fit=crop',
    imageAlt: { en: 'Elegant wedding venue', mk: 'Елегантна свадбена локација' },
    toneClass: 'from-rose-100/65 via-white/30 to-amber-100/55',
    chips: [
      { en: 'Indoor & garden options', mk: 'Внатрешни и градинарски опции' },
      { en: 'Capacity planning', mk: 'Планирање на капацитет' },
      { en: 'Photo-friendly spaces', mk: 'Фотогенични простори' },
    ],
    partners: [
      {
        name: 'Villa Aurora',
        note: { en: 'Garden receptions and sunset ceremonies', mk: 'Градинарски приеми и зајдисонце церемонии' },
        image:
          'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Grand Terrace',
        note: { en: 'Large-capacity ballroom setup', mk: 'Балска поставка за голем број гости' },
        image:
          'https://images.pexels.com/photos/265920/pexels-photo-265920.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Lakeview House',
        note: { en: 'Weekend wedding villa experience', mk: 'Вила за викенд свадбено искуство' },
        image:
          'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
    ],
    ctaHref: '/contact',
    ctaLabel: { en: 'Ask about venues', mk: 'Прашајте за локации' },
  },
  {
    id: 'bands',
    navLabel: { en: 'Music Bands', mk: 'Музички бендови' },
    title: { en: 'Music bands and live performers', mk: 'Музички бендови и настапувачи' },
    description: {
      en: 'From elegant dinner sets to all-night party bands, present music options in a cleaner curated selection.',
      mk: 'Од елегантни dinner сетови до целоноќни party бендови, музичките опции се прикажани во почиста курирана селекција.',
    },
    image:
      'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&fit=crop',
    imageAlt: { en: 'Wedding live band stage', mk: 'Сцена со свадбен бенд' },
    toneClass: 'from-violet-100/55 via-white/25 to-sky-100/55',
    chips: [
      { en: 'Band style matching', mk: 'Усогласување на стил на бенд' },
      { en: 'Ceremony + party sets', mk: 'Сетови за церемонија + прослава' },
      { en: 'Sound coordination', mk: 'Координација на озвучување' },
    ],
    partners: [
      {
        name: 'Velvet Rhythm',
        note: { en: 'Modern wedding classics and pop', mk: 'Модерни свадбени класици и поп' },
        image:
          'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Balkan Echo',
        note: { en: 'High-energy celebration set', mk: 'Енергичен сет за прослава' },
        image:
          'https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Strings & Candlelight',
        note: { en: 'Ceremony duo / cocktail hour', mk: 'Дуо за церемонија / коктел час' },
        image:
          'https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
    ],
    ctaHref: '/contact',
    ctaLabel: { en: 'Ask about music', mk: 'Прашајте за музика' },
  },
  {
    id: 'photo-video',
    navLabel: { en: 'Photo & Video', mk: 'Фото и видео' },
    title: { en: 'Photo studios and video teams', mk: 'Фото студија и видео тимови' },
    description: {
      en: 'Highlight a smaller set of trusted teams with visual style cues so couples can compare quickly without information overload.',
      mk: 'Истакнете помала листа на доверливи тимови со визуелен стил, за паровите брзо да споредат без преоптоварување со информации.',
    },
    image:
      'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&fit=crop',
    imageAlt: { en: 'Wedding photographer capturing couple', mk: 'Свадбен фотограф го фотографира парот' },
    toneClass: 'from-stone-100/60 via-white/25 to-rose-100/55',
    chips: [
      { en: 'Editorial style', mk: 'Едиторијален стил' },
      { en: 'Documentary coverage', mk: 'Документарно покривање' },
      { en: 'Short films & reels', mk: 'Кратки филмови и reels' },
    ],
    partners: [
      {
        name: 'Frame & Film Atelier',
        note: { en: 'Editorial portrait-led coverage', mk: 'Едиторијално покривање со портретен фокус' },
        image:
          'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Golden Hour Studio',
        note: { en: 'Natural light and cinematic reels', mk: 'Природна светлина и кинематски reels' },
        image:
          'https://images.pexels.com/photos/2072181/pexels-photo-2072181.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Storyline Wedding Video',
        note: { en: 'Feature film-style wedding recap', mk: 'Свадбен recap во стил на краток филм' },
        image:
          'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
    ],
    ctaHref: '/contact',
    ctaLabel: { en: 'Ask about photo/video', mk: 'Прашајте за фото/видео' },
  },
  {
    id: 'decor-catering',
    navLabel: { en: 'Decor & Catering', mk: 'Декор и кетеринг' },
    title: { en: 'Decorations, catering, and event details', mk: 'Декорации, кетеринг и детална поставка' },
    description: {
      en: 'A smoother presentation for floral design, catering styling, dessert tables, and ceremonial add-ons.',
      mk: 'Помазна презентација за флорален дизајн, кетеринг поставка, десерт маси и церемонијални додатоци.',
    },
    image:
      'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&fit=crop',
    imageAlt: { en: 'Decorated wedding reception table', mk: 'Декорирана свадбена маса' },
    toneClass: 'from-emerald-100/55 via-white/25 to-amber-100/60',
    chips: [
      { en: 'Floral concepts', mk: 'Флорални концепти' },
      { en: 'Reception styling', mk: 'Стилизација на прием' },
      { en: 'Dessert tables', mk: 'Десерт маси' },
    ],
    partners: [
      {
        name: 'Flora Atelier MK',
        note: { en: 'Ceremony arches and tablescapes', mk: 'Церемонијални арки и tablescape решенија' },
        image:
          'https://images.pexels.com/photos/1128782/pexels-photo-1128782.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Signature Catering',
        note: { en: 'Tasting-led menus and service teams', mk: 'Менија со дегустација и сервисни тимови' },
        image:
          'https://images.pexels.com/photos/5638732/pexels-photo-5638732.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Sweet Table House',
        note: { en: 'Dessert styling and cake table design', mk: 'Стилизација на десерти и cake table дизајн' },
        image:
          'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
    ],
    ctaHref: '/services',
    ctaLabel: { en: 'See planning services', mk: 'Види планерски услуги' },
  },
  {
    id: 'invitations',
    navLabel: { en: 'Invitations', mk: 'Покани' },
    title: { en: 'Invitations and wedding details', mk: 'Покани и свадбени детали' },
    description: {
      en: 'This is your added category: printed and digital invitations, menus, place cards, signage, and matching wedding stationery.',
      mk: 'Ова е вашата додадена категорија: печатени и дигитални покани, менија, картички за маса, signage и усогласен свадбен stationery.',
    },
    image:
      'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&fit=crop',
    imageAlt: { en: 'Wedding invitation flat lay', mk: 'Свадбена покана во flat lay стил' },
    toneClass: 'from-rose-100/65 via-white/30 to-fuchsia-100/55',
    chips: [
      { en: 'Printed suites', mk: 'Печатени сетови' },
      { en: 'Digital invites', mk: 'Дигитални покани' },
      { en: 'Menus & signage', mk: 'Менија и signage' },
    ],
    partners: [
      {
        name: 'Paper House MK',
        note: { en: 'Modern calligraphy invitation suites', mk: 'Модерни сетови со калиграфија' },
        image:
          'https://images.pexels.com/photos/842949/pexels-photo-842949.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Studio Ink & Gold',
        note: { en: 'Foil details and premium print finishes', mk: 'Фолија детали и премиум печат' },
        image:
          'https://images.pexels.com/photos/6473957/pexels-photo-6473957.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'WedMKD Digital Invite',
        note: { en: 'Guest-ready pages + RSVP links', mk: 'Гостински страници + RSVP линкови' },
        image:
          'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
    ],
    ctaHref: '/products',
    ctaLabel: { en: 'Open products & invites', mk: 'Отвори производи и покани' },
  },
  {
    id: 'fashion',
    navLabel: { en: 'Dresses & Suits', mk: 'Венчаници и одела' },
    title: { en: 'Bridal dresses and groom suits', mk: 'Венчаници и машки одела' },
    description: {
      en: 'Present fashion partners with a cleaner style-first format: bridal studios, tailoring, fittings, and accessory recommendations.',
      mk: 'Претставете модни партнери во почист формат фокусиран на стил: bridal студија, tailoring, проби и препораки за додатоци.',
    },
    image:
      'https://images.pexels.com/photos/265920/pexels-photo-265920.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&fit=crop',
    imageAlt: { en: 'Bride and groom fashion styling', mk: 'Стилизација на невеста и младоженец' },
    toneClass: 'from-amber-100/55 via-white/25 to-stone-100/60',
    chips: [
      { en: 'Bridal salons', mk: 'Bridal салони' },
      { en: 'Suits & tailoring', mk: 'Одела и tailoring' },
      { en: 'Accessory styling', mk: 'Стилизација на додатоци' },
    ],
    partners: [
      {
        name: 'Maison Bride',
        note: { en: 'Classic and modern bridal silhouettes', mk: 'Класични и модерни bridal силуети' },
        image:
          'https://images.pexels.com/photos/3419692/pexels-photo-3419692.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Tux Atelier',
        note: { en: 'Tailored suits for groom and kums', mk: 'Tailored одела за младоженец и кумови' },
        image:
          'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Veil & Detail Studio',
        note: { en: 'Veils, jewelry, and finishing touches', mk: 'Превези, накит и завршни детали' },
        image:
          'https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
    ],
    ctaHref: '/contact',
    ctaLabel: { en: 'Ask about fashion partners', mk: 'Прашајте за модни партнери' },
  },
  {
    id: 'oldtimers',
    navLabel: { en: 'Oldtimers', mk: 'Олд тајмери' },
    title: { en: 'Oldtimer cars and special transport', mk: 'Олд тајмери и специјален превоз' },
    description: {
      en: 'A compact, visual-first showcase for classic cars and photo-arrival moments that adds charm without clutter.',
      mk: 'Компактен визуелен приказ за класични автомобили и photo-arrival моменти што додава шарм без неред.',
    },
    image:
      'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&fit=crop',
    imageAlt: { en: 'Classic wedding car', mk: 'Класичен автомобил за свадба' },
    toneClass: 'from-sky-100/55 via-white/25 to-stone-100/60',
    chips: [
      { en: 'Retro arrivals', mk: 'Ретро пристигнувања' },
      { en: 'Photo route styling', mk: 'Стилизација на фото рута' },
      { en: 'City / villa transfers', mk: 'Градски / вила трансфери' },
    ],
    partners: [
      {
        name: 'White Beetle Classic',
        note: { en: 'Soft retro look for romantic entrances', mk: 'Нежен ретро изглед за романтични влезови' },
        image:
          'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Oldtimer MK',
        note: { en: 'Timeless black-and-cream fleet', mk: 'Безвременска црно-крем флота' },
        image:
          'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Fiat Love Ride',
        note: { en: 'Fun compact classic for photo sessions', mk: 'Забавен компактен класик за фото сесии' },
        image:
          'https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
    ],
    ctaHref: '/contact',
    ctaLabel: { en: 'Ask about transport', mk: 'Прашајте за превоз' },
  },
];

function pick(language: 'en' | 'mk', text: LocalizedText): string {
  return language === 'mk' ? text.mk : text.en;
}

export const Collaborations: React.FC = () => {
  const { language, t } = useI18n();
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? 'venues');

  const localizedSections = useMemo(
    () =>
      sections.map((section) => ({
        ...section,
        label: pick(language, section.navLabel),
        titleText: pick(language, section.title),
        descriptionText: pick(language, section.description),
        imageAltText: pick(language, section.imageAlt),
        chipsText: section.chips.map((chip) => pick(language, chip)),
        partnersText: section.partners.map((partner) => ({
          ...partner,
          noteText: pick(language, partner.note),
        })),
        ctaLabelText: section.ctaLabel ? pick(language, section.ctaLabel) : null,
      })),
    [language]
  );

  useEffect(() => {
    const ids = sections.map((section) => section.id);
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        threshold: [0.25, 0.4, 0.6],
        rootMargin: '-20% 0px -55% 0px',
      }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const heroTitle =
    language === 'mk'
      ? 'Соработници и категории за цела свадба'
      : 'Collaborations and categories for the full wedding experience';
  const heroBody =
    language === 'mk'
      ? 'Инспирирано од локален свадбен директориум стил: чисто, елегантно и лесно за разгледување. Ги издвојуваме најважните категории, со покани како посебна секција за вашиот бренд.'
      : 'Inspired by a local wedding-directory style: clean, elegant, and easy to browse. The most important categories are front-and-center, with invitations added as a dedicated WedMKD category.';
  const heroCtaPrimary = language === 'mk' ? 'Контактирајте нè' : 'Contact Us';
  const heroCtaSecondary = language === 'mk' ? 'Види услуги' : 'See Services';
  const heroStats =
    language === 'mk'
      ? [
          ['7', 'главни категории'],
          ['1', 'посебна секција за покани'],
          ['чисто', 'пребарување'],
        ]
      : [
          ['7', 'main categories'],
          ['1', 'dedicated invitations section'],
          ['clean', 'browsing flow'],
        ];
  const stickyTitle = language === 'mk' ? 'Категории' : 'Categories';
  const endTitle =
    language === 'mk' ? 'Потребна ви е целосна препорака по категории?' : 'Need a full recommendation flow by category?';
  const endBody =
    language === 'mk'
      ? 'Можеме да продолжиме со детални профили за партнери, страници по категорија и контакт форми за секоја секција без да се изгуби чистиот изглед.'
      : 'We can extend this with detailed partner profiles, category pages, and per-section inquiry flows without losing the clean aesthetic.';
  const endButtonPrimary = language === 'mk' ? 'Започни разговор' : 'Start a conversation';
  const endButtonSecondary = language === 'mk' ? 'Отвори производи (покани)' : 'Open Products (Invites)';

  return (
    <div className="app-shell" data-auto-motion>
      <section className="page-wrap pt-5 sm:pt-6">
        <div className="relative overflow-hidden rounded-[34px] bg-stone-900 shadow-[0_28px_70px_rgba(20,14,12,0.22)]">
          <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/46 to-black/22" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(244,114,182,0.22),transparent_38%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.14),transparent_42%),radial-gradient(circle_at_70%_84%,rgba(245,158,11,0.12),transparent_36%)]" />

          <div className="relative grid min-h-[520px] items-end px-5 py-8 sm:px-8 sm:py-10 lg:min-h-[580px] lg:px-12">
            <div className="max-w-3xl">
              <p className="section-kicker !text-white/80">{language === 'mk' ? 'Соработници' : 'Collaborations'}</p>
              <h1 className="mt-3 text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                {heroTitle}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">{heroBody}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary px-5 py-3 text-base">
                  {heroCtaPrimary}
                </Link>
                <Link to="/services" className="btn-secondary bg-white/92 px-5 py-3 text-base">
                  {heroCtaSecondary}
                </Link>
                <Link to="/products" className="btn-secondary border-white/40 bg-white/92 px-5 py-3 text-base text-stone-900 hover:bg-white">
                  {t('Products')}
                </Link>
              </div>

              <div className="mt-6 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                {heroStats.map(([value, label]) => (
                  <div key={`${value}-${label}`} className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md">
                    <p className="text-base font-semibold text-white sm:text-lg">{value}</p>
                    <p className="text-xs text-white/80">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-[72px] z-30 mt-4 sm:top-[78px]">
        <div className="page-wrap">
          <div className="rounded-2xl border border-stone-200/70 bg-[#f7f1e8]/85 p-2 shadow-[0_12px_26px_rgba(28,18,13,0.06)] backdrop-blur-xl">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="pl-2 pr-1 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                {stickyTitle}
              </span>
              {localizedSections.map((section) => {
                const active = activeSection === section.id;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition ${
                      active
                        ? 'bg-gradient-to-r from-rose-100 via-amber-50 to-sky-100 text-stone-950 ring-1 ring-rose-200 shadow-[0_10px_18px_rgba(28,18,13,0.08)]'
                        : 'bg-white/75 text-stone-700 hover:bg-white hover:text-stone-900'
                    }`}
                  >
                    {section.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-4 space-y-0">
        {localizedSections.map((section, index) => {
          const reverse = index % 2 === 1;
          return (
            <section
              key={section.id}
              id={section.id}
              className="relative scroll-mt-40 py-12 sm:py-16"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${section.toneClass}`} />
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: `url("${section.image}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                aria-hidden
              />

              <div className="page-wrap relative">
                <div className="grid items-start gap-7 lg:grid-cols-[1fr_1fr] lg:gap-10">
                  <div className={reverse ? 'lg:order-2' : ''}>
                    <p className="section-kicker">{section.label}</p>
                    <h2 className="mt-3 text-4xl font-semibold text-stone-900 sm:text-5xl">
                      {section.titleText}
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-700 sm:text-base">
                      {section.descriptionText}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {section.chipsText.map((chip) => (
                        <span
                          key={chip}
                          className="inline-flex items-center rounded-full border border-stone-200/80 bg-white/78 px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-sm"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {section.ctaHref && section.ctaLabelText ? (
                        <Link to={section.ctaHref} className="btn-primary">
                          {section.ctaLabelText}
                        </Link>
                      ) : null}
                      <Link to="/contact" className="btn-secondary">
                        {t('Contact')}
                      </Link>
                    </div>
                  </div>

                  <div className={reverse ? 'lg:order-1' : ''}>
                    <div className="relative overflow-hidden rounded-[26px] shadow-[0_24px_50px_rgba(28,18,13,0.14)] ring-1 ring-white/45">
                      <img
                        src={section.image}
                        alt={section.imageAltText}
                        className="h-[260px] w-full object-cover sm:h-[320px] lg:h-[380px]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                        <p className="text-xs uppercase tracking-[0.16em] text-white/80">{section.label}</p>
                        <p className="mt-2 text-lg font-semibold sm:text-xl">{section.titleText}</p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {section.partnersText.map((partner) => (
                        <article
                          key={partner.name}
                          className="overflow-hidden rounded-2xl bg-white/78 shadow-[0_12px_24px_rgba(28,18,13,0.07)] ring-1 ring-white/60 backdrop-blur"
                        >
                          <img src={partner.image} alt={partner.name} className="h-20 w-full object-cover sm:h-24" loading="lazy" />
                          <div className="p-3">
                            <p className="text-sm font-semibold text-stone-900">{partner.name}</p>
                            <p className="mt-1 text-xs leading-5 text-stone-600">{partner.noteText}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="page-wrap pb-12 pt-4">
        <div className="relative overflow-hidden rounded-[28px] bg-stone-900 px-5 py-8 text-white shadow-[0_24px_60px_rgba(28,18,13,0.18)] sm:px-8 sm:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(244,114,182,0.26),transparent_40%),radial-gradient(circle_at_86%_22%,rgba(59,130,246,0.18),transparent_44%),radial-gradient(circle_at_72%_86%,rgba(245,158,11,0.18),transparent_36%)]" />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="section-kicker !text-white/75">{language === 'mk' ? 'Следен чекор' : 'Next step'}</p>
              <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">{endTitle}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/82 sm:text-base">{endBody}</p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <Link to="/contact" className="btn-secondary bg-white/95">
                {endButtonPrimary}
              </Link>
              <Link to="/products" className="btn-secondary border-white/40 bg-white/92 text-stone-900 hover:bg-white">
                {endButtonSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
