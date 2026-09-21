import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Eye,
  Zap,
  Clock,
  FileText,
  Palette,
  Layers,
  Layout,
  Paintbrush,
  CheckCircle,
  AlertTriangle,
  Info,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Code,
  BarChart3,
  Timer,
  Lightbulb
} from 'lucide-react';

interface RenderingStage {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  duration: string;
  critical: boolean;
  blocking: boolean;
  whatHappens: string;
  whyMatters: string;
  canOptimize: boolean;
  optimizationTips: string[];
}

interface ResourceItem {
  id: string;
  name: string;
  type: 'html' | 'css' | 'js' | 'font' | 'image' | 'other';
  size: string;
  loadTime: string;
  status: 'loading' | 'loaded' | 'failed' | 'cached';
  renderBlocking: boolean;
  priority: 'high' | 'medium' | 'low';
}

const RENDERING_STAGES: RenderingStage[] = [
  {
    id: 'html-parsing',
    name: 'HTML Parsing',
    description: 'Browser reads and parses HTML markup',
    icon: FileText,
    duration: '1-5ms',
    critical: true,
    blocking: true,
    whatHappens: 'The browser reads the HTML document character by character, building the DOM (Document Object Model) tree.',
    whyMatters: 'DOM construction is the foundation. Without it, no other rendering can begin.',
    canOptimize: true,
    optimizationTips: [
      'Minimize HTML size and complexity',
      'Remove unnecessary comments and whitespace',
      'Use semantic HTML for better parsing efficiency'
    ]
  },
  {
    id: 'css-parsing',
    name: 'CSS Parsing',
    description: 'Browser parses CSS rules into CSSOM',
    icon: Palette,
    duration: '2-10ms',
    critical: true,
    blocking: true,
    whatHappens: 'CSS styles are parsed and converted into CSSOM (CSS Object Model) - a tree structure of style rules.',
    whyMatters: 'CSSOM determines how elements should look. Render tree cannot be built without it.',
    canOptimize: true,
    optimizationTips: [
      'Avoid @import statements (they block rendering)',
      'Minimize CSS complexity and selectors',
      'Use efficient CSS methodologies like BEM'
    ]
  },
  {
    id: 'dom-cssom-merge',
    name: 'Render Tree Construction',
    description: 'Combine DOM + CSSOM into render tree',
    icon: Layers,
    duration: '1-3ms',
    critical: true,
    blocking: true,
    whatHappens: 'The browser merges DOM and CSSOM to create a render tree containing visible content and computed styles.',
    whyMatters: 'This tree determines which pixels to paint and where.',
    canOptimize: false,
    optimizationTips: [
      'Hide unused content with display: none early',
      'Use visibility: hidden instead of display: none if content needs to remain in layout'
    ]
  },
  {
    id: 'layout',
    name: 'Layout (Reflow)',
    description: 'Calculate element positions and dimensions',
    icon: Layout,
    duration: '1-20ms+',
    critical: true,
    blocking: true,
    whatHappens: 'The browser calculates exact positions, sizes, and relationships of all elements.',
    whyMatters: 'Layout is expensive. Changes can cascade through the entire page.',
    canOptimize: true,
    optimizationTips: [
      'Avoid layout thrashing by batching DOM reads/writes',
      'Use will-change and transform for animations',
      'Fix container dimensions early to prevent recalculation'
    ]
  },
  {
    id: 'paint',
    name: 'Paint',
    description: 'Render pixels to screen',
    icon: Paintbrush,
    duration: '5-50ms+',
    critical: true,
    blocking: false,
    whatHappens: 'The browser draws the visual elements (text, colors, borders, shadows, etc.) into layers.',
    whyMatters: 'Painting is what makes the page visible to users.',
    canOptimize: true,
    optimizationTips: [
      'Use CSS containment to isolate paint areas',
      'Minimize complex gradients and filters',
      'Use opacity and transform instead of layout changes'
    ]
  },
  {
    id: 'composite',
    name: 'Composite',
    description: 'Combine layers into final image',
    icon: CheckCircle,
    duration: '1-10ms',
    critical: false,
    blocking: false,
    whatHappens: 'The browser composites all painted layers into the final screen image.',
    whyMatters: 'Final step before content is visible. GPU acceleration helps here.',
    canOptimize: true,
    optimizationTips: [
      'Use CSS transforms and opacity for GPU acceleration',
      'Minimize layer count',
      'Use will-change sparingly and reset after animation'
    ]
  }
];

