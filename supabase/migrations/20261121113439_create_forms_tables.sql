/*
# Create contact submissions and job applications tables

1. New Tables
- `contact_submissions` — stores website contact form submissions.
  - `id` (uuid, primary key)
  - `first_name` (text, not null)
  - `last_name` (text, not null)
  - `email` (text, not null)
  - `phone` (text)
  - `address` (text)
  - `is_new_customer` (text — Yes / No)
  - `message` (text, not null — the visitor inquiry)
  - `created_at` (timestamptz)
- `job_applications` — stores careers application form submissions for both open positions.
  - `id` (uuid, primary key)
  - `position` (text, not null — job title applied for)
  - `full_name` (text, not null)
  - `email` (text, not null)
  - `phone` (text)
  - `state_applying_for` (text)
  - `city` (text)
  - `years_experience` (text)
  - `license_certification` (text)
  - `specializations` (text)
  - `willing_to_travel` (text — Yes / No)
  - `states_for_travel` (text)
  - `introduction` (text — brief professional introduction)
  - `additional_info` (text)
  - `resume_path` (text — path of the uploaded resume in private storage)
  - `created_at` (timestamptz)

2. Security
- RLS enabled on both tables.
- Public website visitors (anon) may INSERT submissions only — no reading, updating, or deleting.
- No public SELECT: applicant and inquiry data stays private; the company reads it via service role / edge functions.
- Grants: INSERT to anon + authenticated; full access to service_role for the email edge functions.
- Resume files live in a private storage bucket; uploads allowed, downloads restricted to service role.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  address text,
  is_new_customer text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  position text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  state_applying_for text,
  city text,
  years_experience text,
  license_certification text,
  specializations text,
  willing_to_travel text,
  states_for_travel text,
  introduction text,
  additional_info text,
  resume_path text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON contact_submissions TO anon, authenticated;
GRANT INSERT ON job_applications TO anon, authenticated;
GRANT ALL ON contact_submissions TO service_role;
GRANT ALL ON job_applications TO service_role;

DROP POLICY IF EXISTS "public can submit contact form" ON contact_submissions;
CREATE POLICY "public can submit contact form"
ON contact_submissions FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "public can submit job application" ON job_applications;
CREATE POLICY "public can submit job application"
ON job_applications FOR INSERT
TO anon, authenticated
WITH CHECK (true);
