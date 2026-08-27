import React, { useState } from 'react';
import {
  Palette,
  Shapes,
  Image as ImageIcon,
  Square,
  Circle,
  Sliders,
  Upload,
  X,
  Sparkles,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  QrStyleOptions,
  DotType,
  CornerSquareType,
  CornerDotType,
  FrameType,
  ErrorCorrectionLevel,
} from '../types';

interface QrCustomizerProps {
  style: QrStyleOptions;
  setStyle: React.Dispatch<React.SetStateAction<QrStyleOptions>>;
}

const COLOR_PRESETS = [
  { name: 'Classic Slate', fg: '#1e293b', bg: '#ffffff' },
  { name: 'Electric Blue', fg: '#2563eb', bg: '#ffffff' },
  { name: 'Emerald Tech', fg: '#059669', bg: '#ffffff' },
  { name: 'Royal Purple', fg: '#7c3aed', bg: '#ffffff' },
  { name: 'Sunset Orange', fg: '#ea580c', bg: '#ffffff' },
  { name: 'Crimson Red', fg: '#dc2626', bg: '#ffffff' },
  { name: 'Midnight Cyan', fg: '#0891b2', bg: '#ffffff' },
  { name: 'Forest Green', fg: '#15803d', bg: '#ffffff' },
  { name: 'Dark Mode Inverted', fg: '#f8fafc', bg: '#0f172a' },
  { name: 'Indigo Gradient', fg: '#4f46e5', bg: '#ffffff', grad1: '#4f46e5', grad2: '#ec4899', isGrad: true },
  { name: 'Sunset Gradient', fg: '#f97316', bg: '#ffffff', grad1: '#f97316', grad2: '#db2777', isGrad: true },
  { name: 'Ocean Gradient', fg: '#06b6d4', bg: '#ffffff', grad1: '#06b6d4', grad2: '#3b82f6', isGrad: true },
];

const LOGO_PRESETS = [
  {
    name: 'WhatsApp',
    url: 'https://cdn-icons-png.flaticon.com/512/3670/3670051.png',
  },
  {
    name: 'Instagram',
    url: 'https://cdn-icons-png.flaticon.com/512/3955/3955024.png',
  },
  {
    name: 'X (Twitter)',
    url: 'https://cdn-icons-png.flaticon.com/512/5969/5969020.png',
  },
  {
    name: 'YouTube',
    url: 'https://cdn-icons-png.flaticon.com/512/3670/3670147.png',
  },
  {
    name: 'LinkedIn',
    url: 'https://cdn-icons-png.flaticon.com/512/3536/3536505.png',
  },
  {
    name: 'Facebook',
    url: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png',
  },
  {
    name: 'Google',
    url: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
  },
  {
    name: 'Wi-Fi',
    url: 'https://cdn-icons-png.flaticon.com/512/93/93158.png',
  },
  {
    name: 'Scan Icon',
    url: 'https://cdn-icons-png.flaticon.com/512/3756/3756627.png',
  },
  {
    name: 'Bitcoin',
    url: 'https://cdn-icons-png.flaticon.com/512/5968/5968260.png',
  },
  {
    name: 'Spotify',
    url: 'https://cdn-icons-png.flaticon.com/512/3669/3669986.png',
  },
  {
    name: 'Location',
    url: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  },
];

const FRAME_PRESETS = [
  { id: 'none', label: 'No Frame', icon: '◻️' },
  { id: 'bottom-banner', label: 'Bottom Banner', icon: '🏷️' },
  { id: 'top-banner', label: 'Top Banner', icon: '🔝' },
  { id: 'rounded-pill', label: 'Rounded Pill', icon: '💊' },
  { id: 'phone-frame', label: 'Phone Frame', icon: '📱' },
  { id: 'polaroid', label: 'Polaroid Card', icon: '📷' },
  { id: 'bubble', label: 'Speech Bubble', icon: '💬' },
  { id: 'ticket', label: 'Event Ticket', icon: '🎟️' },
] as const;

