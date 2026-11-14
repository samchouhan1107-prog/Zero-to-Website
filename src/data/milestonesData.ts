import { XpMilestone } from '../types';

export const XP_MILESTONES: XpMilestone[] = [
  {
    id: 'milestone-100',
    xpRequired: 100,
    title: 'Explorer Debut',
    rank: 'Web Novice',
    badge: '🧭',
    rewardDescription: 'Claim this milestone for a one-time 100 XP bonus.',
    unlockedPerks: [],
    motivationQuote: 'Every expert software engineer started with a single HTML tag and a dream.',
    accentColor: 'indigo',
  },
  {
    id: 'milestone-250',
    xpRequired: 250,
    title: 'HTML & Semantic Craftsman',
    rank: 'Markup Apprentice',
    badge: '🧱',
    rewardDescription: 'Claim this milestone for a one-time 100 XP bonus.',
    unlockedPerks: [],
    motivationQuote: 'Semantic structure is the foundation of accessible, world-class digital experiences.',
    accentColor: 'amber',
  },
  {
    id: 'milestone-500',
    xpRequired: 500,
    title: 'CSS Styling Architect',
    rank: 'Cascade Virtuoso',
    badge: '🎨',
    rewardDescription: 'Claim this milestone for a one-time 100 XP bonus.',
    unlockedPerks: [],
    motivationQuote: 'You have mastered visual aesthetics, layout distribution, and modern CSS physics.',
    accentColor: 'pink',
  },
  {
    id: 'milestone-750',
    xpRequired: 750,
    title: 'JavaScript Logic Dynamo',
    rank: 'Script Engineer',
    badge: '⚡',
    rewardDescription: 'Claim this milestone for a one-time 100 XP bonus.',
    unlockedPerks: [],
    motivationQuote: 'Logic, functions, and state machines are now your playground.',
    accentColor: 'yellow',
  },
  {
    id: 'milestone-1000',
    xpRequired: 1000,
    title: 'Responsive Layout Pioneer',
    rank: 'Full-Stack Scholar',
    badge: '📱',
    rewardDescription: 'Claim this milestone for a one-time 100 XP bonus.',
    unlockedPerks: [],
    motivationQuote: 'Responsive design improves through testing on different screens.',
    accentColor: 'emerald',
  },
  {
    id: 'milestone-1500',
    xpRequired: 1500,
    title: 'React & Component Ace',
    rank: 'Component Maestro',
    badge: '⚛️',
    rewardDescription: 'Claim this milestone for a one-time 100 XP bonus.',
    unlockedPerks: [],
    motivationQuote: 'Decomposing complex UIs into clean, declarative reactive components is second nature.',
    accentColor: 'cyan',
  },
  {
    id: 'milestone-2000',
    xpRequired: 2000,
    title: 'Git Flow & Web Grandmaster',
    rank: 'Lead System Architect',
    badge: '👑',
    rewardDescription: 'Claim this milestone for a one-time 100 XP bonus.',
    unlockedPerks: [],
    motivationQuote: 'You are building a broad foundation across modern web development.',
    accentColor: 'purple',
  },
  {
    id: 'milestone-3000',
    xpRequired: 3000,
    title: 'WZ Storehouse Fellow',
    rank: 'Legendary Pioneer',
    badge: '🌟',
    rewardDescription: 'Claim this milestone for a one-time 100 XP bonus.',
    unlockedPerks: [],
    motivationQuote: 'Consistent practice builds skill over time. Keep learning and keep making things.',
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
