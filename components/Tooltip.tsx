'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface TooltipProps {
  text: string;
}

export default function Tooltip({ text }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('click', handleClickOutside, true);
      return () => document.removeEventListener('click', handleClickOutside, true);
    }
  }, [open, handleClickOutside]);

  return (
    <span ref={containerRef} className="relative inline-flex items-center ml-2 align-middle">
      <button
        type="button"
        className="inline-flex items-center justify-center w-10 h-10 text-lg font-extrabold text-white bg-primary rounded-full shadow-md shadow-primary/30 border-2 border-primary-dark hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary transition-colors active:scale-95"
        onClick={() => setOpen(!open)}
        aria-label="More information"
      >
        ?
      </button>
      {open && (
        <div className="absolute z-50 top-full left-0 mt-2 w-72 max-w-[calc(100vw-48px)] p-3 text-sm text-white bg-gray-800 rounded-lg shadow-lg">
          <div className="relative">
            <div className="absolute bottom-full left-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-800" />
            {text}
          </div>
        </div>
      )}
    </span>
  );
}
