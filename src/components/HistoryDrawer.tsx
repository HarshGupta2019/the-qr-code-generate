import React, { useState } from 'react';
import {
  History,
  Trash2,
  Download,
  Copy,
  Check,
  Search,
  ExternalLink,
  ArrowUpRight,
  FolderOpen,
} from 'lucide-react';
import { SavedQrItem } from '../types';

interface HistoryDrawerProps {
  items: SavedQrItem[];
  onSelectItem: (item: SavedQrItem) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  items,
  onSelectItem,
  onDeleteItem,
  onClearAll,
}) => {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <History className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Saved QR Codes History
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Access and re-edit your previously generated QR codes stored securely in your browser.
            </p>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (confirm('Are you sure you want to clear your saved QR code history?')) {
                  onClearAll();
                }
              }}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear History
            </button>
          )}
        </div>

        {items.length > 0 && (
          <div className="mb-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search saved QR codes by title, URL or type..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
        )}

        {items.length === 0 ? (
          <div className="py-12 text-center text-slate-400 flex flex-col items-center gap-2">
            <FolderOpen className="w-12 h-12 text-slate-300 dark:text-slate-700" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              No saved QR codes yet
            </p>
            <p className="text-xs max-w-sm">
              Click the <span className="font-semibold text-blue-600">"Save to History"</span> button in the live preview whenever you create a code you want to keep!
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            No matching items found for "{search}".
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 hover:border-blue-500/50 transition-all flex items-start gap-3 group"
              >
                {item.thumbnailUrl && (
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg bg-white p-1 border border-slate-200 dark:border-slate-800 object-contain shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                      {item.type}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1 truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">
                    {item.content}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-2 pt-1">
                    <button
                      type="button"
                      onClick={() => onSelectItem(item)}
                      className="px-3 py-1.5 text-[11px] font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1 min-h-[36px] cursor-pointer"
                    >
                      <span>Load in Editor</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopy(item.id, item.content)}
                      className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                      title="Copy content"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteItem(item.id)}
                      className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
