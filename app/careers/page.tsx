import Reveal from '../../components/ui/Reveal';
import CareersActions from '../../components/careers/CareersActions';

export default function CareersPage() {
  return (
    <div className="py-24 px-6 bg-white text-center">
      <div className="max-w-2xl mx-auto space-y-8">
        <Reveal direction="up" delay={0.1}>
          <h1 className="text-3xl md:text-5xl font-normal font-poppins">Join us. Be ASPIRE.</h1>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
            Let&apos;s make good impact to the world. Let&apos;s achieve our aspirations.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <p className="text-gray-500 max-w-lg mx-auto">
            Whatever your education background or your expertise is, we welcome your pure self to
            join us.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.4}>
          <CareersActions />
        </Reveal>
      </div>
    </div>
  );
}
