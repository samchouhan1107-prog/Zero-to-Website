import { XpMilestone } from '../types';

export const XP_MILESTONES: XpMilestone[] = [
  {
    id: 'milestone-100',
    xpRequired: 100,
    title: 'Explorer Debut',
    rank: 'Web Novice',
    badge: '🧭',
    rewardDescription: 'Unlocked Interactive Visual Lab & Practice Sandbox',
    unlockedPerks: [
      'Interactive 3D Visualizer Lab Access',
      'Real-Time Client-Server Packet Simulator',
      'Novice Coder Community Badge'
    ],
    motivationQuote: 'Every expert software engineer started with a single HTML tag and a dream.',
    accentColor: 'indigo',
  },
  {
    id: 'milestone-250',
    xpRequired: 250,
    title: 'HTML & Semantic Craftsman',
    rank: 'Markup Apprentice',
    badge: '🧱',
    rewardDescription: 'Unlocked DOM Tree Inspector & Semantic Hierarchy Analyzer',
    unlockedPerks: [
      'Interactive DOM Tree Generator',
      'CSS Box Model Padding & Margin Studio',
      'Checkpoint Quiz Mastery Multipliers'
    ],
    motivationQuote: 'Semantic structure is the foundation of accessible, world-class digital experiences.',
    accentColor: 'amber',
  },
  {
    id: 'milestone-500',
    xpRequired: 500,
    title: 'CSS Styling Architect',
    rank: 'Cascade Virtuoso',
    badge: '🎨',
    rewardDescription: 'Unlocked 3D Box Model Matrix & Flexbox Alignment Playground',
    unlockedPerks: [
      'Interactive Flexbox & CSS Grid Matrix Playground',
      'Live Pseudo-Class & Hover State Debugger',
      'Bronze Level Certificate Seal on Dashboard'
    ],
    motivationQuote: 'You have mastered visual aesthetics, layout distribution, and modern CSS physics.',
    accentColor: 'pink',
  },
  {
    id: 'milestone-750',
    xpRequired: 750,
    title: 'JavaScript Logic Dynamo',
    rank: 'Script Engineer',
    badge: '⚡',
    rewardDescription: 'Unlocked Async Event Loop Studio & JavaScript Live Sandbox',
    unlockedPerks: [
      'Interactive DOM Event Dispatcher',
      'Async Request-Response Lifecycle Tracker',
      'AI Gemini Code Mentor Priority Queries'
    ],
    motivationQuote: 'Logic, functions, and state machines are now your playground.',
    accentColor: 'yellow',
  },
  {
    id: 'milestone-1000',
    xpRequired: 1000,
    title: 'Responsive Layout Pioneer',
    rank: 'Full-Stack Scholar',
    badge: '📱',
    rewardDescription: 'Unlocked Multi-Device Responsive Viewport Emulator',
    unlockedPerks: [
      'Mobile/Tablet/Desktop Live Viewport Simulator',
      'Silver Level Digital Credential Verification',
      'Advanced CSS Grid Auto-Fit Generator'
    ],
    motivationQuote: 'One thousand XP! Your web apps scale flawlessly across any screen on earth.',
    accentColor: 'emerald',
  },
  {
    id: 'milestone-1500',
    xpRequired: 1500,
    title: 'React & Component Ace',
    rank: 'Component Maestro',
    badge: '⚛️',
    rewardDescription: 'Unlocked Component Lifecycle Engine & State Tree Inspector',
    unlockedPerks: [
      'Custom React Hook & State Visualizer',
      'Gold Academic Distinction Plaque',
      'Printable High-Resolution Certificate of Mastery'
    ],
    motivationQuote: 'Decomposing complex UIs into clean, declarative reactive components is second nature.',
    accentColor: 'cyan',
  },
  {
    id: 'milestone-2000',
    xpRequired: 2000,
    title: 'Git Flow & Web Grandmaster',
    rank: 'Lead System Architect',
    badge: '👑',
    rewardDescription: 'Unlocked Git DAG Branch Graph Simulator & Cloud Deployment Hub',
    unlockedPerks: [
      'Interactive Git Commit & Rebase Simulator',
      'Official WZ Storehouse Grandmaster Seal',
      'Lifetime Academic Honor Roll Recognition'
    ],
    motivationQuote: 'You have conquered the full spectrum of modern web development craftsmanship!',
    accentColor: 'purple',
  },
  {
    id: 'milestone-3000',
    xpRequired: 3000,
    title: 'WZ Storehouse Fellow',
    rank: 'Legendary Pioneer',
    badge: '🌟',
    rewardDescription: 'Unlocked All Masterclass Secrets & Infinite Prestige Rank',
    unlockedPerks: [
      'Honorary Digital Fellow Badge',
      'Diamond Verifiable Blockchain Credential ID',
      'Infinite XP Prestige Aura'
    ],
    motivationQuote: 'A rare achievement reached by only the top 1% of dedicated web engineering scholars.',
    accentColor: 'rose',
  }
];

export function getNextMilestone(currentXp: number): XpMilestone | null {
  return XP_MILESTONES.find((m) => m.xpRequired > currentXp) || null;
}

export function getCurrentMilestone(currentXp: number): XpMilestone {
  const achieved = XP_MILESTONES.filter((m) => m.xpRequired <= currentXp);
  return achieved[achieved.length - 1] || XP_MILESTONES[0];
}

export function getMilestoneProgressPercent(currentXp: number): { percent: number; current: XpMilestone; next: XpMilestone | null } {
  const current = getCurrentMilestone(currentXp);
  const next = getNextMilestone(currentXp);

  if (!next) {
    return { percent: 100, current, next: null };
  }

  const prevRequirement = currentXp >= current.xpRequired ? current.xpRequired : 0;
  const range = next.xpRequired - prevRequirement;
  const gained = currentXp - prevRequirement;
  const percent = Math.min(100, Math.max(0, Math.round((gained / range) * 100)));

  return { percent, current, next };
}

// Synthesize pleasant congratulatory audio fanfare via Web Audio API
export function playMilestoneFanfare() {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const now = ctx.currentTime;
    // Chords: C5 (523.25), E5 (659.25), G5 (783.99), C6 (1046.50)
    const notes = [
      { freq: 523.25, time: now + 0.05, duration: 0.25 },
      { freq: 659.25, time: now + 0.20, duration: 0.25 },
      { freq: 783.99, time: now + 0.35, duration: 0.35 },
      { freq: 1046.50, time: now + 0.55, duration: 0.60 },
    ];

    notes.forEach(({ freq, time, duration }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.exponentialRampToValueAtTime(0.2, time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + duration);
    });
  } catch (e) {
    // Audio playback fallback if blocked by browser policy
  }
}
