'use client';

interface ScoreBarProps {
  score: number;
}

function getGradientColor(score: number): string {
  // 0-33: red, 34-50: yellow/amber, 51-100: teal
  // Smooth gradient via CSS
  if (score <= 33) {
    // Pure red tones
    return '#E74C3C';
  } else if (score <= 41) {
    // Transition red -> amber
    const t = (score - 33) / 8;
    return interpolateColor('#E74C3C', '#F59E0B', t);
  } else if (score <= 50) {
    // Amber tones
    return '#F59E0B';
  } else if (score <= 60) {
    // Transition amber -> teal
    const t = (score - 50) / 10;
    return interpolateColor('#F59E0B', '#0BBAB4', t);
  } else {
    // Teal
    return '#0BBAB4';
  }
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

function buildBarGradient(score: number): string {
  if (score <= 0) return '#E74C3C';
  const stops: string[] = [];
  // Always start with red
  stops.push('#E74C3C 0%');

  if (score <= 33) {
    // Only red fills
    stops.push('#E74C3C 100%');
  } else if (score <= 50) {
    // Red to amber
    const amberPos = ((33 / score) * 100).toFixed(0);
    stops.push(`#E74C3C ${amberPos}%`);
    stops.push('#F59E0B 100%');
  } else {
    // Red, amber, teal
    const amberPos = ((33 / score) * 100).toFixed(0);
    const tealStart = ((50 / score) * 100).toFixed(0);
    stops.push(`#E74C3C ${amberPos}%`);
    stops.push(`#F59E0B ${tealStart}%`);
    stops.push('#0BBAB4 100%');
  }
  return `linear-gradient(90deg, ${stops.join(', ')})`;
}

export default function ScoreBar({ score }: ScoreBarProps) {
  const barColor = getGradientColor(score);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-center mb-4">
        <div
          className="text-6xl sm:text-7xl font-bold animate-fade-in-up"
          style={{ animationDelay: '1.5s', color: barColor }}
        >
          {score}%
        </div>
      </div>
      <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full animate-fill-bar"
          style={{
            width: `${score}%`,
            background: buildBarGradient(score),
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
