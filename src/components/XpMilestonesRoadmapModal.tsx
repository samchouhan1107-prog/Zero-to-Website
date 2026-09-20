import React, { useState, useMemo, useCallback, memo } from 'react';
import {
  X,
  Trophy,
  Lock,
  CheckCircle2,
  Flame,
  Star,
  ChevronRight,
  Award,
  Zap,
} from 'lucide-react';
import { UserProgress, XpMilestone } from '../utils/types';
import { XP_MILESTONES, getMilestoneProgressPercent } from '../data/milestonesData';

const COURSE_ACHIEVEMENTS = [
  { id: 'first_lesson', title: 'First Step Taken', icon: '🌱', description: 'Complete your first guided lesson', xpReward: 100 },
  { id: 'git_pioneer', title: 'Git Pioneer', icon: '🐙', description: 'Master Chapter 01 Dev Environment and Version Control', xpReward: 150 },
  { id: 'html_architect', title: 'HTML Architect', icon: '🧱', description: 'Complete all HTML structure and semantic markup lessons', xpReward: 200 },
  { id: 'css_architect', title: 'CSS Stylist', icon: '🎨', description: 'Master Chapter 03 Box Model, Typography, and Selectors', xpReward: 200 },
  { id: 'flexbox_master', title: 'Flexbox Maestro', icon: '📐', description: 'Conquer 1D Flexbox alignment and axis distribution', xpReward: 250 },
  { id: 'grid_master', title: 'Grid Strategist', icon: '🪟', description: 'Design fluid 2D CSS Grid templates and auto-fit layouts', xpReward: 250 },
  { id: 'responsive_ninja', title: 'Responsive Ninja', icon: '📱', description: 'Master mobile-first media queries and responsive images', xpReward: 300 },
  { id: 'js_engineer', title: 'DOM Commander', icon: '⚡', description: 'Harness JavaScript DOM manipulation and browser events', xpReward: 300 },
  { id: 'capstone_builder', title: 'Full-Stack Creator', icon: '🚀', description: 'Submit and verify your Chapter 10 Capstone Portfolio project', xpReward: 500 },
  { id: 'full_graduate', title: 'Curriculum Graduate', icon: '🎓', description: 'Complete all 11 chapters from Web Foundations to Cloud Deployment', xpReward: 1000 },
  { id: 'concept_explorer_5', title: 'Conceptual Explorer', icon: '🧠', description: 'Master 5 core web engineering concepts and verify understanding', xpReward: 150 },
  { id: 'concept_scholar_15', title: 'Curriculum Scholar', icon: '📚', description: 'Master 15 comprehensive web specifications and architecture concepts', xpReward: 300 },
];

interface XpMilestonesRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onTriggerCelebration: (milestone: XpMilestone) => void;
}

