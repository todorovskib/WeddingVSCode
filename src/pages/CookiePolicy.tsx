import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';

export const CookiePolicy: React.FC = () => {
  const { language } = useI18n();
  const isMk = language === 'mk';

  const sections = isMk
    ? [
        {
          title: '1. Што се колачиња',
          body: [
            'Колачињата се мали текстуални датотеки што се зачувуваат на вашиот уред за да помогнат веб-страницата да работи правилно.',
            'Тие можат да се користат за најава, паметење поставки и подобрување на корисничкото искуство.',
          ],
        },
        {
          title: '2. Какви колачиња користиме',
          body: [
            'Основни колачиња за сесија и автентикација.',
            'Колачиња за поставки (на пример јазик или интерфејс избори).',
            'Аналитички колачиња (ако се активирани) за разбирање на користење и подобрување на платформата.',
          ],
        },
        {
          title: '3. Колачиња од трети страни',
          body: [
            'Некои интеграции или вградени содржини може да поставуваат колачиња од трети страни.',
            'Ние се стремиме да користиме ограничен број интеграции и да ги вклучуваме само кога се потребни.',
          ],
        },
        {
          title: '4. Управување со колачиња',
          body: [
            'Можете да ги ограничите или избришете колачињата преку вашиот прелистувач.',
            'Имајте предвид дека исклучувањето на некои колачиња може да влијае на функции како најава, зачувани поставки или формулари.',
          ],
        },
        {
          title: '5. Промени на оваа политика',
          body: [
            'Оваа политика може да се ажурира повремено. Промените ќе бидат објавени на оваа страница со ажуриран датум.',
          ],
        },
      ]
    : [
        {
          title: '1. What cookies are',
          body: [
            'Cookies are small text files stored on your device to help a website function correctly.',
            'They may be used for sign-in sessions, remembering preferences, and improving the user experience.',
          ],
        },
        {
          title: '2. Types of cookies we use',
          body: [
            'Essential cookies for session handling and authentication.',
            'Preference cookies (for example language or interface choices).',
            'Analytics cookies (if enabled) to understand usage and improve the platform.',
          ],
        },
        {
          title: '3. Third-party cookies',
          body: [
            'Some integrations or embedded content may set third-party cookies.',
            'We aim to keep third-party integrations limited and only enable them when needed.',
          ],
        },
        {
          title: '4. Managing cookies',
          body: [
            'You can restrict or delete cookies through your browser settings.',
            'Disabling some cookies may affect features such as login, saved preferences, or forms.',
          ],
        },
        {
          title: '5. Changes to this policy',
          body: [
            'This policy may be updated from time to time. Changes will be posted on this page with an updated date.',
          ],
        },
      ];

  return (
    <div className="app-shell" data-auto-motion>
      <section className="relative overflow-hidden py-12 sm:py-16">
        <img
          src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1000&fit=crop"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-stone-900/60" />
        <div className="page-wrap relative">
          <div className="max-w-4xl text-white">
            <p className="section-kicker !text-white/70">{isMk ? 'Правно' : 'Legal'}</p>
            <h1 className="mt-2 text-5xl font-semibold sm:text-6xl">
              {isMk ? 'Политика за колачиња' : 'Cookie Policy'}
            </h1>
            <p className="mt-4 text-sm leading-7 text-white/82 sm:text-base">
              {isMk
                ? 'Последно ажурирање: 25 февруари 2026. Оваа страница објаснува како WedMKD користи колачиња и слични технологии.'
                : 'Last updated: February 25, 2026. This page explains how WedMKD uses cookies and similar technologies.'}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to="/privacy" className="btn-secondary bg-white/95">
                {isMk ? 'Политика за приватност' : 'Privacy Policy'}
              </Link>
              <Link to="/terms" className="btn-secondary bg-white/95">
                {isMk ? 'Услови за користење' : 'Terms of Service'}
              </Link>
              <Link to="/contact" className="btn-primary">
                {isMk ? 'Контакт' : 'Contact'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 pb-16 sm:py-16 sm:pb-20">
        <div className="page-wrap">
          <div className="rounded-[24px] border border-stone-200/85 bg-white p-5 shadow-[0_14px_28px_rgba(28,18,13,0.06)] sm:p-6">
            <div className="space-y-6">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-3xl font-semibold text-stone-900">{section.title}</h2>
                  <div className="mt-2 space-y-2">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-7 text-stone-600">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <section>
                <h2 className="text-3xl font-semibold text-stone-900">
                  {isMk ? '6. Контакт' : '6. Contact'}
                </h2>
                <p className="mt-2 text-sm leading-7 text-stone-600">
                  {isMk
                    ? 'За прашања во врска со колачиња и поставки, контактирајте нè на '
                    : 'For questions related to cookies and settings, contact us at '}
                  <a href="mailto:hello@wedmkd.com" className="font-medium text-stone-800 hover:underline">
                    hello@wedmkd.com
                  </a>{' '}
                  {isMk ? 'или преку ' : 'or via the '}
                  <Link to="/contact" className="font-medium text-stone-800 hover:underline">
                    {isMk ? 'Контакт страница' : 'Contact page'}
                  </Link>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

