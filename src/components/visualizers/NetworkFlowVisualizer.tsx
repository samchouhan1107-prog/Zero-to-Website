import React, { useState, useEffect } from 'react';
import { Globe, Server, Database, ArrowRight, Play, CheckCircle2, RotateCcw } from 'lucide-react';

export const NetworkFlowVisualizer: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const steps = [
    {
      title: '1. User Types URL',
      desc: 'Browser requests IP for "https://storehouse.dev"',
      activeNode: 'browser',
    },
    {
      title: '2. DNS Lookup',
      desc: 'DNS Resolver finds IP: 142.250.190.46',
      activeNode: 'dns',
    },
    {
      title: '3. HTTP GET Request',
      desc: 'TCP Handshake + TLS Encryption to Web Server',
      activeNode: 'server',
    },
    {
      title: '4. Database Query & Assets',
      desc: 'Server fetches HTML, CSS, JS and dynamic database records',
      activeNode: 'db',
    },
    {
      title: '5. HTTP 200 OK Response',
      desc: 'Packets travel back across internet routers to browser',
      activeNode: 'browser-render',
    },
  ];

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1800);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div id="network-flow-visualizer" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Client-Server & DNS Packet Flow Simulator
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Step through the lifecycle of an HTTP request from keyboard strike to pixel paint.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setStep(0);
              setIsPlaying(true);
            }}
            className="text-xs px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 font-medium flex items-center gap-1.5 transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Auto Play
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setStep(0);
            }}
            className="text-xs px-2.5 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {/* Nodes Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Node 1: Browser */}
          <div
            className={`p-4 rounded-xl border text-center transition-all duration-300 ${
              step === 0 || step === 4
                ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 shadow-lg shadow-indigo-500/10 scale-105'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
            }`}
          >
            <div className="w-10 h-10 mx-auto rounded-full bg-indigo-500 text-white flex items-center justify-center mb-2">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Client (Browser)</h4>
            <p className="text-[11px] text-slate-500">Your Laptop / Phone</p>
          </div>

          {/* Node 2: DNS */}
          <div
            className={`p-4 rounded-xl border text-center transition-all duration-300 ${
              step === 1
                ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-500 shadow-lg shadow-amber-500/10 scale-105'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
            }`}
          >
            <div className="w-10 h-10 mx-auto rounded-full bg-amber-500 text-white flex items-center justify-center mb-2">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">DNS Phonebook</h4>
            <p className="text-[11px] text-slate-500">Domain to IP resolver</p>
          </div>

          {/* Node 3: Web Server */}
          <div
            className={`p-4 rounded-xl border text-center transition-all duration-300 ${
              step === 2
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 shadow-lg shadow-emerald-500/10 scale-105'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
            }`}
          >
            <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center mb-2">
              <Server className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Web Server</h4>
            <p className="text-[11px] text-slate-500">Express / Cloud Run</p>
          </div>

          {/* Node 4: Database / Assets */}
          <div
            className={`p-4 rounded-xl border text-center transition-all duration-300 ${
              step === 3
                ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 shadow-lg shadow-purple-500/10 scale-105'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
            }`}
          >
            <div className="w-10 h-10 mx-auto rounded-full bg-purple-500 text-white flex items-center justify-center mb-2">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Static Assets & DB</h4>
            <p className="text-[11px] text-slate-500">HTML, CSS, JS, JSON</p>
          </div>
        </div>

        {/* Step Banner */}
        <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              {steps[step].title}
            </span>
            <p className="text-sm font-medium text-slate-200 mt-0.5">{steps[step].desc}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStep((p) => Math.max(0, p - 1))}
              disabled={step === 0}
              className="text-xs px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => setStep((p) => Math.min(steps.length - 1, p + 1))}
              disabled={step === steps.length - 1}
              className="text-xs px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 font-bold disabled:opacity-40"
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
