import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Briefcase,
  Zap,
  Clock,
  Monitor,
  Cpu,
  Brain,
  Shield,
  Terminal,
  Users,
} from 'lucide-react';

const ICON_MAP = { Code2, Briefcase, Zap, Clock, Monitor, Cpu, Brain, Shield, Terminal, Users };

export default function BentoGrid({ highlights }) {
  const cards = highlights?.cards || [];
  const tools = highlights?.tools || [];

  if (cards.length === 0 && tools.length === 0) return null;

  return (
    <section className="py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {cards.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {cards.map((item, index) => {
              const IconComponent = ICON_MAP[item.icon] || Code2;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="p-2 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: `${item.color}18` }}
                    >
                      <IconComponent size={18} style={{ color: item.color }} />
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-[10px] font-medium uppercase tracking-wider mb-0.5"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="font-semibold text-sm leading-tight"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {item.value}
                      </p>
                      <p
                        className="text-[11px] mt-0.5 leading-snug"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {tools.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="mt-3 glass-card rounded-xl p-3"
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <p
                className="text-[10px] font-medium uppercase tracking-wider"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Daily Tools
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: 'rgba(var(--color-primary-rgb), 0.08)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            {highlights?.toolsNote && (
              <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
                {highlights.toolsNote}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
