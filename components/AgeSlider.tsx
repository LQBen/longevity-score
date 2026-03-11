'use client';

interface AgeSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function AgeSlider({ value, onChange }: AgeSliderProps) {
  return (
    <div className="w-full px-2 py-4">
      <div className="relative mb-2">
        <div
          className="absolute -top-10 transform -translate-x-1/2 bg-primary text-white text-lg font-bold px-3 py-1 rounded-lg shadow"
          style={{ left: `${(value / 122) * 100}%` }}
        >
          {value}
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={122}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 cursor-pointer"
      />
      <div className="flex justify-between mt-2 text-sm text-gray-500">
        <span>0</span>
        <span>122</span>
      </div>
    </div>
  );
}
