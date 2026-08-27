import React, { useState } from 'react';
import {
  ChevronDown,
  HelpCircle,
  CheckCircle2,
  Smartphone,
  Sparkles,
  Printer,
  ShieldCheck,
  Zap,
  Infinity as InfinityIcon,
  Download,
  Lock,
  Palette,
  Layers,
  HeartHandshake,
  Star,
} from 'lucide-react';

const WHY_CHOOSE_TQCG = [
  {
    icon: InfinityIcon,
    iconColor: 'text-sky-500',
    bgColor: 'bg-sky-500/10 dark:bg-sky-500/20',
    title: '100% Free & Never Expiring',
    description:
      'Generate unlimited static QR codes with zero subscription fees, no credit card required, and no hidden trial expiration traps. Your codes work forever.',
  },
  {
    icon: Lock,
    iconColor: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    title: 'Privacy-First (Client-Side)',
    description:
      'Your privacy is guaranteed. All QR codes are rendered directly in your browser. We never store your passwords, Wi-Fi credentials, or private contacts.',
  },
  {
    icon: Palette,
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-500/10 dark:bg-purple-500/20',
    title: 'Studio-Quality Customization',
    description:
      'Customize dot patterns, eye styles, custom logos, elegant CTA frames ("Scan Me"), and vibrant color gradients with built-in contrast scoring.',
  },
  {
    icon: Download,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-500/10 dark:bg-blue-500/20',
    title: 'Vector SVG & Ultra-HD PNG',
    description:
      'Download infinite-resolution SVG vectors for billboards and high-end printing, crisp 4000px PNGs, and print-ready multi-code PDF sheets.',
  },
  {
    icon: Layers,
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-500/10 dark:bg-amber-500/20',
    title: '14+ Dedicated QR Formats',
    description:
      'Support for URLs, vCards, Wi-Fi, WhatsApp, SMS, GPS Maps, Calendar Events, App Stores, Crypto wallets, UPI/PayPal, and Social linktrees.',
  },
  {
    icon: Zap,
    iconColor: 'text-rose-500',
    bgColor: 'bg-rose-500/10 dark:bg-rose-500/20',
    title: 'Fast, Mobile-Optimized & Batch',
    description:
      'Ultra-responsive UI that works seamlessly on mobile devices, tablets, and desktops. Includes a built-in camera QR scanner and bulk batch generator.',
  },
];

const FAQS = [
  {
    q: 'Do the generated QR codes expire?',
    a: 'No! All static QR codes generated on The QR Code Generate (TQCG) are permanent and will never expire. They directly encode your destination information (URL, Wi-Fi details, vCard, plain text) inside the optical matrix itself without routing through fragile third-party redirect servers.',
  },
  {
    q: 'Is The QR Code Generate (TQCG) completely free for commercial use?',
    a: 'Yes, 100% free! You can generate unlimited high-resolution QR codes for packaging, product labels, restaurant menus, business cards, billboards, and flyers without any watermark or subscription fees.',
  },
  {
    q: 'What is the recommended size when printing a QR code on paper or merchandise?',
    a: 'A good rule of thumb is the 10:1 scanning ratio: Scanning Distance ÷ 10 = Minimum QR Code Size. For example, a business card held 20cm away should have a QR code at least 2cm x 2cm (0.8" x 0.8"). For billboards 10 meters away, the QR code should be at least 1 meter wide.',
  },
  {
    q: 'Why should I use High (Level H) Error Correction when adding a logo?',
    a: 'Level H error correction embeds up to 30% redundant Reed-Solomon recovery data into the QR pattern. When a custom logo is placed in the center, it covers part of the pattern—Level H ensures camera scanners can still reconstruct the full data seamlessly.',
  },
  {
    q: 'Can every modern smartphone scan QR codes without installing an app?',
    a: 'Yes! Both iOS (iPhone Camera app) and Android (Google Lens, Samsung Camera, and default camera apps) scan QR codes natively right out of the box when pointed at any standard QR code.',
  },
  {
    q: 'What vector formats are available for print designers?',
    a: 'You can download infinite-resolution SVG vector files that scale cleanly to any billboard dimension without pixelation, as well as ultra-high-resolution PNGs up to 4000px and print-ready PDF sheets.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-12 space-y-16 text-slate-800 dark:text-slate-200">
      {/* SECTION 1: WHY CHOOSE TQCG */}
      <div id="why-choose-tqcg" className="space-y-8">
        <div className="text-center max-w-3xl mx-auto px-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-sky-100 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 mb-3 shadow-xs">
            <Star className="w-3.5 h-3.5 fill-sky-500 text-sky-500" />
            <span>Trusted Free QR Code Platform</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-['Plus_Jakarta_Sans']">
            Why Choose <span className="text-sky-600 dark:text-sky-400">TQCG</span>?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            The QR Code Generate (TQCG) is engineered to provide the fastest, safest, and most versatile QR code creation experience without any paywalls or watermarks.
          </p>
        </div>

        {/* Feature Grid - Mobile Friendly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {WHY_CHOOSE_TQCG.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700 transition-all shadow-xs hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl ${item.bgColor} ${item.iconColor} flex items-center justify-center mb-4 transition-transform group-hover:scale-105`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges Bar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-around gap-6 text-center shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-left">
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">100% Client-Side Privacy</p>
              <p className="text-[11px] sm:text-xs font-medium text-slate-600 dark:text-slate-300">Zero data stored on servers</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 flex items-center justify-center shrink-0 border border-sky-200 dark:border-sky-800">
              <InfinityIcon className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            </div>
            <div className="text-left">
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">Lifetime Validity</p>
              <p className="text-[11px] sm:text-xs font-medium text-slate-600 dark:text-slate-300">Codes never expire or break</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
              <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-left">
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">Ultra-HD & SVG Vector</p>
              <p className="text-[11px] sm:text-xs font-medium text-slate-600 dark:text-slate-300">Billboard & print ready</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: DESIGN & PRINT GUIDELINES */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto px-2">
          <span className="text-xs font-extrabold tracking-wider uppercase text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-3 py-1 rounded-full border border-sky-200 dark:border-sky-800">
            Design & Print Guidelines
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-3 font-['Plus_Jakarta_Sans']">
            How to Make Perfect, 100% Scannable QR Codes
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5">
            Follow these essential rules to guarantee instant scans across all lighting conditions and devices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-3.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
              1. Maintain High Color Contrast
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Always use dark dots on a light background (or high-contrast reverse). Avoid faint yellows, light pastels, or gray-on-white which fail in low-light environments.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3.5">
              <Printer className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
              2. Download SVG / Ultra-HD PNG
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              For professional physical print (packaging, menus, t-shirts, signs), export as SVG vector or 4000px PNG to ensure razor-sharp edges without blur.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs sm:col-span-2 md:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3.5">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
              3. Test with Multiple Devices
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Before running thousands of print copies, scan the physical print test with both an iPhone and an Android phone under different lighting conditions.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: FAQ ACCORDION */}
      <div className="max-w-3xl mx-auto px-2">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-2 font-['Plus_Jakarta_Sans']">
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 dark:text-sky-400" />
            <span>Frequently Asked Questions</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5">
            Quick answers about format capabilities, expiration, printing, and error correction.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 transition-colors shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                      isOpen ? 'rotate-180 text-sky-600 dark:text-sky-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
