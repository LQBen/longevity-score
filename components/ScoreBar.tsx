'use client';

interface ScoreBarProps {
  score: number;
}

export default function ScoreBar({ score }: ScoreBarProps) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-center mb-4">
        <div
          className="text-6xl sm:text-7xl font-bold animate-fade-in-up"
          style={{ animationDelay: '1.5s', color: '#0BBAB4' }}
        >
          {score}%
        </div>
      </div>
      <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full animate-fill-bar"
          style={{
            width: `${score}%`,
            backgroundColor: '#0BBAB4',
          }}
        />
      </div>
    </div>
  );
}
