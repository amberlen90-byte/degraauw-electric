/*
# Tighten public submission and resume upload access

1. Purpose
- Restrict the public website roles to the only database action they need: inserting contact inquiries and job applications.
- Restrict public resume uploads to the `applications/` folder in the private resumes bucket.

2. Modified tables
- `contact_submissions`: revoke SELECT, UPDATE, and DELETE from `anon` and `authenticated`; retain INSERT.
- `job_applications`: revoke SELECT, UPDATE, and DELETE from `anon` and `authenticated`; retain INSERT.

3. Modified storage policy
- `storage.objects`: public resume uploads must use bucket `resumes` and an object name beginning with `applications/`.
- Service-role management remains unchanged for company-side processing.

4. Security notes
- Row-level security remains enabled and public visitors still have no read, edit, or delete access.
- This migration does not remove or alter any stored submissions or resume files.
*/

REVOKE SELECT, UPDATE, DELETE ON contact_submissions FROM anon, authenticated;
REVOKE SELECT, UPDATE, DELETE ON job_applications FROM anon, authenticated;

DROP POLICY IF EXISTS "public can upload resumes" ON storage.objects;
CREATE POLICY "public can upload resumes"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'resumes' AND name LIKE 'applications/%');