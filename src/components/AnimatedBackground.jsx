import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const orbConfig = [
  {
    id: 1,
    size: 320,
    color: 'var(--color-accent)',
    opacity: 0.06,
    initialX: -80,
    initialY: 100,
    parallaxSpeed: 0.15,
    floatDuration: 15,
    floatX: [0, 30, -20, 0],
    floatY: [0, -40, 20, 0],
  },
  {
    id: 2,
    size: 280,
    color: 'var(--color-primary)',
    opacity: 0.04,
    initialX: 0.7,
    initialY: 0.3,
    parallaxSpeed: 0.1,
    floatDuration: 18,
    floatX: [0, -25, 15, 0],
    floatY: [0, 35, -25, 0],
  },
  {
    id: 3,
    size: 200,
    color: 'var(--color-accent)',
    opacity: 0.05,
    initialX: 0.25,
    initialY: 0.75,
    parallaxSpeed: 0.08,
    floatDuration: 20,
    floatX: [0, 20, -15, 0],
    floatY: [0, -30, 20, 0],
  },
  {
    id: 4,
    size: 240,
    color: 'var(--color-primary)',
    opacity: 0.03,
    initialX: 0.65,
    initialY: 0.65,
    parallaxSpeed: 0.12,
    floatDuration: 22,
    floatX: [0, -20, 25, 0],
    floatY: [0, 25, -20, 0],
  },
];

export default function AnimatedBackground() {
  const { scrollY } = useScroll();
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {orbConfig.map((orb) => {
        const y = useTransform(scrollY, [0, 1000], [0, -200 * orb.parallaxSpeed]);

        const left = orb.initialX < 1 ? `${orb.initialX * 100}%` : `${orb.initialX}px`;
        const top = orb.initialY < 1 ? `${orb.initialY * 100}%` : `${orb.initialY}px`;

        return (
          <motion.div
            key={orb.id}
            style={{
              position: 'absolute',
              width: orb.size,
              height: orb.size,
              left,
              top,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
              opacity: orb.opacity,
              filter: 'blur(60px)',
              y,
            }}
            animate={{
              x: orb.floatX,
              y: orb.floatY,
              opacity: [orb.opacity, orb.opacity * 1.5, orb.opacity],
            }}
            transition={{
              duration: orb.floatDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
}
