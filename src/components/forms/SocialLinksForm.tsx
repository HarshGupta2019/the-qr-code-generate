import React from 'react';
import { Share2, Plus, Trash2, Globe, Instagram, Twitter, Linkedin, Youtube, Github } from 'lucide-react';
import { SocialData, SocialLink } from '../../types';

interface SocialLinksFormProps {
  social: SocialData;
  setSocial: React.Dispatch<React.SetStateAction<SocialData>>;
}

const PLATFORMS: { id: SocialLink['platform']; label: string; placeholder: string }[] = [
  { id: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/yourhandle' },
  { id: 'twitter', label: 'X / Twitter', placeholder: 'https://x.com/yourhandle' },
  { id: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/yourname' },
  { id: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@yourchannel' },
  { id: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@yourhandle' },
  { id: 'github', label: 'GitHub', placeholder: 'https://github.com/yourname' },
  { id: 'website', label: 'Website', placeholder: 'https://yourwebsite.com' },
];

export const SocialLinksForm: React.FC<SocialLinksFormProps> = ({ social, setSocial }) => {
  const addLink = (platform: SocialLink['platform']) => {
    const existing = social.links.find((l) => l.platform === platform);
    if (existing) return;
    setSocial((prev) => ({
      ...prev,
      links: [...prev.links, { platform, url: '' }],
    }));
  };

  const updateLinkUrl = (index: number, url: string) => {
    setSocial((prev) => {
      const updated = [...prev.links];
      updated[index] = { ...updated[index], url };
      return { ...prev, links: updated };
    });
  };

  const removeLink = (index: number) => {
    setSocial((prev) => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-4 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">
            Profile / Brand Title
          </label>
          <input
            type="text"
            value={social.title}
            onChange={(e) => setSocial((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Alex Rivers — Creator"
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">
            Short Tagline / Bio
          </label>
          <input
            type="text"
            value={social.bio}
            onChange={(e) => setSocial((prev) => ({ ...prev, bio: e.target.value }))}
            placeholder="Designer & Maker of cool web apps"
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
          Active Links ({social.links.length})
        </label>
        <div className="space-y-2">
          {social.links.map((link, idx) => {
            const platformConfig = PLATFORMS.find((p) => p.id === link.platform);
            return (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-24 text-xs font-bold text-zinc-200 capitalize px-2 py-2 bg-zinc-800 rounded-lg border border-zinc-700 truncate">
                  {link.platform}
                </span>
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => updateLinkUrl(idx, e.target.value)}
                  placeholder={platformConfig?.placeholder || 'https://...'}
                  className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono"
                />
                <button
                  type="button"
                  onClick={() => removeLink(idx)}
                  className="p-2 text-zinc-400 hover:text-rose-400 rounded-lg hover:bg-rose-950/40 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1.5">
          Add Social Platform
        </span>
        <div className="flex flex-wrap gap-1.5">
          {PLATFORMS.map((p) => {
            const isAdded = social.links.some((l) => l.platform === p.id);
            return (
              <button
                key={p.id}
                type="button"
                disabled={isAdded}
                onClick={() => addLink(p.id)}
                className={`px-2.5 py-1 text-xs rounded-lg border font-medium flex items-center gap-1 transition-all ${
                  isAdded
                    ? 'opacity-40 bg-zinc-900 border-zinc-800 cursor-not-allowed text-zinc-500'
                    : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer'
                }`}
              >
                <Plus className="w-3 h-3" />
                {p.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

