-- Create a public bucket named `Aterkia` in Supabase first.
-- Public URLs are used because Formspree receives file links, not the files.

drop policy if exists "Allow anonymous contact uploads" on storage.objects;
create policy "Allow anonymous contact uploads"
on storage.objects
for insert
to anon
with check (
  bucket_id = 'Aterkia'
  and name like 'contact/%'
  and (metadata->>'mimetype') in (
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/png',
    'image/jpeg',
    'application/zip'
  )
  and coalesce((metadata->>'size')::bigint, 0) <= 26214400
);
