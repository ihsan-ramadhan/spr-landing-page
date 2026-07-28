import { getProjects } from '../lib/content';
import ProjectCard from '../components/ui/ProjectCard';
import Reveal from '../components/ui/Reveal';
import ParallaxBackground from '../components/ui/ParallaxBackground';
import HeroAnimation from '../components/home/HeroAnimation';

export default function HomePage() {
  const projects = getProjects().filter((p) => p.featured);

  return (
    <div className="flex flex-col">
      <ParallaxBackground
        className="relative min-h-[70vh] bg-brand-black flex items-end py-20 px-6 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://images.squarespace-cdn.com/content/v1/61cdb78e5104297f40ace0af/15b28ac8-11d0-43bb-99d0-049c742f9c3c/2C836F76-D7A1-4316-BAD9-C104FA227A5B.JPG')",
        }}
      >
        <div className="max-w-[90%] mx-auto w-full">
          <HeroAnimation text="Our pure and renewable journey together." />
        </div>
      </ParallaxBackground>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-[90%] mx-auto">
          <Reveal direction="up" delay={0.1}>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl font-normal mb-16 leading-relaxed">
              We are passionate in creating a better present and let&rsquo;s start from within
              ourselves.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {projects.map((project, idx) => (
              <ProjectCard key={project.slug} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <ParallaxBackground
        className="relative py-32 px-6 bg-brand-black text-white text-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('https://images.squarespace-cdn.com/content/v1/61cdb78e5104297f40ace0af/8521943a-7a9d-442d-9a62-51f84b579f58/https___specials-images.forbesimg.com_imageserve_5f8ee8e39ae6d58f0294ac64_0x0.jpg')",
        }}
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
          <Reveal direction="up" delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-normal leading-tight mb-8 font-poppins">
              Achieving Renewable <span className="italic">&ldquo;Green&rdquo;</span> Nickel Battery
              Materials
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.3}>
            <a
              href="/whatwedo/renewable-nickel-battery-materials"
              className="inline-flex px-6 py-3 border border-white text-sm font-normal tracking-wider uppercase hover:bg-white hover:text-brand-black transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Our future
            </a>
          </Reveal>
        </div>
      </ParallaxBackground>
    </div>
  );
}
