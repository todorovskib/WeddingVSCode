import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & { title?: string };

function SvgBase({ title, children, ...props }: React.PropsWithChildren<IconProps>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden={title ? undefined : true} role={title ? 'img' : undefined} {...props}>
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export const InstagramIcon: React.FC<IconProps> = (props) => (
  <SvgBase {...props}>
    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
  </SvgBase>
);

export const FacebookIcon: React.FC<IconProps> = (props) => (
  <SvgBase {...props}>
    <path
      d="M13.8 8.2h2.4V4.6h-2.8c-3 0-4.7 1.8-4.7 5.1v2H6.1v3.7h2.6V20h3.9v-4.6h2.9l.5-3.7h-3.4V9.9c0-1.1.3-1.7 1.2-1.7Z"
      fill="currentColor"
    />
  </SvgBase>
);

export const TikTokIcon: React.FC<IconProps> = (props) => (
  <SvgBase {...props}>
    <path
      d="M14.8 4.2c.5 1.6 1.7 2.9 3.2 3.5v3.1a7.6 7.6 0 0 1-3.2-1.1v5.7a5.4 5.4 0 1 1-5.4-5.4c.4 0 .8 0 1.2.1v3.2a2.3 2.3 0 1 0 1.1 2V4.2h3.1Z"
      fill="currentColor"
    />
  </SvgBase>
);

export const PinterestIcon: React.FC<IconProps> = (props) => (
  <SvgBase {...props}>
    <path
      d="M12 3.4a8.6 8.6 0 0 0-3.1 16.6c0-.7 0-1.7.2-2.4l1-4.1s-.2-.5-.2-1.3c0-1.2.7-2 1.5-2 .7 0 1 .5 1 1.2 0 .7-.4 1.8-.7 2.8-.2.8.4 1.5 1.2 1.5 1.4 0 2.5-1.5 2.5-3.7 0-1.9-1.4-3.3-3.4-3.3-2.3 0-3.7 1.8-3.7 3.6 0 .7.3 1.5.6 1.9.1.1.1.2.1.4l-.2.9c0 .1-.2.2-.3.1-1-.4-1.6-1.8-1.6-3 0-2.4 1.8-4.7 5.2-4.7 2.7 0 4.8 1.9 4.8 4.5 0 2.7-1.7 4.9-4.1 4.9-.8 0-1.6-.4-1.8-1l-.5 1.8c-.2.7-.6 1.7-1 2.3.7.2 1.4.3 2.1.3A8.6 8.6 0 0 0 12 3.4Z"
      fill="currentColor"
    />
  </SvgBase>
);

export const YouTubeIcon: React.FC<IconProps> = (props) => (
  <SvgBase {...props}>
    <path
      d="M20.2 7.2c-.2-.8-.8-1.4-1.6-1.6C17.2 5.2 12 5.2 12 5.2s-5.2 0-6.6.4c-.8.2-1.4.8-1.6 1.6-.4 1.4-.4 4.8-.4 4.8s0 3.4.4 4.8c.2.8.8 1.4 1.6 1.6 1.4.4 6.6.4 6.6.4s5.2 0 6.6-.4c.8-.2 1.4-.8 1.6-1.6.4-1.4.4-4.8.4-4.8s0-3.4-.4-4.8Z"
      fill="currentColor"
    />
    <path d="m10.3 15.5 4.6-3.5-4.6-3.5v7Z" fill="#fff" />
  </SvgBase>
);

export const WedmarkIcon: React.FC<IconProps> = (props) => {
  return (
    <SvgBase {...props}>
      <circle cx="9.05" cy="13.2" r="4.55" stroke="currentColor" strokeWidth="1.65" />
      <circle cx="14.95" cy="13.2" r="4.55" stroke="currentColor" strokeWidth="1.65" />
      <path
        d="M7.35 15.55c1.25 1.2 2.76 1.83 4.66 1.83 1.93 0 3.47-.64 4.73-1.86"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
      />
      <path
        d="M12 4.35l.46 1.25 1.26.46-1.26.46L12 7.78l-.46-1.26-1.25-.46 1.25-.46L12 4.35Z"
        fill="currentColor"
      />
      <circle cx="12" cy="12.35" r="0.85" fill="currentColor" opacity="0.95" />
    </SvgBase>
  );
};

export type SocialIconName = 'instagram' | 'facebook' | 'tiktok' | 'pinterest' | 'youtube';

export const SocialIcon: React.FC<{ name: SocialIconName; className?: string; title?: string }> = ({
  name,
  className,
  title,
}) => {
  const props = { className, title };
  switch (name) {
    case 'instagram':
      return <InstagramIcon {...props} />;
    case 'facebook':
      return <FacebookIcon {...props} />;
    case 'tiktok':
      return <TikTokIcon {...props} />;
    case 'pinterest':
      return <PinterestIcon {...props} />;
    case 'youtube':
      return <YouTubeIcon {...props} />;
    default:
      return null;
  }
};
