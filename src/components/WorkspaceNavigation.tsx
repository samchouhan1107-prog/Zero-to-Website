import React, { useState, useEffect } from 'react';
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
  Settings
} from 'lucide-react';
import { ViewMode } from '../utils/types';

interface WorkspaceNavigationProps {
  activeView: ViewMode;
  onNavigate: (view: ViewMode, subPath?: string) => void;
  onOpenTutor?: () => void;
  workspaceMode?: 'learn' | 'experiment' | 'inspect' | 'practice' | 'remember';
}

interface NavSection {
  id: 'learn' | 'experiment' | 'inspect' | 'practice' | 'remember';
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: NavItem[];
}

interface NavItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  action: () => void;
  badge?: string;
  disabled?: boolean;
}

const WORKSPACE_SECTIONS: NavSection[] = [
  {
    id: 'learn',
    title: 'Learn',
    icon: BookOpen,
    items: [
      {
        id: 'theory',
        label: 'Theory',
        description: 'Core web development concepts',
        icon: Brain,
        action: () => {},
        badge: 'Essential'
      },
      {
        id: 'mental-model',
        label: 'Mental Model',
        description: 'Understanding web architecture',
        icon: Layers,
        action: () => {},
        badge: 'Concept'
      },
      {
        id: 'annotated-code',
        label: 'Annotated Code',
        description: 'Code with explanations',
        icon: Code,
        action: () => {},
        badge: 'Hands-on'
      }
    ]
  },
  {
    id: 'experiment',
    title: 'Experiment',
    icon: Play,
    items: [
      {
        id: 'visual-lab',
        label: 'Visual Lab',
        description: 'Interactive visualizations',
        icon: Eye,
        action: () => {},
        badge: 'Visual'
      },
      {
        id: 'svg-tools',
        label: 'SVG Tools',
        description: 'Vector graphics editor',
        icon: Monitor,
        action: () => {},
        badge: 'Design'
      },
      {
        id: 'sandbox',
        label: 'Sandbox',
        description: 'Code playground',
        icon: Terminal,
        action: () => {},
        badge: 'Live'
      }
    ]
  },
  {
    id: 'inspect',
    title: 'Inspect',
    icon: Settings,
    items: [
      {
        id: 'dev-tools',
        label: 'Developer Tools',
        description: 'Browser inspection tools',
        icon: Terminal,
        action: () => {},
        badge: 'Diagnostic'
      },
      {
        id: 'core-vitals',
        label: 'Core Vitals',
        description: 'Performance analysis',
        icon: Monitor,
        action: () => {},
        badge: 'Performance'
      },
      {
        id: 'rendering-inspector',
        label: 'Rendering Inspector',
        description: 'Critical rendering path',
        icon: Eye,
        action: () => {},
        badge: 'CRP'
      }
    ]
  },
  {
    id: 'practice',
    title: 'Practice',
    icon: CheckCircle,
    items: [
      {
        id: 'activities',
        label: 'Activities',
        description: 'Hands-on exercises',
        icon: FileText,
        action: () => {},
        badge: 'Exercises'
      },
      {
        id: 'checkpoint',
        label: 'Checkpoint',
        description: 'Progress assessment',
        icon: CheckCircle,
        action: () => {},
        badge: 'Assessment'
      },
      {
        id: 'challenges',
        label: 'Challenges',
        description: 'Advanced problems',
        icon: Sparkles,
        action: () => {},
        badge: 'Advanced'
      }
    ]
  },
  {
    id: 'remember',
    title: 'Remember',
    icon: Lightbulb,
    items: [
      {
        id: 'notes',
        label: 'Notes',
        description: 'Personal notes',
        icon: FileText,
        action: () => {},
        badge: 'Private'
      },
      {
        id: 'saved-concepts',
        label: 'Saved Concepts',
        description: 'Bookmarked content',
        icon: Brain,
        action: () => {},
        badge: 'Library'
      }
    ]
  }
];

