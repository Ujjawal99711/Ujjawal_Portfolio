// Plain-text formatters for the terminal structure's command output. Each function returns a
// string (with newlines) built only from real data passed in - no invented content.

export function welcomeBanner(config) {
  const name = config.personal?.name || 'this portfolio';
  return [
    `Welcome to ${name}'s portfolio.`,
    `Type "help" to see what you can do, or "ls" to look around.`,
  ].join('\n');
}

export function helpText() {
  return [
    'Available commands:',
    '  help            show this list',
    '  whoami / about  who I am',
    '  experience      work history',
    '  skills          tech stack & tools',
    '  projects        things I have built',
    '  open <n>        open project <n> from the projects list',
    '  education       degrees & focus areas',
    '  awards          awards & recognition',
    '  certifications  certifications',
    '  contact         how to reach me',
    '  ls              list sections as files',
    '  cat <file>      read a section (try "cat about.txt")',
    '  clear           clear the screen',
  ].join('\n');
}

export function aboutText(config, aboutMe) {
  const lines = [];
  if (config.personal?.name) lines.push(config.personal.name);
  if (config.bio?.headline) lines.push(config.bio.headline);
  lines.push('');
  if (aboutMe?.fullBio) lines.push(aboutMe.fullBio);
  else if (aboutMe?.shortBio) lines.push(aboutMe.shortBio);
  else if (config.bio?.subtitle) lines.push(config.bio.subtitle);
  if (aboutMe?.philosophy) lines.push('', `"${aboutMe.philosophy}"`);
  return lines.join('\n') || 'No about info yet.';
}

export function experienceText(experience) {
  if (!experience?.length) return 'No experience listed yet.';
  return experience
    .map((job) => {
      const roles = (job.roles || []).map((r) => `    - ${r.title} (${r.period})`).join('\n');
      const highlights = (job.highlights || []).map((h) => `    * ${h}`).join('\n');
      return [`${job.company}${job.location ? `  -  ${job.location}` : ''}`, roles, highlights]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n\n');
}

export function skillsText(techStacks) {
  const expertise = techStacks?.expertise || [];
  if (!expertise.length) return 'No skills listed yet.';
  return expertise
    .map((area) => {
      const categories = Object.entries(area.categories || {})
        .map(([cat, skills]) => `    ${cat}: ${skills.join(', ')}`)
        .join('\n');
      return [area.title, categories].filter(Boolean).join('\n');
    })
    .join('\n\n');
}

export function projectsText(projects) {
  if (!projects?.length) return 'No projects listed yet.';
  return projects
    .map((p, i) => `  [${i + 1}] ${p.title}${p.featured ? ' (featured)' : ''} - ${p.description}`)
    .join('\n');
}

export function resolveProject(projects, query) {
  if (!projects?.length || !query) return null;
  const asIndex = parseInt(query, 10);
  if (!Number.isNaN(asIndex) && projects[asIndex - 1]) return projects[asIndex - 1];
  const lower = query.toLowerCase();
  return projects.find((p) => p.title.toLowerCase().includes(lower)) || null;
}

export function educationText(education) {
  if (!education?.length) return 'No education listed yet.';
  return education
    .map((e) =>
      [
        `${e.degree} - ${e.institution} (${e.period})`,
        e.focus?.length ? `    Focus: ${e.focus.join(', ')}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    )
    .join('\n\n');
}

export function awardsText(awards) {
  if (!awards?.length) return 'No awards listed yet.';
  return awards.map((a) => `  ${a.title} - ${a.company} (${a.year})`).join('\n');
}

export function certificationsText(certifications) {
  if (!certifications?.length) return 'No certifications listed yet.';
  return certifications.map((c) => `  ${c.name} - ${c.issuer} (${c.date})`).join('\n');
}

export function contactText(config) {
  const p = config.personal || {};
  return [
    p.email ? `Email:    ${p.email}` : null,
    p.github ? `GitHub:   https://github.com/${p.github}` : null,
    p.linkedin ? `LinkedIn: https://www.linkedin.com/in/${p.linkedin}` : null,
    p.medium ? `Medium:   https://medium.com/@${p.medium}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}

const FILES = {
  'about.txt': 'about',
  'experience.log': 'experience',
  'skills.json': 'skills',
  'projects/': 'projects',
  'education.txt': 'education',
  'awards.txt': 'awards',
  'certifications.txt': 'certifications',
  'contact.txt': 'contact',
};

export function lsText() {
  return Object.keys(FILES).join('   ');
}

export function catText(filename, data) {
  if (!filename) return 'usage: cat <file>. Try "ls" to see what is here.';
  const command = FILES[filename];
  if (!command) return `cat: ${filename}: No such file. Try "ls".`;
  return runNamedCommand(command, data);
}

export function runNamedCommand(command, data) {
  switch (command) {
    case 'about':
      return aboutText(data.config, data.aboutMe);
    case 'experience':
      return experienceText(data.experience);
    case 'skills':
      return skillsText(data.techStacks);
    case 'projects':
      return projectsText(data.projects);
    case 'education':
      return educationText(data.education);
    case 'awards':
      return awardsText(data.awards);
    case 'certifications':
      return certificationsText(data.certifications);
    case 'contact':
      return contactText(data.config);
    default:
      return '';
  }
}
