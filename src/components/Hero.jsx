import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Linkedin, Mail, Github, BookOpen, ArrowDown } from 'lucide-react';

const DEFAULT_TITLES = ['Your Title 1', 'Your Title 2', 'Your Title 3'];

const floatingOrb = {
  animate: {
    y: [0, -20, 0],
    opacity: [0.5, 1, 0.5],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
};

const floatingOrb2 = {
  animate: {
    y: [0, 15, 0],
    x: [0, -10, 0],
    opacity: [0.3, 0.7, 0.3],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
  },
};

function AnimatedCounter({ end, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function getInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  return parts
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('');
}

function Avatar({ name, size = 'w-32 h-32 md:w-40 md:h-40' }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative flex-shrink-0"
    >
      {imgFailed ? (
        <motion.div
          className={`${size} rounded-full flex items-center justify-center font-bold text-3xl md:text-4xl`}
          style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
            color: '#fff',
            boxShadow: '0 0 40px rgba(var(--color-primary-rgb), 0.3)',
          }}
          whileHover={{ scale: 1.05 }}
        >
          {getInitials(name)}
        </motion.div>
      ) : (
        <motion.img
          src={`${import.meta.env.BASE_URL}images/profile.jpg`}
          alt={name}
          onError={() => setImgFailed(true)}
          className={`${size} rounded-full object-cover`}
          style={{ boxShadow: '0 0 40px rgba(var(--color-primary-rgb), 0.3)' }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 60px rgba(var(--color-primary-rgb), 0.5)',
          }}
        />
      )}
      <motion.div
        className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: '#10b981',
          boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)',
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-3 h-3 rounded-full bg-white" />
      </motion.div>
    </motion.div>
  );
}

function TitleBlock({ config, displayText, align = 'center', light = false, large = false }) {
  const isCenter = align === 'center';
  const textColor = light ? '#ffffff' : 'var(--color-text-primary)';
  const subColor = light ? 'rgba(255,255,255,0.85)' : 'var(--color-text-secondary)';
  const titleSize = large ? 'text-5xl md:text-6xl lg:text-7xl' : 'text-4xl md:text-5xl lg:text-6xl';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={isCenter ? 'text-center' : 'text-center md:text-left'}
    >
      <motion.h1
        className={`${titleSize} font-bold mb-4 min-h-[60px] flex items-center ${
          isCenter ? 'justify-center' : 'justify-center md:justify-start'
        }`}
        style={{ color: textColor }}
      >
        <span className="inline-block">
          {displayText}
          {(config?.titles?.length || 0) > 1 && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-1 h-10 md:h-12 bg-primary ml-1 align-middle"
            />
          )}
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className={`text-lg md:text-xl font-semibold mb-4 ${isCenter ? 'text-center' : 'text-center md:text-left'}`}
        style={{ color: textColor }}
      >
        <span className="italic" style={{ color: light ? '#ffffff' : 'var(--color-primary)' }}>
          {config.bio.headline.split(' ').slice(0, 2).join(' ')}
        </span>{' '}
        {config.bio.headline.split(' ').slice(2).join(' ')}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className={`mb-8 leading-relaxed text-sm md:text-base ${
          isCenter
            ? 'max-w-2xl mx-auto text-center'
            : 'max-w-2xl mx-auto md:mx-0 text-center md:text-left'
        }`}
        style={{ color: subColor }}
      >
        {config.bio.subtitle}
      </motion.p>
    </motion.div>
  );
}

