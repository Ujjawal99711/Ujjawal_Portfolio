import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, BookOpen } from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 300 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.2 },
  },
};

export default function ProjectModal({ project, isOpen, onClose }) {
  const modalRef = useFocusTrap(isOpen, onClose);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: 'var(--color-overlay)', backdropFilter: 'blur(8px)' }}
        >
          <motion.div
            ref={modalRef}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            tabIndex={-1}
            className="glass-card rounded-2xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            style={{ transform: 'none' }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2
                  id="project-modal-title"
                  className="text-2xl font-bold mb-2"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {project.title}
                </h2>
                {project.featured && (
                  <span
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: 'rgba(var(--color-accent-rgb), 0.15)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    Featured Project
                  </span>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                aria-label="Close project details"
                className="p-2 rounded-lg"
                style={{
                  backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)',
                  color: 'var(--color-text-muted)',
                }}
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Description */}
            <p className="mb-6 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {project.description}
            </p>

            {/* Key Features */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div className="mb-6">
                <h3
                  className="text-sm font-semibold mb-3 uppercase tracking-wider"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Key Features
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.keyFeatures.map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full text-sm"
                      style={{
                        backgroundColor: 'rgba(var(--color-accent-rgb), 0.1)',
                        color: 'var(--color-accent)',
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Start */}
            {project.quickStart && (
              <div
                className="rounded-xl p-5 mb-6"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <h3
                  className="text-sm font-semibold mb-3 flex items-center gap-2"
                  style={{ color: 'var(--color-accent)' }}
                >
                  <BookOpen size={16} />
                  {project.quickStart.title}
                </h3>
                <ol
                  className="text-sm space-y-2 ml-4 list-decimal"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {project.quickStart.steps?.map((step, i) => (
                    <li key={i}>
                      {step.text}
                      {step.code && (
                        <code
                          className="px-2 py-1 rounded ml-1 text-xs"
                          style={{
                            backgroundColor: 'rgba(var(--color-accent-rgb), 0.1)',
                            color: 'var(--color-accent)',
                          }}
                        >
                          {step.code}
                        </code>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Links */}
            <div className="flex gap-3 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: '#0f172a',
                  }}
                >
                  <Github size={16} />
                  View on GitHub
                </motion.a>
              )}
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold"
                  style={{
                    backgroundColor: 'rgba(var(--color-accent-rgb), 0.15)',
                    color: 'var(--color-accent)',
                    border: '1px solid rgba(var(--color-accent-rgb), 0.3)',
                  }}
                >
                  <ExternalLink size={16} />
                  Live Demo
                </motion.a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
