import React from 'react';
import { motion } from 'framer-motion';
import Section from './Section';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

export default function Projects({ projects, onOpenModal }) {
  const allProjects = projects || [];

  return (
    <Section>
      <div className="mb-8">
        <p
          className="text-xs font-medium tracking-widest uppercase mb-2"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Case Studies
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          <span style={{ color: 'var(--color-accent)', fontSize: '0.75em', marginRight: '0.5rem' }}>
            04
          </span>
          Curated{' '}
          <span className="italic" style={{ color: 'var(--color-primary)' }}>
            Work
          </span>
        </h2>
      </div>

      <div className="space-y-8">
        {allProjects.map((project, index) => {
          const isFeatured = project.featured === true;
          const isLink = isFeatured || (project.link && project.link.startsWith('http'));
          const num = String(index + 1).padStart(2, '0');

          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group glass-card rounded-2xl overflow-hidden cursor-pointer"
              style={
                isFeatured
                  ? {
                      background:
                        'linear-gradient(135deg, rgba(var(--color-accent-rgb), 0.06), rgba(var(--color-primary-rgb), 0.03))',
                      border: '1px solid rgba(var(--color-accent-rgb), 0.15)',
                    }
                  : {}
              }
              onClick={() => onOpenModal?.(project)}
            >
              <div className="flex flex-col md:flex-row">
                {/* Project Header */}
                <div
                  className="relative w-full md:w-80 h-48 md:h-auto flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: isFeatured
                      ? 'linear-gradient(135deg, var(--color-primary), var(--color-accent))'
                      : 'linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.15), rgba(var(--color-accent-rgb), 0.08))',
                  }}
                >
                  {/* Number */}
                  <span
                    className="absolute top-4 left-4 text-sm font-bold opacity-60"
                    style={{ color: isFeatured ? 'white' : 'var(--color-text-muted)' }}
                  >
                    {num}
                  </span>

                  {/* Project Initial */}
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      color: 'white',
                    }}
                  >
                    {project.title.charAt(0)}
                  </div>

                  {/* View Button */}
                  <motion.button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenModal?.(project);
                    }}
                    aria-label={`View details for ${project.title}`}
                    className="absolute bottom-4 right-4 p-2 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white transition-opacity"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <ArrowUpRight size={16} />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      {isFeatured && (
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full mb-2 inline-block"
                          style={{
                            backgroundColor: 'rgba(var(--color-accent-rgb), 0.15)',
                            color: 'var(--color-accent)',
                          }}
                        >
                          Featured
                        </span>
                      )}
                      <h3
                        className="text-xl md:text-2xl font-bold"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <p
                    className="text-sm mb-4 leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {project.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {project.github && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{
                          backgroundColor: 'rgba(var(--color-accent-rgb), 0.1)',
                          color: 'var(--color-accent)',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.github, '_blank');
                        }}
                      >
                        <Github size={12} />
                        Code
                      </motion.button>
                    )}
                    {isLink && project.link && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{
                          backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)',
                          color: 'var(--color-primary)',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.link, '_blank');
                        }}
                      >
                        <ExternalLink size={12} />
                        Live Demo
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Closing card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="rounded-2xl p-8 md:p-10 text-center"
          style={{ border: '2px dashed rgba(var(--color-primary-rgb), 0.35)' }}
        >
          <motion.p
            animate={{ opacity: [1, 0.55, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-xl md:text-2xl font-bold italic"
            style={{ color: 'var(--color-primary)' }}
          >
            This is not the end, more projects to come...
          </motion.p>
        </motion.div>
      </div>
    </Section>
  );
}
