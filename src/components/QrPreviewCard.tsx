import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Download,
  Copy,
  Printer,
  BookmarkPlus,
  Check,
  AlertTriangle,
  Sparkles,
  FileCode,
  FileDown,
  Eye,
  Share2,
} from 'lucide-react';
import { QrStyleOptions, QrDataType, SavedQrItem } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import {
  renderQrToCanvas,
  downloadQrPng,
  downloadQrSvg,
  downloadQrPdf,
  copyQrToClipboard,
  getContrastRatio,
} from '../utils/qrUtils';

interface QrPreviewCardProps {
  payload: string;
  dataType: QrDataType;
  style: QrStyleOptions;
  onSaveToHistory: (item: Omit<SavedQrItem, 'id' | 'createdAt'>) => void;
  onOpenPrintModal: () => void;
}

export const QrPreviewCard: React.FC<QrPreviewCardProps> = ({
  payload,
  dataType,
  style,
  onSaveToHistory,
  onOpenPrintModal,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloadResolution, setDownloadResolution] = useState<number>(2048);
  const [isDownloading, setIsDownloading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showInspector, setShowInspector] = useState(false);
  const { t } = useLanguage();

  // Render QR Code to preview canvas on updates
  useEffect(() => {
    let active = true;
    if (canvasRef.current && payload) {
      renderQrToCanvas(canvasRef.current, payload, style, 800).catch((err) =>
        console.error('Error rendering preview', err)
      );
    }
    return () => {
      active = false;
    };
  }, [payload, style]);

  // Contrast calculation
  const contrastRatio = getContrastRatio(style.dotColor, style.bgColor);
  const isContrastGood = style.transparentBg || contrastRatio >= 4.0;

  const handleDownloadPng = async (res = downloadResolution) => {
    setIsDownloading(true);
    try {
      const filename = `the-qr-code-${dataType}-${Date.now()}.png`;
      await downloadQrPng(payload, style, res, filename);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadSvg = async () => {
    const filename = `the-qr-code-${dataType}-${Date.now()}.svg`;
    await downloadQrSvg(payload, style, filename);
  };

  const handleDownloadPdf = async () => {
    const filename = `the-qr-code-${dataType}-${Date.now()}.pdf`;
    await downloadQrPdf(payload, style, filename);
  };

  const handleCopyClipboard = async () => {
    const ok = await copyQrToClipboard(payload, style);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      alert('Unable to copy image directly. You can right-click and copy image.');
    }
  };

  const handleSave = () => {
    let summary = payload;
    if (summary.length > 50) {
      summary = summary.substring(0, 47) + '...';
    }

    let thumb = '';
    if (canvasRef.current) {
      try {
        thumb = canvasRef.current.toDataURL('image/png', 0.5);
      } catch (e) {
        // ignore
      }
    }

    onSaveToHistory({
      title: `${dataType.toUpperCase()} QR Code`,
      type: dataType,
      content: payload,
      dataSummary: summary,
      style: { ...style },
      thumbnailUrl: thumb,
    });

    setSavedSuccess(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
    });
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-xl p-4 sm:p-5 shadow-inner text-white flex flex-col justify-between h-full">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
        <div>
          <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            {t.preview.livePreview}
          </h3>
          <p className="text-[11px] text-zinc-400">
            Real-time interactive rendering
          </p>
        </div>

        {/* Quality / Contrast Badge */}
        <div className="flex items-center gap-1.5">
          {isContrastGood ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800/80">
              <Check className="w-3 h-3" />
              {t.preview.scannableExcellent || '100% Scannable'}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950/60 text-amber-300 border border-amber-800/80">
              <AlertTriangle className="w-3 h-3" />
              {t.preview.scannablePoor || 'Low Contrast'} ({contrastRatio.toFixed(1)}:1)
            </span>
          )}
        </div>
      </div>

      {/* Canvas Display Container */}
      <div className="relative group bg-zinc-950/80 rounded-xl p-3 sm:p-6 flex items-center justify-center border border-zinc-800/90 min-h-[250px] sm:min-h-[300px]">
        <canvas
          ref={canvasRef}
          className="max-h-[280px] sm:max-h-[320px] max-w-full object-contain rounded-lg shadow-md transition-transform duration-200"
          style={{ imageRendering: 'crisp-edges' }}
        />
      </div>

      {/* Primary Actions */}
      <div className="mt-4 space-y-2.5">
        {/* Main High-Res PNG Button with Resolution Picker */}
        <div className="flex rounded-xl shadow-sm overflow-hidden">
          <button
            id="btn-download-png"
            type="button"
            disabled={isDownloading}
            onClick={() => handleDownloadPng(downloadResolution)}
            className="flex-1 bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-3 sm:px-4 text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer shadow-sm min-h-[44px]"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span className="truncate">{t.preview.downloadPng} ({downloadResolution}px)</span>
          </button>
          <select
            value={downloadResolution}
            onChange={(e) => setDownloadResolution(Number(e.target.value))}
            className="bg-sky-700 hover:bg-sky-600 text-white font-semibold px-2 py-3 border-l border-sky-500 text-xs focus:outline-none cursor-pointer min-h-[44px] shrink-0"
          >
            <option value={512} className="bg-zinc-900 text-white">512px</option>
            <option value={1024} className="bg-zinc-900 text-white">1024px</option>
            <option value={2048} className="bg-zinc-900 text-white">2048px (HD)</option>
            <option value={4000} className="bg-zinc-900 text-white">4000px (4K)</option>
          </select>
        </div>

        {/* Secondary Download & Print Row */}
        <div className="grid grid-cols-3 gap-2">
          <button
            id="btn-download-svg"
            type="button"
            onClick={handleDownloadSvg}
            className="py-2.5 px-1.5 sm:px-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 sm:gap-1.5 transition-colors border border-zinc-700 cursor-pointer min-h-[44px]"
          >
            <FileCode className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="truncate">{t.preview.downloadSvg}</span>
          </button>

          <button
            id="btn-download-pdf"
            type="button"
            onClick={handleDownloadPdf}
            className="py-2.5 px-1.5 sm:px-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 sm:gap-1.5 transition-colors border border-zinc-700 cursor-pointer min-h-[44px]"
          >
            <FileDown className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="truncate">{t.preview.downloadPdf}</span>
          </button>

          <button
            id="btn-print-sheet"
            type="button"
            onClick={onOpenPrintModal}
            className="py-2.5 px-1.5 sm:px-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 sm:gap-1.5 transition-colors border border-zinc-700 cursor-pointer min-h-[44px]"
          >
            <Printer className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="truncate">{t.preview.printQr}</span>
          </button>
        </div>

        {/* Copy & Save Row */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            id="btn-copy-clipboard"
            type="button"
            onClick={handleCopyClipboard}
            className="py-2.5 px-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-zinc-700 cursor-pointer min-h-[44px]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-emerald-400 font-bold truncate">{t.scanner.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span className="truncate">{t.preview.copyImage}</span>
              </>
            )}
          </button>

          <button
            id="btn-save-history"
            type="button"
            onClick={handleSave}
            className="py-2.5 px-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-zinc-700 cursor-pointer min-h-[44px]"
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="text-sky-400 font-bold truncate">{t.scanner.copied || 'Saved!'}</span>
              </>
            ) : (
              <>
                <BookmarkPlus className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{t.preview.saveToHistory}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Raw Payload Inspector Toggle */}
      <div className="mt-4 pt-3 border-t border-zinc-800">
        <button
          type="button"
          onClick={() => setShowInspector(!showInspector)}
          className="w-full flex items-center justify-between text-xs text-zinc-400 hover:text-zinc-200 py-1 cursor-pointer"
        >
          <span className="flex items-center gap-1.5 font-medium">
            <Eye className="w-3.5 h-3.5" />
            Encoded Data String ({payload.length} chars)
          </span>
          <span className="text-[11px] font-mono text-sky-400 font-bold">
            {showInspector ? 'Hide' : 'Inspect'}
          </span>
        </button>

        {showInspector && (
          <div className="mt-2 p-2.5 bg-zinc-950 rounded-lg text-[11px] font-mono text-zinc-200 break-all border border-zinc-800 select-all max-h-32 overflow-y-auto">
            {payload}
          </div>
        )}
      </div>
    </div>
  );
};

