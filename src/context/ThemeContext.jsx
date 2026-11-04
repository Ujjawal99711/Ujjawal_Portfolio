import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import config from '../config.json';

const ThemeContext = createContext(null);

const themeColors = {
  slate: { primary: '#94a3b8', light: '#cbd5e1', dark: '#64748b' },
  amber: { primary: '#d97706', light: '#f59e0b', dark: '#b45309' },
  indigo: { primary: '#6366f1', light: '#818cf8', dark: '#4f46e5' },
  violet: { primary: '#a855f7', light: '#c084fc', dark: '#9333ea' },
  emerald: { primary: '#10b981', light: '#34d399', dark: '#059669' },
  teal: { primary: '#14b8a6', light: '#2dd4bf', dark: '#0d9488' },
  rose: { primary: '#f43f5e', light: '#fb7185', dark: '#e11d48' },
  fuchsia: { primary: '#d946ef', light: '#e879f9', dark: '#c026d3' },
  blue: { primary: '#3b82f6', light: '#60a5fa', dark: '#2563eb' },
  cyan: { primary: '#06b6d4', light: '#22d3ee', dark: '#0891b2' },
};

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
}

function isValidHex(hex) {
  return typeof hex === 'string' && /^#?[0-9a-f]{6}$/i.test(hex);
}

function mixHex(hex, target, amount) {
  const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!rgb) return hex;
  const t = target === 'white' ? 255 : 0;
  const channel = (v) => {
    const mixed = Math.round(parseInt(v, 16) + (t - parseInt(v, 16)) * amount);
    return Math.min(255, Math.max(0, mixed)).toString(16).padStart(2, '0');
  };
  return `#${channel(rgb[1])}${channel(rgb[2])}${channel(rgb[3])}`;
}

function resolveHueColor(named, customHex) {
  if (isValidHex(customHex)) {
    const hex = customHex.startsWith('#') ? customHex : `#${customHex}`;
    return { primary: hex, light: mixHex(hex, 'white', 0.25), dark: mixHex(hex, 'black', 0.2) };
  }
  return named;
}

function getCSSVariables(primary, accent, mode, customTheme = {}) {
  const p = resolveHueColor(themeColors[primary] || themeColors.slate, customTheme.primaryHex);
  const a = resolveHueColor(themeColors[accent] || themeColors.amber, customTheme.accentHex);
  const isDark = mode === 'dark';
  const customDarkBg = isDark && isValidHex(customTheme.darkBg) ? customTheme.darkBg : null;

  return {
    '--color-primary': p.primary,
    '--color-primary-light': p.light,
    '--color-primary-dark': p.dark,
    '--color-primary-rgb': hexToRgb(p.primary),
    '--color-accent': a.primary,
    '--color-accent-light': a.light,
    '--color-accent-dark': a.dark,
    '--color-accent-rgb': hexToRgb(a.primary),
    '--color-bg-primary': customDarkBg || (isDark ? '#0f1218' : '#f5f0e8'),
    '--color-bg-secondary': customDarkBg
      ? mixHex(customDarkBg, 'white', 0.06)
      : isDark
        ? '#1c2028'
        : '#ebe5db',
    '--color-bg-tertiary': customDarkBg
      ? mixHex(customDarkBg, 'white', 0.12)
      : isDark
        ? '#282d38'
        : '#ddd5c8',
    '--color-text-primary': isDark ? '#f1f5f9' : '#1a1510',
    '--color-text-secondary': isDark ? '#cbd5e1' : '#3d3529',
    '--color-text-muted': isDark ? '#94a3b8' : '#5c5347',
    '--color-border': isDark ? 'rgba(251, 191, 36, 0.12)' : 'rgba(100, 80, 50, 0.18)',
    '--color-border-strong': isDark ? 'rgba(251, 191, 36, 0.25)' : 'rgba(100, 80, 50, 0.35)',
    '--color-glass-bg': isDark
      ? 'linear-gradient(180deg, rgba(28, 32, 40, 0.8), rgba(15, 18, 24, 0.7))'
      : 'linear-gradient(180deg, rgba(235, 229, 219, 0.95), rgba(221, 213, 200, 0.85))',
    '--color-glass-border': isDark ? 'rgba(251, 191, 36, 0.1)' : 'rgba(100, 80, 50, 0.15)',
    '--color-glass-shadow': isDark
      ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.03)'
      : '0 8px 32px rgba(100, 80, 50, 0.1), inset 0 1px 0 rgba(255,255,255,0.5)',
    '--color-glass-hover-border': isDark ? 'rgba(251, 191, 36, 0.25)' : 'rgba(100, 80, 50, 0.25)',
    '--color-glass-hover-shadow': isDark
      ? '0 16px 48px rgba(0, 0, 0, 0.5), 0 0 30px rgba(251, 191, 36, 0.08)'
      : '0 16px 48px rgba(100, 80, 50, 0.15), 0 0 30px rgba(100, 80, 50, 0.08)',
    '--color-nav-bg': isDark
      ? 'linear-gradient(180deg, rgba(15, 18, 24, 0.95), rgba(15, 18, 24, 0.85))'
      : 'linear-gradient(180deg, rgba(221, 213, 200, 0.98), rgba(235, 229, 219, 0.92))',
    '--color-nav-shadow': isDark
      ? '0 4px 20px rgba(0, 0, 0, 0.5)'
      : '0 4px 20px rgba(100, 80, 50, 0.12)',
    '--color-footer-border': isDark ? 'rgba(251, 191, 36, 0.08)' : 'rgba(100, 80, 50, 0.12)',
    '--color-scrollbar-track': isDark ? '#0f1218' : '#ddd5c8',
    '--color-scrollbar-thumb': isDark ? '#282d38' : '#a89888',
    '--color-scrollbar-thumb-hover': isDark ? '#3b414d' : '#8a7e72',
    '--color-skeleton': isDark ? '#1c2028' : '#d5cdc0',
    '--color-skeleton-shine': isDark ? '#282d38' : '#ebe5db',
    '--color-overlay': isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(26, 21, 16, 0.5)',
  };
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...config.theme, ...parsed };
      }
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return { ...config.theme, mode: prefersDark ? 'dark' : 'light' };
    }
    return { ...config.theme, mode: 'dark' };
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    const vars = getCSSVariables(theme.primary, theme.accent, theme.mode, theme.customTheme);
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    document.documentElement.classList.toggle('dark', theme.mode === 'dark');
    localStorage.setItem('portfolio-theme', JSON.stringify(theme));
  }, [theme, mounted]);

  const toggleMode = () => {
    setTheme((prev) => ({ ...prev, mode: prev.mode === 'dark' ? 'light' : 'dark' }));
  };

  const setPreset = (presetName) => {
    const preset = config.theme.presets[presetName];
    if (preset) {
      setTheme((prev) => ({
        ...prev,
        ...preset,
        customTheme: { primaryHex: '', accentHex: '', darkBg: '' },
      }));
    }
  };

  const setPrimary = (primary) => setTheme((prev) => ({ ...prev, primary }));
  const setAccent = (accent) => setTheme((prev) => ({ ...prev, accent }));
  const setCustomTheme = (partial) =>
    setTheme((prev) => ({ ...prev, customTheme: { ...prev.customTheme, ...partial } }));

  const value = useMemo(
    () => ({
      theme,
      toggleMode,
      setPreset,
      setPrimary,
      setAccent,
      setCustomTheme,
      presets: config.theme.presets,
      mounted,
    }),
    [theme, mounted],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
