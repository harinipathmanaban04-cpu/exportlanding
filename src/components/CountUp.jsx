import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../hooks/useReducedMotion';

/** Counts from 0 to `end` once the number is mostly in view. */
export default function CountUp({ end, duration = 900 }) {
  const ref = useRef(null);
  const skip = prefersReducedMotion() || !('IntersectionObserver' in window);
  const [value, setValue] = useState(skip ? end : 0);

  useEffect(() => {
    if (skip || !ref.current) return;
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        let t0 = null;
        const frame = (ts) => {
          t0 = t0 ?? ts;
          const p = Math.min(1, (ts - t0) / duration);
          setValue(Math.round(end * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(frame);
        };
        raf = requestAnimationFrame(frame);
      },
      { threshold: 0.6 }
    );
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, duration, skip]);

  return <span ref={ref}>{value}</span>;
}
