import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ArrowUpRight, Clock, Lightbulb, ExternalLink } from 'lucide-react';
import Section from './Section';
import { SkeletonGrid } from './Skeleton';

const TOPIC_COLORS = {
  'AI & LLM': { bg: 'rgba(139, 92, 246, 0.12)', text: '#8b5cf6' },
  Testing: { bg: 'rgba(16, 185, 129, 0.12)', text: '#10b981' },
  Leadership: { bg: 'rgba(245, 158, 11, 0.12)', text: '#f59e0b' },
  Development: { bg: 'rgba(59, 130, 246, 0.12)', text: '#3b82f6' },
};

const SHOW_COUNT = 4;

export default function MediumArticles({ articles, mediumHandle }) {
  const [loading, setLoading] = useState(true);
  const [activeTopic, setActiveTopic] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const topics = useMemo(() => {
    if (!articles) return [];
    const topicMap = {};
    articles.forEach((a) => {
      if (a.topic) {
        topicMap[a.topic] = (topicMap[a.topic] || 0) + 1;
      }
    });
    return Object.entries(topicMap).sort((a, b) => b[1] - a[1]);
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (!articles) return [];
    if (activeTopic === 'all') return articles;
    return articles.filter((a) => a.topic === activeTopic);
  }, [articles, activeTopic]);

  const featuredArticle = filteredArticles[0];
  const otherArticles = filteredArticles.slice(1, 1 + SHOW_COUNT);
  const remainingCount = filteredArticles.length - 1 - SHOW_COUNT;
  const mediumUrl = mediumHandle ? `https://medium.com/@${mediumHandle}` : 'https://medium.com';

  return (
    <Section>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            <Lightbulb style={{ color: 'var(--color-primary)' }} size={28} />
          </motion.div>
          <h2
            className="text-2xl md:text-3xl font-bold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            <span
              style={{ color: 'var(--color-accent)', fontSize: '0.75em', marginRight: '0.5rem' }}
            >
              04
            </span>
            Thoughts &{' '}
            <span className="italic" style={{ color: 'var(--color-primary)' }}>
              Ideas
            </span>
          </h2>
        </div>
        <p className="text-sm ml-10" style={{ color: 'var(--color-text-muted)' }}>
          Writing on AI engineering, test automation, and building better teams
        </p>
      </div>

      {loading ? (
        <SkeletonGrid count={4} columns={2} />
      ) : (
        <div className="space-y-6">
          {/* Topic Filter */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveTopic('all')}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                backgroundColor:
                  activeTopic === 'all'
                    ? 'var(--color-primary)'
                    : 'rgba(var(--color-primary-rgb), 0.08)',
                color:
                  activeTopic === 'all' ? 'var(--color-bg-primary)' : 'var(--color-text-muted)',
              }}
            >
              All ({articles?.length || 0})
            </button>
            {topics.map(([topic, count]) => {
              const color = TOPIC_COLORS[topic] || TOPIC_COLORS['AI & LLM'];
              return (
                <button
                  key={topic}
                  onClick={() => setActiveTopic(topic)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                  style={{
                    backgroundColor: activeTopic === topic ? color.text : color.bg,
                    color: activeTopic === topic ? 'white' : color.text,
                  }}
                >
                  {topic} ({count})
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTopic}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Featured Article */}
              {featuredArticle && (
                <motion.a
                  href={featuredArticle.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group glass-card rounded-2xl p-6 md:p-8 block"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{
                            backgroundColor: 'rgba(var(--color-accent-rgb), 0.15)',
                            color: 'var(--color-accent)',
                          }}
                        >
                          Latest
                        </span>
                        {featuredArticle.topic && (
                          <span
                            className="text-xs font-semibold px-2.5 py-1 rounded-full"
                            style={{
                              backgroundColor:
                                TOPIC_COLORS[featuredArticle.topic]?.bg ||
                                'rgba(var(--color-primary-rgb), 0.1)',
                              color:
                                TOPIC_COLORS[featuredArticle.topic]?.text || 'var(--color-primary)',
                            }}
                          >
                            {featuredArticle.topic}
                          </span>
                        )}
                      </div>
                      <h3
                        className="text-xl md:text-2xl font-bold mb-2"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {featuredArticle.title}
                      </h3>
                    </div>
                    <motion.div
                      className="p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4"
                      style={{
                        backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)',
                        color: 'var(--color-primary)',
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowUpRight size={18} />
                    </motion.div>
                  </div>

                  {featuredArticle.description && (
                    <p
                      className="text-sm mb-4 leading-relaxed"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {featuredArticle.description}
                    </p>
                  )}

                  <div
                    className="flex items-center gap-4 text-xs"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {featuredArticle.date && (
                      <span>
                        {new Date(featuredArticle.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    )}
                    {featuredArticle.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {featuredArticle.readTime}
                      </span>
                    )}
                  </div>
                </motion.a>
              )}

              {/* Other Articles - max 4 */}
              {otherArticles.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {otherArticles.map((article, index) => (
                    <motion.a
                      key={index}
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="group glass-card rounded-xl p-5 block"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 pr-4">
                          {article.topic && (
                            <span
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2 inline-block"
                              style={{
                                backgroundColor:
                                  TOPIC_COLORS[article.topic]?.bg ||
                                  'rgba(var(--color-primary-rgb), 0.1)',
                                color: TOPIC_COLORS[article.topic]?.text || 'var(--color-primary)',
                              }}
                            >
                              {article.topic}
                            </span>
                          )}
                          <h3
                            className="font-semibold line-clamp-2"
                            style={{ color: 'var(--color-text-primary)' }}
                          >
                            {article.title}
                          </h3>
                        </div>
                        <motion.div
                          className="p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          style={{
                            backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)',
                            color: 'var(--color-primary)',
                          }}
                        >
                          <ArrowUpRight size={14} />
                        </motion.div>
                      </div>

                      {article.description && (
                        <p
                          className="text-xs mb-3 line-clamp-2"
                          style={{ color: 'var(--color-text-muted)' }}
                        >
                          {article.description}
                        </p>
                      )}

                      <div
                        className="flex items-center gap-3 text-xs"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {article.date && (
                          <span>
                            {new Date(article.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        )}
                        {article.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock size={10} />
                            {article.readTime}
                          </span>
                        )}
                      </div>
                    </motion.a>
                  ))}
                </div>
              )}

              {/* View All Link */}
              {remainingCount > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-center pt-2"
                >
                  <a
                    href={mediumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      backgroundColor: 'rgba(var(--color-primary-rgb), 0.08)',
                      color: 'var(--color-primary)',
                      border: '1px solid rgba(var(--color-primary-rgb), 0.15)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        'rgba(var(--color-primary-rgb), 0.15)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        'rgba(var(--color-primary-rgb), 0.08)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <BookOpen size={15} />
                    View {remainingCount} more articles on Medium
                    <ExternalLink size={13} />
                  </a>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </Section>
  );
}
