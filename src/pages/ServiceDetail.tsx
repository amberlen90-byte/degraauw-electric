import { Link, useParams, Navigate } from 'react-router-dom';
import { Phone, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Page, PageHero, CtaBanner } from '@/components/Page';
import { SERVICES, COMPANY } from '@/data/site';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return <Navigate to="/services" replace />;

  const others = SERVICES.filter((s) => s.slug !== slug);

  return (
    <Page
      title={service.title}
      description={`${service.description} Serving Nashville and the Southeast. Call ${COMPANY.phone}.`}
      path={service.path}
      hero={
        <PageHero
          kicker="Our Services"
          title={service.title}
          intro={service.tagline}
          image={service.image}
        />
      }
    >
      <section className="mx-auto max-w-8xl px-6 py-16 md:py-20">
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-navy-500 transition-colors hover:text-amber-600"
        >
          <ArrowLeft className="h-4 w-4" />
          All services
        </Link>
        <div className="mt-8 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-navy-900">
              {service.tagline}
            </h2>
            {service.detail.map((p) => (
              <p key={p.slice(0, 40)} className="mt-4 leading-relaxed text-navy-700">
                {p}
              </p>
            ))}
            <h3 className="mt-8 font-display text-2xl font-bold uppercase tracking-wide text-navy-900">
              What We Deliver
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-navy-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <aside className="space-y-6">
            <div className="rounded-lg bg-navy-950 p-7">
              <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white">
                Talk to Our Team
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-200">
                Call {COMPANY.phone} today to discuss how we can support your project.
              </p>
              <a
                href={COMPANY.phoneHref}
                className="mt-4 flex items-center justify-center gap-2 rounded bg-amber-500 px-5 py-3 font-bold uppercase tracking-wider text-navy-950 transition-colors hover:bg-amber-400"
              >
                <Phone className="h-4 w-4" />
                {COMPANY.phone}
              </a>
              <Link
                to="/contact"
                className="mt-3 flex items-center justify-center rounded border-2 border-white/50 px-5 py-3 font-bold uppercase tracking-wider text-white transition-colors hover:border-amber-500 hover:text-amber-400"
              >
                Request a Quote
              </Link>
            </div>
            <div className="rounded-lg border border-navy-100 p-7">
              <h3 className="font-display text-xl font-bold uppercase tracking-wide text-navy-900">
                Other Services
              </h3>
              <ul className="mt-4 space-y-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      to={o.path}
                      className="group flex items-center justify-between gap-2 text-sm font-semibold text-navy-700 transition-colors hover:text-amber-600"
                    >
                      {o.title}
                      <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <CtaBanner
        heading="Ready to Get Started?"
        text={`Contact us today to see how our ${service.shortTitle.toLowerCase()} team can make your next project a success.`}
      />
    </Page>
  );
}
