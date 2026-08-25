import React, { useRef, useState, useEffect, useCallback } from 'react';

/**
 * TiltCard — subtle 3D tilt following the cursor.
 * Transform-only (no layout), spring-free (CSS transition) for performance.
 */
export function TiltCard({ children, className = '', maxTilt = 5, style = {}, ...props }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const rafRef = useRef(0);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: -py * maxTilt * 2, y: px * maxTilt * 2 });
    });
  }, [maxTilt]);

  const handleLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transition: 'transform 0.25s ease-out',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Spotlight — cursor-following radial glow for dark glass cards.
 * Sets --mx/--my CSS vars consumed by the .spotlight::after gradient.
 */
export function Spotlight({ children, className = '', color = '56,189,248', opacity = 0.14, ...props }) {
  const ref = useRef(null);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    el.style.setProperty('--spot-op', opacity);
  }, [opacity]);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--spot-op', '0');
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`spotlight ${className}`}
      style={{ '--spot-c': color, position: 'relative' }}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * CountUp — animates a number from 0 to `end` when scrolled into view.
 * Uses IntersectionObserver + rAF; respects reduced-motion via CSS-safe easing only.
 */
export function CountUp({ end, duration = 1400, suffix = '', prefix = '', className = '' }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setValue(end); return; }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
          setValue(Math.round(eased * end));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{value}{suffix}
    </span>
  );
}

/**
 * useReveal — attaches an IntersectionObserver adding `.visible`
 * to elements registered via the returned callback ref.
 */
export function useReveal() {
  const refs = useRef([]);

  const addRef = useCallback((el) => {
    if (el && !refs.current.includes(el)) refs.current.push(el);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    refs.current.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return addRef;
}
