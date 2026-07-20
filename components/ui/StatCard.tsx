'use client';

import { useCountUp } from '../../hooks/useCountUp';

interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  index?: number;
}

export default function StatCard({ label, value, unit, index = 0 }: StatCardProps) {
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const isNumeric = !isNaN(numericValue);
  const delay = 0.15 + index * 0.08;

  const countUpRef = useCountUp({
    value: numericValue,
    duration: 2,
    delay,
    start: 'top 85%',
    disabled: !isNumeric,
  });

  return (
    <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 flex flex-col justify-between hover:border-gray-300 hover:shadow-sm transition-all duration-300 group">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider group-hover:text-gray-500 transition-colors">
        {label}
      </span>
      <div className="mt-4 flex items-baseline">
        {isNumeric ? (
          <span
            ref={countUpRef}
            className="text-3xl font-bold text-brand-primary tabular-nums"
          />
        ) : (
          <span className="text-3xl font-bold text-brand-primary">{value}</span>
        )}
        {unit && <span className="text-lg font-semibold text-gray-500 ml-1">{unit}</span>}
      </div>
    </div>
  );
}
