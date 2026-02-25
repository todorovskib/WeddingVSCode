import React from 'react';
import { useI18n } from '../../context/I18nContext';

interface LogoCloudProps {
  title?: string;
  items: string[];
}

export const LogoCloud: React.FC<LogoCloudProps> = ({ title = 'Trusted by studios, planners, and wedding creators', items }) => {
  const { t } = useI18n();
  return (
    <div className="page-wrap pt-4">
      <div className="logo-strip p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-stone-600">{t(title)}</p>
          <div className="logo-cloud">
            {items.map((item) => (
              <span key={item} className="logo-chip">
                {t(item)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
