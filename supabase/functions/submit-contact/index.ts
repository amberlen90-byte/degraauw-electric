import { createClient } from 'npm:@supabase/supabase-js@2.57.4';
import { Resend } from 'npm:resend@4.0.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

const RECIPIENT = 'info@degraauwelectric.pro';

let supabaseInstance: ReturnType<typeof createClient> | null = null;

function getSupabase() {
  if (!supabaseInstance) {
    supabaseInstance = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
  }
  return supabaseInstance;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const resendKey = Deno.env.get('RESEND_API_KEY');

    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(JSON.stringify({ error: 'Invalid request format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const firstName = String(body.firstName || '').trim();
    const lastName = String(body.lastName || '').trim();
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').trim();
    const address = String(body.address || '').trim();
    const isNewCustomer = String(body.isNewCustomer || '').trim();
    const message = String(body.message || '').trim();

    // Server-side validation
    const errors: string[] = [];
    if (!firstName || firstName.length > 100) errors.push('First name is required.');
    if (!lastName || lastName.length > 100) errors.push('Last name is required.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200)
      errors.push('A valid email address is required.');
    if (!message || message.length > 5000) errors.push('A message is required.');
    if (phone.length > 40) errors.push('Phone number is too long.');
    if (address.length > 300) errors.push('Address is too long.');
    if (errors.length) {
      return new Response(JSON.stringify({ error: errors.join(' ') }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = getSupabase();

    // Basic flood protection: reject if too many submissions in the last 10 minutes
    const { count } = await supabase
      .from('contact_submissions')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', new Date(Date.now() - 10 * 60 * 1000).toISOString());
    if ((count ?? 0) >= 20) {
      return new Response(
        JSON.stringify({
          error: 'We are receiving an unusually high volume of messages. Please try again later or call us.',
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { error: insertError } = await supabase.from('contact_submissions').insert({
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phone || null,
      address: address || null,
      is_new_customer: isNewCustomer === 'Yes' ? 'Yes' : 'No',
      message,
    });
    if (insertError) throw insertError;

    // Email delivery requires a configured Resend key; the submission is safely stored either way.
    if (!resendKey) {
      return new Response(JSON.stringify({ ok: true, emailPending: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const resend = new Resend(resendKey);
    const submissionDate = new Date().toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    const rows: Array<[string, string]> = [
      ['Name', `${firstName} ${lastName}`],
      ['Email', email],
      ['Phone', phone || '—'],
      ['Address', address || '—'],
      ['New customer?', isNewCustomer || '—'],
      ['Submitted', submissionDate],
    ];

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
        <h2 style="color: #1f2f43; border-bottom: 3px solid #f59e0b; padding-bottom: 8px;">
          New Website Contact Inquiry
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          ${rows
            .map(
              ([k, v]) =>
                `<tr><td style="padding: 6px 0; color: #48759c; font-weight: bold; width: 160px;">${k}:</td><td style="padding: 6px 0; color: #1f2f43;">${escapeHtml(v)}</td></tr>`
            )
            .join('')}
        </table>
        <h3 style="color: #1f2f43; margin-top: 20px;">Inquiry</h3>
        <p style="background: #f3f6fa; padding: 14px; color: #1f2f43; white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>`;

    await resend.emails.send({
      from: 'deGraauw Electric Website <onboarding@resend.dev>',
      to: [RECIPIENT],
      reply_to: email,
      subject: `New Contact Inquiry — ${firstName} ${lastName}`,
      html,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('submit-contact error:', err);
    return new Response(
      JSON.stringify({
        error: 'Your message could not be sent right now. Please call us at 615-637-9966.',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
