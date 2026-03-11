'use client';

import { trackEvent, Events } from '@/lib/analytics';

interface FactorCardProps {
  category: string;
  classification: 'booster' | 'neutral' | 'hazard';
  message: string;
  cta: { text: string; url: string };
  delay: number;
}

export default function FactorCard({ category, classification, message, cta, delay }: FactorCardProps) {
  const badgeColor = classification === 'booster'
    ? 'bg-accent-green text-white'
    : classification === 'hazard'
      ? 'bg-accent-red text-white'
      : 'bg-amber-400 text-white';

  const badgeLabel = classification === 'booster'
    ? 'Longevity Booster'
    : classification === 'hazard'
      ? 'Longevity Hazard'
      : 'Neutral';

  const borderColor = classification === 'booster'
    ? 'border-l-accent-green'
    : classification === 'hazard'
      ? 'border-l-accent-red'
      : 'border-l-amber-400';

  return (
    <div
      className={`bg-white rounded-xl shadow-md p-5 border-l-4 ${borderColor} animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
        {category}
      </h3>
      <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${badgeColor} mb-3`}>
        {badgeLabel}
      </span>
      <p className="text-base text-gray-700 leading-relaxed mb-4">
        {message}
      </p>
      <a
        href={cta.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent(Events.FACTOR_CTA_CLICKED, { category })}
        className="inline-block text-sm font-medium text-white bg-primary hover:bg-primary-dark px-4 py-2 rounded-lg transition-colors"
      >
        {cta.text}
      </a>
    </div>
  );
}
