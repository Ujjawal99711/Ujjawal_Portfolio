import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Star, Crown, Sparkles } from 'lucide-react';
import Section from './Section';

const AWARD_ICONS = [Trophy, Medal, Award, Star, Crown, Sparkles];

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

export default function Awards({ awards }) {
  return (
    <Section>
      <div className="flex items-center gap-3 mb-8">
        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
          <Trophy style={{ color: '#fcd34d' }} size={32} />
        </motion.div>
        <h2 className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
          <span style={{ color: 'var(--color-accent)', fontSize: '0.75em', marginRight: '0.5rem' }}>
            06
          </span>
          Awards & Recognition
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-4"
      >
        {awards.map((award, index) => {
          const IconComponent = AWARD_ICONS[index % AWARD_ICONS.length];
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card rounded-xl p-5 overflow-hidden relative"
            >
              {/* Background accent */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(252, 211, 77, 0.15), transparent)',
                }}
              />

              <div className="relative">
                <div className="flex items-start gap-4">
                  {/* Badge */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #fcd34d, #f59e0b)',
                      boxShadow: '0 4px 15px rgba(252, 211, 77, 0.3)',
                    }}
                  >
                    <IconComponent size={24} color="#78350f" />
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="font-bold mb-1" style={{ color: 'var(--color-primary)' }}>
                      {award.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: 'rgba(252, 211, 77, 0.15)',
                          color: '#fcd34d',
                        }}
                      >
                        {award.year}
                      </span>
                      {award.quarter && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)',
                            color: 'var(--color-text-muted)',
                          }}
                        >
                          {award.quarter}
                        </span>
                      )}
                      {award.company && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: 'rgba(var(--color-accent-rgb), 0.1)',
                            color: 'var(--color-accent)',
                          }}
                        >
                          {award.company}
                        </span>
                      )}
                    </div>
                    {award.description && (
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        {award.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
