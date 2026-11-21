# Project memory

## Product intent & audience

- Corporate website redesign for deGraauw Electric, an electrical contractor.
- Multi-page site preserving all original company content while upgrading contact and careers systems.
- Audience: potential commercial/residential clients and job applicants.

## Brand personality & voice

- Professional, established electrical contractor; trustworthy and competence-forward.
- Content emphasizes leadership team, five-state licensing, and service breadth.

## Visual design & UX direction

- Multi-page architecture: Home, About, Services + four individual service pages, Portfolio, News, Careers, Contact.
- Hero and section photography on homepage and each service page.
- Careers page combines job listings with an application form.
- Contact page includes a form with email notification + database storage.
- Standard corporate layout with header/footer across all pages.
- Scroll-aware header that changes color/background on scroll; mobile menu icon contrast adjusted accordingly.
- Logo uses a white "brand plaque" container in header and footer to stay crisp over dark backgrounds.
- Brand red is the primary logo accent; red mark brightened for stronger contrast.

## Decisions, constraints & rationale

- Framework: vite-react with Tailwind CSS, React hooks, Lucide React icons (per `.bolt/prompt`).
- `@/` path alias maps to `src/` for all project module imports.
- Email integration via Resend; edge functions handle form submission and sending.
- Form submissions stored in database tables (confirmed present) and email notifications sent to info@degraauwelectric.pro.
- Company content restored: phone 615-637-9966, physical address, business hours, leadership info, five-state licensing details.
- A prior incident caused page/component/data/image files to vanish from the project; all were rebuilt from known content. Core setup (theme, app entry, styles) survived.
- Original logo PNG had a dark opaque background behind the red mark, causing it to vanish on dark surfaces. Fixed by removing that background, brightening the red, and placing logo on a white plaque in header/footer.
- Favicon created by cropping the standalone "G" from the logo mark.

## Open questions & assumptions

- Resend API key and domain verification are not yet completed; email notifications will only flow once both are done.
- Five-state licensing: exact states not yet confirmed in memory.
- Portfolio and News content source/format assumed to be static or semi-static; no CMS inferred yet.