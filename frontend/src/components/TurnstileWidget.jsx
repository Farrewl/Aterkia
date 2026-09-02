import React, { useEffect, useRef } from 'react';

// Cloudflare Turnstile widget. Script dimuat statis di index.html.
// `onToken(token)` dipanggil saat captcha terselesaikan; `onExpire` untuk reset kosong.
export default function TurnstileWidget({ siteKey, onToken, onError, className = '' }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const onTokenRef = useRef(onToken);
  const onErrorRef = useRef(onError);

  onTokenRef.current = onToken;
  onErrorRef.current = onError;

  useEffect(() => {
    if (!siteKey || !containerRef.current) return undefined;

    const failTimeout = setTimeout(() => {
      if (widgetIdRef.current == null && containerRef.current) {
        onErrorRef.current?.(new Error('Ad blocker terdeteksi. Matikan shields atau lanjutkan tanpa verifikasi.'));
      }
    }, 5000);

    const render = () => {
      if (!window.turnstile || !containerRef.current) return;
      if (widgetIdRef.current != null) return;
      clearTimeout(failTimeout);
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: 'dark',
        callback: (token) => { onTokenRef.current?.(token); },
        'expired-callback': () => { widgetIdRef.current = null; onTokenRef.current?.(''); },
        'error-callback': () => { onErrorRef.current?.(new Error('Turnstile challenge failed. Please try again.')); },
      });
    };

    if (window.turnstile) {
      render();
    } else {
      window.addEventListener('turnstile-load', render, { once: true });
    }

    return () => {
      clearTimeout(failTimeout);
      if (widgetIdRef.current != null && window.turnstile) {
        try { window.turnstile.remove(widgetIdRef.current); } catch { /* noop */ }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  return <div ref={containerRef} className={className} />;
}