import React, { useState, useCallback, useEffect, useRef } from 'react';
import config from './config.json';
import Nav from './components/Nav';
import ScrollStructure from './structures/ScrollStructure';
import DashboardStructure from './structures/DashboardStructure';
import CaseStudyStructure from './structures/CaseStudyStructure';
import TerminalStructure from './structures/TerminalStructure';
import RoutedStructure from './structures/RoutedStructure';
import Certifications from './components/Certifications';
import certifications from './data/certifications.json';
import Experience from './components/Experience';
import experience from './data/experience.json';
import TechStack from './components/TechStack';
import techStacks from './data/techStacks.json';
import MediumArticles from './components/MediumArticles';
import mediumArticles from './data/mediumArticles.json';
import Projects from './components/Projects';
import About from './components/About';
import Awards from './components/Awards';
import Education from './components/Education';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import ProjectModal from './components/ProjectModal';
import aboutMe from './data/aboutMe.json';
import awards from './data/awards.json';
import education from './data/education.json';
import projects from './data/projects.json';
import stats from './data/stats.json';
import highlights from './data/highlights.json';

const SECTION_MAP = {
  about: { component: About, props: { aboutMe } },
  tech: { component: TechStack, props: { techStacks } },
  experience: { component: Experience, props: { experience } },
  articles: {
    component: MediumArticles,
    props: { articles: mediumArticles, mediumHandle: config.personal?.medium },
  },
  projects: { component: Projects, props: { projects, onOpenModal: null } },
  awards: { component: Awards, props: { awards } },
  certifications: { component: Certifications, props: null },
  education: { component: Education, props: { education } },
};

const enabledSections = (config.sections || []).filter((s) => s.enabled !== false);
const navStyle = config.theme?.navStyle || 'scroll';
const isTabsNav = navStyle === 'tabs';
const structure = config.theme?.portfolioStructure || 'scroll';
// Structures that are one long/anchored page benefit from section links in the nav;
// dashboard/gallery-style structures manage their own internal navigation instead.
const showSectionLinks = structure === 'scroll' || structure === 'resume';

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(() =>
    isTabsNav ? enabledSections[0]?.id || 'hero' : 'hero',
  );
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRefs = useRef({});

  const handleOpenModal = useCallback((project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    if (isTabsNav) {
      setActiveSection(sectionId);
      return;
    }
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  useEffect(() => {
    const sectionIds = ['hero', ...enabledSections.map((s) => s.id)];

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);

      if (isTabsNav) return;

      const offsets = sectionIds.map((id) => {
        const el = sectionRefs.current[id];
        if (!el) return { id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id, top: Math.abs(rect.top - 80) };
      });
      const closest = offsets.reduce((a, b) => (a.top < b.top ? a : b));
      if (closest.id !== activeSection) {
        setActiveSection(closest.id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const logoModules = import.meta.glob('./assets/certifications/*.{png,svg}', {
    query: '?url',
    import: 'default',
    eager: true,
  });

  const getLogoUrl = (file) => {
    if (!file) return undefined;
    const matchKey = Object.keys(logoModules).find((k) => k.includes(file));
    return matchKey ? logoModules[matchKey] : undefined;
  };

  const certificationsWithLogos = certifications.map((c) => ({
    ...c,
    logo: c.logoUrl ? c.logoUrl : c.logoFile ? getLogoUrl(c.logoFile) : undefined,
  }));

  const renderSection = (sectionId) => {
    const sectionConfig = SECTION_MAP[sectionId];
    if (!sectionConfig) return null;

    const { component: Component, props } = sectionConfig;
    const sectionMeta = enabledSections.find((s) => s.id === sectionId);

    if (sectionId === 'certifications') {
      return <Component certifications={certificationsWithLogos} />;
    }
    if (sectionId === 'projects') {
      return <Component projects={projects} onOpenModal={handleOpenModal} />;
    }
    return <Component {...props} />;
  };

  const getSectionTeaser = (sectionId) => {
    switch (sectionId) {
      case 'about':
        return aboutMe?.shortBio || 'A bit about me';
      case 'experience':
        return experience.length
          ? `${experience.length} role${experience.length > 1 ? 's' : ''} - most recently ${experience[0]?.company || ''}`
          : 'Work history';
      case 'tech':
        return techStacks?.expertise?.length
          ? `${techStacks.expertise.length} skill area${techStacks.expertise.length > 1 ? 's' : ''}`
          : 'Skills & tools';
      case 'articles':
        return mediumArticles.length
          ? `${mediumArticles.length} article${mediumArticles.length > 1 ? 's' : ''}`
          : 'Writing';
      case 'projects':
        return projects.length
          ? `${projects.length} project${projects.length > 1 ? 's' : ''}`
          : 'Things I have built';
      case 'awards':
        return awards.length
          ? `${awards.length} award${awards.length > 1 ? 's' : ''}`
          : 'Recognition';
      case 'certifications':
        return certifications.length
          ? `${certifications.length} certification${certifications.length > 1 ? 's' : ''}`
          : 'Certifications';
      case 'education':
        return education[0]?.degree || 'Education';
      default:
        return '';
    }
  };

  if (structure === 'terminal') {
    return (
      <>
        <TerminalStructure
          config={config}
          aboutMe={aboutMe}
          experience={experience}
          techStacks={techStacks}
          projects={projects}
          education={education}
          awards={awards}
          certifications={certifications}
          onOpenProject={handleOpenModal}
        />
        <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
      </>
    );
  }

  if (structure === 'multi-page') {
    return (
      <>
        <RoutedStructure
          config={config}
          stats={stats}
          enabledSections={enabledSections}
          renderSection={renderSection}
        />
        <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
      </>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col bg-bg-primary text-text-primary relative ${structure === 'resume' ? 'resume-mode' : ''}`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-lg focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
        style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-bg-primary)' }}
      >
        Skip to content
      </a>

      {structure !== 'resume' && <AnimatedBackground />}

      <Nav
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        config={config}
        scrollProgress={scrollProgress}
        navStyle={navStyle}
        showSectionLinks={showSectionLinks}
      />

      <main
        id="main-content"
        tabIndex={-1}
        className={`flex-1 relative z-10 ${navStyle === 'timeline' && showSectionLinks ? 'md:pl-56' : ''}`}
      >
        {structure === 'bento' ? (
          <DashboardStructure
            config={config}
            stats={stats}
            enabledSections={enabledSections}
            renderSection={renderSection}
            getSectionTeaser={getSectionTeaser}
          />
        ) : structure === 'case-study' ? (
          <CaseStudyStructure
            config={config}
            stats={stats}
            enabledSections={enabledSections}
            renderSection={renderSection}
          />
        ) : (
          <ScrollStructure
            config={config}
            stats={stats}
            highlights={highlights}
            enabledSections={enabledSections}
            sectionRefs={sectionRefs}
            isTabsNav={isTabsNav}
            activeSection={activeSection}
            renderSection={renderSection}
            compact={structure === 'resume'}
          />
        )}
      </main>

      <Footer config={config} />

      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default App;