const SAMPLE_RESOURCES: ResourceItem[] = [
  {
    id: '1',
    name: 'index.html',
    type: 'html',
    size: '1.8 KB',
    loadTime: '12ms',
    status: 'loaded',
    renderBlocking: true,
    priority: 'high'
  },
  {
    id: '2',
    name: 'styles.css',
    type: 'css',
    size: '4.2 KB',
    loadTime: '25ms',
    status: 'loaded',
    renderBlocking: true,
    priority: 'high'
  },
  {
    id: '3',
    name: 'script.js',
    type: 'js',
    size: '3.1 KB',
    loadTime: '45ms',
    status: 'loaded',
    renderBlocking: false,
    priority: 'medium'
  },
  {
    id: '4',
    name: 'font.woff2',
    type: 'font',
    size: '12.4 KB',
    loadTime: '89ms',
    status: 'cached',
    renderBlocking: false,
    priority: 'low'
  },
  {
    id: '5',
    name: 'hero-image.jpg',
    type: 'image',
    size: '156 KB',
    loadTime: '234ms',
    status: 'loaded',
    renderBlocking: false,
    priority: 'low'
  }
];

export const CriticalRenderingPathInspector: React.FC = () => {
  const [activeStage, setActiveStage] = useState<string>('html-parsing');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(2000);
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    'html-parsing': true,
    'css-parsing': false,
    'dom-cssom-merge': false,
    'layout': false,
    'paint': false,
    'composite': false
  });
  const [resourceFilter, setResourceFilter] = useState<'all' | 'blocking' | 'non-blocking'>('all');

  const currentStage = RENDERING_STAGES.find(s => s.id === activeStage);

  // Auto-play animation
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      const currentIndex = RENDERING_STAGES.findIndex(s => s.id === activeStage);
      const nextIndex = (currentIndex + 1) % RENDERING_STAGES.length;
      setActiveStage(RENDERING_STAGES[nextIndex].id);
    }, playbackSpeed);

    return () => clearInterval(timer);
  }, [isPlaying, activeStage, playbackSpeed]);

  const toggleStage = (stageId: string) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageId]: !prev[stageId]
    }));
  };

  const filteredResources = SAMPLE_RESOURCES.filter(resource => {
    if (resourceFilter === 'all') return true;
    if (resourceFilter === 'blocking') return resource.renderBlocking;
    return !resource.renderBlocking;
  });

  const getStatusColor = (status: ResourceItem['status']) => {
    switch (status) {
      case 'loaded': return 'text-emerald-400';
      case 'loading': return 'text-amber-400';
      case 'failed': return 'text-rose-400';
      case 'cached': return 'text-blue-400';
      default: return 'text-app-muted';
    }
  };

  const getPriorityColor = (priority: ResourceItem['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'low': return 'bg-green-500/10 text-green-400 border-green-500/30';
      default: return 'bg-app-inset text-app-muted border-app-border';
    }
  };

  return (
    <div className="panel-surface min-w-0 overflow-hidden p-5 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-app-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-400">
              CONCEPT: CRITICAL RENDERING PATH
            </span>
            <span className="font-mono text-xs text-app-subtle">Performance Analysis</span>
          </div>
          <h3 className="text-lg font-bold text-app-ink flex items-center gap-2 mt-1">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            Critical Rendering Path Inspector
          </h3>
          <p className="text-xs text-app-muted">
            Understand how browsers convert HTML/CSS into pixels on screen and identify optimization opportunities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-app-inset text-app-muted hover:text-app-ink transition-colors text-sm font-medium"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Play</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => {
              setActiveStage('html-parsing');
              setIsPlaying(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-app-inset text-app-muted hover:text-app-ink transition-colors text-sm font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Pipeline Visualization */}
      <div className="bg-app-inset rounded-xl p-4 border border-app-border">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-app-ink flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            Rendering Pipeline
          </h4>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>Blocking</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span>Non-blocking</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {RENDERING_STAGES.map((stage, index) => (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`p-3 rounded-lg border transition-all text-left relative overflow-hidden ${
                activeStage === stage.id
                  ? 'border-amber-400/50 bg-amber-500/10 shadow-sm'
                  : 'border-app-border hover:border-app-muted hover:bg-app-surface'
              }`}
            >
              {/* Progress indicator */}
              <div className="absolute top-0 left-0 w-full h-1 bg-app-inset">
                <div 
                  className={`h-full transition-all duration-500 ${
                    activeStage === stage.id ? 'bg-amber-400' : 'bg-transparent'
                  }`}
                  style={{ width: activeStage === stage.id ? '100%' : '0%' }}
                />
              </div>

              <div className="flex items-start justify-between gap-2 pt-1">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <stage.icon className={`w-4 h-4 ${
                      stage.blocking ? 'text-red-400' : 'text-green-400'
                    }`} />
                    <span className="text-sm font-semibold text-app-ink">
                      {stage.name}
                    </span>
                    {stage.blocking && (
                      <span className="inline-flex items-center px-1 py-0.5 rounded text-xs font-medium bg-red-500/10 text-red-400">
                        Blocking
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-app-muted leading-relaxed">
                    {stage.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Timer className="w-3 h-3 text-app-subtle" />
                    <span className="text-xs font-mono text-app-subtle">
                      {stage.duration}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStage(stage.id);
                  }}
                  className="p-1 rounded hover:bg-app-inset transition-colors"
                >
                  {expandedStages[stage.id] ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              </div>
            </button>
          ))}
        </div>

        {/* Pipeline Flow */}
        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-app-muted">
          {RENDERING_STAGES.slice(0, -1).map((stage, index) => (
            <React.Fragment key={stage.id}>
              <span>{stage.name}</span>
              <ChevronRight className="w-3 h-3" />
            </React.Fragment>
          ))}
          <span>{RENDERING_STAGES[RENDERING_STAGES.length - 1].name}</span>
        </div>
      </div>

      {/* Detailed Stage Information */}
      {currentStage && (
        <div className="bg-app-inset rounded-xl p-4 border border-app-border space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-app-ink flex items-center gap-2">
              <currentStage.icon className="w-5 h-5 text-amber-400" />
              {currentStage.name}
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-app-subtle">
                {currentStage.duration}
              </span>
              {currentStage.blocking && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-500/10 text-red-400">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Blocking
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <h5 className="text-sm font-semibold text-app-ink mb-1 flex items-center gap-1">
                  <Info className="w-4 h-4 text-blue-400" />
                  What Happens
                </h5>
                <p className="text-xs text-app-muted leading-relaxed">
                  {currentStage.whatHappens}
                </p>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-app-ink mb-1 flex items-center gap-1">
                  <Eye className="w-4 h-4 text-green-400" />
                  Why It Matters
                </h5>
                <p className="text-xs text-app-muted leading-relaxed">
                  {currentStage.whyMatters}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h5 className="text-sm font-semibold text-app-ink mb-1 flex items-center gap-1">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Optimization Tips
                </h5>
                {currentStage.canOptimize ? (
                  <ul className="space-y-1">
                    {currentStage.optimizationTips.map((tip, idx) => (
                      <li key={idx} className="text-xs text-app-muted leading-relaxed flex items-start gap-1">
                        <span className="text-blue-400 mt-0.5">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-app-muted italic">
                    This stage is optimized by browser engines and cannot be directly controlled.
                  </p>
                )}
              </div>
            </div>
          </div>

          {expandedStages[currentStage.id] && (
            <div className="pt-3 border-t border-app-border">
              <h5 className="text-sm font-semibold text-app-ink mb-2">
                Advanced Details
              </h5>
              <div className="bg-app-surface rounded-lg p-3 text-xs text-app-muted space-y-2">
                <p>
                  <strong className="text-app-ink">Browser Impact:</strong> {currentStage.blocking ? 
                    'Stops subsequent rendering stages until complete' : 
                    'Can run in parallel with other tasks'}
                </p>
                <p>
                  <strong className="text-app-ink">Performance Cost:</strong> {currentStage.duration} per element
                </p>
                <p>
                  <strong className="text-app-ink">Common Issues:</strong> 
                  {currentStage.id === 'layout' ? ' Layout thrashing from excessive DOM reads/writes' :
                   currentStage.id === 'paint' ? ' Complex CSS causing expensive paint operations' :
                   currentStage.id === 'css-parsing' ? '@import statements blocking HTML parsing' :
                   ' Large file sizes causing slow processing'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Resources Analysis */}
      <div className="bg-app-inset rounded-xl p-4 border border-app-border space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-app-ink flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-blue-400" />
            Resource Loading Analysis
          </h4>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setResourceFilter('all')}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                resourceFilter === 'all' 
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' 
                  : 'bg-app-inset text-app-muted hover:bg-app-surface'
              }`}
            >
              All ({SAMPLE_RESOURCES.length})
            </button>
            <button
              onClick={() => setResourceFilter('blocking')}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                resourceFilter === 'blocking' 
                  ? 'bg-red-500/10 text-red-400 border border-red-500/30' 
                  : 'bg-app-inset text-app-muted hover:bg-app-surface'
              }`}
            >
              Blocking ({SAMPLE_RESOURCES.filter(r => r.renderBlocking).length})
            </button>
            <button
              onClick={() => setResourceFilter('non-blocking')}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                resourceFilter === 'non-blocking' 
                  ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                  : 'bg-app-inset text-app-muted hover:bg-app-surface'
              }`}
            >
              Non-blocking ({SAMPLE_RESOURCES.filter(r => !r.renderBlocking).length})
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {filteredResources.map((resource) => (
            <div 
              key={resource.id}
              className={`p-3 rounded-lg border transition-colors ${
                resource.renderBlocking 
                  ? 'border-red-500/20 bg-red-500/5' 
                  : 'border-app-border hover:border-app-muted'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    resource.type === 'html' ? 'bg-orange-500/10 text-orange-400' :
                    resource.type === 'css' ? 'bg-blue-500/10 text-blue-400' :
                    resource.type === 'js' ? 'bg-amber-500/10 text-amber-400' :
                    resource.type === 'font' ? 'bg-purple-500/10 text-purple-400' :
                    resource.type === 'image' ? 'bg-green-500/10 text-green-400' :
                    'bg-gray-500/10 text-gray-400'
                  }`}>
                    {resource.type === 'html' && <FileText className="w-4 h-4" />}
                    {resource.type === 'css' && <Palette className="w-4 h-4" />}
                    {resource.type === 'js' && <Code className="w-4 h-4" />}
                    {resource.type === 'font' && <FileText className="w-4 h-4" />}
                    {resource.type === 'image' && <Eye className="w-4 h-4" />}
                    {resource.type === 'other' && <ExternalLink className="w-4 h-4" />}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-app-ink">
                        {resource.name}
                      </span>
                      <span className={`text-xs font-medium ${getStatusColor(resource.status)}`}>
                        {resource.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-app-muted">
                      <span>{resource.size}</span>
                      <span>{resource.loadTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(resource.priority)}`}>
                    {resource.priority}
                  </span>
                  {resource.renderBlocking && (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-500/10 text-red-400">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Blocking
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-xl p-4 border border-amber-500/20">
        <h4 className="text-sm font-bold text-amber-400 mb-2 flex items-center gap-2">
          <Lightbulb className="w-4 h-4" />
          Key Takeaways
        </h4>
        <ul className="space-y-1 text-xs text-app-muted">
          <li className="flex items-start gap-1">
            <span className="text-amber-400 mt-0.5">•</span>
            <span>Critical Rendering Path determines how quickly users see content</span>
          </li>
          <li className="flex items-start gap-1">
            <span className="text-amber-400 mt-0.5">•</span>
            <span>Blocking resources (HTML, CSS) prevent page rendering until loaded</span>
          </li>
          <li className="flex items-start gap-1">
            <span className="text-amber-400 mt-0.5">•</span>
            <span>Optimize by minimizing critical resource size and reducing blocking</span>
          </li>
          <li className="flex items-start gap-1">
            <span className="text-amber-400 mt-0.5">•</span>
            <span>Use async/defer for non-critical JavaScript and preload for critical resources</span>
          </li>
        </ul>
      </div>
    </div>
  );
};