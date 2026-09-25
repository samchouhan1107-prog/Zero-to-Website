import React, { useState } from 'react';
import {
  BookOpen,
  Brain,
  Eye,
  Code,
  Play,
  CheckCircle,
  FileText,
  Lightbulb,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Layers,
  Terminal,
  Monitor,
  Settings,
  Zap,
  BarChart3,
  ExternalLink,
  Search,
  Users,
  Trophy,
  Target
} from 'lucide-react';
import { ViewMode } from '../utils/types';

interface WorkspaceButton {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'learn' | 'experiment' | 'inspect' | 'practice' | 'remember';
  action: () => void;
  badge?: string;
  disabled?: boolean;
  hotkey?: string;
}

interface ButtonCategory {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
  buttons: WorkspaceButton[];
}

interface WorkspaceButtonSystemProps {
  activeView: ViewMode;
  onNavigate: (view: ViewMode, subPath?: string) => void;
  onOpenTutor?: () => void;
  onOpenSearch?: () => void;
  userProgress?: any;
}

const WORKSPACE_BUTTONS: ButtonCategory[] = [
  {
    id: 'learn',
    title: 'Learn',
    icon: BookOpen,
    description: 'Master core web development concepts',
    color: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    buttons: [
      {
        id: 'theory',
        label: 'Theory',
        description: 'Deep dive into web fundamentals',
        icon: Brain,
        category: 'learn',
        action: () => {},
        badge: 'Essential',
        hotkey: '1'
      },
      {
        id: 'mental-model',
        label: 'Mental Model',
        description: 'Understand web architecture patterns',
        icon: Layers,
        category: 'learn',
        action: () => {},
        badge: 'Concept',
        hotkey: '2'
      },
      {
        id: 'annotated-code',
        label: 'Annotated Code',
        description: 'Code with detailed explanations',
        icon: Code,
        category: 'learn',
        action: () => {},
        badge: 'Hands-on',
        hotkey: '3'
      }
    ]
  },
  {
    id: 'experiment',
    title: 'Experiment',
    icon: Play,
    description: 'Interactive visualizations and tools',
    color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    buttons: [
      {
        id: 'visual-lab',
        label: 'Visual Lab',
        description: 'Interactive CSS/JS visualizations',
        icon: Eye,
        category: 'experiment',
        action: () => {},
        badge: 'Visual',
        hotkey: '4'
      },
      {
        id: 'svg-tools',
        label: 'SVG Tools',
        description: 'Vector graphics editor',
        icon: Monitor,
        category: 'experiment',
        action: () => {},
        badge: 'Design',
        hotkey: '5'
      },
      {
        id: 'sandbox',
        label: 'Sandbox',
        description: 'Live code playground',
        icon: Terminal,
        category: 'experiment',
        action: () => {},
        badge: 'Live',
        hotkey: '6'
      }
    ]
  },
  {
    id: 'inspect',
    title: 'Inspect',
    icon: Settings,
    description: 'Debug and analyze performance',
    color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    buttons: [
      {
        id: 'dev-tools',
        label: 'Developer Tools',
        description: 'Browser inspection suite',
        icon: Terminal,
        category: 'inspect',
        action: () => {},
        badge: 'Diagnostic',
        hotkey: '7'
      },
      {
        id: 'core-vitals',
        label: 'Core Vitals',
        description: 'Performance analysis',
        icon: BarChart3,
        category: 'inspect',
        action: () => {},
        badge: 'Performance',
        hotkey: '8'
      },
      {
        id: 'rendering-inspector',
        label: 'Rendering Inspector',
        description: 'Critical path analysis',
        icon: Zap,
        category: 'inspect',
        action: () => {},
        badge: 'CRP',
        hotkey: '9'
      }
    ]
  },
  {
    id: 'practice',
    title: 'Practice',
    icon: CheckCircle,
    description: 'Hands-on exercises and challenges',
    color: 'text-green-400 border-green-500/30 bg-green-500/10',
    buttons: [
      {
        id: 'activities',
        label: 'Activities',
        description: 'Guided exercises',
        icon: FileText,
        category: 'practice',
        action: () => {},
        badge: 'Exercises',
        hotkey: 'A'
      },
      {
        id: 'checkpoint',
        label: 'Checkpoint',
        description: 'Progress assessment',
        icon: Target,
        category: 'practice',
        action: () => {},
        badge: 'Assessment',
        hotkey: 'B'
      },
      {
        id: 'challenges',
        label: 'Challenges',
        description: 'Advanced problems',
        icon: Sparkles,
        category: 'practice',
        action: () => {},
        badge: 'Advanced',
        hotkey: 'C'
      }
    ]
  },
  {
    id: 'remember',
    title: 'Remember',
    icon: Lightbulb,
    description: 'Personal learning resources',
    color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
    buttons: [
      {
        id: 'notes',
        label: 'Notes',
        description: 'Personal study notes',
        icon: FileText,
        category: 'remember',
        action: () => {},
        badge: 'Private',
        hotkey: 'N'
      },
      {
        id: 'saved-concepts',
        label: 'Saved Concepts',
        description: 'Bookmarked content',
        icon: Brain,
        category: 'remember',
        action: () => {},
        badge: 'Library',
        hotkey: 'S'
      }
    ]
  }
];

