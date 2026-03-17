interface FactorCardProps {
  category: string;
  classification: 'booster' | 'hazard';
  message: string;
  cta: { text: string; url: string };
  delay: number;
}

const badgeConfig: Record<string, { style: string; label: string }> = {
  booster: { style: 'bg-emerald-500 text-white', label: 'Longevity Booster' },
  hazard: { style: 'bg-red-500 text-white', label: 'Longevity Hazard' },
};

const borderStyles: Record<string, string> = {
  booster: 'border-l-emerald-500',
  hazard: 'border-l-red-500',
};

export default function FactorCard({ category, classification, message, delay }: FactorCardProps) {
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
      <p className="text-base text-gray-700 leading-relaxed">
        {message}
      </p>
    </div>
  );
}
