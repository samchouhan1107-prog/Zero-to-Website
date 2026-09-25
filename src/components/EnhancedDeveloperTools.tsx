import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Eye,
  RefreshCw,
  ArrowRight,
  Monitor,
  Cpu,
  CheckCircle2,
  FileCode,
  Network,
  Palette,
  Layout,
  Paintbrush,
  Zap,
  BarChart3,
  Database,
  Shield,
  Lightbulb,
  AlertTriangle,
  Info,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Code,
  Chrome,
  ExternalLink,
  Download,
  Upload,
  Copy,
  Trash2,
  Search,
  Filter,
  Grid,
  List,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Plus,
  Minus,
  Hash,
  Type,
  Layers,
  GitBranch,
  Server,
  Clock,
  Activity,
  Users,
  Target,
  TrendingUp,
  Globe,
  Wifi,
  WifiOff
} from 'lucide-react';
import { CriticalRenderingPathInspector } from './CriticalRenderingPathInspector';

interface DevToolTab {
  id: 'elements' | 'console' | 'sources' | 'network' | 'performance' | 'memory' | 'application' | 'security' | 'rendering-path';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface NetworkRequest {
  id: string;
  url: string;
  method: string;
  status: number;
  type: string;
  size: string;
  duration: string;
  timing: {
    queued: number;
    started: number;
    firstByte: number;
    loaded: number;
  };
}

interface ConsoleMessage {
  id: string;
  type: 'log' | 'error' | 'warn' | 'info';
  text: string;
  timestamp: string;
  source: string;
}

interface MemorySnapshot {
  id: string;
  timestamp: string;
  total: number;
  used: number;
  jsHeapSizeLimit: number;
  jsHeapSizeUsed: number;
}

interface SecurityIssue {
  id: string;
  type: 'mixed-content' | 'insecure-cookie' | 'xss' | 'csrf';
  severity: 'high' | 'medium' | 'low';
  description: string;
  suggestion: string;
}

const DEV_TOOLS_TABS: DevToolTab[] = [
  {
    id: 'elements',
    label: 'Elements',
    icon: Eye,
    description: 'Inspect and edit HTML/CSS'
  },
  {
    id: 'console',
    label: 'Console',
    icon: Terminal,
    description: 'Debug JavaScript and view logs'
  },
  {
    id: 'sources',
    label: 'Sources',
    icon: FileCode,
    description: 'Debug JavaScript and manage breakpoints'
  },
  {
    id: 'network',
    label: 'Network',
    icon: Network,
    description: 'Analyze network requests'
  },
  {
    id: 'performance',
    label: 'Performance',
    icon: BarChart3,
    description: 'Analyze runtime performance'
  },
  {
    id: 'memory',
    label: 'Memory',
    icon: Database,
    description: 'Profile memory usage'
  },
  {
    id: 'application',
    label: 'Application',
    icon: Chrome,
    description: 'Inspect storage, cache, and service workers'
  },
  {
    id: 'security',
    label: 'Security',
    icon: Shield,
    description: 'Analyze security issues'
  },
  {
    id: 'rendering-path',
    label: 'Rendering Path',
    icon: BarChart3,
    description: 'Analyze critical rendering path and browser optimization'
  }
];

const SAMPLE_NETWORK_REQUESTS: NetworkRequest[] = [
  {
    id: '1',
    url: 'https://webzonebw.shop/',
    method: 'GET',
    status: 200,
    type: 'document',
    size: '1.8 KB',
    duration: '12ms',
    timing: { queued: 0, started: 1, firstByte: 8, loaded: 12 }
  },
  {
    id: '2',
    url: 'https://webzonebw.shop/styles.css',
    method: 'GET',
    status: 200,
    type: 'stylesheet',
    size: '4.2 KB',
    duration: '25ms',
    timing: { queued: 2, started: 3, firstByte: 18, loaded: 25 }
  },
  {
    id: '3',
    url: 'https://webzonebw.shop/script.js',
    method: 'GET',
    status: 200,
    type: 'script',
    size: '3.1 KB',
    duration: '45ms',
    timing: { queued: 5, started: 6, firstByte: 30, loaded: 45 }
  },
  {
    id: '4',
    url: 'https://api.example.com/data',
    method: 'POST',
    status: 200,
    type: 'xhr',
    size: '156 B',
    duration: '234ms',
    timing: { queued: 10, started: 15, firstByte: 200, loaded: 234 }
  }
];

const SAMPLE_CONSOLE_MESSAGES: ConsoleMessage[] = [
  {
    id: '1',
    type: 'log',
    text: 'Application initialized successfully',
    timestamp: '10:23:45.123',
    source: 'app.js:45'
  },
  {
    id: '2',
    type: 'info',
    text: 'User session started',
    timestamp: '10:23:45.456',
    source: 'auth.js:12'
  },
  {
    id: '3',
    type: 'warn',
    text: 'Deprecated API usage detected',
    timestamp: '10:23:45.789',
    source: 'api.js:234'
  },
  {
    id: '4',
    type: 'error',
    text: 'Failed to load resource: net::ERR_CONNECTION_REFUSED',
    timestamp: '10:23:46.012',
    source: 'network.js:89'
  }
];

const SAMPLE_MEMORY_SNAPSHOTS: MemorySnapshot[] = [
  {
    id: '1',
    timestamp: '10:23:45.000',
    total: 50,
    used: 15,
    jsHeapSizeLimit: 50,
    jsHeapSizeUsed: 15
  },
  {
    id: '2',
    timestamp: '10:23:46.000',
    total: 50,
    used: 18,
    jsHeapSizeLimit: 50,
    jsHeapSizeUsed: 18
  },
  {
    id: '3',
    timestamp: '10:23:47.000',
    total: 75,
    used: 25,
    jsHeapSizeLimit: 75,
    jsHeapSizeUsed: 25
  }
];

const SAMPLE_SECURITY_ISSUES: SecurityIssue[] = [
  {
    id: '1',
    type: 'mixed-content',
    severity: 'high',
    description: 'Mixed content (HTTP resource loaded over HTTPS)',
    suggestion: 'Load all resources over HTTPS'
  },
  {
    id: '2',
    type: 'insecure-cookie',
    severity: 'medium',
    description: 'Cookie without Secure flag set',
    suggestion: 'Add Secure flag to sensitive cookies'
  },
  {
    id: '3',
    type: 'xss',
    severity: 'high',
    description: 'Potential XSS vulnerability in user input',
    suggestion: 'Sanitize user input and use CSP headers'
  }
];

export const EnhancedDeveloperTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'elements' | 'console' | 'sources' | 'network' | 'performance' | 'memory' | 'application' | 'security' | 'rendering-path'>('elements');
  const [consoleInput, setConsoleInput] = useState('');
  const [consoleLogs, setConsoleLogs] = useState<ConsoleMessage[]>(SAMPLE_CONSOLE_MESSAGES);
  const [networkRequests, setNetworkRequests] = useState<NetworkRequest[]>(SAMPLE_NETWORK_REQUESTS);
  const [memorySnapshots, setMemorySnapshots] = useState<MemorySnapshot[]>(SAMPLE_MEMORY_SNAPSHOTS);
  const [securityIssues, setSecurityIssues] = useState<SecurityIssue[]>(SAMPLE_SECURITY_ISSUES);
  const [isRecording, setIsRecording] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState<string | null>(null);
  const [filterText, setFilterText] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'waterfall'>('waterfall');

