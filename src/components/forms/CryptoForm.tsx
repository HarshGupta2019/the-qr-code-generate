import React from 'react';
import { Coins, Wallet } from 'lucide-react';
import { CryptoData } from '../../types';

interface CryptoFormProps {
  crypto: CryptoData;
  setCrypto: React.Dispatch<React.SetStateAction<CryptoData>>;
}

const CRYPTOS = [
  { id: 'BTC', label: 'Bitcoin (BTC)', prefix: 'bitcoin:' },
  { id: 'ETH', label: 'Ethereum (ETH)', prefix: 'ethereum:' },
  { id: 'USDT', label: 'Tether (USDT)', prefix: 'tether:' },
  { id: 'SOL', label: 'Solana (SOL)', prefix: 'solana:' },
  { id: 'DOGE', label: 'Dogecoin (DOGE)', prefix: 'doge:' },
] as const;

export const CryptoForm: React.FC<CryptoFormProps> = ({ crypto, setCrypto }) => {
  const handleChange = (field: keyof CryptoData, value: string) => {
    setCrypto((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4 text-white">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
          Select Cryptocurrency
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {CRYPTOS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleChange('currency', c.id)}
              className={`py-2 px-2 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${
                crypto.currency === c.id
                  ? 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/30'
                  : 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {c.id}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
          {crypto.currency} Wallet Address *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
            <Wallet className="w-4 h-4" />
          </div>
          <input
            id="input-crypto-address"
            type="text"
            value={crypto.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="e.g. 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa or 0x71C...847"
            className="w-full pl-9 pr-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            Amount (Optional)
          </label>
          <input
            id="input-crypto-amount"
            type="text"
            value={crypto.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            placeholder="0.05"
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            Memo / Label (Optional)
          </label>
          <input
            id="input-crypto-message"
            type="text"
            value={crypto.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="Donation or Invoice #102"
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

