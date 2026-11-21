import { FormEvent, useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { Page, PageHero } from '@/components/Page';
import { COMPANY } from '@/data/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  isNewCustomer: 'Yes',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (key: keyof typeof initialForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [key]: e.target.value });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || 'Something went wrong. Please try again.');
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  const inputClass =
    'w-full rounded border border-navy-200 bg-white px-4 py-2.5 text-navy-900 placeholder:text-navy-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30';

  return (
    <Page
      title="Contact Us"
      description={`Contact deGraauw Electric at 615-637-9966 or info@degraauwelectric.pro. 401 Commerce St. Suite 5400, Nashville, TN 37219. Request a quote for your commercial or industrial project.`}
      path="/contact"
      hero={
        <PageHero
          kicker="Contact Us"
          title="Let's Talk About Your Project"
          intro="Contact us today to see how we can help make your next project a success."
        />
      }
    >
      <section className="mx-auto max-w-8xl px-6 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-navy-900">
              Send Us a Message
            </h2>
            {status === 'success' && (
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-5" role="status">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                <div>
                  <p className="font-semibold text-green-800">Message sent successfully.</p>
                  <p className="mt-1 text-sm text-green-700">
                    Thank you for reaching out. Our team will get back to you shortly.
                  </p>
                </div>
              </div>
            )}
            {status === 'error' && (
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-5" role="alert">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                <p className="text-sm text-red-700">{errorMsg}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-1.5 block text-sm font-semibold text-navy-800">
                  First Name <span className="text-amber-600">*</span>
                </label>
                <input id="firstName" required value={form.firstName} onChange={set('firstName')} className={inputClass} autoComplete="given-name" />
              </div>
              <div>
                <label htmlFor="lastName" className="mb-1.5 block text-sm font-semibold text-navy-800">
                  Last Name <span className="text-amber-600">*</span>
                </label>
                <input id="lastName" required value={form.lastName} onChange={set('lastName')} className={inputClass} autoComplete="family-name" />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy-800">
                  Email <span className="text-amber-600">*</span>
                </label>
                <input id="email" type="email" required value={form.email} onChange={set('email')} className={inputClass} autoComplete="email" />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-navy-800">
                  Phone
                </label>
                <input id="phone" type="tel" value={form.phone} onChange={set('phone')} className={inputClass} autoComplete="tel" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className="mb-1.5 block text-sm font-semibold text-navy-800">
                  Address
                </label>
                <input id="address" value={form.address} onChange={set('address')} className={inputClass} autoComplete="street-address" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="isNewCustomer" className="mb-1.5 block text-sm font-semibold text-navy-800">
                  Are you a new customer? <span className="text-amber-600">*</span>
                </label>
                <select id="isNewCustomer" value={form.isNewCustomer} onChange={set('isNewCustomer')} className={inputClass}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-navy-800">
                  How Can We Help You? <span className="text-amber-600">*</span>
                </label>
                <textarea id="message" required rows={5} value={form.message} onChange={set('message')} className={inputClass} />
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
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Info */}
          <aside className="lg:col-span-2">
            <div className="rounded-lg bg-navy-950 p-8">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
                Get in Touch
              </h2>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                  <div>
                    <p className="font-semibold uppercase tracking-wider text-navy-300">Phone</p>
                    <a href={COMPANY.phoneHref} className="mt-0.5 block text-lg font-bold text-white transition-colors hover:text-amber-400">
                      {COMPANY.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                  <div>
                    <p className="font-semibold uppercase tracking-wider text-navy-300">Email</p>
                    <a href={`mailto:${COMPANY.email}`} className="mt-0.5 block text-white transition-colors hover:text-amber-400">
                      {COMPANY.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                  <div>
                    <p className="font-semibold uppercase tracking-wider text-navy-300">Headquarters</p>
                    <p className="mt-0.5 text-white">
                      {COMPANY.address.street}<br />
                      {COMPANY.address.suite}<br />
                      {COMPANY.address.city}, {COMPANY.address.state} {COMPANY.address.zip}
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                  <div>
                    <p className="font-semibold uppercase tracking-wider text-navy-300">Business Hours</p>
                    {COMPANY.hours.map((h) => (
                      <p key={h.days} className="mt-0.5 text-white">
                        {h.days}: {h.time}
                      </p>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-6 rounded-lg border border-navy-100 bg-navy-50 p-7">
              <h3 className="font-display text-xl font-bold uppercase tracking-wide text-navy-900">
                Service Area
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-600">
                Headquartered in Nashville and licensed across Tennessee, Mississippi, North
                Carolina, Florida, and Colorado.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </Page>
  );
}
