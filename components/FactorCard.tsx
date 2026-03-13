'use client';

import { trackEvent, Events } from '@/lib/analytics';

type SeverityLevel = 'major_booster' | 'minor_booster' | 'neutral' | 'minor_hazard' | 'major_hazard';

interface FactorCardProps {
  category: string;
  classification: 'booster' | 'neutral' | 'hazard';
  severity: SeverityLevel;
  severityLabel: string;
  message: string;
  cta: { text: string; url: string };
  delay: number;
}

const badgeStyles: Record<SeverityLevel, string> = {
  major_booster: 'bg-emerald-500 text-white',
  minor_booster: 'bg-emerald-300 text-emerald-900',
  neutral: 'bg-gray-400 text-white',
  minor_hazard: 'bg-amber-400 text-amber-900',
  major_hazard: 'bg-red-500 text-white',
};

const borderStyles: Record<SeverityLevel, string> = {
  major_booster: 'border-l-emerald-500',
  minor_booster: 'border-l-emerald-300',
  neutral: 'border-l-gray-400',
  minor_hazard: 'border-l-amber-400',
  major_hazard: 'border-l-red-500',
};

export default function FactorCard({ category, severity, severityLabel, message, cta, delay }: FactorCardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-5 border-l-4 ${borderStyles[severity]} animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
        {category}
      </h3>
      <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${badgeStyles[severity]} mb-3`}>
        {severityLabel}
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
