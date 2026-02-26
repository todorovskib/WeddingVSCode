import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Music2, Play, Volume2, VolumeX } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { stripLocaleFromPathname } from '../../i18n/localePath';

const STORAGE_KEY = 'wedmkd_public_music';
const AUDIO_SRC = `${import.meta.env.BASE_URL}audio/wedmkd-main-upbeat.wav`;

type PlayerState = 'idle' | 'playing' | 'paused' | 'blocked';

export const PublicMusicToggle: React.FC = () => {
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<PlayerState>('idle');
  const [hiddenByUser, setHiddenByUser] = useState(false);

  const basePath = stripLocaleFromPathname(location.pathname);
  const hideOnRoute =
    basePath === '/login' ||
    basePath === '/signup' ||
    basePath.startsWith('/dashboard') ||
    basePath.startsWith('/wedding/') ||
    basePath.startsWith('/samples/');

  const label = useMemo(() => {
    if (state === 'playing') return 'Music on';
    if (state === 'blocked') return 'Play music';
    if (state === 'paused') return 'Music off';
    return 'Music';
  }, [state]);

  useEffect(() => {
    if (hideOnRoute) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.11;
    audio.preload = 'auto';
    audio.load();

    const onPlay = () => setState('playing');
    const onPause = () => setState('paused');
    const onError = () => setState('blocked');

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'hidden') {
      setHiddenByUser(true);
      setState('paused');
    } else if (stored === 'off') {
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
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
    };
  }, [hideOnRoute]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (hideOnRoute) {
      if (!audio.paused) audio.pause();
      setHiddenByUser(false);
      return;
    }
  }, [hideOnRoute]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

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
      if (hiddenByUser) {
        setHiddenByUser(false);
      }
    } catch {
      setState('blocked');
    }
  };

  const hideControl = () => {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
    }
    setState('paused');
    setHiddenByUser(true);
    window.localStorage.setItem(STORAGE_KEY, 'hidden');
  };

  if (hideOnRoute) return null;

  if (hiddenByUser) {
    return (
      <>
        <audio ref={audioRef} src={AUDIO_SRC} aria-hidden />
        <button
          type="button"
          onClick={() => {
            setHiddenByUser(false);
            window.localStorage.setItem(STORAGE_KEY, state === 'playing' ? 'on' : 'off');
          }}
          className="public-music-toggle public-music-toggle-mini"
          aria-label="Show music control"
          title="Show music control"
        >
          <Music2 className="h-4 w-4" />
        </button>
      </>
    );
  }

  return (
    <>
      <audio ref={audioRef} src={AUDIO_SRC} aria-hidden />
      <div className="public-music-toggle" role="group" aria-label="Background music controls">
        <button
          type="button"
          onClick={togglePlayback}
          className="public-music-btn"
          aria-pressed={state === 'playing'}
          aria-label={label}
          title={label}
        >
          <span className="public-music-btn__icon" aria-hidden>
            <Music2 className="h-3.5 w-3.5" />
          </span>
          <span className="hidden sm:inline">{label}</span>
          {state === 'playing' ? (
            <Volume2 className="h-4 w-4" aria-hidden />
          ) : state === 'blocked' ? (
            <Play className="h-4 w-4" aria-hidden />
          ) : (
            <VolumeX className="h-4 w-4" aria-hidden />
          )}
        </button>
        <button
          type="button"
          onClick={hideControl}
          className="public-music-close"
          aria-label="Hide music control"
          title="Hide music control"
        >
          <span aria-hidden>&times;</span>
        </button>
      </div>
    </>
  );
};
