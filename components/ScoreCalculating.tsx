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
        {/* SVG animation: factors flowing into score card */}
        <div className="w-full flex items-center justify-center mb-8">
          <svg viewBox="0 0 400 200" className="w-full h-auto max-w-md" xmlns="http://www.w3.org/2000/svg">
            {/* Factor labels on left */}
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

                  {/* Flow line */}
                  <path
                    d={`M94 ${y} Q170 ${y} 210 100`}
                    stroke="#0BBAB4"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.2"
                  />

                  {/* Animated dot */}
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

            {/* Center card */}
            <rect x="210" y="55" rx="12" ry="12" width="120" height="90" fill="white" stroke="#0BBAB4" strokeWidth="2" />
            <text x="270" y="93" textAnchor="middle" fill="#0BBAB4" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif">Longevity</text>
            <text x="270" y="107" textAnchor="middle" fill="#0BBAB4" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif">Score</text>

            {/* Progress indicator inside card */}
            <rect x="230" y="120" rx="3" ry="3" width="80" height="6" fill="#0BBAB4" opacity="0.1" />
            <rect
              x="230"
              y="120"
              rx="3"
              ry="3"
              height="6"
              fill="#0BBAB4"
              opacity="0.4"
              width={80 * progress}
            />
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
