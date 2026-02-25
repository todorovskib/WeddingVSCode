import React from 'react';
import { WedmarkIcon } from './icons/BrandIcons';

interface BrandLogoProps {
  compact?: boolean;
  subtitle?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ compact = false, subtitle = 'Wedding Platform' }) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`brand-logo-shell ${compact ? 'h-10 w-10' : 'h-11 w-11'}`} aria-hidden>
        <WedmarkIcon className="h-[72%] w-[72%] text-stone-900" />
      </div>
      <div className="leading-tight">
        {!compact && <p className="text-[10px] uppercase tracking-[0.18em] text-stone-500">{subtitle}</p>}
        <p className={`${compact ? 'text-lg' : 'text-2xl'} font-semibold tracking-[-0.02em] text-stone-900`}>
          WedMKD
        </p>
      </div>
    </div>
  );
};
