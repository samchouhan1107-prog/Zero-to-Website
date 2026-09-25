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
  Target,
  Compass,
  Map,
  Rocket,
  GraduationCap,
  Palette,
  Wrench,
  Database,
  Shield,
  Clock,
  TrendingUp,
  Target as TargetIcon,
  Zap as ZapIcon,
  Layout as LayoutIcon
} from 'lucide-react';
import { ViewMode } from '../utils/types';

interface ExploreWorkspaceProps {
  activeView: ViewMode;
  onNavigate: (view: ViewMode, subPath?: string) => void;
  onOpenTutor?: () => void;
  userProgress?: any;
}

interface WorkspaceSection {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
  steps: WorkspaceStep[];
}

interface WorkspaceStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  duration?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  completed?: boolean;
  interactive?: boolean;
}

const WORKSPACE_STRUCTURE: WorkspaceSection[] = [
  {
    id: 'learn',
    title: 'Learn',
    subtitle: 'Master the fundamentals',
    icon: GraduationCap,
    description: 'Build a strong foundation in web development concepts',
    color: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    steps: [
      {
        id: 'theory',
        title: 'Theory',
        description: 'Deep dive into web fundamentals and best practices',
        icon: BookOpen,
        action: () => {},
        duration: '15-30 min',
        difficulty: 'beginner',
        completed: false,
        interactive: true
      },
      {
        id: 'mental-model',
        title: 'Mental Model',
        description: 'Understand how the web works under the hood',
        icon: Brain,
        action: () => {},
        duration: '20-40 min',
        difficulty: 'intermediate',
        completed: false,
        interactive: true
      },
      {
        id: 'annotated-code',
        title: 'Annotated Code',
        description: 'Learn by examining real-world code examples',
        icon: Code,
        action: () => {},
        duration: '30-60 min',
        difficulty: 'intermediate',
        completed: false,
        interactive: true
      }
    ]
  },
  {
    id: 'experiment',
    title: 'Experiment',
    subtitle: 'Hands-on learning',
    icon: Play,
    description: 'Interactive visualizations and live coding environments',
    color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    steps: [
      {
        id: 'visual-lab',
        title: 'Visual Lab',
        description: 'Interactive CSS and JavaScript visualizations',
        icon: Eye,
        action: () => {},
        duration: 'Unlimited',
        difficulty: 'beginner',
        completed: false,
        interactive: true
      },
      {
        id: 'svg-tools',
        title: 'SVG Tools',
        description: 'Create and manipulate vector graphics',
        icon: Monitor,
        action: () => {},
        duration: 'Unlimited',
        difficulty: 'intermediate',
        completed: false,
        interactive: true
      },
      {
        id: 'sandbox',
        title: 'Sandbox',
        description: 'Safe environment for testing code experiments',
        icon: Terminal,
        action: () => {},
        duration: 'Unlimited',
        difficulty: 'beginner',
        completed: false,
        interactive: true
      }
    ]
  },
  {
    id: 'inspect',
    title: 'Inspect',
    subtitle: 'Debug and analyze',
    icon: Settings,
    description: 'Deep dive into browser internals and performance',
    color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    steps: [
      {
        id: 'dev-tools',
        title: 'Developer Tools',
        description: 'Master browser debugging and inspection',
        icon: ZapIcon,
        action: () => {},
        duration: '30-45 min',
        difficulty: 'intermediate',
        completed: false,
        interactive: true
      },
      {
        id: 'core-vitals',
        title: 'Core Vitals',
        description: 'Analyze and optimize website performance',
        icon: BarChart3,
        action: () => {},
        duration: '25-40 min',
        difficulty: 'advanced',
        completed: false,
        interactive: true
      },
      {
        id: 'rendering-inspector',
        title: 'Rendering Inspector',
        description: 'Understand the critical rendering path',
        icon: LayoutIcon,
        action: () => {},
        duration: '20-35 min',
        difficulty: 'advanced',
        completed: false,
        interactive: true
      }
    ]
  },
  {
    id: 'practice',
    title: 'Practice',
    subtitle: 'Apply your knowledge',
    icon: CheckCircle,
    description: 'Hands-on exercises and real-world challenges',
    color: 'text-green-400 border-green-500/30 bg-green-500/10',
    steps: [
      {
        id: 'activities',
        title: 'Activities',
        description: 'Guided exercises with immediate feedback',
        icon: FileText,
        action: () => {},
        duration: '15-45 min each',
        difficulty: 'beginner',
        completed: false,
        interactive: true
      },
      {
        id: 'checkpoint',
        title: 'Checkpoint',
        description: 'Assess your understanding of key concepts',
        icon: TargetIcon,
        action: () => {},
        duration: '10-20 min',
        difficulty: 'intermediate',
        completed: false,
        interactive: true
      },
      {
        id: 'challenges',
        title: 'Challenges',
        description: 'Complex problems that test your skills',
        icon: Sparkles,
        action: () => {},
        duration: '30-60 min each',
        difficulty: 'advanced',
        completed: false,
        interactive: true
      }
    ]
  },
  {
    id: 'remember',
    title: 'Remember',
    subtitle: 'Retain and review',
    icon: Lightbulb,
    description: 'Personalized learning resources and review tools',
    color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
    steps: [
      {
        id: 'notes',
        title: 'Notes',
        description: 'Create and organize personal study notes',
        icon: FileText,
        action: () => {},
        duration: 'Unlimited',
        difficulty: 'beginner',
        completed: false,
        interactive: true
      },
      {
        id: 'saved-concepts',
        title: 'Saved Concepts',
        description: 'Bookmark important topics for later review',
        icon: Brain,
        action: () => {},
        duration: 'Unlimited',
        difficulty: 'beginner',
        completed: false,
        interactive: true
      }
    ]
  }
];

