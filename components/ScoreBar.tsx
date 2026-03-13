'use client';

import { useEffect, useState } from 'react';

interface ScoreBarProps {
  score: number;
}

const TIER_SEGMENTS = [
  { label: 'Warning', max: 24, color: '#E74C3C' },
  { label: 'Challenged', max: 49, color: '#F59E0B' },
  { label: 'Enabled', max: 69, color: '#0EA5E9' },
  { label: 'Inclined', max: 79, color: '#14B8A6' },
  { label: 'Optimized', max: 89, color: '#94A3B8' },
  { label: 'Champion', max: 100, color: '#D4A017' },
];

function getScoreColor(score: number): string {
  for (const seg of TIER_SEGMENTS) {
    if (score <= seg.max) return seg.color;
  }
  return TIER_SEGMENTS[TIER_SEGMENTS.length - 1].color;
}

export default function ScoreBar({ score }: ScoreBarProps) {
  const [animatedPos, setAnimatedPos] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedPos(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const scoreColor = getScoreColor(score);

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Score number */}
      <div className="text-center mb-4">
        <div
          className="text-6xl sm:text-7xl font-bold animate-fade-in-up"
          style={{ animationDelay: '1.5s', color: scoreColor }}
        >
          {score}%
        </div>
      </div>

      {/* Multi-segment gradient bar */}
      <div className="relative w-full">
        <div className="w-full h-6 rounded-full overflow-hidden flex">
          {TIER_SEGMENTS.map((seg, i) => {
            const prevMax = i === 0 ? 0 : TIER_SEGMENTS[i - 1].max + 1;
            const width = seg.max - prevMax + (i === 0 ? 1 : 0);
            return (
              <div
                key={seg.label}
                className="h-full"
                style={{
                  width: `${width}%`,
                  backgroundColor: seg.color,
                }}
              />
            );
          })}
        </div>

        {/* Position marker (triangle + dot) */}
        <div
          className="absolute top-0 transition-all duration-[2s] ease-out"
          style={{ left: `${animatedPos}%`, transform: 'translateX(-50%)' }}
        >
          {/* Marker line */}
          <div className="w-1 h-6 bg-foreground rounded-full mx-auto" />
          {/* Triangle arrow below bar */}
          <div className="w-0 h-0 mx-auto border-l-[8px] border-r-[8px] border-t-[10px] border-transparent border-t-foreground" />
        </div>
      </div>

      <div className="flex justify-between mt-1 text-sm text-gray-400">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
}
