import { Link } from 'react-router-dom';
import {
  Phone,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Award,
  Clock,
  Wrench,
  Building2,
  Factory,
  ServerCog,
  Cable,
} from 'lucide-react';
import { Page, CtaBanner } from '@/components/Page';
import { COMPANY, SERVICES, PROJECTS, DIFFERENCE } from '@/data/site';

const CAPABILITIES = [
  { icon: Building2, label: 'Commercial Construction' },
  { icon: Factory, label: 'Industrial & Manufacturing' },
  { icon: Cable, label: 'Controls & Equipment Installation' },
  { icon: ServerCog, label: 'Mission Critical Power' },
];

const DIFF_ICONS = [MapPin, ShieldCheck, Award];

export default function Home() {
  return (
    <Page
      title="Nashville Commercial & Industrial Electricians"
      description="deGraauw Electric is Nashville's choice for commercial and industrial electrical contracting. Licensed in TN, MS, NC, FL & CO. Call 615-637-9966 for your next project."
      path="/"
      hero={
        <section className="relative flex min-h-[640px] items-center overflow-hidden bg-navy-950">
          <img
            src="/hero-electrical.webp"
            alt="Electricians installing electrical conduit on a commercial construction site"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/30" />
          <div className="relative mx-auto w-full max-w-8xl px-6 py-32 md:py-40">
            <p className="animate-rise inline-block rounded border border-amber-500/60 bg-navy-950/60 px-4 py-1.5 font-display text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
              Commercial Electricians
            </p>
            <h1 className="animate-rise animate-rise-1 mt-5 max-w-3xl font-display text-5xl font-bold uppercase leading-[1.02] tracking-wide text-white md:text-7xl">
              Nashville&rsquo;s Choice for Commercial Electricians
            </h1>
            <p className="animate-rise animate-rise-2 mt-5 max-w-xl text-lg font-medium uppercase tracking-[0.15em] text-amber-400">
              Skilled Craftsmanship &amp; Impeccable Performance
            </p>
            <p className="animate-rise animate-rise-3 mt-4 max-w-xl text-lg leading-relaxed text-navy-100">
              From preconstruction to closeout, we power commercial and industrial projects
              across Nashville and the Southeast.
            </p>
            <div className="animate-rise animate-rise-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded bg-amber-500 px-7 py-3.5 font-bold uppercase tracking-wider text-navy-950 transition-colors hover:bg-amber-400"
              >
                <Phone className="h-5 w-5" />
                Call {COMPANY.phone}
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded border-2 border-white/70 px-7 py-3.5 font-bold uppercase tracking-wider text-white transition-colors hover:border-amber-500 hover:text-amber-400"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </section>
      }
    >
      {/* Services */}
      <section className="mx-auto max-w-8xl px-6 py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="font-display text-base font-semibold uppercase tracking-[0.25em] text-amber-600">
            Our Services
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide text-navy-900 md:text-5xl">
            Regional Leaders in Industrial Electrical Contracting &amp; Integration
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              to={s.path}
              className="group relative overflow-hidden rounded-lg bg-navy-950"
            >
              <img
                src={s.image}
                alt={s.title}
                className="h-64 w-full object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm text-navy-100">{s.tagline}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-amber-400">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Nashville commitment */}
      <section className="bg-navy-50">
        <div className="mx-auto grid max-w-8xl items-center gap-12 px-6 py-20 md:py-24 lg:grid-cols-2">
          <div>
            <p className="font-display text-base font-semibold uppercase tracking-[0.25em] text-amber-600">
              Our Commitment to Nashville
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide text-navy-900">
              We Don&rsquo;t Just Power Buildings. We Empower Businesses.
            </h2>
            <p className="mt-5 leading-relaxed text-navy-700">
              While we serve a diverse clientele across three states, our heart is firmly rooted in
              Nashville. We take pride in contributing to the growth and success of the local
              community, providing reliable electrical services that local businesses can count on
              day in and day out.
            </p>
            <p className="mt-4 leading-relaxed text-navy-700">
              For us, it&rsquo;s not just about wiring and fixtures — it&rsquo;s about providing
              solutions that help your company achieve its objectives. Discover the deGraauw
              Electric difference and how we can light up your next project with excellence and
              expertise.
            </p>
          </div>
          <div className="grid gap-4">
            {DIFFERENCE.map((d, i) => {
              const Icon = DIFF_ICONS[i];
              return (
                <div
                  key={d.title}
                  className="flex gap-4 rounded-lg border border-navy-100 bg-white p-6 shadow-sm"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-amber-500/15 text-amber-600">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase tracking-wide text-navy-900">
                      {d.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-navy-600">{d.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities strip */}
      <section className="bg-navy-950">
        <div className="mx-auto max-w-8xl px-6 py-14">
          <h2 className="text-center font-display text-2xl font-bold uppercase tracking-[0.2em] text-navy-200">
            Industry Capabilities
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {CAPABILITIES.map((c) => (
              <div
                key={c.label}
                className="flex flex-col items-center gap-3 rounded-lg border border-navy-800 bg-navy-900 p-6 text-center"
              >
                <c.icon className="h-8 w-8 text-amber-500" />
                <span className="text-sm font-semibold uppercase tracking-wider text-white">
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-8xl px-6 py-20 md:py-24">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display text-base font-semibold uppercase tracking-[0.25em] text-amber-600">
              Featured Projects
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide text-navy-900">
              Recent Work
            </h2>
          </div>
          <Link
            to="/projects"
            className="hidden items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-navy-700 transition-colors hover:text-amber-600 sm:inline-flex"
          >
            View portfolio
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PROJECTS.slice(0, 3).map((p) => (
            <div key={p.name} className="rounded-lg border border-navy-100 p-6 shadow-sm">
              <span className="inline-block rounded bg-navy-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-navy-700">
                {p.category}
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold uppercase tracking-wide text-navy-900">
                {p.name}
              </h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-navy-500">
                <MapPin className="h-4 w-4" />
                {p.location}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-navy-600">{p.description}</p>
            </div>
          ))}
        </div>
        <Link to="/projects" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-navy-700 sm:hidden">
          View portfolio <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Areas served */}
      <section className="bg-navy-50">
        <div className="mx-auto max-w-8xl px-6 py-16">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="font-display text-base font-semibold uppercase tracking-[0.25em] text-amber-600">
                Areas Served
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide text-navy-900 md:text-4xl">
                Licensed Across Five States
              </h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {COMPANY.states.map((s) => (
                <span
                  key={s}
                  className="rounded border border-navy-200 bg-white px-4 py-2 text-sm font-semibold text-navy-800"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Careers intro */}
      <section className="mx-auto max-w-8xl px-6 py-20 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="font-display text-base font-semibold uppercase tracking-[0.25em] text-amber-600">
              Careers
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide text-navy-900">
              Build Your Career With deGraauw Electric
            </h2>
            <p className="mt-5 leading-relaxed text-navy-700">
              From electricians and foremen to project managers and administrative staff, every
              role at deGraauw Electric matters. We&rsquo;re currently hiring Lead Electricians and
              remote Data Entry Personnel.
            </p>
            <Link
              to="/careers"
              className="mt-6 inline-flex items-center gap-2 rounded bg-navy-900 px-6 py-3 font-bold uppercase tracking-wider text-white transition-colors hover:bg-navy-800"
            >
              View open positions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Clock, title: 'On-Time Completion', text: 'Schedules we hit, budgets we keep.' },
              { icon: ShieldCheck, title: 'Safety First', text: 'Safety culture on every jobsite.' },
              { icon: Wrench, title: 'Skilled Craftsmanship', text: 'Done right the first time.' },
              { icon: Award, title: 'Regional Leader', text: 'A decade of proven performance.' },
            ].map((item) => (
              <div key={item.title} className="rounded-lg bg-navy-50 p-5">
                <item.icon className="h-6 w-6 text-amber-600" />
                <h3 className="mt-2.5 font-display text-lg font-bold uppercase tracking-wide text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-navy-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Let's Make Your Next Project a Success"
        text="Contact us today to see how we can help make your next project a success. Your vision, supercharged by our expertise."
      />
    </Page>
  );
}
