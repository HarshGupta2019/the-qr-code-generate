import React, { useEffect, useRef } from 'react';

const NATIVE_BANNER_ID = 'container-9ed53d5bf97e659ea6fef7339d8148e7';

export const AdsterraNativeBanner: React.FC = () => {
  const slotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slot = slotRef.current;
    const container = slot?.querySelector(`#${NATIVE_BANNER_ID}`);
    if (!slot || !container || slot.querySelector('script[data-adsterra-native]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://bauval.org/21/9ed53d5bf97e659ea6fef7339d8148e7';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.dataset.adsterraNative = 'true';
    slot.insertBefore(script, container);
  }, []);

  return (
    <section
      aria-label="Advertisement"
      className="w-full max-w-full overflow-hidden py-4"
    >
      <div ref={slotRef} className="w-full max-w-full overflow-hidden">
        <div id={NATIVE_BANNER_ID} className="w-full max-w-full overflow-hidden" />
      </div>
    </section>
  );
};
