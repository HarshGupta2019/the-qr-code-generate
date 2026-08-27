import React from 'react';
import { Globe, Sparkles, ExternalLink, Check, Copy } from 'lucide-react';

interface UrlFormProps {
  url: string;
  setUrl: (url: string) => void;
  isDynamic: boolean;
  setIsDynamic: (val: boolean) => void;
}

const PRESET_URLS = [
  { label: 'Google', url: 'https://google.com' },
  { label: 'YouTube', url: 'https://youtube.com' },
  { label: 'Instagram', url: 'https://instagram.com' },
  { label: 'LinkedIn', url: 'https://linkedin.com' },
  { label: 'GitHub', url: 'https://github.com' },
];

export const UrlForm: React.FC<UrlFormProps> = ({
  url,
  setUrl,
  isDynamic,
  setIsDynamic,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 text-white">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
          Website URL / Web Link
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
            <Globe className="w-5 h-5" />
          </div>
          <input
            id="input-qr-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://yourwebsite.com/landing-page"
            className="w-full pl-10 pr-24 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono"
          />
          <div className="absolute inset-y-0 right-1.5 flex items-center gap-1">
            {url && (
              <>
                <button
                  type="button"
                  onClick={handleCopy}
                  title="Copy URL"
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={url.startsWith('http') ? url : `https://${url}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Test link in new tab"
                  className="p-1.5 text-zinc-400 hover:text-blue-400 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </>
            )}
          </div>
        </div>
        <p className="mt-1.5 text-xs text-zinc-400 flex items-center gap-1">
          <span>Tip: Always include <code className="text-blue-400 font-mono">https://</code> for reliable scanning across all mobile camera apps.</span>
        </p>
      </div>

      {/* Quick Presets */}
      <div>
        <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1.5">
          Quick Sample URLs
        </span>
        <div className="flex flex-wrap gap-1.5">
          {PRESET_URLS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setUrl(item.url)}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-zinc-700 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Link Mode Toggle Note */}
      <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white">
              Static QR Code (Free & Forever Permanent)
            </span>
          </div>
          <p className="text-zinc-300 mt-0.5">
            This QR code encodes your direct URL directly into the matrix pixels. It never expires, has no scan limits, and requires no external redirect servers.
          </p>
        </div>
      </div>
    </div>
  );
};

