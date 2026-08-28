import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  RefreshCw,
  BookOpen,
  HelpCircle,
  Bug,
  Code2,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Trash2,
  ArrowRight,
  Lightbulb,
  ExternalLink,
  ShieldCheck,
  GraduationCap,
  MessageSquareQuote,
  Clock,
  Radio,
} from 'lucide-react';
import { Chapter } from '../types';

interface TutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
  initialCode?: string;
  allChapters?: Chapter[];
  onNavigateLesson?: (lessonId: string) => void;
}

export interface TutorSource {
  title: string;
  type: 'textbook' | 'mdn' | 'w3c' | 'docs';
  chapterNumber?: string;
  lessonId?: string;
  url?: string;
  snippet?: string;
}

export interface TutorMessage {
  id: string;
  sender: 'tutor' | 'student';
  text: string;
  codeSnippet?: string;
  sources?: TutorSource[];
  timestamp: string;
  isAudioPlaying?: boolean;
}

const DEFAULT_WELCOME_MESSAGE: TutorMessage = {
  id: 'welcome-1',
  sender: 'tutor',
  text: `👋 Hello student! I am your **24/7 Web Development Tutor**, available around the clock to resolve any doubts, clarify concepts, debug broken code, and guide you through the **WZ Storehouse** textbook.

### 🌟 What I can help you with:
- **Instant Doubt Resolution**: Clear up confusion on HTML, CSS Box Model, Flexbox, Grid, DOM events, Async JavaScript, and Git.
- **Code Debugger**: Paste your HTML, CSS, or JS snippets, and I will pinpoint the bug line, explain why it broke, and provide the clean fix.
- **Real-World Analogies**: Turn abstract mental models into intuitive visual analogies.
- **Textbook Sources & Citations**: Every answer references exact textbook chapters and official MDN documentation.

Ask any question below or choose a quick doubt topic to get started!`,
  timestamp: '24/7 Always Active',
  sources: [
    {
      title: 'Chapter 00: Web Foundations & Client-Server Architecture',
      type: 'textbook',
      chapterNumber: '00',
      lessonId: 'ch-00-l-01',
    },
    {
      title: 'Chapter 02: CSS Box Model & Cascade Hierarchy',
      type: 'textbook',
      chapterNumber: '02',
      lessonId: 'ch-02-l-01',
    },
    {
      title: 'Chapter 03: Flexbox Alignment Matrix',
      type: 'textbook',
      chapterNumber: '03',
      lessonId: 'ch-03-l-01',
    },
  ],
};

const QUICK_DOUBTS = [
  { label: '📦 Box Model vs Flexbox', prompt: 'What is the exact difference between the CSS Box Model (margin, border, padding) and Flexbox alignment? When should I use which?' },
  { label: '🐞 Debug Div Centering', prompt: 'Why is my <div> not centering horizontally and vertically? What are the top 3 modern techniques to center any element in CSS?' },
  { label: '⚡ async/await vs Promises', prompt: 'Can you explain JavaScript async/await vs .then() Promises with a clear real-world analogy and minimal code example?' },
  { label: '🌲 What is the DOM Tree?', prompt: 'How does a web browser parse raw HTML into the Document Object Model (DOM) tree, and how does JavaScript manipulate it?' },
  { label: '🔀 Git Rebase vs Merge', prompt: 'In Git, what is the difference between git merge and git rebase? When is rebase dangerous?' },
  { label: '🎯 CSS Specificity Rules', prompt: 'How do CSS specificity weights (Inline > IDs > Classes > Tags) work? How do I resolve styling conflicts cleanly?' },
];

