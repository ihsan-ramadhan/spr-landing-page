import { getProjects } from '../lib/content';
import ProjectCard from '../components/ui/ProjectCard';

export default function HomePage() {
  const projects = getProjects().filter(p => p.featured);

  return (
    <div className="flex flex-col">
      <section className="relative min-h-[70vh] bg-brand-black flex items-end py-20 px-6 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/images/backgrounds/hero.webp')" }}>
        <div className="max-w-[90%] mx-auto w-full">
          <h1 className="text-white text-4xl md:text-6xl font-normal max-w-3xl leading-tight font-poppins">
            Our pure and renewable journey together.
          </h1>
        </div>
      </section>

      {/* Intro paragraph & featured Projects */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[90%] mx-auto">
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl font-normal mb-16 leading-relaxed">
            We are passionate in creating a better present and let’s start from within ourselves.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="relative py-32 px-6 bg-brand-black text-white text-center bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('/images/backgrounds/cta.webp')" }}>
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-normal leading-tight mb-8 font-poppins">
            Achieving Renewable <span className="italic">“Green”</span> Nickel Battery Materials
          </h2>
          <a 
            href="/whatwedo/renewable-nickel-battery-materials" 
            className="inline-flex px-6 py-3 border border-white text-sm font-normal tracking-wider uppercase hover:bg-white hover:text-brand-black transition"
          >
            Our future
          </a>
        </div>
      </section>
    </div>
  );
}
