import React from 'react';
import { FileText } from 'lucide-react';

interface TextFormProps {
  text: string;
  setText: (text: string) => void;
}

const PRESET_TEXTS = [
  'Welcome to our store! Enjoy 10% off your purchase with code WELCOME10.',
  'Wi-Fi Guest Access: Network: Guest_Lounge, Key: Lounge2026',
  'Thank you for attending today! Please leave your feedback at the front desk.',
];

export const TextForm: React.FC<TextFormProps> = ({ text, setText }) => {
  const charCount = text.length;

  return (
    <div className="space-y-4 text-white">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
            Plain Text Content
          </label>
          <span
            className={`text-xs font-mono ${
              charCount > 500 ? 'text-amber-400 font-bold' : 'text-zinc-400'
            }`}
          >
            {charCount} characters
          </span>
        </div>
        <div className="relative">
          <textarea
            id="input-qr-text"
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste any text, message, coupon code, serial number, or instructions here..."
            className="w-full p-3.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-sans resize-y"
          />
        </div>
        <p className="mt-1.5 text-xs text-zinc-400">
          When scanned, smartphones will display this exact text message.
        </p>
      </div>

      {/* Presets */}
      <div>
        <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1.5">
          Quick Text Examples
        </span>
        <div className="space-y-1.5">
          {PRESET_TEXTS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setText(item)}
              className="w-full text-left p-2.5 text-xs rounded-lg bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-zinc-700 transition-colors line-clamp-1"
            >
              "{item}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

