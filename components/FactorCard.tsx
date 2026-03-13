'use client';

import { trackEvent, Events } from '@/lib/analytics';

interface FactorCardProps {
  category: string;
  classification: 'booster' | 'neutral' | 'hazard';
  message: string;
  cta: { text: string; url: string };
  delay: number;
}

const badgeConfig: Record<string, { style: string; label: string }> = {
  booster: { style: 'bg-emerald-500 text-white', label: 'Longevity Booster' },
  neutral: { style: 'bg-gray-400 text-white', label: 'Neutral' },
  hazard: { style: 'bg-red-500 text-white', label: 'Longevity Hazard' },
};

const borderStyles: Record<string, string> = {
  booster: 'border-l-emerald-500',
  neutral: 'border-l-gray-400',
  hazard: 'border-l-red-500',
};

export default function FactorCard({ category, classification, message, cta, delay }: FactorCardProps) {
  const badge = badgeConfig[classification];

  return (
    <div
      className={`bg-white rounded-xl shadow-md p-5 border-l-4 ${borderStyles[classification]} animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
        {category}
      </h3>
      <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${badge.style} mb-3`}>
        {badge.label}
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