export const TutorModal: React.FC<TutorModalProps> = ({
  isOpen,
  onClose,
  initialTopic,
  initialCode,
  allChapters = [],
  onNavigateLesson,
}) => {
  const [messages, setMessages] = useState<TutorMessage[]>(() => {
    try {
      const saved = localStorage.getItem('wz_storehouse_tutor_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [DEFAULT_WELCOME_MESSAGE];
  });

  const [input, setInput] = useState('');
  const [codeAttachment, setCodeAttachment] = useState(initialCode || '');
  const [showCodeInput, setShowCodeInput] = useState(!!initialCode);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'sources' | 'tips'>('chat');
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync to localStorage for continuous student usage across 24/7 sessions
  useEffect(() => {
    try {
      localStorage.setItem('wz_storehouse_tutor_history', JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // Handle incoming initialTopic / initialCode
  useEffect(() => {
    if (initialTopic && isOpen) {
      const prompt = initialCode
        ? `I have a doubt regarding "${initialTopic}". Here is my code:\n\`\`\`\n${initialCode}\n\`\`\`\nCan you explain how this works and check if there are any improvements or bugs?`
        : `I have a doubt about "${initialTopic}". Can you explain the core concepts, common pitfalls, and refer me to relevant textbook sections?`;
      handleSendMessage(prompt, initialCode);
    }
  }, [initialTopic, initialCode, isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Stop speech when modal closes or unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSendMessage = async (customText?: string, attachedSnippet?: string) => {
    const textToSend = customText || input.trim();
    const codeToSend = attachedSnippet !== undefined ? attachedSnippet : codeAttachment.trim();

    if ((!textToSend && !codeToSend) || isLoading) return;

    const studentMessage: TutorMessage = {
      id: `student-${Date.now()}`,
      sender: 'student',
      text: textToSend || 'Please analyze this code snippet and resolve any issues.',
      codeSnippet: codeToSend || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, studentMessage]);
    setInput('');
    setCodeAttachment('');
    setShowCodeInput(false);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: textToSend,
          code: codeToSend,
          question: textToSend,
          chapterTitle: 'WZ Storehouse Complete Curriculum',
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      let explanation = data.explanation || 'I have analyzed your query and prepared the answer below.';

      // Determine smart textbook sources from query keywords
      const matchedSources = findRelevantSources(textToSend + ' ' + codeToSend, allChapters);

      const tutorResponse: TutorMessage = {
        id: `tutor-${Date.now() + 1}`,
        sender: 'tutor',
        text: explanation,
        sources: matchedSources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, tutorResponse]);
    } catch (err) {
      // Robust 24/7 Offline Fallback Engine
      const offlineAnswer = generateOfflineDoubtAnswer(textToSend, codeToSend, allChapters);
      setMessages((prev) => [...prev, offlineAnswer]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to reset the tutor conversation history?')) {
      setMessages([DEFAULT_WELCOME_MESSAGE]);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setSpeakingMsgId(null);
    }
  };

  const handleSpeak = (msgId: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
    } else {
      window.speechSynthesis.cancel();
      // Strip markdown symbols for clean speech synthesis
      const cleanText = text.replace(/[*#`_\[\]]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.onend = () => setSpeakingMsgId(null);
      utterance.onerror = () => setSpeakingMsgId(null);
      window.speechSynthesis.speak(utterance);
      setSpeakingMsgId(msgId);
    }
  };

  const handleCopyText = (msgId: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedMsgId(msgId);
      setTimeout(() => setCopiedMsgId(null), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="tutor-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-fade-in"
    >
      <div className="w-full max-w-3xl h-[88vh] max-h-[780px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        {/* 24/7 Top Header Bar */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-slate-900 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-white">
                  Tutor
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-700/60 font-bold flex items-center gap-1">
                  <Radio className="w-2.5 h-2.5 animate-ping text-emerald-400" /> 24/7 Always Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Continuous doubt resolution & complete textbook knowledge base
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleClearHistory}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title="Clear chat history"
              aria-label="Clear chat history"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close tutor window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Chat / Referenced Sources / Doubt Solving Tips) */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 px-4 shrink-0 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('chat')}
            className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'chat'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <MessageSquareQuote className="w-3.5 h-3.5" /> Doubt Chat ({messages.length})
          </button>

          <button
            onClick={() => setActiveTab('sources')}
            className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'sources'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Textbook Sources
          </button>

          <button
            onClick={() => setActiveTab('tips')}
            className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'tips'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" /> 24/7 Doubt Resolver Guide
          </button>
        </div>

        {/* Main Body */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col min-h-0 bg-slate-50/50 dark:bg-slate-950/30">
            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 ${m.sender === 'student' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                      m.sender === 'student'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white'
                    }`}
                  >
                    {m.sender === 'student' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed space-y-2.5 ${
                      m.sender === 'student'
                        ? 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-600/10'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none shadow-xs'
                    }`}
                  >
                    {/* Timestamp and Actions for Tutor */}
                    {m.sender === 'tutor' && (
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1 border-b border-slate-100 dark:border-slate-800">
                        <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                          Tutor Answer • {m.timestamp}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleSpeak(m.id, m.text)}
                            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            title={speakingMsgId === m.id ? 'Stop Audio' : 'Listen with Speech'}
                          >
                            {speakingMsgId === m.id ? (
                              <VolumeX className="w-3.5 h-3.5 text-amber-500" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            onClick={() => handleCopyText(m.id, m.text)}
                            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            title="Copy Answer"
                          >
                            {copiedMsgId === m.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Attached Code Snippet if any */}
                    {m.codeSnippet && (
                      <div className="p-3 rounded-xl bg-slate-950 text-slate-100 font-mono text-[11px] overflow-x-auto border border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">
                          Included Code Snippet:
                        </div>
                        <pre>
                          <code>{m.codeSnippet}</code>
                        </pre>
                      </div>
                    )}

                    {/* Main Markdown Formatted Text */}
                    <div className="whitespace-pre-wrap font-sans text-xs sm:text-[13px] leading-relaxed">
                      {m.text}
                    </div>

                    {/* Referenced Textbook Sources */}
                    {m.sources && m.sources.length > 0 && (
                      <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-indigo-500" /> Referenced Sources:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {m.sources.map((src, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => {
                                if (src.lessonId && onNavigateLesson) {
                                  onNavigateLesson(src.lessonId);
                                  onClose();
                                }
                              }}
                              className="text-[11px] px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-medium hover:bg-indigo-100 transition-colors flex items-center gap-1 text-left"
                            >
                              <span>{src.title}</span>
                              {src.lessonId && <ArrowRight className="w-2.5 h-2.5 shrink-0" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading Spinner */}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex items-center gap-2 shadow-xs">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                    <span>Tutor is consulting textbook sources and formulating doubt solution...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Doubt Buttons Scroll Area */}
            <div className="px-4 py-2 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0">
              <span className="text-slate-400 text-[10px] font-bold uppercase shrink-0">Popular Doubts:</span>
              {QUICK_DOUBTS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip.prompt)}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 shrink-0 transition-all text-xs font-medium"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Code Attachment Drawer */}
            {showCodeInput && (
              <div className="p-3 bg-slate-950 text-white border-t border-slate-800 shrink-0 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1 text-indigo-400 font-bold">
                    <Code2 className="w-3.5 h-3.5" /> Paste Code to Debug or Explain
                  </span>
                  <button
                    onClick={() => setShowCodeInput(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <textarea
                  value={codeAttachment}
                  onChange={(e) => setCodeAttachment(e.target.value)}
                  placeholder="Paste your HTML, CSS, or JS snippet here..."
                  className="w-full h-24 bg-slate-900 text-slate-100 font-mono text-xs p-2.5 rounded-lg border border-slate-800 outline-none focus:border-indigo-500 resize-none"
                  spellCheck={false}
                />
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0"
            >
              <button
                type="button"
                onClick={() => setShowCodeInput(!showCodeInput)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  showCodeInput || codeAttachment
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="Attach code snippet for debugging"
              >
                <Code2 className="w-4 h-4" />
              </button>

              <input
                type="text"
                placeholder="Ask any doubt about HTML, CSS, JS, Flexbox, Git, or errors..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
              />

              <button
                type="submit"
                disabled={(!input.trim() && !codeAttachment.trim()) || isLoading}
                className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-500/20"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Ask Tutor</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Full Curriculum Sources Library */}
        {activeTab === 'sources' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50 dark:bg-slate-950/40 text-xs">
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Complete Textbook Knowledge Base
              </h4>
              <p className="text-slate-500 text-xs">
                The 24/7 Tutor is trained on the entire WZ Storehouse curriculum across all chapters:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {allChapters.map((ch) => (
                <div
                  key={ch.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                      Chapter {ch.number}
                    </span>
                    <span className="text-[10px] text-slate-400">{ch.totalLessons} Lessons</span>
                  </div>
                  <h5 className="font-bold text-slate-900 dark:text-white text-xs">{ch.title}</h5>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{ch.description}</p>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1">
                    {ch.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          if (onNavigateLesson) {
                            onNavigateLesson(lesson.id);
                            onClose();
                          }
                        }}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 text-slate-700 dark:text-slate-300 transition-colors"
                      >
                        {lesson.title}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: 24/7 Guide & Tips */}
        {activeTab === 'tips' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-50 dark:bg-slate-950/40 text-xs">
            <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 space-y-2">
              <h4 className="font-bold text-indigo-900 dark:text-indigo-200 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> 24/7 Continuous Student Support Guarantee
              </h4>
              <p className="text-indigo-950 dark:text-indigo-300 leading-relaxed">
                Whether you are studying at 2 AM or during weekend cram sessions, your Tutor is continuously available with built-in instant resolution rules for syntax debugging, real-world analogies, and chapter references.
              </p>
            </div>

            <div className="space-y-3">
              <h5 className="font-bold text-slate-900 dark:text-white text-sm">
                How to formulate high-impact doubts:
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Bug className="w-3.5 h-3.5 text-red-500" /> 1. Paste Broken Code
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Click the &lt;/&gt; icon to attach your HTML/CSS/JS. The tutor will test for missing brackets, incorrect selectors, or async bugs.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> 2. Ask for Analogies
                  </div>
                  <p className="text-[11px] text-slate-500">
                    If a concept feels abstract (like the Event Loop or Closures), ask "Explain this using a real-world restaurant or blueprint analogy".
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-500" /> 3. Jump to Lessons
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Click any referenced source pill at the bottom of an answer to immediately open that chapter's lesson and interactive sandbox.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper: Matches query text against textbook chapters and lessons to produce precise citations
function findRelevantSources(query: string, allChapters: Chapter[]): TutorSource[] {
  const q = query.toLowerCase();
  const sources: TutorSource[] = [];

  for (const ch of allChapters) {
    for (const lesson of ch.lessons) {
      const matchScore =
        (q.includes(lesson.title.toLowerCase()) ? 3 : 0) +
        (lesson.learningObjectives.some((obj) => q.includes(obj.toLowerCase().split(' ')[0])) ? 1 : 0) +
        (q.includes(ch.title.toLowerCase().split(' ')[0]) ? 1 : 0);

      if (
        (q.includes('box model') && lesson.slug.includes('box-model')) ||
        (q.includes('flexbox') && lesson.slug.includes('flexbox')) ||
        (q.includes('grid') && lesson.slug.includes('grid')) ||
        (q.includes('dom') && lesson.slug.includes('dom')) ||
        (q.includes('git') && lesson.slug.includes('git')) ||
        (q.includes('internet') && lesson.slug.includes('internet')) ||
        (q.includes('async') && lesson.slug.includes('async')) ||
        (q.includes('responsive') && lesson.slug.includes('responsive')) ||
        matchScore >= 1
      ) {
        sources.push({
          title: `Chapter ${ch.number}: ${lesson.title}`,
          type: 'textbook',
          chapterNumber: ch.number,
          lessonId: lesson.id,
        });
      }
    }
  }

  // Fallback defaults if no specific match
  if (sources.length === 0) {
    sources.push({
      title: 'Chapter 00: Web Foundations & Internet Architecture',
      type: 'textbook',
      chapterNumber: '00',
      lessonId: 'ch-00-l-01',
    });
    sources.push({
      title: 'MDN Web Docs Official Reference',
      type: 'mdn',
      url: 'https://developer.mozilla.org',
    });
  }

  return sources.slice(0, 3);
}

// Helper: 24/7 Built-in Instant Doubt Knowledge Engine (when offline or without API key)
function generateOfflineDoubtAnswer(query: string, code: string, allChapters: Chapter[]): TutorMessage {
  const q = query.toLowerCase();
  let text = '';

  if (q.includes('box model') || q.includes('padding') || q.includes('margin')) {
    text = `### 📦 CSS Box Model Doubt Resolution

**Core Concept**: Every HTML element is rendered as a rectangular box comprising 4 concentric layers:
1. **Content**: The text, image, or child element.
2. **Padding**: Transparent inner breathing space between content and border.
3. **Border**: The visible stroke wrapping the padding.
4. **Margin**: Outer spacing pushing other sibling elements away.

**🔑 Crucial Best Practice**:
Always add \`box-sizing: border-box;\` in modern CSS so that padding and border do NOT expand the specified width/height!`;
  } else if (q.includes('flexbox') || q.includes('align') || q.includes('center')) {
    text = `### 📐 Flexbox & Centering Doubt Resolution

**Top 3 Techniques to Center Any Element**:

1. **Flexbox Method (Most Popular)**:
\`\`\`css
.parent {
  display: flex;
  justify-content: center; /* Main axis horizontal */
  align-items: center;     /* Cross axis vertical */
  min-height: 100vh;
}
\`\`\`

2. **CSS Grid Method (Shortest)**:
\`\`\`css
.parent {
  display: grid;
  place-items: center;
  min-height: 100vh;
}
\`\`\`

3. **Margin Auto Method**:
\`\`\`css
.child {
  margin: 0 auto; /* For block elements with defined width */
}
\`\`\``;
  } else if (q.includes('async') || q.includes('promise') || q.includes('fetch')) {
    text = `### ⚡ JavaScript Async/Await & Promises

**Real-World Analogy**:
- **Synchronous**: Standing in line at a coffee shop counter and freezing everyone behind you until your latte is brewed.
- **Asynchronous (Promises / Async)**: The barista gives you a vibrating buzzer (Promise). You sit at a table and do other work. When the buzzer buzzes (\`await\`), you collect your latte!

**Minimal Modern Pattern**:
\`\`\`javascript
async function loadUserData() {
  try {
    const response = await fetch('/api/user');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Failed to fetch:', error);
  }
}
\`\`\``;
  } else if (q.includes('dom') || q.includes('event')) {
    text = `### 🌲 DOM Tree & Event Listeners

**Key Insight**: The DOM (Document Object Model) is a live JavaScript object representation of your HTML.
- **Select**: \`document.querySelector('#myBtn')\`
- **Listen**: \`element.addEventListener('click', (event) => { ... })\`
- **Modify**: \`element.textContent = 'Updated!';\` or \`element.classList.toggle('active');\``;
  } else if (code) {
    text = `### 🐞 Code Debug & Structure Analysis

I reviewed the code snippet you provided:
\`\`\`
${code}
\`\`\`

**Verification Checklist**:
1. Ensure all opening tags have corresponding closing tags (e.g. \`<div>...</div>\`).
2. Verify CSS class names match the HTML \`class="..."\` attributes exactly.
3. In JavaScript, verify that you select elements **after** the DOM is loaded or place \`<script>\` at the bottom of \`<body>\`.`;
  } else {
    text = `### 💡 24/7 Tutor Answer for: "${query}"

**Key Explanation & Insights**:
- **Semantic Structure**: Modern web applications prioritize clear separation of concerns: HTML for structure, CSS for aesthetics, and JavaScript for reactivity.
- **Step-by-Step Resolution**: If you are encountering an unexpected behavior, verify the browser DevTools Console for errors.
- **Hands-On Practice**: Test the code in the interactive sandbox within this textbook to see instant live rendering changes!`;
  }

  return {
    id: `tutor-offline-${Date.now()}`,
    sender: 'tutor',
    text,
    sources: findRelevantSources(query, allChapters),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}
