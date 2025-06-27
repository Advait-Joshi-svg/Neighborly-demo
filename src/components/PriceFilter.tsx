// components/PriceFilter.tsx
'use client';

interface PriceFilterProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

export default function PriceFilter({ value, onChange, isLoading }: PriceFilterProps) {
  return (
    <div>
      <label className="block mb-2 font-medium text-gray-700">Max Rent ($):</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={onChange}
          placeholder="e.g. 1500"
          className="p-3 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 pr-10"
        />
        {isLoading && (
          <div className="absolute right-3 top-3.5 w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        )}
      </div>
    </div>
  );
}