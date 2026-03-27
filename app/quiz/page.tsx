'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { questions } from '@/lib/questions';
import { trackEvent, Events } from '@/lib/analytics';
import ProgressBar from '@/components/ProgressBar';
import QuizQuestion from '@/components/QuizQuestion';
import ScoreCalculating from '@/components/ScoreCalculating';
import ResultsScreen, { ScoreResult } from '@/components/ResultsScreen';

type Screen = 'quiz' | 'calculating' | 'results';

export default function QuizPage() {
  const [screen, setScreen] = useState<Screen>('quiz');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const resultRef = useRef<ScoreResult | null>(null);
  const answersRef = useRef(answers);
  answersRef.current = answers;

  useEffect(() => {
    trackEvent(Events.QUIZ_STARTED);
  }, []);

  const totalQuestions = questions.length;

  // No default age value — user must type their age

  const fetchResults = useCallback(async () => {
    // Show calculating animation immediately
    setScreen('calculating');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: answersRef.current }),
      });
      const data = await res.json();
      resultRef.current = data;
      setResult(data);
    } catch (err) {
      console.error('Error fetching score:', err);
      alert('Something went wrong calculating your score. Please try again.');
      setScreen('quiz');
    }
  }, []);

  const advanceQuestion = useCallback(() => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      fetchResults();
    }
  }, [currentQuestion, totalQuestions, fetchResults]);

  const handleAnswer = (answer: string | number) => {
    const q = questions[currentQuestion];
    setAnswers(prev => ({ ...prev, [q.id]: answer }));

    trackEvent(Events.QUESTION_ANSWERED, {
      question_number: currentQuestion + 1,
      question_name: q.id,
      answer: typeof answer === 'number' ? String(answer) : q.options.find(o => o.id === answer)?.text || answer,
    });

    // Auto-advance for non-slider questions with smooth transition
    if (q.type !== 'slider') {
      setTransitioning(true);
      setTimeout(() => {
        advanceQuestion();
        setTimeout(() => setTransitioning(false), 50);
      }, 150);
    }
  };

  const handleNext = () => {
    advanceQuestion();
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleClearAnswer = () => {
    const q = questions[currentQuestion];
    setAnswers(prev => {
      const next = { ...prev };
      delete next[q.id];
      return next;
    });
  };

  const handleCalculatingComplete = useCallback(() => {
    if (resultRef.current) {
      setScreen('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleTryAgain = () => {
    setScreen('quiz');
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    resultRef.current = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Progress calculation: use currentQuestion + 1 so Q1 shows ~5%
  const progressCurrent = currentQuestion + 1;

  return (
    <div className="min-h-screen flex flex-col bg-card-bg">
      {/* Logo (hidden on results — ResultsScreen has its own) */}
      {screen !== 'results' && (
        <div className="pt-4 pb-3 flex justify-center">
          <a href="/">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/longeviquest-logo-1600.png`}
              alt="LongeviQuest"
              className="h-8 sm:h-10"
            />
          </a>
        </div>
      )}

      {/* Progress bar — only shown during quiz questions */}
      {screen === 'quiz' && (
        <div className="px-4">
          <ProgressBar current={progressCurrent} total={totalQuestions} />
        </div>
      )}

      {/* Content */}
      <main className="flex-1 px-4 py-6">
        {screen === 'quiz' && (
          <div
            className={`transition-opacity duration-150 ${transitioning ? 'opacity-0' : 'opacity-100'}`}
          >
            <QuizQuestion
              question={questions[currentQuestion]}
              questionNumber={currentQuestion + 1}
              totalQuestions={totalQuestions}
              selectedAnswer={answers[questions[currentQuestion].id]}
              onAnswer={handleAnswer}
              onClearAnswer={handleClearAnswer}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isFirst={currentQuestion === 0}
            />
          </div>
        )}

        {screen === 'calculating' && (
          <ScoreCalculating onComplete={handleCalculatingComplete} />
        )}

        {screen === 'results' && result && (
          <ResultsScreen result={result} onTryAgain={handleTryAgain} />
        )}
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
