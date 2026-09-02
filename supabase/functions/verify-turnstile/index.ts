// Cloudflare Turnstile server-side verification.
// Deploy ke Supabase:  supabase functions deploy verify-turnstile
// Lalu set secret:     supabase secrets set TURNSTILE_SECRET_KEY=<your-secret-key>
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { token } = await req.json();
    if (!token) {
      return new Response(JSON.stringify({ success: false, error: 'missing token' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const secret = Deno.env.get('TURNSTILE_SECRET_KEY');
    if (!secret) {
      return new Response(JSON.stringify({ success: false, error: 'TURNSTILE_SECRET_KEY not set' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const formData = new URLSearchParams();
    formData.append('secret', secret);
    formData.append('response', token);
    // IP opsional untuk deteksi abuse — isi bila ingin mengikat ke IP klien.
    // formData.append('remoteip', req.headers.get('x-forwarded-for') || '');

    const res = await fetch(VERIFY_URL, { method: 'POST', body: formData });
    const result = await res.json();

    return new Response(JSON.stringify({ success: result.success === true, ...result }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});