  const executeConsoleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newLog: ConsoleMessage = {
      id: Date.now().toString(),
      type: 'log',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString(),
      source: 'console'
    };

    setConsoleLogs(prev => [...prev, newLog]);
    setConsoleInput('');

    // Simulate command execution
    if (trimmed.includes('document.querySelector')) {
      setTimeout(() => {
        setConsoleLogs(prev => [...prev, {
          id: Date.now().toString(),
          type: 'log',
          text: '"<h1>WebZone Developer Studio</h1>"',
          timestamp: new Date().toLocaleTimeString(),
          source: 'console'
        }]);
      }, 100);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate capturing network activity
      const newRequest: NetworkRequest = {
        id: Date.now().toString(),
        url: 'https://webzonebw.shop/api/data',
        method: 'GET',
        status: 200,
        type: 'xhr',
        size: '1.2 KB',
        duration: '156ms',
        timing: { queued: Date.now(), started: Date.now() + 10, firstByte: Date.now() + 100, loaded: Date.now() + 156 }
      };
      setNetworkRequests(prev => [newRequest, ...prev]);
    }
  };

  const clearConsole = () => {
    setConsoleLogs([]);
  };

  const takeMemorySnapshot = () => {
    const newSnapshot: MemorySnapshot = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      total: Math.floor(Math.random() * 100) + 50,
      used: Math.floor(Math.random() * 50) + 10,
      jsHeapSizeLimit: 100,
      jsHeapSizeUsed: Math.floor(Math.random() * 50) + 10
    };
    setMemorySnapshots(prev => [newSnapshot, ...prev]);
  };

  const filteredNetworkRequests = networkRequests.filter(req => 
    req.url.toLowerCase().includes(filterText.toLowerCase()) ||
    req.type.toLowerCase().includes(filterText.toLowerCase())
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'low': return 'bg-green-500/10 text-green-400 border-green-500/30';
      default: return 'bg-app-inset text-app-muted border-app-border';
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-emerald-400';
    if (status >= 400) return 'text-rose-400';
    return 'text-amber-400';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'rendering-path':
        return <CriticalRenderingPathInspector />;

      case 'elements':
        return (
          <div className="space-y-4">
            <div className="bg-app-surface rounded-lg p-4 border border-app-border">
              <h4 className="text-sm font-semibold text-app-ink mb-3">DOM Tree Inspector</h4>
              <div className="space-y-2 text-xs font-mono">
                <div className="text-slate-400">&lt;!DOCTYPE html&gt;</div>
                <div className="text-slate-400 ml-4">&lt;html lang="en"&gt;</div>
                <div className="text-slate-400 ml-8">&lt;head&gt;</div>
                <div className="text-slate-400 ml-12">&lt;title&gt;WebZone Developer Studio&lt;/title&gt;</div>
                <div className="text-slate-400 ml-12">&lt;link rel="stylesheet" href="styles.css"&gt;</div>
                <div className="text-slate-400 ml-8">&lt;/head&gt;</div>
                <div className="text-slate-400 ml-4">&lt;body&gt;</div>
                <div className="text-cyan-300 ml-8 cursor-pointer hover:bg-slate-800 px-1 rounded">
                  &lt;h1&gt;WebZone Developer Studio&lt;/h1&gt;
                </div>
                <div className="text-slate-400 ml-8">&lt;div class="container"&gt;</div>
                <div className="text-slate-400 ml-12">&lt;p&gt;Welcome to the enhanced developer tools.&lt;/p&gt;</div>
                <div className="text-slate-400 ml-8">&lt;/div&gt;</div>
                <div className="text-slate-400 ml-4">&lt;/body&gt;</div>
                <div className="text-slate-400 ml-4">&lt;/html&gt;</div>
              </div>
            </div>
            
            <div className="bg-app-surface rounded-lg p-4 border border-app-border">
              <h4 className="text-sm font-semibold text-app-ink mb-3">Computed Styles</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-pink-400">color:</span>
                  <span className="text-slate-300">#1f2937</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-pink-400">font-size:</span>
                  <span className="text-slate-300">16px</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-pink-400">margin:</span>
                  <span className="text-slate-300">0 auto</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-pink-400">padding:</span>
                  <span className="text-slate-300">20px</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'console':
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto bg-app-surface rounded-lg border border-app-border p-3 space-y-1 text-xs font-mono">
              {consoleLogs.map((log) => (
                <div key={log.id} className={`flex items-start gap-2 ${
                  log.type === 'error' ? 'text-rose-400' :
                  log.type === 'warn' ? 'text-amber-400' :
                  log.type === 'info' ? 'text-blue-400' :
                  'text-slate-300'
                }`}>
                  <span className="text-slate-600 mt-0.5">{log.type === 'log' ? '>' : '<'}</span>
                  <div className="flex-1">
                    <div>{log.text}</div>
                    <div className="text-slate-500 text-xs">{log.source}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              executeConsoleCommand(consoleInput);
            }} className="mt-3 flex gap-2">
              <span className="text-cyan-400 font-bold self-center">&gt;</span>
              <input
                type="text"
                value={consoleInput}
                onChange={(e) => setConsoleInput(e.target.value)}
                placeholder="Enter JavaScript command..."
                className="flex-1 bg-app-inset border border-app-border rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold transition-colors"
              >
                Run
              </button>
            </form>
          </div>
        );

      case 'network':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleRecording}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isRecording 
                      ? 'bg-red-600 text-white' 
                      : 'bg-app-inset text-app-muted hover:text-app-ink'
                  }`}
                >
                  {isRecording ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isRecording ? 'Stop' : 'Record'}</span>
                </button>
                
                <input
                  type="text"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  placeholder="Filter requests..."
                  className="px-2.5 py-1.5 bg-app-inset border border-app-border rounded text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'table' ? 'bg-blue-500/10 text-blue-400' : 'text-app-muted hover:bg-app-surface'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('waterfall')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'waterfall' ? 'bg-blue-500/10 text-blue-400' : 'text-app-muted hover:bg-app-surface'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {viewMode === 'table' ? (
              <div className="border border-app-border rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-app-surface border-b border-app-border">
                    <tr>
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Status</th>
                      <th className="p-2 text-left">Type</th>
                      <th className="p-2 text-left">Size</th>
                      <th className="p-2 text-left">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-app-border">
                    {filteredNetworkRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-app-inset cursor-pointer">
                        <td className="p-2 font-mono text-cyan-300">{req.url}</td>
                        <td className={`p-2 font-mono ${getStatusColor(req.status)}`}>{req.status}</td>
                        <td className="p-2 text-slate-400">{req.type}</td>
                        <td className="p-2 text-slate-400">{req.size}</td>
                        <td className="p-2 text-slate-400">{req.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredNetworkRequests.map((req) => (
                  <div key={req.id} className="bg-app-surface rounded-lg border border-app-border p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(req.status)}`}>
                          {req.status}
                        </span>
                        <span className="text-xs text-slate-400">{req.method}</span>
                      </div>
                      <span className="text-xs text-slate-400">{req.duration}</span>
                    </div>
                    <div className="text-xs font-mono text-cyan-300 mb-1">{req.url}</div>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span>Type: {req.type}</span>
                      <span>Size: {req.size}</span>
                    </div>
                    
                    {expandedDetails === req.id && (
                      <div className="mt-2 pt-2 border-t border-app-border text-xs text-slate-400">
                        <div>Timing Details:</div>
                        <div className="grid grid-cols-2 gap-1 mt-1">
                          <div>Queued: {req.timing.queued}ms</div>
                          <div>Started: {req.timing.started}ms</div>
                          <div>First Byte: {req.timing.firstByte}ms</div>
                          <div>Loaded: {req.timing.loaded}ms</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-4">
            <div className="bg-app-surface rounded-lg p-4 border border-app-border">
              <h4 className="text-sm font-semibold text-app-ink mb-3">Performance Timeline</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xs">Loading: 1.2s</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs">Scripting: 0.8s</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-xs">Rendering: 0.5s</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-xs">Painting: 0.3s</span>
                </div>
              </div>
            </div>

            <div className="bg-app-surface rounded-lg p-4 border border-app-border">
              <h4 className="text-sm font-semibold text-app-ink mb-3">Core Web Vitals</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs">Largest Contentful Paint</span>
                  <span className="text-xs text-emerald-400">Good (1.2s)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">First Input Delay</span>
                  <span className="text-xs text-emerald-400">Good (50ms)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Cumulative Layout Shift</span>
                  <span className="text-xs text-amber-400">Needs improvement (0.15)</span>
                </div>
              </div>
            </div>

            <div className="bg-app-surface rounded-lg p-4 border border-app-border">
              <h4 className="text-sm font-semibold text-app-ink mb-3">CPU Usage</h4>
              <div className="h-20 bg-app-inset rounded border border-app-border flex items-center justify-center">
                <div className="text-xs text-app-muted">CPU Usage Chart</div>
              </div>
            </div>
          </div>
        );

      case 'memory':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-app-ink">Memory Profiler</h4>
              <button
                onClick={takeMemorySnapshot}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-medium transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Take Snapshot</span>
              </button>
            </div>

            <div className="bg-app-surface rounded-lg border border-app-border p-4">
              <div className="space-y-3">
                {memorySnapshots.map((snapshot) => (
                  <div key={snapshot.id} className="border-b border-app-border last:border-b-0 pb-3 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono">{snapshot.timestamp}</span>
                      <span className="text-xs text-slate-400">
                        {snapshot.used}MB / {snapshot.total}MB
                      </span>
                    </div>
                    <div className="w-full bg-app-inset rounded-full h-2 border border-app-border">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-emerald-400 h-2 rounded-full transition-all"
                        style={{ width: `${(snapshot.used / snapshot.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-app-surface rounded-lg p-4 border border-app-border">
              <h4 className="text-sm font-semibold text-app-ink mb-3">Heap Analysis</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>JS Heap Size Used:</span>
                  <span className="text-slate-300">25MB</span>
                </div>
                <div className="flex justify-between">
                  <span>JS Heap Size Limit:</span>
                  <span className="text-slate-300">50MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Size:</span>
                  <span className="text-slate-300">75MB</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-4">
            <div className="bg-app-surface rounded-lg border border-app-border p-4">
              <h4 className="text-sm font-semibold text-app-ink mb-3">Security Issues</h4>
              <div className="space-y-3">
                {securityIssues.map((issue) => (
                  <div key={issue.id} className={`p-3 rounded-lg border ${getSeverityColor(issue.severity)}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-sm font-semibold capitalize">{issue.type.replace('-', ' ')}</span>
                          <span className="text-xs font-medium bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded">
                            {issue.severity}
                          </span>
                        </div>
                        <p className="text-xs mb-2">{issue.description}</p>
                        <div className="bg-app-inset rounded p-2 text-xs">
                          <strong>Suggestion:</strong> {issue.suggestion}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-app-surface rounded-lg p-4 border border-app-border">
              <h4 className="text-sm font-semibold text-app-ink mb-3">Security Headers</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Content Security Policy:</span>
                  <span className="text-emerald-400">✓ Present</span>
                </div>
                <div className="flex justify-between">
                  <span>Strict-Transport-Security:</span>
                  <span className="text-emerald-400">✓ Present</span>
                </div>
                <div className="flex justify-between">
                  <span>X-Content-Type-Options:</span>
                  <span className="text-emerald-400">✓ Present</span>
                </div>
                <div className="flex justify-between">
                  <span>X-Frame-Options:</span>
                  <span className="text-amber-400">⚠ Missing</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-64 text-app-muted">
            <div className="text-center">
              <Settings className="w-8 h-8 mx-auto mb-2" />
              <p>{DEV_TOOLS_TABS.find(t => t.id === activeTab)?.label} panel</p>
              <p className="text-xs">Coming soon...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="panel-surface min-w-0 overflow-hidden p-5 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-app-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-blue-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-blue-400">
              CONCEPT: DEVELOPER TOOLS SUITE
            </span>
            <span className="font-mono text-xs text-app-subtle">Browser Inspection</span>
          </div>
          <h3 className="text-lg font-bold text-app-ink flex items-center gap-2 mt-1">
            <Chrome className="w-5 h-5 text-blue-400" />
            Enhanced Developer Tools
          </h3>
          <p className="text-xs text-app-muted">
            Professional-grade browser debugging and performance analysis tools integrated into the learning platform.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => console.log('Export logs')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-app-inset text-app-muted hover:text-app-ink transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 bg-app-inset rounded-lg p-1 border border-app-border">
        {DEV_TOOLS_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all cursor-pointer flex-1 min-w-0 ${
              activeTab === tab.id
                ? 'bg-app-surface text-blue-500 shadow-sm border border-app-border'
                : 'text-app-muted hover:text-app-ink hover:bg-app-surface/50'
            }`}
            title={tab.description}
          >
            <tab.icon className="w-3 h-3" />
            <span className="truncate">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1">
        {renderTabContent()}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-app-subtle pt-3 border-t border-app-border">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Live</span>
          </div>
          <span>•</span>
          <span>Connected to browser</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Chrome 120+</span>
          <span>•</span>
          <span>Firefox 119+</span>
          <span>•</span>
          <span>Safari 17+</span>
        </div>
      </div>
    </div>
  );
};