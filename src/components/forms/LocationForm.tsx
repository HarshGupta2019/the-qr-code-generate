import React, { useState } from 'react';
import { MapPin, Navigation, Loader2, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { LocationData } from '../../types';

interface LocationFormProps {
  location: LocationData;
  setLocation: React.Dispatch<React.SetStateAction<LocationData>>;
}

const CITY_PRESETS = [
  { name: 'New York', lat: '40.712800', lng: '-74.006000' },
  { name: 'London', lat: '51.507400', lng: '-0.127800' },
  { name: 'Paris', lat: '48.856600', lng: '2.352200' },
  { name: 'Tokyo', lat: '35.676200', lng: '139.650300' },
  { name: 'San Francisco', lat: '37.774900', lng: '-122.419400' },
  { name: 'Singapore', lat: '1.352100', lng: '103.819800' },
  { name: 'Dubai', lat: '25.204800', lng: '55.270800' },
  { name: 'Sydney', lat: '-33.868800', lng: '151.209300' },
];

export const LocationForm: React.FC<LocationFormProps> = ({ location, setLocation }) => {
  const [isLocating, setIsLocating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (field: keyof LocationData, value: string) => {
    if (field === 'address') {
      setLocation((prev) => ({ ...prev, address: value, query: value, latitude: '', longitude: '' }));
      return;
    }
    setLocation((prev) => ({ ...prev, [field]: value }));
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setStatusMessage({
        type: 'error',
        text: 'Geolocation is not supported by your current browser.',
      });
      return;
    }

    setIsLocating(true);
    setStatusMessage(null);

    const geoOptions: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        const accuracy = Math.round(pos.coords.accuracy || 0);

        let resolvedAddress = `GPS: ${lat}, ${lng} (±${accuracy}m)`;

        // Update coordinates immediately
        setLocation({
          latitude: lat,
          longitude: lng,
          address: resolvedAddress,
          query: `${lat},${lng}`,
        });

        setStatusMessage({
          type: 'success',
          text: `GPS Location locked: ${lat}, ${lng} (Accurate to ${accuracy}m)`,
        });
        setIsLocating(false);

        // Attempt reverse geocoding to retrieve readable address
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 4000);
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
            { signal: controller.signal }
          );
          clearTimeout(timeoutId);
          if (response.ok) {
            const data = await response.json();
            if (data && data.display_name) {
              const shortName = data.display_name.split(',').slice(0, 3).join(',').trim();
              setLocation((prev) => ({
                ...prev,
                address: shortName || data.display_name,
                query: `${lat},${lng}`,
              }));
              setStatusMessage({
                type: 'success',
                text: `Current GPS: ${shortName || `${lat}, ${lng}`}`,
              });
            }
          }
        } catch {
          // If reverse geocoding is blocked or times out, coordinates are already set
        }
      },
      (err) => {
        setIsLocating(false);
        let msg = 'Could not retrieve your location.';
        if (err.code === 1) {
          msg = 'Location permission was denied. Please allow location access in your browser.';
        } else if (err.code === 2) {
          msg = 'Location position unavailable. Please check your device GPS.';
        } else if (err.code === 3) {
          msg = 'Location request timed out. Please try again.';
        }
        setStatusMessage({ type: 'error', text: msg });
      },
      geoOptions
    );
  };

  return (
    <div className="space-y-4 text-white">
      {/* Search Place / Address */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
          Search Place / Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
            <MapPin className="w-4 h-4" />
          </div>
          <input
            id="input-location-address"
            type="text"
            value={location.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="e.g. Eiffel Tower, Paris or 1600 Amphitheatre Pkwy, Mountain View"
            className="w-full pl-9 pr-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>
      </div>

      {/* GPS Location Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-zinc-900/90 border border-zinc-800 rounded-xl">
        <span className="text-xs font-semibold text-zinc-300">
          Or use exact GPS coordinates:
        </span>
        <button
          type="button"
          id="btn-use-gps-location"
          disabled={isLocating}
          onClick={handleGetCurrentLocation}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-sm cursor-pointer disabled:opacity-50"
        >
          {isLocating ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Fetching Current GPS...</span>
            </>
          ) : (
            <>
              <Navigation className="w-3.5 h-3.5" />
              <span>Use My Current GPS Location</span>
            </>
          )}
        </button>
      </div>

      {/* Status Notice */}
      {statusMessage && (
        <div
          className={`p-2.5 rounded-lg text-xs flex items-center gap-2 border ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300'
              : 'bg-rose-950/40 border-rose-800/80 text-rose-300'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          )}
          <span className="flex-1">{statusMessage.text}</span>
        </div>
      )}

      {/* Coordinates Inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            Latitude
          </label>
          <input
            id="input-location-lat"
            type="text"
            value={location.latitude}
            onChange={(e) => handleChange('latitude', e.target.value)}
            placeholder="37.774900"
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            Longitude
          </label>
          <input
            id="input-location-lng"
            type="text"
            value={location.longitude}
            onChange={(e) => handleChange('longitude', e.target.value)}
            placeholder="-122.419400"
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>
      </div>

      {location.latitude && location.longitude && (
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>Map Coordinates: <code className="text-blue-400 font-mono">{location.latitude}, {location.longitude}</code></span>
          <a
            href={`https://maps.google.com/?q=${location.latitude},${location.longitude}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold"
          >
            <span>Test on Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      {/* Preset Popular Cities */}
      <div>
        <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1.5">
          Popular Cities Presets
        </span>
        <div className="flex flex-wrap gap-1.5">
          {CITY_PRESETS.map((city) => (
            <button
              key={city.name}
              type="button"
              onClick={() => {
                setLocation({
                  latitude: city.lat,
                  longitude: city.lng,
                  address: city.name,
                  query: `${city.lat},${city.lng}`,
                });
                setStatusMessage({
                  type: 'success',
                  text: `Selected ${city.name} (${city.lat}, ${city.lng})`,
                });
              }}
              className="px-2.5 py-1 text-xs rounded-lg bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-zinc-700 transition-colors"
            >
              {city.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

