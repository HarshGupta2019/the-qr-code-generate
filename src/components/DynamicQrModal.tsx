import React from 'react';
import { Sparkles, X, CheckCircle, ShieldCheck, Zap, Globe, Lock } from 'lucide-react';

interface DynamicQrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DynamicQrModal: React.FC<DynamicQrModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Static vs Dynamic QR Codes
              </h3>
              <p className="text-xs text-slate-500">
                Understanding the differences, advantages, and use cases
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Static QR Card */}
            <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-blue-900 dark:text-blue-200">
                  Static QR Code
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                  100% Free Forever
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Directly encodes your text, URL, Wi-Fi, or vCard information inside the pixels.
              </p>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Never expires, works forever</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Unlimited scans with zero limits</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>100% private, no middleman server</span>
                </li>
                <li className="flex items-center gap-1.5 text-slate-400">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>Destination URL cannot be changed once printed</span>
                </li>
              </ul>
            </div>

            {/* Dynamic QR Card */}
            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-amber-900 dark:text-amber-200">
                  Dynamic QR Code
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300">
                  Editable Link
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Encodes a short routing URL that redirects scanners to your real website.
              </p>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Change destination link anytime</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Track scan analytics (time, device, city)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Cleaner, less dense QR pixel matrix</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs text-slate-600 dark:text-slate-300 space-y-2 border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Which one should you choose?
            </h4>
            <p>
              For business cards, menus, Wi-Fi sharing, and direct website links where the content is fixed, **Static QR codes** created right here on <strong>The QR Code Generate</strong> are the safest, most reliable choice because they never expire and require no external subscriptions.
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
