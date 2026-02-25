import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';
import { translateText } from '../i18n/translations';

const textNodeOriginal = new WeakMap<Text, string>();
const attrOriginal = new WeakMap<Element, Map<string, string>>();

const ATTRS = ['placeholder', 'title', 'aria-label'] as const;

function shouldSkipTextNode(node: Text): boolean {
  const parent = node.parentElement;
  if (!parent) return true;
  const tag = parent.tagName;
  if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return true;
  if (parent.closest('script,style,noscript')) return true;
  return false;
}

function translateCandidate(language: 'en' | 'mk', value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return value;
  if (/^(https?:\/\/|\/|#|mailto:|tel:)/i.test(trimmed)) return value;
  if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(trimmed)) return value;
  const translated = translateText(language, trimmed);
  if (translated === trimmed) return value;
  return value.replace(trimmed, translated);
}

function applyToElementTree(root: ParentNode, language: 'en' | 'mk') {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let node: Node | null = walker.currentNode;

  while (node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const textNode = node as Text;
      if (!shouldSkipTextNode(textNode)) {
        const current = textNode.nodeValue ?? '';
        if (!textNodeOriginal.has(textNode)) textNodeOriginal.set(textNode, current);
        const original = textNodeOriginal.get(textNode) ?? current;
        const next = translateCandidate(language, original);
        if (next !== current) {
          textNode.nodeValue = next;
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;
      let map = attrOriginal.get(el);
      for (const attr of ATTRS) {
        if (!el.hasAttribute(attr)) continue;
        const current = el.getAttribute(attr) ?? '';
        if (!map) {
          map = new Map();
          attrOriginal.set(el, map);
        }
        if (!map.has(attr)) map.set(attr, current);
        const original = map.get(attr) ?? current;
        const next = translateCandidate(language, original);
        if (next !== current) el.setAttribute(attr, next);
      }
    }

    node = walker.nextNode();
  }
}

export const DomTranslationFallback: React.FC = () => {
  const { language } = useI18n();
  const location = useLocation();

  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) return;

    let isApplying = false;
    let rafId: number | null = null;

    const run = (target: ParentNode = root) => {
      if (isApplying) return;
      isApplying = true;
      try {
        applyToElementTree(target, language);
      } finally {
        isApplying = false;
      }
    };

    const scheduleRootPass = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        run(root);
      });
    };

    run();

    const observer = new MutationObserver((mutations) => {
      if (isApplying) return;

      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((n) => {
            if (n.nodeType === Node.ELEMENT_NODE) {
              run(n as Element);
            } else if (n.nodeType === Node.TEXT_NODE) {
              scheduleRootPass();
            }
          });
        } else if (mutation.type === 'characterData' && mutation.target.nodeType === Node.TEXT_NODE) {
          const textNode = mutation.target as Text;
          if (!textNodeOriginal.has(textNode)) {
            textNodeOriginal.set(textNode, textNode.nodeValue ?? '');
          }
          if (!shouldSkipTextNode(textNode)) {
            const current = textNode.nodeValue ?? '';
            const original = textNodeOriginal.get(textNode) ?? current;
            const next = translateCandidate(language, original);
            if (next !== current) {
              run((textNode.parentNode ?? root) as ParentNode);
            }
          }
        } else if (mutation.type === 'attributes' && mutation.target instanceof Element) {
          run(mutation.target);
        }
      }
    });

    observer.observe(root, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: [...ATTRS],
    });

    return () => {
      observer.disconnect();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [language, location.pathname, location.search]);

  return null;
};
