import React, { useEffect, useRef } from 'react';

const DESKTOP_MEDIA_QUERY = '(min-width: 768px)';

declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: string;
      height: number;
      width: number;
      params: Record<string, never>;
    };
  }
}

interface AdsterraBannerProps {
  slotId: string;
  className?: string;
}

interface BannerUnitProps {
  slotId: string;
  active: boolean;
  unit: {
    key: string;
    width: number;
    height: number;
    scriptUrl: string;
  };
}

const BannerUnit: React.FC<BannerUnitProps> = ({ slotId, active, unit }) => {
  const slotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slot = slotRef.current;
    if (!active || !slot || slot.querySelector('script[data-adsterra-banner]')) {
      return;
    }

    window.atOptions = {
      key: unit.key,
      format: 'iframe',
      height: unit.height,
      width: unit.width,
      params: {},
    };

    const script = document.createElement('script');
    script.src = unit.scriptUrl;
    script.dataset.adsterraBanner = unit.key;
    slot.appendChild(script);
  }, [active, unit]);

  return (
    <div
      className={`${active ? '' : 'hidden'} mx-auto w-full overflow-hidden`}
      style={{ maxWidth: unit.width }}
    >
      <div
        ref={slotRef}
        id={slotId}
        aria-label={`Adsterra ${unit.width} by ${unit.height} banner`}
        className="w-full overflow-hidden"
        style={{ minHeight: unit.height }}
      />
    </div>
  );
};

const MOBILE_BANNER = {
  key: '5167a3fe581515c87c8bbd0023ecff3d',
  width: 320,
  height: 50,
  scriptUrl: 'https://bauval.org/22/5167a3fe581515c87c8bbd0023ecff3d',
};

const DESKTOP_BANNER = {
  key: 'b9d32869a17b13b7ae312388e47ac51b',
  width: 728,
  height: 90,
  scriptUrl: 'https://bauval.org/22/b9d32869a17b13b7ae312388e47ac51b',
};

export const AdsterraBanner: React.FC<AdsterraBannerProps> = ({
  slotId,
  className = '',
}) => {
  const [isDesktop, setIsDesktop] = React.useState(() =>
    window.matchMedia(DESKTOP_MEDIA_QUERY).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const updateBanner = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    mediaQuery.addEventListener('change', updateBanner);
    return () => mediaQuery.removeEventListener('change', updateBanner);
  }, []);

  return (
    <section
      aria-label="Advertisement"
      className={`my-6 w-full overflow-hidden ${className}`}
    >
      <BannerUnit
        slotId={`${slotId}-mobile`}
        active={!isDesktop}
        unit={MOBILE_BANNER}
      />
      <BannerUnit
        slotId={`${slotId}-desktop`}
        active={isDesktop}
        unit={DESKTOP_BANNER}
      />
    </section>
  );
};
