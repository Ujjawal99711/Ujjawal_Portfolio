import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { User, Brain, Shield, Terminal, Users, ArrowRight } from 'lucide-react';
import Section from './Section';

const ICON_MAP = { Brain, Shield, Terminal, Users };

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About({ aboutMe }) {
  if (!aboutMe) return null;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-8"
      >
        <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.5 }}>
          <User style={{ color: 'var(--color-primary)' }} size={28} />
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
          <span style={{ color: 'var(--color-accent)', fontSize: '0.75em', marginRight: '0.5rem' }}>
            01
          </span>
          About Me
        </h2>
      </motion.div>

      {/* Bio - split into two flowing paragraphs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="glass-card rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden"
      >
        {/* Subtle gradient accent */}
        <div
          className="absolute top-0 left-0 w-full h-1"
          style={{
            background:
              'linear-gradient(90deg, var(--color-primary), var(--color-accent), transparent)',
          }}
        />
        <div className="space-y-4">
          {(aboutMe.story || [aboutMe.fullBio]).map((paragraph, paragraphIndex) => (
            <motion.p
              key={paragraph}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: paragraphIndex * 0.12 }}
              className="leading-relaxed text-sm md:text-base"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {paragraph.split(/(\*\*[^*]+\*\*)/).map((part, index) =>
                part.startsWith('**') ? (
                  <strong
                    key={index}
                    className="font-semibold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {part.slice(2, -2)}
                  </strong>
                ) : (
                  part
                ),
              )}
            </motion.p>
          ))}
        </div>
      </motion.div>

      {/* What I Do - 4 pillars */}
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid md:grid-cols-2 gap-4 mb-8"
      >
        {aboutMe.whatIdo.map((item, index) => {
          const IconComponent = ICON_MAP[item.icon] || Brain;
          return (
            <motion.div
              key={item.title}
              variants={fadeUp}
              whileHover={{
                y: -6,
                boxShadow: `0 20px 40px ${item.color}15`,
                transition: { duration: 0.3 },
              }}
              className="glass-card rounded-2xl p-5 relative overflow-hidden cursor-default group"
              style={{ borderTop: `2px solid ${item.color}` }}
            >
              {/* Hover glow */}
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                style={{ background: item.color }}
              />

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    className="p-2.5 rounded-xl"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <IconComponent size={20} style={{ color: item.color }} />
                  </motion.div>
                  <h3
                    className="text-base font-bold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {item.title}
                  </h3>
                </div>

                <ul className="space-y-2.5">
                  {item.capabilities.map((cap, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                      className="flex items-start gap-2.5 text-xs md:text-sm"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      <ArrowRight
                        size={14}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: item.color }}
                      />
                      <span>{cap}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Philosophy - single line */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass-card rounded-2xl p-5 text-center relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
          }}
        />
        <p
          className="relative text-sm md:text-base italic leading-relaxed max-w-3xl mx-auto"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          "{aboutMe.philosophy}"
        </p>
      </motion.div>
    </Section>
  );
}
