import React, { useState } from 'react';
import { QRTypeConfig } from '../../data/qrTypeConfigs';
import {
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { AdPlaceholder } from '../ads/AdPlaceholder';

interface SEOContentProps {
  config: QRTypeConfig;
}

export const SEOContent: React.FC<SEOContentProps> = ({ config }) => {
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="w-full mt-12 space-y-12 text-slate-800 dark:text-slate-200">
      {/* 1. In-depth Introduction & Overview */}
      <section className="bg-white/90 dark:bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-sky-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="p-1.5 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
            <config.icon className="w-5 h-5" />
          </span>
          <span className="text-xs font-extrabold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Comprehensive Guide
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-4 font-['Plus_Jakarta_Sans']">
          About {config.title}
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base mb-6">
          {config.intro}
        </p>

        {/* How It Works Subsection */}
        <div className="p-4 sm:p-5 rounded-xl bg-sky-50/70 dark:bg-slate-800/60 border border-sky-200/70 dark:border-slate-700">
          <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-amber-500" />
            How the {config.breadcrumbLabel} Technology Works
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {config.howItWorks}
          </p>
        </div>
      </section>

      {/* 2. Step-by-Step "How to Create" Guide */}
      <section className="bg-white/90 dark:bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-sky-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            Easy 5-Step Process
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-6 font-['Plus_Jakarta_Sans']">
          How to Create a {config.breadcrumbLabel} in Seconds
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {config.steps.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-full bg-sky-600 text-white font-black text-sm flex items-center justify-center mb-3 shadow-xs">
                  {idx + 1}
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1.5">
                  Step {idx + 1}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Real-World Use Cases & Applications */}
      <section className="bg-white/90 dark:bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-sky-200/80 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2 font-['Plus_Jakarta_Sans']">
          Popular Real-World Use Cases for {config.breadcrumbLabel}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-6">
          Discover how modern organizations, entrepreneurs, and creators leverage this format for maximum convenience.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {config.useCases.map((useCase, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-50/90 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-700 transition-colors group"
            >
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white mb-2 flex items-center gap-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                <ArrowRight className="w-4 h-4 text-sky-500 shrink-0" />
                {useCase.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* In-content safe Ad Slot (well below generator flow) */}
      <AdPlaceholder
        slotId={`ad-content-${config.slug}`}
        format="horizontal"
        className="my-8"
      />

      {/* 4. Benefits & Features */}
      <section className="bg-white/90 dark:bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-sky-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-sky-500" />
          <span className="text-xs font-extrabold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Key Advantages
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-6 font-['Plus_Jakarta_Sans']">
          Why Choose Our {config.title}?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {config.benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-sky-50/60 dark:bg-slate-800/40 border border-sky-100 dark:border-slate-700/60"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Specific FAQ Accordion */}
      <section className="bg-white/90 dark:bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-sky-200/80 dark:border-slate-800 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 mb-2">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2 font-['Plus_Jakarta_Sans']">
            Frequently Asked Questions about {config.breadcrumbLabel}s
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Answers to common questions regarding scanning, formatting, and high-resolution printing.
          </p>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {config.faqs.map((faq, idx) => {
            const isOpen = openFaqIndices.includes(idx);
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-sky-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
