'use client';

import { useState } from 'react';

interface TooltipProps {
  text: string;
}

export default function Tooltip({ text }: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-block ml-1">
      <button
        type="button"
        className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-disabled rounded-full hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        aria-label="More information"
      >
        i
      </button>
      {open && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 text-sm text-white bg-gray-800 rounded-lg shadow-lg">
          <div className="relative">
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-800" />
          </div>
        </div>
      )}
    </span>
  );
}
