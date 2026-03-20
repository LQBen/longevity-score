'use client';

import { useState, useEffect, useRef } from 'react';

interface AgeInputProps {
  value: number | undefined;
  onChange: (value: number) => void;
  onClear: () => void;
}

export default function AgeInput({ value, onChange, onClear }: AgeInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayValue, setDisplayValue] = useState(value !== undefined ? String(value) : '');

  // Sync display when value changes externally (e.g. stepper buttons)
  useEffect(() => {
    if (value !== undefined) {
      setDisplayValue(String(value));
    }
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const clamp = (v: number) => Math.min(122, Math.max(18, v));

  const handleDecrement = () => {
    const next = clamp((value ?? 19) - 1);
    onChange(next);
    setDisplayValue(String(next));
  };

  const handleIncrement = () => {
    const next = clamp((value ?? 17) + 1);
    onChange(next);
    setDisplayValue(String(next));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Allow free typing — let the field be empty or any digits
    if (raw === '') {
      setDisplayValue('');
      onClear();
      return;
    }
    // Only allow digits
    if (!/^\d+$/.test(raw)) return;
    setDisplayValue(raw);
    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed) && parsed >= 18 && parsed <= 122) {
      onChange(parsed);
    } else {
      // Out of range or partial — clear the answer so Next is disabled
      onClear();
    }
  };

  const handleBlur = () => {
    // On blur, clamp to valid range if something was typed
    if (displayValue === '') return;
    const parsed = parseInt(displayValue, 10);
    if (!isNaN(parsed)) {
      const clamped = clamp(parsed);
      setDisplayValue(String(clamped));
      onChange(clamped);
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
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your age"
          className="w-48 sm:w-56 h-14 sm:h-16 text-center text-2xl sm:text-3xl font-bold text-primary bg-gray-50 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400 placeholder:text-base sm:placeholder:text-lg placeholder:font-normal"
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
    </div>
  );
}
