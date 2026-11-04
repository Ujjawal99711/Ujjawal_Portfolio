import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Briefcase, Flag } from 'lucide-react';
import CountUp from './CountUp';
import Section from './Section';

const AVATAR_RADIUS = 18;

/** Oldest role first, as one flat list of stops: each company, then its wins. */
function buildStops(experience) {
  const stops = [];
  let winCount = 0;
  [...experience].reverse().forEach((exp) => {
    stops.push({ type: 'stage', exp });
    (exp.wins || []).forEach((win) => {
      stops.push({ type: 'win', win, side: winCount % 2 === 0 ? 'left' : 'right' });
      winCount += 1;
    });
  });
  stops.push({ type: 'end' });
  return stops;
}

/** Smooth vertical curve through every stop, so the path weaves between the wins. */
function buildPath(points) {
  if (points.length === 0) return '';
  return points.reduce((d, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = points[i - 1];
    const midY = (prev.y + point.y) / 2;
    return `${d} C ${prev.x} ${midY}, ${point.x} ${midY}, ${point.x} ${point.y}`;
  }, '');
}

function Dot({ stopRef, reached, className }) {
  return (
    <span
      ref={stopRef}
      aria-hidden="true"
      className={`absolute z-20 w-3.5 h-3.5 rounded-full -translate-x-1/2 -translate-y-1/2 ${className}`}
      style={{
        backgroundColor: reached ? 'var(--color-primary)' : 'var(--color-bg-primary)',
        border: '2px solid var(--color-primary)',
        boxShadow: reached ? '0 0 0 5px rgba(var(--color-primary-rgb), 0.18)' : 'none',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
      }}
    />
  );
}

function Stage({ exp, stopRef, reached }) {
  return (
    <li className="relative pt-8 pb-5 pl-12 md:pl-0">
      <Dot stopRef={stopRef} reached={reached} className="left-5 top-8 md:left-1/2" />
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative rounded-2xl p-5 md:p-6 md:max-w-xl md:mx-auto md:text-center"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border-strong)',
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: 'var(--color-accent-dark)' }}
        >
          {exp.chapter}
        </p>
        <h3 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
          {exp.company}
        </h3>
        <p className="font-semibold mt-1" style={{ color: 'var(--color-text-primary)' }}>
          {exp.roles.map((role) => role.title).join(', ')}
        </p>
        <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>
          {exp.summary}
        </p>
      </motion.div>
    </li>
  );
}

function Win({ win, side, stopRef, reached }) {
  const isLeft = side === 'left';
  return (
    <li className="relative py-2 pl-12 md:pl-0 md:grid md:grid-cols-[1fr_96px_1fr]">
      <Dot
        stopRef={stopRef}
        reached={reached}
        className={`left-5 top-1/2 ${isLeft ? 'md:left-[calc(50%-24px)]' : 'md:left-[calc(50%+24px)]'}`}
      />
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={isLeft ? 'md:col-start-1 md:text-right' : 'md:col-start-3'}
      >
        <div className="glass-card rounded-xl p-4 md:p-5">
          <p className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
            <CountUp text={win.value} />
          </p>
          <p className="text-sm mt-1 leading-snug" style={{ color: 'var(--color-text-secondary)' }}>
            {win.label}
          </p>
        </div>
      </motion.div>
    </li>
  );
}

function End({ stopRef, reached }) {
  return (
    <li className="relative pt-8 pb-2 pl-12 md:pl-0 md:text-center">
      <Dot stopRef={stopRef} reached={reached} className="left-5 top-8 md:left-1/2" />
      <p
        className="relative inline-flex items-center gap-2 mt-3 text-sm font-semibold px-4 py-2 rounded-full"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border-strong)',
          color: 'var(--color-primary)',
        }}
      >
        <Flag size={14} />
        The journey continues
      </p>
    </li>
  );
}

export default function Experience({ experience }) {
  const stops = buildStops(experience);
  const containerRef = useRef(null);
  const stopRefs = useRef([]);
  const trackRef = useRef(null);
  const walkedRef = useRef(null);
  const travellerRef = useRef(null);
  const pointsRef = useRef([]);

  const [path, setPath] = useState('');
  const [reachedCount, setReachedCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 65%'],
  });

  const moveTraveller = useCallback((progress) => {
    const track = trackRef.current;
    if (!track || !walkedRef.current || !travellerRef.current) return;
    const length = track.getTotalLength();
    if (!length) return;

    const point = track.getPointAtLength(length * progress);
    walkedRef.current.style.strokeDasharray = `${length}`;
    walkedRef.current.style.strokeDashoffset = `${length * (1 - progress)}`;
    travellerRef.current.setAttribute('transform', `translate(${point.x} ${point.y})`);

    const reached = pointsRef.current.filter((stop) => stop.y <= point.y + 1).length;
    setReachedCount(reached);
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', moveTraveller);

  // The path is drawn from where the stops really landed, so it fits every screen width.
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const measure = () => {
      const box = container.getBoundingClientRect();
      const points = stopRefs.current.filter(Boolean).map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left - box.left + rect.width / 2,
          y: rect.top - box.top + rect.height / 2,
        };
      });
      pointsRef.current = points;
      setPath(buildPath(points));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [experience]);

  useLayoutEffect(() => {
    moveTraveller(scrollYProgress.get());
  }, [path, moveTraveller, scrollYProgress]);

  return (
    <Section>
      <div className="flex items-center gap-3 mb-2">
        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
          <Briefcase style={{ color: 'var(--color-primary)' }} size={32} />
        </motion.div>
        <h2 className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
          <span style={{ color: 'var(--color-accent)', fontSize: '0.75em', marginRight: '0.5rem' }}>
            02
          </span>
          Experience
        </h2>
      </div>
      <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
        From analyst to AI product manager, and the wins along the way.
      </p>

      <div ref={containerRef} className="relative">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <clipPath id="journey-avatar-clip">
              <circle r={AVATAR_RADIUS} />
            </clipPath>
          </defs>
          <path
            ref={trackRef}
            d={path}
            fill="none"
            stroke="var(--color-border-strong)"
            strokeWidth="2"
            strokeDasharray="4 8"
            strokeLinecap="round"
          />
          <path
            ref={walkedRef}
            d={path}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        <ol className="relative list-none m-0 p-0">
          {stops.map((stop, index) => {
            const stopRef = (el) => {
              stopRefs.current[index] = el;
            };
            const reached = index < reachedCount;

            if (stop.type === 'stage') {
              return <Stage key={index} exp={stop.exp} stopRef={stopRef} reached={reached} />;
            }
            if (stop.type === 'win') {
              return (
                <Win
                  key={index}
                  win={stop.win}
                  side={stop.side}
                  stopRef={stopRef}
                  reached={reached}
                />
              );
            }
            return <End key={index} stopRef={stopRef} reached={reached} />;
          })}
        </ol>

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-30"
          aria-hidden="true"
        >
          <g ref={travellerRef}>
            <circle r={AVATAR_RADIUS + 3} fill="var(--color-primary)" />
            <image
              href={`${import.meta.env.BASE_URL}images/profile.jpg`}
              x={-AVATAR_RADIUS}
              y={-AVATAR_RADIUS}
              width={AVATAR_RADIUS * 2}
              height={AVATAR_RADIUS * 2}
              clipPath="url(#journey-avatar-clip)"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        </svg>
      </div>
    </Section>
  );
}
