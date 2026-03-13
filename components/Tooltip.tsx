'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface TooltipProps {
  text: string;
}

export default function Tooltip({ text }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const canHover = useRef(false);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const [arrowLeft, setArrowLeft] = useState<number | null>(null);

  useEffect(() => {
    canHover.current = window.matchMedia('(hover: hover)').matches;
  }, []);

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

  // Position the tooltip to stay within viewport
  useEffect(() => {
    if (!open || !buttonRef.current || !tooltipRef.current) return;

    const btnRect = buttonRef.current.getBoundingClientRect();
    const tooltipEl = tooltipRef.current;
    const tooltipWidth = tooltipEl.offsetWidth;
    const viewportWidth = window.innerWidth;
    const padding = 16;

    // Calculate ideal left position (centered on button, relative to container)
    const btnCenterX = btnRect.left + btnRect.width / 2;
    let idealLeft = btnCenterX - tooltipWidth / 2;

    // Clamp to viewport bounds
    if (idealLeft < padding) {
      idealLeft = padding;
    } else if (idealLeft + tooltipWidth > viewportWidth - padding) {
      idealLeft = viewportWidth - padding - tooltipWidth;
    }

    // Convert to position relative to button container
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const relativeLeft = idealLeft - containerRect.left;

    setTooltipStyle({
      left: `${relativeLeft}px`,
      right: 'auto',
    });

    // Arrow points to button center
    const arrowPos = btnCenterX - idealLeft;
    setArrowLeft(arrowPos);
  }, [open]);

  return (
    <span ref={containerRef} className="relative inline-flex items-center ml-2 align-middle">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex items-center justify-center w-10 h-10 text-lg font-extrabold text-white bg-primary rounded-full shadow-md shadow-primary/30 border-2 border-primary-dark hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary transition-colors active:scale-95"
        onClick={() => setOpen(prev => !prev)}
        onMouseEnter={() => { if (canHover.current) setOpen(true); }}
        onMouseLeave={() => { if (canHover.current) setOpen(false); }}
        aria-label="More information"
      >
        ?
      </button>
      {open && (
        <div
          ref={tooltipRef}
          className="absolute z-50 top-full mt-2 w-72 max-w-[calc(100vw-32px)] p-3 text-sm text-white bg-gray-800 rounded-lg shadow-lg"
          style={tooltipStyle}
          onMouseEnter={() => { if (canHover.current) setOpen(true); }}
          onMouseLeave={() => { if (canHover.current) setOpen(false); }}
        >
          <div className="relative">
            <div
              className="absolute bottom-full w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-800"
              style={{ left: arrowLeft != null ? `${arrowLeft - 8}px` : '16px' }}
            />
            {text}
          </div>
        </div>
      )}
    </span>
  );
}