function SocialLinks({ links, justify = 'justify-center' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className={`flex ${justify} gap-3 flex-wrap`}
    >
      {links.map((link, index) => (
        <motion.a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + index * 0.1 }}
          whileHover={{ scale: 1.05, y: -3, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl ${link.bg} ${link.hover} text-white font-medium transition-all shadow-lg text-sm`}
        >
          {link.icon}
          {link.label}
        </motion.a>
      ))}
    </motion.div>
  );
}

function StatsGrid({ stats }) {
  if (stats.length === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-4 w-full max-w-3xl"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 + index * 0.1 }}
          whileHover={{ y: -4, scale: 1.03 }}
          className="glass-card rounded-xl p-4 text-center cursor-default"
        >
          <p
            className="text-2xl md:text-3xl font-extrabold"
            style={{ color: 'var(--color-primary)' }}
          >
            <AnimatedCounter end={stat.value} suffix={stat.suffix} />
          </p>
          <p className="text-xs font-semibold mt-1" style={{ color: 'var(--color-text-primary)' }}>
            {stat.label}
          </p>
          <p className="text-[10px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
            {stat.sublabel}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="text-text-muted text-xs font-medium tracking-wider uppercase"
      >
        Scroll
      </motion.span>
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="p-3 rounded-full bg-primary/20 border border-primary/30"
      >
        <ArrowDown size={24} className="text-primary" />
      </motion.div>
    </motion.div>
  );
}

function FloatingOrbs() {
  return (
    <>
      <motion.div
        {...floatingOrb}
        className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        {...floatingOrb2}
        className="absolute bottom-32 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/3 right-1/4 w-48 h-48 bg-primary/10 rounded-full blur-2xl pointer-events-none"
      />
    </>
  );
}

export default function Hero({ config, stats = [] }) {
  const titles = config?.titles || DEFAULT_TITLES;
  const layout = config?.theme?.heroLayout || 'center-profile';
  const hasOneTitle = titles.length < 2;
  const prefersReducedMotion = useReducedMotion();
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState(
    hasOneTitle && !prefersReducedMotion ? '' : titles[0],
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoad(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasOneTitle && isInitialLoad) return;
    const currentText = titles[titleIndex];
    let timeout;

    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        }, 60);
      } else if (!hasOneTitle) {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, 30);
      } else {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex, isInitialLoad]);

  const socialLinks = [
    {
      href: `https://www.linkedin.com/in/${config.personal.linkedin}`,
      label: 'LinkedIn',
      icon: <Linkedin size={18} />,
      bg: 'bg-[#0A66C2]',
      hover: 'hover:bg-[#084B8A]',
    },
    {
      href: `mailto:${config.personal.email}`,
      label: 'Contact Me',
      icon: <Mail size={18} />,
      bg: 'bg-slate-600',
      hover: 'hover:bg-slate-500',
    },
    {
      href: `https://github.com/${config.personal.github}`,
      label: 'GitHub',
      icon: <Github size={18} />,
      bg: 'bg-[#24292F]',
      hover: 'hover:bg-[#111214]',
    },
    {
      href: `https://medium.com/@${config.personal.medium}`,
      label: 'Medium',
      icon: <BookOpen size={18} />,
      bg: 'bg-[#00ab6c]',
      hover: 'hover:bg-[#008c54]',
    },
  ].filter((link) => link.label !== 'Medium' || config.personal.medium);

  if (layout === 'text-only') {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
        <FloatingOrbs />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex flex-col items-center gap-8">
            <TitleBlock config={config} displayText={displayText} align="center" large />
            <SocialLinks links={socialLinks} justify="justify-center" />
            <StatsGrid stats={stats} />
          </div>
        </div>
        <ScrollIndicator />
      </section>
    );
  }

  if (layout === 'left-profile') {
    return (
      <section className="relative min-h-screen flex items-center overflow-hidden px-6 py-20">
        <FloatingOrbs />
        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-center">
            <div className="flex justify-center md:justify-start">
              <Avatar name={config.personal.name} />
            </div>
            <div className="flex flex-col items-center md:items-start gap-6">
              <TitleBlock config={config} displayText={displayText} align="left" />
              <SocialLinks links={socialLinks} justify="justify-center md:justify-start" />
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <StatsGrid stats={stats} />
          </div>
        </div>
        <ScrollIndicator />
      </section>
    );
  }

  if (layout === 'full-image') {
    return (
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.8)), url(${import.meta.env.BASE_URL}images/hero-bg.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'var(--color-bg-primary)',
        }}
      >
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="flex flex-col items-center gap-8">
            <TitleBlock config={config} displayText={displayText} align="center" light />
            <SocialLinks links={socialLinks} justify="justify-center" />
            <StatsGrid stats={stats} />
          </div>
        </div>
        <ScrollIndicator />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
      <FloatingOrbs />
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="flex flex-col items-center gap-8">
          <Avatar name={config.personal.name} />
          <TitleBlock config={config} displayText={displayText} align="center" />
          <SocialLinks links={socialLinks} justify="justify-center" />
          <StatsGrid stats={stats} />
        </div>
      </div>
      <ScrollIndicator />
    </section>
  );
}
