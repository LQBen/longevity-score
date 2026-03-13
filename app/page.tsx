import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-card-bg">
      {/* Logo */}
      <div className="pt-6 pb-4 flex justify-center">
        <Image
          src="/longeviquest-logo-1600.png"
          alt="LongeviQuest"
          width={200}
          height={48}
          className="h-10 sm:h-12 w-auto"
          priority
        />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
        {/* Hero illustration — Tree of Life */}
        <div className="w-full max-w-md mb-8 flex items-center justify-center">
          <svg viewBox="0 0 400 300" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            {/* Ground */}
            <ellipse cx="200" cy="280" rx="140" ry="12" fill="#0BBAB4" opacity="0.1" />

            {/* Roots */}
            <path d="M200 280 Q170 290 140 285" stroke="#0BBAB4" strokeWidth="3" fill="none" opacity="0.4" />
            <path d="M200 280 Q230 292 260 285" stroke="#0BBAB4" strokeWidth="3" fill="none" opacity="0.4" />
            <path d="M200 280 Q180 295 155 290" stroke="#0BBAB4" strokeWidth="2" fill="none" opacity="0.3" />
            <path d="M200 280 Q220 295 245 290" stroke="#0BBAB4" strokeWidth="2" fill="none" opacity="0.3" />

            {/* Trunk */}
            <path d="M192 280 Q188 240 185 200 Q183 170 190 150" stroke="#0BBAB4" strokeWidth="4" fill="none" opacity="0.6" />
            <path d="M208 280 Q212 240 215 200 Q217 170 210 150" stroke="#0BBAB4" strokeWidth="4" fill="none" opacity="0.6" />

            {/* Main branches */}
            <path d="M195 180 Q160 150 130 120" stroke="#0BBAB4" strokeWidth="3" fill="none" opacity="0.5" />
            <path d="M205 180 Q240 150 270 120" stroke="#0BBAB4" strokeWidth="3" fill="none" opacity="0.5" />
            <path d="M200 160 Q200 130 200 100" stroke="#0BBAB4" strokeWidth="3" fill="none" opacity="0.5" />
            <path d="M195 170 Q170 160 145 155" stroke="#0BBAB4" strokeWidth="2.5" fill="none" opacity="0.45" />
            <path d="M205 170 Q230 160 255 155" stroke="#0BBAB4" strokeWidth="2.5" fill="none" opacity="0.45" />

            {/* Sub-branches */}
            <path d="M130 120 Q115 100 105 80" stroke="#0BBAB4" strokeWidth="2" fill="none" opacity="0.4" />
            <path d="M130 120 Q140 100 145 80" stroke="#0BBAB4" strokeWidth="2" fill="none" opacity="0.4" />
            <path d="M270 120 Q285 100 295 80" stroke="#0BBAB4" strokeWidth="2" fill="none" opacity="0.4" />
            <path d="M270 120 Q260 100 255 80" stroke="#0BBAB4" strokeWidth="2" fill="none" opacity="0.4" />

            {/* Leaf clusters — large */}
            <circle cx="105" cy="72" r="22" fill="#0BBAB4" opacity="0.18" />
            <circle cx="145" cy="72" r="20" fill="#0BBAB4" opacity="0.2" />
            <circle cx="125" cy="55" r="24" fill="#0BBAB4" opacity="0.15" />
            <circle cx="200" cy="70" r="26" fill="#0BBAB4" opacity="0.2" />
            <circle cx="200" cy="45" r="22" fill="#0BBAB4" opacity="0.15" />
            <circle cx="255" cy="72" r="20" fill="#0BBAB4" opacity="0.2" />
            <circle cx="295" cy="72" r="22" fill="#0BBAB4" opacity="0.18" />
            <circle cx="275" cy="55" r="24" fill="#0BBAB4" opacity="0.15" />

            {/* Leaf clusters — medium */}
            <circle cx="145" cy="148" r="16" fill="#0BBAB4" opacity="0.18" />
            <circle cx="255" cy="148" r="16" fill="#0BBAB4" opacity="0.18" />
            <circle cx="160" cy="105" r="18" fill="#0BBAB4" opacity="0.16" />
            <circle cx="240" cy="105" r="18" fill="#0BBAB4" opacity="0.16" />

            {/* Accent dots — life markers */}
            <circle cx="120" cy="60" r="4" fill="#0BBAB4" opacity="0.5" />
            <circle cx="140" cy="50" r="3" fill="#0BBAB4" opacity="0.6" />
            <circle cx="200" cy="55" r="4.5" fill="#0BBAB4" opacity="0.55" />
            <circle cx="260" cy="60" r="4" fill="#0BBAB4" opacity="0.5" />
            <circle cx="280" cy="50" r="3" fill="#0BBAB4" opacity="0.6" />
            <circle cx="170" cy="95" r="3" fill="#0BBAB4" opacity="0.45" />
            <circle cx="230" cy="95" r="3" fill="#0BBAB4" opacity="0.45" />
            <circle cx="200" cy="38" r="3.5" fill="#0BBAB4" opacity="0.5" />

            {/* Winding path */}
            <path d="M100 278 Q130 270 160 275 Q190 280 220 273 Q250 266 280 272 Q300 276 310 278"
                  stroke="#0BBAB4" strokeWidth="2" fill="none" opacity="0.25" strokeDasharray="4 4" />
          </svg>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-3">
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
        <span className="text-center italic text-xs">
          Longevity Score is an informational tool and not a substitute for professional medical advice.
        </span>
        <span className="self-end">&copy; LongeviQuest 2026</span>
      </footer>
    </div>
  );
}
