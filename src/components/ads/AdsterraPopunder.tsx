import React, { useEffect } from 'react';

export const AdsterraPopunder: React.FC = () => {
  useEffect(() => {
    if (document.querySelector('script[data-adsterra-popunder]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://abscloud.org/1/4dcda027e934c6908f0b6658f3519782';
    script.setAttribute('data-cfasync', 'false');
    script.dataset.adsterraPopunder = 'true';
    document.body.appendChild(script);
  }, []);

  return null;
};
