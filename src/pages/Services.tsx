import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Page, PageHero, CtaBanner } from '@/components/Page';
import { SERVICES } from '@/data/site';

export default function Services() {
  return (
    <Page
      title="Our Services"
      description="Commercial, industrial, controls & equipment installation, and mission critical power services from deGraauw Electric — Nashville's commercial and industrial electrical contractor."
      path="/services"
      hero={
        <PageHero
          kicker="Our Services"
          title="From Preconstruction Through Closeout"
          intro="deGraauw Electric supports commercial, industrial, and mission-critical electrical projects with budgeting, planning, documentation, self-performed installation, testing, and coordination."
          image="/industrial.webp"
        />
      }
    >
      <section className="mx-auto max-w-8xl px-6 py-16 md:py-20">
        <div className="space-y-8">
          {SERVICES.map((s, i) => (
            <div
              key={s.slug}
              className={`grid items-stretch overflow-hidden rounded-lg border border-navy-100 shadow-sm lg:grid-cols-2 ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <img
                src={s.image}
                alt={s.title}
                className="h-64 w-full object-cover lg:h-full"
                loading="lazy"
              />
              <div className="p-8 md:p-10">
                <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-navy-900">
                  {s.title}
                </h2>
                <p className="mt-3 leading-relaxed text-navy-600">{s.description}</p>
                <ul className="mt-5 space-y-2">
                  {s.bullets.slice(0, 3).map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-navy-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  to={s.path}
                  className="mt-6 inline-flex items-center gap-2 rounded bg-navy-900 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-navy-800"
                >
                  Explore this service
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CtaBanner
        heading="Not Sure Where to Start?"
        text="Call us at 615-637-9966 to discuss your electrical needs with our team."
      />
    </Page>
  );
}
