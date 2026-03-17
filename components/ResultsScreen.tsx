'use client';

import { useEffect } from 'react';
import ScoreBar from './ScoreBar';
import FactorCard from './FactorCard';
import TierBadgeReveal from './TierBadgeReveal';
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


export default function ResultsScreen({ result, onTryAgain }: ResultsScreenProps) {
  useEffect(() => {
    trackEvent(Events.QUIZ_COMPLETED, {
      score_percentage: result.score,
      tier_name: result.tier.label,
    });
  }, [result.score, result.tier.label]);

  const handleTryAgain = () => {
    onTryAgain();
  };


  // Factors are pre-sorted by classification then maxPoints from the server
  // Desktop: boosters on left, hazards on right
  const boosterFactors = result.factors.filter(
    f => f.classification === 'booster'
  );
  const hazardFactors = result.factors.filter(
    f => f.classification === 'hazard'
  );

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
            <div className="mb-4">
              <TierBadgeReveal tierLabel={result.tier.label} />
            </div>
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
            <a
              href="https://longeviquest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-gray-300 text-gray-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors min-h-[48px] inline-flex items-center justify-center"
            >
              Visit LongeviQuest
            </a>
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
              {boosterFactors.length > 0 ? boosterFactors.map((factor, i) => (
                <FactorCard
                  key={factor.category}
                  {...factor}
                  delay={200 + i * 200}
                />
              )) : (
                <div className="bg-gray-100 rounded-xl p-6 text-base text-gray-500 text-center">None of the factors you reported classify as a Longevity Booster. See your hazards for areas to improve.</div>
              )}
            </div>
          </div>

          {/* Hazards column */}
          <div>
            <h3 className="text-lg font-bold text-red-500 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
              Longevity Hazards
            </h3>
            <div className="space-y-4">
              {hazardFactors.length > 0 ? hazardFactors.map((factor, i) => (
                <FactorCard
                  key={factor.category}
                  {...factor}
                  delay={200 + (boosterFactors.length + i) * 200}
                />
              )) : (
                <div className="bg-gray-100 rounded-xl p-6 text-base text-gray-500 text-center">None of the factors you reported classify as a Longevity Hazard. Keep it up!</div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile: single column with headers */}
        <div className="md:hidden space-y-6">
          <div>
            <h3 className="text-lg font-bold text-emerald-500 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              Longevity Boosters
            </h3>
            <div className="space-y-4">
              {boosterFactors.length > 0 ? boosterFactors.map((factor, i) => (
                <FactorCard
                  key={factor.category}
                  {...factor}
                  delay={200 + i * 150}
                />
              )) : (
                <div className="bg-gray-100 rounded-xl p-6 text-base text-gray-500 text-center">None of the factors you reported classify as a Longevity Booster. See your hazards for areas to improve.</div>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-red-500 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
              Longevity Hazards
            </h3>
            <div className="space-y-4">
              {hazardFactors.length > 0 ? hazardFactors.map((factor, i) => (
                <FactorCard
                  key={factor.category}
                  {...factor}
                  delay={200 + (boosterFactors.length + i) * 150}
                />
              )) : (
                <div className="bg-gray-100 rounded-xl p-6 text-base text-gray-500 text-center">None of the factors you reported classify as a Longevity Hazard. Keep it up!</div>
              )}
            </div>
          </div>
        </div>

        {/* Bonus factor cards — biological sex & family history */}
        {result.bonuses.length > 0 && (
          <div className="mt-10 space-y-4">
            {result.bonuses.map((bonus, i) => (
              <div
                key={bonus.category}
                className="bg-white rounded-xl shadow-md p-5 border-l-4 border-l-violet-400 animate-fade-in-up"
                style={{ animationDelay: `${400 + i * 200}ms` }}
              >
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
                  {bonus.category}
                </h3>
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-violet-100 text-violet-700 mb-3">
                  Biological Bonus
                </span>
                <p className="text-base text-gray-700 leading-relaxed">
                  {bonus.message}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Age factor callout — distinct neutral styling */}
        <div className="mt-10 bg-white rounded-xl shadow-md p-5 border-l-4 border-l-slate-400">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
            Age Factor
          </h3>
          <p className="text-base text-gray-700 leading-relaxed">
            {result.age_factor.message}
          </p>
        </div>

        {/* Bottom section */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
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
              className="px-8 py-3 border-2 border-gray-300 text-gray-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors min-h-[48px] inline-flex items-center justify-center"
            >
              Visit LongeviQuest
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
