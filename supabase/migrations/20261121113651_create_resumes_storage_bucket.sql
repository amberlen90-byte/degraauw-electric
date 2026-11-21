/*
# Create private resumes storage bucket

1. Storage
- New private bucket `resumes` (file size limit 10 MB) for job application resume files.
- Public access explicitly disabled — resumes are only readable by the company via service role.
- Anon/authenticated users may upload only into the `applications/` folder and may never read or list files.
- service_role has full access for the application edge function.

2. Security
- Deny-by-default: no public downloads, no public listing.
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('resumes', 'resumes', false, 10485760)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "public can upload resumes" ON storage.objects;
CREATE POLICY "public can upload resumes"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'resumes' AND name LIKE 'applications/%');

DROP POLICY IF EXISTS "service role manages resumes" ON storage.objects;
CREATE POLICY "service role manages resumes"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'resumes')
WITH CHECK (bucket_id = 'resumes');
