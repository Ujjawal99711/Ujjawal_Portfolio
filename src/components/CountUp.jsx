import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

/**
 * Counts up the number inside a label such as "₹54L MRR" or "10,000 users".
 * Always falls back to the exact original text, so the final value is never altered.
 */
export default function CountUp({ text, duration = 1.2 }) {
  const match = /^([^\d]*)([\d,]+)(.*)$/.exec(text);
  const target = match ? Number(match[2].replace(/,/g, '')) : 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const prefersReducedMotion = useReducedMotion();
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (!match || !isInView || prefersReducedMotion) return undefined;
    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate: (value) => setCurrent(Math.round(value)),
      onComplete: () => setCurrent(null),
    });
    return () => controls.stop();
  }, [isInView, prefersReducedMotion, target, duration]);

  if (!match) return <span>{text}</span>;

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {match[1]}
      {current === null ? match[2] : current.toLocaleString('en-US')}
      {match[3]}
    </span>
  );
}
