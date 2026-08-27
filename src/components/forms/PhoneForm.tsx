import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { SmsData } from '../../types';

interface PhoneFormProps {
  phone: string;
  setPhone: (phone: string) => void;
}

export const PhoneForm: React.FC<PhoneFormProps> = ({ phone, setPhone }) => {
  return (
    <div className="space-y-4 text-white">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
          Phone Number to Dial *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
            <Phone className="w-5 h-5" />
          </div>
          <input
            id="input-phone-dial"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 800 555 0199"
            className="w-full pl-10 pr-3 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 font-mono"
          />
        </div>
        <p className="mt-1.5 text-xs text-zinc-400">
          When scanned, user devices will immediately prompt: <span className="font-semibold text-white">"Call {phone || '+1 800 555 0199'}"</span>.
        </p>
      </div>
    </div>
  );
};

interface SmsFormProps {
  sms: SmsData;
  setSms: React.Dispatch<React.SetStateAction<SmsData>>;
}

export const SmsForm: React.FC<SmsFormProps> = ({ sms, setSms }) => {
  const handleChange = (field: keyof SmsData, value: string) => {
    setSms((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4 text-white">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
          Recipient Phone Number *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
            <Phone className="w-4 h-4" />
          </div>
          <input
            id="input-sms-recipient"
            type="tel"
            value={sms.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            placeholder="+1 555 0199"
            className="w-full pl-9 pr-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 font-mono"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
          SMS Pre-Filled Text *
        </label>
        <div className="relative">
          <div className="absolute top-3 left-3 pointer-events-none text-zinc-400">
            <MessageCircle className="w-4 h-4" />
          </div>
          <textarea
            id="input-sms-body"
            rows={3}
            value={sms.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="e.g. SUBSCRIBE, CONFIRM, or feedback message..."
            className="w-full pl-9 pr-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

