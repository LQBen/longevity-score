'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

const TIERS = [
  { label: 'Longevity Warning',    color: '#E74C3C', bg: '#FEE2E2', textColor: '#B91C1C', borderColor: '#F87171' },
  { label: 'Longevity Challenged', color: '#F59E0B', bg: '#FEF3C7', textColor: '#B45309', borderColor: '#FBBF24' },
  { label: 'Longevity Enabled',    color: '#0EA5E9', bg: '#E0F2FE', textColor: '#0369A1', borderColor: '#38BDF8' },
  { label: 'Longevity Inclined',   color: '#14B8A6', bg: '#CCFBF1', textColor: '#0F766E', borderColor: '#2DD4BF' },
  { label: 'Longevity Optimized',  color: '#94A3B8', bg: '#F1F5F9', textColor: '#475569', borderColor: '#94A3B8', metallic: 'silver' as const },
  { label: 'Longevity Champion',   color: '#CA8A04', bg: '#FEF9C3', textColor: '#854D0E', borderColor: '#EAB308', metallic: 'gold' as const },
];

const BADGE_WIDTH = 180;
const BADGE_GAP = 16;
const ITEM_WIDTH = BADGE_WIDTH + BADGE_GAP;

interface TierBadgeRevealProps {
  tierLabel: string;
}

