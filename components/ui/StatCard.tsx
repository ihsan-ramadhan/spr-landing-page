interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
}

export default function StatCard({ label, value, unit }: StatCardProps) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 flex flex-col justify-between">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
      <div className="mt-4 flex items-baseline">
        <span className="text-3xl font-bold text-brand-primary">{value}</span>
        {unit && <span className="text-lg font-semibold text-gray-500 ml-1">{unit}</span>}
      </div>
    </div>
  );
}
