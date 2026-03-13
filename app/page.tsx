import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-card-bg">
      {/* Logo */}
      <div className="pt-6 pb-4 flex justify-center">
        <a href="https://longeviquest.com" target="_blank" rel="noopener noreferrer">
          <Image
            src="/longeviquest-logo-1600.png"
            alt="LongeviQuest"
            width={200}
            height={48}
            className="h-10 sm:h-12 w-auto"
            priority
          />
        </a>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
        {/* Hero illustration — Lifestyle Assessment Flow */}
        <div className="w-full max-w-lg mb-8 flex items-center justify-center">
          <svg viewBox="0 0 520 280" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            {/* Left side — lifestyle factor labels */}
            <g>
              <rect x="8" y="20" rx="14" ry="14" width="108" height="28" fill="#0BBAB4" opacity="0.12" />
              <text x="62" y="39" textAnchor="middle" fill="#0BBAB4" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">Sleep</text>

              <rect x="8" y="58" rx="14" ry="14" width="108" height="28" fill="#0BBAB4" opacity="0.12" />
              <text x="62" y="77" textAnchor="middle" fill="#0BBAB4" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">Diet</text>

              <rect x="8" y="96" rx="14" ry="14" width="108" height="28" fill="#0BBAB4" opacity="0.12" />
              <text x="62" y="115" textAnchor="middle" fill="#0BBAB4" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">Stress</text>

              <rect x="8" y="134" rx="14" ry="14" width="108" height="28" fill="#0BBAB4" opacity="0.12" />
              <text x="62" y="153" textAnchor="middle" fill="#0BBAB4" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">Physical Activity</text>

              <rect x="8" y="172" rx="14" ry="14" width="108" height="28" fill="#0BBAB4" opacity="0.12" />
              <text x="62" y="191" textAnchor="middle" fill="#0BBAB4" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">Social Connection</text>

              <rect x="8" y="210" rx="14" ry="14" width="108" height="28" fill="#0BBAB4" opacity="0.12" />
              <text x="62" y="229" textAnchor="middle" fill="#0BBAB4" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">Smoking</text>

              <rect x="8" y="248" rx="14" ry="14" width="108" height="28" fill="#0BBAB4" opacity="0.12" />
              <text x="62" y="267" textAnchor="middle" fill="#0BBAB4" fontSize="10.5" fontWeight="600" fontFamily="system-ui, sans-serif">+ 8 more</text>
            </g>

            {/* Flow lines — left to center */}
            <g stroke="#0BBAB4" strokeWidth="1.5" fill="none" opacity="0.3">
              <path d="M116 34 Q160 34 185 100" />
              <path d="M116 72 Q155 72 185 110" />
              <path d="M116 110 Q150 110 185 125" />
              <path d="M116 148 Q155 148 185 140" />
              <path d="M116 186 Q155 180 185 155" />
              <path d="M116 224 Q160 210 185 168" />
              <path d="M116 262 Q160 245 185 178" />
            </g>

            {/* Animated flow dots — left side */}
            <circle r="3" fill="#0BBAB4" opacity="0.6">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M116 34 Q160 34 185 100" />
            </circle>
            <circle r="3" fill="#0BBAB4" opacity="0.6">
              <animateMotion dur="2.8s" repeatCount="indefinite" path="M116 110 Q150 110 185 125" begin="0.4s" />
            </circle>
            <circle r="3" fill="#0BBAB4" opacity="0.6">
              <animateMotion dur="2.6s" repeatCount="indefinite" path="M116 186 Q155 180 185 155" begin="0.8s" />
            </circle>

            {/* Center — Assessment element */}
            <g>
              {/* Main card shape */}
              <rect x="185" y="60" rx="16" ry="16" width="150" height="160" fill="white" stroke="#0BBAB4" strokeWidth="2.5" />

              {/* LQ icon/brand mark */}
              <circle cx="260" cy="104" r="28" fill="#0BBAB4" opacity="0.1" />
              <text x="260" y="100" textAnchor="middle" fill="#0BBAB4" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">Longevity</text>
              <text x="260" y="114" textAnchor="middle" fill="#0BBAB4" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">Score</text>

              {/* Assessment lines / gauge */}
              <rect x="210" y="134" rx="4" ry="4" width="100" height="8" fill="#0BBAB4" opacity="0.1" />
              <rect x="210" y="134" rx="4" ry="4" width="68" height="8" fill="#0BBAB4" opacity="0.35" />

              <rect x="210" y="150" rx="4" ry="4" width="100" height="8" fill="#0BBAB4" opacity="0.1" />
              <rect x="210" y="150" rx="4" ry="4" width="85" height="8" fill="#0BBAB4" opacity="0.35" />

              <rect x="210" y="166" rx="4" ry="4" width="100" height="8" fill="#0BBAB4" opacity="0.1" />
              <rect x="210" y="166" rx="4" ry="4" width="42" height="8" fill="#0BBAB4" opacity="0.35" />

              <rect x="210" y="182" rx="4" ry="4" width="100" height="8" fill="#0BBAB4" opacity="0.1" />
              <rect x="210" y="182" rx="4" ry="4" width="93" height="8" fill="#0BBAB4" opacity="0.35" />

              <rect x="210" y="198" rx="4" ry="4" width="100" height="8" fill="#0BBAB4" opacity="0.1" />
              <rect x="210" y="198" rx="4" ry="4" width="30" height="8" fill="#0BBAB4" opacity="0.35" />
            </g>

            {/* Flow lines — center to right */}
            <g stroke="#0BBAB4" strokeWidth="1.5" fill="none" opacity="0.3">
              <path d="M335 110 Q365 100 388 82" />
              <path d="M335 130 Q360 120 388 112" />
              <path d="M335 150 Q370 155 388 170" />
              <path d="M335 170 Q365 180 388 200" />
            </g>

            {/* Animated flow dots — right side */}
            <circle r="3" fill="#22c55e" opacity="0.7">
              <animateMotion dur="2s" repeatCount="indefinite" path="M335 110 Q365 100 388 82" begin="1.2s" />
            </circle>
            <circle r="3" fill="#ef4444" opacity="0.7">
              <animateMotion dur="2.2s" repeatCount="indefinite" path="M335 170 Q365 180 388 200" begin="1.6s" />
            </circle>

            {/* Right side — result labels */}
            <g>
              {/* Booster results */}
              <rect x="388" y="62" rx="14" ry="14" width="126" height="28" fill="#22c55e" fillOpacity="0.12" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.3" />
              <circle cx="402" cy="76" r="5" fill="#22c55e" opacity="0.5" />
              <text x="462" y="81" textAnchor="middle" fill="#22c55e" fontSize="10.5" fontWeight="700" fontFamily="system-ui, sans-serif">Longevity Booster</text>

              <rect x="388" y="98" rx="14" ry="14" width="126" height="28" fill="#22c55e" fillOpacity="0.12" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.3" />
              <circle cx="402" cy="112" r="5" fill="#22c55e" opacity="0.5" />
              <text x="462" y="117" textAnchor="middle" fill="#22c55e" fontSize="10.5" fontWeight="700" fontFamily="system-ui, sans-serif">Longevity Booster</text>

              {/* Hazard results */}
              <rect x="388" y="158" rx="14" ry="14" width="126" height="28" fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" strokeWidth="1" strokeOpacity="0.3" />
              <circle cx="402" cy="172" r="5" fill="#ef4444" opacity="0.5" />
              <text x="462" y="177" textAnchor="middle" fill="#ef4444" fontSize="10.5" fontWeight="700" fontFamily="system-ui, sans-serif">Longevity Hazard</text>

              <rect x="388" y="194" rx="14" ry="14" width="126" height="28" fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" strokeWidth="1" strokeOpacity="0.3" />
              <circle cx="402" cy="208" r="5" fill="#ef4444" opacity="0.5" />
              <text x="462" y="213" textAnchor="middle" fill="#ef4444" fontSize="10.5" fontWeight="700" fontFamily="system-ui, sans-serif">Longevity Hazard</text>
            </g>
          </svg>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground text-center mb-3">
          What&apos;s Your Longevity Score?
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-md mb-8">
          Discover how your lifestyle compares to the world&apos;s longest-lived people.
        </p>

        <Link
          href="/quiz"
          className="inline-flex items-center justify-center px-12 py-4 bg-primary text-white text-xl font-bold rounded-xl hover:bg-primary-dark transition-colors min-h-[56px] shadow-lg hover:shadow-xl"
        >
          START
        </Link>
      </main>

      {/* Footer */}
      <footer className="px-4 py-4 flex flex-col items-center gap-2 text-sm text-gray-400 max-w-4xl mx-auto w-full">
        <span className="text-center text-[13px] text-gray-500">
          Longevity Score is an informational tool and not a substitute for professional medical advice.
        </span>
        <span className="self-end">&copy; LongeviQuest 2026</span>
      </footer>
    </div>
  );
}
