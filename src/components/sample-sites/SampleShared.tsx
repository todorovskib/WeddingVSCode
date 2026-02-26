import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  className?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type LightboxState =
  | {
      items: GalleryItem[];
      index: number;
    }
  | null;

const DEFAULT_IMG_FALLBACK =
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80';

export const sampleSectionMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: 'easeOut' as const },
};

export function onSampleImageError(event: React.SyntheticEvent<HTMLImageElement>) {
  const el = event.currentTarget;
  if (el.dataset.fallbackApplied === '1') return;
  el.dataset.fallbackApplied = '1';
  el.src = DEFAULT_IMG_FALLBACK;
}

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export const SampleLightbox: React.FC<{
  state: LightboxState;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ state, onClose, onNext, onPrev }) => {
  useEffect(() => {
    if (!state) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNext();
      if (event.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [state, onClose, onNext, onPrev]);

  if (!state) return null;
  const current = state.items[state.index];

  return (
    <AnimatePresence>
      <motion.div
        className="sample-lightbox-backdrop fixed inset-0 z-[120] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Image preview"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-black/50"
          onClick={(event) => event.stopPropagation()}
        >
          <img
            src={current.src}
            alt={current.alt}
            onError={onSampleImageError}
            className="max-h-[75vh] w-full object-cover"
          />
          <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-black/55 px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">{current.caption}</p>
              <p className="text-xs text-white/70">
                {state.index + 1} / {state.items.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={onPrev} className="sample-btn sample-btn-secondary">
                Prev
              </button>
              <button type="button" onClick={onNext} className="sample-btn sample-btn-secondary">
                Next
              </button>
              <button type="button" onClick={onClose} className="sample-btn sample-btn-primary">
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export const SectionTitle: React.FC<{ kicker?: string; title: string; body?: string; light?: boolean }> = ({
  kicker,
  title,
  body,
  light,
}) => (
  <div className={cx('max-w-3xl', light && 'text-white')}>
    {kicker ? (
      <p className={cx('text-xs font-semibold uppercase tracking-[0.18em]', light ? 'text-white/75' : 'text-stone-500')}>
        {kicker}
      </p>
    ) : null}
    <h2 className={cx('mt-2 text-3xl font-semibold sm:text-4xl', light ? 'text-white' : 'text-stone-900')}>{title}</h2>
    {body ? (
      <p className={cx('mt-3 text-sm leading-7 sm:text-base', light ? 'text-white/82' : 'text-stone-600')}>{body}</p>
    ) : null}
  </div>
);

export const AnchorNav: React.FC<{
  className: string;
  brand: React.ReactNode;
  anchors: Array<{ href: string; label: string }>;
  right?: React.ReactNode;
}> = ({ className, brand, anchors, right }) => (
  <header className={className}>
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
      <div className="min-w-0">{brand}</div>
      <nav className="hidden items-center gap-5 lg:flex" aria-label="Sample page sections">
        {anchors.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="sample-anchor-link text-sm font-semibold opacity-80 transition hover:opacity-100"
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="flex shrink-0 items-center gap-2">{right}</div>
    </div>
  </header>
);

export const SampleFooter: React.FC<{ title: string; subtitle: string; toneClass?: string }> = ({
  title,
  subtitle,
  toneClass,
}) => {
  const { pathFor, t } = useI18n();

  return (
    <div className="mt-12 px-4 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="border border-stone-300/80 bg-[#f5efe3] p-4 shadow-[0_12px_24px_rgba(28,18,13,0.06)]" style={{ borderRadius: 8 }}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className={cx('min-w-0', toneClass)}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">{t('WedMKD sample controls (not part of the couple page)')}</p>
              <p className="mt-2 text-base font-semibold">{t(title)}</p>
              <p className="mt-1 text-sm opacity-80">{t(subtitle)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to={pathFor('/pricing')} className="sample-btn sample-btn-secondary">
                {t('Back to pricing')}
              </Link>
              <Link to={pathFor('/contact')} className="sample-btn sample-btn-primary">
                {t('Contact WedMKD')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GalleryGrid: React.FC<{
  items: GalleryItem[];
  onOpen: (items: GalleryItem[], index: number) => void;
  cardClass: string;
}> = ({ items, onOpen, cardClass }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((item, index) => (
      <button
        key={`${item.src}-${index}`}
        type="button"
        onClick={() => onOpen(items, index)}
        className={cx('group relative overflow-hidden text-left', cardClass, item.className)}
      >
        <img
          src={item.src}
          alt={item.alt}
          onError={onSampleImageError}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent opacity-90" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <p className="text-xs uppercase tracking-[0.12em] text-white/75">Gallery</p>
          <p className="mt-1 text-sm font-semibold sm:text-base">{item.caption}</p>
        </div>
      </button>
    ))}
  </div>
);

export const FaqAccordion: React.FC<{ items: FaqItem[]; panelClass: string }> = ({ items, panelClass }) => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const open = index === openIndex;
        return (
          <div key={item.question} className={cx(panelClass, 'overflow-hidden')}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : index)}
              className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left sm:px-5"
              aria-expanded={open}
            >
              <span className="text-sm font-semibold sm:text-base">{item.question}</span>
              <ChevronDown className={cx('h-4 w-4 shrink-0 transition', open && 'rotate-180')} />
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="px-4 pb-4 text-sm leading-6 opacity-85 sm:px-5">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export const DemoRsvpForm: React.FC<{
  panelClass: string;
  accentClass?: string;
  extraFields?: React.ReactNode;
  submitLabel?: string;
}> = ({ panelClass, accentClass, extraFields, submitLabel = 'Send RSVP' }) => {
  const [submitted, setSubmitted] = useState(false);
  const [attending, setAttending] = useState<'yes' | 'no' | 'maybe'>('yes');

  return (
    <div className={cx(panelClass, 'p-4 sm:p-5')}>
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className={cx('h-4 w-4', accentClass || 'text-rose-600')} />
        <p className="text-sm font-semibold">RSVP</p>
      </div>
      {submitted ? (
        <div className="rounded-xl border border-emerald-200/70 bg-emerald-50/85 p-4 text-sm text-emerald-900">
          RSVP submitted (demo only). In a real project this connects to the guest list, RSVP states, and follow-up messages.
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <div>
            <label className="sample-label" htmlFor="sample-rsvp-name">
              Guest name
            </label>
            <input id="sample-rsvp-name" type="text" className="sample-input" placeholder="Elena Petrovska" required />
          </div>
          <div>
            <label className="sample-label" htmlFor="sample-rsvp-email">
              Email
            </label>
            <input id="sample-rsvp-email" type="email" className="sample-input" placeholder="guest@example.com" required />
          </div>
          <div>
            <span className="sample-label">Attendance</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
                { value: 'maybe', label: 'Maybe' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setAttending(option.value as 'yes' | 'no' | 'maybe')}
                  className={cx(
                    'rounded-xl border px-3 py-2 text-sm font-semibold transition',
                    attending === option.value
                      ? 'border-stone-900 bg-stone-900 text-white'
                      : 'border-stone-300/80 bg-white/80 text-stone-700 hover:border-stone-400'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          {extraFields}
          <div>
            <label className="sample-label" htmlFor="sample-rsvp-note">
              Message
            </label>
            <textarea
              id="sample-rsvp-note"
              className="sample-textarea"
              rows={3}
              placeholder="We can't wait to celebrate with you."
            />
          </div>
          <button type="submit" className="sample-btn sample-btn-primary w-full">
            {submitLabel}
          </button>
        </form>
      )}
    </div>
  );
};
