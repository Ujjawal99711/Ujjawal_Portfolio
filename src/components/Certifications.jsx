import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import Section from './Section';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

export default function Certifications({ certifications }) {
  return (
    <Section>
      <div className="flex items-center gap-3 mb-6">
        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
          <Award style={{ color: 'var(--color-primary)' }} size={32} />
        </motion.div>
        <h2 className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
          <span style={{ color: 'var(--color-accent)', fontSize: '0.75em', marginRight: '0.5rem' }}>
            07
          </span>
          Certifications
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              {cert.logo && (
                <motion.img
                  src={cert.logo}
                  alt={cert.name}
                  className="w-12 h-12 object-contain rounded"
                  whileHover={{ scale: 1.1 }}
                />
              )}
              <div className="flex-1">
                <h3
                  className="font-semibold text-sm mb-1"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {cert.name}
                </h3>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {cert.issuer}
                </p>
                {cert.date && (
                  <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                    {cert.date}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
