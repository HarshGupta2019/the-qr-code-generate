import React from 'react';
import { Mail, Tag, AlignLeft } from 'lucide-react';
import { EmailData } from '../../types';

interface EmailFormProps {
  email: EmailData;
  setEmail: React.Dispatch<React.SetStateAction<EmailData>>;
}

export const EmailForm: React.FC<EmailFormProps> = ({ email, setEmail }) => {
  const handleChange = (field: keyof EmailData, value: string) => {
    setEmail((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4 text-white">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
          Recipient Email Address *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
            <Mail className="w-5 h-5" />
          </div>
          <input
            id="input-email-recipient"
            type="email"
            value={email.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="contact@business.com"
            className="w-full pl-10 pr-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
          Email Subject (Optional)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
            <Tag className="w-4 h-4" />
          </div>
          <input
            id="input-email-subject"
            type="text"
            value={email.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            placeholder="Partnership Inquiry / Customer Feedback"
            className="w-full pl-9 pr-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
          Email Body Message (Optional)
        </label>
        <div className="relative">
          <div className="absolute top-3 left-3 pointer-events-none text-zinc-400">
            <AlignLeft className="w-4 h-4" />
          </div>
          <textarea
            id="input-email-body"
            rows={3}
            value={email.body}
            onChange={(e) => handleChange('body', e.target.value)}
            placeholder="Write the draft message content here..."
            className="w-full pl-9 pr-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

