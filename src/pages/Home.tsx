import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TestimonialCarousel } from '../components/marketing/TestimonialCarousel';
import { useI18n } from '../context/I18nContext';

const img = {
  hero: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=80',
  story: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80',
  inviteBasic: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
  invitePro: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
  invitePremium: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
  floral: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=1400&q=80',
  fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
};

const inviteCards = [
  {
    id: 'basic',
    route: '/samples/basic',
    image: img.inviteBasic,
    title: { en: 'Basic', mk: 'Basic' },
    subtitle: {
      en: 'Warm, clean, RSVP-first',
      mk: 'Топло, чисто, со RSVP фокус',
    },
    accent: 'from-sky-400 to-cyan-500',
  },
  {
    id: 'pro',
    route: '/samples/pro',
    image: img.invitePro,
    title: { en: 'Pro', mk: 'Pro' },
    subtitle: {
      en: 'Timeline, gallery, guest flow',
      mk: 'Временска линија, галерија, гостински тек',
    },
    accent: 'from-rose-400 to-pink-600',
  },
  {
    id: 'premium',
    route: '/samples/premium',
    image: img.invitePremium,
    title: { en: 'Premium', mk: 'Premium' },
    subtitle: {
      en: 'Story-driven and elegant',
      mk: 'Раскажувачки и елегантен стил',
    },
    accent: 'from-amber-400 to-orange-600',
  },
];

