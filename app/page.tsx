import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-card-bg">
      {/* Logo */}
      <div className="pt-6 pb-4 flex justify-center">
        <img
          src="https://longeviquest.com/wp-content/uploads/2023/06/longeviquest-logo.png"
          alt="LongeviQuest"
          className="h-10 sm:h-12"
        />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
        {/* Hero illustration placeholder */}
        <div className="w-full max-w-md mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center aspect-[4/3]">
          <div className="text-center p-8">
            <svg className="w-24 h-24 mx-auto mb-4 text-primary opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="text-primary/60 text-sm font-medium">Hero illustration</p>
          </div>
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
      <footer className="px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-400 max-w-4xl mx-auto w-full">
        <span>© LongeviQuest 2026</span>
        <span className="text-center italic text-xs">
          *Longevity Score is an informational tool and not a substitute for professional medical advice.
        </span>
      </footer>
    </div>
  );
}
