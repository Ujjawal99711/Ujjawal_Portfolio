import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Hero from '../components/Hero';
import BentoGrid from '../components/BentoGrid';

/**
 * The original single-page structure: Hero, optional bento highlights row, then every
 * enabled section either stacked and scrolled to, or swapped as tab panels. `compact`
 * (used by the "resume" structure) trims the decorative bento row for a denser read.
 */
export default function ScrollStructure({
  config,
  stats,
  highlights,
  enabledSections,
  sectionRefs,
  isTabsNav,
  activeSection,
  renderSection,
  compact = false,
}) {
  return (
    <>
      <div ref={(el) => (sectionRefs.current['hero'] = el)}>
        <Hero config={config} stats={stats} />
      </div>

      {!compact && config.bentoGrid?.enabled !== false && <BentoGrid highlights={highlights} />}

      {isTabsNav ? (
        <AnimatePresence mode="wait">
          {activeSection && (
            <motion.div
              key={activeSection}
              id={`panel-${activeSection}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeSection}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {renderSection(activeSection)}
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        enabledSections.map((section) => (
          <div key={section.id} ref={(el) => (sectionRefs.current[section.id] = el)}>
            {renderSection(section.id)}
          </div>
        ))
      )}
    </>
  );
}
