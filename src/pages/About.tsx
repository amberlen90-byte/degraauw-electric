import { MapPin, Target, Handshake, ShieldCheck } from 'lucide-react';
import { Page, PageHero, CtaBanner } from '@/components/Page';
import { COMPANY, LEADERSHIP } from '@/data/site';

const VALUES = [
  {
    icon: Target,
    title: 'Our Mission',
    text: 'To provide commercial and industrial clients with reliable electrical services built on skilled craftsmanship, honest communication, and impeccable performance — on every project, at every stage.',
  },
  {
    icon: Handshake,
    title: 'Our Culture',
    text: 'Founded by electricians, deGraauw Electric stays true to its roots. From electricians and foremen to project managers and administrative staff, every role matters and every person contributes to the finished product.',
  },
  {
    icon: ShieldCheck,
    title: 'Our Standard',
    text: 'Flawless execution begins in the planning and budgeting stages and continues through closeout. Safety, quality, and durability are engineered into everything we install, maintain, or repair.',
  },
];

export default function About() {
  return (
    <Page
      title="About Us"
      description="Founded in 2016 by electricians, deGraauw Electric is a commercial and industrial electrical contractor headquartered in Nashville, TN. Meet our leadership and learn our story."
      path="/about"
      hero={
        <PageHero
          kicker="About Us"
          title="Built by Electricians. Trusted by Business."
          intro="deGraauw Electric is an independently owned commercial and industrial electrical contractor headquartered in Nashville, Tennessee."
          image="/craftsmanship.webp"
        />
      }
    >
      <section className="mx-auto max-w-8xl px-6 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="font-display text-base font-semibold uppercase tracking-[0.25em] text-amber-600">
              Our Story
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide text-navy-900">
              A Decade of Powering the Southeast
            </h2>
            <p className="mt-5 leading-relaxed text-navy-700">
              deGraauw Electric, LLC was founded in {COMPANY.founded} by electricians who believed
              that commercial and industrial clients deserved a contractor that combined skilled
              craftsmanship with disciplined project management.
            </p>
            <p className="mt-4 leading-relaxed text-navy-700">
              From our headquarters in downtown Nashville, we have grown into a regional leader in
              industrial electrical contracting and integration, serving businesses across
              Tennessee, Mississippi, North Carolina, Florida, and Colorado. While we serve a
              diverse clientele across multiple states, our heart remains firmly rooted in
              Nashville — we take pride in contributing to the growth and success of the local
              community.
            </p>
            <p className="mt-4 leading-relaxed text-navy-700">
              Our team of skilled electricians works with the latest tools and technologies to
              ensure that every job is done right the first time. Whether it&rsquo;s new
              construction, repairs, maintenance, or upgrades, we prioritize customer satisfaction
              and aim to exceed expectations on every project.
            </p>
          </div>
          <div className="space-y-4">
            {VALUES.map((v) => (
              <div key={v.title} className="flex gap-4 rounded-lg border border-navy-100 bg-navy-50 p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-amber-500/15 text-amber-600">
                  <v.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-navy-900">
                    {v.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-600">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950">
        <div className="mx-auto max-w-8xl px-6 py-16 md:py-20">
          <p className="font-display text-base font-semibold uppercase tracking-[0.25em] text-amber-500">
            Leadership
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide text-white">
            Led by Brothers in the Trade
          </h2>
          <p className="mt-4 max-w-2xl text-navy-100">
            deGraauw Electric&rsquo;s leadership includes brothers Justin, Jeff, and Jared
            deGraauw, who continue to lead the company with the same hands-on standards it was
            founded on.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {LEADERSHIP.map((l) => (
              <div key={l.name} className="overflow-hidden rounded-lg border border-navy-800 bg-navy-900">
                <img
                  src={l.image}
                  alt={l.name}
                  className="aspect-square w-full object-cover object-top"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
                    {l.name}
                  </h3>
                  <p className="mt-1 text-sm text-navy-200">{l.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-8xl px-6 py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="font-display text-base font-semibold uppercase tracking-[0.25em] text-amber-600">
              Regional Operations
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide text-navy-900">
              Nashville Headquarters, Multi-State Reach
            </h2>
            <p className="mt-5 flex gap-3 leading-relaxed text-navy-700">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-amber-600" />
              <span>
                {COMPANY.address.street}, {COMPANY.address.suite}, {COMPANY.address.city},{' '}
                {COMPANY.address.state} {COMPANY.address.zip}
              </span>
            </p>
            <p className="mt-4 leading-relaxed text-navy-700">
              Our Nashville headquarters anchors operations across the Southeast. Licensed in five
              states, our teams travel where the work is — bringing the same standards of safety,
              quality, and communication to projects in Tennessee, Mississippi, North Carolina,
              Florida, and Colorado.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 self-start">
            {[
              { value: String(COMPANY.founded), label: 'Founded' },
              { value: '5', label: 'States Licensed' },
              { value: '51–200', label: 'Company Size' },
              { value: '100%', label: 'Satisfaction Guarantee' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg bg-navy-50 p-6 text-center">
                <p className="font-display text-4xl font-bold text-amber-600">{stat.value}</p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-navy-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Experience the deGraauw Electric Difference"
        text="Where quality and efficiency coexist. Contact us to discuss your commercial or industrial project."
      />
    </Page>
  );
}
