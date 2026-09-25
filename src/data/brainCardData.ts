// Brain Card Data & 365-Day Knowledge / Maintenance Engine
// Supports personal Brain Notes, Windows Run Compiler, Space Wiper, and 365-Day Daily Bonuses

export interface BrainNote {
  id: string;
  title: string;
  content: string;
  category: 'maintenance' | 'windows-run' | 'lesson-notes' | 'shortcuts' | 'general';
  tags: string[];
  pinned?: boolean;
  linkedLessonId?: string;
  linkedLessonTitle?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WindowsRunCommand {
  command: string;
  alias: string;
  category: 'cleanup' | 'diagnostics' | 'network' | 'system';
  description: string;
  pathOrTarget: string;
  safeToDelete: boolean;
  typicalSpaceSaved: string;
  dangerLevel: 'safe' | 'moderate' | 'admin-only';
  instructions: string[];
  winRunShortcut: string;
}

export interface BrainBonusDay {
  dayNumber: number; // 1 to 365
  title: string;
  category: 'maintenance' | 'performance' | 'dev-lesson' | 'windows-run' | 'security';
  badge: string;
  xpReward: number;
  summary: string;
  proTip: string;
  suggestedCommand?: string;
  codeSnippet?: string;
  lessonConnection: {
    chapterId: string;
    chapterNumber: string;
    lessonId: string;
    lessonTitle: string;
    takeaway: string;
  };
}

export interface SpaceWiperScriptOptions {
  cleanUserTemp: boolean;
  cleanSystemTemp: boolean;
  cleanPrefetch: boolean;
  flushDns: boolean;
  emptyRecycleBin: boolean;
  cleanThumbnailCache: boolean;
  cleanEdgeChromeCache: boolean;
  pauseOnComplete: boolean;
}

export interface BrainBackupSnapshot {
  version: string;
  exportedAt: string;
  dayOfYear: number;
  streakDays: number;
  notes: BrainNote[];
  unlockedDays: number[];
  claimedDays: number[];
  lastBonusClaimedTimestamp: number;
  stats: {
    totalNotes: number;
    totalBonusesClaimed: number;
    maintenanceCommandsUsed: number;
  };
}

// Curated Essential Windows Run & Space Wiper Maintenance Commands
export const WINDOWS_RUN_COMMANDS: WindowsRunCommand[] = [
  {
    command: '%temp%',
    alias: 'User Temporary App Cache',
    category: 'cleanup',
    description: 'Opens the current user temporary files directory (AppData\\Local\\Temp). Apps, browsers, code editors, and installers dump gigabytes here.',
    pathOrTarget: '%USERPROFILE%\\AppData\\Local\\Temp',
    safeToDelete: true,
    typicalSpaceSaved: '5 GB – 30+ GB',
    dangerLevel: 'safe',
    instructions: [
      'Press Windows Key + R to open Run dialog.',
      'Type %temp% and hit Enter.',
      'Press Ctrl + A to select all files.',
      'Press Shift + Delete to permanently erase them.',
      'If Windows says "File in use", simply check "Do this for all current items" and click "Skip".'
    ],
    winRunShortcut: 'Win + R -> %temp%'
  },
  {
    command: 'temp',
    alias: 'Windows System Temp Folder',
    category: 'cleanup',
    description: 'Opens the core Windows OS temporary directory (C:\\Windows\\Temp). Leftover driver installers, Windows updates, and background services store cache here.',
    pathOrTarget: 'C:\\Windows\\Temp',
    safeToDelete: true,
    typicalSpaceSaved: '1 GB – 15 GB',
    dangerLevel: 'safe',
    instructions: [
      'Press Windows Key + R.',
      'Type temp and hit Enter (Click "Continue" if prompted for administrator permission).',
      'Press Ctrl + A to select all.',
      'Press Shift + Delete to permanently remove.',
      'Skip any files currently locked by active system services.'
    ],
    winRunShortcut: 'Win + R -> temp'
  },
  {
    command: 'prefetch',
    alias: 'Windows Execution Cache',
    category: 'cleanup',
    description: 'Stores launch footprint data to speed up application boot. Over months, deleted or old programs leave stale prefetch cache that clutters Windows search and disk.',
    pathOrTarget: 'C:\\Windows\\Prefetch',
    safeToDelete: true,
    typicalSpaceSaved: '500 MB – 2 GB',
    dangerLevel: 'safe',
    instructions: [
      'Press Windows Key + R.',
      'Type prefetch and click OK.',
      'Confirm administrator prompt if it appears.',
      'Press Ctrl + A and delete old entries.',
      'Windows will automatically regenerate fresh prefetch entries only for currently active apps!'
    ],
    winRunShortcut: 'Win + R -> prefetch'
  },
  {
    command: 'cleanmgr',
    alias: 'Windows Disk Cleanup Space Wiper',
    category: 'cleanup',
    description: 'The native Windows space wiper GUI. Calculates and cleans system caches, delivery optimization files, previous Windows installations, and dump files.',
    pathOrTarget: 'cleanmgr.exe',
    safeToDelete: true,
    typicalSpaceSaved: '10 GB – 40+ GB',
    dangerLevel: 'safe',
    instructions: [
      'Press Windows Key + R, type cleanmgr and press Enter.',
      'Select Drive C: and click OK.',
      'Click "Clean up system files" for advanced root cleanup (Windows Update cleanup).',
      'Check all safe boxes (Temporary Files, Delivery Optimization, Windows Update Cleanup).',
      'Click OK to wipe the unneeded space.'
    ],
    winRunShortcut: 'Win + R -> cleanmgr'
  },
  {
    command: 'cleanmgr /sageset:1',
    alias: 'Advanced Automated Space Wiper Config',
    category: 'cleanup',
    description: 'Configures full deep-clean profile for Disk Cleanup to enable 100% automated background space wiping via cleanmgr /sagerun:1.',
    pathOrTarget: 'cleanmgr.exe /sageset:1',
    safeToDelete: true,
    typicalSpaceSaved: '15 GB – 50 GB',
    dangerLevel: 'moderate',
    instructions: [
      'Run as Administrator in CMD or via Run dialog.',
      'Check every single cache category you wish to wipe automatically.',
      'Settings are stored in Registry Profile #1 forever.',
      'Execute cleanmgr /sagerun:1 anytime to wipe everything in one click!'
    ],
    winRunShortcut: 'Win + R -> cleanmgr /sageset:1'
  },
  {
    command: 'wsreset',
    alias: 'Windows Store Cache Reset',
    category: 'cleanup',
    description: 'Clears and resets the Microsoft Store cache without changing account settings or deleting installed apps. Fixes download errors and hung store installs.',
    pathOrTarget: 'wsreset.exe',
    safeToDelete: true,
    typicalSpaceSaved: '200 MB – 1 GB',
    dangerLevel: 'safe',
    instructions: [
      'Press Windows Key + R.',
      'Type wsreset and press Enter.',
      'A blank command prompt will open for ~10 seconds while cache purges.',
      'Microsoft Store will automatically reopen freshly reset.'
    ],
    winRunShortcut: 'Win + R -> wsreset'
  },
  {
    command: 'ipconfig /flushdns',
    alias: 'Flush DNS Resolver Cache',
    category: 'network',
    description: 'Wipes the operating system DNS lookup cache. Essential for web developers when testing newly deployed domains, local servers, or resolving stale website routing.',
    pathOrTarget: 'ipconfig.exe',
    safeToDelete: true,
    typicalSpaceSaved: 'Immediate Network Rebound',
    dangerLevel: 'safe',
    instructions: [
      'Press Windows Key + R.',
      'Type cmd and press Ctrl + Shift + Enter (for Admin) or regular Enter.',
      'Type ipconfig /flushdns and hit Enter.',
      'You will see: "Successfully flushed the DNS Resolver Cache."'
    ],
    winRunShortcut: 'Win + R -> cmd -> ipconfig /flushdns'
  },
  {
    command: 'resmon',
    alias: 'Resource Monitor',
    category: 'diagnostics',
    description: 'Deep real-time hardware telemetry: inspect exact disk read/write bandwidth per process, network connections, and CPU thread spikes.',
    pathOrTarget: 'resmon.exe',
    safeToDelete: false,
    typicalSpaceSaved: 'Diagnostic Tool',
    dangerLevel: 'safe',
    instructions: [
      'Press Windows Key + R.',
      'Type resmon and click OK.',
      'Click the "Disk" tab to see which rogue program is thrashing your SSD or HDD.'
    ],
    winRunShortcut: 'Win + R -> resmon'
  },
  {
    command: 'taskmgr',
    alias: 'Task Manager',
    category: 'diagnostics',
    description: 'Direct shortcut to Windows Task Manager to monitor CPU/Memory hogging programs, manage startup items, and kill frozen dev servers.',
    pathOrTarget: 'taskmgr.exe',
    safeToDelete: false,
    typicalSpaceSaved: 'Frees System RAM',
    dangerLevel: 'safe',
    instructions: [
      'Press Windows Key + R, type taskmgr and press Enter (or press Ctrl + Shift + Esc).',
      'Go to the "Startup apps" tab to disable high-impact apps slowing down your computer boot time.'
    ],
    winRunShortcut: 'Win + R -> taskmgr'
  },
  {
    command: 'sfc /scannow',
    alias: 'System File Checker',
    category: 'system',
    description: 'Scans all protected Windows OS files and automatically replaces corrupted, modified, or damaged system binaries from official cache.',
    pathOrTarget: 'sfc.exe /scannow',
    safeToDelete: false,
    typicalSpaceSaved: 'Repairs System Health',
    dangerLevel: 'admin-only',
    instructions: [
      'Press Windows Key + R, type cmd, and press Ctrl + Shift + Enter for Administrator mode.',
      'Type sfc /scannow and press Enter.',
      'Wait for the verification phase to reach 100%.'
    ],
    winRunShortcut: 'Win + R (Admin CMD) -> sfc /scannow'
  }
];

// Starter Brain Notes pre-populated for initial launch
export const INITIAL_BRAIN_NOTES: BrainNote[] = [
  {
    id: 'note-space-wiper-core',
    title: '💡 Space Wiper Command Guide: %temp%, temp, & prefetch',
    content: `### Essential PC Maintenance Commands\n\nWhen your computer starts feeling sluggish or your C: drive turns red:\n\n1. **%temp%** : User application temp folder. Browser cache, Discord media, VS Code crash dumps. Safe to erase anytime.\n2. **temp** : System-wide temp folder (C:\\Windows\\Temp). Installer leftovers.\n3. **prefetch** : Windows execution trace folder (C:\\Windows\\Prefetch). Wipe once a month to clear out deleted programs.\n4. **cleanmgr** : Windows Disk Cleanup space wiper GUI.\n\n*Pro-tip:* Select all files with \`Ctrl + A\`, press \`Shift + Delete\` for permanent wipe. Skip any files currently in use by active programs!`,
    category: 'maintenance',
    tags: ['Space Wiper', 'Windows Run', 'Disk Cleanup', 'PC Speed'],
    pinned: true,
    linkedLessonId: 'ch-00-l-01',
    linkedLessonTitle: 'Chapter 0: Developer Workspace Setup',
    createdAt: '2026-09-24T06:00:00.000Z',
    updatedAt: '2026-09-24T06:00:00.000Z'
  },
  {
    id: 'note-windows-run-power',
    title: '⚡ Windows Run Dialog (Win + R) Fast Shortcuts',
    content: `### Top 8 Quick Windows Run Commands for Developers\n\n- \`cmd\` / \`wt\` : Open Command Prompt or Windows Terminal\n- \`notepad\` : Instant clean scratchpad without loading bloat\n- \`calc\` : Fast calculator for pixel-to-rem CSS conversions\n- \`ncpa.cpl\` : Network Adapters control panel\n- \`sysdm.cpl\` : System properties -> Environment Variables (PATH config)\n- \`appwiz.cpl\` : Uninstall programs and bloatware\n- \`msconfig\` : System boot configuration and safe mode\n- \`devmgmt.msc\` : Device Manager to fix driver issues`,
    category: 'windows-run',
    tags: ['Windows Run', 'Shortcuts', 'Dev Efficiency', 'Terminal'],
    pinned: true,
    linkedLessonId: 'ch-00-l-02',
    linkedLessonTitle: 'Chapter 0: Terminal & Command Line Basics',
    createdAt: '2026-09-24T06:05:00.000Z',
    updatedAt: '2026-09-24T06:05:00.000Z'
  },
  {
    id: 'note-web-cache-wiper',
    title: '🌐 Web Development Storage & Cache Reset Tricks',
    content: `### Clearing Web Developer Junk\n\n- **Hard Refresh:** Press \`Ctrl + Shift + R\` (or \`Ctrl + F5\`) to bypass browser disk cache.\n- **Console Wipe:** Type \`localStorage.clear(); sessionStorage.clear();\` in DevTools Console.\n- **DNS Flush:** In Windows Run (\`cmd\`), type \`ipconfig /flushdns\` to clear cached domain IP mappings when DNS or proxy records change.`,
    category: 'lesson-notes',
    tags: ['Web Dev', 'Browser Cache', 'DNS Flush', 'DevTools'],
    pinned: false,
    linkedLessonId: 'ch-03-l-01',
    linkedLessonTitle: 'Chapter 3: Chrome DevTools Mastery',
    createdAt: '2026-09-24T06:10:00.000Z',
    updatedAt: '2026-09-24T06:10:00.000Z'
  },
  {
    id: 'note-365-daily-plan',
    title: '🛡️ 365-Day Maintenance & Learning Routine',
    content: `### My 365-Day Plan\n\n- **Every 24 Hours:** Check in for the daily Brain Bonus, claim XP, review one pro tip.\n- **Weekly:** Run the Space Wiper (.bat script) to keep SSD storage free and lean.\n- **Monthly:** Full 365-Day JSON backup export to protect my notes and lesson progress!`,
    category: 'general',
    tags: ['Routine', '365 Days', 'Habits', 'Backup'],
    pinned: false,
    createdAt: '2026-09-24T06:15:00.000Z',
    updatedAt: '2026-09-24T06:15:00.000Z'
  }
];

// Helper to generate 365 days of deterministic, high-value bonuses
const LESSON_MAPPINGS = [
  { chapterId: 'ch-00', chapterNumber: '00', lessonId: 'ch-00-l-01', lessonTitle: 'Web Development Foundations & Workspace Setup' },
  { chapterId: 'ch-00', chapterNumber: '00', lessonId: 'ch-00-l-02', lessonTitle: 'Terminal, Command Line & Developer Tools' },
  { chapterId: 'ch-01', chapterNumber: '01', lessonId: 'ch-01-l-01', lessonTitle: 'Semantic HTML & Document Architecture' },
  { chapterId: 'ch-01', chapterNumber: '01', lessonId: 'ch-01-l-02', lessonTitle: 'Forms, Inputs & Accessible User Data' },
  { chapterId: 'ch-02', chapterNumber: '02', lessonId: 'ch-02-l-01', lessonTitle: 'The CSS Box Model, Margins, Borders & Padding' },
  { chapterId: 'ch-02', chapterNumber: '02', lessonId: 'ch-02-l-02', lessonTitle: 'Modern Flexbox Layouts & Responsive Direction' },
  { chapterId: 'ch-03', chapterNumber: '03', lessonId: 'ch-03-l-01', lessonTitle: 'CSS Grid Matrix & Two-Dimensional Composition' },
  { chapterId: 'ch-04', chapterNumber: '04', lessonId: 'ch-04-l-01', lessonTitle: 'JavaScript Execution Context & Memory Management' },
  { chapterId: 'ch-05', chapterNumber: '05', lessonId: 'ch-05-l-01', lessonTitle: 'DOM Tree Manipulation & Reactive Event Listeners' },
  { chapterId: 'ch-06', chapterNumber: '06', lessonId: 'ch-06-l-01', lessonTitle: 'Asynchronous JavaScript, Promises & Fetch APIs' },
  { chapterId: 'ch-07', chapterNumber: '07', lessonId: 'ch-07-l-01', lessonTitle: 'Git Version Control, Branching & Commit Hygiene' },
  { chapterId: 'ch-08', chapterNumber: '08', lessonId: 'ch-08-l-01', lessonTitle: 'Cloud Deployment, Production Bundles & Edge CDNs' }
];

const PRO_TIPS_CATALOG = [
  {
    title: 'Space Wiper Starter: Purging %TEMP%',
    category: 'maintenance' as const,
    badge: 'Space Wiper',
    proTip: 'Browser builds and node_modules temporary files constantly pile up in %temp%. Wiping this folder weekly recovers 5GB to 25GB of SSD room!',
    suggestedCommand: '%temp%',
    codeSnippet: 'del /q /f /s "%USERPROFILE%\\AppData\\Local\\Temp\\*.*"',
    takeaway: 'Learn how temporary caching works in software and how operating systems handle cache lifecycle.'
  },
  {
    title: 'Windows Prefetch Optimization',
    category: 'windows-run' as const,
    badge: 'Windows Run',
    proTip: 'Prefetch files (*.pf) track the first 10 seconds of an application boot. Deleting them forces Windows to rebuild fresh launch traces for current software.',
    suggestedCommand: 'prefetch',
    codeSnippet: 'del /q /f /s "C:\\Windows\\Prefetch\\*.*"',
    takeaway: 'Understand executable paths, binaries, and system indexing.'
  },
  {
    title: 'Disk Space Wiper (cleanmgr /sageset)',
    category: 'maintenance' as const,
    badge: 'Deep Clean',
    proTip: 'Run "cleanmgr /sageset:1" once to choose every system cleanup checkbox. Then run "cleanmgr /sagerun:1" for a 1-click silent space wipe!',
    suggestedCommand: 'cleanmgr /sagerun:1',
    codeSnippet: 'cleanmgr.exe /sagerun:1',
    takeaway: 'See how automation scripts save developer hours and eliminate manual toil.'
  },
  {
    title: 'DNS Resolver Cache Flush',
    category: 'performance' as const,
    badge: 'Network Speed',
    proTip: 'If local dev servers (localhost) or newly launched websites do not resolve, run "ipconfig /flushdns" to clear stale DNS lookup entries.',
    suggestedCommand: 'ipconfig /flushdns',
    codeSnippet: 'ipconfig /flushdns',
    takeaway: 'Connects directly with networking concepts, TCP/IP, and DNS address resolution.'
  },
  {
    title: 'Reclaim Gigabytes with Hibernate Toggle',
    category: 'maintenance' as const,
    badge: 'Huge Storage',
    proTip: 'Windows creates hiberfil.sys equal to 75% of your total RAM (e.g. 12GB on 16GB RAM). If on desktop or non-hibernate laptop, run "powercfg -h off" to get that disk space back instantly!',
    suggestedCommand: 'powercfg -h off',
    codeSnippet: 'powercfg.exe -h off',
    takeaway: 'Understand computer RAM vs persistent secondary disk storage.'
  },
  {
    title: 'God Mode Folder Creator in Windows',
    category: 'windows-run' as const,
    badge: 'Secret Cheat',
    proTip: 'Create a new folder on Desktop and name it: GodMode.{ED7BA470-8E54-465E-825C-99712043E01C}. It transforms into a master panel with 200+ hidden system settings!',
    suggestedCommand: 'control',
    codeSnippet: 'mkdir "GodMode.{ED7BA470-8E54-465E-825C-99712043E01C}"',
    takeaway: 'Understand GUIDs (Globally Unique Identifiers) and OS shell extensions.'
  },
  {
    title: 'Node Modules Deep Space Wiper',
    category: 'dev-lesson' as const,
    badge: 'Dev Wiper',
    proTip: 'Old coding projects have forgotten node_modules eating hundreds of GBs. Use the npx command "npx npkill" to find and delete stale node_modules with arrow keys!',
    suggestedCommand: 'npx npkill',
    codeSnippet: 'npx npkill',
    takeaway: 'Link with terminal commands, package managers, and dependency trees in Chapter 0.'
  },
  {
    title: 'Windows System Health Scan (SFC & DISM)',
    category: 'security' as const,
    badge: 'System Repair',
    proTip: 'If your PC gets blue screens or corrupt files, run "DISM /Online /Cleanup-Image /RestoreHealth" followed by "sfc /scannow" in Admin CMD to repair OS integrity.',
    suggestedCommand: 'sfc /scannow',
    codeSnippet: 'DISM /Online /Cleanup-Image /RestoreHealth && sfc /scannow',
    takeaway: 'Learn checksum verification, file integrity hashes, and recovery.'
  },
  {
    title: 'Instant Task Manager Startup Speedup',
    category: 'performance' as const,
    badge: 'Boot Speed',
    proTip: 'Press Win + R -> taskmgr. Head to Startup tab. Sort by "Startup Impact". Disable Steam, Spotify, and helper updaters to cut boot time in half!',
    suggestedCommand: 'taskmgr',
    codeSnippet: 'taskmgr.exe',
    takeaway: 'Discover how background services consume memory cycles and CPU threads.'
  },
  {
    title: 'Chrome / Edge RAM Purge Shortcut',
    category: 'performance' as const,
    badge: 'Browser RAM',
    proTip: 'Press Shift + Esc inside Chrome or Edge to open the internal Browser Task Manager. Kill frozen background tabs without losing your whole browser session!',
    suggestedCommand: 'Shift + Esc in Browser',
    codeSnippet: 'Shift + Esc',
    takeaway: 'Understand multi-process browser architecture and DOM thread isolation.'
  }
];

// Generate 365 Days of structured bonuses deterministically
export function get365BonusForDay(dayNumber: number): BrainBonusDay {
  const normalizedDay = Math.max(1, Math.min(365, Math.floor(dayNumber)));
  const tipIndex = (normalizedDay - 1) % PRO_TIPS_CATALOG.length;
  const lessonIndex = (normalizedDay - 1) % LESSON_MAPPINGS.length;
  const tip = PRO_TIPS_CATALOG[tipIndex];
  const lesson = LESSON_MAPPINGS[lessonIndex];

  const xpReward = normalizedDay % 7 === 0 ? 100 : 50; // Weekly streak milestone bonus

  return {
    dayNumber: normalizedDay,
    title: `Day ${normalizedDay}: ${tip.title}`,
    category: tip.category,
    badge: tip.badge,
    xpReward,
    summary: `Daily Brain Bonus #${normalizedDay} unlocks essential computer maintenance & web development mastery.`,
    proTip: tip.proTip,
    suggestedCommand: tip.suggestedCommand,
    codeSnippet: tip.codeSnippet,
    lessonConnection: {
      chapterId: lesson.chapterId,
      chapterNumber: lesson.chapterNumber,
      lessonId: lesson.lessonId,
      lessonTitle: lesson.lessonTitle,
      takeaway: tip.takeaway
    }
  };
}

// Generate complete 365-day array
export const BRAIN_365_BONUSES: BrainBonusDay[] = Array.from({ length: 365 }, (_, i) => get365BonusForDay(i + 1));

// Space Wiper Script Compiler (Batch .bat Generator)
export function generateSpaceWiperBatchScript(options: SpaceWiperScriptOptions): string {
  const parts: string[] = [
    '@echo off',
    ':: =========================================================================',
    ':: WebZoneBW Brain Card - Automated Space Wiper & PC Maintenance Script',
    ':: Generated on: ' + new Date().toISOString().split('T')[0],
    ':: Target: Windows 10 / Windows 11 (Run as Administrator for best results)',
    ':: =========================================================================',
    'echo [WebZoneBW Space Wiper] Initializing system cleanup...',
    'echo.'
  ];

  if (options.cleanUserTemp) {
    parts.push(
      'echo [1/6] Wiping User Temporary Files (%temp%)...',
      'del /s /f /q "%USERPROFILE%\\AppData\\Local\\Temp\\*.*" 2>nul',
      'for /d %%p in ("%USERPROFILE%\\AppData\\Local\\Temp\\*.*") do rmdir "%%p" /s /q 2>nul',
      'echo    * User Temp wiped cleanly.',
      'echo.'
    );
  }

  if (options.cleanSystemTemp) {
    parts.push(
      'echo [2/6] Wiping Windows System Temp (C:\\Windows\\Temp)...',
      'del /s /f /q "C:\\Windows\\Temp\\*.*" 2>nul',
      'for /d %%p in ("C:\\Windows\\Temp\\*.*") do rmdir "%%p" /s /q 2>nul',
      'echo    * System Temp wiped cleanly.',
      'echo.'
    );
  }

  if (options.cleanPrefetch) {
    parts.push(
      'echo [3/6] Purging Windows Prefetch Cache...',
      'del /s /f /q "C:\\Windows\\Prefetch\\*.*" 2>nul',
      'echo    * Prefetch cache reset.',
      'echo.'
    );
  }

  if (options.flushDns) {
    parts.push(
      'echo [4/6] Flushing DNS Resolver Cache...',
      'ipconfig /flushdns >nul',
      'echo    * DNS cache successfully flushed.',
      'echo.'
    );
  }

  if (options.emptyRecycleBin) {
    parts.push(
      'echo [5/6] Emptying Windows Recycle Bin...',
      'rd /s /q %systemdrive%\\$Recycle.bin 2>nul',
      'echo    * Recycle bin emptied.',
      'echo.'
    );
  }

  if (options.cleanThumbnailCache) {
    parts.push(
      'echo [6/6] Purging Windows Explorer Thumbnail Cache...',
      'del /f /s /q /a "%LocalAppData%\\Microsoft\\Windows\\Explorer\\thumbcache_*.db" 2>nul',
      'echo    * Thumbnail cache cleared.',
      'echo.'
    );
  }

  parts.push(
    'echo =========================================================================',
    'echo [WebZoneBW Space Wiper] Cleanup complete! Storage space successfully recovered.',
    'echo Check your free disk space in "This PC".',
    'echo ========================================================================='
  );

  if (options.pauseOnComplete) {
    parts.push('pause');
  }

  return parts.join('\r\n');
}

// PowerShell Space Wiper Script Generator
export function generateSpaceWiperPowerShellScript(options: SpaceWiperScriptOptions): string {
  const parts: string[] = [
    '<#',
    ' .SYNOPSIS',
    '   WebZoneBW Brain Card - Space Wiper & Computer Maintenance PowerShell Script',
    ' .DESCRIPTION',
    '   Safely purges temp, %temp%, prefetch, empties recycle bin, and flushes DNS cache.',
    '#>',
    'Write-Host "=== WebZoneBW Brain Space Wiper Started ===" -ForegroundColor Cyan',
    ''
  ];

  if (options.cleanUserTemp) {
    parts.push(
      'Write-Host "[1/5] Cleaning User Temp Folder ($env:TEMP)..." -ForegroundColor Yellow',
      'Get-ChildItem -Path $env:TEMP -Recurse -Force -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue',
      'Write-Host "   * User Temp cleaned." -ForegroundColor Green',
      ''
    );
  }

  if (options.cleanSystemTemp) {
    parts.push(
      'Write-Host "[2/5] Cleaning System Temp (C:\\Windows\\Temp)..." -ForegroundColor Yellow',
      'Get-ChildItem -Path "C:\\Windows\\Temp" -Recurse -Force -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue',
      'Write-Host "   * System Temp cleaned." -ForegroundColor Green',
      ''
    );
  }

  if (options.cleanPrefetch) {
    parts.push(
      'Write-Host "[3/5] Clearing Prefetch Cache..." -ForegroundColor Yellow',
      'Get-ChildItem -Path "C:\\Windows\\Prefetch" -Recurse -Force -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue',
      'Write-Host "   * Prefetch cache cleared." -ForegroundColor Green',
      ''
    );
  }

  if (options.flushDns) {
    parts.push(
      'Write-Host "[4/5] Flushing DNS Cache..." -ForegroundColor Yellow',
      'Clear-DnsClientCache',
      'Write-Host "   * DNS Cache flushed." -ForegroundColor Green',
      ''
    );
  }

  if (options.emptyRecycleBin) {
    parts.push(
      'Write-Host "[5/5] Emptying Recycle Bin..." -ForegroundColor Yellow',
      'Clear-RecycleBin -Force -ErrorAction SilentlyContinue',
      'Write-Host "   * Recycle Bin emptied." -ForegroundColor Green',
      ''
    );
  }

  parts.push(
    'Write-Host "=== Space Wiper Complete! System Cleaned Successfully ===" -ForegroundColor Cyan'
  );

  return parts.join('\r\n');
}
