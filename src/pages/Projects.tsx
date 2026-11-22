import { MapPin, Building2, Factory } from 'lucide-react';
import { Page, PageHero, CtaBanner } from '@/components/Page';
import { PROJECTS } from '@/data/site';

const CATEGORIES = ['Commercial', 'Industrial'] as const;

// One line per project:  'Exact project name': '/projects/file-name.jpg',
const PROJECT_IMAGES: Record<string, string> = {
  'DR Horton Offices': '/projects/dr-horton-offices.jpg',
  'ARCO National Construction Project': '/projects/arco-national.jpg',
  'Nashville Commercial Build-Outs': '/projects/nashville-buildouts.jpg',
  'Regional Manufacturing Facility Work': '/projects/regional.jpg',
};

export default function Projects() {
  return (
    <Page
      title="Portfolio"
      description="Explore deGraauw Electric's commercial and industrial electrical projects across Nashville and the Southeast, including ground-up construction and manufacturing facility work."
      path="/projects"
      hero={
        <PageHero
          kicker="Portfolio"
          title="Delivering Critical Infrastructure & Large-Scale Projects"
          intro="Projects that support growth, reliability, and performance for our clients across the Southeast."
          image="/commercial.webp"
        />
      }
    >
      {CATEGORIES.map((cat) => (
        <section key={cat} className="mx-auto max-w-8xl px-6 py-12 md:py-16">
          <div className="flex items-center gap-4">
            {cat === 'Commercial' ? (
              <Building2 className="h-7 w-7 text-amber-600" />
            ) : (
              <Factory className="h-7 w-7 text-amber-600" />
            )}
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-navy-900 md:text-4xl">
              {cat} Projects
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.filter((p) => p.category === cat).map((p) => (
              <article
                key={p.name}
                className="flex flex-col rounded-lg border border-navy-100 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-56 items-center justify-center overflow-hidden rounded-t-lg bg-navy-950">
              {PROJECT_IMAGES[p.name] ? (
                <img
                  src={PROJECT_IMAGES[p.name]}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-display text-5xl font-bold uppercase tracking-wide text-amber-500/80">{p.name.charAt(0)}</span>
              )}
            </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-navy-900">
                    {p.name}
                  </h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-navy-500">
                    <MapPin className="h-4 w-4 text-amber-600" />
                    {p.location}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">{p.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
      <CtaBanner
        heading="Your Project Could Be Next"
        text="From ground-up construction to industrial facility work, we deliver projects our clients are proud to put their name on."
      />
    </Page>
  );
}
