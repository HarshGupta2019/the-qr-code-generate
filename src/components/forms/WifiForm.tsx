import React from 'react';
import { Wifi, Key, Eye, EyeOff, ShieldCheck, AlertTriangle } from 'lucide-react';
import { WifiData } from '../../types';

interface WifiFormProps {
  wifi: WifiData;
  setWifi: React.Dispatch<React.SetStateAction<WifiData>>;
}

export const WifiForm: React.FC<WifiFormProps> = ({ wifi, setWifi }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleChange = (field: keyof WifiData, value: any) => {
    if (field === 'encryption' && value === 'nopass') {
      setWifi((prev) => ({ ...prev, encryption: 'nopass', password: '' }));
    } else {
      setWifi((prev) => ({ ...prev, [field]: value }));
    }
  };

  const isProtectedAndMissingPass = wifi.encryption !== 'nopass' && !wifi.password.trim();

  return (
    <div className="space-y-4 text-white">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
          Network Name (SSID) *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
            <Wifi className="w-5 h-5" />
          </div>
          <input
            id="input-wifi-ssid"
            type="text"
            value={wifi.ssid}
            onChange={(e) => handleChange('ssid', e.target.value)}
            placeholder="e.g. Starbucks_Guest or Home_5G"
            className="w-full pl-10 pr-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>
      </div>

      {wifi.encryption !== 'nopass' && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Wi-Fi Password / Security Key *
            </label>
            <span className="text-[11px] text-zinc-400">
              Exact router case-sensitive password
            </span>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <Key className="w-5 h-5" />
            </div>
            <input
              id="input-wifi-password"
              type={showPassword ? 'text' : 'password'}
              value={wifi.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Enter exact Wi-Fi Password"
              className={`w-full pl-10 pr-10 py-2.5 bg-zinc-900 border rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 font-mono ${
                isProtectedAndMissingPass
                  ? 'border-amber-500/80 focus:ring-amber-500/50 focus:border-amber-500'
                  : 'border-zinc-700 focus:ring-blue-500/50 focus:border-blue-500'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {isProtectedAndMissingPass && (
            <div className="mt-2 p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/60 flex items-start gap-2 text-amber-300 text-xs">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <span>
                Please enter your Wi-Fi password. Scanning devices will fail to connect if the password is empty.
              </span>
            </div>
          )}
        </div>
      )}

      {wifi.encryption === 'nopass' && (
        <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/60 flex items-start gap-2.5">
          <Wifi className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-blue-200">Open Network (Direct Connect)</p>
            <p className="text-[11px] text-zinc-300">
              No password required. Scanning this QR code will allow devices to join the Wi-Fi network directly.
            </p>
          </div>
        </div>
      )}

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
          Encryption / Security Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { id: 'WPA', label: 'WPA / WPA2 / WPA3' },
              { id: 'WEP', label: 'WEP' },
              { id: 'nopass', label: 'No Password' },
            ] as const
          ).map((enc) => (
            <button
              key={enc.id}
              type="button"
              onClick={() => handleChange('encryption', enc.id)}
              className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                wifi.encryption === enc.id
                  ? 'border-blue-500 bg-blue-600/30 text-blue-300 ring-2 ring-blue-500/30'
                  : 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {enc.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input
          id="wifi-hidden-checkbox"
          type="checkbox"
          checked={wifi.hidden}
          onChange={(e) => handleChange('hidden', e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded-sm border-zinc-700 bg-zinc-900 focus:ring-blue-500"
        />
        <label htmlFor="wifi-hidden-checkbox" className="text-xs text-zinc-300 cursor-pointer">
          Hidden Wi-Fi SSID network (requires manual broadcast SSID join)
        </label>
      </div>

      <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-start gap-2.5">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <p className="text-xs text-zinc-300">
          Guests can scan this QR code with their camera to connect to your Wi-Fi instantly without typing long passwords!
        </p>
      </div>
    </div>
  );
};


