import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import Section from './Section';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function Education({ education }) {
  return (
    <Section>
      <div className="flex items-center gap-3 mb-8">
        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
          <GraduationCap style={{ color: 'var(--color-primary)' }} size={32} />
        </motion.div>
        <h2 className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
          <span style={{ color: 'var(--color-accent)', fontSize: '0.75em', marginRight: '0.5rem' }}>
            05
          </span>
          Education
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-4"
      >
        {education.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-card rounded-xl p-6 overflow-hidden relative"
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.12), transparent)',
              }}
            />

            <div className="relative">
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                    boxShadow: '0 4px 15px rgba(var(--color-primary-rgb), 0.3)',
                  }}
                >
                  <GraduationCap size={24} color="#ffffff" />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold mb-1" style={{ color: 'var(--color-primary)' }}>
                    {item.degree}
                  </h3>
                  <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-accent)' }}>
                    {item.institution}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={12} style={{ color: 'var(--color-text-muted)' }} />
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {item.period}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.focus.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
