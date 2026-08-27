import React, { useState, useEffect } from 'react';
import {
  Link2,
  FileText,
  User,
  Wifi,
  MessageSquare,
  Mail,
  Phone,
  MessageCircle,
  Calendar,
  MapPin,
  Coins,
  Share2,
  Smartphone,
  CreditCard,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { QrDataType } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface TypeSelectorProps {
  selectedType: QrDataType;
  onSelectType: (type: QrDataType) => void;
}

interface TypeItem {
  id: QrDataType;
  icon: React.ComponentType<{ className?: string }>;
}

const QR_TYPES: TypeItem[] = [
  { id: 'url', icon: Link2 },
  { id: 'text', icon: FileText },
  { id: 'vcard', icon: User },
  { id: 'wifi', icon: Wifi },
  { id: 'whatsapp', icon: MessageSquare },
  { id: 'email', icon: Mail },
  { id: 'phone', icon: Phone },
  { id: 'sms', icon: MessageCircle },
  { id: 'event', icon: Calendar },
  { id: 'location', icon: MapPin },
  { id: 'crypto', icon: Coins },
  { id: 'social', icon: Share2 },
  { id: 'app', icon: Smartphone },
  { id: 'payment', icon: CreditCard },
];

export const TypeSelector: React.FC<TypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { t } = useLanguage();

  // If selectedType is not in the first 6 items, auto-expand so the user sees their active selection
  useEffect(() => {
    const selectedIndex = QR_TYPES.findIndex((item) => item.id === selectedType);
    if (selectedIndex >= 6 && !isExpanded) {
      setIsExpanded(true);
    }
  }, [selectedType]);

  const visibleTypes = isExpanded ? QR_TYPES : QR_TYPES.slice(0, 6);

  return (
    <div className="w-full text-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
            {t.types ? 'Select QR Code Content Type' : 'QR Type'}
          </label>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-medium">
            {isExpanded ? '14 Formats' : 'Showing 6 of 14'}
          </span>
        </div>

        <button
          id="btn-toggle-view-all-types"
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 py-1 px-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer"
        >
          {isExpanded ? (
            <>
              <span>Show Less</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>View All (14)</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
        {visibleTypes.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedType === item.id;
          const label = (t.types && t.types[item.id]) || item.id.toUpperCase();

          return (
            <button
              key={item.id}
              id={`type-btn-${item.id}`}
              type="button"
              onClick={() => onSelectType(item.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer relative group ${
                isSelected
                  ? 'border-sky-500 bg-sky-600/30 text-white shadow-sm ring-2 ring-sky-500/40'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/80 hover:text-white'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center mb-1.5 transition-colors ${
                  isSelected
                    ? 'bg-sky-600 text-white'
                    : 'bg-zinc-800 text-zinc-300 group-hover:bg-zinc-700 group-hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-full">
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom helper toggle link if not expanded */}
      {!isExpanded && (
        <div className="mt-2.5 pt-2 border-t border-zinc-800/60 flex justify-center">
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 font-medium cursor-pointer transition-colors py-1 px-3 rounded-lg hover:bg-zinc-900"
          >
            <span>+ 8 more formats available</span>
            <ChevronDown className="w-3.5 h-3.5 text-sky-400" />
          </button>
        </div>
      )}
    </div>
  );
};


