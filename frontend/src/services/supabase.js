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

// Verifikasi token reCAPTCHA di server (Supabase Edge Function), bukan di browser.
// Token di-replay ke Google siteverify oleh fungsi `verify-recaptcha`.
export const verifyRecaptchaToken = async (token) => {
  if (!supabase) {
    return { success: false, error: 'Supabase is not configured yet.' };
  }
  const { data, error } = await supabase.functions.invoke('verify-recaptcha', {
    body: { token },
  });
  if (error) {
    return { success: false, error: error.message || 'reCAPTCHA verification failed.' };
  }
  return { success: data.success === true, error: data.success ? null : 'reCAPTCHA verification failed.' };
};

// ── Admin: manajemen pengguna ──
// Mengambil semua profil. Hanya berhasil bila RLS admin sudah diaktifkan (lihat supabase/schema.sql).
export const getAllProfiles = async () => {
  if (!supabase) {
    return { data: [], error: 'Supabase is not configured yet.' };
  }
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, name, avatar_url, role, division, is_active, last_login, created_at')
    .order('created_at', { ascending: false });
  if (error) return { data: [], error: error.message };
  return { data: data || [], error: null };
};

// Admin memperbarui profil pengguna lain: role/division/is_active (email tidak diizinkan).
export const adminUpdateProfile = async (id, { role, division, is_active }) => {
  if (!supabase) {
    return { success: false, error: 'Supabase is not configured yet.' };
  }
  const patch = {};
  if (role !== undefined) patch.role = role;
  if (division !== undefined) patch.division = division || null;
  if (is_active !== undefined) patch.is_active = is_active;
  patch.updated_at = new Date().toISOString();

  const { error } = await supabase
    .from('profiles')
    .update(patch)
    .eq('id', id);
  if (error) return { success: false, error: error.message };
  return { success: true, error: null };
};
