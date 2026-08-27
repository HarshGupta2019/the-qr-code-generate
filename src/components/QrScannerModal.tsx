import React from 'react';
import { Scan, X } from 'lucide-react';
import { QrScannerView } from './QrScannerView';

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadIntoGenerator: (text: string) => void;
}

export const QrScannerModal: React.FC<QrScannerModalProps> = ({
  isOpen,
  onClose,
  onLoadIntoGenerator,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-800 bg-zinc-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <Scan className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">
                Scan & Decode Any QR Code
              </h3>
              <p className="text-xs text-zinc-400">
                Upload image, paste from clipboard, or use live camera
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
          <QrScannerView
            isModal={true}
            onLoadIntoGenerator={(text) => {
              onLoadIntoGenerator(text);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
};
