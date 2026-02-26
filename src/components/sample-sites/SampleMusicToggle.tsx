import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Music2, Pause, Play, Volume2, VolumeX } from 'lucide-react';

const STORAGE_KEY = 'wedmkd_sample_music';
const MUSIC_SRC = `${import.meta.env.BASE_URL}audio/wedmkd-theme.wav`;

type PlayerState = 'idle' | 'playing' | 'paused' | 'blocked';

export const SampleMusicToggle: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<PlayerState>('idle');
  const [ready, setReady] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const label = useMemo(() => {
    if (state === 'playing') return 'Music on';
    if (state === 'blocked') return 'Play music';
    if (state === 'paused') return 'Music off';
    return 'Music';
  }, [state]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.14;
    audio.preload = 'auto';
    audio.load();

    const onCanPlay = () => setReady(true);
    const onLoadedMeta = () => setReady(true);
    const onEnded = () => setState('paused');
    const onError = () => setState('blocked');

    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('loadedmetadata', onLoadedMeta);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'off') {
      setState('paused');
    } else {
      const tryAutoplay = async () => {
        try {
          await audio.play();
          setState('playing');
        } catch {
          setState('blocked');
        }
      };
      void tryAutoplay();
    }

    return () => {
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('loadedmetadata', onLoadedMeta);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!ready) audio.load();

    if (!audio.paused) {
      audio.pause();
      setState('paused');
      window.localStorage.setItem(STORAGE_KEY, 'off');
      return;
    }

    try {
      await audio.play();
      setState('playing');
      window.localStorage.setItem(STORAGE_KEY, 'on');
    } catch {
      setState('blocked');
    }
  };

  const hideControl = () => {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
      setState('paused');
      window.localStorage.setItem(STORAGE_KEY, 'off');
    }
    setDismissed(true);
  };

  if (dismissed) {
    return <audio ref={audioRef} src={MUSIC_SRC} aria-hidden />;
  }

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} aria-hidden />
      <div className="sample-music-toggle fixed bottom-4 right-4 z-[999] sm:bottom-5 sm:right-5">
        <div
          className="flex items-center gap-2 border border-white/60 bg-white/85 p-1.5 shadow-[0_12px_28px_rgba(22,16,12,0.14)] backdrop-blur"
          style={{ borderRadius: 10 }}
        >
          <button
            type="button"
            onClick={togglePlayback}
            className="inline-flex h-10 items-center gap-2 border border-stone-300/90 bg-white px-3 text-sm font-semibold text-stone-800 transition hover:border-rose-300 hover:text-rose-700"
            style={{ borderRadius: 8 }}
            aria-pressed={state === 'playing'}
            aria-label={label}
            title={label}
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 text-rose-600">
              <Music2 className="h-3.5 w-3.5" />
            </span>
            <span className="hidden sm:inline">{label}</span>
            {state === 'playing' ? (
              <Volume2 className="h-4 w-4" />
            ) : state === 'blocked' ? (
              <Play className="h-4 w-4" />
            ) : state === 'paused' ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Pause className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={hideControl}
            className="inline-flex h-10 w-10 items-center justify-center border border-stone-300/90 bg-white text-stone-600 transition hover:text-stone-900"
            style={{ borderRadius: 8 }}
            aria-label="Hide music control"
            title="Hide music control"
          >
            <span aria-hidden>&times;</span>
          </button>
        </div>
      </div>
    </>
  );
};