export default function TierBadgeReveal({ tierLabel }: TierBadgeRevealProps) {
  const targetIndex = TIERS.findIndex(t => t.label === tierLabel);
  const [phase, setPhase] = useState<'intro' | 'interactive'>('intro');
  const [displayOffset, setDisplayOffset] = useState(0);
  const animRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const snapBackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const offsetRef = useRef(0); // mutable ref to avoid stale closures

  const dragState = useRef({
    dragging: false,
    startX: 0,
    startOffset: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });

  const getTargetOffset = useCallback(() => targetIndex * ITEM_WIDTH, [targetIndex]);

  // Helper: animate from current offset to a destination
  const animateTo = useCallback((dest: number, duration?: number) => {
    const start = offsetRef.current;
    const distance = dest - start;
    if (Math.abs(distance) < 1) {
      offsetRef.current = dest;
      setDisplayOffset(dest);
      return;
    }
    const dur = duration ?? 350 + Math.min(Math.abs(distance) * 0.4, 350);
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / dur, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + distance * eased;
      offsetRef.current = current;
      setDisplayOffset(current);
      if (progress < 1) {
        animRef.current = requestAnimationFrame(tick);
      }
    }

    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(tick);
  }, []);

  // Schedule auto-snap back to user's tier after idle
  const scheduleSnapBack = useCallback(() => {
    if (snapBackTimerRef.current) clearTimeout(snapBackTimerRef.current);
    const target = getTargetOffset();
    if (Math.abs(offsetRef.current - target) < 1) return;
    snapBackTimerRef.current = setTimeout(() => {
      animateTo(target, 600);
    }, 1000);
  }, [getTargetOffset, animateTo]);

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
      offsetRef.current = current;
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

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (snapBackTimerRef.current) clearTimeout(snapBackTimerRef.current);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    };
  }, []);

  // Pointer/touch handlers
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (phase !== 'interactive') return;
    if (animRef.current) cancelAnimationFrame(animRef.current);
    if (snapBackTimerRef.current) clearTimeout(snapBackTimerRef.current);

    const ds = dragState.current;
    ds.dragging = true;
    ds.startX = e.clientX;
    ds.startOffset = offsetRef.current;
    ds.lastX = e.clientX;
    ds.lastTime = performance.now();
    ds.velocity = 0;

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [phase]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const ds = dragState.current;
    if (!ds.dragging) return;

    const now = performance.now();
    const dx = ds.startX - e.clientX;
    const newOffset = ds.startOffset + dx;

    const dt = now - ds.lastTime;
    if (dt > 0) {
      ds.velocity = (ds.lastX - e.clientX) / dt;
    }
    ds.lastX = e.clientX;
    ds.lastTime = now;

    // Rubber-band at edges
    const minOffset = 0;
    const maxOffset = (TIERS.length - 1) * ITEM_WIDTH;
    let clamped = newOffset;
    if (clamped < minOffset) {
      clamped = minOffset + (clamped - minOffset) * 0.3;
    } else if (clamped > maxOffset) {
      clamped = maxOffset + (clamped - maxOffset) * 0.3;
    }

    offsetRef.current = clamped;
    setDisplayOffset(clamped);
  }, []);

  const onPointerUp = useCallback(() => {
    const ds = dragState.current;
    if (!ds.dragging) return;
    ds.dragging = false;

    // Apply velocity for momentum — project where the offset would land
    const projected = offsetRef.current + ds.velocity * 120;

    // Snap to nearest badge
    const nearestIndex = Math.round(
      Math.max(0, Math.min((TIERS.length - 1) * ITEM_WIDTH, projected)) / ITEM_WIDTH
    );
    const nearestOffset = nearestIndex * ITEM_WIDTH;

    animateTo(nearestOffset);

    // Then auto-snap back to user's tier after 1s idle
    scheduleSnapBack();
  }, [animateTo, scheduleSnapBack]);

  // Desktop wheel support
  const onWheel = useCallback((e: React.WheelEvent) => {
    if (phase !== 'interactive') return;
    e.preventDefault();

    if (animRef.current) cancelAnimationFrame(animRef.current);
    if (snapBackTimerRef.current) clearTimeout(snapBackTimerRef.current);

    const delta = e.deltaX || e.deltaY;
    const newOffset = offsetRef.current + delta * 0.5;

    const minOffset = 0;
    const maxOffset = (TIERS.length - 1) * ITEM_WIDTH;
    const clamped = Math.max(minOffset, Math.min(maxOffset, newOffset));

    offsetRef.current = clamped;
    setDisplayOffset(clamped);

    // Debounced snap to nearest, then schedule snap-back
    if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    wheelTimerRef.current = setTimeout(() => {
      const nearestIndex = Math.round(clamped / ITEM_WIDTH);
      const nearestOffset = nearestIndex * ITEM_WIDTH;
      animateTo(nearestOffset);
      scheduleSnapBack();
    }, 120);
  }, [phase, animateTo, scheduleSnapBack]);

  if (targetIndex < 0) {
    return (
      <span className="inline-block text-lg sm:text-xl font-bold px-6 py-2 rounded-full bg-gray-100 text-gray-700 border-2 border-gray-300">
        {tierLabel}
      </span>
    );
  }

  const currentCenterIndex = Math.round(displayOffset / ITEM_WIDTH);

  return (
    <div className="w-full max-w-xl mx-auto min-h-[72px]">
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
          className="flex items-center transition-none py-3"
          style={{
            paddingLeft: `calc(50% - ${BADGE_WIDTH / 2}px)`,
            paddingRight: `calc(50% - ${BADGE_WIDTH / 2}px)`,
            transform: `translateX(-${displayOffset}px)`,
            gap: `${BADGE_GAP}px`,
          }}
        >
          {TIERS.map((tier, i) => {
            const isCenter = i === currentCenterIndex;
            const distFromCenter = Math.abs(i - currentCenterIndex);
            const opacity = isCenter ? 1 : distFromCenter === 1 ? 0.3 : 0.12;
            const scale = isCenter ? 1.05 : distFromCenter === 1 ? 0.88 : 0.78;
            const metallic = (tier as { metallic?: string }).metallic;

            // Badge styles — no shadow on any badge
            const badgeStyle: React.CSSProperties = {
              borderColor: tier.borderColor,
              backgroundColor: tier.bg,
            };

            // Metallic text gradient for silver/gold tiers
            const textStyle: React.CSSProperties = metallic
              ? {
                  background: metallic === 'gold'
                    ? 'linear-gradient(135deg, #B8860B 0%, #FFD700 25%, #DAA520 50%, #FFD700 75%, #B8860B 100%)'
                    : 'linear-gradient(135deg, #708090 0%, #C0C0C0 25%, #E8E8E8 50%, #C0C0C0 75%, #708090 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }
              : { color: tier.textColor };

            // Metallic border gradient for silver/gold
            if (metallic) {
              badgeStyle.backgroundImage = metallic === 'gold'
                ? `linear-gradient(${tier.bg}, ${tier.bg}), linear-gradient(135deg, #B8860B, #FFD700, #DAA520, #FFD700, #B8860B)`
                : `linear-gradient(${tier.bg}, ${tier.bg}), linear-gradient(135deg, #708090, #C0C0C0, #E8E8E8, #C0C0C0, #708090)`;
              badgeStyle.backgroundOrigin = 'border-box';
              badgeStyle.backgroundClip = 'padding-box, border-box';
              badgeStyle.borderColor = 'transparent';
            }

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
                  className={`inline-block text-center font-bold rounded-full whitespace-nowrap border-2 border-solid ${
                    isCenter
                      ? 'text-sm sm:text-base px-4 sm:px-5 py-2 sm:py-2.5'
                      : 'text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2'
                  }`}
                  style={badgeStyle}
                >
                  <span style={textStyle}>{tier.label}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
