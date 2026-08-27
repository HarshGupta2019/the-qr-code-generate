import React, { useState, useEffect, useRef } from 'react';
import { Printer, X, LayoutGrid, Check } from 'lucide-react';
import { QrStyleOptions } from '../types';
import { renderQrToCanvas } from '../utils/qrUtils';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  payload: string;
  style: QrStyleOptions;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  isOpen,
  onClose,
  payload,
  style,
}) => {
  const [gridCount, setGridCount] = useState<number>(4); // 1, 4, 9, 16
  const [includeLabel, setIncludeLabel] = useState(true);
  const [labelText, setLabelText] = useState('Scan with your smartphone camera');
  const [previewDataUrl, setPreviewDataUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen && payload) {
      const canvas = document.createElement('canvas');
      renderQrToCanvas(canvas, payload, style, 600).then(() => {
        setPreviewDataUrl(canvas.toDataURL('image/png'));
      });
    }
  }, [isOpen, payload, style]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Print QR Code Sheet (A4 / Letter)
              </h3>
              <p className="text-xs text-slate-500">
                Configure layout stickers and trigger direct print
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

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Grid Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Stickers Per Sheet
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { count: 1, label: '1 (Single)' },
                  { count: 4, label: '4 (2x2)' },
                  { count: 9, label: '9 (3x3)' },
                  { count: 16, label: '16 (4x4)' },
                ].map((g) => (
                  <button
                    key={g.count}
                    type="button"
                    onClick={() => setGridCount(g.count)}
                    className={`py-2 px-1 text-center rounded-xl border text-xs font-bold transition-all ${
                      gridCount === g.count
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Bottom Instruction Label
              </label>
              <input
                type="text"
                value={labelText}
                onChange={(e) => setLabelText(e.target.value)}
                placeholder="Scan with camera"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Printable Preview Paper (Simulation of A4) */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-100 dark:bg-slate-950">
            <div
              id="print-sheet-content"
              className={`bg-white text-slate-900 p-4 rounded-lg shadow-sm mx-auto grid gap-3 ${
                gridCount === 1
                  ? 'grid-cols-1 max-w-xs'
                  : gridCount === 4
                  ? 'grid-cols-2 max-w-sm'
                  : gridCount === 9
                  ? 'grid-cols-3 max-w-md'
                  : 'grid-cols-4 max-w-lg'
              }`}
            >
              {Array.from({ length: gridCount }).map((_, idx) => (
                <div
                  key={idx}
                  className="border border-dashed border-slate-200 p-2 rounded-md flex flex-col items-center justify-center text-center"
                >
                  {previewDataUrl ? (
                    <img
                      src={previewDataUrl}
                      alt="QR"
                      className="max-h-24 max-w-full object-contain"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-slate-100 rounded" />
                  )}
                  {includeLabel && (
                    <p className="text-[8px] font-semibold text-slate-600 mt-1 line-clamp-1">
                      {labelText}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Optimized for 300 DPI high-contrast print output
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Sheet Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
