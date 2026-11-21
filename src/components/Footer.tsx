import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Linkedin } from 'lucide-react';
import { COMPANY } from '@/data/site';
import { SERVICES } from '@/data/site';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="mx-auto grid max-w-8xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="inline-flex items-center rounded-lg bg-white px-4 py-2.5 shadow-sm ring-1 ring-white/20">
            <img
              src="/image copy.png"
              alt="deGraauw Electric"
              className="h-10 w-auto max-w-[270px] object-contain"
            />
          </span>
          <p className="mt-4 text-sm leading-relaxed">
            Commercial and industrial electrical contractor headquartered in Nashville, Tennessee.
            Founded in {COMPANY.founded} by electricians.
          </p>
          <a
            href={COMPANY.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded border border-navy-700 px-3 py-2 text-sm font-semibold text-white transition-colors hover:border-amber-500 hover:text-amber-400"
            aria-label="deGraauw Electric on LinkedIn (opens in a new tab)"
          >
            <Linkedin className="h-4 w-4" />
            Follow us on LinkedIn
          </a>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold uppercase tracking-wider text-white">
            Services
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={s.path} className="transition-colors hover:text-amber-400">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold uppercase tracking-wider text-white">
            Company
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/about" className="transition-colors hover:text-amber-400">About Us</Link></li>
            <li><Link to="/projects" className="transition-colors hover:text-amber-400">Portfolio</Link></li>
            <li><Link to="/careers" className="transition-colors hover:text-amber-400">Careers</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-amber-400">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold uppercase tracking-wider text-white">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <a href={COMPANY.phoneHref} className="font-semibold text-white transition-colors hover:text-amber-400">
                {COMPANY.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <a href={`mailto:${COMPANY.email}`} className="transition-colors hover:text-amber-400">
                {COMPANY.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <span>
                {COMPANY.address.street}<br />
                {COMPANY.address.suite}<br />
                {COMPANY.address.city}, {COMPANY.address.state} {COMPANY.address.zip}
              </span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <span>
                Mon – Fri: 7:00 AM – 3:30 PM<br />
                Sat – Sun: Closed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="mx-auto flex max-w-8xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-navy-300 sm:flex-row">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p>Licensed in TN, MS, NC, FL &amp; CO</p>
        </div>
      </div>
    </footer>
  );
}
