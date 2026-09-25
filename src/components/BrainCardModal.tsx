import React, { useState, useEffect, useRef } from 'react';
import {
  Brain,
  Sparkles,
  Lightbulb,
  Terminal,
  Trash2,
  Copy,
  Check,
  Download,
  Upload,
  Calendar,
  Clock,
  Flame,
  X,
  ExternalLink,
  ShieldCheck,
  Cpu,
  RefreshCw,
  Play,
  Plus,
  Edit2,
  Pin,
  FolderOpen,
  ArrowRight,
  HardDrive,
  FileCode,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  BrainNote,
  WindowsRunCommand,
  WINDOWS_RUN_COMMANDS,
  SpaceWiperScriptOptions,
  generateSpaceWiperBatchScript,
  generateSpaceWiperPowerShellScript,
  get365BonusForDay,
  BrainBonusDay
} from '../data/brainCardData';
import {
  getBrainStoreState,
  saveBrainStoreState,
  getDailyBonusStatus,
  claimDailyBonusAction,
  addBrainNote,
  updateBrainNote,
  deleteBrainNote,
  export365Backup,
  downloadBackupFile,
  restoreBackupData,
  getBackupHistory,
  DailyBonusStatus
} from '../utils/brainStorage';

interface BrainCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateLesson?: (lessonId: string) => void;
  onAwardXp?: (amount: number, reason: string) => void;
  initialTab?: 'notes' | 'spacewiper' | 'bonuses' | 'backup';
}

