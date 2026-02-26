import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';
import { translateText } from '../i18n/translations';

type LocalizedText = {
  en: string;
  mk: string;
};

type PartnerPreview = {
  name: string;
  note: LocalizedText;
  image: string;
};

type CollaborationSection = {
  id: string;
  navLabel: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  toneClass: string;
  chips: LocalizedText[];
  partners: PartnerPreview[];
  ctaHref?: string;
  ctaLabel?: LocalizedText;
};

const heroImage =
  'https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1100&fit=crop';

const sections: CollaborationSection[] = [
  {
    id: 'venues',
    navLabel: { en: 'Venues & Villas', mk: 'Ð ÐµÑÑ‚Ð¾Ñ€Ð°Ð½Ð¸ Ð¸ Ð²Ð¸Ð»Ð¸' },
    title: { en: 'Exclusive restaurants and villas', mk: 'Ð•ÐºÑÐºÐ»ÑƒÐ·Ð¸Ð²Ð½Ð¸ Ñ€ÐµÑÑ‚Ð¾Ñ€Ð°Ð½Ð¸ Ð¸ Ð²Ð¸Ð»Ð¸' },
    description: {
      en: 'Curated venues for intimate dinners and large celebrations, chosen for atmosphere, service, and photo-ready interiors.',
      mk: 'ÐšÑƒÑ€Ð¸Ñ€Ð°Ð½Ð¸ Ð»Ð¾ÐºÐ°Ñ†Ð¸Ð¸ Ð·Ð° Ð¸Ð½Ñ‚Ð¸Ð¼Ð½Ð¸ Ð²ÐµÑ‡ÐµÑ€Ð¸ Ð¸ Ð³Ð¾Ð»ÐµÐ¼Ð¸ Ð¿Ñ€Ð¾ÑÐ»Ð°Ð²Ð¸, Ð¸Ð·Ð±Ñ€Ð°Ð½Ð¸ Ð¿Ð¾ Ð°Ð¼Ð±Ð¸ÐµÐ½Ñ‚, ÑƒÑÐ»ÑƒÐ³Ð° Ð¸ Ñ„Ð¾Ñ‚Ð¾Ð³ÐµÐ½Ð¸Ñ‡ÐµÐ½ ÐµÐ½Ñ‚ÐµÑ€Ð¸ÐµÑ€.',
    },
    image:
      'https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&fit=crop',
    imageAlt: { en: 'Elegant wedding venue', mk: 'Ð•Ð»ÐµÐ³Ð°Ð½Ñ‚Ð½Ð° ÑÐ²Ð°Ð´Ð±ÐµÐ½Ð° Ð»Ð¾ÐºÐ°Ñ†Ð¸Ñ˜Ð°' },
    toneClass: 'from-rose-100/65 via-white/30 to-amber-100/55',
    chips: [
      { en: 'Indoor & garden options', mk: 'Ð’Ð½Ð°Ñ‚Ñ€ÐµÑˆÐ½Ð¸ Ð¸ Ð³Ñ€Ð°Ð´Ð¸Ð½Ð°Ñ€ÑÐºÐ¸ Ð¾Ð¿Ñ†Ð¸Ð¸' },
      { en: 'Capacity planning', mk: 'ÐŸÐ»Ð°Ð½Ð¸Ñ€Ð°ÑšÐµ Ð½Ð° ÐºÐ°Ð¿Ð°Ñ†Ð¸Ñ‚ÐµÑ‚' },
      { en: 'Photo-friendly spaces', mk: 'Ð¤Ð¾Ñ‚Ð¾Ð³ÐµÐ½Ð¸Ñ‡Ð½Ð¸ Ð¿Ñ€Ð¾ÑÑ‚Ð¾Ñ€Ð¸' },
    ],
    partners: [
      {
        name: 'Villa Aurora',
        note: { en: 'Garden receptions and sunset ceremonies', mk: 'Ð“Ñ€Ð°Ð´Ð¸Ð½Ð°Ñ€ÑÐºÐ¸ Ð¿Ñ€Ð¸ÐµÐ¼Ð¸ Ð¸ Ð·Ð°Ñ˜Ð´Ð¸ÑÐ¾Ð½Ñ†Ðµ Ñ†ÐµÑ€ÐµÐ¼Ð¾Ð½Ð¸Ð¸' },
        image:
          'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Grand Terrace',
        note: { en: 'Large-capacity ballroom setup', mk: 'Ð‘Ð°Ð»ÑÐºÐ° Ð¿Ð¾ÑÑ‚Ð°Ð²ÐºÐ° Ð·Ð° Ð³Ð¾Ð»ÐµÐ¼ Ð±Ñ€Ð¾Ñ˜ Ð³Ð¾ÑÑ‚Ð¸' },
        image:
          'https://images.pexels.com/photos/265920/pexels-photo-265920.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Lakeview House',
        note: { en: 'Weekend wedding villa experience', mk: 'Ð’Ð¸Ð»Ð° Ð·Ð° Ð²Ð¸ÐºÐµÐ½Ð´ ÑÐ²Ð°Ð´Ð±ÐµÐ½Ð¾ Ð¸ÑÐºÑƒÑÑ‚Ð²Ð¾' },
        image:
          'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
    ],
    ctaHref: '/contact',
    ctaLabel: { en: 'Ask about venues', mk: 'ÐŸÑ€Ð°ÑˆÐ°Ñ˜Ñ‚Ðµ Ð·Ð° Ð»Ð¾ÐºÐ°Ñ†Ð¸Ð¸' },
  },
  {
    id: 'bands',
    navLabel: { en: 'Music Bands', mk: 'ÐœÑƒÐ·Ð¸Ñ‡ÐºÐ¸ Ð±ÐµÐ½Ð´Ð¾Ð²Ð¸' },
    title: { en: 'Music bands and live performers', mk: 'ÐœÑƒÐ·Ð¸Ñ‡ÐºÐ¸ Ð±ÐµÐ½Ð´Ð¾Ð²Ð¸ Ð¸ Ð½Ð°ÑÑ‚Ð°Ð¿ÑƒÐ²Ð°Ñ‡Ð¸' },
    description: {
      en: 'From elegant dinner sets to all-night party bands, present music options in a cleaner curated selection.',
      mk: 'ÐžÐ´ ÐµÐ»ÐµÐ³Ð°Ð½Ñ‚Ð½Ð¸ dinner ÑÐµÑ‚Ð¾Ð²Ð¸ Ð´Ð¾ Ñ†ÐµÐ»Ð¾Ð½Ð¾ÑœÐ½Ð¸ party Ð±ÐµÐ½Ð´Ð¾Ð²Ð¸, Ð¼ÑƒÐ·Ð¸Ñ‡ÐºÐ¸Ñ‚Ðµ Ð¾Ð¿Ñ†Ð¸Ð¸ ÑÐµ Ð¿Ñ€Ð¸ÐºÐ°Ð¶Ð°Ð½Ð¸ Ð²Ð¾ Ð¿Ð¾Ñ‡Ð¸ÑÑ‚Ð° ÐºÑƒÑ€Ð¸Ñ€Ð°Ð½Ð° ÑÐµÐ»ÐµÐºÑ†Ð¸Ñ˜Ð°.',
    },
    image:
      'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&fit=crop',
    imageAlt: { en: 'Wedding live band stage', mk: 'Ð¡Ñ†ÐµÐ½Ð° ÑÐ¾ ÑÐ²Ð°Ð´Ð±ÐµÐ½ Ð±ÐµÐ½Ð´' },
    toneClass: 'from-violet-100/55 via-white/25 to-sky-100/55',
    chips: [
      { en: 'Band style matching', mk: 'Ð£ÑÐ¾Ð³Ð»Ð°ÑÑƒÐ²Ð°ÑšÐµ Ð½Ð° ÑÑ‚Ð¸Ð» Ð½Ð° Ð±ÐµÐ½Ð´' },
      { en: 'Ceremony + party sets', mk: 'Ð¡ÐµÑ‚Ð¾Ð²Ð¸ Ð·Ð° Ñ†ÐµÑ€ÐµÐ¼Ð¾Ð½Ð¸Ñ˜Ð° + Ð¿Ñ€Ð¾ÑÐ»Ð°Ð²Ð°' },
      { en: 'Sound coordination', mk: 'ÐšÐ¾Ð¾Ñ€Ð´Ð¸Ð½Ð°Ñ†Ð¸Ñ˜Ð° Ð½Ð° Ð¾Ð·Ð²ÑƒÑ‡ÑƒÐ²Ð°ÑšÐµ' },
    ],
    partners: [
      {
        name: 'Velvet Rhythm',
        note: { en: 'Modern wedding classics and pop', mk: 'ÐœÐ¾Ð´ÐµÑ€Ð½Ð¸ ÑÐ²Ð°Ð´Ð±ÐµÐ½Ð¸ ÐºÐ»Ð°ÑÐ¸Ñ†Ð¸ Ð¸ Ð¿Ð¾Ð¿' },
        image:
          'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Balkan Echo',
        note: { en: 'High-energy celebration set', mk: 'Ð•Ð½ÐµÑ€Ð³Ð¸Ñ‡ÐµÐ½ ÑÐµÑ‚ Ð·Ð° Ð¿Ñ€Ð¾ÑÐ»Ð°Ð²Ð°' },
        image:
          'https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Strings & Candlelight',
        note: { en: 'Ceremony duo / cocktail hour', mk: 'Ð”ÑƒÐ¾ Ð·Ð° Ñ†ÐµÑ€ÐµÐ¼Ð¾Ð½Ð¸Ñ˜Ð° / ÐºÐ¾ÐºÑ‚ÐµÐ» Ñ‡Ð°Ñ' },
        image:
          'https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
    ],
    ctaHref: '/contact',
    ctaLabel: { en: 'Ask about music', mk: 'ÐŸÑ€Ð°ÑˆÐ°Ñ˜Ñ‚Ðµ Ð·Ð° Ð¼ÑƒÐ·Ð¸ÐºÐ°' },
  },
  {
    id: 'photo-video',
    navLabel: { en: 'Photo & Video', mk: 'Ð¤Ð¾Ñ‚Ð¾ Ð¸ Ð²Ð¸Ð´ÐµÐ¾' },
    title: { en: 'Photo studios and video teams', mk: 'Ð¤Ð¾Ñ‚Ð¾ ÑÑ‚ÑƒÐ´Ð¸Ñ˜Ð° Ð¸ Ð²Ð¸Ð´ÐµÐ¾ Ñ‚Ð¸Ð¼Ð¾Ð²Ð¸' },
    description: {
      en: 'Highlight a smaller set of trusted teams with visual style cues so couples can compare quickly without information overload.',
      mk: 'Ð˜ÑÑ‚Ð°ÐºÐ½ÐµÑ‚Ðµ Ð¿Ð¾Ð¼Ð°Ð»Ð° Ð»Ð¸ÑÑ‚Ð° Ð½Ð° Ð´Ð¾Ð²ÐµÑ€Ð»Ð¸Ð²Ð¸ Ñ‚Ð¸Ð¼Ð¾Ð²Ð¸ ÑÐ¾ Ð²Ð¸Ð·ÑƒÐµÐ»ÐµÐ½ ÑÑ‚Ð¸Ð», Ð·Ð° Ð¿Ð°Ñ€Ð¾Ð²Ð¸Ñ‚Ðµ Ð±Ñ€Ð·Ð¾ Ð´Ð° ÑÐ¿Ð¾Ñ€ÐµÐ´Ð°Ñ‚ Ð±ÐµÐ· Ð¿Ñ€ÐµÐ¾Ð¿Ñ‚Ð¾Ð²Ð°Ñ€ÑƒÐ²Ð°ÑšÐµ ÑÐ¾ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ð¸.',
    },
    image:
      'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&fit=crop',
    imageAlt: { en: 'Wedding photographer capturing couple', mk: 'Ð¡Ð²Ð°Ð´Ð±ÐµÐ½ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„ Ð³Ð¾ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ€Ð° Ð¿Ð°Ñ€Ð¾Ñ‚' },
    toneClass: 'from-stone-100/60 via-white/25 to-rose-100/55',
    chips: [
      { en: 'Editorial style', mk: 'Ð•Ð´Ð¸Ñ‚Ð¾Ñ€Ð¸Ñ˜Ð°Ð»ÐµÐ½ ÑÑ‚Ð¸Ð»' },
      { en: 'Documentary coverage', mk: 'Ð”Ð¾ÐºÑƒÐ¼ÐµÐ½Ñ‚Ð°Ñ€Ð½Ð¾ Ð¿Ð¾ÐºÑ€Ð¸Ð²Ð°ÑšÐµ' },
      { en: 'Short films & reels', mk: 'ÐšÑ€Ð°Ñ‚ÐºÐ¸ Ñ„Ð¸Ð»Ð¼Ð¾Ð²Ð¸ Ð¸ reels' },
    ],
    partners: [
      {
        name: 'Frame & Film Atelier',
        note: { en: 'Editorial portrait-led coverage', mk: 'Ð•Ð´Ð¸Ñ‚Ð¾Ñ€Ð¸Ñ˜Ð°Ð»Ð½Ð¾ Ð¿Ð¾ÐºÑ€Ð¸Ð²Ð°ÑšÐµ ÑÐ¾ Ð¿Ð¾Ñ€Ñ‚Ñ€ÐµÑ‚ÐµÐ½ Ñ„Ð¾ÐºÑƒÑ' },
        image:
          'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Golden Hour Studio',
        note: { en: 'Natural light and cinematic reels', mk: 'ÐŸÑ€Ð¸Ñ€Ð¾Ð´Ð½Ð° ÑÐ²ÐµÑ‚Ð»Ð¸Ð½Ð° Ð¸ ÐºÐ¸Ð½ÐµÐ¼Ð°Ñ‚ÑÐºÐ¸ reels' },
        image:
          'https://images.pexels.com/photos/2072181/pexels-photo-2072181.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Storyline Wedding Video',
        note: { en: 'Feature film-style wedding recap', mk: 'Ð¡Ð²Ð°Ð´Ð±ÐµÐ½ recap Ð²Ð¾ ÑÑ‚Ð¸Ð» Ð½Ð° ÐºÑ€Ð°Ñ‚Ð¾Ðº Ñ„Ð¸Ð»Ð¼' },
        image:
          'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
    ],
    ctaHref: '/contact',
    ctaLabel: { en: 'Ask about photo/video', mk: 'ÐŸÑ€Ð°ÑˆÐ°Ñ˜Ñ‚Ðµ Ð·Ð° Ñ„Ð¾Ñ‚Ð¾/Ð²Ð¸Ð´ÐµÐ¾' },
  },
  {
    id: 'decor-catering',
    navLabel: { en: 'Decor & Catering', mk: 'Ð”ÐµÐºÐ¾Ñ€ Ð¸ ÐºÐµÑ‚ÐµÑ€Ð¸Ð½Ð³' },
    title: { en: 'Decorations, catering, and event details', mk: 'Ð”ÐµÐºÐ¾Ñ€Ð°Ñ†Ð¸Ð¸, ÐºÐµÑ‚ÐµÑ€Ð¸Ð½Ð³ Ð¸ Ð´ÐµÑ‚Ð°Ð»Ð½Ð° Ð¿Ð¾ÑÑ‚Ð°Ð²ÐºÐ°' },
    description: {
      en: 'A smoother presentation for floral design, catering styling, dessert tables, and ceremonial add-ons.',
      mk: 'ÐŸÐ¾Ð¼Ð°Ð·Ð½Ð° Ð¿Ñ€ÐµÐ·ÐµÐ½Ñ‚Ð°Ñ†Ð¸Ñ˜Ð° Ð·Ð° Ñ„Ð»Ð¾Ñ€Ð°Ð»ÐµÐ½ Ð´Ð¸Ð·Ð°Ñ˜Ð½, ÐºÐµÑ‚ÐµÑ€Ð¸Ð½Ð³ Ð¿Ð¾ÑÑ‚Ð°Ð²ÐºÐ°, Ð´ÐµÑÐµÑ€Ñ‚ Ð¼Ð°ÑÐ¸ Ð¸ Ñ†ÐµÑ€ÐµÐ¼Ð¾Ð½Ð¸Ñ˜Ð°Ð»Ð½Ð¸ Ð´Ð¾Ð´Ð°Ñ‚Ð¾Ñ†Ð¸.',
    },
    image:
      'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&fit=crop',
    imageAlt: { en: 'Decorated wedding reception table', mk: 'Ð”ÐµÐºÐ¾Ñ€Ð¸Ñ€Ð°Ð½Ð° ÑÐ²Ð°Ð´Ð±ÐµÐ½Ð° Ð¼Ð°ÑÐ°' },
    toneClass: 'from-emerald-100/55 via-white/25 to-amber-100/60',
    chips: [
      { en: 'Floral concepts', mk: 'Ð¤Ð»Ð¾Ñ€Ð°Ð»Ð½Ð¸ ÐºÐ¾Ð½Ñ†ÐµÐ¿Ñ‚Ð¸' },
      { en: 'Reception styling', mk: 'Ð¡Ñ‚Ð¸Ð»Ð¸Ð·Ð°Ñ†Ð¸Ñ˜Ð° Ð½Ð° Ð¿Ñ€Ð¸ÐµÐ¼' },
      { en: 'Dessert tables', mk: 'Ð”ÐµÑÐµÑ€Ñ‚ Ð¼Ð°ÑÐ¸' },
    ],
    partners: [
      {
        name: 'Flora Atelier MK',
        note: { en: 'Ceremony arches and tablescapes', mk: 'Ð¦ÐµÑ€ÐµÐ¼Ð¾Ð½Ð¸Ñ˜Ð°Ð»Ð½Ð¸ Ð°Ñ€ÐºÐ¸ Ð¸ tablescape Ñ€ÐµÑˆÐµÐ½Ð¸Ñ˜Ð°' },
        image:
          'https://images.pexels.com/photos/1128782/pexels-photo-1128782.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Signature Catering',
        note: { en: 'Tasting-led menus and service teams', mk: 'ÐœÐµÐ½Ð¸Ñ˜Ð° ÑÐ¾ Ð´ÐµÐ³ÑƒÑÑ‚Ð°Ñ†Ð¸Ñ˜Ð° Ð¸ ÑÐµÑ€Ð²Ð¸ÑÐ½Ð¸ Ñ‚Ð¸Ð¼Ð¾Ð²Ð¸' },
        image:
          'https://images.pexels.com/photos/5638732/pexels-photo-5638732.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Sweet Table House',
        note: { en: 'Dessert styling and cake table design', mk: 'Ð¡Ñ‚Ð¸Ð»Ð¸Ð·Ð°Ñ†Ð¸Ñ˜Ð° Ð½Ð° Ð´ÐµÑÐµÑ€Ñ‚Ð¸ Ð¸ cake table Ð´Ð¸Ð·Ð°Ñ˜Ð½' },
        image:
          'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
    ],
    ctaHref: '/services',
    ctaLabel: { en: 'See planning services', mk: 'Ð’Ð¸Ð´Ð¸ Ð¿Ð»Ð°Ð½ÐµÑ€ÑÐºÐ¸ ÑƒÑÐ»ÑƒÐ³Ð¸' },
  },
  {
    id: 'invitations',
    navLabel: { en: 'Invitations', mk: 'ÐŸÐ¾ÐºÐ°Ð½Ð¸' },
    title: { en: 'Invitations and wedding details', mk: 'ÐŸÐ¾ÐºÐ°Ð½Ð¸ Ð¸ ÑÐ²Ð°Ð´Ð±ÐµÐ½Ð¸ Ð´ÐµÑ‚Ð°Ð»Ð¸' },
    description: {
      en: 'This is your added category: printed and digital invitations, menus, place cards, signage, and matching wedding stationery.',
      mk: 'ÐžÐ²Ð° Ðµ Ð²Ð°ÑˆÐ°Ñ‚Ð° Ð´Ð¾Ð´Ð°Ð´ÐµÐ½Ð° ÐºÐ°Ñ‚ÐµÐ³Ð¾Ñ€Ð¸Ñ˜Ð°: Ð¿ÐµÑ‡Ð°Ñ‚ÐµÐ½Ð¸ Ð¸ Ð´Ð¸Ð³Ð¸Ñ‚Ð°Ð»Ð½Ð¸ Ð¿Ð¾ÐºÐ°Ð½Ð¸, Ð¼ÐµÐ½Ð¸Ñ˜Ð°, ÐºÐ°Ñ€Ñ‚Ð¸Ñ‡ÐºÐ¸ Ð·Ð° Ð¼Ð°ÑÐ°, signage Ð¸ ÑƒÑÐ¾Ð³Ð»Ð°ÑÐµÐ½ ÑÐ²Ð°Ð´Ð±ÐµÐ½ stationery.',
    },
    image:
      'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&fit=crop',
    imageAlt: { en: 'Wedding invitation flat lay', mk: 'Ð¡Ð²Ð°Ð´Ð±ÐµÐ½Ð° Ð¿Ð¾ÐºÐ°Ð½Ð° Ð²Ð¾ flat lay ÑÑ‚Ð¸Ð»' },
    toneClass: 'from-rose-100/65 via-white/30 to-fuchsia-100/55',
    chips: [
      { en: 'Printed suites', mk: 'ÐŸÐµÑ‡Ð°Ñ‚ÐµÐ½Ð¸ ÑÐµÑ‚Ð¾Ð²Ð¸' },
      { en: 'Digital invites', mk: 'Ð”Ð¸Ð³Ð¸Ñ‚Ð°Ð»Ð½Ð¸ Ð¿Ð¾ÐºÐ°Ð½Ð¸' },
      { en: 'Menus & signage', mk: 'ÐœÐµÐ½Ð¸Ñ˜Ð° Ð¸ signage' },
    ],
    partners: [
      {
        name: 'Paper House MK',
        note: { en: 'Modern calligraphy invitation suites', mk: 'ÐœÐ¾Ð´ÐµÑ€Ð½Ð¸ ÑÐµÑ‚Ð¾Ð²Ð¸ ÑÐ¾ ÐºÐ°Ð»Ð¸Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ð°' },
        image:
          'https://images.pexels.com/photos/842949/pexels-photo-842949.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Studio Ink & Gold',
        note: { en: 'Foil details and premium print finishes', mk: 'Ð¤Ð¾Ð»Ð¸Ñ˜Ð° Ð´ÐµÑ‚Ð°Ð»Ð¸ Ð¸ Ð¿Ñ€ÐµÐ¼Ð¸ÑƒÐ¼ Ð¿ÐµÑ‡Ð°Ñ‚' },
        image:
          'https://images.pexels.com/photos/6473957/pexels-photo-6473957.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'WedMKD Digital Invite',
        note: { en: 'Guest-ready pages + RSVP links', mk: 'Ð“Ð¾ÑÑ‚Ð¸Ð½ÑÐºÐ¸ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð¸ + RSVP Ð»Ð¸Ð½ÐºÐ¾Ð²Ð¸' },
        image:
          'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
    ],
    ctaHref: '/products',
    ctaLabel: { en: 'Open products & invites', mk: 'ÐžÑ‚Ð²Ð¾Ñ€Ð¸ Ð¿Ñ€Ð¾Ð¸Ð·Ð²Ð¾Ð´Ð¸ Ð¸ Ð¿Ð¾ÐºÐ°Ð½Ð¸' },
  },
  {
    id: 'fashion',
    navLabel: { en: 'Dresses & Suits', mk: 'Ð’ÐµÐ½Ñ‡Ð°Ð½Ð¸Ñ†Ð¸ Ð¸ Ð¾Ð´ÐµÐ»Ð°' },
    title: { en: 'Bridal dresses and groom suits', mk: 'Ð’ÐµÐ½Ñ‡Ð°Ð½Ð¸Ñ†Ð¸ Ð¸ Ð¼Ð°ÑˆÐºÐ¸ Ð¾Ð´ÐµÐ»Ð°' },
    description: {
      en: 'Present fashion partners with a cleaner style-first format: bridal studios, tailoring, fittings, and accessory recommendations.',
      mk: 'ÐŸÑ€ÐµÑ‚ÑÑ‚Ð°Ð²ÐµÑ‚Ðµ Ð¼Ð¾Ð´Ð½Ð¸ Ð¿Ð°Ñ€Ñ‚Ð½ÐµÑ€Ð¸ Ð²Ð¾ Ð¿Ð¾Ñ‡Ð¸ÑÑ‚ Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚ Ñ„Ð¾ÐºÑƒÑÐ¸Ñ€Ð°Ð½ Ð½Ð° ÑÑ‚Ð¸Ð»: bridal ÑÑ‚ÑƒÐ´Ð¸Ñ˜Ð°, tailoring, Ð¿Ñ€Ð¾Ð±Ð¸ Ð¸ Ð¿Ñ€ÐµÐ¿Ð¾Ñ€Ð°ÐºÐ¸ Ð·Ð° Ð´Ð¾Ð´Ð°Ñ‚Ð¾Ñ†Ð¸.',
    },
    image:
      'https://images.pexels.com/photos/265920/pexels-photo-265920.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&fit=crop',
    imageAlt: { en: 'Bride and groom fashion styling', mk: 'Ð¡Ñ‚Ð¸Ð»Ð¸Ð·Ð°Ñ†Ð¸Ñ˜Ð° Ð½Ð° Ð½ÐµÐ²ÐµÑÑ‚Ð° Ð¸ Ð¼Ð»Ð°Ð´Ð¾Ð¶ÐµÐ½ÐµÑ†' },
    toneClass: 'from-amber-100/55 via-white/25 to-stone-100/60',
    chips: [
      { en: 'Bridal salons', mk: 'Bridal ÑÐ°Ð»Ð¾Ð½Ð¸' },
      { en: 'Suits & tailoring', mk: 'ÐžÐ´ÐµÐ»Ð° Ð¸ tailoring' },
      { en: 'Accessory styling', mk: 'Ð¡Ñ‚Ð¸Ð»Ð¸Ð·Ð°Ñ†Ð¸Ñ˜Ð° Ð½Ð° Ð´Ð¾Ð´Ð°Ñ‚Ð¾Ñ†Ð¸' },
    ],
    partners: [
      {
        name: 'Maison Bride',
        note: { en: 'Classic and modern bridal silhouettes', mk: 'ÐšÐ»Ð°ÑÐ¸Ñ‡Ð½Ð¸ Ð¸ Ð¼Ð¾Ð´ÐµÑ€Ð½Ð¸ bridal ÑÐ¸Ð»ÑƒÐµÑ‚Ð¸' },
        image:
          'https://images.pexels.com/photos/3419692/pexels-photo-3419692.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Tux Atelier',
        note: { en: 'Tailored suits for groom and kums', mk: 'Tailored Ð¾Ð´ÐµÐ»Ð° Ð·Ð° Ð¼Ð»Ð°Ð´Ð¾Ð¶ÐµÐ½ÐµÑ† Ð¸ ÐºÑƒÐ¼Ð¾Ð²Ð¸' },
        image:
          'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Veil & Detail Studio',
        note: { en: 'Veils, jewelry, and finishing touches', mk: 'ÐŸÑ€ÐµÐ²ÐµÐ·Ð¸, Ð½Ð°ÐºÐ¸Ñ‚ Ð¸ Ð·Ð°Ð²Ñ€ÑˆÐ½Ð¸ Ð´ÐµÑ‚Ð°Ð»Ð¸' },
        image:
          'https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
    ],
    ctaHref: '/contact',
    ctaLabel: { en: 'Ask about fashion partners', mk: 'ÐŸÑ€Ð°ÑˆÐ°Ñ˜Ñ‚Ðµ Ð·Ð° Ð¼Ð¾Ð´Ð½Ð¸ Ð¿Ð°Ñ€Ñ‚Ð½ÐµÑ€Ð¸' },
  },
  {
    id: 'oldtimers',
    navLabel: { en: 'Oldtimers', mk: 'ÐžÐ»Ð´ Ñ‚Ð°Ñ˜Ð¼ÐµÑ€Ð¸' },
    title: { en: 'Oldtimer cars and special transport', mk: 'ÐžÐ»Ð´ Ñ‚Ð°Ñ˜Ð¼ÐµÑ€Ð¸ Ð¸ ÑÐ¿ÐµÑ†Ð¸Ñ˜Ð°Ð»ÐµÐ½ Ð¿Ñ€ÐµÐ²Ð¾Ð·' },
    description: {
      en: 'A compact, visual-first showcase for classic cars and photo-arrival moments that adds charm without clutter.',
      mk: 'ÐšÐ¾Ð¼Ð¿Ð°ÐºÑ‚ÐµÐ½ Ð²Ð¸Ð·ÑƒÐµÐ»ÐµÐ½ Ð¿Ñ€Ð¸ÐºÐ°Ð· Ð·Ð° ÐºÐ»Ð°ÑÐ¸Ñ‡Ð½Ð¸ Ð°Ð²Ñ‚Ð¾Ð¼Ð¾Ð±Ð¸Ð»Ð¸ Ð¸ photo-arrival Ð¼Ð¾Ð¼ÐµÐ½Ñ‚Ð¸ ÑˆÑ‚Ð¾ Ð´Ð¾Ð´Ð°Ð²Ð° ÑˆÐ°Ñ€Ð¼ Ð±ÐµÐ· Ð½ÐµÑ€ÐµÐ´.',
    },
    image:
      'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&fit=crop',
    imageAlt: { en: 'Classic wedding car', mk: 'ÐšÐ»Ð°ÑÐ¸Ñ‡ÐµÐ½ Ð°Ð²Ñ‚Ð¾Ð¼Ð¾Ð±Ð¸Ð» Ð·Ð° ÑÐ²Ð°Ð´Ð±Ð°' },
    toneClass: 'from-sky-100/55 via-white/25 to-stone-100/60',
    chips: [
      { en: 'Retro arrivals', mk: 'Ð ÐµÑ‚Ñ€Ð¾ Ð¿Ñ€Ð¸ÑÑ‚Ð¸Ð³Ð½ÑƒÐ²Ð°ÑšÐ°' },
      { en: 'Photo route styling', mk: 'Ð¡Ñ‚Ð¸Ð»Ð¸Ð·Ð°Ñ†Ð¸Ñ˜Ð° Ð½Ð° Ñ„Ð¾Ñ‚Ð¾ Ñ€ÑƒÑ‚Ð°' },
      { en: 'City / villa transfers', mk: 'Ð“Ñ€Ð°Ð´ÑÐºÐ¸ / Ð²Ð¸Ð»Ð° Ñ‚Ñ€Ð°Ð½ÑÑ„ÐµÑ€Ð¸' },
    ],
    partners: [
      {
        name: 'White Beetle Classic',
        note: { en: 'Soft retro look for romantic entrances', mk: 'ÐÐµÐ¶ÐµÐ½ Ñ€ÐµÑ‚Ñ€Ð¾ Ð¸Ð·Ð³Ð»ÐµÐ´ Ð·Ð° Ñ€Ð¾Ð¼Ð°Ð½Ñ‚Ð¸Ñ‡Ð½Ð¸ Ð²Ð»ÐµÐ·Ð¾Ð²Ð¸' },
        image:
          'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Oldtimer MK',
        note: { en: 'Timeless black-and-cream fleet', mk: 'Ð‘ÐµÐ·Ð²Ñ€ÐµÐ¼ÐµÐ½ÑÐºÐ° Ñ†Ñ€Ð½Ð¾-ÐºÑ€ÐµÐ¼ Ñ„Ð»Ð¾Ñ‚Ð°' },
        image:
          'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
      {
        name: 'Fiat Love Ride',
        note: { en: 'Fun compact classic for photo sessions', mk: 'Ð—Ð°Ð±Ð°Ð²ÐµÐ½ ÐºÐ¾Ð¼Ð¿Ð°ÐºÑ‚ÐµÐ½ ÐºÐ»Ð°ÑÐ¸Ðº Ð·Ð° Ñ„Ð¾Ñ‚Ð¾ ÑÐµÑÐ¸Ð¸' },
        image:
          'https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      },
    ],
    ctaHref: '/contact',
    ctaLabel: { en: 'Ask about transport', mk: 'ÐŸÑ€Ð°ÑˆÐ°Ñ˜Ñ‚Ðµ Ð·Ð° Ð¿Ñ€ÐµÐ²Ð¾Ð·' },
  },
];

const CP1252_EXTRA_BYTE_MAP: Record<number, number> = {
  0x20ac: 0x80,
  0x201a: 0x82,
  0x0192: 0x83,
  0x201e: 0x84,
  0x2026: 0x85,
  0x2020: 0x86,
  0x2021: 0x87,
  0x02c6: 0x88,
  0x2030: 0x89,
  0x0160: 0x8a,
  0x2039: 0x8b,
  0x0152: 0x8c,
  0x017d: 0x8e,
  0x2018: 0x91,
  0x2019: 0x92,
  0x201c: 0x93,
  0x201d: 0x94,
  0x2022: 0x95,
  0x2013: 0x96,
  0x2014: 0x97,
  0x02dc: 0x98,
  0x2122: 0x99,
  0x0161: 0x9a,
  0x203a: 0x9b,
  0x0153: 0x9c,
  0x017e: 0x9e,
  0x0178: 0x9f,
};

function toLikelyUtf8Bytes(value: string): Uint8Array {
  return Uint8Array.from(Array.from(value), (char) => {
    const code = char.codePointAt(0) ?? 0x3f;
    if (code <= 0xff) return code;
    return CP1252_EXTRA_BYTE_MAP[code] ?? 0x3f;
  });
}

function repairBrokenMk(value: string): string {
  if (!/[\u00D0\u00D1\u00C3\u00C2\u20AC\u201A-\u201E\u2020-\u2022\u2030\u2122\uFFFD]/.test(value)) return value;
  try {
    let current = value;
    for (let i = 0; i < 3; i += 1) {
      const decoded = new TextDecoder('utf-8', { fatal: false }).decode(toLikelyUtf8Bytes(current));
      if (decoded === current) break;
      current = decoded;
      if (!/[\u00D0\u00D1\u00C3\u00C2\u20AC\u201A-\u201E\u2020-\u2022\u2030\u2122\uFFFD]/.test(current)) break;
    }
    return /[\u0400-\u04FF]/.test(current) ? current : value;
  } catch {
    return value;
  }
}

function looksBrokenMk(value: string): boolean {
  return /[\u00D0\u00D1\u00C3\u00C2\u20AC\u201A-\u201E\u2020-\u2022\u2030\u2122\uFFFD]/.test(value);
}

function pick(language: 'en' | 'mk', text: LocalizedText): string {
  if (language !== 'mk') return text.en;

  const translatedFromEn = translateText('mk', text.en);
  if (translatedFromEn !== text.en) return translatedFromEn;

  const repaired = repairBrokenMk(text.mk);
  if (!looksBrokenMk(repaired)) return repaired;

  return text.en;
}

export const Collaborations: React.FC = () => {
  const { language, pathFor } = useI18n();
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? 'venues');

  const localizedSections = useMemo(
    () =>
      sections.map((section) => ({
        ...section,
        label: pick(language, section.navLabel),
        titleText: pick(language, section.title),
        descriptionText: pick(language, section.description),
        imageAltText: pick(language, section.imageAlt),
        chipsText: section.chips.map((chip) => pick(language, chip)),
        partnersText: section.partners.map((partner) => ({
          ...partner,
          noteText: pick(language, partner.note),
        })),
        ctaLabelText: section.ctaLabel ? pick(language, section.ctaLabel) : null,
      })),
    [language]
  );

  useEffect(() => {
    const ids = sections.map((section) => section.id);
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        threshold: [0.25, 0.4, 0.6],
        rootMargin: '-20% 0px -55% 0px',
      }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const heroTitle =
    language === 'mk'
      ? 'Соработници и категории за целото свадбено искуство'
      : 'Collaborations and categories for the full wedding experience';
  const heroBody =
    language === 'mk'
      ? 'Чист преглед на најважните свадбени категории, со покани како посебна WedMKD секција. Помалку шум, повеќе јасност за паровите.'
      : 'A cleaner, more elegant overview of the most important wedding categories, with invitations presented as a dedicated WedMKD section.';
  const heroStats =
    language === 'mk'
      ? [
          ['7', 'главни категории'],
          ['1', 'посебна секција за покани'],
          ['јасен', 'преглед'],
        ]
      : [
          ['7', 'main categories'],
          ['1', 'dedicated invitations section'],
          ['clear', 'browsing flow'],
        ];
  const stickyTitle = language === 'mk' ? 'Категории' : 'Categories';
  const endTitle =
    language === 'mk' ? 'Ви треба целосен преглед и препорака по категории?' : 'Need a full recommendation flow by category?';
  const endBody =
    language === 'mk'
      ? 'Можеме да продолжиме со подетални профили за партнери, посебни страници по категорија и контакт форми, без да се изгуби чистиот изглед.'
      : 'We can extend this with detailed partner profiles, category pages, and per-section inquiry flows without losing the clean aesthetic.';
  const endButtonPrimary = language === 'mk' ? 'Започни разговор' : 'Start a conversation';
  const endButtonSecondary = language === 'mk' ? 'Отвори производи (покани)' : 'Open Products (Invites)';

  return (
    <div className="app-shell" data-auto-motion>
      <section className="page-wrap pt-5 sm:pt-6">
        <div className="relative overflow-hidden rounded-[34px] bg-stone-900 shadow-[0_28px_70px_rgba(20,14,12,0.22)]">
          <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/60 to-black/34" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(244,114,182,0.22),transparent_38%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.14),transparent_42%),radial-gradient(circle_at_70%_84%,rgba(245,158,11,0.12),transparent_36%)]" />

          <div className="relative grid min-h-[520px] items-end px-5 py-8 sm:px-8 sm:py-10 lg:min-h-[580px] lg:px-12">
            <div className="max-w-3xl">
              <p className="section-kicker !text-white/85">{language === 'mk' ? '\u0421\u043e\u0440\u0430\u0431\u043e\u0442\u043d\u0438\u0446\u0438' : 'Collaborations'}</p>
              <h1 className="mt-3 text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                {heroTitle}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">{heroBody}</p>

              <div className="mt-6 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                {heroStats.map(([value, label]) => (
                  <div key={`${value}-${label}`} className="rounded-md border border-white/25 bg-black/28 px-4 py-3 backdrop-blur-md">
                    <p className="text-base font-semibold text-white sm:text-lg">{value}</p>
                    <p className="text-xs text-white/90">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-[72px] z-30 mt-4 sm:top-[78px]">
        <div className="page-wrap">
          <div className="rounded-2xl border border-stone-200/70 bg-[#f7f1e8]/85 p-2 shadow-[0_12px_26px_rgba(28,18,13,0.06)] backdrop-blur-xl">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="pl-2 pr-1 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                {stickyTitle}
              </span>
              {localizedSections.map((section) => {
                const active = activeSection === section.id;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition ${
                      active
                        ? 'bg-gradient-to-r from-rose-100 via-amber-50 to-sky-100 text-stone-950 ring-1 ring-rose-200 shadow-[0_10px_18px_rgba(28,18,13,0.08)]'
                        : 'bg-white/75 text-stone-700 hover:bg-white hover:text-stone-900'
                    }`}
                  >
                    {section.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-4 space-y-0">
        {localizedSections.map((section, index) => {
          const reverse = index % 2 === 1;
          return (
            <section
              key={section.id}
              id={section.id}
              className="relative scroll-mt-40 py-12 sm:py-16"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${section.toneClass}`} />
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: `url("${section.image}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                aria-hidden
              />

              <div className="page-wrap relative">
                <div className="grid items-start gap-7 lg:grid-cols-[1fr_1fr] lg:gap-10">
                  <div className={reverse ? 'lg:order-2' : ''}>
                    <p className="section-kicker">{section.label}</p>
                    <h2 className="mt-3 text-4xl font-semibold text-stone-900 sm:text-5xl">
                      {section.titleText}
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-700 sm:text-base">
                      {section.descriptionText}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {section.chipsText.map((chip) => (
                        <span
                          key={chip}
                          className="inline-flex items-center rounded-full border border-stone-200/80 bg-white/78 px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-sm"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {section.ctaHref && section.ctaLabelText ? (
                        <Link to={pathFor(section.ctaHref)} className="btn-primary">
                          {section.ctaLabelText}
                        </Link>
                      ) : null}
                    </div>
                  </div>

                  <div className={reverse ? 'lg:order-1' : ''}>
                    <div className="relative overflow-hidden rounded-[26px] shadow-[0_24px_50px_rgba(28,18,13,0.14)] ring-1 ring-white/45">
                      <img
                        src={section.image}
                        alt={section.imageAltText}
                        className="h-[260px] w-full object-cover sm:h-[320px] lg:h-[380px]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                        <p className="text-xs uppercase tracking-[0.16em] text-white/80">{section.label}</p>
                        <p className="mt-2 text-lg font-semibold sm:text-xl">{section.titleText}</p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {section.partnersText.map((partner) => (
                        <article
                          key={partner.name}
                          className="overflow-hidden rounded-2xl bg-white/78 shadow-[0_12px_24px_rgba(28,18,13,0.07)] ring-1 ring-white/60 backdrop-blur"
                        >
                          <img src={partner.image} alt={partner.name} className="h-20 w-full object-cover sm:h-24" loading="lazy" />
                          <div className="p-3">
                            <p className="text-sm font-semibold text-stone-900">{partner.name}</p>
                            <p className="mt-1 text-xs leading-5 text-stone-600">{partner.noteText}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="page-wrap pb-12 pt-4">
        <div className="relative overflow-hidden rounded-[28px] bg-stone-900 px-5 py-8 text-white shadow-[0_24px_60px_rgba(28,18,13,0.18)] sm:px-8 sm:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(244,114,182,0.26),transparent_40%),radial-gradient(circle_at_86%_22%,rgba(59,130,246,0.18),transparent_44%),radial-gradient(circle_at_72%_86%,rgba(245,158,11,0.18),transparent_36%)]" />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="section-kicker !text-white/75">{language === 'mk' ? 'Следен чекор' : 'Next step'}</p>
              <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">{endTitle}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/82 sm:text-base">{endBody}</p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
                <Link to={pathFor('/contact')} className="btn-secondary bg-white/95">
                  {endButtonPrimary}
                </Link>
                <Link to={pathFor('/products')} className="btn-secondary border-white/40 bg-white/92 text-stone-900 hover:bg-white">
                  {endButtonSecondary}
                </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
