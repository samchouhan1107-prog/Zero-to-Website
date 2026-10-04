export interface BrainIdeaDay {
  id: string;
  dayIndex: number;
  dayLabel: string;
  title: string;
  summary: string;
  focus: string;
  accent: string;
  yearProgress: number;
}

const DAY_MS = 24 * 60 * 60 * 1000;

export const DAILY_BRAIN_IDEAS = [
  {
    id: 'idea-01',
    title: 'Ship one semantic section',
    summary: 'Build a clearer page structure with a header, navigation, main content, and an elegant footer.',
    focus: 'HTML structure',
    accent: 'from-sky-500 via-cyan-500 to-blue-600',
  },
  {
    id: 'idea-02',
    title: 'Give your layout breathing room',
    summary: 'Use spacing and alignment intentionally so the page feels premium instead of crowded.',
    focus: 'CSS rhythm',
    accent: 'from-violet-500 via-purple-500 to-indigo-600',
  },
  {
    id: 'idea-03',
    title: 'Turn a clumsy component into a system',
    summary: 'Design one reusable card, button, or grid so your whole interface feels consistent.',
    focus: 'Design systems',
    accent: 'from-amber-400 via-orange-500 to-rose-500',
  },
  {
    id: 'idea-04',
    title: 'Teach the browser with a tiny interaction',
    summary: 'Use one practical DOM interaction to make an idea feel concrete and memorable.',
    focus: 'JavaScript learning',
    accent: 'from-emerald-400 via-teal-500 to-cyan-600',
  },
  {
    id: 'idea-05',
    title: 'Reduce friction before adding more features',
    summary: 'Clean up the visual hierarchy, spacing, and navigation before expanding the page.',
    focus: 'Frontend cleanup',
    accent: 'from-pink-500 via-rose-500 to-red-500',
  },
  {
    id: 'idea-06',
    title: 'Make one feature feel effortless',
    summary: 'Examine how a single interaction can deliver delight without complexity.',
    focus: 'UX polish',
    accent: 'from-indigo-500 via-blue-500 to-sky-500',
  },
  {
    id: 'idea-07',
    title: 'Write one tiny tutorial snippet',
    summary: 'Turn a hard concept into a short, actionable example someone can reuse immediately.',
    focus: 'Documentation',
    accent: 'from-fuchsia-500 via-violet-500 to-purple-600',
  },
  {
    id: 'idea-08',
    title: 'Check the page on a smaller screen',
    summary: 'Quickly verify desktop and mobile spacing, readability, and menu clarity.',
    focus: 'Responsive QA',
    accent: 'from-cyan-500 via-sky-500 to-blue-600',
  },
  {
    id: 'idea-09',
    title: 'Simplify a messy state flow',
    summary: 'Make the interaction easier to reason about by naming the state clearly and reducing noise.',
    focus: 'State clarity',
    accent: 'from-yellow-400 via-amber-500 to-orange-500',
  },
  {
    id: 'idea-10',
    title: 'Improve one reading experience',
    summary: 'Tune fonts, contrast, and spacing so the content feels comfortable to scan.',
    focus: 'Readable interfaces',
    accent: 'from-lime-400 via-emerald-500 to-green-600',
  },
  {
    id: 'idea-11',
    title: 'Create a learning cue people remember',
    summary: 'Add a memorable visual metaphor or pattern that helps the concept stick.',
    focus: 'Mental models',
    accent: 'from-teal-400 via-cyan-500 to-blue-500',
  },
  {
    id: 'idea-12',
    title: 'Ship a clean iteration, not a perfect rewrite',
    summary: 'Choose one visible improvement and polish it until it feels intentional and complete.',
    focus: 'Iteration',
    accent: 'from-rose-500 via-pink-500 to-fuchsia-500',
  },
];

export function getDayOfYearIndex(date: Date = new Date()): number {
  const safeDate = new Date(date);
  const startsAt = new Date(safeDate.getFullYear(), 0, 1);
  const diffDays = Math.floor((safeDate.getTime() - startsAt.getTime()) / DAY_MS);
  return Math.min(365, Math.max(1, diffDays + 1));
}

export function getDailyBrainIdea(date: Date = new Date()): BrainIdeaDay {
  const dayIndex = getDayOfYearIndex(date);
  const baseIdea = DAILY_BRAIN_IDEAS[(dayIndex - 1) % DAILY_BRAIN_IDEAS.length];

  return {
    ...baseIdea,
    dayIndex,
    dayLabel: `Day ${dayIndex} of 365`,
    yearProgress: Math.round((dayIndex / 365) * 100),
  };
}
