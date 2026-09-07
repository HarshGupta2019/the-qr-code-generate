import React from 'react';
import { Smartphone, Apple, Play, Globe } from 'lucide-react';
import { AppStoreData, PaymentData } from '../../types';

interface AppStoreFormProps {
  app: AppStoreData;
  setApp: React.Dispatch<React.SetStateAction<AppStoreData>>;
}

export const AppStoreForm: React.FC<AppStoreFormProps> = ({ app, setApp }) => {
  const handleChange = (field: keyof AppStoreData, value: string) => {
    setApp((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4 text-white">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">
          App Name
        </label>
        <input
          type="text"
          value={app.appName}
          onChange={(e) => handleChange('appName', e.target.value)}
          placeholder="e.g. Acme Mobile App"
          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">
          iOS App Store Link
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
            <Apple className="w-4 h-4" />
          </div>
          <input
            type="url"
            value={app.iosUrl}
            onChange={(e) => handleChange('iosUrl', e.target.value)}
            placeholder="https://apps.apple.com/app/id123456789"
            className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">
          Google Play Store Link
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
            <Play className="w-4 h-4" />
          </div>
          <input
            type="url"
            value={app.androidUrl}
            onChange={(e) => handleChange('androidUrl', e.target.value)}
            placeholder="https://play.google.com/store/apps/details?id=com.example.app"
            className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      </div>
    </div>
  );
};

interface PaymentFormProps {
  payment: PaymentData;
  setPayment: React.Dispatch<React.SetStateAction<PaymentData>>;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ payment, setPayment }) => {
  const handleChange = (field: keyof PaymentData, value: string) => {
    setPayment((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4 text-white">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
          Payment Method / Gateway
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(
            [
              { id: 'paypal', label: 'PayPal.me' },
              { id: 'venmo', label: 'Venmo' },
              { id: 'cashapp', label: 'Cash App' },
              { id: 'upi', label: 'UPI / India' },
            ] as const
          ).map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleChange('provider', p.id)}
              className={`py-2 px-2 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${
                payment.provider === p.id
                  ? 'border-blue-500 bg-blue-600/30 text-blue-300 ring-2 ring-blue-500/30'
                  : 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">
          {payment.provider === 'paypal'
            ? 'PayPal Username (paypal.me/yourusername)'
            : payment.provider === 'venmo'
            ? 'Venmo Username (@username)'
            : payment.provider === 'cashapp'
            ? 'Cashtag ($cashtag)'
            : 'UPI VPA ID (e.g. merchant@okhdfcbank)'}
        </label>
        <input
          type="text"
          value={payment.identifier}
          onChange={(e) => handleChange('identifier', e.target.value)}
          placeholder={
            payment.provider === 'paypal'
              ? 'johnsmith'
              : payment.provider === 'venmo'
              ? '@johnsmith'
              : payment.provider === 'cashapp'
              ? '$johnsmith'
              : 'johnsmith@upi'
          }
          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      </div>

      {payment.provider === 'upi' && (
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">
            Payee Name
          </label>
          <input
            type="text"
            value={payment.payeeName || ''}
            onChange={(e) => handleChange('payeeName', e.target.value)}
            placeholder="Merchant name"
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            Requested Amount (Optional)
          </label>
          <input
            type="text"
            value={payment.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            placeholder="25.00"
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            Payment Note / Memo
          </label>
          <input
            type="text"
            value={payment.note}
            onChange={(e) => handleChange('note', e.target.value)}
            placeholder="Dinner split / Tip"
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      </div>

      {payment.provider === 'upi' && (
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            Transaction / Reference ID (Optional)
          </label>
          <input
            type="text"
            value={payment.reference || ''}
            onChange={(e) => handleChange('reference', e.target.value)}
            placeholder="Order-12345"
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      )}
    </div>
  );
};

