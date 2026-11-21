import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import ServiceDetail from '@/pages/ServiceDetail';
import Projects from '@/pages/Projects';
import Careers from '@/pages/Careers';
import Contact from '@/pages/Contact';
import { SITE_URL, COMPANY } from '@/data/site';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy-950 px-6 text-center">
      <p className="font-display text-8xl font-bold text-amber-500">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-wide text-white">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-navy-200">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
      </p>
      <Link
        to="/"
        className="mt-8 rounded bg-amber-500 px-6 py-3 font-bold uppercase tracking-wider text-navy-950 transition-colors hover:bg-amber-400"
      >
        Back to Home
      </Link>
    </div>
  );
}

function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ElectricalContractor',
    name: COMPANY.name,
    url: SITE_URL,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    foundingDate: String(COMPANY.founded),
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${COMPANY.address.street} ${COMPANY.address.suite}`,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.state,
      postalCode: COMPANY.address.zip,
      addressCountry: 'US',
    },
    areaServed: COMPANY.states,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '15:30',
      },
    ],
    sameAs: [COMPANY.linkedin],
  };
  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Helmet>
          <html lang="en" />
          <meta property="og:image" content={`${SITE_URL}/hero-electrical.webp`} />
          <meta name="robots" content="index, follow" />
        </Helmet>
        <LocalBusinessSchema />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/careers" element={<Navigate to="/careers" replace />} />
          <Route path="/services" element={<Services />} />
          <Route
            path="/services/commercial-services"
            element={<Navigate to="/services/commercial-electrical" replace />}
          />
          <Route
            path="/services/industrial-manufacturing"
            element={<Navigate to="/services/industrial-electrical" replace />}
          />
          <Route
            path="/services/industrial-controls-equipment-installation"
            element={<Navigate to="/services/controls-equipment-installation" replace />}
          />
          <Route path="/services/mission-critical-power" element={<ServiceDetail />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/portfolio" element={<Projects />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
