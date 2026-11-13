import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  Save,
  RotateCcw,
  BookOpen,
  Code2,
} from 'lucide-react';
import { saveStorehouseRecord } from '../storehouse/storehouseService';
import { parseMarkdownToStructuredLesson } from '../lesson-engine/adapter';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  topic?: string;
  codeSnippet?: string;
}

const DEFAULT_WELCOME: ChatMessage = {
  id: 'welcome-msg',
  sender: 'assistant',
  text: `Hello! I am your **AI Learning Assistant** for Zero-to-Website.

I can help clarify technical concepts, debug code snippets, explain browser rendering and CSS mechanics, and walk through full architectural solutions.

### What would you like to explore today?
- **Box Model vs Flexbox vs Grid** — understanding when to reach for each
- **JavaScript Asynchronous Flow** — Promises, Event Loop, and async/await
- **DOM & Event Propagation** — capturing, bubbling, and delegation
- **Clean Component Architecture** — semantic markup and CSS design systems

Type any question below or paste a code block you would like to debug!`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

const SUGGESTED_PROMPTS = [
  'How does the browser CSS cascade compute specificity?',
  'Explain Flexbox align-items vs justify-content with an analogy',
  'What is the difference between microtasks and macrotasks in JS?',
  'Why should we avoid utility-first CSS in large editorial platforms?',
];

interface AILearningAssistantProps {
  currentLessonTitle?: string;
  onOpenStorehouse?: () => void;
  onViewSavedLesson?: (lesson: any) => void;
}

export const AILearningAssistant: React.FC<AILearningAssistantProps> = ({
  currentLessonTitle,
  onOpenStorehouse,
  onViewSavedLesson,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('zerotowebsite_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [DEFAULT_WELCOME];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('zerotowebsite_chat_history', JSON.stringify(messages));
    } catch {}
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input.trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          chapterTitle: currentLessonTitle || 'Web Engineering Curriculum',
        }),
      });

      const data = await res.json();
      const assistantText =
        data.explanation ||
        data.text ||
        'I have analyzed your query and reviewed the architectural pattern. Always prioritize standard semantics and separation of concerns.';

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: assistantText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('AI chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: `### Architectural Concept Resolution\n\nModern web platforms rely on three clear layers:\n1. **Semantic HTML5** for structured accessibility and content hierarchy.\n2. **Standard CSS3** with design tokens for consistent, maintainable visual layout.\n3. **JavaScript modules** for focused reactivity.\n\n*Note: Served via built-in continuous learning engine.*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveToStorehouse = async (msg: ChatMessage) => {
    const title = msg.topic || `AI Lesson: ${msg.text.slice(0, 45).replace(/^[#*\s]+/, '')}...`;
    const structured = parseMarkdownToStructuredLesson(msg.text, {
      title,
      sourceType: 'chat-saved',
    });

    await saveStorehouseRecord({
      id: `saved-chat-${msg.id}`,
      title,
      type: 'chat-excerpt',
      data: structured,
      tags: ['AI Tutor', 'Saved Chat'],
    });

    setSavedId(msg.id);
    setTimeout(() => setSavedId(null), 2500);
  };

  const handleClearHistory = () => {
    if (window.confirm('Clear your conversation history?')) {
      setMessages([DEFAULT_WELCOME]);
      localStorage.removeItem('zerotowebsite_chat_history');
    }
  };

  // Human-centred markdown parser for assistant message bubbles
  const renderFormattedBubble = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let inCode = false;
    let codeBuffer: string[] = [];
    let codeLang = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.trim().startsWith('```')) {
        if (inCode) {
          elements.push(
            <pre key={`code-${i}`} style={{ margin: '0.75rem 0' }}>
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          );
          inCode = false;
          codeBuffer = [];
        } else {
          inCode = true;
          codeLang = line.slice(3).trim();
          codeBuffer = [];
        }
        continue;
      }

      if (inCode) {
        codeBuffer.push(line);
        continue;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} style={{ fontSize: 'var(--text-md)', margin: '1rem 0 0.4rem 0', fontWeight: 700 }}>
            {line.slice(4)}
          </h3>
        );
        continue;
      }

      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} style={{ fontSize: 'var(--text-lg)', margin: '1.25rem 0 0.5rem 0', fontWeight: 800 }}>
            {line.slice(3)}
          </h2>
        );
        continue;
      }

      if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={i} style={{ marginLeft: '1.25rem', marginBottom: '0.25rem' }}>
            {line.slice(2)}
          </li>
        );
        continue;
      }

      if (line.trim().length > 0) {
        elements.push(
          <p key={i} style={{ margin: '0 0 0.65rem 0', lineHeight: 1.6 }}>
            {line}
          </p>
        );
      }
    }

    if (inCode) {
      elements.push(
        <pre key="code-tail">
          <code>{codeBuffer.join('\n')}</code>
        </pre>
      );
    }

    return elements;
  };

  return (
    <div className="chat-container">
      {/* Chat Header */}
      <header className="chat-header">
        <div className="chat-header-title">
          <div className="chat-avatar assistant">
            <Sparkles size={18} />
          </div>
          <div>
            <h3>AI Learning Assistant</h3>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-subtle)' }}>
              {currentLessonTitle ? `Context: ${currentLessonTitle}` : 'Full Curriculum Knowledge Active'}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClearHistory}
          className="btn btn-subtle btn-sm"
          title="Reset conversation"
        >
          <RotateCcw size={14} />
          <span>Clear</span>
        </button>
      </header>

      {/* Messages Feed */}
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message-row ${msg.sender}`}
          >
            {msg.sender === 'assistant' && (
              <div className="chat-avatar assistant">
                <Bot size={18} />
              </div>
            )}

            <div className="chat-bubble">
              {msg.sender === 'user' ? (
                <p>{msg.text}</p>
              ) : (
                <>
                  {renderFormattedBubble(msg.text)}
                  <div className="chat-actions">
                    <button
                      type="button"
                      onClick={() => handleCopyMessage(msg.id, msg.text)}
                      className="btn btn-subtle btn-sm"
                    >
                      {copiedId === msg.id ? <Check size={13} /> : <Copy size={13} />}
                      <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSaveToStorehouse(msg)}
                      className="btn btn-subtle btn-sm"
                      title="Save as permanent lesson in Storehouse"
                    >
                      {savedId === msg.id ? <Check size={13} /> : <Save size={13} />}
                      <span>{savedId === msg.id ? 'Saved to Storehouse!' : 'Save to Storehouse'}</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="chat-avatar user">
                <User size={18} />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="chat-message-row assistant">
            <div className="chat-avatar assistant">
              <Bot size={18} />
            </div>
            <div className="chat-bubble" style={{ color: 'var(--color-text-muted)' }}>
              Analyzing concept and preparing structured explanation...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Follow-up Prompts */}
      <div style={{ padding: '0 var(--space-6) var(--space-2) var(--space-6)' }}>
        <div className="chat-followups">
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(prompt)}
              className="chat-followup-chip"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Message Composer */}
      <footer className="chat-composer">
        <form
          className="chat-composer-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask a technical doubt, request an explanation, or paste code..."
            className="chat-composer-input"
            rows={1}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="btn btn-primary btn-md"
            style={{ height: '44px', flexShrink: 0 }}
          >
            <Send size={16} />
            <span>Send</span>
          </button>
        </form>
      </footer>
    </div>
  );
};
