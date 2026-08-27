import React, { useState } from 'react';
import JSZip from 'jszip';
import confetti from 'canvas-confetti';
import {
  Layers,
  Upload,
  Download,
  Plus,
  Trash2,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { QrStyleOptions, BatchItem } from '../types';
import { renderQrToCanvas } from '../utils/qrUtils';

interface BatchGeneratorProps {
  style: QrStyleOptions;
}

export const BatchGenerator: React.FC<BatchGeneratorProps> = ({ style }) => {
  const [inputText, setInputText] = useState(
    'https://example.com/product-1, Summer T-Shirt\nhttps://example.com/product-2, Wireless Headphones\nhttps://example.com/product-3, Smart Fitness Watch\nhttps://example.com/product-4, Leather Wallet'
  );
  const [items, setItems] = useState<BatchItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleParse = () => {
    const lines = inputText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    const parsed: BatchItem[] = lines.map((line, idx) => {
      const parts = line.split(',');
      const content = parts[0]?.trim() || '';
      const title = parts[1]?.trim() || `QR-Code-${idx + 1}`;
      return {
        id: `batch-${idx}-${Date.now()}`,
        content,
        title,
        status: 'pending',
      };
    });

    setItems(parsed);
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setInputText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleDownloadZip = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    setProgress(0);

    const zip = new JSZip();
    const canvas = document.createElement('canvas');

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      try {
        await renderQrToCanvas(canvas, item.content, style, 1024);
        const dataUrl = canvas.toDataURL('image/png');
        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
        const cleanName = item.title.replace(/[^a-zA-Z0-9_-]/g, '_');
        zip.file(`${cleanName || `qr_${i + 1}`}.png`, base64Data, { base64: true });
        setProgress(Math.round(((i + 1) / items.length) * 100));
      } catch (err) {
        console.error('Failed to render batch item', item, err);
      }
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = `TheQRCodeGenerate_Batch_${Date.now()}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsProcessing(false);
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.7 },
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Batch QR Code Generator
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Bulk create and export dozens of styled QR codes in a single ZIP file.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              id="csv-upload-input"
              accept=".csv,.txt"
              onChange={handleCsvUpload}
              className="hidden"
            />
            <label
              htmlFor="csv-upload-input"
              className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              Import CSV / TXT
            </label>
          </div>
        </div>

        {/* Input Textarea */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Enter One Item Per Line (Format: <code className="text-blue-600">URL, Name</code>)
            </label>
            <button
              type="button"
              onClick={handleParse}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Process List &rarr;
            </button>
          </div>

          <textarea
            rows={6}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="https://example.com/item-1, Table 1&#10;https://example.com/item-2, Table 2"
            className="w-full p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleParse}
              className="w-full sm:w-auto px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer min-h-[44px]"
            >
              Generate Batch Preview ({items.length || 4} items)
            </button>

            {items.length > 0 && (
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleDownloadZip}
                className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer disabled:opacity-50 min-h-[44px]"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                    <span>Packaging ZIP ({progress}%)...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 shrink-0" />
                    <span>Download All as ZIP ({items.length} PNGs)</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Batch Preview Table */}
        {items.length > 0 && (
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Batch Items Queue ({items.length})
            </h3>
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3 flex items-center justify-between gap-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-6 h-6 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-400 flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div className="min-w-0 truncate">
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 truncate max-w-[170px] sm:max-w-md">
                        {item.content}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setItems((prev) => prev.filter((_, i) => i !== idx))}
                    className="p-2 shrink-0 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
