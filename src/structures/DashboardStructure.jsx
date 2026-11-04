import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Briefcase,
  Code2,
  BookOpen,
  FolderGit2,
  Award,
  ShieldCheck,
  GraduationCap,
  ArrowUpRight,
} from 'lucide-react';
import Hero from '../components/Hero';
import SectionDetailModal from '../components/SectionDetailModal';

const SECTION_ICONS = {
  about: User,
  experience: Briefcase,
  tech: Code2,
  articles: BookOpen,
  projects: FolderGit2,
  awards: Award,
  certifications: ShieldCheck,
  education: GraduationCap,
};

/**
 * Single-viewport dashboard: a compact hero followed by a grid of section summary
 * cards. Nothing scrolls to a section - every card opens the full section in a modal.
 */
export default function DashboardStructure({
  config,
  stats,
  enabledSections,
  renderSection,
  getSectionTeaser,
}) {
  const [openSection, setOpenSection] = useState(null);
  const activeMeta = enabledSections.find((s) => s.id === openSection);

  return (
    <>
      <Hero config={config} stats={stats} />

      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {enabledSections.map((section, index) => {
            const Icon = SECTION_ICONS[section.id] || FolderGit2;
            const teaser = getSectionTeaser(section.id);
            return (
              <motion.button
                key={section.id}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                onClick={() => setOpenSection(section.id)}
                className="glass-card rounded-2xl p-5 text-left group relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="p-2.5 rounded-xl"
                    style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.12)' }}
                  >
                    <Icon size={20} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
                    style={{ color: 'var(--color-text-muted)' }}
                  />
                </div>
                <h3
                  className="text-base font-bold mb-1"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {section.navLabel || section.label}
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {teaser}
                </p>
              </motion.button>
            );
          })}
        </div>
      </section>

      <SectionDetailModal
        title={activeMeta?.navLabel || activeMeta?.label || ''}
        isOpen={Boolean(openSection)}
        onClose={() => setOpenSection(null)}
      >
        {openSection && renderSection(openSection)}
      </SectionDetailModal>
    </>
  );
}
