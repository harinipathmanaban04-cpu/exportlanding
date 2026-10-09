import { useEffect, useRef, useState } from 'react';

/** Fades/slides its content in the first time it scrolls into view. */
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(() => !('IntersectionObserver' in window));

  useEffect(() => {
    if (shown || !ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [shown]);

  return (
    <Tag ref={ref} className={`${className} rv${shown ? ' in' : ''}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
