import { createClient } from 'npm:@supabase/supabase-js@2.57.4';
import { Resend } from 'npm:resend@4.0.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

const RECIPIENT = 'info@degraauwelectric.pro';
const MAX_RESUME_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx'];
const ALLOWED_MIME = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

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

function row(k: string, v: string): string {
  return `<tr><td style="padding: 6px 0; color: #48759c; font-weight: bold; width: 220px;">${k}:</td><td style="padding: 6px 0; color: #1f2f43;">${escapeHtml(v)}</td></tr>`;
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
    if (!contentType.includes('multipart/form-data')) {
      return new Response(JSON.stringify({ error: 'Invalid request format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const form = await req.formData();
    const get = (key: string) => String(form.get(key) || '').trim();

    const position = get('position');
    const fullName = get('fullName');
    const email = get('email');
    const phone = get('phone');
    const stateApplyingFor = get('stateApplyingFor');
    const city = get('city');
    const yearsExperience = get('yearsExperience');
    const licenseCertification = get('licenseCertification');
    const specializations = get('specializations');
    const willingToTravel = get('willingToTravel');
    const statesForTravel = get('statesForTravel');
    const introduction = get('introduction');
    const additionalInfo = get('additionalInfo');

    const errors: string[] = [];
    const allowedPositions = [
      'Lead Electrician – State Representative',
      'Data Entry Personnel (Remote)',
    ];
    if (!allowedPositions.includes(position)) errors.push('Please select a valid position.');
    if (!fullName || fullName.length > 150) errors.push('Full name is required.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200)
      errors.push('A valid email address is required.');
    if (!phone || phone.length > 40) errors.push('Phone number is required.');
    if (introduction.length > 5000) errors.push('Introduction is too long.');
    if (additionalInfo.length > 5000) errors.push('Additional information is too long.');
    if (errors.length) {
      return new Response(JSON.stringify({ error: errors.join(' ') }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const isLead = position.startsWith('Lead Electrician');
    if (isLead && !stateApplyingFor) {
      return new Response(JSON.stringify({ error: 'State applying for is required.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = getSupabase();

    // Flood protection across both form types
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count: appCount } = await supabase
      .from('job_applications')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', tenMinutesAgo);
    if ((appCount ?? 0) >= 20) {
      return new Response(
        JSON.stringify({
          error: 'We are receiving an unusually high volume of applications. Please try again later.',
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Duplicate submission guard: same email + position within 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { count: dupCount } = await supabase
      .from('job_applications')
      .select('id', { count: 'exact', head: true })
      .eq('email', email)
      .eq('position', position)
      .gte('created_at', fiveMinutesAgo);
    if ((dupCount ?? 0) > 0) {
      return new Response(
        JSON.stringify({
          error: 'We already received an application for this position from this email address a moment ago.',
        }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Resume upload to private storage
    let resumePath: string | null = null;
    let resumeBytes: Uint8Array | null = null;
    let resumeFileName = '';
    let resumeMime = '';
    const file = form.get('resume');
    if (!(file instanceof File) || file.size === 0) {
      return new Response(
        JSON.stringify({ error: 'A resume file is required.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    if (file instanceof File && file.size > 0) {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      if (!ALLOWED_EXTENSIONS.includes(ext) || !ALLOWED_MIME.includes(file.type)) {
        return new Response(
          JSON.stringify({ error: 'Resume must be a PDF or DOC/DOCX file.' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (file.size > MAX_RESUME_BYTES) {
        return new Response(
          JSON.stringify({ error: 'Resume file is too large (maximum 10 MB).' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      resumeBytes = new Uint8Array(await file.arrayBuffer());
      resumeFileName = file.name;
      resumeMime = file.type;
      resumePath = `applications/${crypto.randomUUID()}-${resumeFileName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(resumePath, resumeBytes, { contentType: resumeMime });
      if (uploadError) throw uploadError;
    }

    const { error: insertError } = await supabase.from('job_applications').insert({
      position,
      full_name: fullName,
      email,
      phone,
      state_applying_for: stateApplyingFor || null,
      city: city || null,
      years_experience: yearsExperience || null,
      license_certification: licenseCertification || null,
      specializations: specializations || null,
      willing_to_travel: willingToTravel || null,
      states_for_travel: statesForTravel || null,
      introduction: introduction || null,
      additional_info: additionalInfo || null,
      resume_path: resumePath,
    });
    if (insertError) throw insertError;

    // Email delivery requires a configured Resend key; the application is safely stored either way.
    if (!resendKey) {
      return new Response(JSON.stringify({ ok: true, emailPending: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const submissionDate = new Date().toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    const rows: Array<[string, string]> = [
      ['Position', position],
      ['Full Name', fullName],
      ['Email', email],
      ['Phone', phone],
    ];
    if (isLead) {
      rows.push(
        ['State Applying For', stateApplyingFor || '—'],
        ['City', city || '—'],
        ['Years of Experience', yearsExperience || '—'],
        ['License / Certification', licenseCertification || '—'],
        ['Specializations', specializations || '—'],
        ['Willing to Travel', willingToTravel || '—'],
        ['States Available for Travel', statesForTravel || '—']
      );
    } else {
      rows.push(['State', stateApplyingFor || '—'], ['City', city || '—']);
    }
    rows.push(['Submitted', submissionDate]);

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
        <h2 style="color: #1f2f43; border-bottom: 3px solid #f59e0b; padding-bottom: 8px;">
          New Job Application — ${escapeHtml(position)}
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          ${rows.map(([k, v]) => row(k, v)).join('')}
        </table>
        <h3 style="color: #1f2f43; margin-top: 20px;">${isLead ? 'Professional Introduction' : 'Self-Introduction'}</h3>
        <p style="background: #f3f6fa; padding: 14px; color: #1f2f43; white-space: pre-wrap;">${escapeHtml(introduction || '—')}</p>
        ${additionalInfo ? `<h3 style="color: #1f2f43;">Additional Information</h3><p style="background: #f3f6fa; padding: 14px; color: #1f2f43; white-space: pre-wrap;">${escapeHtml(additionalInfo)}</p>` : ''}
        ${resumePath ? `<p style="color: #48759c; font-size: 13px;">The applicant's resume (${escapeHtml(resumeFileName)}) is attached to this email and stored securely.</p>` : '<p style="color: #48759c; font-size: 13px;">No resume was attached.</p>'}
      </div>`;

    const resend = new Resend(resendKey);

    const attachments =
      resumeBytes && resumeMime
        ? [
            {
              filename: resumeFileName,
              content: arrayBufferToBase64(resumeBytes.buffer as ArrayBuffer),
            },
          ]
        : undefined;

    await resend.emails.send({
      from: 'deGraauw Electric Careers <info@degraauwelectric.pro>',
      to: [RECIPIENT],
      reply_to: email,
      subject: `Job Application — ${position} — ${fullName}`,
      html,
      ...(attachments ? { attachments } : {}),
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('submit-application error:', err);
    return new Response(
      JSON.stringify({
        error:
          'Your application could not be submitted right now. Please email info@degraauwelectric.pro directly.',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}
