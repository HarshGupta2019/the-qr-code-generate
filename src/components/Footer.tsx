import React from 'react';
import { QrCode, Shield, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QrDataType } from '../types';
import { ALL_QR_TYPES, QR_TYPE_CONFIGS } from '../data/qrTypeConfigs';
import statueOfUnityImg from '../assets/images/statue_of_unity_1787841846135.jpg';

interface FooterProps {
  onSelectType?: (type: QrDataType) => void;
  onOpenDynamicModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectType, onOpenDynamicModal }) => {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-xs">
                  <QrCode className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                  The <span className="text-sky-600">QR Code</span> Generate
                </span>
              </Link>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Create free, customizable, high-resolution QR codes for websites, contacts, Wi-Fi networks, WhatsApp, and social media with instant vector downloads.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Client-side generation • No data stored on remote servers</span>
            </div>
          </div>

          {/* Supported Types - Dedicated Routes */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              QR Code Generators
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              {ALL_QR_TYPES.slice(0, 7).map((typeKey) => {
                const config = QR_TYPE_CONFIGS[typeKey];
                return (
                  <li key={typeKey}>
                    <Link
                      to={config.route}
                      onClick={() => onSelectType && onSelectType(typeKey)}
                      className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      {config.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* More Dedicated Routes */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              More QR Formats
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              {ALL_QR_TYPES.slice(7).map((typeKey) => {
                const config = QR_TYPE_CONFIGS[typeKey];
                return (
                  <li key={typeKey}>
                    <Link
                      to={config.route}
                      onClick={() => onSelectType && onSelectType(typeKey)}
                      className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      {config.title}
                    </Link>
                  </li>
                );
              })}
              {onOpenDynamicModal && (
                <li className="pt-1">
                  <button
                    type="button"
                    onClick={onOpenDynamicModal}
                    className="text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
                  >
                    Static vs Dynamic QR Guide
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Quick Info & Compliance */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Standard Compliance
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
              Generates ISO/IEC 18004 compliant 2D barcodes readable by all standard iOS Camera, Google Lens, and Android scanning devices.
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300">
              <span className="font-bold text-slate-900 dark:text-white block mb-0.5">The QR Code Generate</span>
              Free online QR code generator tool with 14+ specialized formats.
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} The QR Code Generate. All rights reserved.</p>
          
          {/* Made with ❤️ in India with Statue of Unity */}
          <div
            id="made-in-india-badge"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-xs hover:border-sky-300 dark:hover:border-sky-700 transition-all group"
          >
            <span className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200 text-xs">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
              <span>in</span>
              <span className="font-bold bg-gradient-to-r from-amber-500 via-slate-700 dark:via-white to-emerald-500 bg-clip-text text-transparent">
                India
              </span>
            </span>
            <div className="w-5 h-5 rounded-full overflow-hidden border border-amber-500/50 shadow-xs shrink-0 ring-1 ring-emerald-500/30">
              <img
                src={statueOfUnityImg}
                alt="Statue of Unity"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
