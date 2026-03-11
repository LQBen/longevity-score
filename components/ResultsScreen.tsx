'use client';

import { useEffect } from 'react';
import ScoreBar from './ScoreBar';
import FactorCard from './FactorCard';
import { trackEvent, Events } from '@/lib/analytics';

interface Factor {
  category: string;
  classification: 'booster' | 'neutral' | 'hazard';
  message: string;
  cta: { text: string; url: string };
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

  const boosters = result.factors.filter(f => f.classification === 'booster' || f.classification === 'neutral');
  const hazards = result.factors.filter(f => f.classification === 'hazard');

  return (
    <div className="w-full">
      {/* Score reveal section */}
      <div className="bg-gradient-to-b from-primary/10 to-white pt-8 pb-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
            Your Longevity Score
          </h1>

          <ScoreBar score={result.score} />

          <div className="mt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-3">
              {result.tier.label}
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              {result.tier.message}
            </p>
          </div>

          {/* Bonus badges */}
          {result.bonuses.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {result.bonuses.map((bonus) => (
                <div
                  key={bonus.category}
                  className="inline-flex items-center bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full"
                >
                  +{bonus.points} biological advantage ({bonus.category.toLowerCase().replace(' longevity advantage', '')})
                </div>
              ))}
            </div>
          )}

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Boosters column */}
          <div>
            <h3 className="text-lg font-bold text-accent-green mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent-green inline-block" />
              Longevity Boosters
            </h3>
            <div className="space-y-4">
              {boosters.map((factor, i) => (
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
            <h3 className="text-lg font-bold text-accent-red mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent-red inline-block" />
              Longevity Hazards
            </h3>
            <div className="space-y-4">
              {hazards.map((factor, i) => (
                <FactorCard
                  key={factor.category}
                  {...factor}
                  delay={200 + (boosters.length + i) * 200}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bonus detail cards */}
        {result.bonuses.length > 0 && (
          <div className="mt-10">
            <h3 className="text-lg font-bold text-primary mb-4">Biological Advantages</h3>
            <div className="space-y-4">
              {result.bonuses.map((bonus) => (
                <div key={bonus.category} className="bg-white rounded-xl shadow-md p-5 border-l-4 border-l-primary">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
                    {bonus.category}
                  </h4>
                  <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary text-white mb-3">
                    +{bonus.points} Bonus
                  </span>
                  <p className="text-base text-gray-700 leading-relaxed">{bonus.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

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
          <p className="text-sm text-gray-500 italic">
            *Longevity Score is an informational tool and not a substitute for professional medical advice.
          </p>
          <p className="text-sm text-gray-400">© LongeviQuest 2026</p>
          <a
            href="https://longeviquest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            longeviquest.com
          </a>
        </div>
      </div>
    </div>
  );
}
