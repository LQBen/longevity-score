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

  // Radial layout calculations for mobile
  const cx = 150; // center x
  const cy = 150; // center y
  const radius = 115; // distance from center to factor labels

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

        {/* Mobile: centered radial layout */}
        <div className="flex sm:hidden flex-col items-center mb-8">
          <svg viewBox="0 0 300 300" className="w-full h-auto max-w-[280px]" xmlns="http://www.w3.org/2000/svg">
            {/* Factor labels arranged in a circle */}
            {FACTORS.map((factor, i) => {
              const angle = (i / FACTORS.length) * 2 * Math.PI - Math.PI / 2;
              const fx = cx + radius * Math.cos(angle);
              const fy = cy + radius * Math.sin(angle);
              const delay = i * 0.18;

              return (
                <g key={factor}>
                  {/* Label background pill */}
                  <rect
                    x={fx - 38}
                    y={fy - 9}
                    rx="8"
                    ry="8"
                    width="76"
                    height="18"
                    fill="#0BBAB4"
                    opacity="0.12"
                  />
                  {/* Label text */}
                  <text
                    x={fx}
                    y={fy + 4}
                    textAnchor="middle"
                    fill="#0BBAB4"
                    fontSize="7.5"
                    fontWeight="600"
                    fontFamily="system-ui, sans-serif"
                  >
                    {factor}
                  </text>
                  {/* Flow line from label toward center */}
                  <line
                    x1={fx}
                    y1={fy}
                    x2={cx}
                    y2={cy}
                    stroke="#0BBAB4"
                    strokeWidth="0.8"
                    opacity="0.15"
                  />
                  {/* Animated dot flowing inward */}
                  <circle r="2.5" fill="#0BBAB4" opacity="0.7">
                    <animateMotion
                      dur="1.5s"
                      repeatCount="indefinite"
                      path={`M${fx - cx} ${fy - cy} L0 0`}
                      begin={`${delay}s`}
                    />
                    <set attributeName="cx" to={cx} />
                    <set attributeName="cy" to={cy} />
                  </circle>
                </g>
              );
            })}

            {/* Center score card */}
            <rect x={cx - 42} y={cy - 30} rx="10" ry="10" width="84" height="60" fill="white" stroke="#0BBAB4" strokeWidth="2" />
            <text x={cx} y={cy - 5} textAnchor="middle" fill="#0BBAB4" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif">Longevity</text>
            <text x={cx} y={cy + 7} textAnchor="middle" fill="#0BBAB4" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif">Score</text>

            {/* Progress bar inside card */}
            <rect x={cx - 28} y={cy + 14} rx="2.5" ry="2.5" width="56" height="5" fill="#0BBAB4" opacity="0.1" />
            <rect x={cx - 28} y={cy + 14} rx="2.5" ry="2.5" height="5" fill="#0BBAB4" opacity="0.4" width={56 * progress} />
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
