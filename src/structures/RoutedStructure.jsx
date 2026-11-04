import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import RoutedNav from './RoutedNav';

/**
 * A real multi-page site instead of one long scrolling page. Uses HashRouter
 * deliberately: PortForge targets static hosts (GitHub Pages, Netlify, Vercel)
 * where a plain BrowserRouter needs server-side rewrite rules to avoid 404s on
 * refresh/deep-link - GitHub Pages in particular needs a brittle 404.html
 * redirect trick for that. Hash routes ("/#/projects") work identically on
 * every static host with zero deploy config, at the cost of a "#" in the URL.
 */
export default function RoutedStructure({ config, stats, enabledSections, renderSection }) {
  const aboutSection = enabledSections.find((s) => s.id === 'about');
  const otherSections = enabledSections.filter((s) => s.id !== 'about');

  const routes = [
    { path: '/', label: 'Home' },
    ...otherSections.map((s) => ({ path: `/${s.id}`, label: s.navLabel || s.label })),
  ];

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary relative">
        <RoutedNav config={config} routes={routes} />

        <main className="flex-1 relative z-10 pt-24">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero config={config} stats={stats} />
                  {aboutSection && renderSection('about')}
                </>
              }
            />
            {otherSections.map((section) => (
              <Route key={section.id} path={`/${section.id}`} element={renderSection(section.id)} />
            ))}
            <Route
              path="*"
              element={
                <div className="max-w-2xl mx-auto text-center py-24 px-6">
                  <p className="text-2xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
                    Page not found
                  </p>
                  <p style={{ color: 'var(--color-text-muted)' }}>
                    That page doesn&apos;t exist. Use the nav above to find your way back.
                  </p>
                </div>
              }
            />
          </Routes>
        </main>

        <Footer config={config} />
      </div>
    </HashRouter>
  );
}
