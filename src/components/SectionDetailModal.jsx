import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 26, stiffness: 300 },
  },
  exit: { opacity: 0, scale: 0.97, y: 8, transition: { duration: 0.2 } },
};

/** Generic modal shell used to show a section's full content on top of a dashboard/gallery-style structure. */
export default function SectionDetailModal({ title, isOpen, onClose, children }) {
  const modalRef = useFocusTrap(isOpen, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-4 overflow-y-auto"
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
            aria-labelledby="section-modal-title"
            tabIndex={-1}
            className="glass-card rounded-2xl w-full max-w-3xl my-8"
            style={{ transform: 'none' }}
          >
            <div
              className="flex items-center justify-between px-6 py-4 sticky top-0 z-10"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderBottom: '1px solid var(--color-border)',
                borderTopLeftRadius: 'inherit',
                borderTopRightRadius: 'inherit',
              }}
            >
              <h2
                id="section-modal-title"
                className="text-lg font-bold"
                style={{ color: 'var(--color-accent)' }}
              >
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="p-2 rounded-lg"
                style={{
                  backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)',
                  color: 'var(--color-text-muted)',
                }}
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-2">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
