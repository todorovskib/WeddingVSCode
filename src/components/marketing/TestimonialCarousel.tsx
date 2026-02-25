import React, { useEffect, useState } from 'react';
import { useI18n } from '../../context/I18nContext';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  metric?: string;
}

interface TestimonialCarouselProps {
  title: string;
  subtitle?: string;
  items: Testimonial[];
  accentClass?: string;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  title,
  subtitle,
  items,
  accentClass = 'from-rose-400 to-fuchsia-600',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useI18n();

  useEffect(() => {
    if (items.length < 2) return;
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [items.length]);

  const active = items[activeIndex];

  return (
    <section className="card-surface-strong overflow-hidden p-5 sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="section-kicker">{t('Reviews & Social Proof')}</p>
          <h2 className="mt-2 text-4xl font-semibold text-stone-900">{t(title)}</h2>
          {subtitle && <p className="mt-2 text-sm leading-6 text-stone-600">{t(subtitle)}</p>}

          <div className={`mt-5 rounded-2xl bg-gradient-to-r ${accentClass} p-[1px]`}>
            <div className="rounded-2xl bg-white/95 p-5">
              <p className="text-lg leading-8 text-stone-700">"{t(active.quote)}"</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-stone-900">{t(active.name)}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-stone-500">{t(active.role)}</p>
                </div>
                {active.metric && <span className="badge-pill">{t(active.metric)}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {items.map((item, index) => {
            const activeCard = index === activeIndex;
            return (
              <button
                key={`${item.name}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  activeCard
                    ? 'border-stone-300 bg-white shadow'
                    : 'border-stone-200/80 bg-white/75 hover:bg-white/90'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={activeCard ? 'glow-dot mt-1.5' : 'mt-1.5 inline-block h-2 w-2 rounded-full bg-stone-300'} />
                  <div>
                    <p className="font-semibold text-stone-900">{t(item.name)}</p>
                    <p className="text-xs uppercase tracking-[0.15em] text-stone-500">{t(item.role)}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-stone-600">{t(item.quote)}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
