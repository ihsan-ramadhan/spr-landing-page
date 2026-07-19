import { getSiteConfig } from '../../lib/content';

export default function InvestorsPage() {
  const config = getSiteConfig();

  return (
    <div className="py-24 px-6 bg-white text-center">
      <div className="max-w-md mx-auto space-y-8">
        <h1 className="text-3xl md:text-5xl font-normal font-poppins">Investors Relations</h1>
        <div className="p-8 border border-gray-100 rounded-lg bg-gray-50/50 space-y-4">
          <p className="text-xs font-normal uppercase tracking-wider text-gray-400 font-poppins">Address</p>
          <p className="text-gray-700 leading-relaxed font-normal whitespace-pre-line">{config.investorAddress || config.address}</p>
          <p className="text-xs font-normal uppercase tracking-wider text-gray-400 font-poppins pt-4">Contact</p>
          <a 
            href={`mailto:${config.email}`}
            className="inline-block text-brand-primary font-normal hover:underline"
          >
            {config.email}
          </a>
        </div>
      </div>
    </div>
  );
}
