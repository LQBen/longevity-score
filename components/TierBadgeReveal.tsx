'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

const TIERS = [
  { label: 'Longevity Warning', color: '#E74C3C', bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-400' },
  { label: 'Longevity Challenged', color: '#F59E0B', bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-400' },
  { label: 'Longevity Enabled', color: '#0EA5E9', bg: 'bg-sky-100', text: 'text-sky-700', border: 'border-sky-400' },
  { label: 'Longevity Inclined', color: '#14B8A6', bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-400' },
  { label: 'Longevity Optimized', color: '#94A3B8', bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-400' },
  { label: 'Longevity Champion', color: '#D4A017', bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-500' },
];

const BADGE_WIDTH = 112;
const BADGE_GAP = 12;
const ITEM_WIDTH = BADGE_WIDTH + BADGE_GAP;

interface TierBadgeRevealProps {
  tierLabel: string;
}

export default function TierBadgeReveal({ tierLabel }: TierBadgeRevealProps) {
  const targetIndex = TIERS.findIndex(t => t.label === tierLabel);
  const [phase, setPhase] = useState<'intro' | 'interactive'>('intro');
  const [offset, setOffset] = useState(0);
  const [displayOffset, setDisplayOffset] = useState(0);
  const animRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Touch/drag state
  const dragState = useRef({
    dragging: false,
    startX: 0,
    startOffset: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });

  const getTargetOffset = useCallback(() => targetIndex * ITEM_WIDTH, [targetIndex]);

  // Phase 1: Intro slot-machine animation
  useEffect(() => {
    if (targetIndex < 0) {
      setPhase('interactive');
      return;
    }

    const totalDistance = getTargetOffset();
    const duration = 1500;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * totalDistance;
      setOffset(current);
      setDisplayOffset(current);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setPhase('interactive');
      }
    }

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [targetIndex, getTargetOffset]);

  // Snap-back animation to target
  const snapBack = useCallback(() => {
    const target = getTargetOffset();
    const start = offset;
    const distance = target - start;
    if (Math.abs(distance) < 1) {
      setOffset(target);
      setDisplayOffset(target);
      return;
    }
    const duration = 400 + Math.min(Math.abs(distance) * 0.5, 400);
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + distance * eased;
      setOffset(current);
      setDisplayOffset(current);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    }

    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(animate);
  }, [offset, getTargetOffset]);

  // Touch handlers
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (phase !== 'interactive') return;
    if (animRef.current) cancelAnimationFrame(animRef.current);

    const ds = dragState.current;
    ds.dragging = true;
    ds.startX = e.clientX;
    ds.startOffset = offset;
    ds.lastX = e.clientX;
    ds.lastTime = performance.now();
    ds.velocity = 0;

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [phase, offset]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const ds = dragState.current;
    if (!ds.dragging) return;

    const now = performance.now();
    const dx = ds.startX - e.clientX;
    const newOffset = ds.startOffset + dx;

    // Track velocity
    const dt = now - ds.lastTime;
    if (dt > 0) {
      ds.velocity = (ds.lastX - e.clientX) / dt;
    }
    ds.lastX = e.clientX;
    ds.lastTime = now;

    // Clamp with rubber-band effect at edges
    const minOffset = 0;
    const maxOffset = (TIERS.length - 1) * ITEM_WIDTH;
    let clamped = newOffset;
    if (clamped < minOffset) {
      clamped = minOffset + (clamped - minOffset) * 0.3;
    } else if (clamped > maxOffset) {
      clamped = maxOffset + (clamped - maxOffset) * 0.3;
    }

    setOffset(clamped);
    setDisplayOffset(clamped);
  }, []);

  const onPointerUp = useCallback(() => {
    const ds = dragState.current;
    if (!ds.dragging) return;
    ds.dragging = false;

    // Snap back to target with a brief delay so it feels natural
    requestAnimationFrame(() => snapBack());
  }, [snapBack]);

  // Wheel scroll support for desktop
  const onWheel = useCallback((e: React.WheelEvent) => {
    if (phase !== 'interactive') return;
    e.preventDefault();

    if (animRef.current) cancelAnimationFrame(animRef.current);

    const delta = e.deltaX || e.deltaY;
    const newOffset = offset + delta * 0.5;

    const minOffset = 0;
    const maxOffset = (TIERS.length - 1) * ITEM_WIDTH;
    const clamped = Math.max(minOffset, Math.min(maxOffset, newOffset));

    setOffset(clamped);
    setDisplayOffset(clamped);

    // Debounced snap-back
    if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    wheelTimerRef.current = setTimeout(() => {
      snapBack();
    }, 150);
  }, [phase, offset, snapBack]);

  if (targetIndex < 0) {
    return (
      <span className="inline-block text-lg sm:text-xl font-bold px-6 py-2 rounded-full bg-gray-100 text-gray-700 border-2 border-gray-300">
        {tierLabel}
      </span>
    );
  }

  // Calculate which badge is currently centered
  const currentCenterIndex = Math.round(displayOffset / ITEM_WIDTH);

  return (
    <div className="w-full max-w-xl mx-auto min-h-[80px]">
      <div
        ref={containerRef}
        className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={{ touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
      >
        <div
          ref={trackRef}
          className="flex items-center transition-none py-2"
          style={{
            transform: `translateX(calc(50% - ${BADGE_WIDTH / 2}px - ${displayOffset}px))`,
            gap: `${BADGE_GAP}px`,
          }}
        >
          {TIERS.map((tier, i) => {
            const isCenter = i === currentCenterIndex;
            const isTarget = i === targetIndex;
            const distFromCenter = Math.abs(i - currentCenterIndex);
            const opacity = isCenter ? 1 : distFromCenter === 1 ? 0.35 : 0.15;
            const scale = isCenter ? 1.1 : distFromCenter === 1 ? 0.85 : 0.75;

            return (
              <div
                key={tier.label}
                className="flex-shrink-0 flex items-center justify-center transition-all duration-150"
                style={{
                  width: `${BADGE_WIDTH}px`,
                  opacity,
                  transform: `scale(${scale})`,
                }}
              >
                <span
                  className={`inline-block text-center text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 whitespace-nowrap ${tier.bg} ${tier.text} ${tier.border}`}
                  style={{
                    boxShadow: isCenter && isTarget ? `0 4px 20px ${tier.color}50` : 'none',
                  }}
                >
                  {tier.label.replace('Longevity ', '')}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full tier label below */}
      {phase === 'interactive' && (
        <div className="text-center mt-2 animate-fade-in-up">
          <span
            className={`inline-block text-base sm:text-lg font-bold px-5 sm:px-6 py-2 rounded-full border-2 ${TIERS[targetIndex].bg} ${TIERS[targetIndex].text} ${TIERS[targetIndex].border}`}
            style={{ boxShadow: `0 4px 20px ${TIERS[targetIndex].color}40` }}
          >
            {tierLabel}
          </span>
        </div>
      )}
    </div>
  );
}
