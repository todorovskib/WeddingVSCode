import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TestimonialCarousel } from '../components/marketing/TestimonialCarousel';
import { useI18n } from '../context/I18nContext';

type Localized = {
  en: string;
  mk: string;
};

type InviteCard = {
  id: string;
  route: string;
  image: string;
  title: Localized;
  subtitle: Localized;
  accent: string;
};

type PricingCard = {
  name: Localized;
  price: string;
  note: Localized;
  route: string;
  featured?: boolean;
};

type TestimonialItem = {
  quote: Localized;
  name: Localized;
  role: Localized;
};

const img = {
  hero: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=80',
  story: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80',
  inviteBasic: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
  invitePro: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
  invitePremium: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
  floral: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=1400&q=80',
  fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
};

const inviteCards: InviteCard[] = [
  {
    id: 'basic',
    route: '/samples/basic',
    image: img.inviteBasic,
    title: { en: 'Basic', mk: 'Basic' },
    subtitle: { en: 'Warm, clean, RSVP-first', mk: 'Топло, чисто, со RSVP фокус' },
    accent: 'from-sky-400 to-cyan-500',
  },
  {
    id: 'pro',
    route: '/samples/pro',
    image: img.invitePro,
    title: { en: 'Pro', mk: 'Pro' },
    subtitle: { en: 'Timeline, gallery, guest flow', mk: 'Временска линија, галерија, тек за гости' },
    accent: 'from-rose-400 to-pink-600',
  },
  {
    id: 'premium',
    route: '/samples/premium',
    image: img.invitePremium,
    title: { en: 'Premium', mk: 'Premium' },
    subtitle: { en: 'Story-driven and elegant', mk: 'Раскажувачки и елегантен стил' },
    accent: 'from-amber-400 to-orange-600',
  },
];

const pricingCards: PricingCard[] = [
  {
    name: { en: 'Basic', mk: 'Basic' },
    price: '$29',
    note: {
      en: 'Perfect for a beautiful RSVP page and essential details.',
      mk: 'Идеален за убава RSVP страница и основни детали.',
    },
    route: '/samples/basic',
  },
  {
    name: { en: 'Pro', mk: 'Pro' },
    price: '$79',
    note: {
      en: 'Our most balanced option for guest flow, gallery, and planning.',
      mk: 'Најбалансиран избор за тек за гости, галерија и планирање.',
    },
    route: '/samples/pro',
    featured: true,
  },
  {
    name: { en: 'Premium', mk: 'Premium' },
    price: '$199',
    note: {
      en: 'A richer wedding experience with more personality and detail.',
      mk: 'Побогато свадбено искуство со повеќе карактер и детали.',
    },
    route: '/samples/premium',
  },
];

const testimonials: TestimonialItem[] = [
  {
    quote: {
      en: 'It feels like a wedding brand, not a generic tool. The homepage is calmer and more emotional now.',
      mk: 'Се чувствува како свадбен бренд, а не како генеричка алатка. Почетната сега е помирна и поемотивна.',
    },
    name: { en: 'Marija & Filip', mk: 'Марија и Филип' },
    role: { en: 'Couple', mk: 'Пар' },
  },
  {
    quote: {
      en: 'Clients now understand the invitation style and pricing faster. The flow is much cleaner.',
      mk: 'Клиентите побрзо го разбираат стилот на поканата и цените. Текот е многу почист.',
    },
    name: { en: 'Wedding planner studio', mk: 'Свадбено planner студио' },
    role: { en: 'Partner', mk: 'Партнер' },
  },
  {
    quote: {
      en: 'The new visuals feel elegant and modern, and the page no longer repeats the same message.',
      mk: 'Новите визуели делуваат елегантно и модерно, а страницата повеќе не ја повторува истата порака.',
    },
    name: { en: 'Internal review', mk: 'Внатрешна ревизија' },
    role: { en: 'Design feedback', mk: 'Дизајн фидбек' },
  },
];

