import React from 'react';
import { Link } from 'react-router-dom';
import { PricingTiers } from '../components/PricingTiers';
import { TestimonialCarousel } from '../components/marketing/TestimonialCarousel';
import { useI18n } from '../context/I18nContext';

export const PricingPage: React.FC = () => {
  const { language } = useI18n();
  const isMk = language === 'mk';

  const testimonials = isMk
    ? [
        {
          quote: 'Јасно прикажани пакети и примери. Клиентите побрзо одлучуваат без долги објаснувања.',
          name: 'Planner студио',
          role: 'Продажен разговор',
          metric: 'Побрза одлука',
        },
        {
          quote: 'Комбинацијата од ценовник + пример страници ни помогна веднаш да разбереме што е разликата.',
          name: 'Тест пар',
          role: 'Пред регистрација',
          metric: 'Повеќе доверба',
        },
      ]
    : [
        {
          quote: 'Packages and previews are much clearer now. Clients decide faster without long explanations.',
          name: 'Planner studio',
          role: 'Sales conversation',
          metric: 'Faster decisions',
        },
        {
          quote: 'The combination of pricing and sample pages helped us understand plan differences immediately.',
          name: 'Couple test user',
          role: 'Pre-signup flow',
          metric: 'More confidence',
        },
      ];

  const faqs = isMk
    ? [
        ['Што е вклучено во пакетите?', 'Пакетите ги опфаќаат пример-страници, покани, RSVP тек и планирачки функции според нивото на пакетот.'],
        ['Може ли да надградам подоцна?', 'Да. Можете да започнете со понизок пакет и подоцна да продолжите на повисок со повеќе функции.'],
        ['Дали има печатени покани?', 'Да. Имаме посебна насока за печатени и дигитални покани преку Products страницата и партнерски категории.'],
      ]
    : [
        ['What is included in the plans?', 'Plans cover sample pages, invitation flow, RSVP experience, and planning features depending on tier level.'],
        ['Can I upgrade later?', 'Yes. You can start with a lower tier and move to a higher one later as your needs grow.'],
        ['Do you support printed invitations?', 'Yes. We support a printed + digital invitation direction through the Products page and partner categories.'],
      ];

  return (
    <div className="app-shell" data-auto-motion>
      <section className="relative overflow-hidden py-12 sm:py-16">
        <img
          src="https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1100&fit=crop"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-stone-900/62" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(93,6,143,0.25),transparent_40%),radial-gradient(circle_at_84%_20%,rgba(141,115,172,0.24),transparent_44%)]" />
        <div className="page-wrap relative">
          <div className="max-w-4xl text-white">
            <p className="section-kicker !text-white/70">{isMk ? 'Ценовник' : 'Pricing'}</p>
            <h1 className="mt-2 text-5xl font-semibold sm:text-6xl">
              {isMk ? 'Изберете пакет за вашата свадбена покана и веб-страница' : 'Choose a package for your wedding invitation and website'}
            </h1>
            <p className="mt-4 text-sm leading-7 text-white/82 sm:text-base">
              {isMk
                ? 'Ценовникот е поврзан со пример-страниците, така што веднаш гледате како изгледа секое ниво на пакет.'
                : 'Pricing is paired with sample pages so you can instantly see how each plan level looks and feels.'}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to="/samples" className="btn-secondary bg-white/95">
                {isMk ? 'Погледни примери' : 'View Samples'}
              </Link>
              <Link to="/contact" className="btn-primary">
                {isMk ? 'Контактирајте нè' : 'Contact Us'}
              </Link>
            </div>
          </div>

          <div className="mt-8 rounded-[28px] border border-white/20 bg-white/12 p-4 backdrop-blur-xl sm:p-6">
            <div className="rounded-[22px] bg-white/94 p-4 sm:p-5">
              <PricingTiers />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="page-wrap">
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-2xl border border-stone-200/85 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">
                {isMk ? 'Што добивате со секој пакет' : 'What you get with each package'}
              </h2>
              <ul className="mt-4 space-y-3">
                {(isMk
                  ? [
                      'Пример-страници по пакет за јасна визуелна разлика',
                      'Гостинско искуство со RSVP и детални табови',
                      'Планирачки функции поврзани со backend',
                      'Категории за соработници и покани',
                    ]
                  : [
                      'Tier-based sample pages for a clear visual difference',
                      'Guest experience with RSVP and rich tabs',
                      'Planning features connected to the backend',
                      'Collaboration categories and invitation direction',
                    ]).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-[#5d068f]" />
                    <span className="text-sm leading-7 text-stone-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-stone-200/85 bg-[#f8f4ee] p-5 shadow-sm sm:p-6">
              <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">
                {isMk ? 'Често поставувани прашања' : 'Frequently asked questions'}
              </h2>
              <div className="mt-4 space-y-3">
                {faqs.map(([q, a]) => (
                  <article key={q} className="rounded-xl border border-stone-200/80 bg-white p-4">
                    <h3 className="text-lg font-semibold text-stone-900">{q}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">{a}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f4ee] pb-16 pt-10 sm:pb-20 sm:pt-12">
        <div className="page-wrap">
          <TestimonialCarousel
            title={isMk ? 'Ценовник што е полесен за разбирање' : 'Pricing that is easier to understand'}
            subtitle={
              isMk
                ? 'Пример-страници + ценовник + контакт во еден јасен тек.'
                : 'Sample pages + pricing + contact in one clear flow.'
            }
            items={testimonials}
            accentClass="from-[#8d73ac] via-[#7f58b7] to-[#5d068f]"
          />
        </div>
      </section>
    </div>
  );
};

