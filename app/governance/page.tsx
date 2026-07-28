import Reveal from '../../components/ui/Reveal';
import Image from 'next/image';

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
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-normal font-poppins text-gray-900 text-center mb-8">
              Corporate Governance Structure
            </h2>
            <div className="relative w-full aspect-2188/1360">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/61cdb78e5104297f40ace0af/19b2dbd5-de16-4edb-863a-49566c386d68/ASPIRE-governance-structure.png"
                alt="Corporate Governance Structure"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