const pageCopy = {
  heroKicker: { en: 'Wedding invitations and websites', mk: 'Свадбени покани и веб-страници' },
  heroTitle: { en: 'Invite your story with style', mk: 'Поканете ја вашата приказна со стил' },
  heroBody: {
    en: 'Create an elegant wedding invitation with RSVP, event details, and a gentle guest experience that feels personal and modern.',
    mk: 'Креирајте елегантна свадбена покана со RSVP, детали за денот и нежно гостинско искуство што изгледа лично и современо.',
  },
  heroHint: { en: 'Scroll for samples, pricing, and contact', mk: 'Подолу има примери, цени и контакт' },

  storyAlt: { en: 'Couple wedding photo session', mk: 'Пар на свадбена фотосесија' },
  storyKicker: { en: 'Your day', mk: 'Вашиот ден' },
  storyTitle: { en: 'Gentle design, clear details, calm organization', mk: 'Нежен дизајн, јасни информации, мирна организација' },

  howKicker: { en: 'How it works', mk: 'Како функционира' },
  howTitle: { en: 'More wedding, less chaos', mk: 'Повеќе свадба, помалку хаос' },
  howBody: {
    en: 'We focus on what matters most: a beautiful invitation, guest confirmations, and one clear place where all the details live together.',
    mk: 'Се фокусираме на најважното: убава покана, потврди од гостите и јасно место каде што сите детали живеат заедно.',
  },

  inviteSectionKicker: { en: 'Invitation samples', mk: 'Примери за покани' },
  inviteSectionTitle: { en: 'See the feeling before you choose a plan', mk: 'Погледнете го чувството пред да одберете пакет' },
  inviteSectionBody: {
    en: 'Each sample has a different rhythm and level of detail, so you can choose what feels right for you.',
    mk: 'Секој пример има различен ритам и ниво на детали, за да изберете што ви прилега вам.',
  },
  allSamples: { en: 'All Samples', mk: 'Сите примери' },
  invitesAndDetails: { en: 'Invites & Details', mk: 'Покани и детали' },
  sampleLabel: { en: 'Sample', mk: 'Пример' },
  viewSample: { en: 'View sample', mk: 'Погледни пример' },

  pricingKicker: { en: 'Pricing', mk: 'Ценовник' },
  pricingTitle: { en: 'Choose a plan by the style you want', mk: 'Изберете пакет според стилот што го сакате' },
  pricingBody: {
    en: 'We keep only the essentials on the homepage. Full pricing details and all features live on a dedicated page.',
    mk: 'На почетната страница го оставаме само најважното. Деталниот ценовник и сите функции се на посебна страница.',
  },
  mostLoved: { en: 'Most Loved', mk: 'Најбаран' },
  seeSample: { en: 'See sample', mk: 'Види пример' },
  openFullPricing: { en: 'Open Full Pricing', mk: 'Отвори цел ценовник' },
  talkToUs: { en: 'Talk to us', mk: 'Прашајте нè' },

  testimonialsTitle: { en: 'How it feels for couples', mk: 'Како се чувствува за паровите' },
  testimonialsSubtitle: {
    en: 'Less noise, clearer flow, and a stronger wedding feeling.',
    mk: 'Помалку текст, појасен тек и повеќе свадбено чувство.',
  },

  nextKicker: { en: 'Next step', mk: 'Следен чекор' },
  nextTitle: { en: 'Ready for your invitation?', mk: 'Подготвени сте за вашата покана?' },
  nextBody: { en: 'Start from a sample you love and shape it for your day.', mk: 'Започнете со пример што ви се допаѓа и прилагодете го за вашиот ден.' },
  start: { en: 'Start', mk: 'Започни' },
  samples: { en: 'Samples', mk: 'Примери' },
  contact: { en: 'Contact', mk: 'Контакт' },

  elegantWeddingAtmosphere: { en: 'Elegant wedding atmosphere', mk: 'Елегантна свадбена атмосфера' },
} as const;