export const QrCustomizer: React.FC<QrCustomizerProps> = ({ style, setStyle }) => {
  const [activeSection, setActiveSection] = useState<'design' | 'colors' | 'logo' | 'frames' | 'advanced'>('design');

  const update = <K extends keyof QrStyleOptions>(key: K, value: QrStyleOptions[K]) => {
    setStyle((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const res = event.target?.result as string;
        setStyle((prev) => ({
          ...prev,
          logoUrl: res,
          errorCorrectionLevel: 'H', // auto boost error correction for logos
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-lg text-white transition-colors">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800">
        <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
          <Palette className="w-4 h-4 text-blue-400" />
          Customize Style & Appearance
        </h3>
        <button
          type="button"
          onClick={() =>
            setStyle((prev) => ({
              ...prev,
              dotType: 'square',
              dotColor: '#1e293b',
              useGradient: false,
              bgColor: '#ffffff',
              transparentBg: false,
              cornerSquareType: 'square',
              cornerSquareColor: '#1e293b',
              cornerDotType: 'square',
              cornerDotColor: '#1e293b',
              logoUrl: null,
              frameType: 'none',
              errorCorrectionLevel: 'M',
            }))
          }
          className="text-xs text-zinc-400 hover:text-blue-400 font-medium cursor-pointer"
        >
          Reset Style
        </button>
      </div>

      {/* Accordion Tabs */}
      <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-1.5 mb-4 p-1 bg-zinc-900 rounded-xl border border-zinc-800">
        {(
          [
            { id: 'design', label: 'Pattern & Shapes', icon: Shapes },
            { id: 'colors', label: 'Colors & Gradient', icon: Palette },
            { id: 'logo', label: 'Logo / Icon', icon: ImageIcon },
            { id: 'frames', label: 'Frames & CTA', icon: Square },
            { id: 'advanced', label: 'Quality & Level', icon: Sliders },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSection(tab.id)}
              className={`flex-1 min-w-[110px] sm:min-w-[100px] py-2 sm:py-1.5 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap min-h-[40px] ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION: PATTERN & SHAPES */}
      {activeSection === 'design' && (
        <div className="space-y-4">
          {/* Dots Pattern */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
              Body Dot Style
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {(
                [
                  { id: 'square', label: 'Square' },
                  { id: 'rounded', label: 'Rounded' },
                  { id: 'dots', label: 'Dots' },
                  { id: 'classy', label: 'Classy' },
                  { id: 'classy-rounded', label: 'Smooth' },
                  { id: 'extra-rounded', label: 'Pill' },
                ] as const
              ).map((shape) => (
                <button
                  key={shape.id}
                  type="button"
                  onClick={() => update('dotType', shape.id)}
                  className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                    style.dotType === shape.id
                      ? 'border-blue-500 bg-blue-600/30 text-blue-300 ring-2 ring-blue-500/40'
                      : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  {shape.label}
                </button>
              ))}
            </div>
          </div>

          {/* Corner Square Frame */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
              Corner Eye Frame (Outer)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(
                [
                  { id: 'square', label: 'Square Box' },
                  { id: 'extra-rounded', label: 'Rounded Box' },
                  { id: 'dot', label: 'Circular Eye' },
                  { id: 'classy', label: 'Leaf / Classy' },
                ] as const
              ).map((cs) => (
                <button
                  key={cs.id}
                  type="button"
                  onClick={() => update('cornerSquareType', cs.id)}
                  className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                    style.cornerSquareType === cs.id
                      ? 'border-blue-500 bg-blue-600/30 text-blue-300 ring-2 ring-blue-500/40'
                      : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  {cs.label}
                </button>
              ))}
            </div>
          </div>

          {/* Corner Dot Inner */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
              Corner Eye Center (Inner)
            </label>
            <div className="grid grid-cols-2 gap-2 max-w-xs">
              {(
                [
                  { id: 'square', label: 'Square Dot' },
                  { id: 'dot', label: 'Round Dot' },
                ] as const
              ).map((cd) => (
                <button
                  key={cd.id}
                  type="button"
                  onClick={() => update('cornerDotType', cd.id)}
                  className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                    style.cornerDotType === cd.id
                      ? 'border-blue-500 bg-blue-600/30 text-blue-300 ring-2 ring-blue-500/40'
                      : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  {cd.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION: COLORS & GRADIENT */}
      {activeSection === 'colors' && (
        <div className="space-y-4">
          {/* Preset Color Themes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
              Curated Designer Palettes
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    if (preset.isGrad) {
                      setStyle((prev) => ({
                        ...prev,
                        useGradient: true,
                        gradientColor1: preset.grad1!,
                        gradientColor2: preset.grad2!,
                        bgColor: preset.bg,
                        dotColor: preset.fg,
                        cornerSquareColor: preset.grad1!,
                        cornerDotColor: preset.grad2!,
                      }));
                    } else {
                      setStyle((prev) => ({
                        ...prev,
                        useGradient: false,
                        dotColor: preset.fg,
                        bgColor: preset.bg,
                        cornerSquareColor: preset.fg,
                        cornerDotColor: preset.fg,
                      }));
                    }
                  }}
                  className="p-2 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 text-left transition-all group flex flex-col items-center gap-1.5 cursor-pointer"
                >
                  <div
                    className="w-full h-5 rounded-md border border-zinc-700 shadow-xs"
                    style={{
                      background: preset.isGrad
                        ? `linear-gradient(135deg, ${preset.grad1}, ${preset.grad2})`
                        : preset.fg,
                    }}
                  />
                  <span className="text-[10px] font-semibold text-zinc-300 truncate w-full text-center">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Mode Toggle */}
          <div className="flex items-center gap-4 pt-2">
            <label className="text-xs font-bold text-zinc-300">
              Color Style:
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => update('useGradient', false)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg border cursor-pointer ${
                  !style.useGradient
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-800'
                }`}
              >
                Solid Color
              </button>
              <button
                type="button"
                onClick={() => update('useGradient', true)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg border cursor-pointer ${
                  style.useGradient
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-800'
                }`}
              >
                Gradient Color
              </button>
            </div>
          </div>

          {/* Solid Color Pickers */}
          {!style.useGradient ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Foreground (Dots & Code)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={style.dotColor}
                    onChange={(e) => {
                      update('dotColor', e.target.value);
                      update('cornerSquareColor', e.target.value);
                      update('cornerDotColor', e.target.value);
                    }}
                    className="w-10 h-10 rounded-lg border border-zinc-700 cursor-pointer p-0.5 bg-transparent"
                  />
                  <input
                    type="text"
                    value={style.dotColor}
                    onChange={(e) => update('dotColor', e.target.value)}
                    className="w-28 px-2 py-1.5 text-xs font-mono rounded-lg border border-zinc-700 bg-zinc-900 text-white uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Background Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    disabled={style.transparentBg}
                    value={style.bgColor}
                    onChange={(e) => update('bgColor', e.target.value)}
                    className="w-10 h-10 rounded-lg border border-zinc-700 cursor-pointer p-0.5 bg-transparent disabled:opacity-30"
                  />
                  <input
                    type="text"
                    disabled={style.transparentBg}
                    value={style.bgColor}
                    onChange={(e) => update('bgColor', e.target.value)}
                    className="w-28 px-2 py-1.5 text-xs font-mono rounded-lg border border-zinc-700 bg-zinc-900 text-white uppercase disabled:opacity-30"
                  />
                  <label className="flex items-center gap-1.5 text-xs text-zinc-300 cursor-pointer ml-1">
                    <input
                      type="checkbox"
                      checked={style.transparentBg}
                      onChange={(e) => update('transparentBg', e.target.checked)}
                      className="rounded-sm bg-zinc-900 border-zinc-700"
                    />
                    Transparent
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Gradient Start Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={style.gradientColor1}
                      onChange={(e) => update('gradientColor1', e.target.value)}
                      className="w-10 h-10 rounded-lg border border-zinc-700 cursor-pointer p-0.5 bg-transparent"
                    />
                    <input
                      type="text"
                      value={style.gradientColor1}
                      onChange={(e) => update('gradientColor1', e.target.value)}
                      className="w-28 px-2 py-1.5 text-xs font-mono rounded-lg border border-zinc-700 bg-zinc-900 text-white uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Gradient End Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={style.gradientColor2}
                      onChange={(e) => update('gradientColor2', e.target.value)}
                      className="w-10 h-10 rounded-lg border border-zinc-700 cursor-pointer p-0.5 bg-transparent"
                    />
                    <input
                      type="text"
                      value={style.gradientColor2}
                      onChange={(e) => update('gradientColor2', e.target.value)}
                      className="w-28 px-2 py-1.5 text-xs font-mono rounded-lg border border-zinc-700 bg-zinc-900 text-white uppercase"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-300 mb-1">
                  <span>Gradient Angle</span>
                  <span>{style.gradientRotation}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="15"
                  value={style.gradientRotation}
                  onChange={(e) => update('gradientRotation', Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION: LOGO & ICONS */}
      {activeSection === 'logo' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
              Center Logo / Brand Icon
            </label>
            {style.logoUrl && (
              <button
                type="button"
                onClick={() => update('logoUrl', null)}
                className="text-xs text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Remove Logo
              </button>
            )}
          </div>

          {/* Upload Custom Logo */}
          <div className="border-2 border-dashed border-zinc-700 bg-zinc-900/50 rounded-xl p-4 text-center hover:border-zinc-500 transition-colors">
            <input
              type="file"
              id="logo-file-input"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="logo-file-input"
              className="cursor-pointer flex flex-col items-center justify-center gap-1.5"
            >
              <div className="w-10 h-10 rounded-full bg-blue-950/60 flex items-center justify-center text-blue-400">
                <Upload className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white">
                Upload Custom Logo (PNG, JPG, SVG)
              </span>
              <span className="text-[11px] text-zinc-400">
                Recommended: Square image with transparent background
              </span>
            </label>
          </div>

          {/* Popular Logo Presets */}
          <div>
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
              Or Choose Popular Icon
            </span>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {LOGO_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    setStyle((prev) => ({
                      ...prev,
                      logoUrl: preset.url,
                      errorCorrectionLevel: 'H',
                    }));
                  }}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    style.logoUrl === preset.url
                      ? 'border-blue-500 bg-blue-600/30'
                      : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-6 h-6 object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[10px] font-medium text-zinc-300 truncate w-full text-center">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Logo Size and Padding Controls */}
          {style.logoUrl && (
            <div className="p-3.5 bg-zinc-900 rounded-xl space-y-3 border border-zinc-800">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                <span>Logo Size</span>
                <span>{Math.round(style.logoSize * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.15"
                max="0.32"
                step="0.02"
                value={style.logoSize}
                onChange={(e) => update('logoSize', Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold text-zinc-300">
                  Logo Container Shape:
                </span>
                <div className="flex gap-1.5">
                  {(['circle', 'rounded', 'square'] as const).map((sh) => (
                    <button
                      key={sh}
                      type="button"
                      onClick={() => update('logoShape', sh)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md border capitalize cursor-pointer ${
                        style.logoShape === sh
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white'
                      }`}
                    >
                      {sh}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION: FRAMES & CTA BADGES */}
      {activeSection === 'frames' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
              Choose Frame Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FRAME_PRESETS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => update('frameType', f.id as FrameType)}
                  className={`py-2.5 px-3 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                    style.frameType === f.id
                      ? 'border-blue-500 bg-blue-600/30 text-blue-300 ring-2 ring-blue-500/40'
                      : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <span className="text-base">{f.icon}</span>
                  <span className="text-xs font-semibold">{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {style.frameType !== 'none' && (
            <div className="p-3.5 bg-zinc-900 rounded-xl space-y-3 border border-zinc-800">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Call-to-Action Text
                </label>
                <input
                  type="text"
                  value={style.frameText}
                  onChange={(e) => update('frameText', e.target.value)}
                  placeholder="SCAN ME"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs font-bold text-white uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {['SCAN ME', 'CONNECT TO WIFI', 'VIEW MENU', 'FOLLOW US', 'DOWNLOAD APP', 'PAY HERE'].map(
                  (text) => (
                    <button
                      key={text}
                      type="button"
                      onClick={() => update('frameText', text)}
                      className="px-2 py-0.5 text-[11px] font-semibold rounded bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 cursor-pointer"
                    >
                      {text}
                    </button>
                  )
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                    Frame Background Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={style.frameColor}
                      onChange={(e) => update('frameColor', e.target.value)}
                      className="w-8 h-8 rounded-md border border-zinc-700 cursor-pointer p-0.5 bg-transparent"
                    />
                    <input
                      type="text"
                      value={style.frameColor}
                      onChange={(e) => update('frameColor', e.target.value)}
                      className="w-20 px-2 py-1 text-xs font-mono rounded border border-zinc-700 bg-zinc-950 text-white uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                    Frame Text Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={style.frameTextColor}
                      onChange={(e) => update('frameTextColor', e.target.value)}
                      className="w-8 h-8 rounded-md border border-zinc-700 cursor-pointer p-0.5 bg-transparent"
                    />
                    <input
                      type="text"
                      value={style.frameTextColor}
                      onChange={(e) => update('frameTextColor', e.target.value)}
                      className="w-20 px-2 py-1 text-xs font-mono rounded border border-zinc-700 bg-zinc-950 text-white uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION: ADVANCED & QUALITY */}
      {activeSection === 'advanced' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Error Correction Level (Reed-Solomon)
            </label>
            <p className="text-xs text-zinc-400 mb-2">
              Higher recovery levels allow damaged or logo-covered codes to remain readable.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(
                [
                  { level: 'L', label: 'Low (~7%)', desc: 'Cleanest pixels' },
                  { level: 'M', label: 'Medium (~15%)', desc: 'Standard default' },
                  { level: 'Q', label: 'Quartile (~25%)', desc: 'Good for small logos' },
                  { level: 'H', label: 'High (~30%)', desc: 'Best for center logos' },
                ] as const
              ).map((ec) => (
                <button
                  key={ec.level}
                  type="button"
                  onClick={() => update('errorCorrectionLevel', ec.level as ErrorCorrectionLevel)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    style.errorCorrectionLevel === ec.level
                      ? 'border-blue-500 bg-blue-600/30 text-blue-300 ring-2 ring-blue-500/40'
                      : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <div className="font-extrabold text-xs text-white">Level {ec.level}</div>
                  <div className="text-[11px] text-zinc-400">{ec.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-300 mb-1">
              <span>Quiet Zone (White Margin Border)</span>
              <span>{style.margin} modules</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={style.margin}
              onChange={(e) => update('margin', Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};
