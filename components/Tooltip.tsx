'use client';

import { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  text: string;
}

export default function Tooltip({ text }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Reposition tooltip to stay within viewport
  useEffect(() => {
    if (open && tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      const vw = window.innerWidth;

      // Reset any previous offset
      tooltipRef.current.style.left = '';
      tooltipRef.current.style.transform = 'translateX(-50%)';

      // Check if overflowing right
      if (rect.right > vw - 12) {
        const overflow = rect.right - vw + 12;
        tooltipRef.current.style.transform = `translateX(calc(-50% - ${overflow}px))`;
      }
      // Check if overflowing left
      if (rect.left < 12) {
        const overflow = 12 - rect.left;
        tooltipRef.current.style.transform = `translateX(calc(-50% + ${overflow}px))`;
      }
    }
  }, [open]);

  return (
    <span className="relative inline-block ml-2 align-middle">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex items-center justify-center w-7 h-7 text-sm font-bold text-primary border-2 border-primary/40 rounded-full hover:bg-primary hover:text-white hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        aria-label="More information"
      >
        ?
      </button>
      {open && (
        <div
          ref={tooltipRef}
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 max-w-[calc(100vw-24px)] p-3 text-sm text-white bg-gray-800 rounded-lg shadow-lg"
        >
          <div className="relative">
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-800" />
          </div>
        </div>
      )}
    </span>
  );
}
