import { FormEvent, useState } from 'react';
import {
  MapPin,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  Upload,
  Zap,
  Globe,
} from 'lucide-react';
import { Page, PageHero, CtaBanner } from '@/components/Page';
import { COMPANY } from '@/data/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const POSITIONS = [
  'Lead Electrician – State Representative',
  'Data Entry Personnel (Remote)',
] as const;

const initialForm = {
  position: POSITIONS[0] as string,
  fullName: '',
  email: '',
  phone: '',
  stateApplyingFor: '',
  city: '',
  yearsExperience: '',
  licenseCertification: '',
  specializations: '',
  willingToTravel: 'Yes',
  statesForTravel: '',
  introduction: '',
  additionalInfo: '',
};

export default function Careers() {
  const [form, setForm] = useState(initialForm);
  const [resume, setResume] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const isLead = form.position === POSITIONS[0];

  const set = (key: keyof typeof initialForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [key]: e.target.value });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!resume) {
      setErrorMsg('Please attach your resume (PDF or DOC/DOCX) before submitting.');
      setStatus('error');
      return;
    }
    setStatus('submitting');
    setErrorMsg('');
    try {
      const payload = new FormData();
      Object.entries(form).forEach(([k, v]) => payload.append(k, v));
      payload.append('resume', resume);
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-application`, {
        method: 'POST',
        body: payload,
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || 'Something went wrong. Please try again.');
      setStatus('success');
      setForm(initialForm);
      setResume(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  const inputClass =
    'w-full rounded border border-navy-200 bg-white px-4 py-2.5 text-navy-900 placeholder:text-navy-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30';
  const labelClass = 'mb-1.5 block text-sm font-semibold text-navy-800';

  return (
    <Page
      title="Careers"
      description={`Join the deGraauw Electric team. Now hiring Lead Electricians (State Representatives) and remote Data Entry Personnel. Apply online or email ${COMPANY.email}.`}
      path="/careers"
      hero={
        <PageHero
          kicker="Careers"
          title="Build the Work That Powers Business"
          intro="Join a Nashville-founded electrical contractor where preparation, craftsmanship, and accountability shape every project."
        />
      }
    >
      {/* Job listings */}
      <section className="mx-auto max-w-8xl px-6 py-16 md:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Position 1 */}
          <article className="rounded-lg border border-navy-100 shadow-sm">
            <div className="border-b border-navy-100 bg-navy-950 p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded bg-amber-500 text-navy-950">
                  <Zap className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
                    Lead Electrician / State Representative
                  </h2>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold uppercase tracking-wider text-navy-300">
                    <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> Full-time / Project-based</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Multi-state</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="p-7">
              <p className="text-sm leading-relaxed text-navy-700">
                deGraauw Electric is looking for an experienced electrician who can serve as a
                trusted field representative in an assigned state. This is a hands-on leadership
                role for someone who understands commercial and industrial work, communicates with
                confidence, and takes ownership of the details that keep a project moving.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-navy-700">
                The State Representative works with clients, contractors, vendors, and deGraauw
                Electric project leadership to coordinate field activity and uphold the company&rsquo;s
                standards for safety, quality, and professionalism. Electricians who can travel
                across multiple states are encouraged to apply and may be considered for additional
                assignments based on project needs.
              </p>
              <h3 className="mt-6 font-display text-lg font-bold uppercase tracking-wide text-navy-900">
                Key Responsibilities
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-navy-700">
                {[
                  'Represent deGraauw Electric as the dependable electrical contact for the assigned territory.',
                  'Coordinate day-to-day field activity for commercial and industrial projects.',
                  'Work closely with clients, general contractors, vendors, and project managers.',
                  'Read plans, identify field needs, and communicate clear project updates.',
                  'Help organize labor, materials, inspections, and site priorities.',
                  'Protect the company\u2019s standards for safety, quality, schedule, and workmanship.',
                  'Identify opportunities to strengthen client relationships and regional growth.',
                  'Travel to other states when project requirements and arrangements allow.',
                ].map((r) => (
                  <li key={r.slice(0, 30)} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                    {r}
                  </li>
                ))}
              </ul>
              <h3 className="mt-6 font-display text-lg font-bold uppercase tracking-wide text-navy-900">
                Preferred Qualifications
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-navy-700">
                {[
                  'Demonstrated experience in commercial or industrial electrical construction.',
                  'Current license, certification, or qualification appropriate to the work and jurisdiction, where required.',
                  'Strong working knowledge of electrical systems, drawings, safety practices, and jobsite coordination.',
                  'Clear written and verbal communication with a professional client-facing presence.',
                  'Sound judgment, organization, and the ability to solve field problems calmly.',
                  'Ability to work independently while keeping project leadership informed.',
                  'Willingness to travel is a strong advantage.',
                ].map((q) => (
                  <li key={q.slice(0, 30)} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                    {q}
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded bg-navy-50 p-4 text-sm text-navy-600">
                <strong className="text-navy-800">Travel compensation:</strong> Travel-related
                compensation and arrangements may be considered for work outside an applicant&rsquo;s
                designated state based on project location, duration, and company policy. No fixed
                allowance is guaranteed.
              </p>
            </div>
          </article>

          {/* Position 2 */}
          <article className="self-start rounded-lg border border-navy-100 shadow-sm">
            <div className="border-b border-navy-100 bg-navy-950 p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded bg-amber-500 text-navy-950">
                  <Globe className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
                    Data Entry Personnel
                  </h2>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold uppercase tracking-wider text-navy-300">
                    <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> Remote</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> United States</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="p-7">
              <p className="text-sm leading-relaxed text-navy-700">
                deGraauw Electric is seeking a dependable remote Data Entry professional to support
                the administrative systems behind our field operations. This role is a strong fit
                for someone who takes pride in accurate work, handles information discreetly, and
                can bring structure to a high-volume digital workspace.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-navy-700">
                You will help keep company records current, organized, and easy for the right team
                members to use. The work requires consistency, thoughtful review, and reliable
                communication with company personnel across the organization.
              </p>
              <h3 className="mt-6 font-display text-lg font-bold uppercase tracking-wide text-navy-900">
                Key Responsibilities
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-navy-700">
                {[
                  'Enter, update, and maintain accurate information in company systems and spreadsheets.',
                  'Organize digital records so documents can be located quickly and reliably.',
                  'Review source information for completeness, consistency, and obvious errors.',
                  'Support administrative reporting, tracking, and routine data cleanup.',
                  'Follow established naming, filing, and documentation practices.',
                  'Communicate questions and status updates clearly to the appropriate team members.',
                  'Meet agreed priorities and deadlines while working independently.',
                  'Handle company information with care, confidentiality, and professional judgment.',
                ].map((r) => (
                  <li key={r.slice(0, 30)} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                    {r}
                  </li>
                ))}
              </ul>
              <h3 className="mt-6 font-display text-lg font-bold uppercase tracking-wide text-navy-900">
                Preferred Qualifications
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-navy-700">
                {[
                  'Reliable computer skills and comfortable, accurate keyboarding.',
                  'Working familiarity with spreadsheets, Microsoft Office, or Google Workspace.',
                  'Strong written communication and the confidence to ask clarifying questions.',
                  'Exceptional attention to detail and a methodical approach to repetitive work.',
                  'Good time management with the ability to prioritize independently.',
                  'A dependable remote-work setup and professional communication habits.',
                  'Previous data entry, records, construction administration, or office experience is helpful.',
                ].map((q) => (
                  <li key={q.slice(0, 30)} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                    {q}
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded bg-navy-50 p-4 text-sm text-navy-600">
                <strong className="text-navy-800">To apply:</strong> tell us briefly about your
                work style, attach an updated resume, and provide the contact information we can
                use to follow up.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="bg-navy-50">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <p className="font-display text-base font-semibold uppercase tracking-[0.25em] text-amber-600">
            Apply Now
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide text-navy-900">
            Application Form
          </h2>
          <p className="mt-3 text-navy-600">
            Applications are sent directly to {COMPANY.email}. Please attach your resume in PDF or
            DOC/DOCX format.
          </p>

          {status === 'success' && (
            <div className="mt-8 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-5" role="status">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
              <div>
                <p className="font-semibold text-green-800">Application submitted successfully.</p>
                <p className="mt-1 text-sm text-green-700">
                  Thank you for applying to {COMPANY.shortName}. Our team will review your
                  application and reach out if there is a fit.
                </p>
              </div>
            </div>
          )}
          {status === 'error' && (
            <div className="mt-8 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-5" role="alert">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
              <p className="text-sm text-red-700">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 grid gap-5 rounded-lg border border-navy-100 bg-white p-7 shadow-sm sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="position" className={labelClass}>
                Position Applying For <span className="text-amber-600">*</span>
              </label>
              <select id="position" value={form.position} onChange={set('position')} className={inputClass}>
                {POSITIONS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="fullName" className={labelClass}>Full Name <span className="text-amber-600">*</span></label>
              <input id="fullName" required value={form.fullName} onChange={set('fullName')} className={inputClass} autoComplete="name" />
            </div>
            <div>
              <label htmlFor="appEmail" className={labelClass}>Email Address <span className="text-amber-600">*</span></label>
              <input id="appEmail" type="email" required value={form.email} onChange={set('email')} className={inputClass} autoComplete="email" />
            </div>
            <div>
              <label htmlFor="appPhone" className={labelClass}>Phone Number <span className="text-amber-600">*</span></label>
              <input id="appPhone" type="tel" required value={form.phone} onChange={set('phone')} className={inputClass} autoComplete="tel" />
            </div>
            <div>
              <label htmlFor="stateApplyingFor" className={labelClass}>
                State Applying For <span className="text-amber-600">*</span>
              </label>
              <input id="stateApplyingFor" required value={form.stateApplyingFor} onChange={set('stateApplyingFor')} className={inputClass} />
            </div>
            <div>
              <label htmlFor="city" className={labelClass}>City</label>
              <input id="city" value={form.city} onChange={set('city')} className={inputClass} />
            </div>
            {isLead && (
              <>
                <div>
                  <label htmlFor="yearsExperience" className={labelClass}>Years of Electrical Experience *</label>
                  <input id="yearsExperience" type="number" min="0" required={isLead} value={form.yearsExperience} onChange={set('yearsExperience')} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="licenseCertification" className={labelClass}>Electrical License / Certification (if applicable)</label>
                  <input id="licenseCertification" value={form.licenseCertification} onChange={set('licenseCertification')} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="specializations" className={labelClass}>Areas of Electrical Specialization</label>
                  <input id="specializations" value={form.specializations} onChange={set('specializations')} className={inputClass} placeholder="e.g. commercial build-outs, industrial controls, mission critical" />
                </div>
                <div>
                  <label htmlFor="willingToTravel" className={labelClass}>Are you willing to travel to other states? *</label>
                  <select id="willingToTravel" value={form.willingToTravel} onChange={set('willingToTravel')} className={inputClass}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="statesForTravel" className={labelClass}>States Available for Travel</label>
                  <input id="statesForTravel" value={form.statesForTravel} onChange={set('statesForTravel')} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="introduction" className={labelClass}>Brief Professional Introduction *</label>
                  <textarea id="introduction" rows={4} required={isLead} value={form.introduction} onChange={set('introduction')} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="additionalInfo" className={labelClass}>Additional Information</label>
                  <textarea id="additionalInfo" rows={3} value={form.additionalInfo} onChange={set('additionalInfo')} className={inputClass} />
                </div>
              </>
            )}
            {!isLead && (
              <div className="sm:col-span-2">
                <label htmlFor="introduction" className={labelClass}>Brief Self-Introduction *</label>
                <textarea id="introduction" rows={4} required={!isLead} value={form.introduction} onChange={set('introduction')} className={inputClass} />
              </div>
            )}
            <div className="sm:col-span-2">
              <label htmlFor="resume" className={labelClass}>
                Resume Upload (PDF or DOC/DOCX) <span className="text-amber-600">*</span>
              </label>
              <label
                htmlFor="resume"
                className="flex cursor-pointer items-center gap-3 rounded border-2 border-dashed border-navy-300 bg-navy-50 px-4 py-5 text-sm text-navy-600 transition-colors hover:border-amber-500"
              >
                <Upload className="h-5 w-5 text-amber-600" />
                {resume ? (
                  <span className="font-semibold text-navy-900">{resume.name}</span>
                ) : (
                  <span>Click to attach your resume</span>
                )}
              </label>
              <input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                className="sr-only"
                onChange={(e) => setResume(e.target.files?.[0] ?? null)}
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex w-full items-center justify-center gap-2 rounded bg-amber-500 px-7 py-3.5 font-bold uppercase tracking-wider text-navy-950 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Submit Application
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      <CtaBanner
        heading="Questions About a Position?"
        text={`Email us at ${COMPANY.email} or call ${COMPANY.phone} and our team will point you in the right direction.`}
      />
    </Page>
  );
}