const howSteps = [
  {
    title: { en: 'Choose the look', mk: 'Изберете изглед' },
    body: {
      en: 'Pick the style that matches your wedding mood and edit it to feel like you.',
      mk: 'Изберете стил што одговара на атмосферата на вашата свадба и прилагодете го да биде ваш.',
    },
  },
  {
    title: { en: 'Collect responses', mk: 'Соберете одговори' },
    body: {
      en: 'Guests RSVP in one flow, and you keep control of the list without endless messages.',
      mk: 'Гостите потврдуваат во еден тек, а вие ја контролирате листата без бескрајни пораки.',
    },
  },
  {
    title: { en: 'Share your day beautifully', mk: 'Споделете го денот убаво' },
    body: {
      en: 'Timeline, venue details, FAQ, and gallery live in a polished wedding experience.',
      mk: 'Временска линија, детали за локација, ЧПП и галерија живеат во полирано свадбено искуство.',
    },
  },
];

function onImageError(event: React.SyntheticEvent<HTMLImageElement>) {
  const el = event.currentTarget;
  if (el.dataset.fallbackApplied === '1') return;
  el.dataset.fallbackApplied = '1';
  el.src = img.fallback;
}

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('token');
  const { language } = useI18n();
  const isMk = language === 'mk';

  const l = (v: Localized) => (isMk ? v.mk : v.en);

  return (
    <div className="app-shell" data-auto-motion>
      <section className="relative min-h-[calc(100vh-72px)] overflow-hidden">
        <img
          src={img.hero}
          onError={onImageError}
          alt={l(pageCopy.elegantWeddingAtmosphere)}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: 'blur(1.8px)', transform: 'scale(1.04)' }}
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/62" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(143,76,69,0.30),transparent_38%),radial-gradient(circle_at_84%_18%,rgba(79,127,118,0.16),transparent_42%),radial-gradient(circle_at_70%_84%,rgba(180,122,49,0.16),transparent_34%)]" />

        <div className="page-wrap relative flex min-h-[calc(100vh-72px)] items-center py-10 sm:py-14">
          <div className="w-full">
            <div className="max-w-5xl text-white [text-shadow:0_3px_18px_rgba(0,0,0,0.45)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">{l(pageCopy.heroKicker)}</p>
              <h1 className="mt-4 text-5xl font-semibold leading-[0.94] sm:text-6xl lg:text-7xl xl:text-[5.2rem]">
                {l(pageCopy.heroTitle)}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/88 sm:text-xl sm:leading-9">
                {l(pageCopy.heroBody)}
              </p>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.20em] text-white/72 sm:text-sm">
                {l(pageCopy.heroHint)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f4ee] py-12 sm:py-16">
        <div className="page-wrap">
          <div className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative overflow-hidden rounded-[26px] shadow-[0_20px_40px_rgba(28,18,13,0.10)]">
              <img
                src={img.story}
                onError={onImageError}
                alt={l(pageCopy.storyAlt)}
                className="h-[320px] w-full object-cover sm:h-[420px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/42 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-xs uppercase tracking-[0.16em] text-white/80">{l(pageCopy.storyKicker)}</p>
                <p className="mt-2 text-xl font-semibold sm:text-2xl">{l(pageCopy.storyTitle)}</p>
              </div>
            </div>

            <div>
              <p className="section-kicker">{l(pageCopy.howKicker)}</p>
              <h2 className="mt-2 text-4xl font-semibold text-stone-900 sm:text-5xl">{l(pageCopy.howTitle)}</h2>
              <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">{l(pageCopy.howBody)}</p>

              <div className="mt-5 space-y-3">
                {howSteps.map((step, index) => (
                  <div key={step.title.en} className="rounded-2xl border border-stone-200/85 bg-white p-4 shadow-sm">
                    <div className="flex gap-3">
                      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-900 text-xs font-semibold text-white">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900">{l(step.title)}</p>
                        <p className="mt-1 text-sm leading-6 text-stone-600">{l(step.body)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ourinvitations" className="bg-white py-12 sm:py-16">
        <div className="page-wrap">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="section-kicker">{l(pageCopy.inviteSectionKicker)}</p>
              <h2 className="mt-2 text-4xl font-semibold text-stone-900 sm:text-5xl">{l(pageCopy.inviteSectionTitle)}</h2>
              <p className="mt-3 text-sm leading-7 text-stone-600 sm:text-base">{l(pageCopy.inviteSectionBody)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/samples" className="btn-secondary">{l(pageCopy.allSamples)}</Link>
              <Link to="/products" className="btn-primary">{l(pageCopy.invitesAndDetails)}</Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {inviteCards.map((card) => (
              <Link key={card.id} to={card.route} target="_blank" rel="noopener noreferrer" className="group block">
                <article className="overflow-hidden rounded-[24px] border border-stone-200/85 bg-white shadow-[0_12px_24px_rgba(28,18,13,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(28,18,13,0.11)]">
                  <div className="relative overflow-hidden">
                    <img
                      src={card.image}
                      onError={onImageError}
                      alt={`${l(card.title)} ${l(pageCopy.sampleLabel).toLowerCase()}`}
                      className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${card.accent} opacity-24`} />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/62 to-transparent p-5 text-white">
                      <p className="text-xs uppercase tracking-[0.16em] text-white/80">{l(pageCopy.sampleLabel)}</p>
                      <p className="mt-2 text-2xl font-semibold">{l(card.title)}</p>
                      <p className="mt-1 text-sm text-white/85">{l(card.subtitle)}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="inline-flex rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-semibold text-stone-700">
                      {l(pageCopy.viewSample)}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="relative overflow-hidden py-12 sm:py-16">
        <img
          src={img.floral}
          onError={onImageError}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-stone-900/66" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(143,76,69,0.28),transparent_42%),radial-gradient(circle_at_82%_24%,rgba(79,127,118,0.18),transparent_42%),radial-gradient(circle_at_66%_84%,rgba(180,122,49,0.20),transparent_34%)]" />

        <div className="page-wrap relative">
          <div className="max-w-3xl text-white">
            <p className="section-kicker !text-white/72">{l(pageCopy.pricingKicker)}</p>
            <h2 className="mt-2 text-4xl font-semibold sm:text-5xl">{l(pageCopy.pricingTitle)}</h2>
            <p className="mt-3 text-sm leading-7 text-white/82 sm:text-base">{l(pageCopy.pricingBody)}</p>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {pricingCards.map((tier) => (
              <article
                key={tier.name.en}
                className={`rounded-[22px] border p-5 backdrop-blur-xl ${
                  tier.featured
                    ? 'border-white/30 bg-white/16 shadow-[0_18px_30px_rgba(0,0,0,0.16)]'
                    : 'border-white/20 bg-white/10'
                }`}
              >
                {tier.featured && (
                  <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-stone-900">
                    {l(pageCopy.mostLoved)}
                  </span>
                )}
                <div className="mt-3 flex items-end justify-between gap-3">
                  <h3 className="text-3xl font-semibold text-white">{l(tier.name)}</h3>
                  <p className="text-2xl font-bold text-white">{tier.price}</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/84">{l(tier.note)}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link to={tier.route} target="_blank" rel="noopener noreferrer" className="btn-secondary bg-white/92">
                    {l(pageCopy.seeSample)}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link to="/pricing" className="btn-secondary bg-white/95">
              {l(pageCopy.openFullPricing)}
            </Link>
            <Link to="/contact" className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20">
              {l(pageCopy.talkToUs)}
            </Link>
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-[#f8f4ee] py-12 pb-16 sm:py-16 sm:pb-20">
        <div className="page-wrap">
          <TestimonialCarousel
            title={l(pageCopy.testimonialsTitle)}
            subtitle={l(pageCopy.testimonialsSubtitle)}
            items={testimonials.map((item) => ({
              quote: l(item.quote),
              name: l(item.name),
              role: l(item.role),
            }))}
            accentClass="from-[#b48a73] via-[#9c4f46] to-[#6f3733]"
          />

          <div className="mt-6 rounded-[24px] border border-stone-200/85 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="section-kicker">{l(pageCopy.nextKicker)}</p>
                <h3 className="mt-2 text-3xl font-semibold text-stone-900 sm:text-4xl">{l(pageCopy.nextTitle)}</h3>
                <p className="mt-2 text-sm leading-7 text-stone-600">{l(pageCopy.nextBody)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {!user && (
                  <button onClick={() => navigate('/signup')} className="btn-primary">
                    {l(pageCopy.start)}
                  </button>
                )}
                <Link to="/samples" className="btn-secondary">
                  {l(pageCopy.samples)}
                </Link>
                <Link to="/contact" className="btn-secondary">
                  {l(pageCopy.contact)}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
