import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Code2,
  Bug,
  ListOrdered,
  Zap,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Printer,
  Copy,
  Check,
  Award,
  Layers,
  ArrowRight,
  Flame,
  Lightbulb,
  ExternalLink,
  GraduationCap,
  Shuffle,
  Eye,
  EyeOff,
  Gauge,
  Shield,
  Filter,
} from 'lucide-react';
import { Chapter, Lesson, UserProgress, DifficultyLevel } from '../types';
import { ACTIVITIES_DATA, getActivityDeckForLesson } from '../data/activitiesData';
import { DifficultyBadge, getNormalizedDifficulty } from './DifficultyBadge';

interface ActivitiesViewProps {
  chapters: Chapter[];
  currentLessonId?: string;
  onSelectLesson: (lessonId: string) => void;
  onNavigateToLesson: (lessonId: string) => void;
  progress: UserProgress;
  onCompleteActivity: (activityId: string, xpReward: number) => void;
}

type ActivityTab = 'flashcards' | 'bughunt' | 'sequence' | 'speedquiz' | 'cheatsheet';

// Helper to determine difficulty for each activity type in a lesson
const getDifficultyForActivity = (
  deck: ReturnType<typeof getActivityDeckForLesson>,
  type: ActivityTab
): DifficultyLevel => {
  switch (type) {
    case 'flashcards':
      return deck.flashcards[0]?.difficulty || 'Beginner';
    case 'bughunt':
      return getNormalizedDifficulty(deck.bugHunt.difficulty);
    case 'sequence':
      return deck.codeSequence.difficulty || (deck.bugHunt.difficulty === 'Hard' ? 'Advanced' : deck.bugHunt.difficulty === 'Medium' ? 'Intermediate' : 'Beginner');
    case 'speedquiz':
      return deck.speedQuiz[0]?.difficulty || (deck.bugHunt.difficulty === 'Hard' ? 'Advanced' : 'Intermediate');
    case 'cheatsheet':
      return 'Beginner';
    default:
      return 'Beginner';
  }
};

// Helper for overall deck difficulty
const getOverallDeckDifficulty = (deck: ReturnType<typeof getActivityDeckForLesson>): DifficultyLevel => {
  if (deck.overallDifficulty) return deck.overallDifficulty;
  const bugDiff = getNormalizedDifficulty(deck.bugHunt.difficulty);
  if (bugDiff === 'Advanced' || bugDiff === 'Mastery') return 'Advanced';
  if (bugDiff === 'Intermediate') return 'Intermediate';
  return 'Beginner';
};

