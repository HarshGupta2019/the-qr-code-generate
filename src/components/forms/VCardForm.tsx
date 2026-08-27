import React from 'react';
import { User, Building, Briefcase, Phone, Mail, Globe, MapPin, AlignLeft } from 'lucide-react';
import { VCardData } from '../../types';

interface VCardFormProps {
  vcard: VCardData;
  setVcard: React.Dispatch<React.SetStateAction<VCardData>>;
}

export const VCardForm: React.FC<VCardFormProps> = ({ vcard, setVcard }) => {
  const handleChange = (field: keyof VCardData, value: string) => {
    setVcard((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4 text-white">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
          Digital Business Card (vCard 3.0)
        </label>
        <span className="text-xs text-blue-400 font-medium">
          Direct 1-tap Phone Contact Save
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            First Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={vcard.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              placeholder="John"
              className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            value={vcard.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Doe"
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            Company / Organization
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <Building className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={vcard.organization}
              onChange={(e) => handleChange('organization', e.target.value)}
              placeholder="Acme Innovations Inc."
              className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            Job Title
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={vcard.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
              placeholder="Head of Product"
              className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            Mobile Phone
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              value={vcard.phoneCell}
              onChange={(e) => handleChange('phoneCell', e.target.value)}
              placeholder="+1 (555) 234-5678"
              className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={vcard.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="john@example.com"
              className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            Website URL
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <Globe className="w-4 h-4" />
            </div>
            <input
              type="url"
              value={vcard.url}
              onChange={(e) => handleChange('url', e.target.value)}
              placeholder="https://johndoe.com"
              className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            City & Country
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={vcard.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="San Francisco, USA"
              className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-zinc-300 mb-1">
          Bio / Notes
        </label>
        <div className="relative">
          <div className="absolute top-2.5 left-3 pointer-events-none text-zinc-400">
            <AlignLeft className="w-4 h-4" />
          </div>
          <textarea
            rows={2}
            value={vcard.note}
            onChange={(e) => handleChange('note', e.target.value)}
            placeholder="Specializing in design systems and full stack architecture..."
            className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

