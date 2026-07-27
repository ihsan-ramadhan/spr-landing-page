import { getAboutContent } from '../../lib/content';
import Timeline from '../../components/ui/Timeline';
import Reveal from '../../components/ui/Reveal';
import ParallaxBackground from '../../components/ui/ParallaxBackground';

export default function AboutPage() {
  const content = getAboutContent();

  return (
    <div className="bg-white">
      <link
        rel="preload"
        as="image"
        href="https://images.squarespace-cdn.com/content/v1/61cdb78e5104297f40ace0af/45247612-f260-475a-82d1-cfd99900dd30/IMG_2479l.jpg"
        fetchPriority="high"
      />
      <ParallaxBackground
        className="relative min-h-[50vh] bg-brand-black flex items-end py-20 px-6 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://images.squarespace-cdn.com/content/v1/61cdb78e5104297f40ace0af/45247612-f260-475a-82d1-cfd99900dd30/IMG_2479l.jpg')",
        }}
      >
        <div className="max-w-[90%] mx-auto w-full">
          <Reveal direction="up" delay={0.1}>
            <h2 className="text-white text-lg font-normal uppercase tracking-wider mb-2 font-poppins">
              Our Purpose
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.3}>
            <h1 className="text-white text-3xl md:text-5xl font-normal max-w-4xl leading-tight font-poppins">
              Let&rsquo;s build our nations through our pure and renewable journey together.
            </h1>
          </Reveal>
        </div>
      </ParallaxBackground>

      <section className="py-24 px-6 bg-white border-b border-gray-100">
        <div className="max-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <Reveal direction="left" delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-normal text-gray-900 font-poppins leading-tight max-w-md">
              PT Anugerah Surya Pacific Resources (ASPIRE)
            </h2>
          </Reveal>
          <Reveal direction="right" delay={0.2}>
            <div className="space-y-6 text-gray-600 leading-relaxed text-sm md:text-base">
              {content.intro?.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
              <p className="font-normal text-gray-900 pt-2">
                ASPIRE&rsquo;s most valuable assets are the aspirations of our people.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-[90%] mx-auto">
          <Reveal direction="up" delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-normal text-gray-900 font-poppins">
              Our pure and renewable journey together.
            </h2>
          </Reveal>
        </div>
      </section>

      <section className="py-16 px-6 bg-white space-y-24">
        <div className="max-w-[90%] mx-auto space-y-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start border-t border-gray-100 pt-12">
            <Reveal direction="left" delay={0.1}>
              <div>
                <p className="text-xs font-normal uppercase tracking-wider text-gray-400 mb-2">
                  Our Purpose
                </p>
                <h3 className="text-2xl md:text-3xl font-normal text-gray-500 font-poppins max-w-md leading-tight">
                  Let&rsquo;s build our nations through our pure and renewable green nickel production
                </h3>
              </div>
            </Reveal>
            <Reveal direction="right" delay={0.2}>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base italic pt-6 md:pt-8">
                &ldquo;{content.purpose.body}&rdquo;
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start border-t border-gray-100 pt-12">
            <Reveal direction="left" delay={0.1}>
              <div>
                <p className="text-xs font-normal uppercase tracking-wider text-gray-400 mb-2">
                  Our Vision
                </p>
                <h3 className="text-2xl md:text-3xl font-normal text-gray-500 font-poppins max-w-md leading-tight">
                  Let&rsquo;s become world-class green nickel producer with supreme commitment and
                  determination
                </h3>
              </div>
            </Reveal>
            <Reveal direction="right" delay={0.2}>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base italic pt-6 md:pt-8">
                <p>
                  &ldquo;Our present vision is to be the national leader in nickel mining and
                  processing with supreme commitment to ethical and social and environmental
                  responsibilities.
                </p>
                <p>
                  Our determination is to productively enrich and nourish the quality of lives of
                  our people and natural resources through eternal improvement of our efficient
                  operational excellence.&rdquo;
                </p>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start border-t border-gray-100 pt-12">
            <Reveal direction="left" delay={0.1}>
              <div>
                <p className="text-xs font-normal uppercase tracking-wider text-gray-400 mb-2">
                  Our Values
                </p>
                <h3 className="text-2xl md:text-3xl font-normal text-gray-500 font-poppins max-w-md leading-tight">
                  Let&rsquo;s commit ourselves and let&rsquo;s start now.
                </h3>
              </div>
            </Reveal>
            <Reveal direction="right" delay={0.2}>
              <div className="space-y-6 pt-6 md:pt-8">
                <p className="text-sm text-gray-500 font-normal italic">Our commitment is to value:</p>
                <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base italic">
                  {content.values.body.map((value, idx) => (
                    <p key={idx}>{value}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-[90%] mx-auto space-y-12">
          <div className="text-center">
            <Reveal direction="up" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 font-poppins">
                Our History, Our Present and Our Future
              </h2>
            </Reveal>
          </div>
          <div className="max-w-4xl mx-auto">
            <Timeline items={content.timeline} />
          </div>
        </div>
      </section>
    </div>
  );
}