const LEARNING_FLOW = [
  { from: 'learn', to: 'experiment', arrow: 'Experiment with concepts' },
  { from: 'experiment', to: 'inspect', arrow: 'Inspect your work' },
  { from: 'inspect', to: 'practice', arrow: 'Practice what you learned' },
  { from: 'practice', to: 'remember', arrow: 'Remember key insights' }
];

export const ExploreWorkspace: React.FC<ExploreWorkspaceProps> = ({
  activeView,
  onNavigate,
  onOpenTutor,
  userProgress
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('learn');
  const [showFlow, setShowFlow] = useState(true);

  const handleStepAction = (step: WorkspaceStep, sectionId: string) => {
    // Map step actions to appropriate navigation
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

    const targetView = viewMap[step.id] || 'workspace';
    onNavigate(targetView, step.id);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'advanced': return 'bg-red-500/10 text-red-400 border-red-500/30';
      default: return 'bg-app-inset text-app-muted border-app-border';
    }
  };

  const getCompletionStatus = (stepId: string) => {
    if (!userProgress) return null;
    
    const completed = userProgress.completedLessons?.[stepId] || 
                     userProgress.completedChallenges?.[stepId];
    
    return completed ? 'completed' : 'incomplete';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold text-app-ink">
          Explore Your Learning Workspace
        </h2>
        <p className="text-sm text-app-muted max-w-2xl mx-auto">
          Follow the learning journey: <span className="font-semibold text-blue-400">Learn</span> → 
          <span className="font-semibold text-purple-400">Experiment</span> → 
          <span className="font-semibold text-amber-400">Inspect</span> → 
          <span className="font-semibold text-green-400">Practice</span> → 
          <span className="font-semibold text-indigo-400">Remember</span>
        </p>
      </div>

      {/* Learning Flow Visualization */}
      {showFlow && (
        <div className="bg-app-inset rounded-xl p-4 border border-app-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-app-ink">Learning Flow</h3>
            <button
              onClick={() => setShowFlow(!showFlow)}
              className="text-xs text-app-muted hover:text-app-ink"
            >
              {showFlow ? 'Hide' : 'Show'} Flow
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-xs">
            {LEARNING_FLOW.map((flow, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    WORKSPACE_STRUCTURE.find(s => s.id === flow.from)?.color
                  }`}>
                    {React.createElement(WORKSPACE_STRUCTURE.find(s => s.id === flow.from)?.icon, { className: 'w-4 h-4' })}
                  </div>
                  <ArrowRight className="w-4 h-4 text-app-muted" />
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    WORKSPACE_STRUCTURE.find(s => s.id === flow.to)?.color
                  }`}>
                    {React.createElement(WORKSPACE_STRUCTURE.find(s => s.id === flow.to)?.icon, { className: 'w-4 h-4' })}
                  </div>
                </div>
                {index < LEARNING_FLOW.length - 1 && (
                  <div className="w-8 h-px bg-app-border" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Workspace Sections */}
      <div className="space-y-4">
        {WORKSPACE_STRUCTURE.map((section) => (
          <div key={section.id} className="border border-app-border rounded-xl overflow-hidden">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className={`w-full flex items-center justify-between p-4 transition-colors ${
                expandedSection === section.id 
                  ? 'bg-app-surface' 
                  : 'hover:bg-app-inset'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${section.color}`}>
                  <section.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-app-ink">{section.title}</h3>
                  <p className="text-xs text-app-muted">{section.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-app-subtle">
                  {section.steps.length} steps
                </span>
                {expandedSection === section.id ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </div>
            </button>

            {/* Expanded Section Content */}
            {expandedSection === section.id && (
              <div className="p-4 bg-app-surface/50">
                <p className="text-sm text-app-muted mb-4">{section.description}</p>
                
                <div className="space-y-3">
                  {section.steps.map((step) => {
                    const status = getCompletionStatus(step.id);
                    const isStepActive = activeView === (step.id === 'theory' || step.id === 'mental-model' || step.id === 'annotated-code' ? 'lesson' : 
                                                         step.id === 'visual-lab' || step.id === 'svg-tools' || step.id === 'sandbox' ? 'visual-lab' :
                                                         step.id === 'dev-tools' || step.id === 'core-vitals' || step.id === 'rendering-inspector' ? 'visual-lab' :
                                                         step.id === 'activities' || step.id === 'checkpoint' || step.id === 'challenges' ? 'activities' : 'workspace');
                    
                    return (
                      <button
                        key={step.id}
                        onClick={() => handleStepAction(step, section.id)}
                        disabled={!step.interactive}
                        className={`w-full p-4 rounded-lg border transition-all text-left relative ${
                          isStepActive
                            ? 'border-blue-500/50 bg-blue-500/10 shadow-sm'
                            : step.interactive
                            ? 'border-app-border hover:border-app-muted hover:bg-app-surface'
                            : 'border-app-border bg-app-inset opacity-50 cursor-not-allowed'
                        }`}
                      >
                        {/* Status Badge */}
                        {status === 'completed' && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <step.icon className="w-4 h-4 text-app-muted" />
                              <span className="text-sm font-semibold text-app-ink">
                                {step.title}
                              </span>
                              {step.difficulty && (
                                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${getDifficultyColor(step.difficulty)}`}>
                                  {step.difficulty}
                                </span>
                              )}
                            </div>
                            
                            <p className="text-xs text-app-muted leading-relaxed mb-2">
                              {step.description}
                            </p>

                            {/* Metadata */}
                            <div className="flex items-center gap-3 text-xs text-app-muted">
                              {step.duration && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{step.duration}</span>
                                </div>
                              )}
                              {step.interactive && (
                                <div className="flex items-center gap-1">
                                  <Play className="w-3 h-3" />
                                  <span>Interactive</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {status === 'incomplete' && step.interactive && (
                              <button className="text-xs font-medium text-blue-500 hover:text-blue-400">
                                Start →
                              </button>
                            )}
                            <ArrowRight className="w-4 h-4 text-app-muted group-hover:text-blue-500 flex-shrink-0" />
                          </div>
                        </div>
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
              onClick={() => onNavigate('workspace')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-app-inset text-app-muted hover:text-app-ink transition-colors text-xs font-medium"
            >
              <Compass className="h-3.5 w-3.5" />
              <span>Full Workspace</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-app-subtle">
            <TrendingUp className="w-3 h-3" />
            <span>Progress tracking active</span>
          </div>
        </div>
      </div>
    </div>
  );
};