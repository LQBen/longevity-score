'use client';

import { useEffect, useRef } from 'react';

interface AgeInputProps {
  value: number | undefined;
  onChange: (value: number) => void;
}

export default function AgeInput({ value, onChange }: AgeInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus so mobile keyboard pops up
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const clamp = (v: number) => Math.min(122, Math.max(18, v));

  const handleDecrement = () => {
    onChange(clamp((value ?? 18) - 1));
  };

  const handleIncrement = () => {
    onChange(clamp((value ?? 18) + 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === '') return;
    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed)) {
      onChange(clamp(parsed));
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-4">
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Minus stepper */}
        <button
          type="button"
          onClick={handleDecrement}
          className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl border-2 border-gray-300 bg-white text-2xl sm:text-3xl font-bold text-gray-600 hover:border-primary hover:text-primary hover:bg-primary/5 active:bg-primary/10 transition-all select-none"
          aria-label="Decrease age"
        >
          &minus;
        </button>

        {/* Number input */}
        <input
          ref={inputRef}
          type="number"
          inputMode="numeric"
          min={18}
          max={122}
          value={value ?? ''}
          onChange={handleChange}
          placeholder="Enter your age"
          className="w-48 sm:w-56 h-14 sm:h-16 text-center text-2xl sm:text-3xl font-bold text-primary bg-gray-50 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400 placeholder:text-base sm:placeholder:text-lg placeholder:font-normal [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        {/* Plus stepper */}
        <button
          type="button"
          onClick={handleIncrement}
          className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl border-2 border-gray-300 bg-white text-2xl sm:text-3xl font-bold text-gray-600 hover:border-primary hover:text-primary hover:bg-primary/5 active:bg-primary/10 transition-all select-none"
          aria-label="Increase age"
        >
          +
        </button>
      </div>
      <p className="mt-3 text-sm text-gray-400">Ages 18–122</p>
    </div>
  );
}
