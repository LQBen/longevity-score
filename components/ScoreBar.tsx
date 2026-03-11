'use client';

interface ScoreBarProps {
  score: number;
}

export default function ScoreBar({ score }: ScoreBarProps) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative mb-2">
        <div
          className="text-4xl sm:text-5xl font-bold text-primary text-right animate-fade-in-up"
          style={{ animationDelay: '1.5s' }}
        >
          {score}%
        </div>
      </div>
      <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full animate-fill-bar"
          style={{ width: `${score}%` }}
        />
      </div>
      <div className="flex justify-between mt-1 text-sm text-gray-400">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
}
