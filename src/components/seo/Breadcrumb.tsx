import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  currentLabel: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentLabel }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center space-x-1.5 sm:space-x-2 text-xs text-slate-600 dark:text-slate-400 py-2 sm:py-3 mb-3 overflow-x-auto no-scrollbar"
    >
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-sky-600 dark:hover:text-sky-400 transition-colors font-medium shrink-0"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600 shrink-0" />

      <Link
        to="/"
        className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors font-medium shrink-0"
      >
        <span>QR Code Generators</span>
      </Link>

      <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600 shrink-0" />

      <span
        className="text-slate-900 dark:text-white font-bold truncate max-w-[200px] sm:max-w-none"
        aria-current="page"
      >
        {currentLabel}
      </span>
    </nav>
  );
};
