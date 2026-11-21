import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { COMPANY, SITE_URL } from '@/data/site';

interface PageProps {
  title: string;
  description: string;
  path: string;
  children: ReactNode;
  hero?: ReactNode;
}

export function Page({ title, description, path, children, hero }: PageProps) {
  const canonical = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${COMPANY.shortName}`;
  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={COMPANY.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <Header />
      {hero}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

interface PageHeroProps {
  kicker: string;
  title: string;
  intro?: string;
  image?: string;
}

export function PageHero({ kicker, title, intro, image }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy-950 pt-36 pb-16 md:pt-48 md:pb-24">
      {image && (
        <>
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-25"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/40" />
        </>
      )}
      <div className="relative mx-auto max-w-8xl px-6">
        <p className="animate-rise font-display text-base font-semibold uppercase tracking-[0.25em] text-amber-500">
          {kicker}
        </p>
        <h1 className="animate-rise animate-rise-1 mt-3 max-w-3xl font-display text-4xl font-bold uppercase leading-[1.05] tracking-wide text-white md:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="animate-rise animate-rise-2 mt-5 max-w-2xl text-lg leading-relaxed text-navy-100">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

export function CtaBanner({
  heading,
  text,
}: {
  heading: string;
  text: string;
}) {
  return (
    <section className="bg-navy-900">
      <div className="mx-auto flex max-w-8xl flex-col items-start justify-between gap-6 px-6 py-14 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white md:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 max-w-2xl text-navy-100">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={COMPANY.phoneHref}
            className="inline-flex items-center justify-center rounded bg-amber-500 px-6 py-3 font-bold uppercase tracking-wider text-navy-950 transition-colors hover:bg-amber-400"
          >
            Call {COMPANY.phone}
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded border-2 border-white/60 px-6 py-3 font-bold uppercase tracking-wider text-white transition-colors hover:border-amber-500 hover:text-amber-400"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