export const ActivitiesView: React.FC<ActivitiesViewProps> = ({
  chapters,
  currentLessonId,
  onSelectLesson,
  onNavigateToLesson,
  progress,
  onCompleteActivity,
}) => {
  // All lessons flat array
  const allLessons = chapters.flatMap((c) => c.lessons.map((l) => ({ ...l, chapter: c })));

  // Selected lesson state
  const [selectedLessonId, setSelectedLessonId] = useState<string>(() => {
    if (currentLessonId && allLessons.some((l) => l.id === currentLessonId)) {
      return currentLessonId;
    }
    return allLessons[0]?.id || 'ch-00-l-01';
  });

  // Sync if currentLessonId changes from outside
  useEffect(() => {
    if (currentLessonId && allLessons.some((l) => l.id === currentLessonId)) {
      setSelectedLessonId(currentLessonId);
    }
  }, [currentLessonId]);

  const activeLessonInfo = allLessons.find((l) => l.id === selectedLessonId) || allLessons[0];
  const activeChapter = activeLessonInfo?.chapter || chapters[0];
  const activityDeck = getActivityDeckForLesson(selectedLessonId);

  // Active Tab
  const [activeTab, setActiveTab] = useState<ActivityTab>('flashcards');

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});

  // Bug hunt state
  const [userCode, setUserCode] = useState(activityDeck.bugHunt.brokenCode);
  const [bugHuntStatus, setBugHuntStatus] = useState<'unsolved' | 'correct' | 'incorrect'>('unsolved');
  const [showBugHint, setShowBugHint] = useState(false);

  // Code sequence state
  const [sequenceOrder, setSequenceOrder] = useState<string[]>([]);
  const [sequenceStatus, setSequenceStatus] = useState<'unsolved' | 'correct' | 'incorrect'>('unsolved');

  // Speed quiz state
  const [speedQuizAnswers, setSpeedQuizAnswers] = useState<Record<string, number>>({});
  const [speedQuizSubmitted, setSpeedQuizSubmitted] = useState(false);

  // Copy state
  const [copiedCheat, setCopiedCheat] = useState(false);

  // Reset local exercise states when switching lessons
  useEffect(() => {
    setFlashcardIndex(0);
    setIsFlipped(false);
    setUserCode(activityDeck.bugHunt.brokenCode);
    setBugHuntStatus('unsolved');
    setShowBugHint(false);

    // Shuffle code sequence steps
    const shuffled = [...activityDeck.codeSequence.steps]
      .sort(() => Math.random() - 0.5)
      .map((s) => s.id);
    setSequenceOrder(shuffled);
    setSequenceStatus('unsolved');

    setSpeedQuizAnswers({});
    setSpeedQuizSubmitted(false);
  }, [selectedLessonId]);

  // Flashcard Handlers
  const currentCard = activityDeck.flashcards[flashcardIndex] || activityDeck.flashcards[0];
  const handleToggleMastered = (cardId: string) => {
    setMasteredCards((prev) => {
      const next = { ...prev, [cardId]: !prev[cardId] };
      const masteredCount = Object.values(next).filter(Boolean).length;
      if (masteredCount === activityDeck.flashcards.length) {
        onCompleteActivity(`activity-fc-${selectedLessonId}`, 30);
      }
      return next;
    });
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % activityDeck.flashcards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev - 1 + activityDeck.flashcards.length) % activityDeck.flashcards.length);
  };

  // Bug Hunt Handler
  const handleVerifyBugFix = () => {
    // Normalize code for comparison
    const cleanUser = userCode.replace(/\s+/g, ' ').trim();
    const cleanFixed = activityDeck.bugHunt.fixedCode.replace(/\s+/g, ' ').trim();
    
    // Check if key fix conditions are satisfied
    const isExact = cleanUser === cleanFixed;
    const isPassing = isExact || (
      !userCode.includes('onclick') && 
      !userCode.includes('TypeError') && 
      !userCode.includes('trailing comma') &&
      userCode.length > 20
    );

    if (isPassing) {
      setBugHuntStatus('correct');
      onCompleteActivity(`activity-bug-${selectedLessonId}`, 40);
    } else {
      setBugHuntStatus('incorrect');
    }
  };

  // Sequence Reordering Handlers
  const handleMoveStep = (index: number, direction: 'up' | 'down') => {
    const newArr = [...sequenceOrder];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newArr.length) return;
    const temp = newArr[index];
    newArr[index] = newArr[targetIdx];
    newArr[targetIdx] = temp;
    setSequenceOrder(newArr);
    setSequenceStatus('unsolved');
  };

  const handleCheckSequence = () => {
    const correctStepIds = [...activityDeck.codeSequence.steps]
      .sort((a, b) => a.order - b.order)
      .map((s) => s.id);
    
    const isCorrect = sequenceOrder.every((id, idx) => id === correctStepIds[idx]);
    if (isCorrect) {
      setSequenceStatus('correct');
      onCompleteActivity(`activity-seq-${selectedLessonId}`, 35);
    } else {
      setSequenceStatus('incorrect');
    }
  };

  // Speed Quiz Handlers
  const handleSelectQuizOption = (questionId: string, optionIdx: number) => {
    if (speedQuizSubmitted) return;
    setSpeedQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitSpeedQuiz = () => {
    setSpeedQuizSubmitted(true);
    const correctCount = activityDeck.speedQuiz.filter(
      (q) => speedQuizAnswers[q.id] === q.correctIndex
    ).length;
    if (correctCount === activityDeck.speedQuiz.length) {
      onCompleteActivity(`activity-quiz-${selectedLessonId}`, 50);
    }
  };

  const handleCopyCheatsheet = () => {
    const content = `# Cheatsheet: ${activeLessonInfo.title}\n\n` +
      activityDeck.cheatsheetItems.map((c) => `### ${c.term}\n${c.definition}\n`).join('\n');
    navigator.clipboard.writeText(content);
    setCopiedCheat(true);
    setTimeout(() => setCopiedCheat(false), 2000);
  };

  // Calculations for activity progress
  const fcMastered = Object.keys(masteredCards).filter((k) => k.startsWith('fc-') && masteredCards[k]).length;
  const isBugSolved = bugHuntStatus === 'correct';
  const isSeqSolved = sequenceStatus === 'correct';
  const isQuizPassed = speedQuizSubmitted && activityDeck.speedQuiz.every((q) => speedQuizAnswers[q.id] === q.correctIndex);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8 select-none">
      
      {/* 1. Header Hero Card */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 dark:bg-[#0b0d13] border border-slate-800 dark:border-[#1a1e2a] p-6 sm:p-10 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs px-3 py-1 rounded-full font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                Post-Class Activity Hub
              </span>
              <span className="text-xs font-mono text-slate-400">/</span>
              <span className="text-xs font-bold text-slate-300">Chapter {activeChapter.number}</span>
              <span className="text-xs font-mono text-slate-400">/</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Lesson Challenge:</span>
                <DifficultyBadge level={getOverallDeckDifficulty(activityDeck)} size="sm" />
              </div>
            </div>

            {/* Switch Class Dropdown Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="lesson-select" className="text-xs font-bold text-slate-400 hidden sm:inline">
                Class / Lesson:
              </label>
              <select
                id="lesson-select"
                value={selectedLessonId}
                onChange={(e) => {
                  setSelectedLessonId(e.target.value);
                  onSelectLesson(e.target.value);
                }}
                className="px-3 py-2 rounded-xl bg-slate-800 dark:bg-[#141722] border border-slate-700 dark:border-[#222b40] text-xs font-bold text-slate-100 outline-none focus:border-emerald-500 cursor-pointer shadow-xs max-w-[280px] sm:max-w-xs"
              >
                {chapters.map((ch) => (
                  <optgroup key={ch.id} label={`Chapter ${ch.number}: ${ch.title}`}>
                    {ch.lessons.map((les) => {
                      const lesDeck = getActivityDeckForLesson(les.id);
                      const diff = getOverallDeckDifficulty(lesDeck);
                      return (
                        <option key={les.id} value={les.id}>
                          [{diff}] {les.number} {les.title}
                        </option>
                      );
                    })}
                  </optgroup>
                ))}
              </select>

              <button
                onClick={() => onNavigateToLesson(selectedLessonId)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-indigo-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                title="Return to full lesson theory"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Read Lesson</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Activities & Mastery: {activeLessonInfo.title}
              </h1>
              <DifficultyBadge level={getOverallDeckDifficulty(activityDeck)} size="md" />
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
              Lock in concepts right after class through active recall flashcards, bug hunting, code ordering puzzles, and speed checks with difficulty guidance.
            </p>
          </div>

          {/* Quick Mastery Status Badges & Activity Difficulty Matrix */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs">
            <span className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-bold ${
              fcMastered > 0 ? 'bg-indigo-950/60 border-indigo-700/60 text-indigo-300' : 'bg-slate-800/60 border-slate-700/50 text-slate-400'
            }`}>
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Flashcards: {fcMastered}/{activityDeck.flashcards.length}
              </div>
              <DifficultyBadge level={getDifficultyForActivity(activityDeck, 'flashcards')} size="sm" showIcon={false} />
            </span>

            <span className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-bold ${
              isBugSolved ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300' : 'bg-slate-800/60 border-slate-700/50 text-slate-400'
            }`}>
              <div className="flex items-center gap-1.5">
                <Bug className="w-3.5 h-3.5 text-emerald-400" />
                Bug Hunt: {isBugSolved ? 'Solved ✓' : 'Pending'}
              </div>
              <DifficultyBadge level={getDifficultyForActivity(activityDeck, 'bughunt')} size="sm" showIcon={false} />
            </span>

            <span className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-bold ${
              isSeqSolved ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300' : 'bg-slate-800/60 border-slate-700/50 text-slate-400'
            }`}>
              <div className="flex items-center gap-1.5">
                <ListOrdered className="w-3.5 h-3.5 text-amber-400" />
                Code Order: {isSeqSolved ? 'Mastered ✓' : 'Pending'}
              </div>
              <DifficultyBadge level={getDifficultyForActivity(activityDeck, 'sequence')} size="sm" showIcon={false} />
            </span>

            <span className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-bold ${
              isQuizPassed ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300' : 'bg-slate-800/60 border-slate-700/50 text-slate-400'
            }`}>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                Speed Check: {isQuizPassed ? 'Passed ✓' : 'Pending'}
              </div>
              <DifficultyBadge level={getDifficultyForActivity(activityDeck, 'speedquiz')} size="sm" showIcon={false} />
            </span>
          </div>
        </div>
      </section>

      {/* 2. Activity Mode Navigation Bar with Difficulty Badges */}
      <nav aria-label="Activity Mode Tabs" className="flex items-center gap-2 overflow-x-auto pb-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-[#0e111a] border border-slate-200 dark:border-[#1a1f2e] shadow-xs">
        <button
          onClick={() => setActiveTab('flashcards')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'flashcards'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#161c2c]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>1. Flashcards</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full font-mono bg-white/20">
            {activityDeck.flashcards.length}
          </span>
          <DifficultyBadge level={getDifficultyForActivity(activityDeck, 'flashcards')} size="sm" showIcon={false} className="hidden sm:inline-flex" />
        </button>

        <button
          onClick={() => setActiveTab('bughunt')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'bughunt'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#161c2c]'
          }`}
        >
          <Bug className="w-4 h-4" />
          <span>2. Bug Hunt</span>
          {isBugSolved && <span className="text-[10px] text-emerald-200">✓</span>}
          <DifficultyBadge level={getDifficultyForActivity(activityDeck, 'bughunt')} size="sm" showIcon={false} className="hidden sm:inline-flex" />
        </button>

        <button
          onClick={() => setActiveTab('sequence')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'sequence'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#161c2c]'
          }`}
        >
          <ListOrdered className="w-4 h-4" />
          <span>3. Code Order</span>
          {isSeqSolved && <span className="text-[10px] text-amber-200">✓</span>}
          <DifficultyBadge level={getDifficultyForActivity(activityDeck, 'sequence')} size="sm" showIcon={false} className="hidden sm:inline-flex" />
        </button>

        <button
          onClick={() => setActiveTab('speedquiz')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'speedquiz'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#161c2c]'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>4. Speed Recall</span>
          {isQuizPassed && <span className="text-[10px] text-cyan-200">✓</span>}
          <DifficultyBadge level={getDifficultyForActivity(activityDeck, 'speedquiz')} size="sm" showIcon={false} className="hidden sm:inline-flex" />
        </button>

        <button
          onClick={() => setActiveTab('cheatsheet')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'cheatsheet'
              ? 'bg-slate-800 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#161c2c]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>5. Cheatsheet</span>
          <DifficultyBadge level="Beginner" size="sm" showIcon={false} className="hidden sm:inline-flex" />
        </button>
      </nav>

      {/* 3. Tab Contents */}

      {/* TAB 1: FLASHCARDS */}
      {activeTab === 'flashcards' && (
        <section className="space-y-6 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-500" />
                  Active Recall Deck
                </h2>
                <DifficultyBadge level={getDifficultyForActivity(activityDeck, 'flashcards')} size="sm" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Flip cards to test memory retention. Click card to reveal the answer.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-900">
                Card {flashcardIndex + 1} of {activityDeck.flashcards.length}
              </span>
            </div>
          </div>

          {/* 3D Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[260px] sm:min-h-[300px] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-[#1e2538] bg-gradient-to-br from-white to-slate-50 dark:from-[#101420] dark:to-[#090c14] shadow-xl hover:border-indigo-400/80 transition-all cursor-pointer relative flex flex-col justify-between group select-none"
          >
            {/* Top Bar on Card */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {currentCard.category}
                </span>
                <DifficultyBadge level={currentCard.difficulty || getDifficultyForActivity(activityDeck, 'flashcards')} size="sm" />
              </div>
              <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 group-hover:text-indigo-500">
                <RotateCcw className="w-3.5 h-3.5" />
                Click to flip
              </span>
            </div>

            {/* Front / Back Card Content */}
            <div className="py-6 space-y-4">
              {!isFlipped ? (
                <div className="space-y-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Question / Concept:
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                    {currentCard.front}
                  </h3>
                </div>
              ) : (
                <div className="space-y-3 animate-fade-in">
                  <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Answer & Key Rule:
                  </span>
                  <p className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                    {currentCard.back}
                  </p>
                  {currentCard.codeSnippet && (
                    <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800 mt-2">
                      <code>{currentCard.codeSnippet}</code>
                    </pre>
                  )}
                  {currentCard.tip && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{currentCard.tip}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Bar: Action Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-[#1a2030] text-xs">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleMastered(currentCard.id);
                }}
                className={`px-3.5 py-1.5 rounded-xl border font-bold flex items-center gap-1.5 transition-all ${
                  masteredCards[currentCard.id]
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                {masteredCards[currentCard.id] ? 'Mastered ✓ (+30 XP)' : 'Mark as Mastered'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevCard();
                  }}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  aria-label="Previous card"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextCard();
                  }}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  aria-label="Next card"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: BUG HUNT */}
      {activeTab === 'bughunt' && (
        <section className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#10131d] border border-slate-200 dark:border-[#1e2538] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <Bug className="w-5 h-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      {activityDeck.bugHunt.title}
                    </h2>
                    <DifficultyBadge level={getNormalizedDifficulty(activityDeck.bugHunt.difficulty)} size="sm" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Language: {activityDeck.bugHunt.language.toUpperCase()} • XP Reward: +40 XP
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowBugHint(!showBugHint)}
                className="px-3 py-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-500/20 transition-all cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                {showBugHint ? 'Hide Hint' : 'Reveal Hint'}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activityDeck.bugHunt.description}
            </p>

            {showBugHint && (
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200 text-xs font-medium animate-fade-in">
                💡 <strong>Hint:</strong> {activityDeck.bugHunt.hint}
              </div>
            )}

            {/* Code Editor */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>// Edit the code below to eliminate the bug:</span>
                <button
                  onClick={() => {
                    setUserCode(activityDeck.bugHunt.brokenCode);
                    setBugHuntStatus('unsolved');
                  }}
                  className="hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full h-44 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-xs leading-relaxed outline-none focus:border-emerald-500 resize-none shadow-inner"
                spellCheck={false}
              />
            </div>

            {/* Verification Result Feedback */}
            {bugHuntStatus === 'correct' && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-900 dark:text-emerald-200 text-xs space-y-1 animate-fade-in">
                <div className="flex items-center gap-2 font-black text-sm text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Bug Fixed Successfully! (+40 XP)
                </div>
                <p>{activityDeck.bugHunt.explanation}</p>
              </div>
            )}

            {bugHuntStatus === 'incorrect' && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/40 text-rose-900 dark:text-rose-200 text-xs space-y-1 animate-fade-in">
                <div className="flex items-center gap-2 font-black text-sm text-rose-600 dark:text-rose-400">
                  <AlertCircle className="w-4 h-4" /> Bug Still Detected
                </div>
                <p>Check the syntax and logic. Click "Reveal Hint" if you need guidance!</p>
              </div>
            )}

            <button
              onClick={handleVerifyBugFix}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Verify & Run Fix</span>
            </button>
          </div>
        </section>
      )}

      {/* TAB 3: CODE SEQUENCE (PARSONS PUZZLE) */}
      {activeTab === 'sequence' && (
        <section className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#10131d] border border-slate-200 dark:border-[#1e2538] space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                  <ListOrdered className="w-5 h-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      {activityDeck.codeSequence.title}
                    </h2>
                    <DifficultyBadge level={getDifficultyForActivity(activityDeck, 'sequence')} size="sm" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activityDeck.codeSequence.instructions}
                  </p>
                </div>
              </div>
            </div>

            {/* Sequence Blocks Reordering */}
            <div className="space-y-2.5 pt-2">
              {sequenceOrder.map((stepId, idx) => {
                const stepObj = activityDeck.codeSequence.steps.find((s) => s.id === stepId);
                if (!stepObj) return null;

                return (
                  <div
                    key={stepId}
                    className="p-3.5 rounded-2xl bg-white dark:bg-[#080b12] border border-slate-200 dark:border-[#1d2335] flex items-center justify-between gap-3 shadow-xs hover:border-amber-400/80 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-500 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <pre className="font-mono text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                        <code>{stepObj.code}</code>
                      </pre>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleMoveStep(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-white disabled:opacity-30 cursor-pointer"
                        title="Move step up"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => handleMoveStep(idx, 'down')}
                        disabled={idx === sequenceOrder.length - 1}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-white disabled:opacity-30 cursor-pointer"
                        title="Move step down"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {sequenceStatus === 'correct' && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-900 dark:text-emerald-200 text-xs space-y-1 animate-fade-in">
                <div className="flex items-center gap-2 font-black text-sm text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Perfect Sequence! (+35 XP)
                </div>
                <p>{activityDeck.codeSequence.explanation}</p>
              </div>
            )}

            {sequenceStatus === 'incorrect' && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/40 text-rose-900 dark:text-rose-200 text-xs space-y-1 animate-fade-in">
                <div className="flex items-center gap-2 font-black text-sm text-rose-600 dark:text-rose-400">
                  <AlertCircle className="w-4 h-4" /> Order is not quite right
                </div>
                <p>Think through the logical lifecycle and chronological execution order.</p>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleCheckSequence}
                className="flex-1 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-black text-xs transition-all shadow-md shadow-amber-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Check Order</span>
              </button>

              <button
                onClick={() => {
                  const shuffled = [...activityDeck.codeSequence.steps]
                    .sort(() => Math.random() - 0.5)
                    .map((s) => s.id);
                  setSequenceOrder(shuffled);
                  setSequenceStatus('unsolved');
                }}
                className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Shuffle className="w-4 h-4" />
                <span>Reshuffle</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: SPEED RECALL CHECK */}
      {activeTab === 'speedquiz' && (
        <section className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#10131d] border border-slate-200 dark:border-[#1e2538] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500">
                  <Zap className="w-5 h-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      Speed Recall Sprint
                    </h2>
                    <DifficultyBadge level={getDifficultyForActivity(activityDeck, 'speedquiz')} size="sm" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Fast-paced questions to verify understanding after class.
                  </p>
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-cyan-400 px-3 py-1 rounded-xl bg-cyan-950/60 border border-cyan-800">
                {activityDeck.speedQuiz.length} Questions
              </span>
            </div>

            <div className="space-y-6">
              {activityDeck.speedQuiz.map((q, qIdx) => {
                const selected = speedQuizAnswers[q.id];
                const isAnswered = selected !== undefined;
                const isCorrect = selected === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#07090f] border border-slate-200 dark:border-[#1a1f2e] space-y-3 shadow-xs"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {qIdx + 1}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                        {q.prompt}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        let optStyle = 'border-slate-200 dark:border-[#1a2030] bg-slate-50/70 dark:bg-[#0d101a] text-slate-700 dark:text-slate-300 hover:border-indigo-400';
                        if (speedQuizSubmitted) {
                          if (optIdx === q.correctIndex) {
                            optStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                          } else if (selected === optIdx) {
                            optStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold';
                          }
                        } else if (selected === optIdx) {
                          optStyle = 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-xs';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectQuizOption(q.id, optIdx)}
                            className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${optStyle}`}
                          >
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {speedQuizSubmitted && (
                      <p className="text-xs p-3 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/40 text-indigo-950 dark:text-indigo-200">
                        <strong>Explanation:</strong> {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {!speedQuizSubmitted ? (
              <button
                onClick={handleSubmitSpeedQuiz}
                disabled={Object.keys(speedQuizAnswers).length < activityDeck.speedQuiz.length}
                className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-black text-xs transition-all shadow-md shadow-cyan-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Submit Speed Answers (+50 XP)</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setSpeedQuizAnswers({});
                  setSpeedQuizSubmitted(false);
                }}
                className="w-full py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Sprint Again</span>
              </button>
            )}
          </div>
        </section>
      )}

      {/* TAB 5: CHEATSHEET & STUDY GUIDE */}
      {activeTab === 'cheatsheet' && (
        <section className="space-y-6 animate-fade-in">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-[#10131d] border border-slate-200 dark:border-[#1e2538] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-[#1a2030] pb-4">
              <div>
                <h2 className="text-base sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-500" />
                  Quick Study Cheatsheet: {activeLessonInfo.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Key terminology, definitions, and code syntax snippets.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCheatsheet}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  {copiedCheat ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCheat ? 'Copied Markdown!' : 'Copy Sheet'}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print PDF</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activityDeck.cheatsheetItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white dark:bg-[#080b12] border border-slate-200 dark:border-[#1a1f2e] space-y-1.5 shadow-xs"
                >
                  <span className="text-xs font-black font-mono text-indigo-600 dark:text-cyan-400">
                    {item.term}
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Link to next lesson */}
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/40 flex items-center justify-between">
              <div className="text-xs text-indigo-950 dark:text-indigo-200 font-medium">
                Ready for the next topic in <strong>Chapter {activeChapter.number}</strong>?
              </div>
              <button
                onClick={() => onNavigateToLesson(selectedLessonId)}
                className="text-xs px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <span>Continue Curriculum</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};