const pricingCards = [
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
      mk: 'Најбалансиран избор за гостински тек, галерија и планирање.',
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

const testimonials = {
  en: [
    {
      quote:
        'It feels like a wedding brand, not a generic tool. The homepage is calmer and more emotional now.',
      name: 'Marija & Filip',
      role: 'Couple',
    },
    {
      quote:
        'Clients now understand the invitation style and pricing faster. The flow is much cleaner.',
      name: 'Wedding planner studio',
      role: 'Partner',
    },
    {
      quote:
        'The new visuals feel elegant and modern, and the page no longer repeats the same message.',
      name: 'Internal review',
      role: 'Design feedback',
    },
  ],
  mk: [
    {
      quote:
        'Се чувствува како свадбен бренд, а не како генеричка алатка. Почетната сега е помирна и поемотивна.',
      name: 'Марија и Филип',
      role: 'Пар',
    },
    {
      quote:
        'Клиентите побрзо го разбираат стилот на поканата и цените. Текот е многу почист.',
      name: 'Свадбено planner студио',
      role: 'Партнер',
    },
    {
      quote:
        'Новите визуели делуваат елегантно и модерно, а страницата повеќе не ја повторува истата порака.',
      name: 'Внатрешна ревизија',
      role: 'Дизајн фидбек',
    },
  ],
} as const;

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

  const quote = isMk
    ? '„Сè што им треба на вашите гости, во една убава покана.“'
    : '"Everything your guests need, in one beautiful invitation."';

  return (
    <div className="app-shell" data-auto-motion>
      <section className="relative min-h-[calc(100vh-72px)] overflow-hidden">
        <img
          src={img.hero}
          onError={onImageError}
          alt={isMk ? 'Елегантна свадбена атмосфера' : 'Elegant wedding atmosphere'}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/52" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(143,76,69,0.35),transparent_38%),radial-gradient(circle_at_84%_18%,rgba(79,127,118,0.18),transparent_42%),radial-gradient(circle_at_70%_84%,rgba(180,122,49,0.18),transparent_34%)]" />

        <div className="page-wrap relative flex min-h-[calc(100vh-72px)] items-center py-10 sm:py-14">
          <div className="grid w-full gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div className="max-w-4xl text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
                {isMk ? 'Свадбени покани и веб-страници' : 'Wedding invitations and websites'}
              </p>
              <h1 className="mt-4 text-5xl font-semibold leading-[0.95] sm:text-6xl lg:text-7xl">
                {isMk
                  ? 'Вашата приказна, поканета со стил'
                  : 'Invite your story with style'}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/85 sm:text-lg sm:leading-8">
                {isMk
                  ? 'Креирајте елегантна свадбена покана со RSVP, детали за денот и нежно гостинско искуство што изгледа лично и современо.'
                  : 'Create an elegant wedding invitation with RSVP, event details, and a gentle guest experience that feels personal and modern.'}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {!user ? (
                  <>
                    <button onClick={() => navigate('/signup')} className="btn-primary px-6 py-3 text-base">
                      {isMk ? 'Започни ја поканата' : 'Start Your Invitation'}
                    </button>
                    <button onClick={() => navigate('/login')} className="btn-secondary bg-white/95 px-6 py-3 text-base">
                      {isMk ? 'Најава' : 'Sign In'}
                    </button>
                  </>
                ) : (
                  <button onClick={() => navigate('/dashboard')} className="btn-primary px-6 py-3 text-base">
                    {isMk ? 'Отвори контролна табла' : 'Open Dashboard'}
                  </button>
                )}
                <Link to="/samples" className="btn-secondary border-white/30 bg-white/10 px-6 py-3 text-base text-white hover:bg-white/20">
                  {isMk ? 'Погледни примери' : 'View Samples'}
                </Link>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <a href="#ourinvitations" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur hover:bg-white/18">
                  {isMk ? 'Покани' : 'Invites'}
                </a>
                <a href="#pricing" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur hover:bg-white/18">
                  {isMk ? 'Ценовник' : 'Pricing'}
                </a>
                <a href="#testimonials" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur hover:bg-white/18">
                  {isMk ? 'Искуства' : 'Reviews'}
                </a>
              </div>
            </div>

            <div className="lg:justify-self-end">
              <div className="w-full max-w-md rounded-[24px] border border-white/20 bg-white/12 p-4 backdrop-blur-xl shadow-[0_18px_34px_rgba(0,0,0,0.18)]">
                <div className="rounded-[18px] bg-white/95 p-4 text-stone-900">
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
                    {isMk ? 'Свадбено чувство' : 'Wedding mood'}
                  </p>
                  <p className="mt-2 text-xl font-semibold leading-tight">
                    {quote}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-xl border border-stone-200/80 bg-stone-50 p-3">
                      <p className="text-xs uppercase tracking-[0.14em] text-stone-500">
                        {isMk ? 'RSVP' : 'RSVP'}
                      </p>
                      <p className="mt-1 font-semibold">{isMk ? 'Едноставно и брзо' : 'Simple and fast'}</p>
                    </div>
                    <div className="rounded-xl border border-stone-200/80 bg-stone-50 p-3">
                      <p className="text-xs uppercase tracking-[0.14em] text-stone-500">
                        {isMk ? 'Детали' : 'Details'}
                      </p>
                      <p className="mt-1 font-semibold">{isMk ? 'Сè на едно место' : 'All in one place'}</p>
                    </div>
                  </div>
                </div>
              </div>
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
                alt={isMk ? 'Пар на свадбена фотосесија' : 'Couple wedding photo session'}
                className="h-[320px] w-full object-cover sm:h-[420px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/42 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-xs uppercase tracking-[0.16em] text-white/80">
                  {isMk ? 'Вашиот ден' : 'Your day'}
                </p>
                <p className="mt-2 text-xl font-semibold sm:text-2xl">
                  {isMk ? 'Нежен дизајн, јасни информации, мирна организација' : 'Gentle design, clear details, calm organization'}
                </p>
              </div>
            </div>

            <div>
              <p className="section-kicker">{isMk ? 'Како функционира' : 'How it works'}</p>
              <h2 className="mt-2 text-4xl font-semibold text-stone-900 sm:text-5xl">
                {isMk ? 'Повеќе свадба, помалку хаос' : 'More wedding, less chaos'}
              </h2>
              <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
                {isMk
                  ? 'Се фокусираме на најважното: убава покана, потврди од гостите и јасно место каде што сите детали живеат заедно.'
                  : 'We focus on what matters most: a beautiful invitation, guest confirmations, and one clear place where all the details live together.'}
              </p>

              <div className="mt-5 space-y-3">
                {[
                  {
                    enTitle: 'Choose the look',
                    mkTitle: 'Изберете изглед',
                    enBody: 'Pick the style that matches your wedding mood and edit it to feel like you.',
                    mkBody: 'Изберете стил што одговара на атмосферата на вашата свадба и прилагодете го да биде ваш.',
                  },
                  {
                    enTitle: 'Collect responses',
                    mkTitle: 'Соберете одговори',
                    enBody: 'Guests RSVP in one flow, and you keep control of the list without endless messages.',
                    mkBody: 'Гостите потврдуваат во еден тек, а вие ја контролирате листата без бескрајни пораки.',
                  },
                  {
                    enTitle: 'Share your day beautifully',
                    mkTitle: 'Споделете го денот убаво',
                    enBody: 'Timeline, venue details, FAQ, and gallery live in a polished wedding experience.',
                    mkBody: 'Временска линија, детали за локација, ЧПП и галерија живеат во полирано свадбено искуство.',
                  },
                ].map((step, index) => (
                  <div key={step.enTitle} className="rounded-2xl border border-stone-200/85 bg-white p-4 shadow-sm">
                    <div className="flex gap-3">
                      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-900 text-xs font-semibold text-white">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900">{isMk ? step.mkTitle : step.enTitle}</p>
                        <p className="mt-1 text-sm leading-6 text-stone-600">{isMk ? step.mkBody : step.enBody}</p>
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
              <p className="section-kicker">{isMk ? 'Примери за покани' : 'Invitation samples'}</p>
              <h2 className="mt-2 text-4xl font-semibold text-stone-900 sm:text-5xl">
                {isMk ? 'Погледнете го чувството пред да одберете пакет' : 'See the feeling before you choose a plan'}
              </h2>
              <p className="mt-3 text-sm leading-7 text-stone-600 sm:text-base">
                {isMk
                  ? 'Секој пример има различен ритам и ниво на детали, за да изберете што ви прилега вам.'
                  : 'Each sample has a different rhythm and level of detail, so you can choose what feels right for you.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/samples" className="btn-secondary">{isMk ? 'Сите примери' : 'All Samples'}</Link>
              <Link to="/products" className="btn-primary">{isMk ? 'Покани и детали' : 'Invites & Details'}</Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {inviteCards.map((card) => (
              <Link key={card.id} to={card.route} className="group block">
                <article className="overflow-hidden rounded-[24px] border border-stone-200/85 bg-white shadow-[0_12px_24px_rgba(28,18,13,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(28,18,13,0.11)]">
                  <div className="relative overflow-hidden">
                    <img
                      src={card.image}
                      onError={onImageError}
                      alt={isMk ? `${card.title.mk} пример` : `${card.title.en} sample`}
                      className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${card.accent} opacity-24`} />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/62 to-transparent p-5 text-white">
                      <p className="text-xs uppercase tracking-[0.16em] text-white/80">
                        {isMk ? 'Пример' : 'Sample'}
                      </p>
                      <p className="mt-2 text-2xl font-semibold">{isMk ? card.title.mk : card.title.en}</p>
                      <p className="mt-1 text-sm text-white/85">{isMk ? card.subtitle.mk : card.subtitle.en}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="inline-flex rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-semibold text-stone-700">
                      {isMk ? 'Погледни пример' : 'View sample'}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="relative overflow-hidden py-12 sm:py-16"
      >
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
            <p className="section-kicker !text-white/72">{isMk ? 'Ценовник' : 'Pricing'}</p>
            <h2 className="mt-2 text-4xl font-semibold sm:text-5xl">
              {isMk ? 'Изберете пакет според стилот што го сакате' : 'Choose a plan by the style you want'}
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/82 sm:text-base">
              {isMk
                ? 'На почетната страница го оставаме само најважното. Деталниот ценовник и сите функции се на посебна страница.'
                : 'We keep only the essentials on the homepage. Full pricing details and all features live on a dedicated page.'}
            </p>
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
                    {isMk ? 'Најбаран' : 'Most Loved'}
                  </span>
                )}
                <div className="mt-3 flex items-end justify-between gap-3">
                  <h3 className="text-3xl font-semibold text-white">{isMk ? tier.name.mk : tier.name.en}</h3>
                  <p className="text-2xl font-bold text-white">{tier.price}</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/84">{isMk ? tier.note.mk : tier.note.en}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link to={tier.route} className="btn-secondary bg-white/92">
                    {isMk ? 'Види пример' : 'See sample'}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link to="/pricing" className="btn-secondary bg-white/95">
              {isMk ? 'Отвори цел ценовник' : 'Open Full Pricing'}
            </Link>
            <Link to="/contact" className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20">
              {isMk ? 'Прашајте нè' : 'Talk to us'}
            </Link>
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-[#f8f4ee] py-12 pb-16 sm:py-16 sm:pb-20">
        <div className="page-wrap">
          <TestimonialCarousel
            title={isMk ? 'Како се чувствува за паровите' : 'How it feels for couples'}
            subtitle={
              isMk
                ? 'Помалку текст, појасен тек и повеќе свадбено чувство.'
                : 'Less noise, clearer flow, and a stronger wedding feeling.'
            }
            items={[...(isMk ? testimonials.mk : testimonials.en)]}
            accentClass="from-[#b48a73] via-[#9c4f46] to-[#6f3733]"
          />

          <div className="mt-6 rounded-[24px] border border-stone-200/85 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="section-kicker">{isMk ? 'Следен чекор' : 'Next step'}</p>
                <h3 className="mt-2 text-3xl font-semibold text-stone-900 sm:text-4xl">
                  {isMk ? 'Подготвени сте за вашата покана?' : 'Ready for your invitation?'}
                </h3>
                <p className="mt-2 text-sm leading-7 text-stone-600">
                  {isMk
                    ? 'Започнете со пример што ви се допаѓа и прилагодете го за вашиот ден.'
                    : 'Start from a sample you love and shape it for your day.'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {!user && (
                  <button onClick={() => navigate('/signup')} className="btn-primary">
                    {isMk ? 'Започни' : 'Start'}
                  </button>
                )}
                <Link to="/samples" className="btn-secondary">
                  {isMk ? 'Примери' : 'Samples'}
                </Link>
                <Link to="/contact" className="btn-secondary">
                  {isMk ? 'Контакт' : 'Contact'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