// Error boundary for robust error handling
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean; error?: Error }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('XP Modal Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 bg-white dark:bg-slate-900 rounded-lg border border-red-500 text-center">
            <h3 className="text-lg font-bold text-red-600 mb-2">Something went wrong</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Please try refreshing the page.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const MilestoneCard = memo(({ 
  milestone, 
  isUnlocked, 
  isClaimed, 
  isNext, 
  onClaim,
  claimedMilestones,
  progressXP
}: {
  milestone: XpMilestone;
  isUnlocked: boolean;
  isClaimed: boolean;
  isNext: boolean;
  onClaim: (milestone: XpMilestone) => void;
  claimedMilestones: string[];
  progressXP: number;
}) => {
  const handleClaim = useCallback(() => {
    if (!isClaimed && isUnlocked && progressXP >= milestone.xpRequired) {
      onClaim(milestone);
    }
  }, [isClaimed, isUnlocked, progressXP, milestone, onClaim]);

  return (
    <div
      key={milestone.id}
      className={`relative p-4 rounded-2xl border-2 transition-all ${
        isClaimed
          ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700'
          : isNext
          ? 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-700 ring-2 ring-indigo-400/50'
          : isUnlocked
          ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700'
          : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-60'
      }`}
      role="listitem"
      aria-label={`${milestone.title} - ${isClaimed ? 'Claimed' : isUnlocked ? 'Unlocked' : 'Locked'} milestone`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
            isClaimed
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
              : isUnlocked
              ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
          }`}
        >
          {isClaimed ? (
            <CheckCircle2 className="w-7 h-7" />
          ) : isUnlocked ? (
            <span>{milestone.badge}</span>
          ) : (
            <Lock className="w-6 h-6" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-black text-slate-900 dark:text-white truncate">
              {milestone.title}
            </h3>
            {isNext && (
              <span className="shrink-0 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-500 text-white">
                Next Goal
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              isClaimed
                ? 'bg-emerald-200 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}>
              {milestone.rank}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {milestone.xpRequired} XP required
            </span>
          </div>

          <div className="space-y-1">
            {milestone.unlockedPerks.slice(0, 2).map((perk, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                <Zap className="w-3 h-3 text-amber-500 shrink-0" />
                <span>{perk}</span>
              </div>
            ))}
            {milestone.unlockedPerks.length > 2 && (
              <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                +{milestone.unlockedPerks.length - 2} more perks
              </p>
            )}
          </div>
        </div>

        <div className="shrink-0">
          {isClaimed ? (
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Claimed</span>
            </div>
          ) : isUnlocked ? (
            <button
              onClick={handleClaim}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors shadow-lg shadow-amber-500/30"
              aria-label={`Claim ${milestone.title} milestone`}
              disabled={isClaimed || !isUnlocked}
            >
              <Award className="w-3.5 h-3.5" />
              Claim
            </button>
          ) : (
            <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
              <Lock className="w-3.5 h-3.5" />
              <span>Locked</span>
            </div>
          )}
        </div>
      </div>

      <div className="absolute -bottom-3 left-7 w-0.5 h-3 bg-slate-200 dark:bg-slate-700" />
    </div>
  );
});

MilestoneCard.displayName = 'MilestoneCard';

const AchievementCard = memo(({ 
  achievement, 
  isUnlocked, 
  unlockedData
}: {
  achievement: typeof COURSE_ACHIEVEMENTS[0];
  isUnlocked: boolean;
  unlockedData?: any;
}) => {
  return (
    <div
      key={achievement.id}
      className={`p-4 rounded-2xl border-2 transition-all ${
        isUnlocked
          ? 'bg-amber-500/10 border-amber-500/40 shadow-sm'
          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
      }`}
      role="listitem"
      aria-label={`${achievement.title} achievement`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-2xl ${
          isUnlocked ? 'bg-amber-500/20' : 'bg-slate-200 dark:bg-slate-700'
        }`}>
          {isUnlocked ? achievement.icon : '🔒'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {achievement.title}
            </h4>
            <span className="font-mono text-[10px] font-bold text-amber-500 shrink-0">
              +{achievement.xpReward} XP
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
            {achievement.description}
          </p>
          {isUnlocked && unlockedData?.unlockedAt && (
            <span className="inline-block text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mt-2">
              ✓ Unlocked {new Date(unlockedData.unlockedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

AchievementCard.displayName = 'AchievementCard';

export const XpMilestonesRoadmapModal: React.FC<XpMilestonesRoadmapModalProps> = ({
  isOpen,
  onClose,
  progress,
  onTriggerCelebration,
}) => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'achievements'>('roadmap');
  
  if (!isOpen) return null;

  // Memoize expensive calculations for better performance
  const progressData = useMemo(() => {
    const { percent, current, next } = getMilestoneProgressPercent(progress.xpPoints);
    return { percent, current, next };
  }, [progress.xpPoints]);

  const claimedMilestones = useMemo(() => progress.claimedMilestones || [], [progress.claimedMilestones]);
  const achievementsList = useMemo(() => Array.isArray(progress.achievements) ? progress.achievements : [], [progress.achievements]);
  const unlockedAchievementMap = useMemo(() => new Map(achievementsList.map((a) => [a.id, a])), [achievementsList]);
  const unlockedCount = achievementsList.length;
  
  const { percent, current, next } = progressData;

  const handleClaimMilestone = useCallback((milestone: XpMilestone) => {
    if (!claimedMilestones.includes(milestone.id) && progress.xpPoints >= milestone.xpRequired) {
      onTriggerCelebration(milestone);
    }
  }, [claimedMilestones, progress.xpPoints, onTriggerCelebration]);

  return (
    <div
      id="milestones-roadmap-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl border-2 border-indigo-500/40 shadow-2xl shadow-indigo-500/20 overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  XP Milestones & Level Roadmap
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Track your progress and unlock rewards
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close milestones modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-4 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <button
              type="button"
              onClick={() => setActiveTab('roadmap')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'roadmap'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>XP Level Roadmap</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('achievements')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'achievements'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Badges &amp; Achievements ({unlockedCount}/{COURSE_ACHIEVEMENTS.length})</span>
            </button>
          </div>

          {/* Current Progress Card */}
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-200 dark:border-indigo-800/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{current.badge}</span>
                <div>
                  <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    Current Rank
                  </p>
                  <p className="text-sm font-black text-slate-900 dark:text-white">
                    {current.rank}: {current.title}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1.5 text-amber-500">
                  <Flame className="w-5 h-5 fill-current" />
                  <span className="text-2xl font-black">{progress.xpPoints}</span>
                  <span className="text-sm font-bold text-amber-600">XP</span>
                </div>
              </div>
            </div>

            {/* Progress Bar to Next Milestone */}
            {next ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-600 dark:text-slate-300">
                    Progress to {next.title}
                  </span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {percent}%
                  </span>
                </div>
                <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  <strong className="text-indigo-600 dark:text-indigo-400">{next.xpRequired - progress.xpPoints} XP</strong> more to unlock the next milestone
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-bold">All milestones achieved! You are a true master!</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div 
          className="overflow-y-auto p-6 pt-4 space-y-3" 
          style={{ maxHeight: 'calc(90vh - 280px)' }}
          role="region"
          aria-label="Milestones and achievements content"
          tabIndex={0}
        >
          {activeTab === 'roadmap' ? (
            <div role="list" aria-label="XP Level Roadmap">
              {XP_MILESTONES.map((milestone, index) => {
                const isUnlocked = progress.xpPoints >= milestone.xpRequired;
                const isClaimed = claimedMilestones.includes(milestone.id);
                const isNext = next?.id === milestone.id;

                return (
                  <MilestoneCard
                    key={milestone.id}
                    milestone={milestone}
                    isUnlocked={isUnlocked}
                    isClaimed={isClaimed}
                    isNext={isNext}
                    onClaim={handleClaimMilestone}
                    claimedMilestones={claimedMilestones}
                    progressXP={progress.xpPoints}
                  />
                );
              })}
            </div>
          ) : (
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-3" 
              role="list" 
              aria-label="Course achievements and badges"
            >
              {COURSE_ACHIEVEMENTS.map((achievement) => {
                const unlocked = unlockedAchievementMap.get(achievement.id);
                const isUnlocked = Boolean(unlocked);

                return (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    isUnlocked={isUnlocked}
                    unlockedData={unlocked}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Keep learning to unlock more milestones!
            </p>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors"
            >
              Continue Learning
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export wrapped with error boundary for production safety
export const SafeXpMilestonesRoadmapModal = (props: XpMilestonesRoadmapModalProps) => (
  <ErrorBoundary>
    <XpMilestonesRoadmapModal {...props} />
  </ErrorBoundary>
);