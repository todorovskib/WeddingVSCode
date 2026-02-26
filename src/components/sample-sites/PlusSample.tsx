import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, Clock3, Heart, MapPin } from 'lucide-react';
import { SampleFooter } from './SampleShared';

type PlusRsvpFormState = {
  name: string;
  attending: boolean;
  message: string;
};

const FloatingHeart: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <motion.div
    className="absolute text-rose-600"
    initial={{ x, y, scale: 0, opacity: 0 }}
    animate={{
      y: y + 100,
      opacity: [0, 1, 0],
      scale: [0, 1.5, 1],
    }}
    transition={{ duration: 0.5, ease: 'easeIn' }}
    style={{ zIndex: 60 }}
  >
    <Heart size={16} fill="currentColor" />
  </motion.div>
);

const PlusNavbar: React.FC<{ names: string }> = ({ names }) => {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const createHearts = (event: React.MouseEvent) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const numHearts = 8;
    const newHearts = Array.from({ length: numHearts }, (_, i) => ({
      id: Date.now() + i,
      x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 40,
      y: rect.top + rect.height / 2,
    }));
    setHearts((prev) => [...prev, ...newHearts]);
    window.setTimeout(() => {
      setHearts((prev) => prev.filter((heart) => !newHearts.find((h) => h.id === heart.id)));
    }, 500);
  };

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: 'rgba(255, 253, 247, 0.92)',
        backdropFilter: 'blur(10px)',
      }}
      transition={{ duration: 0.2 }}
      className="plus-fixed-nav"
    >
      {hearts.map((heart) => (
        <FloatingHeart key={heart.id} x={heart.x} y={heart.y} />
      ))}

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex-1" />
        <motion.div className="flex items-center" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <button type="button" className="flex items-center group cursor-pointer" onClick={createHearts}>
            <Heart className="h-7 w-7 text-rose-600 transition-transform group-hover:scale-110" />
            <span className="ml-2 sample-font-scriptlike text-2xl tracking-wide text-rose-700">{names}</span>
          </button>
        </motion.div>
        <div className="flex-1" />
      </div>
    </motion.nav>
  );
};

