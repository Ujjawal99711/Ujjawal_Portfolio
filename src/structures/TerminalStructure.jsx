import React, { useEffect, useRef, useState } from 'react';
import {
  welcomeBanner,
  helpText,
  aboutText,
  experienceText,
  skillsText,
  projectsText,
  resolveProject,
  educationText,
  awardsText,
  certificationsText,
  contactText,
  lsText,
  catText,
} from './terminalCommands';

/**
 * A real simulated shell, not a color skin: commands are typed and parsed, output is
 * built from the same JSON data every other structure uses. "open <project>" hands off
 * to the shared ProjectModal so this structure still benefits from that component.
 */
export default function TerminalStructure({
  config,
  aboutMe,
  experience,
  techStacks,
  projects,
  education,
  awards,
  certifications,
  onOpenProject,
}) {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const data = {
    config,
    aboutMe,
    experience,
    techStacks,
    projects,
    education,
    awards,
    certifications,
  };

  useEffect(() => {
    setLines([{ type: 'output', content: welcomeBanner(config) }]);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const print = (content) => setLines((prev) => [...prev, { type: 'output', content }]);

  const runCommand = (raw) => {
    const trimmed = raw.trim();
    setLines((prev) => [...prev, { type: 'input', content: trimmed }]);
    if (!trimmed) return;

    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const [cmd, ...args] = trimmed.split(/\s+/);
    const lower = cmd.toLowerCase();

    switch (lower) {
      case 'help':
        print(helpText());
        break;
      case 'whoami':
      case 'about':
        print(aboutText(config, aboutMe));
        break;
      case 'experience':
        print(experienceText(experience));
        break;
      case 'skills':
        print(skillsText(techStacks));
        break;
      case 'projects':
        print(projectsText(projects));
        break;
      case 'open': {
        const project = resolveProject(projects, args.join(' '));
        if (project) {
          print(`Opening "${project.title}"...`);
          onOpenProject(project);
        } else {
          print(`No project matches "${args.join(' ')}". Try "projects" to list them.`);
        }
        break;
      }
      case 'education':
        print(educationText(education));
        break;
      case 'awards':
        print(awardsText(awards));
        break;
      case 'certifications':
        print(certificationsText(certifications));
        break;
      case 'contact':
        print(contactText(config));
        break;
      case 'ls':
        print(lsText());
        break;
      case 'cat':
        print(catText(args[0], data));
        break;
      case 'clear':
        setLines([]);
        return;
      default:
        print(`Command not found: ${cmd}. Type "help" for a list of commands.`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(cmdHistory[nextIndex]);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(nextIndex);
        setInput(cmdHistory[nextIndex]);
      }
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col px-4 py-6 md:px-10 md:py-10"
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        className="flex-1 max-w-4xl w-full mx-auto overflow-y-auto text-sm md:text-base leading-relaxed"
        style={{ color: 'var(--color-text-primary)', maxHeight: '85vh' }}
      >
        {lines.map((line, i) => (
          <div key={i} className="mb-2">
            {line.type === 'input' ? (
              <div>
                <span style={{ color: 'var(--color-primary)' }}>guest@portfolio</span>
                <span style={{ color: 'var(--color-text-muted)' }}>:~$ </span>
                <span>{line.content}</span>
              </div>
            ) : (
              <div style={{ whiteSpace: 'pre-wrap', color: 'var(--color-text-secondary)' }}>
                {line.content}
              </div>
            )}
          </div>
        ))}

        <div className="flex items-center">
          <label htmlFor="terminal-input" className="sr-only">
            Terminal command input
          </label>
          <span style={{ color: 'var(--color-primary)' }}>guest@portfolio</span>
          <span style={{ color: 'var(--color-text-muted)' }}>:~$&nbsp;</span>
          <input
            id="terminal-input"
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="flex-1 bg-transparent outline-none border-none"
            style={{
              color: 'var(--color-text-primary)',
              fontFamily: 'inherit',
              fontSize: 'inherit',
            }}
          />
        </div>
      </div>
    </div>
  );
}
