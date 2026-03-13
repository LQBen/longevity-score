'use client';

interface ScoreBarProps {
  score: number;
}

function interpolateColor(c1: string, c2: string, t: number): string {
  const r1 = parseInt(c1.slice(1, 3), 16);
  const g1 = parseInt(c1.slice(3, 5), 16);
  const b1 = parseInt(c1.slice(5, 7), 16);
  const r2 = parseInt(c2.slice(1, 3), 16);
  const g2 = parseInt(c2.slice(3, 5), 16);
  const b2 = parseInt(c2.slice(5, 7), 16);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function getScoreColor(score: number): string {
  const red = '#E74C3C';
  const amber = '#F59E0B';
  const teal = '#0BBAB4';

  if (score <= 20) return red;
  if (score <= 30) return interpolateColor(red, amber, (score - 20) / 10);
  if (score <= 45) return amber;
  if (score <= 55) return interpolateColor(amber, teal, (score - 45) / 10);
  return teal;
}

export default function ScoreBar({ score }: ScoreBarProps) {
  const fillColor = getScoreColor(score);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-center mb-4">
        <div
          className="text-6xl sm:text-7xl font-bold animate-fade-in-up"
          style={{ animationDelay: '1.5s', color: fillColor }}
        >
          {score}%
        </div>
      </div>
      <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full animate-fill-bar"
          style={{
            width: `${score}%`,
            backgroundColor: fillColor,
          }}
        />
      </div>
      <div className="flex justify-between mt-1 text-sm text-gray-400">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
}
