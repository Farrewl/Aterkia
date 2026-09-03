import React, { useEffect, useRef } from 'react';

// Google reCAPTCHA v2 checkbox widget.
// Script dimuat statis di index.html. `onToken(token)` dipanggil saat captcha
// terselesaikan; `onExpire` me-reset token menjadi kosong.
export default function RecaptchaWidget({ siteKey, onToken, onError, className = '' }) {
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
        onErrorRef.current?.(new Error('Security check gagal dimuat. Periksa konfigurasi Google reCAPTCHA (Site Key) atau jaringan Anda.'));
      }
    }, 5000);

    const render = () => {
      if (!window.grecaptcha || !containerRef.current) return;
      if (widgetIdRef.current != null) return;
      clearTimeout(failTimeout);
      widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
        sitekey: siteKey,
        theme: 'dark',
        callback: (token) => { onTokenRef.current?.(token); },
        'expired-callback': () => { onTokenRef.current?.(''); },
        'error-callback': () => { onErrorRef.current?.(new Error('reCAPTCHA challenge failed. Please try again.')); },
      });
    };

    // recaptcha/api.js dimuat dengan onload=onRecaptchaLoad (lihat index.html).
    // Setelah load, grecaptcha siap; jika sudah siap langsung render.
    if (window.grecaptcha && window.grecaptcha.render) {
      render();
    } else {
      window.addEventListener('recaptcha-load', render, { once: true });
    }

    return () => {
      clearTimeout(failTimeout);
      // reCAPTCHA tidak punya remove/reset global yang stabil; widget dilepas
      // dengan mengosongkan container. Token di-reset via expired-callback.
      if (containerRef.current) containerRef.current.innerHTML = '';
      widgetIdRef.current = null;
    };
  }, [siteKey]);

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-[300px] flex justify-center ${className}`}
    />
  );
}
