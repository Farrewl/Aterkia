import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const bucket = import.meta.env.VITE_SUPABASE_CONTACT_BUCKET || 'contact-attachments';

const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export { supabase };

export const uploadContactFile = async (file) => {
  if (!supabase) {
    throw new Error('File storage is not configured yet. Please add the Supabase environment variables.');
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
  const path = `contact/${crypto.randomUUID()}-${safeName}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    contentType: file.type,
    upsert: false,
  });

  if (error) throw new Error(`Failed to upload ${file.name}: ${error.message}`);

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return { name: file.name, url: data.publicUrl };
};

// Verifikasi token Turnstile di server (Supabase Edge Function), bukan di browser.
// Token di-replay ke Cloudflare siteverify oleh fungsi `verify-turnstile`.
export const verifyTurnstileToken = async (token) => {
  if (!supabase) {
    return { success: false, error: 'Supabase is not configured yet.' };
  }
  const { data, error } = await supabase.functions.invoke('verify-turnstile', {
    body: { token },
  });
  if (error) {
    return { success: false, error: error.message || 'Turnstile verification failed.' };
  }
  return { success: data.success === true, error: data.success ? null : 'Turnstile verification failed.' };
};
