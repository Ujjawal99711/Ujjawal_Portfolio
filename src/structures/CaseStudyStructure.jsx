import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Hero from '../components/Hero';

/**
 * Projects-led structure: the projects section (already a case-study-shaped list with
 * its own heading) renders right after the hero as the primary content. Everything else
 * - About, Experience, Skills, etc. - is secondary, collapsed into an accordion below.
 */
export default function CaseStudyStructure({ config, stats, enabledSections, renderSection }) {
  const [openId, setOpenId] = useState(null);
  const hasProjects = enabledSections.some((s) => s.id === 'projects');
  const secondarySections = enabledSections.filter((s) => s.id !== 'projects');

  return (
    <>
      <Hero config={config} stats={stats} />

      {hasProjects && renderSection('projects')}

      {secondarySections.length > 0 && (
        <section className="py-10 px-6" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="max-w-4xl mx-auto">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: 'var(--color-text-muted)' }}
            >
              More About Me
            </p>
            <div className="space-y-2">
              {secondarySections.map((section) => {
                const isOpen = openId === section.id;
                return (
                  <div
                    key={section.id}
                    className="glass-card rounded-xl overflow-hidden"
                    style={{ borderRadius: '0.75rem' }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : section.id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between px-5 py-4 text-left"
                    >
                      <span
                        className="font-semibold"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {section.navLabel || section.label}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={18} style={{ color: 'var(--color-text-muted)' }} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ overflow: 'hidden' }}
                        >
                          {renderSection(section.id)}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
