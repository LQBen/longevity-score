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

// Non-committal / opt-out answer texts that should appear in gray
const SOFT_OPTION_TEXTS = [
  'other',
  'other/unlisted',
  'other / prefer not to say',
  'not sure',
  'prefer not to say',
];

function isSoftOption(text: string): boolean {
  return SOFT_OPTION_TEXTS.includes(text.toLowerCase());
}

export default function QuizQuestion({
  question,
  selectedAnswer,
  onAnswer,
  onNext,
  onPrevious,
  isFirst,
}: QuizQuestionProps) {
  const handleOptionClick = (optionId: string) => {
    onAnswer(optionId);
  };

  const isShortOptions = question.options.length <= 3 &&
    question.options.every(o => o.text.length < 30);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.08)] p-7 sm:p-10">
        {/* Question text */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-primary leading-snug inline">
            {question.text}
          </h2>
          {question.infobox && <Tooltip text={question.infobox} />}
        </div>

        {/* Answer options */}
        {question.type === 'slider' ? (
          <div className="mt-8 mb-4">
            <AgeSlider
              value={typeof selectedAnswer === 'number' ? selectedAnswer : 61}
              onChange={(val) => onAnswer(val)}
            />
          </div>
        ) : (
          <div className={
            isShortOptions
              ? 'grid grid-cols-2 gap-3'
              : 'flex flex-col gap-3'
          }>
            {question.options.map((option) => {
              const soft = isSoftOption(option.text);
              const selected = selectedAnswer === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleOptionClick(option.id)}
                  className={`w-full min-h-[48px] px-5 py-3.5 text-left text-base sm:text-lg rounded-xl border-2 transition-all duration-200 cursor-pointer
                    ${selected
                      ? 'border-primary bg-primary/10 text-primary font-medium shadow-sm'
                      : soft
                        ? 'border-gray-200 hover:border-primary/30 hover:bg-gray-50 text-gray-400'
                        : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50 text-gray-700'
                    }`}
                >
                  {option.text}
                </button>
              );
            })}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          <button
            type="button"
            onClick={onPrevious}
            disabled={isFirst}
            className={`px-6 py-3 rounded-xl border-2 border-primary text-primary font-medium transition-all duration-200 min-h-[48px]
              ${isFirst ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary/10 hover:shadow-sm'}`}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={selectedAnswer === undefined}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 min-h-[48px] shadow-sm
              ${selectedAnswer !== undefined
                ? 'bg-primary text-white hover:bg-primary-dark hover:shadow-md'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
