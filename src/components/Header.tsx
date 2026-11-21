import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { COMPANY } from '@/data/site';

const NAV = [
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Portfolio' },
  { to: '/about', label: 'About' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar */}
      <div className="hidden md:block bg-navy-950 text-navy-100 text-sm">
        <div className="mx-auto flex max-w-8xl items-center justify-between px-6 py-1.5">
          <p className="text-navy-200">
            Commercial &amp; Industrial Electrical Contracting — Nashville, TN
          </p>
          <a
            href={COMPANY.phoneHref}
            className="flex items-center gap-2 font-semibold text-amber-400 transition-colors hover:text-amber-300"
          >
            <Phone className="h-3.5 w-3.5" />
            {COMPANY.phone}
          </a>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 shadow-lg backdrop-blur'
            : 'bg-navy-900/95 lg:bg-navy-900/80 backdrop-blur'
        }`}
      >
        <div className="mx-auto flex max-w-8xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-3" aria-label="deGraauw Electric home">
            <span className="flex h-12 items-center rounded-lg bg-white px-3 shadow-sm ring-1 ring-black/10">
              <img
                src="/image copy.png"
                alt="deGraauw Electric"
                className="h-8 w-auto max-w-[215px] object-contain"
              />
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-semibold uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'text-amber-500'
                      : scrolled
                        ? 'text-navy-800 hover:text-amber-600'
                        : 'text-white hover:text-amber-400'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href={COMPANY.phoneHref}
              className="flex items-center gap-2 rounded bg-amber-500 px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-navy-950 transition-colors hover:bg-amber-400 lg:ml-2"
            >
              <Phone className="h-4 w-4" />
              {COMPANY.phone}
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className={`rounded p-2 lg:hidden ${scrolled ? 'text-navy-900' : 'text-white'}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav
            className="border-t border-navy-800 bg-navy-950 px-6 pb-6 pt-2 lg:hidden"
            aria-label="Mobile navigation"
          >
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block border-b border-navy-800 py-3 text-base font-semibold uppercase tracking-wider ${
                    isActive ? 'text-amber-500' : 'text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href={COMPANY.phoneHref}
              className="mt-4 flex items-center justify-center gap-2 rounded bg-amber-500 px-4 py-3 text-base font-bold uppercase tracking-wider text-navy-950"
            >
              <Phone className="h-5 w-5" />
              Call {COMPANY.phone}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
