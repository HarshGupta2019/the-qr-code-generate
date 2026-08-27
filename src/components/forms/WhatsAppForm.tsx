import React from 'react';
import { MessageSquare, PhoneCall } from 'lucide-react';
import { WhatsAppData } from '../../types';

interface WhatsAppFormProps {
  whatsapp: WhatsAppData;
  setWhatsapp: React.Dispatch<React.SetStateAction<WhatsAppData>>;
}

const COUNTRY_CODES = [
  { code: '+1', country: 'US / Canada (+1)' },
  { code: '+44', country: 'United Kingdom (+44)' },
  { code: '+91', country: 'India (+91)' },
  { code: '+61', country: 'Australia (+61)' },
  { code: '+49', country: 'Germany (+49)' },
  { code: '+33', country: 'France (+33)' },
  { code: '+34', country: 'Spain (+34)' },
  { code: '+81', country: 'Japan (+81)' },
  { code: '+55', country: 'Brazil (+55)' },
  { code: '+971', country: 'UAE (+971)' },
  { code: '+65', country: 'Singapore (+65)' },
  { code: '+86', country: 'China (+86)' },
];

export const WhatsAppForm: React.FC<WhatsAppFormProps> = ({ whatsapp, setWhatsapp }) => {
  const handleChange = (field: keyof WhatsAppData, value: string) => {
    setWhatsapp((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4 text-white">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
          WhatsApp Phone Number *
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          <div className="col-span-1 sm:col-span-1">
            <select
              value={whatsapp.countryCode}
              onChange={(e) => handleChange('countryCode', e.target.value)}
              className="w-full py-2.5 px-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code} className="bg-zinc-900 text-white">
                  {c.code} {c.country.split(' ')[0]}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2 sm:col-span-3 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <PhoneCall className="w-4 h-4" />
            </div>
            <input
              type="tel"
              value={whatsapp.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              placeholder="9876543210 (without country prefix)"
              className="w-full pl-9 pr-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 font-mono"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
            Pre-Filled Greeting Message (Optional)
          </label>
          <span className="text-xs text-zinc-400">Auto-filled in WhatsApp chat</span>
        </div>
        <div className="relative">
          <div className="absolute top-3 left-3 pointer-events-none text-zinc-400">
            <MessageSquare className="w-4 h-4" />
          </div>
          <textarea
            rows={3}
            value={whatsapp.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="Hello! I would like to inquire about your services / book a table..."
            className="w-full pl-9 pr-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span className="text-xs text-zinc-400 self-center mr-1">Suggestions:</span>
        {['Hi! I have a question.', 'Inquiring about pricing', 'Table booking for 2', 'Support inquiry'].map((msg) => (
          <button
            key={msg}
            type="button"
            onClick={() => handleChange('message', msg)}
            className="px-2.5 py-1 text-xs rounded-lg bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-zinc-700 transition-colors cursor-pointer"
          >
            {msg}
          </button>
        ))}
      </div>
    </div>
  );
};