export const BrainCardModal: React.FC<BrainCardModalProps> = ({
  isOpen,
  onClose,
  onNavigateLesson,
  onAwardXp,
  initialTab = 'notes'
}) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'spacewiper' | 'bonuses' | 'backup'>(initialTab);
  
  // Storage state
  const [notes, setNotes] = useState<BrainNote[]>([]);
  const [claimedDays, setClaimedDays] = useState<number[]>([]);
  const [streakDays, setStreakDays] = useState<number>(1);
  const [bonusStatus, setBonusStatus] = useState<DailyBonusStatus>(getDailyBonusStatus());
  
  // Timer state for 24h bonus
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);

  // Notes tab state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isEditingNote, setIsEditingNote] = useState<boolean>(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteCategory, setNoteCategory] = useState<BrainNote['category']>('maintenance');
  const [noteTags, setNoteTags] = useState('');
  const [copiedNoteId, setCopiedNoteId] = useState<string | null>(null);

  // Space Wiper & Windows Run state
  const [selectedCommand, setSelectedCommand] = useState<WindowsRunCommand>(WINDOWS_RUN_COMMANDS[0]);
  const [simulatedRunInput, setSimulatedRunInput] = useState<string>(WINDOWS_RUN_COMMANDS[0].command);
  const [simulatedExecutionLog, setSimulatedExecutionLog] = useState<string | null>(null);
  const [isSimulatingRun, setIsSimulatingRun] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [scriptType, setScriptType] = useState<'bat' | 'ps1'>('bat');
  const [scriptOptions, setScriptOptions] = useState<SpaceWiperScriptOptions>({
    cleanUserTemp: true,
    cleanSystemTemp: true,
    cleanPrefetch: true,
    flushDns: true,
    emptyRecycleBin: true,
    cleanThumbnailCache: true,
    cleanEdgeChromeCache: false,
    pauseOnComplete: true
  });
  const [copiedScript, setCopiedScript] = useState(false);
  const [isSimulatingCleanup, setIsSimulatingCleanup] = useState(false);
  const [cleanupOutputLogs, setCleanupOutputLogs] = useState<string[]>([]);
  const [simulatedSpaceCleared, setSimulatedSpaceCleared] = useState<string | null>(null);

  // 365 Bonuses tab state
  const [inspectedDayNumber, setInspectedDayNumber] = useState<number>(1);
  const [bonusSearchQuery, setBonusSearchQuery] = useState('');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // Backup tab state
  const [backupHistoryList, setBackupHistoryList] = useState<Array<{ date: string; notesCount: number; timestamp: number }>>([]);
  const [restoreJsonInput, setRestoreJsonInput] = useState('');
  const [restoreStatusMessage, setRestoreStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [copiedBackupJson, setCopiedBackupJson] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load and refresh state on open
  useEffect(() => {
    if (isOpen) {
      loadState();
    }
  }, [isOpen]);

  const loadState = () => {
    const state = getBrainStoreState();
    setNotes(state.notes);
    setClaimedDays(state.claimedDays);
    setStreakDays(state.streakDays);

    const bStatus = getDailyBonusStatus();
    setBonusStatus(bStatus);
    setSecondsRemaining(bStatus.secondsRemaining);
    setInspectedDayNumber(bStatus.currentDayOfYear);
    setBackupHistoryList(getBackupHistory());
  };

  // 24h Countdown interval
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      const bStatus = getDailyBonusStatus();
      setBonusStatus(bStatus);
      setSecondsRemaining(bStatus.secondsRemaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Format seconds to HH:MM:SS
  const formatTimer = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  };

  // Claim Daily Bonus
  const handleClaimBonus = (dayNumber?: number) => {
    const targetDay = dayNumber || bonusStatus.currentDayOfYear;
    const res = claimDailyBonusAction(targetDay);
    if (res.success) {
      // Confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Award XP
      if (onAwardXp) {
        onAwardXp(res.xpEarned, `Brain Card 24h Bonus: Day ${res.bonus.dayNumber}!`);
      }

      loadState();
    }
  };

  // Add Bonus to Brain Notes
  const handleSaveBonusToNotes = (bonus: BrainBonusDay) => {
    const newNote = addBrainNote({
      title: `💡 ${bonus.title} (${bonus.badge})`,
      content: `### 365-Day Daily Bonus: Day ${bonus.dayNumber}\n\n**Category:** ${bonus.category.toUpperCase()}\n\n**Pro-Tip:**\n${bonus.proTip}\n\n${bonus.suggestedCommand ? `**Recommended Command:**\n\`${bonus.suggestedCommand}\`\n\n` : ''}${bonus.codeSnippet ? `\`\`\`bash\n${bonus.codeSnippet}\n\`\`\`\n\n` : ''}**Curated Lesson Connection:**\n${bonus.lessonConnection.lessonTitle} (${bonus.lessonConnection.chapterNumber})\n*Takeaway:* ${bonus.lessonConnection.takeaway}`,
      category: 'maintenance',
      tags: ['Daily Bonus', bonus.badge, bonus.category, 'Day ' + bonus.dayNumber],
      pinned: true,
      linkedLessonId: bonus.lessonConnection.lessonId,
      linkedLessonTitle: bonus.lessonConnection.lessonTitle
    });

    setNotes((prev) => [newNote, ...prev]);
    setActiveTab('notes');
  };

  // Note CRUD handlers
  const handleStartNewNote = () => {
    setIsEditingNote(true);
    setEditingNoteId(null);
    setNoteTitle('');
    setNoteContent('');
    setNoteCategory('maintenance');
    setNoteTags('Space Wiper, Maintenance');
  };

  const handleEditNote = (note: BrainNote) => {
    setIsEditingNote(true);
    setEditingNoteId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteCategory(note.category);
    setNoteTags(note.tags.join(', '));
  };

  const handleSaveNoteForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;

    const tagsArray = noteTags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingNoteId) {
      updateBrainNote(editingNoteId, {
        title: noteTitle.trim(),
        content: noteContent.trim(),
        category: noteCategory,
        tags: tagsArray
      });
    } else {
      addBrainNote({
        title: noteTitle.trim(),
        content: noteContent.trim(),
        category: noteCategory,
        tags: tagsArray
      });
    }

    loadState();
    setIsEditingNote(false);
    setEditingNoteId(null);
  };

  const handleDeleteNoteAction = (id: string) => {
    deleteBrainNote(id);
    loadState();
  };

  const handleTogglePin = (note: BrainNote) => {
    updateBrainNote(note.id, { pinned: !note.pinned });
    loadState();
  };

  const handleCopyNoteContent = (note: BrainNote) => {
    navigator.clipboard.writeText(`${note.title}\n\n${note.content}`);
    setCopiedNoteId(note.id);
    setTimeout(() => setCopiedNoteId(null), 2000);
  };

  // Insert Templates into Note
  const handleInsertTemplate = (type: 'spacewiper' | 'winrun' | 'devtools') => {
    if (type === 'spacewiper') {
      setNoteTitle('🧹 PC Space Wiper: %temp%, temp, prefetch Checklist');
      setNoteContent(`### Weekly Computer Maintenance Checklist\n\n1. **%temp%** (User Temp):\n   - Win + R -> %temp%\n   - Ctrl + A -> Shift + Delete\n   - Frees: ~10GB - 30GB of browser cache and leftover installers.\n\n2. **temp** (Windows System Temp):\n   - Win + R -> temp\n   - Purges system install dumps.\n\n3. **prefetch** (Execution Cache):\n   - Win + R -> prefetch\n   - Removes obsolete program launch footprints.\n\n4. **cleanmgr** (Disk Cleanup Space Wiper):\n   - Win + R -> cleanmgr -> Clean up system files\n   - Check Windows Update Cleanup.\n\n*Note:* Files currently held by active programs will say "In Use" — click "Skip" safely!`);
      setNoteCategory('maintenance');
      setNoteTags('Space Wiper, %temp%, temp, prefetch, Disk Clean');
    } else if (type === 'winrun') {
      setNoteTitle('⚡ Windows Run Compiler & Shortcut Cheatsheet');
      setNoteContent(`### Fast Run Dialog Keys (Win + R)\n\n- \`%temp%\` : User AppData Cache\n- \`temp\` : System Temp\n- \`prefetch\` : Windows Prefetch Cache\n- \`cleanmgr\` : Disk Space Wiper Tool\n- \`ipconfig /flushdns\` : Clear DNS Resolver Cache\n- \`wsreset\` : Microsoft Store Reset\n- \`resmon\` : Resource Monitor (Disk / RAM analyzer)\n- \`taskmgr\` : Task Manager (Startup Apps manager)`);
      setNoteCategory('windows-run');
      setNoteTags('Windows Run, Win+R, Shortcuts');
    }
  };

  // Windows Run simulator execution
  const handleRunSimulator = () => {
    setIsSimulatingRun(true);
    setSimulatedExecutionLog('Launching Windows Run dialog compiler...');

    setTimeout(() => {
      const cmd = simulatedRunInput.trim().toLowerCase();
      let log = '';

      if (cmd === '%temp%') {
        log = `[OK] Windows Explorer opened to: C:\\Users\\User\\AppData\\Local\\Temp\n` +
              `> Found 1,482 cached files and folders (Est. 8.4 GB)\n` +
              `> Select all (Ctrl + A) and press Shift + Delete to wipe!`;
      } else if (cmd === 'temp') {
        log = `[OK] Windows Explorer opened to: C:\\Windows\\Temp\n` +
              `> Found 246 system temporary files (Est. 2.1 GB)\n` +
              `> Administrator access granted. Safe to purge.`;
      } else if (cmd === 'prefetch') {
        log = `[OK] Windows Explorer opened to: C:\\Windows\\Prefetch\n` +
              `> Found 312 execution trace files (*.pf)\n` +
              `> Deleting entries forces Windows to refresh trace maps for current apps.`;
      } else if (cmd.includes('cleanmgr')) {
        log = `[OK] Launching cleanmgr.exe (Windows Disk Cleanup Space Wiper)\n` +
              `> Scanning drive C:\\ for recoverable space...\n` +
              `> Ready: Temporary files, Recycle Bin, Windows Update files.`;
      } else if (cmd === 'ipconfig /flushdns') {
        log = `[OK] Windows Command Processor (CMD)\n` +
              `> C:\\Windows\\System32> ipconfig /flushdns\n` +
              `> Successfully flushed the DNS Resolver Cache.`;
      } else {
        log = `[OK] Executed "${simulatedRunInput}" via Windows Run System Interface.\n` +
              `> Target: ${selectedCommand.pathOrTarget}\n` +
              `> Status: Process initialized successfully.`;
      }

      setSimulatedExecutionLog(log);
      setIsSimulatingRun(false);
    }, 600);
  };

  // Script Generation
  const activeScriptContent = scriptType === 'bat'
    ? generateSpaceWiperBatchScript(scriptOptions)
    : generateSpaceWiperPowerShellScript(scriptOptions);

  const handleCopyScript = () => {
    navigator.clipboard.writeText(activeScriptContent);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleDownloadScript = () => {
    const filename = scriptType === 'bat' ? 'clean_pc_space_wiper.bat' : 'Clean-ComputerSpace.ps1';
    const blob = new Blob([activeScriptContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Simulated Space Wiper Execution
  const handleRunSimulatedCleanup = () => {
    setIsSimulatingCleanup(true);
    setCleanupOutputLogs(['[WebZoneBW Space Wiper] Initializing maintenance compilation...']);
    setSimulatedSpaceCleared(null);

    const steps = [
      '[1/5] Purging %temp% (User AppData Temporary Files)... Cleared 6.2 GB',
      '[2/5] Purging C:\\Windows\\Temp (System Installers)... Cleared 1.8 GB',
      '[3/5] Resetting C:\\Windows\\Prefetch (Stale trace binaries)... Cleared 450 MB',
      '[4/5] Flushing Windows DNS Resolver Cache... Verified OK',
      '[5/5] Emptying Recycle Bin and Thumbnail Databases... Cleared 1.4 GB',
      '=========================================================',
      '[SUCCESS] System Space Wiper finished cleanly! Total space recovered: 9.85 GB'
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setCleanupOutputLogs((prev) => [...prev, step]);
        if (idx === steps.length - 1) {
          setIsSimulatingCleanup(false);
          setSimulatedSpaceCleared('9.85 GB Cleared!');
        }
      }, (idx + 1) * 450);
    });
  };

  // Backup handlers
  const handleRestoreFromFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = restoreBackupData(content);
        if (res.success) {
          setRestoreStatusMessage({ type: 'success', text: res.message });
          loadState();
        } else {
          setRestoreStatusMessage({ type: 'error', text: res.message });
        }
      }
    };
    reader.readAsText(file);
  };

  const handleRestoreFromTextInput = () => {
    if (!restoreJsonInput.trim()) return;
    const res = restoreBackupData(restoreJsonInput);
    if (res.success) {
      setRestoreStatusMessage({ type: 'success', text: res.message });
      setRestoreJsonInput('');
      loadState();
    } else {
      setRestoreStatusMessage({ type: 'error', text: res.message });
    }
  };

  const handleCopyRawBackup = () => {
    const backupObj = export365Backup();
    navigator.clipboard.writeText(JSON.stringify(backupObj, null, 2));
    setCopiedBackupJson(true);
    setTimeout(() => setCopiedBackupJson(false), 2000);
  };

  // Filter notes
  const filteredNotes = notes.filter((n) => {
    const matchesCategory = selectedCategory === 'all' || n.category === selectedCategory;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  // Current inspected bonus
  const inspectedBonus = get365BonusForDay(inspectedDayNumber);
  const isInspectedClaimed = claimedDays.includes(inspectedDayNumber);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="brain-card-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in"
    >
      <div className="relative flex flex-col w-full max-w-5xl h-[92vh] max-h-[850px] rounded-2xl border border-blue-500/30 bg-app-surface text-app-ink shadow-2xl overflow-hidden">
        
        {/* TOP HEADER: Glowing Brain Brand, Day X/365, 24h Timer & Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-app-border bg-gradient-to-r from-blue-950/40 via-purple-950/30 to-app-surface px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-400/40">
              <Brain className="h-6 w-6 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400 text-[8px] font-bold text-black ring-1 ring-white">
                💡
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="brain-card-title" className="text-base sm:text-lg font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  BRAIN CARD 💡
                </h2>
                <span className="rounded-md border border-blue-500/40 bg-blue-500/10 px-2 py-0.5 font-mono text-[11px] font-bold text-blue-400">
                  Day {bonusStatus.currentDayOfYear} / 365
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold text-amber-400">
                  <Flame className="h-3 w-3" />
                  {streakDays}d Streak
                </span>
              </div>
              <p className="text-xs text-app-muted hidden sm:block">
                Computer Maintenance, Space Wiper Compiler, Brain Notes &amp; 365-Day Daily 24h Bonus Vault
              </p>
            </div>
          </div>

          {/* Right Header Status: 24h Countdown & Close */}
          <div className="flex items-center gap-2 sm:gap-3">
            {bonusStatus.isClaimable ? (
              <button
                type="button"
                onClick={() => handleClaimBonus()}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-amber-500/30 hover:brightness-110 active:scale-95 transition-all touch-manipulation cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Claim 24h Bonus (+{bonusStatus.todayBonus.xpReward} XP)</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 rounded-xl border border-app-border bg-app-inset px-2.5 py-1 text-xs text-app-muted font-mono">
                <Clock className="h-3.5 w-3.5 text-blue-400" />
                <span>Next Bonus in: {formatTimer(secondsRemaining)}</span>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-app-border bg-app-inset text-app-muted hover:bg-app-active hover:text-app-ink transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              aria-label="Close Brain Card"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-1 border-b border-app-border bg-app-inset/50 px-3 sm:px-6 py-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => { setActiveTab('notes'); setIsEditingNote(false); }}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              activeTab === 'notes'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                : 'text-app-muted hover:bg-app-active hover:text-app-ink'
            }`}
          >
            <Lightbulb className="h-4 w-4" />
            <span>Brain Notes 💡 ({notes.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('spacewiper')}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              activeTab === 'spacewiper'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                : 'text-app-muted hover:bg-app-active hover:text-app-ink'
            }`}
          >
            <Terminal className="h-4 w-4" />
            <span>Space Wiper &amp; Windows Run (Win+R)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bonuses')}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              activeTab === 'bonuses'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                : 'text-app-muted hover:bg-app-active hover:text-app-ink'
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>365-Day Bonuses ({claimedDays.length}/365)</span>
            {bonusStatus.isClaimable && (
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              activeTab === 'backup'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                : 'text-app-muted hover:bg-app-active hover:text-app-ink'
            }`}
          >
            <HardDrive className="h-4 w-4" />
            <span>365d Backup Vault</span>
          </button>
        </div>

        {/* TAB 1: BRAIN NOTES 💡 */}
        {activeTab === 'notes' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* Notes Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  placeholder="Search Brain Notes & Maintenance Tips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-56 sm:w-72 rounded-xl border border-app-border bg-app-inset px-3 py-1.5 text-xs text-app-ink placeholder:text-app-subtle focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="rounded-xl border border-app-border bg-app-inset px-3 py-1.5 text-xs text-app-ink focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <option value="all">All Categories ({notes.length})</option>
                  <option value="maintenance">Computer Maintenance</option>
                  <option value="windows-run">Windows Run Commands</option>
                  <option value="lesson-notes">Lesson Notes &amp; Coding</option>
                  <option value="shortcuts">Shortcuts</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleStartNewNote}
                  className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm shadow-blue-500/30 hover:bg-blue-500 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>+ New Brain Note</span>
                </button>
              </div>
            </div>

            {/* Note Editor Drawer / Form */}
            {isEditingNote && (
              <form onSubmit={handleSaveNoteForm} className="rounded-2xl border border-blue-500/40 bg-app-inset p-4 sm:p-5 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-400 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    {editingNoteId ? 'Edit Brain Note' : 'Create New Brain Note'}
                  </h3>
                  {/* Quick Insert Templates */}
                  <div className="flex items-center gap-1 text-[11px]">
                    <span className="text-app-muted">Quick Templates:</span>
                    <button
                      type="button"
                      onClick={() => handleInsertTemplate('spacewiper')}
                      className="rounded border border-app-border bg-app-surface px-2 py-0.5 text-blue-400 hover:bg-app-active"
                    >
                      + Space Wiper Guide
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertTemplate('winrun')}
                      className="rounded border border-app-border bg-app-surface px-2 py-0.5 text-purple-400 hover:bg-app-active"
                    >
                      + Win+R Shortcuts
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-app-muted mb-1">Note Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Space Wiper Routine & %temp% Cleanup"
                      value={noteTitle}
                      onChange={(e) => setNoteTitle(e.target.value)}
                      className="w-full rounded-xl border border-app-border bg-app-surface px-3 py-1.5 text-xs text-app-ink focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-app-muted mb-1">Category</label>
                    <select
                      value={noteCategory}
                      onChange={(e) => setNoteCategory(e.target.value as any)}
                      className="w-full rounded-xl border border-app-border bg-app-surface px-3 py-1.5 text-xs text-app-ink focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="maintenance">Computer Maintenance</option>
                      <option value="windows-run">Windows Run</option>
                      <option value="lesson-notes">Webpage Lesson Notes</option>
                      <option value="shortcuts">Dev Shortcuts</option>
                      <option value="general">General</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-app-muted mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="Space Wiper, Prefetch, %temp%, Disk Space"
                    value={noteTags}
                    onChange={(e) => setNoteTags(e.target.value)}
                    className="w-full rounded-xl border border-app-border bg-app-surface px-3 py-1.5 text-xs text-app-ink focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-app-muted mb-1">Note Content &amp; Instructions (Markdown supported)</label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Write maintenance commands, steps, compiler triggers, or lesson takeaways..."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="w-full rounded-xl border border-app-border bg-app-surface p-3 font-mono text-xs text-app-ink focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => { setIsEditingNote(false); setEditingNoteId(null); }}
                    className="rounded-xl border border-app-border bg-app-surface px-3 py-1.5 text-xs text-app-muted hover:text-app-ink"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow-md hover:bg-blue-500"
                  >
                    {editingNoteId ? 'Update Brain Note' : 'Save to Brain Vault'}
                  </button>
                </div>
              </form>
            )}

            {/* Notes List */}
            {sortedNotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-app-border p-10 text-center">
                <Lightbulb className="h-10 w-10 text-app-subtle mb-2" />
                <h4 className="text-sm font-bold text-app-muted">No Brain Notes matching filter</h4>
                <p className="text-xs text-app-subtle mt-1 max-w-sm">
                  Add custom maintenance reminders, commands like %temp% and prefetch, or save daily bonus tips!
                </p>
                <button
                  type="button"
                  onClick={handleStartNewNote}
                  className="mt-3 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500"
                >
                  Create Your First Note
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`flex flex-col justify-between rounded-2xl border p-4 sm:p-5 transition-all shadow-sm ${
                      note.pinned
                        ? 'border-blue-500/50 bg-blue-950/15 ring-1 ring-blue-500/20'
                        : 'border-app-border bg-app-inset/80 hover:border-app-border/80'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            note.category === 'maintenance'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : note.category === 'windows-run'
                              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                              : note.category === 'lesson-notes'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {note.category}
                          </span>
                          {note.pinned && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-400">
                              <Pin className="h-3 w-3 fill-amber-400" /> Pinned
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleTogglePin(note)}
                            title={note.pinned ? 'Unpin' : 'Pin note to top'}
                            className="p-1 rounded text-app-muted hover:text-amber-400"
                          >
                            <Pin className={`h-3.5 w-3.5 ${note.pinned ? 'fill-amber-400 text-amber-400' : ''}`} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCopyNoteContent(note)}
                            title="Copy note"
                            className="p-1 rounded text-app-muted hover:text-app-ink"
                          >
                            {copiedNoteId === note.id ? (
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEditNote(note)}
                            title="Edit note"
                            className="p-1 rounded text-app-muted hover:text-blue-400"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteNoteAction(note.id)}
                            title="Delete note"
                            className="p-1 rounded text-app-muted hover:text-red-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-app-ink mb-2">
                        {note.title}
                      </h4>

                      <div className="prose prose-sm max-w-none text-xs text-app-muted whitespace-pre-wrap font-sans leading-relaxed line-clamp-6">
                        {note.content}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-app-border/60 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-app-surface px-1.5 py-0.5 font-mono text-[9px] text-app-muted border border-app-border"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {note.linkedLessonId && onNavigateLesson && (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onNavigateLesson(note.linkedLessonId!);
                          }}
                          className="flex items-center gap-1 text-[11px] font-semibold text-blue-400 hover:text-blue-300"
                        >
                          <span>Go to Lesson</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SPACE WIPER & WINDOWS RUN (WIN + R) COMPILER */}
        {activeTab === 'spacewiper' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Section A: Windows Run Simulator & Compiler */}
            <div className="rounded-2xl border border-app-border bg-app-inset/70 p-4 sm:p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-app-ink flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-blue-400" />
                    Windows Run (Win + R) Maintenance Compiler
                  </h3>
                  <p className="text-xs text-app-muted">
                    Quickly launch built-in Windows space wipers like <code className="text-blue-400 font-bold">%temp%</code>, <code className="text-purple-400 font-bold">temp</code>, and <code className="text-amber-400 font-bold">prefetch</code>.
                  </p>
                </div>
                <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 font-mono text-xs font-bold text-blue-400">
                  Shortcut: Win + R
                </div>
              </div>

              {/* Quick Command Selector Pills */}
              <div className="flex items-center gap-2 flex-wrap">
                {WINDOWS_RUN_COMMANDS.map((cmd) => (
                  <button
                    key={cmd.command}
                    type="button"
                    onClick={() => {
                      setSelectedCommand(cmd);
                      setSimulatedRunInput(cmd.command);
                      setSimulatedExecutionLog(null);
                    }}
                    className={`rounded-xl px-3 py-1.5 text-xs font-mono font-bold transition-all border ${
                      selectedCommand.command === cmd.command
                        ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                        : 'border-app-border bg-app-surface text-app-muted hover:border-blue-500/50 hover:text-app-ink'
                    }`}
                  >
                    {cmd.command}
                  </button>
                ))}
              </div>

              {/* Realistic Windows Run Dialog Window Simulator */}
              <div className="mx-auto max-w-xl rounded-xl border-2 border-slate-600 bg-slate-900 text-slate-100 shadow-2xl p-4 font-sans space-y-3">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-white text-[10px] font-bold">
                      ⊞
                    </div>
                    <span className="text-xs font-bold">Run</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Windows Run Simulator</span>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/30 text-blue-400 border border-blue-500/40">
                    <FolderOpen className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-xs text-slate-300">
                      Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.
                    </p>
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-semibold text-slate-400">Open:</label>
                      <input
                        type="text"
                        value={simulatedRunInput}
                        onChange={(e) => setSimulatedRunInput(e.target.value)}
                        className="flex-1 rounded border border-slate-600 bg-slate-950 px-2.5 py-1 font-mono text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={handleRunSimulator}
                    disabled={isSimulatingRun}
                    className="rounded bg-blue-600 px-4 py-1 text-xs font-bold text-white hover:bg-blue-500 active:scale-95 disabled:opacity-50"
                  >
                    {isSimulatingRun ? 'Executing...' : 'OK'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSimulatedExecutionLog(null); }}
                    className="rounded border border-slate-600 bg-slate-800 px-3 py-1 text-xs text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(simulatedRunInput);
                      setCopiedCmd(true);
                      setTimeout(() => setCopiedCmd(false), 2000);
                    }}
                    className="rounded border border-slate-600 bg-slate-800 px-3 py-1 text-xs text-slate-300 hover:bg-slate-700 flex items-center gap-1"
                  >
                    {copiedCmd ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Simulated Run Output Screen */}
                {simulatedExecutionLog && (
                  <div className="mt-2 rounded-lg border border-slate-700 bg-black/90 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre-line animate-fade-in">
                    {simulatedExecutionLog}
                  </div>
                )}
              </div>

              {/* Selected Command Maintenance Breakdown */}
              <div className="rounded-xl border border-app-border bg-app-surface p-4 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-blue-400">
                      {selectedCommand.command}
                    </span>
                    <span className="text-xs font-semibold text-app-muted">
                      ({selectedCommand.alias})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                      Storage: {selectedCommand.typicalSpaceSaved}
                    </span>
                    <span className="rounded bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400 border border-blue-500/30">
                      Safety: {selectedCommand.dangerLevel}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-app-ink leading-relaxed">
                  {selectedCommand.description}
                </p>

                <div className="rounded-lg bg-app-inset p-3 space-y-1">
                  <span className="text-[11px] font-bold text-app-muted uppercase tracking-wider">How to use on your PC:</span>
                  <ol className="list-decimal list-inside text-xs text-app-ink space-y-1 font-sans">
                    {selectedCommand.instructions.map((step, idx) => (
                      <li key={idx} className="leading-normal">{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* Section B: Automated Space Wiper Script Compiler (.bat & .ps1) */}
            <div className="rounded-2xl border border-app-border bg-app-inset/70 p-4 sm:p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-app-ink flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-emerald-400" />
                    Automated Space Wiper Script Compiler
                  </h3>
                  <p className="text-xs text-app-muted">
                    Compile a safe 1-click batch (.bat) script to purge %temp%, prefetch, and cache in seconds!
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex rounded-xl border border-app-border bg-app-surface p-0.5">
                    <button
                      type="button"
                      onClick={() => setScriptType('bat')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        scriptType === 'bat' ? 'bg-blue-600 text-white' : 'text-app-muted hover:text-app-ink'
                      }`}
                    >
                      Windows Batch (.bat)
                    </button>
                    <button
                      type="button"
                      onClick={() => setScriptType('ps1')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        scriptType === 'ps1' ? 'bg-blue-600 text-white' : 'text-app-muted hover:text-app-ink'
                      }`}
                    >
                      PowerShell (.ps1)
                    </button>
                  </div>
                </div>
              </div>

              {/* Checkbox Options for compiler */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {[
                  { key: 'cleanUserTemp', label: 'Wipe User Temp (%temp%)', hint: 'Safe browser & app dumps' },
                  { key: 'cleanSystemTemp', label: 'Wipe System Temp (C:\\Windows\\Temp)', hint: 'Leftover installers' },
                  { key: 'cleanPrefetch', label: 'Purge Prefetch (C:\\Windows\\Prefetch)', hint: 'Stale launch traces' },
                  { key: 'flushDns', label: 'Flush DNS Resolver Cache', hint: 'Fix network lags' },
                  { key: 'emptyRecycleBin', label: 'Empty Windows Recycle Bin', hint: 'Permanent space return' },
                  { key: 'cleanThumbnailCache', label: 'Clear Thumbnail Cache', hint: 'Explorer cache rebuild' }
                ].map((opt) => (
                  <label
                    key={opt.key}
                    className="flex items-start gap-2.5 rounded-xl border border-app-border bg-app-surface p-2.5 cursor-pointer hover:border-blue-500/50"
                  >
                    <input
                      type="checkbox"
                      checked={(scriptOptions as any)[opt.key]}
                      onChange={(e) =>
                        setScriptOptions((prev) => ({
                          ...prev,
                          [opt.key]: e.target.checked
                        }))
                      }
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-app-ink">{opt.label}</div>
                      <div className="text-[10px] text-app-muted">{opt.hint}</div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyScript}
                    className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-blue-500"
                  >
                    {copiedScript ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedScript ? 'Copied Script!' : 'Copy Script'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadScript}
                    className="flex items-center gap-1.5 rounded-xl border border-blue-500/40 bg-blue-500/10 px-3.5 py-1.5 text-xs font-bold text-blue-400 hover:bg-blue-500/20"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download {scriptType === 'bat' ? '.bat' : '.ps1'}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleRunSimulatedCleanup}
                  disabled={isSimulatingCleanup}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-1.5 text-xs font-bold text-white shadow-md hover:brightness-110 active:scale-95 disabled:opacity-50"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>{isSimulatingCleanup ? 'Compiling & Running...' : 'Run In-App Test Simulation'}</span>
                </button>
              </div>

              {/* Simulation Terminal Output */}
              {cleanupOutputLogs.length > 0 && (
                <div className="rounded-xl border border-emerald-500/40 bg-black/95 p-4 font-mono text-xs space-y-1 animate-fade-in shadow-xl">
                  <div className="flex items-center justify-between pb-1 border-b border-emerald-500/20">
                    <span className="text-[11px] font-bold text-emerald-400">Space Wiper Live Simulation Terminal</span>
                    {simulatedSpaceCleared && (
                      <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                        {simulatedSpaceCleared}
                      </span>
                    )}
                  </div>
                  {cleanupOutputLogs.map((log, idx) => (
                    <div key={idx} className="text-emerald-300 leading-relaxed">
                      {log}
                    </div>
                  ))}
                </div>
              )}

              {/* Compiled Script Code View */}
              <div className="rounded-xl border border-app-border bg-black/90 p-3">
                <pre className="font-mono text-[11px] text-slate-300 overflow-x-auto max-h-48 leading-relaxed">
                  {activeScriptContent}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 365-DAY DAILY BONUSES & LESSON ENGINE */}
        {activeTab === 'bonuses' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Today's 24h Bonus Highlight Card */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-app-surface to-blue-950/20 p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-xl bg-amber-500 px-3 py-1 font-mono text-xs font-bold text-black shadow">
                    Day {bonusStatus.todayBonus.dayNumber} of 365
                  </span>
                  <span className="rounded-md border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-400">
                    {bonusStatus.todayBonus.badge}
                  </span>
                  <span className="text-xs font-bold text-emerald-400">
                    +{bonusStatus.todayBonus.xpReward} XP Reward
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {bonusStatus.isClaimable ? (
                    <button
                      type="button"
                      onClick={() => handleClaimBonus()}
                      className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-amber-500/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer animate-pulse"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Claim Today&apos;s Bonus</span>
                    </button>
                  ) : (
                    <span className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Claimed! Next bonus in {formatTimer(secondsRemaining)}</span>
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-app-ink">
                  {bonusStatus.todayBonus.title}
                </h3>
                <p className="mt-1 text-xs text-app-muted leading-relaxed">
                  {bonusStatus.todayBonus.summary}
                </p>
              </div>

              {/* Pro Tip Box */}
              <div className="rounded-xl border border-app-border bg-app-surface/90 p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Lightbulb className="h-4 w-4" />
                  <span>Daily Maintenance Pro-Tip</span>
                </div>
                <p className="text-xs text-app-ink leading-relaxed">
                  {bonusStatus.todayBonus.proTip}
                </p>

                {bonusStatus.todayBonus.codeSnippet && (
                  <div className="flex items-center justify-between rounded-lg bg-app-inset p-2 font-mono text-xs text-blue-400 border border-app-border">
                    <code>{bonusStatus.todayBonus.codeSnippet}</code>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(bonusStatus.todayBonus.codeSnippet!);
                        setCopiedSnippet(true);
                        setTimeout(() => setCopiedSnippet(false), 2000);
                      }}
                      className="text-app-muted hover:text-app-ink ml-2"
                      title="Copy command"
                    >
                      {copiedSnippet ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                )}
              </div>

              {/* Webpage Lesson Connection */}
              <div className="rounded-xl border border-blue-500/30 bg-blue-950/20 p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1 max-w-xl">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                    Connected WebZoneBW Curriculum Lesson:
                  </span>
                  <h4 className="text-xs font-bold text-app-ink">
                    {bonusStatus.todayBonus.lessonConnection.lessonTitle} ({bonusStatus.todayBonus.lessonConnection.chapterNumber})
                  </h4>
                  <p className="text-[11px] text-app-muted">
                    {bonusStatus.todayBonus.lessonConnection.takeaway}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSaveBonusToNotes(bonusStatus.todayBonus)}
                    className="flex items-center gap-1.5 rounded-xl border border-app-border bg-app-surface px-3 py-1.5 text-xs font-semibold text-app-ink hover:bg-app-active"
                  >
                    <Plus className="h-3.5 w-3.5 text-amber-400" />
                    <span>Save to Brain Notes</span>
                  </button>

                  {onNavigateLesson && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onNavigateLesson(bonusStatus.todayBonus.lessonConnection.lessonId);
                      }}
                      className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-blue-500"
                    >
                      <span>Jump to Lesson</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 365 Days Archive & Calendar Browser */}
            <div className="rounded-2xl border border-app-border bg-app-inset/70 p-4 sm:p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-app-ink flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-400" />
                    365-Day Bonus Library &amp; Roadmap
                  </h4>
                  <p className="text-xs text-app-muted">
                    Preview all 365 days of tech tips, space wiping commands, and lesson connections.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-app-muted">Jump to Day:</span>
                  <input
                    type="number"
                    min={1}
                    max={365}
                    value={inspectedDayNumber}
                    onChange={(e) => setInspectedDayNumber(Math.max(1, Math.min(365, parseInt(e.target.value) || 1)))}
                    className="w-16 rounded-lg border border-app-border bg-app-surface px-2 py-1 font-mono text-xs text-app-ink focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Inspected Day Details */}
              <div className="rounded-xl border border-app-border bg-app-surface p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-purple-500/20 px-2.5 py-0.5 font-mono text-xs font-bold text-purple-400 border border-purple-500/30">
                      Day {inspectedBonus.dayNumber} of 365
                    </span>
                    <h5 className="text-xs font-bold text-app-ink">{inspectedBonus.title}</h5>
                  </div>

                  <div className="flex items-center gap-2">
                    {claimedDays.includes(inspectedBonus.dayNumber) ? (
                      <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Unlocked in Vault
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleClaimBonus(inspectedBonus.dayNumber)}
                        className="rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-1 text-[11px] font-bold hover:bg-amber-500/30"
                      >
                        Claim Bonus (+{inspectedBonus.xpReward} XP)
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-app-muted leading-relaxed">
                  {inspectedBonus.proTip}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-app-border/60">
                  <div className="text-[11px] text-app-muted">
                    <span className="font-bold text-blue-400">Lesson:</span> {inspectedBonus.lessonConnection.lessonTitle}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSaveBonusToNotes(inspectedBonus)}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Save to Brain Notes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: 365-DAY BACKUP VAULT */}
        {activeTab === 'backup' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* 365d Backup Health Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-2xl border border-app-border bg-app-inset/80 p-4 space-y-1">
                <span className="text-[11px] font-bold text-app-muted uppercase">365-Day Vault Integrity</span>
                <div className="text-lg font-extrabold text-emerald-400 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  <span>100% Active &amp; Ready</span>
                </div>
                <p className="text-[11px] text-app-subtle">
                  Automatic rolling backups retained locally for 365 days.
                </p>
              </div>

              <div className="rounded-2xl border border-app-border bg-app-inset/80 p-4 space-y-1">
                <span className="text-[11px] font-bold text-app-muted uppercase">Saved Brain Notes</span>
                <div className="text-lg font-extrabold text-blue-400 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  <span>{notes.length} Notes</span>
                </div>
                <p className="text-[11px] text-app-subtle">
                  Custom maintenance commands and lesson reflections.
                </p>
              </div>

              <div className="rounded-2xl border border-app-border bg-app-inset/80 p-4 space-y-1">
                <span className="text-[11px] font-bold text-app-muted uppercase">Unlocked Daily Bonuses</span>
                <div className="text-lg font-extrabold text-amber-400 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  <span>{claimedDays.length} / 365 Days</span>
                </div>
                <p className="text-[11px] text-app-subtle">
                  Current streak: {streakDays} days active.
                </p>
              </div>
            </div>

            {/* Export & Download Card */}
            <div className="rounded-2xl border border-app-border bg-app-inset/70 p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-app-ink flex items-center gap-2">
                    <Download className="h-4 w-4 text-blue-400" />
                    Export 365-Day Brain Backup (.json)
                  </h4>
                  <p className="text-xs text-app-muted">
                    Save a full portable copy of all your notes, maintenance scripts, streak, and unlocked daily bonuses.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyRawBackup}
                    className="flex items-center gap-1.5 rounded-xl border border-app-border bg-app-surface px-3 py-1.5 text-xs font-semibold text-app-ink hover:bg-app-active"
                  >
                    {copiedBackupJson ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedBackupJson ? 'Copied JSON!' : 'Copy JSON'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={downloadBackupFile}
                    className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-blue-500"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download .json Backup</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Import & Restore Card */}
            <div className="rounded-2xl border border-app-border bg-app-inset/70 p-5 space-y-4">
              <h4 className="text-sm font-bold text-app-ink flex items-center gap-2">
                <Upload className="h-4 w-4 text-purple-400" />
                Restore Brain Card Vault from Backup
              </h4>

              {restoreStatusMessage && (
                <div className={`rounded-xl p-3 text-xs flex items-center gap-2 ${
                  restoreStatusMessage.type === 'success'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}>
                  {restoreStatusMessage.type === 'success' ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 shrink-0" />
                  )}
                  <span>{restoreStatusMessage.text}</span>
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-app-muted mb-1.5">
                    Option 1: Upload Backup File (.json)
                  </label>
                  <input
                    type="file"
                    accept=".json"
                    ref={fileInputRef}
                    onChange={handleRestoreFromFile}
                    className="block w-full text-xs text-app-muted file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-app-muted mb-1.5">
                    Option 2: Paste Raw JSON to Restore
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Paste exported backup JSON here..."
                    value={restoreJsonInput}
                    onChange={(e) => setRestoreJsonInput(e.target.value)}
                    className="w-full rounded-xl border border-app-border bg-app-surface p-2.5 font-mono text-xs text-app-ink focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleRestoreFromTextInput}
                    disabled={!restoreJsonInput.trim()}
                    className="mt-2 rounded-xl bg-purple-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-purple-500 disabled:opacity-40"
                  >
                    Restore from Pasted JSON
                  </button>
                </div>
              </div>
            </div>

            {/* Rolling Snapshot History */}
            <div className="rounded-2xl border border-app-border bg-app-inset/70 p-5 space-y-2">
              <span className="text-xs font-bold text-app-ink">365-Day Rolling Local Snapshots</span>
              {backupHistoryList.length === 0 ? (
                <p className="text-xs text-app-subtle">
                  Snapshots are generated automatically each day you use the Brain Card.
                </p>
              ) : (
                <div className="divide-y divide-app-border/40 font-mono text-xs text-app-muted">
                  {backupHistoryList.slice(0, 5).map((snap, i) => (
                    <div key={i} className="py-2 flex items-center justify-between">
                      <span>Snapshot: {snap.date}</span>
                      <span className="text-emerald-400 font-bold">{snap.notesCount} notes saved</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-app-border bg-app-surface px-4 sm:px-6 py-2.5 text-xs text-app-muted">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>WebZoneBW Brain Card · 365-Day Storage Sovereignty</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px]">Local Vault: 100% Client-Side Safe</span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-app-border bg-app-inset px-3 py-1 font-semibold text-app-ink hover:bg-app-active"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
