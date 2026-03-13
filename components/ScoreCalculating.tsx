'use client';

import { useEffect, useState } from 'react';

interface ScoreCalculatingProps {
  onComplete: () => void;
}

const FACTORS = [
  'Sleep', 'Diet', 'Stress', 'Physical Activity',
  'Social Connection', 'Smoking', 'Future Outlook',
  'Religion', 'Work History', 'Alcohol',
];

export default function ScoreCalculating({ onComplete }: ScoreCalculatingProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 2500;

    function tick(now: number) {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 300);
      }
    }

    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <div className="w-full max-w-lg mx-auto py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10">
        {/* Desktop: horizontal flow diagram */}
        <div className="hidden sm:flex w-full items-center justify-center mb-8">
          <svg viewBox="0 0 400 200" className="w-full h-auto max-w-md" xmlns="http://www.w3.org/2000/svg">
            {FACTORS.map((factor, i) => {
              const y = 15 + i * 19;
              const delay = i * 0.25;
              return (
                <g key={factor}>
                  <rect x="4" y={y - 8} rx="8" ry="8" width="90" height="16" fill="#0BBAB4" opacity="0.12" />
                  <text
                    x="49"
                    y={y + 3}
                    textAnchor="middle"
                    fill="#0BBAB4"
                    fontSize="8"
                    fontWeight="600"
                    fontFamily="system-ui, sans-serif"
                  >
                    {factor}
                  </text>
                  <path
                    d={`M94 ${y} Q170 ${y} 210 100`}
                    stroke="#0BBAB4"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.2"
                  />
                  <circle r="2.5" fill="#0BBAB4" opacity="0.7">
                    <animateMotion
                      dur="1.8s"
                      repeatCount="indefinite"
                      path={`M94 ${y} Q170 ${y} 210 100`}
                      begin={`${delay}s`}
                    />
                  </circle>
                </g>
              );
            })}
            <rect x="210" y="55" rx="12" ry="12" width="120" height="90" fill="white" stroke="#0BBAB4" strokeWidth="2" />
            <text x="270" y="93" textAnchor="middle" fill="#0BBAB4" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif">Longevity</text>
            <text x="270" y="107" textAnchor="middle" fill="#0BBAB4" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif">Score</text>
            <rect x="230" y="120" rx="3" ry="3" width="80" height="6" fill="#0BBAB4" opacity="0.1" />
            <rect x="230" y="120" rx="3" ry="3" height="6" fill="#0BBAB4" opacity="0.4" width={80 * progress} />
          </svg>
        </div>

        {/* Mobile: centered vertical layout */}
        <div className="flex sm:hidden flex-col items-center mb-8">
          <svg viewBox="0 0 240 360" className="w-full h-auto max-w-[240px]" xmlns="http://www.w3.org/2000/svg">
            {/* Factor labels stacked vertically at top */}
            {FACTORS.map((factor, i) => {
              const col = i % 2;
              const row = Math.floor(i / 2);
              const x = col === 0 ? 30 : 150;
              const y = 18 + row * 32;
              const delay = i * 0.2;
              // Flow path: from label down to the score card center
              const endX = 120;
              const endY = 260;
              const ctrlY = y + 40;

              return (
                <g key={factor}>
                  <rect x={x - 46} y={y - 10} rx="8" ry="8" width="92" height="20" fill="#0BBAB4" opacity="0.12" />
                  <text
                    x={x}
                    y={y + 4}
                    textAnchor="middle"
                    fill="#0BBAB4"
                    fontSize="9"
                    fontWeight="600"
                    fontFamily="system-ui, sans-serif"
                  >
                    {factor}
                  </text>
                  {/* Flow line down to score card */}
                  <path
                    d={`M${x} ${y + 10} Q${x} ${ctrlY} ${endX} ${endY}`}
                    stroke="#0BBAB4"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.15"
                  />
                  {/* Animated dot flowing downward */}
                  <circle r="2.5" fill="#0BBAB4" opacity="0.7">
                    <animateMotion
                      dur="1.6s"
                      repeatCount="indefinite"
                      path={`M${x} ${y + 10} Q${x} ${ctrlY} ${endX} ${endY}`}
                      begin={`${delay}s`}
                    />
                  </circle>
                </g>
              );
            })}

            {/* Score card at bottom center */}
            <rect x="55" y="270" rx="12" ry="12" width="130" height="70" fill="white" stroke="#0BBAB4" strokeWidth="2" />
            <text x="120" y="302" textAnchor="middle" fill="#0BBAB4" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">Longevity</text>
            <text x="120" y="317" textAnchor="middle" fill="#0BBAB4" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">Score</text>

            {/* Progress bar inside card */}
            <rect x="80" y="328" rx="3" ry="3" width="80" height="6" fill="#0BBAB4" opacity="0.1" />
            <rect x="80" y="328" rx="3" ry="3" height="6" fill="#0BBAB4" opacity="0.4" width={80 * progress} />
          </svg>
        </div>

        {/* Text overlay */}
        <p className="text-center text-lg font-semibold text-primary animate-pulse">
          Analyzing your lifestyle factors&hellip;
        </p>
      </div>
    </div>
  );
}
