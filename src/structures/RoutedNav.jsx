import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function RoutedNav({ config, routes }) {
  const { theme, toggleMode, mounted } = useTheme();
  const location = useLocation();

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
    <nav className="nav-bg fixed top-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="nav-brand text-lg font-extrabold"
          style={{ color: 'var(--color-primary)' }}
        >
          {config.personal.name}
        </Link>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1">
            {routes.map((route) => {
              const selected = location.pathname === route.path;
              return (
                <Link
                  key={route.path}
                  to={route.path}
                  aria-current={selected ? 'page' : undefined}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                  style={{
                    color: selected ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    backgroundColor: selected
                      ? 'rgba(var(--color-primary-rgb), 0.1)'
                      : 'transparent',
                  }}
                >
                  {route.label}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={toggleMode}
            aria-label={theme.mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-1.5 rounded-lg transition-colors"
            style={{
              backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)',
              color: 'var(--color-primary)',
            }}
          >
            {theme.mode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