const PlusEnvelopeIntro: React.FC<{ guestName?: string; onOpen: () => void }> = ({ guestName = '', onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const formattedGuestName = useMemo(() => {
    if (!guestName) return 'Dear Guest';
    return guestName;
  }, [guestName]);

  const handleEnvelopeClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    window.setTimeout(() => setShowLetter(true), 500);
    window.setTimeout(onOpen, 1900);
  };

  return (
    <div className="plus-envelope-stage flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-700/65">Plus Tier Sample</p>
        <h1 className="sample-font-romantic mt-3 text-4xl text-rose-900 sm:text-5xl">Irina & Andrej</h1>
        <p className="mt-2 text-sm text-rose-900/70">Click the envelope to open the invitation</p>

        <div
          className="relative mx-auto mt-7 w-full max-w-lg cursor-pointer aspect-[4/3]"
          onClick={handleEnvelopeClick}
          style={{ perspective: '1000px' }}
        >
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="absolute inset-0">
            <AnimatePresence>
              {showLetter && (
                <motion.div
                  className="absolute inset-0 bg-white rounded-lg shadow-lg"
                  initial={{ y: 0, opacity: 0, zIndex: 0 }}
                  animate={{
                    y: -200,
                    opacity: 1,
                    zIndex: 200,
                    transition: { duration: 0.5, ease: 'easeOut' },
                  }}
                  exit={{ y: 0, opacity: 0 }}
                  style={{
                    transformOrigin: 'bottom',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(225, 29, 72, 0.1)',
                  }}
                >
                  <div className="absolute inset-0 p-8 flex items-center justify-center bg-white rounded-lg">
                    <div className="text-center space-y-6">
                      <h2 className="text-4xl sample-font-romantic text-rose-600 tracking-wide">Irina & Andrej</h2>
                      <p className="text-rose-500 sample-font-scriptlike text-2xl italic">Save the date</p>
                      <div className="text-2xl text-rose-700 sample-font-scriptlike">September 14, 2026</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
              className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: 100 }}
            >
              <div className="relative w-28 h-28">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-rose-700 to-rose-600 rounded-full shadow-[0_10px_15px_-3px_rgba(0,0,0,0.2),inset_0_4px_6px_-2px_rgba(255,255,255,0.3)] rotate-3"
                  animate={isOpening ? { scale: 0.8, y: -50, opacity: 0, rotate: -15 } : {}}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                >
                  <div className="absolute inset-3 border-4 border-rose-500/50 rounded-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-3xl sample-font-romantic text-rose-50 tracking-wider">I&amp;A</div>
                  </div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-rose-500/30 via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:100px_100px]" />
                  <div className="absolute -bottom-3 left-1/4 w-3 h-6 bg-gradient-to-b from-rose-700 to-rose-600 rounded-b-full rotate-6" />
                  <div className="absolute -bottom-4 left-1/2 w-3 h-7 bg-gradient-to-b from-rose-700 to-rose-600 rounded-b-full -rotate-3" />
                  <div className="absolute -bottom-3 right-1/3 w-3 h-5 bg-gradient-to-b from-rose-700 to-rose-600 rounded-b-full rotate-12" />
                  <div className="absolute -bottom-2 left-2/3 w-2 h-4 bg-gradient-to-b from-rose-700 to-rose-600 rounded-b-full -rotate-6" />
                  <div className="absolute -bottom-3 right-1/4 w-2 h-5 bg-gradient-to-b from-rose-700 to-rose-600 rounded-b-full rotate-9" />
                </motion.div>
              </div>
            </motion.div>

            <div className="absolute inset-0 bg-white rounded-lg shadow-2xl overflow-hidden">
              <div className="absolute inset-0 border-[3px] border-rose-200 rounded-lg">
                <div className="absolute inset-0 opacity-5">
                  <div className="h-full w-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-rose-300 via-transparent to-transparent bg-[length:20px_20px]" />
                </div>
              </div>
            </div>

            <div
              className="absolute left-0 top-0 w-[50%] h-full origin-left"
              style={{
                transform: isOpening ? 'rotateY(90deg)' : 'rotateY(0deg)',
                transition: 'transform 1s ease-in-out',
                transformStyle: 'preserve-3d',
                background: 'linear-gradient(to right, #fff 0%, #fff5f5 100%)',
                clipPath: 'polygon(0 0, 100% 15%, 100% 85%, 0 100%)',
                zIndex: 20,
              }}
            >
              <div className="absolute inset-0 border-[3px] border-rose-200" />
            </div>

            <div
              className="absolute right-0 top-0 w-[50%] h-full origin-right"
              style={{
                transform: isOpening ? 'rotateY(-90deg)' : 'rotateY(0deg)',
                transition: 'transform 1s ease-in-out',
                transformStyle: 'preserve-3d',
                background: 'linear-gradient(to left, #fff 0%, #fff5f5 100%)',
                clipPath: 'polygon(0 15%, 100% 0, 100% 100%, 0 85%)',
                zIndex: 20,
              }}
            >
              <div className="absolute inset-0 border-[3px] border-rose-200" />
            </div>

            <AnimatePresence>
              {!isOpening && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-end justify-center pb-16 z-30"
                >
                  <div className="text-center space-y-6 relative w-full">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="space-y-4"
                    >
                      <div className="text-4xl sample-font-romantic text-rose-600 tracking-wide">{formattedGuestName}</div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="absolute inset-x-0 top-0 h-[60%] origin-top z-30"
              initial={{ rotateX: 0, backgroundColor: '#fff' }}
              animate={isOpening ? { rotateX: -180 } : {}}
              transition={{ duration: 1, ease: 'easeInOut' }}
              style={{
                transformStyle: 'preserve-3d',
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              }}
            >
              <div className="absolute inset-0 border-[3px] border-rose-200" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-rose-500 text-sm sample-font-scriptlike italic z-40"
            >
              Click to open
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export const PlusSampleSite: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const [formData, setFormData] = useState<PlusRsvpFormState>({
    name: '',
    attending: false,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (!opened) {
    return <PlusEnvelopeIntro onOpen={() => setOpened(true)} />;
  }

  return (
    <div className="sample-site-root bg-white text-gray-900">
      <PlusNavbar names="Irina & Andrej" />

      <div>
        <div
          className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 relative"
          style={{
            backgroundImage: 'url(\"https://raw.githubusercontent.com/todorovskib/css-exercises/refs/heads/main/irinanadrej.jpg\")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white relative z-10 space-y-12"
          >
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl sample-font-romantic mb-2 text-rose-400">Irina & Andrej</h1>
              <p className="text-xl sm:text-2xl sample-font-scriptlike">Are getting married!</p>
              <p className="text-lg sm:text-xl sample-font-scriptlike">September 14, 2026</p>
              <p className="text-base sm:text-lg sample-font-scriptlike">Restaurant Park, Skopje</p>
            </div>
          </motion.div>
        </div>

        <section className="py-16 bg-gradient-to-b from-rose-50 to-white relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center px-4 space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl sample-font-scriptlike italic text-rose-600">
              Please join us to share our joy and celebration
            </h2>
            <p className="text-lg sm:text-xl sample-font-scriptlike text-gray-700">
              Dinner, dancing, and memories to last a lifetime!
            </p>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
          </motion.div>
        </section>

        <section className="py-12 sm:py-16 px-4 bg-gradient-to-br from-[#fff9f5] to-[#fff3ec]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-center"
            >
              <div className="p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 border border-rose-100">
                <CalendarDays className="w-6 h-6 mx-auto mb-3 text-rose-600" />
                <h3 className="text-lg font-semibold mb-1">The Date</h3>
                <p className="text-sm">September 14, 2026</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 border border-rose-100">
                <Clock3 className="w-6 h-6 mx-auto mb-3 text-rose-600" />
                <h3 className="text-lg font-semibold mb-1">Reception Time</h3>
                <p className="text-sm">18:00 - 18:30</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 border border-rose-100">
                <MapPin className="w-6 h-6 mx-auto mb-3 text-rose-600" />
                <h3 className="text-lg font-semibold mb-1">The Venue</h3>
                <p className="text-sm">Restaurant Park<br />Skopje, Macedonia</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 sm:py-16 px-4 bg-gradient-to-br from-[#fff3ec] to-[#fff9f5]" id="rsvp">
          <div className="max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-6 rounded-lg shadow-lg border border-rose-200"
            >
              <h2 className="text-2xl sample-font-romantic text-center mb-6 text-rose-600">RSVP</h2>
              {submitted ? (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 text-center">
                  RSVP submitted successfully (sample demo).
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm mb-1">Name &amp; Surname</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-rose-200 rounded-lg focus:ring-rose-500 focus:border-rose-500 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={formData.attending}
                        onChange={(e) => setFormData({ ...formData, attending: e.target.checked })}
                        className="rounded text-rose-600 focus:ring-rose-500"
                      />
                      <span>I will be attending</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm mb-1">Message (Optional)</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-rose-200 rounded-lg focus:ring-rose-500 focus:border-rose-500 bg-white"
                      rows={3}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-rose-600 text-white py-2 px-4 text-sm rounded-lg hover:bg-rose-700 transition duration-200 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Send RSVP'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </div>

      <SampleFooter
        title="Plus sample controls"
        subtitle="This control bar belongs to WedMKD and is not part of the client wedding page."
        toneClass="text-rose-950 bg-white"
      />
    </div>
  );
};
