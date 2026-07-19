import { getAboutContent } from '../../lib/content';
import Timeline from '../../components/ui/Timeline';

export default function AboutPage() {
  const content = getAboutContent();

  return (
    <div className="bg-white">
      <section className="relative min-h-[50vh] bg-brand-black flex items-end py-20 px-6 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/images/backgrounds/about-purpose.webp')" }}>
        <div className="max-w-[90%] mx-auto w-full">
          <h2 className="text-white text-lg font-normal uppercase tracking-wider mb-2 font-poppins">Our Purpose</h2>
          <h1 className="text-white text-3xl md:text-5xl font-normal max-w-4xl leading-tight font-poppins">
            Let&rsquo;s build our nations through our pure and renewable journey together.
          </h1>
        </div>
      </section>

      <section className="py-24 px-6 bg-white border-b border-gray-100">
        <div className="max-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <h2 className="text-3xl md:text-4xl font-normal text-gray-900 font-poppins leading-tight max-w-md">
            PT Anugerah Surya Pacific Resources (ASPIRE)
          </h2>
          <div className="space-y-6 text-gray-600 leading-relaxed text-sm md:text-base">
            {content.intro?.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
            <p className="font-normal text-gray-900 pt-2">
              ASPIRE&rsquo;s most valuable assets are the aspirations of our people.
            </p>
          </div>
        </div>
      </section>

      {/* Headline banner */}
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-[90%] mx-auto">
          <h2 className="text-3xl md:text-5xl font-normal text-gray-900 font-poppins">
            Our pure and renewable journey together.
          </h2>
        </div>
      </section>

      {/* Purpose, Vision & Values Section */}
      <section className="py-16 px-6 bg-white space-y-24">
        <div className="max-w-[90%] mx-auto space-y-24">
          {/* Purpose */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start border-t border-gray-100 pt-12">
            <div>
              <p className="text-xs font-normal uppercase tracking-wider text-gray-400 mb-2">Our Purpose</p>
              <h3 className="text-2xl md:text-3xl font-normal text-gray-500 font-poppins max-w-md leading-tight">
                Let&rsquo;s build our nations through our pure and renewable green nickel production
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base italic pt-6 md:pt-8">
              &ldquo;{content.purpose.body}&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start border-t border-gray-100 pt-12">
            <div>
              <p className="text-xs font-normal uppercase tracking-wider text-gray-400 mb-2">Our Vision</p>
              <h3 className="text-2xl md:text-3xl font-normal text-gray-500 font-poppins max-w-md leading-tight">
                Let&rsquo;s become world-class green nickel producer with supreme commitment and determination
              </h3>
            </div>
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base italic pt-6 md:pt-8">
              <p>&ldquo;Our present vision is to be the national leader in nickel mining and processing with supreme commitment to ethical and social and environmental responsibilities.</p>
              <p>Our determination is to productively enrich and nourish the quality of lives of our people and natural resources through eternal improvement of our efficient operational excellence.&rdquo;</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start border-t border-gray-100 pt-12">
            <div>
              <p className="text-xs font-normal uppercase tracking-wider text-gray-400 mb-2">Our Values</p>
              <h3 className="text-2xl md:text-3xl font-normal text-gray-500 font-poppins max-w-md leading-tight">
                Let&rsquo;s commit ourselves and let&rsquo;s start now.
              </h3>
            </div>
            <div className="space-y-6 pt-6 md:pt-8">
              <p className="text-sm text-gray-500 font-normal italic">Our commitment is to value:</p>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base italic">
                {content.values.body.map((value, idx) => (
                  <p key={idx}>{value}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-[90%] mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-normal text-gray-900 font-poppins">
              Our History, Our Present and Our Future
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <Timeline items={content.timeline} />
          </div>
        </div>
      </section>
    </div>
  );
}
