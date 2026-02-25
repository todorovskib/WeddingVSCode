import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SELECTOR = [
  '[data-auto-motion] section',
  '[data-auto-motion] article',
  '[data-auto-motion] .card-surface',
  '[data-auto-motion] .card-surface-strong',
  '[data-auto-motion] .editorial-card',
  '[data-auto-motion] .image-frame',
].join(', ');

export const NaturalScrollMotion: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(
      (el) => !el.closest('.table-shell')
    );

    if (!nodes.length) return;

    nodes.forEach((node, index) => {
      node.classList.add('auto-reveal');
      node.style.transitionDelay = `${Math.min(index % 8, 5) * 55}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add('is-visible');
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );

    nodes.forEach((node) => {
      if (node.getBoundingClientRect().top < window.innerHeight * 0.9) {
        node.classList.add('is-visible');
      } else {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, [location.pathname, location.search]);

  return null;
};

