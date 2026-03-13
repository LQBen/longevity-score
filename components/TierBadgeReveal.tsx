'use client';

import { useEffect, useState, useRef } from 'react';

const TIERS = [
  { label: 'Longevity Warning', color: '#E74C3C', bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-400' },
  { label: 'Longevity Challenged', color: '#F59E0B', bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-400' },
  { label: 'Longevity Enabled', color: '#0EA5E9', bg: 'bg-sky-100', text: 'text-sky-700', border: 'border-sky-400' },
  { label: 'Longevity Inclined', color: '#14B8A6', bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-400' },
  { label: 'Longevity Optimized', color: '#94A3B8', bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-400' },
  { label: 'Longevity Champion', color: '#D4A017', bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-500' },
];

interface TierBadgeRevealProps {
  tierLabel: string;
}

export default function TierBadgeReveal({ tierLabel }: TierBadgeRevealProps) {
  const targetIndex = TIERS.findIndex(t => t.label === tierLabel);
  const [settled, setSettled] = useState(false);
  const [offset, setOffset] = useState(0);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (targetIndex < 0) {
      setSettled(true);
      return;
    }

    // Animate: scroll through tiers from 0 to target, decelerating
    const totalDistance = targetIndex * 100; // px units for the carousel
    const duration = 1500; // ms
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setOffset(eased * totalDistance);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setSettled(true);
      }
    }

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [targetIndex]);

  const effectiveIndex = settled ? targetIndex : Math.round(offset / 100);

  if (targetIndex < 0) {
    // Fallback: just show the label
    return (
      <span className="inline-block text-lg sm:text-xl font-bold px-6 py-2 rounded-full bg-gray-100 text-gray-700 border-2 border-gray-300">
        {tierLabel}
      </span>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4 min-h-[56px]">
      {/* Left neighbor (faded) */}
      {settled && targetIndex > 0 && (
        <span
          className={`hidden sm:inline-block text-sm font-bold px-4 py-1.5 rounded-full border-2 opacity-30 ${TIERS[targetIndex - 1].bg} ${TIERS[targetIndex - 1].text} ${TIERS[targetIndex - 1].border}`}
        >
          {TIERS[targetIndex - 1].label}
        </span>
      )}

      {/* Carousel container */}
      <div className="overflow-hidden" style={{ width: settled ? 'auto' : '260px' }}>
        <div
          className="flex transition-none whitespace-nowrap"
          style={{
            transform: settled ? 'none' : `translateX(-${offset}px)`,
            gap: settled ? '0px' : '12px',
          }}
        >
          {settled ? (
            // Final settled badge
            <span
              className={`inline-block text-lg sm:text-xl font-bold px-6 py-2 rounded-full border-2 scale-105 ${TIERS[targetIndex].bg} ${TIERS[targetIndex].text} ${TIERS[targetIndex].border}`}
              style={{
                boxShadow: `0 4px 20px ${TIERS[targetIndex].color}40`,
              }}
            >
              {tierLabel}
            </span>
          ) : (
            // Scrolling badges
            TIERS.map((tier, i) => (
              <span
                key={tier.label}
                className={`inline-block flex-shrink-0 text-base font-bold px-5 py-2 rounded-full border-2 ${tier.bg} ${tier.text} ${tier.border}`}
                style={{
                  width: '100px',
                  textAlign: 'center',
                  fontSize: '11px',
                  opacity: Math.abs(effectiveIndex - i) <= 1 ? 1 : 0.4,
                }}
              >
                {tier.label.replace('Longevity ', '')}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Right neighbor (faded) */}
      {settled && targetIndex < TIERS.length - 1 && (
        <span
          className={`hidden sm:inline-block text-sm font-bold px-4 py-1.5 rounded-full border-2 opacity-30 ${TIERS[targetIndex + 1].bg} ${TIERS[targetIndex + 1].text} ${TIERS[targetIndex + 1].border}`}
        >
          {TIERS[targetIndex + 1].label}
        </span>
      )}
    </div>
  );
}
