'use client';

import { useState, useEffect, useCallback } from 'react';
import { questions } from '@/lib/questions';
import { trackEvent, Events } from '@/lib/analytics';
import ProgressBar from '@/components/ProgressBar';
import QuizQuestion from '@/components/QuizQuestion';
import EmailCapture from '@/components/EmailCapture';
import ResultsScreen, { ScoreResult } from '@/components/ResultsScreen';

type Screen = 'quiz' | 'email' | 'results';

export default function QuizPage() {
  const [screen, setScreen] = useState<Screen>('quiz');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    trackEvent(Events.QUIZ_STARTED);
  }, []);

  const totalQuestions = questions.length;

  // Set default age value when reaching the age slider
  useEffect(() => {
    const q = questions[currentQuestion];
    if (q && q.type === 'slider' && answers[q.id] === undefined) {
      setAnswers(prev => ({ ...prev, [q.id]: 61 }));
    }
  }, [currentQuestion, answers]);

  const advanceQuestion = useCallback(() => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setScreen('email');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentQuestion, totalQuestions]);

  const handleAnswer = (answer: string | number) => {
    const q = questions[currentQuestion];
    setAnswers(prev => ({ ...prev, [q.id]: answer }));

    trackEvent(Events.QUESTION_ANSWERED, {
      question_number: currentQuestion + 1,
      question_category: q.category,
      answer_text: typeof answer === 'number' ? String(answer) : q.options.find(o => o.id === answer)?.text || answer,
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

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      setResult(data);
      setScreen('results');
    } catch (err) {
      console.error('Error fetching score:', err);
      alert('Something went wrong calculating your score. Please try again.');
    } finally {
      setLoading(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailSubmit = () => {
    fetchResults();
  };

  const handleEmailSkip = () => {
    fetchResults();
  };

  const handleTryAgain = () => {
    setScreen('quiz');
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Progress calculation: use currentQuestion + 1 so Q1 shows ~5%
  const progressCurrent = screen === 'email' || screen === 'results'
    ? totalQuestions
    : currentQuestion + 1;

  return (
    <div className="min-h-screen flex flex-col bg-card-bg">
      {/* Logo (hidden on results — ResultsScreen has its own) */}
      {screen !== 'results' && (
        <div className="pt-4 pb-3 flex justify-center">
          <a href="/">
            <img
              src="/longeviquest-logo-1600.png"
              alt="LongeviQuest"
              className="h-8 sm:h-10"
            />
          </a>
        </div>
      )}

      {/* Progress bar */}
      {screen !== 'results' && (
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
              onNext={handleNext}
              onPrevious={handlePrevious}
              isFirst={currentQuestion === 0}
            />
          </div>
        )}

        {screen === 'email' && !loading && (
          <EmailCapture
            onSubmit={handleEmailSubmit}
            onSkip={handleEmailSkip}
          />
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-lg text-gray-600">Calculating your Longevity Score...</p>
          </div>
        )}

        {screen === 'results' && result && (
          <ResultsScreen result={result} onTryAgain={handleTryAgain} />
        )}
      </main>
    </div>
  );
}
