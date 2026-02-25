import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';

const sections = [
  {
    title: '1. Information We Collect',
    body: [
      'We may collect account information (name, email), wedding planning content (guest lists, event details, RSVP responses), and technical information needed to operate the platform.',
      'If you use contact forms or request demos, we may collect your communication details and the content of your message.',
    ],
  },
  {
    title: '2. How We Use Information',
    body: [
      'We use data to provide wedding website features, guest management tools, product browsing, and account functionality.',
      'We may also use information to improve the user experience, troubleshoot issues, and respond to support or sales inquiries.',
    ],
  },
  {
    title: '3. Sharing and Disclosure',
    body: [
      'We do not sell personal information. Data may be shared with service providers or infrastructure tools only as needed to operate the platform.',
      'We may disclose information when required by law or to protect the platform, users, or our rights.',
    ],
  },
  {
    title: '4. Data Retention',
    body: [
      'We retain account and wedding data while accounts are active and for a reasonable period afterward for backup, compliance, or dispute resolution purposes.',
      'You may request account deletion or data removal, subject to legal and operational obligations.',
    ],
  },
  {
    title: '5. Security',
    body: [
      'We use reasonable technical and organizational measures to protect data, but no system is completely secure.',
      'Users are responsible for keeping account credentials and shared wedding passwords secure.',
    ],
  },
  {
    title: '6. Cookies and Similar Technologies',
    body: [
      'We may use cookies or similar technologies for session handling, authentication, analytics, and interface preferences.',
      'You can manage cookies through your browser settings, though some features may not function correctly if disabled.',
    ],
  },
  {
    title: '7. Your Rights',
    body: [
      'Depending on your location, you may have rights to access, correct, delete, or export your personal data, and to object to certain processing.',
      'To make a request, contact us using the details below.',
    ],
  },
  {
    title: '8. Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. Material changes will be reflected on this page with an updated date.',
    ],
  },
];

export const PrivacyPolicy: React.FC = () => {
  const { t } = useI18n();
  return (
    <div className="app-shell" data-auto-motion>
      <section className="page-wrap pt-6">
        <div className="card-surface-strong px-5 py-8 sm:px-8">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{t('Legal')}</p>
          <h1 className="mt-2 text-5xl font-semibold text-stone-900 sm:text-6xl">{t('Privacy Policy')}</h1>
          <p className="mt-3 text-sm leading-6 text-stone-600">
            {t('Last updated: February 25, 2026. This policy explains how WedMKD handles personal information when using the website and related services.')}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/terms" className="btn-secondary">{t('Terms of Service')}</Link>
            <Link to="/contact" className="btn-primary">{t('Contact Us')}</Link>
          </div>
        </div>
      </section>

      <section className="page-wrap section-gap">
        <div className="card-surface p-5 sm:p-6">
          <div className="space-y-6">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-3xl font-semibold text-stone-900">{t(section.title)}</h2>
                <div className="mt-2 space-y-2">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-7 text-stone-600">
                      {t(paragraph)}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section>
              <h2 className="text-3xl font-semibold text-stone-900">{t('9. Contact')}</h2>
              <p className="mt-2 text-sm leading-7 text-stone-600">
                {t('Questions about this Privacy Policy can be sent to')}{' '}
                <a href="mailto:hello@wedmkd.com" className="font-medium text-stone-800 hover:underline">
                  hello@wedmkd.com
                </a>{' '}
                {t('or through the')}{' '}
                <Link to="/contact" className="font-medium text-stone-800 hover:underline">{t('Contact page')}</Link>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

