import React, { useRef, useState } from 'react';
import { Sun, Moon, Palette, Home, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Nav({
  activeSection,
  scrollToSection,
  config,
  scrollProgress,
  navStyle = 'scroll',
  showSectionLinks = true,
}) {
  const { theme, toggleMode, setPreset, setCustomTheme, presets, mounted } = useTheme();
  const [showPresets, setShowPresets] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const tabRefs = useRef([]);

  const isTabs = navStyle === 'tabs';
  const isTimeline = navStyle === 'timeline';

  const enabledSections = (config.sections || []).filter((s) => s.enabled !== false);
  const sectionItems = enabledSections.map((s) => ({ id: s.id, label: s.navLabel || s.label }));
  const navItems = isTabs
    ? sectionItems
    : [{ id: 'hero', label: 'Home', icon: Home }, ...sectionItems];

  const goHome = () => {
    if (isTabs) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollToSection('hero');
    }
  };

  const handleTabKeyDown = (e, index) => {
    let next = null;
    if (e.key === 'ArrowRight') next = (index + 1) % sectionItems.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + sectionItems.length) % sectionItems.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = sectionItems.length - 1;
    if (next !== null) {
      e.preventDefault();
      scrollToSection(sectionItems[next].id);
      tabRefs.current[next]?.focus();
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return (
      <nav className="nav-bg fixed top-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <p className="nav-brand text-xl font-extrabold" style={{ color: 'var(--color-primary)' }}>
            {config.personal.name}
          </p>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="nav-bg fixed top-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <motion.button
            type="button"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="nav-brand text-lg font-extrabold cursor-pointer"
            style={{ color: 'var(--color-primary)' }}
            onClick={goHome}
          >
            {config.personal.name}
          </motion.button>

          <div className="flex items-center gap-2">
            {!isTimeline && showSectionLinks && (
              <div
                className="hidden md:flex items-center gap-1"
                role={isTabs ? 'tablist' : undefined}
                aria-label={isTabs ? 'Sections' : undefined}
              >
                {navItems.map((item, index) => {
                  const selected = activeSection === item.id;
                  const sectionIndex = isTabs ? index : -1;
                  return (
                    <motion.button
                      key={item.id}
                      ref={isTabs ? (el) => (tabRefs.current[sectionIndex] = el) : undefined}
                      role={isTabs ? 'tab' : undefined}
                      aria-selected={isTabs ? selected : undefined}
                      aria-current={!isTabs && selected ? 'page' : undefined}
                      id={isTabs ? `tab-${item.id}` : undefined}
                      aria-controls={isTabs ? `panel-${item.id}` : undefined}
                      {...(isTabs ? { tabIndex: selected ? 0 : -1 } : {})}
                      onKeyDown={isTabs ? (e) => handleTabKeyDown(e, sectionIndex) : undefined}
                      onClick={() => scrollToSection(item.id)}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`relative px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selected ? '' : 'hover:opacity-80'
                      }`}
                      style={{
                        color: selected ? 'var(--color-primary)' : 'var(--color-text-muted)',
                        backgroundColor: selected
                          ? 'rgba(var(--color-primary-rgb), 0.1)'
                          : 'transparent',
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.icon && <item.icon size={12} className="inline mr-1" />}
                      {item.label}
                      {selected && (
                        <motion.div
                          layoutId="navIndicator"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                          style={{ backgroundColor: 'var(--color-primary)' }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}

            <div className="flex items-center gap-1 ml-2">
              <AnimatePresence>
                {showPresets && (
                  <motion.div
                    initial={{ opacity: 0, x: 20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    className="glass-card rounded-xl p-3 min-w-[180px] z-50"
                    style={{ position: 'absolute', right: '80px', top: '60px' }}
                  >
                    <p className="text-xs mb-2 px-2" style={{ color: 'var(--color-text-muted)' }}>
                      Color Presets
                    </p>
                    {Object.entries(presets).map(([key, preset]) => (
                      <button
                        key={key}
                        onClick={() => setPreset(key)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all"
                        style={{
                          color:
                            theme.primary === preset.primary
                              ? 'var(--color-primary)'
                              : 'var(--color-text-secondary)',
                          backgroundColor:
                            theme.primary === preset.primary
                              ? 'rgba(var(--color-primary-rgb), 0.1)'
                              : 'transparent',
                        }}
                      >
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{
                            background: `linear-gradient(135deg, ${presets[key].primary === 'frost' ? '#38bdf8' : presets[key].primary === 'blue' ? '#2563eb' : presets[key].primary === 'purple' ? '#8f3be7' : presets[key].primary}, ${presets[key].accent === 'cyan' ? '#06b6d4' : presets[key].accent === 'pink' ? '#ec4899' : presets[key].accent})`,
                          }}
                        />
                        {key.replace('-', ' / ')}
                      </button>
                    ))}

                    <div
                      className="mt-2 pt-2 flex items-center gap-3 px-2"
                      style={{ borderTop: '1px solid var(--color-border)' }}
                    >
                      <label
                        className="flex items-center gap-1.5 text-xs cursor-pointer"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        <input
                          type="color"
                          aria-label="Custom primary color"
                          value={theme.customTheme?.primaryHex || '#6366f1'}
                          onChange={(e) => setCustomTheme({ primaryHex: e.target.value })}
                          className="w-5 h-5 rounded border-0 bg-transparent cursor-pointer"
                        />
                        Primary
                      </label>
                      <label
                        className="flex items-center gap-1.5 text-xs cursor-pointer"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        <input
                          type="color"
                          aria-label="Custom accent color"
                          value={theme.customTheme?.accentHex || '#f59e0b'}
                          onChange={(e) => setCustomTheme({ accentHex: e.target.value })}
                          className="w-5 h-5 rounded border-0 bg-transparent cursor-pointer"
                        />
                        Accent
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                onClick={() => setShowPresets(!showPresets)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 rounded-lg transition-colors"
                style={{
                  backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)',
                  color: 'var(--color-primary)',
                }}
                aria-label="Color presets"
              >
                <Palette size={16} />
              </motion.button>

              <motion.button
                onClick={toggleMode}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 rounded-lg transition-colors"
                style={{
                  backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)',
                  color: 'var(--color-primary)',
                }}
                aria-label={theme.mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme.mode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </motion.button>
            </div>
          </div>
        </div>

        <motion.div
          className="h-0.5"
          style={{
            background: `linear-gradient(to right, var(--color-primary), var(--color-accent))`,
            width: `${scrollProgress}%`,
          }}
          transition={{ duration: 0.1 }}
        />
      </nav>

      {isTimeline && showSectionLinks && sectionItems.length > 0 && (
        <nav
          aria-label="Section timeline"
          className="hidden md:block fixed left-4 top-1/2 -translate-y-1/2 z-40 w-44"
        >
          <div
            className="relative flex flex-col gap-6 pl-4"
            style={{ borderLeft: '2px solid var(--color-border)' }}
          >
            {sectionItems.map((item) => {
              const selected = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="group relative flex items-center gap-2 text-left"
                  aria-current={selected ? 'page' : undefined}
                >
                  <span
                    className="absolute -left-[21px] w-3 h-3 rounded-full transition-all"
                    style={{
                      backgroundColor: selected
                        ? 'var(--color-primary)'
                        : 'var(--color-border-strong)',
                      boxShadow: selected
                        ? '0 0 0 4px rgba(var(--color-primary-rgb), 0.2)'
                        : 'none',
                    }}
                  />
                  <span
                    className="text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity"
                    style={{ color: selected ? 'var(--color-primary)' : 'var(--color-text-muted)' }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={goHome}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-bg-primary)',
            }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
