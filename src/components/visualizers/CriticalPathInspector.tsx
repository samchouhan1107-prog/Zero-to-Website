import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Zap, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock,
  FileText,
  Palette,
  Code,
  Layers,
  PaintBucket,
  Layout,
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';

interface CriticalPathStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'error';
  duration: number;
  icon: React.ComponentType<any>;
}

export const CriticalPathInspector: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [criticalCSS, setCriticalCSS] = useState('');
  const [renderTree, setRenderTree] = useState<any[]>([]);
  const [layoutMetrics, setLayoutMetrics] = useState({
    width: 0,
    height: 0,
    paintTime: 0
  });

  const criticalPathSteps: CriticalPathStep[] = [
    {
      id: 'html-parsing',
      name: 'HTML Parsing',
      description: 'Browser parses HTML and builds the DOM tree',
      status: 'pending',
      duration: 2,
      icon: FileText
    },
    {
      id: 'css-parsing',
      name: 'CSS Parsing',
      description: 'Browser parses CSS and builds the CSSOM tree',
      status: 'pending',
      duration: 1,
      icon: Palette
    },
    {
      id: 'render-tree',
      name: 'Render Tree Construction',
      description: 'Combine DOM and CSSOM to create render tree',
      status: 'pending',
      duration: 1,
      icon: Layers
    },
    {
      id: 'layout',
      name: 'Layout (Reflow)',
      description: 'Calculate positions and dimensions for each element',
      status: 'pending',
      duration: 3,
      icon: Layout
    },
    {
      id: 'paint',
      name: 'Paint',
      description: 'Convert render tree to pixels on screen',
      status: 'pending',
      duration: 2,
      icon: PaintBucket
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentStep < criticalPathSteps.length) {
      interval = setTimeout(() => {
        // Update current step
        const newSteps = [...criticalPathSteps];
        newSteps[currentStep].status = 'completed';
        
        if (currentStep < criticalPathSteps.length - 1) {
          newSteps[currentStep + 1].status = 'active';
          setCurrentStep(currentStep + 1);
        } else {
          setIsPlaying(false);
        }
        
        // Simulate data updates based on step
        updateStepData(newSteps[currentStep]);
      }, speed);
    }
    
    return () => {
      if (interval) clearTimeout(interval);
    };
  }, [isPlaying, currentStep, speed]);

  const updateStepData = (step: CriticalPathStep) => {
    switch (step.id) {
      case 'html-parsing':
        setRenderTree([
          { id: 'html', name: 'HTML Root', type: 'document', children: ['head', 'body'] },
          { id: 'head', name: 'Head', type: 'head', children: ['title', 'meta'] },
          { id: 'body', name: 'Body', type: 'body', children: ['header', 'main'] }
        ]);
        break;
      case 'css-parsing':
        setCriticalCSS(`
          body { font-family: Arial, sans-serif; }
          header { background: #fff; padding: 20px; }
          h1 { color: #333; margin: 0; }
        `);
        break;
      case 'render-tree':
        setRenderTree(prev => prev.map(node => ({
          ...node,
          styles: { computed: 'visible', display: 'block' }
        })));
        break;
      case 'layout':
        setLayoutMetrics({
          width: 1200,
          height: 800,
          paintTime: 16.7
        });
        break;
      case 'paint':
        setLayoutMetrics(prev => ({
          ...prev,
          paintTime: 12.3
        }));
        break;
    }
  };

  const resetAnimation = () => {
    const resetSteps = criticalPathSteps.map(step => ({
      ...step,
      status: step.id === 'html-parsing' ? 'active' : 'pending'
    }));
    setCurrentStep(0);
    setIsPlaying(false);
    setCriticalCSS('');
    setRenderTree([]);
    setLayoutMetrics({ width: 0, height: 0, paintTime: 0 });
  };

  const togglePlay = () => {
    if (currentStep >= criticalPathSteps.length) {
      resetAnimation();
    }
    setIsPlaying(!isPlaying);
  };

  const getStatusColor = (status: CriticalPathStep['status']) => {
    switch (status) {
      case 'active': return 'bg-blue-500 text-white';
      case 'completed': return 'bg-green-500 text-white';
      case 'error': return 'bg-red-500 text-white';
      default: return 'bg-gray-300 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-app-ink">Critical Rendering Path Inspector</h2>
          <p className="text-sm text-app-muted">
            Visualize how browsers convert HTML, CSS, and JS into pixels on screen
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-2"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {currentStep >= criticalPathSteps.length ? 'Restart' : 
             isPlaying ? 'Pause' : 'Play Animation'}
          </button>
          <button
            onClick={resetAnimation}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg flex items-center gap-2"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>

      {/* Speed Control */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-app-muted">Animation Speed:</span>
        <select
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="px-3 py-1 bg-app-surface border border-app-border rounded-lg text-sm"
        >
          <option value={2000}>Slow</option>
          <option value={1000}>Normal</option>
          <option value={500}>Fast</option>
        </select>
      </div>

      {/* Critical Path Steps */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {criticalPathSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className={`p-4 rounded-lg border-2 ${
                step.status === 'active' 
                  ? 'border-blue-500 bg-blue-50' 
                  : step.status === 'completed'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(step.status)}`}>
                  <Icon size={16} />
                </div>
                <span className="text-xs font-medium text-app-muted">Step {index + 1}</span>
              </div>
              <h3 className="font-semibold text-sm text-app-ink mb-1">{step.name}</h3>
              <p className="text-xs text-app-muted">{step.description}</p>
              <div className="mt-2 text-xs text-app-subtle">
                Duration: {step.duration}ms
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Representation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DOM Tree Visualization */}
        <div className="bg-app-surface border border-app-border rounded-lg p-4">
          <h3 className="font-semibold text-app-ink mb-3 flex items-center gap-2">
            <Layers size={16} /> DOM Tree
          </h3>
          <div className="space-y-2">
            {renderTree.map((node) => (
              <div
                key={node.id}
                className="p-2 bg-app-inset rounded border border-app-border"
              >
                <div className="font-mono text-sm text-app-ink">
                  &lt;{node.name}&gt;
                </div>
                {node.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {node.children.map((childId: string) => (
                      <div
                        key={childId}
                        className="text-xs text-app-muted font-mono"
                      >
                        &lt;{childId}&gt;
                      </div>
                    ))}
                  </div>
                )}
                {node.styles && (
                  <div className="mt-1 text-xs text-blue-600">
                    <span className="font-mono">computed: {node.styles.computed}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Critical CSS Display */}
        <div className="bg-app-surface border border-app-border rounded-lg p-4">
          <h3 className="font-semibold text-app-ink mb-3 flex items-center gap-2">
            <Palette size={16} /> Critical CSS
          </h3>
          <div className="bg-gray-900 rounded p-3 font-mono text-xs text-green-400 overflow-auto max-h-40">
            {criticalCSS || 'No CSS loaded yet...'}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-app-surface border border-app-border rounded-lg p-4">
          <h3 className="font-semibold text-app-ink mb-3 flex items-center gap-2">
            <Clock size={16} /> Performance Metrics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-app-muted">Viewport Size:</span>
              <span className="text-sm font-mono text-app-ink">
                {layoutMetrics.width} × {layoutMetrics.height}px
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-app-muted">Paint Time:</span>
              <span className="text-sm font-mono text-app-ink">
                {layoutMetrics.paintTime > 0 ? `${layoutMetrics.paintTime}ms` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-app-muted">Total Steps:</span>
              <span className="text-sm font-mono text-app-ink">
                {currentStep}/{criticalPathSteps.length}
              </span>
            </div>
          </div>
        </div>

        {/* Status Panel */}
        <div className="bg-app-surface border border-app-border rounded-lg p-4">
          <h3 className="font-semibold text-app-ink mb-3 flex items-center gap-2">
            <Info size={16} /> Current Status
          </h3>
          <div className="space-y-2">
            {currentStep < criticalPathSteps.length ? (
              <>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(criticalPathSteps[currentStep].status)}`} />
                  <span className="text-sm text-app-ink">
                    {criticalPathSteps[currentStep].name}
                  </span>
                </div>
                <p className="text-xs text-app-muted">
                  {criticalPathSteps[currentStep].description}
                </p>
              </>
            ) : (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 size={16} />
                <span className="text-sm font-semibold">Critical Rendering Path Complete!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Explanation Panel */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
          <AlertCircle size={16} /> Why This Matters
        </h3>
        <p className="text-sm text-blue-800">
          The Critical Rendering Path determines how quickly your page becomes visible to users. 
          By understanding this process, you can optimize your HTML, CSS, and JavaScript to 
          achieve faster first paint and improved user experience. Each step in the process 
          builds upon the previous one, making early optimization crucial for performance.
        </p>
      </div>
    </div>
  );
};