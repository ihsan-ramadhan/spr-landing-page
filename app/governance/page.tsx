import Reveal from '../../components/ui/Reveal';

export default function GovernancePage() {
  return (
    <div className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto space-y-12">
        <Reveal direction="up" delay={0.1}>
          <h1 className="text-3xl md:text-5xl font-normal font-poppins text-center">
            Corporate Governance
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 leading-relaxed text-center">
              In order to achieve our purpose and goals, ASPIREstargate has the utmost sincere
              commitment to keep improving our corporate governance on an ongoing basis as it is the
              foundation for ensuring management with transparency, efficiency, accountability,
              responsibility, independency, fairness and equality.
            </p>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <div className="max-w-4xl mx-auto border border-gray-200 p-12 rounded-lg bg-gray-50 flex flex-col items-center justify-center min-h-100 hover:border-gray-300 transition-colors duration-300">
            <span className="text-gray-400 font-normal font-poppins mb-2">
              Corporate Governance Structure
            </span>
            <span className="text-xs text-gray-400 max-w-md leading-relaxed">
              This space is reserved for the corporate organizational structure diagram. Re-host the
              SVG/PNG export here.
            </span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
