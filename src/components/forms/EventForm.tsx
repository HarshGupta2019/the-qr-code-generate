import React from 'react';
import { Calendar, Clock, MapPin, AlignLeft } from 'lucide-react';
import { EventData } from '../../types';

interface EventFormProps {
  event: EventData;
  setEvent: React.Dispatch<React.SetStateAction<EventData>>;
}

export const EventForm: React.FC<EventFormProps> = ({ event, setEvent }) => {
  const handleChange = (field: keyof EventData, value: any) => {
    setEvent((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4 text-white">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
          Event Title / Name *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
            <Calendar className="w-4 h-4" />
          </div>
          <input
            id="input-event-title"
            type="text"
            value={event.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Annual Product Launch 2026"
            className="w-full pl-9 pr-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
          Event Location / Venue
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
            <MapPin className="w-4 h-4" />
          </div>
          <input
            id="input-event-location"
            type="text"
            value={event.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Grand Ballroom, Hilton & Online Stream"
            className="w-full pl-9 pr-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            Start Date & Time
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              value={event.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              className="w-full px-2.5 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            {!event.allDay && (
              <input
                type="time"
                value={event.startTime}
                onChange={(e) => handleChange('startTime', e.target.value)}
                className="w-28 px-2 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            End Date & Time
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              value={event.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              className="w-full px-2.5 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            {!event.allDay && (
              <input
                type="time"
                value={event.endTime}
                onChange={(e) => handleChange('endTime', e.target.value)}
                className="w-28 px-2 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="event-allday"
          type="checkbox"
          checked={event.allDay}
          onChange={(e) => handleChange('allDay', e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded-sm border-zinc-700 bg-zinc-900 focus:ring-blue-500"
        />
        <label htmlFor="event-allday" className="text-xs text-zinc-300 cursor-pointer">
          All-day event
        </label>
      </div>

      <div>
        <label className="block text-xs font-semibold text-zinc-300 mb-1">
          Description
        </label>
        <div className="relative">
          <div className="absolute top-2.5 left-3 pointer-events-none text-zinc-400">
            <AlignLeft className="w-4 h-4" />
          </div>
          <textarea
            rows={2}
            value={event.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Agenda, keynote speakers, dress code details..."
            className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