export const WorkspaceButtonSystem: React.FC<WorkspaceButtonSystemProps> = ({
  activeView,
  onNavigate,
  onOpenTutor,
  onOpenSearch,
  userProgress
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('learn');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleButtonAction = (button: WorkspaceButton) => {
    // Map button actions to appropriate navigation
    const viewMap: Record<string, ViewMode> = {
      'theory': 'lesson',
      'mental-model': 'lesson',
      'annotated-code': 'lesson',
      'visual-lab': 'visual-lab',
      'svg-tools': 'visual-lab',
      'sandbox': 'practice-hub',
      'dev-tools': 'visual-lab',
      'core-vitals': 'visual-lab',
      'rendering-inspector': 'visual-lab',
      'activities': 'activities',
      'checkpoint': 'activities',
      'challenges': 'activities',
      'notes': 'workspace',
      'saved-concepts': 'workspace'
    };

    const targetView = viewMap[button.id] || 'workspace';
    onNavigate(targetView, button.id);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const filteredCategories = WORKSPACE_BUTTONS.map(category => ({
    ...category,
    buttons: category.buttons.filter(button => 
      button.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      button.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.buttons.length > 0);

  const isActive = (buttonId: string) => {
    const activeMap: Record<string, string[]> = {
      'learn': ['lesson'],
      'experiment': ['visual-lab', 'practice-hub'],
      'inspect': ['visual-lab'],
      'practice': ['activities'],
      'remember': ['workspace']
    };

    return activeMap[buttonId]?.includes(activeView) || false;
  };

  const getCompletionStatus = (buttonId: string) => {
    if (!userProgress) return null;
    
    // Mock completion status based on button ID
    const completed = userProgress.completedLessons?.[buttonId] || 
                     userProgress.completedChallenges?.[buttonId];
    
    return completed ? 'completed' : 'incomplete';
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border border-app-border bg-app-inset hover:border-app-muted hover:bg-app-surface transition-colors text-left"
        >
          <Search className="w-4 h-4 text-app-muted" />
          <span className="text-sm text-app-muted">Search workspace tools...</span>
          <kbd className="ml-auto text-xs font-mono text-app-subtle">⌘K</kbd>
        </button>

        {showSearch && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-app-surface border border-app-border rounded-xl shadow-lg z-50">
            <div className="p-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools, concepts, and activities..."
                className="w-full px-3 py-2 bg-app-inset border border-app-border rounded-lg text-sm focus:outline-none focus:border-blue-500"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Categories and Buttons */}
      <div className="space-y-3">
        {filteredCategories.map((category) => (
          <div key={category.id} className="border border-app-border rounded-xl overflow-hidden">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.id)}
              className={`w-full flex items-center justify-between p-4 transition-colors ${
                expandedCategory === category.id 
                  ? 'bg-app-surface' 
                  : 'hover:bg-app-inset'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${category.color}`}>
                  <category.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-app-ink">{category.title}</h3>
                  <p className="text-xs text-app-muted">{category.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-app-subtle">
                  {category.buttons.length} tools
                </span>
                {expandedCategory === category.id ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </div>
            </button>

            {/* Expanded Category Content */}
            {expandedCategory === category.id && (
              <div className="p-4 bg-app-surface/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category.buttons.map((button) => {
                    const status = getCompletionStatus(button.id);
                    const isButtonActive = isActive(button.id);
                    
                    return (
                      <button
                        key={button.id}
                        onClick={() => handleButtonAction(button)}
                        disabled={button.disabled}
                        className={`group p-4 rounded-lg border transition-all text-left relative overflow-hidden ${
                          isButtonActive
                            ? 'border-blue-500/50 bg-blue-500/10 shadow-sm'
                            : button.disabled
                            ? 'border-app-border bg-app-inset opacity-50 cursor-not-allowed'
                            : 'border-app-border hover:border-app-muted hover:bg-app-surface'
                        }`}
                      >
                        {/* Status Indicator */}
                        {status === 'completed' && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <button.icon className="w-4 h-4 text-app-muted group-hover:text-app-ink" />
                              <span className="text-sm font-semibold text-app-ink group-hover:text-app-ink">
                                {button.label}
                              </span>
                              {button.badge && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-500">
                                  {button.badge}
                                </span>
                              )}
                            </div>
                            
                            <p className="text-xs text-app-muted leading-relaxed mb-2">
                              {button.description}
                            </p>

                            {/* Hotkey */}
                            {button.hotkey && (
                              <div className="flex items-center gap-1 text-xs font-mono text-app-subtle">
                                <kbd className="px-1.5 py-0.5 bg-app-inset border border-app-border rounded">
                                  {button.hotkey}
                                </kbd>
                                <span>hotkey</span>
                              </div>
                            )}
                          </div>

                          <ArrowRight className="w-4 h-4 text-app-muted group-hover:text-blue-500 flex-shrink-0 mt-0.5" />
                        </div>

                        {/* Progress Indicator */}
                        {status && (
                          <div className="mt-3 pt-2 border-t border-app-border/50">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-app-muted">
                                {status === 'completed' ? 'Completed' : 'Not started'}
                              </span>
                              {status === 'incomplete' && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleButtonAction(button);
                                  }}
                                  className="text-blue-500 hover:text-blue-400 font-medium"
                                >
                                  Start →
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="pt-4 border-t border-app-border">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-app-muted">Quick Actions:</span>
            <button
              onClick={onOpenTutor}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium transition-all hover:from-blue-500 hover:to-indigo-500 shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Tutor</span>
            </button>
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-app-inset text-app-muted hover:text-app-ink transition-colors text-xs font-medium"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search All</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-app-subtle">
            <Users className="w-3 h-3" />
            <span>Connected to learning ecosystem</span>
          </div>
        </div>
      </div>
    </div>
  );
};