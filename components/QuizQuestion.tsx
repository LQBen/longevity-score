'use client';

import { Question } from '@/lib/questions';
import AgeSlider from './AgeSlider';
import Tooltip from './Tooltip';

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | number | undefined;
  onAnswer: (answer: string | number) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
}

export default function QuizQuestion({
  question,
  questionNumber,
  selectedAnswer,
  onAnswer,
  onNext,
  onPrevious,
  isFirst,
}: QuizQuestionProps) {
  const handleOptionClick = (optionId: string) => {
    onAnswer(optionId);
    // Auto-advance after brief delay
    setTimeout(() => {
      onNext();
    }, 300);
  };

  const isShortOptions = question.options.length <= 3 &&
    question.options.every(o => o.text.length < 30);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Question text */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-primary leading-snug">
            {questionNumber}. {question.text}
            {question.infobox && <Tooltip text={question.infobox} />}
          </h2>
        </div>

        {/* Answer options */}
        {question.type === 'slider' ? (
          <div className="mt-8 mb-4">
            <AgeSlider
              value={typeof selectedAnswer === 'number' ? selectedAnswer : 35}
              onChange={(val) => onAnswer(val)}
            />
          </div>
        ) : (
          <div className={
            isShortOptions
              ? 'grid grid-cols-2 gap-3'
              : 'flex flex-col gap-3'
          }>
            {question.options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleOptionClick(option.id)}
                className={`w-full min-h-[48px] px-4 py-3 text-left text-base sm:text-lg rounded-xl border-2 transition-all duration-200
                  ${selectedAnswer === option.id
                    ? 'border-primary bg-primary/10 text-primary font-medium'
                    : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50 text-foreground'
                  }`}
              >
                {option.text}
              </button>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onPrevious}
            disabled={isFirst}
            className={`px-6 py-3 rounded-xl border-2 border-primary text-primary font-medium transition-colors min-h-[48px]
              ${isFirst ? 'opacity-40 cursor-not-allowed' : 'hover:bg-primary/10'}`}
          >
            ← Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={selectedAnswer === undefined}
            className={`px-6 py-3 rounded-xl font-medium transition-colors min-h-[48px]
              ${selectedAnswer !== undefined
                ? 'bg-primary text-white hover:bg-primary-dark'
                : 'bg-disabled text-white cursor-not-allowed'
              }`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
