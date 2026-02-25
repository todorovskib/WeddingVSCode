import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: [
      'By accessing or using WedMKD, you agree to these Terms of Service. If you do not agree, do not use the service.',
      'These terms apply to use of the website, sample pages, planning tools, and related features.',
    ],
  },
  {
    title: '2. Accounts and Access',
    body: [
      'You are responsible for maintaining the confidentiality of your account credentials and any wedding page passwords you create.',
      'You agree to provide accurate information and to use the service only for lawful purposes.',
    ],
  },
  {
    title: '3. Acceptable Use',
    body: [
      'You may not misuse the platform, attempt unauthorized access, interfere with service operation, or upload unlawful or harmful content.',
      'You are responsible for the wedding content, guest data, and messages you create or share through the platform.',
    ],
  },
  {
    title: '4. Subscriptions and Pricing',
    body: [
      'Paid plans and features may be offered under different tiers. Pricing, limits, and included features may change in the future with notice.',
      'Sample pages shown on the site are illustrative and may include design elements that vary from final configured websites.',
    ],
  },
  {
    title: '5. Intellectual Property',
    body: [
      'WedMKD and its design, branding, and software content are protected by applicable intellectual property laws.',
      'You retain rights to content you submit, but you grant us the permissions necessary to host and display it as part of the service.',
    ],
  },
  {
    title: '6. Availability and Changes',
    body: [
      'We may modify, suspend, or discontinue parts of the service, add new features, or change existing functionality.',
      'We aim for reliable access but do not guarantee uninterrupted availability.',
    ],
  },
  {
    title: '7. Disclaimers',
    body: [
      'The service is provided on an "as is" and "as available" basis to the maximum extent permitted by law.',
      'We do not guarantee that all features will meet every use case, especially where third-party integrations or vendor services are involved.',
    ],
  },
  {
    title: '8. Limitation of Liability',
    body: [
      'To the extent permitted by law, WedMKD is not liable for indirect, incidental, special, or consequential damages arising from use of the service.',
      'This includes losses related to wedding scheduling, third-party vendors, or user-generated content errors.',
    ],
  },
  {
    title: '9. Termination',
    body: [
      'We may suspend or terminate accounts that violate these terms or misuse the platform.',
      'You may stop using the service at any time and request account deletion subject to our retention and legal obligations.',
    ],
  },
  {
    title: '10. Governing Terms and Updates',
    body: [
      'These terms may be updated periodically. Continued use of the service after updates constitutes acceptance of the revised terms.',
      'Any disputes or legal questions will be governed by applicable local law unless otherwise required by statute.',
    ],
  },
];

export const TermsOfService: React.FC = () => {
  const { t } = useI18n();
  return (
    <div className="app-shell" data-auto-motion>
      <section className="page-wrap pt-6">
        <div className="card-surface-strong px-5 py-8 sm:px-8">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{t('Legal')}</p>
          <h1 className="mt-2 text-5xl font-semibold text-stone-900 sm:text-6xl">{t('Terms of Service')}</h1>
          <p className="mt-3 text-sm leading-6 text-stone-600">
            {t('Last updated: February 25, 2026. These terms govern use of the WedMKD website, wedding planning tools, sample pages, and related services.')}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/privacy" className="btn-secondary">{t('Privacy Policy')}</Link>
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
              <h2 className="text-3xl font-semibold text-stone-900">{t('11. Contact')}</h2>
              <p className="mt-2 text-sm leading-7 text-stone-600">
                {t('If you have questions about these Terms of Service, contact us at')}{' '}
                <a href="mailto:hello@wedmkd.com" className="font-medium text-stone-800 hover:underline">
                  hello@wedmkd.com
                </a>{' '}
                {t('or via the')}{' '}
                <Link to="/contact" className="font-medium text-stone-800 hover:underline">{t('Contact page')}</Link>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};


