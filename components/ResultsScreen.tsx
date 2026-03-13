'use client';

import { useEffect } from 'react';
import ScoreBar from './ScoreBar';
import FactorCard from './FactorCard';
import { trackEvent, Events } from '@/lib/analytics';

interface Factor {
  category: string;
  classification: 'booster' | 'hazard';
  message: string;
  cta: { text: string; url: string };
  points: number;
  maxPoints: number;
}

interface Bonus {
  category: string;
  points: number;
  message: string;
}

export interface ScoreResult {
  score: number;
  tier: { label: string; message: string };
  bonuses: Bonus[];
  factors: Factor[];
  age_factor: { age: number; message: string };
}

interface ResultsScreenProps {
  result: ScoreResult;
  onTryAgain: () => void;
}

const tierBadgeStyles: Record<string, string> = {
  'Longevity Champion': 'bg-amber-400 text-amber-900 border-2 border-amber-500',
  'Longevity Optimized': 'bg-primary/15 text-primary border-2 border-primary',
  'Longevity Inclined': 'bg-emerald-100 text-emerald-700 border-2 border-emerald-400',
  'Longevity Enabled': 'bg-amber-100 text-amber-700 border-2 border-amber-400',
  'Longevity Challenged': 'bg-orange-100 text-orange-700 border-2 border-orange-400',
  'Longevity Warning': 'bg-red-100 text-red-700 border-2 border-red-400',
};

export default function ResultsScreen({ result, onTryAgain }: ResultsScreenProps) {
  useEffect(() => {
    trackEvent(Events.QUIZ_COMPLETED, {
      score_percentage: result.score,
      tier_label: result.tier.label,
    });
  }, [result.score, result.tier.label]);

  const handleTryAgain = () => {
    trackEvent(Events.TRY_AGAIN_CLICKED);
    onTryAgain();
  };

  const handleShare = async () => {
    const shareData = {
      title: "What's Your Longevity Score?",
      text: `I scored ${result.score}% on the Longevity Score quiz — ${result.tier.label}! Find out how your lifestyle compares to the world's longest-lived people.`,
      url: window.location.origin,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled sharing
      }
    } else {
      await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      alert('Link copied to clipboard!');
    }
  };

  // Factors are pre-sorted by classification then maxPoints from the server
  // Desktop: boosters on left, hazards on right
  const boosterFactors = result.factors.filter(
    f => f.classification === 'booster'
  );
  const hazardFactors = result.factors.filter(
    f => f.classification === 'hazard'
  );

  const badgeStyle = tierBadgeStyles[result.tier.label] || 'bg-gray-100 text-gray-700 border-2 border-gray-300';

  return (
    <div className="w-full">
      {/* Logo */}
      <div className="pt-4 pb-3 flex justify-center">
        <a href="/">
          <img
            src="/longeviquest-logo-1600.png"
            alt="LongeviQuest"
            className="h-8 sm:h-10"
          />
        </a>
      </div>

      {/* Score reveal section */}
      <div className="bg-gradient-to-b from-primary/10 to-white pt-8 pb-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
            Your Longevity Score
          </h1>

          <ScoreBar score={result.score} />

          <div className="mt-8">
            <span className={`inline-block text-lg sm:text-xl font-bold px-6 py-2 rounded-full ${badgeStyle} mb-4`}>
              {result.tier.label}
            </span>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto text-center">
              {result.tier.message}
            </p>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <button
              type="button"
              onClick={handleTryAgain}
              className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary/10 transition-colors min-h-[48px]"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors min-h-[48px]"
            >
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Factor breakdown */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Desktop: two columns */}
        <div className="hidden md:grid grid-cols-2 gap-8">
          {/* Boosters column */}
          <div>
            <h3 className="text-lg font-bold text-emerald-500 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              Longevity Boosters
            </h3>
            <div className="space-y-4">
              {boosterFactors.map((factor, i) => (
                <FactorCard
                  key={factor.category}
                  {...factor}
                  delay={200 + i * 200}
                />
              ))}
            </div>
          </div>

          {/* Hazards column */}
          <div>
            <h3 className="text-lg font-bold text-red-500 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
              Longevity Hazards
            </h3>
            <div className="space-y-4">
              {hazardFactors.map((factor, i) => (
                <FactorCard
                  key={factor.category}
                  {...factor}
                  delay={200 + (boosterFactors.length + i) * 200}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: single column, sorted by classification */}
        <div className="md:hidden space-y-4">
          {result.factors.map((factor, i) => (
            <FactorCard
              key={factor.category}
              {...factor}
              delay={200 + i * 150}
            />
          ))}
        </div>

        {/* Age factor callout */}
        <div className="mt-10 bg-card-bg rounded-xl p-6 border border-gray-200">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
            Age Factor
          </h3>
          <p className="text-base text-gray-700 leading-relaxed">
            {result.age_factor.message}
          </p>
        </div>

        {/* Bottom section */}
        <div className="mt-12 text-center space-y-4">
          <button
            type="button"
            onClick={handleTryAgain}
            className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary/10 transition-colors min-h-[48px]"
          >
            Try Again
          </button>
          <a
            href="https://longeviquest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-primary hover:underline"
          >
            longeviquest.com
          </a>
        </div>

      </div>
    </div>
  );
}
