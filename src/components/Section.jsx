import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(2px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Section({ className = '', children, noAnimation = false }) {
  if (noAnimation) {
    return (
      <section className={`py-8 px-6 ${className}`}>
        <div className="max-w-6xl mx-auto">{children}</div>
      </section>
    );
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={sectionVariants}
      className={`py-8 px-6 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {React.Children.map(children, (child) => (
          <motion.div variants={childVariants}>{child}</motion.div>
        ))}
      </div>
    </motion.section>
  );
}