export const WorkspaceNavigation: React.FC<WorkspaceNavigationProps> = ({
  activeView,
  onNavigate,
  onOpenTutor,
  workspaceMode = 'learn'
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    learn: true,
    experiment: false,
    inspect: false,
    practice: false,
    remember: false
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleItemAction = (sectionId: string, item: NavItem) => {
    // Map to appropriate ViewMode
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

    const targetView = viewMap[item.id] || 'workspace';
    onNavigate(targetView, item.id);
  };

  const isActive = (sectionId: string, itemId: string) => {
    // Check if current view matches this navigation item
    const activeMap: Record<string, string[]> = {
      'learn': ['lesson'],
      'experiment': ['visual-lab', 'practice-hub'],
      'inspect': ['visual-lab'],
      'practice': ['activities'],
      'remember': ['workspace']
    };

    const activeItems = activeMap[sectionId] || [];
    return activeItems.includes(activeView);
  };

  return (
    <>
      {/* Desktop Navigation - Integrated with content */}
      <nav className="hidden lg:block">
        <div className="sticky top-0 z-20 bg-app-surface/95 border-b border-app-border backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12">
              {/* Left: Section Navigation */}
              <div className="flex items-center gap-1">
                {WORKSPACE_SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => toggleSection(section.id)}
                    className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
                      isActive(section.id, '') 
                        ? 'bg-blue-500/15 text-blue-500 border border-blue-500/30' 
                        : 'text-app-muted hover:text-app-ink hover:bg-app-inset'
                    }`}
                  >
                    <section.icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{section.title}</span>
                    {expandedSections[section.id] ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </button>
                ))}
              </div>

              {/* Right: Quick Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenTutor}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium transition-all hover:from-blue-500 hover:to-indigo-500 shadow-sm"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>AI Tutor</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Section Content */}
        {Object.entries(expandedSections).map(([sectionId, isExpanded]) => {
          const section = WORKSPACE_SECTIONS.find(s => s.id === sectionId);
          if (!section || !isExpanded) return null;

          return (
            <div key={sectionId} className="bg-app-surface/50 border-b border-app-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemAction(sectionId, item)}
                      className={`group p-3 rounded-lg border transition-all cursor-pointer text-left ${
                        isActive(sectionId, item.id)
                          ? 'border-blue-500/50 bg-blue-500/10 shadow-sm'
                          : 'border-app-border bg-app-inset hover:border-app-muted hover:bg-app-surface'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {item.icon && (
                              <item.icon className="h-4 w-4 text-app-muted group-hover:text-app-ink" />
                            )}
                            <span className="text-sm font-semibold text-app-ink group-hover:text-app-ink">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-500">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-xs text-app-muted leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <ArrowRight className="h-4 w-4 text-app-muted group-hover:text-blue-500 flex-shrink-0 mt-0.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      {/* Mobile Navigation Trigger Bar (Touch-Friendly) */}
      <div className="lg:hidden sticky top-16 z-20 bg-app-surface/95 border-b border-app-border backdrop-blur-md px-4 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold font-mono uppercase tracking-wider text-app-subtle">Workspace</span>
          <span className="text-app-subtle">/</span>
          <span className="text-xs font-semibold text-app-ink capitalize">{activeView.replace('-', ' ')}</span>
        </div>
        <div className="flex items-center gap-2">
          {onOpenTutor && (
            <button
              type="button"
              onClick={onOpenTutor}
              className="min-h-[44px] px-3 inline-flex items-center gap-1.5 rounded-xl bg-blue-600/10 text-blue-500 hover:bg-blue-600/20 text-xs font-semibold transition-all touch-manipulation"
              aria-label="Ask AI Tutor"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Tutor</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="min-h-[44px] px-3.5 py-2 inline-flex items-center gap-2 rounded-xl border border-app-border bg-app-inset text-xs font-semibold text-app-ink hover:bg-app-active active:scale-95 transition-all touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            aria-label="Open workspace navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <Layers className="h-4 w-4 text-blue-500" />
            <span>Sections</span>
            <ChevronDown className="h-3.5 w-3.5 text-app-subtle" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Collapsible drawer (Touch-Friendly & Accessible) */}
      {mobileMenuOpen && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-label="Workspace Navigation"
          className="lg:hidden fixed inset-0 z-50 bg-app-canvas/95 backdrop-blur-sm animate-fade-in"
        >
          <div className="flex flex-col h-full max-w-md ml-auto bg-app-surface shadow-2xl border-l border-app-border">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-app-border bg-app-surface">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-blue-500" />
                <h3 className="text-base font-bold text-app-ink">Workspace Navigation</h3>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-app-inset transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                aria-label="Close workspace navigation"
              >
                <ChevronDown className="h-5 w-5 text-app-muted" />
              </button>
            </div>

            {/* Navigation Content */}
            <div className="flex-1 overflow-y-auto p-2">
              {WORKSPACE_SECTIONS.map((section) => (
                <div key={section.id} className="mb-2 rounded-xl border border-app-border overflow-hidden bg-app-surface">
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between min-h-[48px] p-4 hover:bg-app-inset transition-colors touch-manipulation"
                    aria-expanded={expandedSections[section.id]}
                  >
                    <div className="flex items-center gap-2.5">
                      <section.icon className="h-5 w-5 text-blue-500" />
                      <span className="font-semibold text-sm text-app-ink">{section.title}</span>
                    </div>
                    {expandedSections[section.id] ? (
                      <ChevronDown className="h-4 w-4 text-app-subtle" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-app-subtle" />
                    )}
                  </button>

                  {expandedSections[section.id] && (
                    <div className="px-3 pb-3 space-y-2 border-t border-app-border/50 pt-2 bg-app-inset/40">
                      {section.items.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            handleItemAction(section.id, item);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full min-h-[48px] p-3.5 rounded-xl border transition-all text-left touch-manipulation ${
                            isActive(section.id, item.id)
                              ? 'border-blue-500/60 bg-blue-500/15 shadow-xs'
                              : 'border-app-border bg-app-surface hover:border-app-muted hover:bg-app-active'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            {item.icon && (
                              <item.icon className="h-4 w-4 text-app-muted" />
                            )}
                            <span className="font-semibold text-sm text-app-ink">{item.label}</span>
                            {item.badge && (
                              <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/10 text-blue-500">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-xs text-app-muted mt-1 leading-relaxed pl-6">{item.description}</p>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-app-border bg-app-surface">
              <button
                type="button"
                onClick={() => {
                  onOpenTutor?.();
                  setMobileMenuOpen(false);
                }}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold shadow-md hover:from-blue-500 hover:to-indigo-500 transition-all touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <Sparkles className="h-4 w-4" />
                <span>Ask AI Tutor</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};