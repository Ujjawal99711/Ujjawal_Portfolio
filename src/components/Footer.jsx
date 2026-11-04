import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer({ config }) {
  const socialLinks = [
    {
      href: `https://github.com/${config.personal.github}`,
      label: 'GitHub',
      icon: <Github size={20} />,
    },
    {
      href: `https://www.linkedin.com/in/${config.personal.linkedin}`,
      label: 'LinkedIn',
      icon: <Linkedin size={20} />,
    },
    {
      href: `mailto:${config.personal.email}`,
      label: 'Email',
      icon: <Mail size={20} />,
    },
  ];

  return (
    <footer className="footer-border py-8 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-1"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Built with <Heart size={14} style={{ color: '#f87171' }} className="fill-current" /> by{' '}
            {config.personal.name}
          </motion.p>

          <div className="flex gap-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.2, y: -3 }}
                className="p-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)',
                  color: 'var(--color-primary)',
                }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
