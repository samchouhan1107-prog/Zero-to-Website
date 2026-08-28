import React from 'react';
import { Sparkles, Zap, Shield, Flame, Gauge } from 'lucide-react';
import { DifficultyLevel } from '../types';

interface DifficultyBadgeProps {
  level: DifficultyLevel | 'Easy' | 'Medium' | 'Hard' | string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const getNormalizedDifficulty = (level: string): DifficultyLevel => {
  const clean = level.toLowerCase().trim();
  if (clean === 'easy' || clean === 'beginner' || clean === 'intro' || clean === 'basic') {
    return 'Beginner';
  }
  if (clean === 'medium' || clean === 'intermediate' || clean === 'mod' || clean === 'standard') {
    return 'Intermediate';
  }
  if (clean === 'hard' || clean === 'advanced' || clean === 'complex' || clean === 'pro') {
    return 'Advanced';
  }
  if (clean === 'mastery' || clean === 'expert') {
    return 'Mastery';
  }
  return 'Beginner';
};

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({
  level,
  size = 'md',
  showIcon = true,
  className = '',
}) => {
  const normLevel = getNormalizedDifficulty(level || 'Beginner');

  // Aesthetic styling configurations with distinct color accents and semantic borders
  const config = {
    Beginner: {
      label: 'Beginner',
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      text: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-500/30 dark:border-emerald-500/40',
      dot: 'bg-emerald-500',
      icon: Sparkles,
      tagline: 'Foundational concept',
    },
    Intermediate: {
      label: 'Intermediate',
      bg: 'bg-amber-500/10 dark:bg-amber-500/15',
      text: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-500/30 dark:border-amber-500/40',
      dot: 'bg-amber-500',
      icon: Zap,
      tagline: 'Practical application',
    },
    Advanced: {
      label: 'Advanced',
      bg: 'bg-rose-500/10 dark:bg-rose-500/15',
      text: 'text-rose-700 dark:text-rose-300',
      border: 'border-rose-500/30 dark:border-rose-500/40',
      dot: 'bg-rose-500',
      icon: Flame,
      tagline: 'High challenge',
    },
    Mastery: {
      label: 'Mastery',
      bg: 'bg-purple-500/10 dark:bg-purple-500/15',
      text: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-500/30 dark:border-purple-500/40',
      dot: 'bg-purple-500',
      icon: Shield,
      tagline: 'Expert depth',
    },
  }[normLevel];

  const IconComp = config.icon;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1 rounded-md font-bold',
    md: 'text-xs px-2.5 py-1 gap-1.5 rounded-lg font-bold',
    lg: 'text-sm px-3.5 py-1.5 gap-2 rounded-xl font-extrabold',
  }[size];

  const iconSizes = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  }[size];

  return (
    <span
      className={`inline-flex items-center border font-mono tracking-tight uppercase transition-all shadow-xs select-none ${config.bg} ${config.text} ${config.border} ${sizeClasses} ${className}`}
      title={`${config.label} challenge level • ${config.tagline}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse shrink-0`} />
      {showIcon && <IconComp className={`${iconSizes} shrink-0`} />}
      <span>{config.label}</span>
    </span>
  );
};
