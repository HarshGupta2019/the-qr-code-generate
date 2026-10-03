import React, { useEffect } from 'react';

export const AdsterraSocialBar: React.FC = () => {
  useEffect(() => {
    if (document.querySelector('script[data-adsterra-social-bar]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://bauval.org/14/920b745cf9f3bb0337e8a9e68f5e746a';
    script.setAttribute('data-cfasync', 'false');
    script.dataset.adsterraSocialBar = 'true';
    document.body.appendChild(script);
  }, []);

  return null;
};
