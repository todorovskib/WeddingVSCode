import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SampleFooter, onSampleImageError, sampleSectionMotion } from './SampleShared';
import { useI18n } from '../../context/I18nContext';

export const BasicSampleSite: React.FC = () => {
  const { t } = useI18n();
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');

  const submitRsvp = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => {
      setSubmitted(false);
      setRsvpOpen(false);
      setGuestName('');
      setAttending('yes');
    }, 1400);
  };

  return (
    <div className="sample-site-root basic-page sample-font-modern text-[#2a2019]">
      <section className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[#f3eee7]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(212,120,105,0.12),transparent_42%),radial-gradient(circle_at_86%_14%,rgba(196,157,73,0.10),transparent_38%),radial-gradient(circle_at_78%_84%,rgba(160,108,139,0.10),transparent_40%)]" />

        <img
          src="https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1200&q=80"
          alt=""
          onError={onSampleImageError}
          className="pointer-events-none absolute left-0 top-0 h-[48%] w-[44%] object-cover opacity-22 blur-[1px]"
          style={{ clipPath: 'ellipse(78% 68% at 20% 20%)' }}
        />
        <img
          src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80"
          alt=""
          onError={onSampleImageError}
          className="pointer-events-none absolute right-0 top-0 h-[54%] w-[44%] object-cover opacity-20 blur-[1px]"
          style={{ clipPath: 'ellipse(82% 70% at 80% 18%)' }}
        />
        <img
          src="https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad1?auto=format&fit=crop&w=1200&q=80"
          alt=""
          onError={onSampleImageError}
          className="pointer-events-none absolute bottom-0 left-0 h-[46%] w-[42%] object-cover opacity-20 blur-[1px]"
          style={{ clipPath: 'ellipse(75% 70% at 22% 86%)' }}
        />
        <img
          src="https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&w=1200&q=80"
          alt=""
          onError={onSampleImageError}
          className="pointer-events-none absolute bottom-0 right-0 h-[48%] w-[44%] object-cover opacity-22 blur-[1px]"
          style={{ clipPath: 'ellipse(78% 72% at 82% 86%)' }}
        />

        <div className="relative mx-auto flex min-h-[92vh] w-full max-w-4xl items-center justify-center">
          <motion.div
            {...sampleSectionMotion}
            className="relative w-full max-w-[34rem] border border-[#e8dbc8]/85 bg-white/94 px-6 py-8 shadow-[0_28px_60px_rgba(35,23,17,0.14)] sm:px-10 sm:py-10"
            style={{ borderRadius: 8 }}
          >
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#d2b497] to-transparent" />
            <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d2b497] to-transparent" />

            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b58f73]">Wedding Invitation</p>
              <p className="mt-6 text-sm leading-8 text-[#b29680] sm:text-base">
                We would be honored to celebrate our love and joy with you.
                <br />
                With great pleasure, we invite you to our wedding day.
              </p>

              <div className="mt-8">
                <p className="sample-font-scriptlike text-5xl leading-none text-[#b34f5c] sm:text-6xl">Elina</p>
                <p className="mt-1 text-2xl text-[#b89972]">&amp;</p>
                <p className="sample-font-scriptlike text-5xl leading-none text-[#b34f5c] sm:text-6xl">Oliver</p>
              </div>

              <div className="mt-8 space-y-1 text-[#bc9d86]">
                <p className="text-base font-semibold tracking-[0.06em]">Restaurant Park by Ragusa</p>
                <p className="text-sm font-semibold uppercase tracking-[0.16em]">Saturday · 18 October 2026</p>
                <p className="text-sm uppercase tracking-[0.16em]">Guest arrival · 18:30</p>
                <div className="pt-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Restaurant+Park+Skopje"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center border border-[#d9c1ac] bg-white/92 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8c5a45] transition hover:bg-white"
                    style={{ borderRadius: 6 }}
                  >
                    {t('Open on map')}
                  </a>
                </div>
              </div>

              <div className="mx-auto mt-7 grid max-w-xs grid-cols-2 gap-4 text-[#b29680]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em]">Family</p>
                  <p className="mt-1 text-lg font-semibold">Simjanoski</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em]">Family</p>
                  <p className="mt-1 text-lg font-semibold">Donevi</p>
                </div>
              </div>

              <p className="mt-7 text-sm leading-7 text-[#bc9d86]">
                Please confirm your presence by 1 October.
              </p>

              <div className="mt-6">
                <button type="button" onClick={() => setRsvpOpen(true)} className="sample-btn sample-btn-primary !px-6">
                  Confirm RSVP
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {rsvpOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 p-4"
            onClick={() => setRsvpOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Basic RSVP"
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md border border-[#e2d5c6] bg-white p-5 shadow-[0_20px_40px_rgba(18,12,9,0.18)]"
              style={{ borderRadius: 8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b58f73]">RSVP</p>
                  <h2 className="mt-2 sample-font-classic text-2xl text-[#2a2019]">Elina & Oliver</h2>
                </div>
                <button type="button" onClick={() => setRsvpOpen(false)} className="sample-btn sample-btn-secondary !px-3 !py-2 text-xs">
                  Close
                </button>
              </div>

              {submitted ? (
                <div className="mt-4 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900" style={{ borderRadius: 8 }}>
                  RSVP submitted (demo).
                </div>
              ) : (
                <form onSubmit={submitRsvp} className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="basic-rsvp-name" className="sample-label">Guest name</label>
                    <input id="basic-rsvp-name" className="sample-input" value={guestName} onChange={(e) => setGuestName(e.target.value)} required />
                  </div>
                  <div>
                    <span className="sample-label">Attendance</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button type="button" onClick={() => setAttending('yes')} className={attending === 'yes' ? 'sample-btn sample-btn-primary w-full' : 'sample-btn sample-btn-secondary w-full'}>
                        Attending
                      </button>
                      <button type="button" onClick={() => setAttending('no')} className={attending === 'no' ? 'sample-btn sample-btn-primary w-full' : 'sample-btn sample-btn-secondary w-full'}>
                        Unable to attend
                      </button>
                    </div>
                  </div>
                  <button type="submit" className="sample-btn sample-btn-primary w-full">Send RSVP</button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SampleFooter title="Basic sample controls" subtitle="This control bar belongs to WedMKD and is not part of the client invitation page." toneClass="text-stone-800" />
    </div>
  );
};

