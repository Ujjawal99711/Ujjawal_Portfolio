import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Brain, Shield, Cloud, Terminal, Eye, Layers } from 'lucide-react';
import {
  SiLangchain,
  SiHuggingface,
  SiOllama,
  SiAnthropic,
  SiGithubcopilot,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiSpringboot,
  SiNodedotjs,
  SiHibernate,
  SiReact,
  SiSelenium,
  SiCypress,
  SiPostman,
  SiCucumber,
  SiJenkins,
  SiGitlab,
  SiGithubactions,
  SiDocker,
  SiKubernetes,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiElasticsearch,
  SiKibana,
  SiGit,
  SiBitbucket,
  SiJira,
  SiConfluence,
  SiJetbrains,
} from 'react-icons/si';
import { FaJava, FaAws, FaMicrosoft } from 'react-icons/fa';
import Section from './Section';

const ICON_MAP = {
  Brain,
  Shield,
  Terminal,
  Cloud,
  Eye,
};

const SKILL_ICONS = {
  langchain: SiLangchain,
  'hugging face': SiHuggingface,
  huggingface: SiHuggingface,
  ollama: SiOllama,
  claude: SiAnthropic,
  'github copilot': SiGithubcopilot,
  python: SiPython,
  java: FaJava,
  javascript: SiJavascript,
  typescript: SiTypescript,
  'spring boot': SiSpringboot,
  'node.js': SiNodedotjs,
  hibernate: SiHibernate,
  reactjs: SiReact,
  react: SiReact,
  selenium: SiSelenium,
  cypress: SiCypress,
  postman: SiPostman,
  cucumber: SiCucumber,
  jenkins: SiJenkins,
  'gitlab ci': SiGitlab,
  'github actions': SiGithubactions,
  docker: SiDocker,
  kubernetes: SiKubernetes,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  redis: SiRedis,
  elasticsearch: SiElasticsearch,
  kibana: SiKibana,
  git: SiGit,
  bitbucket: SiBitbucket,
  jira: SiJira,
  confluence: SiConfluence,
  'intellij idea': SiJetbrains,
  aws: FaAws,
  'microsoft azure': FaMicrosoft,
  azure: FaMicrosoft,
  'azure ai': FaMicrosoft,
  openai: Brain,
  chatgpt: Brain,
};

const FALLBACK_ICONS = {
  rag: Layers,
  depeval: Brain,
  'model context protocol': Layers,
  'local llms': Brain,
  jpa: Code2,
  'rest assured': Code2,
  testng: Shield,
  junit: Shield,
  testcafe: Shield,
  'extent reports': Eye,
  h2: Code2,
  scrum: Layers,
  kanban: Layers,
  'azure devops': FaMicrosoft,
  'azure boards': FaMicrosoft,
  playwright: Shield,
  'vs code': Code2,
};

function getSkillIcon(name) {
  const lower = name.toLowerCase();
  if (SKILL_ICONS[lower]) return SKILL_ICONS[lower];
  for (const [key, Icon] of Object.entries(FALLBACK_ICONS)) {
    if (lower.includes(key)) return Icon;
  }
  return null;
}

function SkillIcon({ name, size = 13, style }) {
  const Icon = getSkillIcon(name);
  if (!Icon) return null;
  return <Icon size={size} style={style} />;
}

export default function TechStack({ techStacks }) {
  const [activeExpertise, setActiveExpertise] = useState(null);

  const expertiseAreas = techStacks?.expertise || [];

  const totalSkills = useMemo(() => {
    return expertiseAreas.reduce((sum, area) => {
      const catSkills = Object.values(area.categories).reduce((s, sk) => s + sk.length, 0);
      return sum + catSkills;
    }, 0);
  }, [expertiseAreas]);

  const expandedArea = activeExpertise
    ? expertiseAreas.find((a) => a.id === activeExpertise)
    : null;

  return (
    <Section>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            <Code2 style={{ color: 'var(--color-primary)' }} size={28} />
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
            <span
              style={{ color: 'var(--color-accent)', fontSize: '0.75em', marginRight: '0.5rem' }}
            >
              03
            </span>
            What I Work With
          </h2>
        </div>
        <p className="text-sm ml-11" style={{ color: 'var(--color-text-muted)' }}>
          {totalSkills} technologies across {expertiseAreas.length} domains, each chosen for a
          purpose
        </p>
      </div>

      {/* Expertise Cards */}
      <div className="space-y-4">
        {expertiseAreas.map((area, index) => {
          const IconComponent = ICON_MAP[area.icon] || Code2;
          const isExpanded = activeExpertise === area.id;
          const categories = Object.entries(area.categories);
          const skillCount = categories.reduce((s, [, sk]) => s + sk.length, 0);

          return (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-card rounded-xl overflow-hidden"
              style={{
                borderLeft: `3px solid ${area.color}`,
              }}
            >
              {/* Area Header - clickable */}
              <button
                onClick={() => setActiveExpertise(isExpanded ? null : area.id)}
                className="w-full flex items-center justify-between p-5 text-left transition-all"
                style={{
                  backgroundColor: isExpanded ? `${area.color}08` : 'transparent',
                }}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div
                    className="p-2.5 rounded-xl flex-shrink-0"
                    style={{ backgroundColor: `${area.color}15` }}
                  >
                    <IconComponent size={22} style={{ color: area.color }} />
                  </div>
                  <div className="min-w-0">
                    <h3
                      className="text-base font-bold"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {area.title}
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                      {area.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                  {/* Quick skill preview */}
                  <div className="hidden md:flex items-center gap-1.5">
                    {categories.slice(0, 2).map(([cat, skills]) => (
                      <span
                        key={cat}
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${area.color}12`,
                          color: area.color,
                        }}
                      >
                        {skills.slice(0, 2).join(', ')}
                        {skills.length > 2 ? '...' : ''}
                      </span>
                    ))}
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${area.color}15`,
                      color: area.color,
                    }}
                  >
                    {skillCount}
                  </span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </motion.div>
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div
                      className="px-5 pb-5 pt-2"
                      style={{ borderTop: `1px solid ${area.color}15` }}
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        {categories.map(([cat, skills]) => (
                          <div key={cat}>
                            <p
                              className="text-xs font-semibold mb-2 uppercase tracking-wider"
                              style={{ color: area.color }}
                            >
                              {cat}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {skills.map((skill, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.03 }}
                                  whileHover={{ scale: 1.08, y: -2 }}
                                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium"
                                  style={{
                                    backgroundColor: `${area.color}08`,
                                    border: `1px solid ${area.color}15`,
                                    color: 'var(--color-text-primary)',
                                  }}
                                >
                                  <SkillIcon
                                    name={typeof skill === 'string' ? skill : skill.name}
                                    size={13}
                                    style={{ color: area.color, flexShrink: 0 }}
                                  />
                                  {typeof skill === 'string' ? skill : skill.name}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-6 flex flex-wrap items-center justify-center gap-3"
      >
        {expertiseAreas.map((area) => (
          <div key={area.id} className="flex items-center gap-1.5 cursor-default">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: area.color }} />
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {area.title}
            </span>
          </div>
        ))}
      </motion.div>
    </Section>
  );
}
