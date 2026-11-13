import React, { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  Lightbulb,
  AlertTriangle,
  Info,
  BookOpen,
  Terminal,
  Zap,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import {
  DefinitionBlockData,
  CalloutBlockData,
  CodeBlockData,
  TableBlockData,
  ListBlockData,
  QABlockData,
  ExampleBlockData,
} from './types';
import { PracticeChallenge, QuizQuestion } from '../../utils/types';

export const ObjectivesBlock: React.FC<{ objectives: string[] }> = ({
  objectives,
}) => {
  if (!objectives || objectives.length === 0) return null;

  return (
    <aside className="lesson-objectives-box" aria-label="Learning Objectives">
      <div className="lesson-objectives-title">
        <Sparkles size={16} />
        <span>What You Will Learn</span>
      </div>
      <ul className="lesson-objectives-list">
        {objectives.map((obj, i) => (
          <li key={i} className="lesson-objective-item">
            <CheckCircle2 size={16} className="lesson-objective-icon" />
            <span>{obj}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export const DefinitionBlock: React.FC<{ data: DefinitionBlockData }> = ({
  data,
}) => {
  return (
    <div className="lesson-definition-box">
      <div className="lesson-definition-term">
        <BookOpen size={16} />
        <span>{data.term}</span>
        {data.phonetic && (
          <span className="lesson-definition-phonetic">/{data.phonetic}/</span>
        )}
      </div>
      <p className="lesson-definition-meaning">{data.definition}</p>
      {data.context && (
        <p className="lesson-definition-context">
          <em>Context: {data.context}</em>
        </p>
      )}
    </div>
  );
};

export const CalloutBlock: React.FC<{ data: CalloutBlockData }> = ({ data }) => {
  const getIcon = () => {
    switch (data.type) {
      case 'tip':
        return <Lightbulb size={18} />;
      case 'warning':
        return <AlertTriangle size={18} />;
      case 'key-rule':
        return <Zap size={18} />;
      case 'note':
      case 'info':
      default:
        return <Info size={18} />;
    }
  };

  return (
    <div className={`lesson-callout lesson-callout--${data.type}`}>
      <div className="lesson-callout-icon">{getIcon()}</div>
      <div className="lesson-callout-content">
        {data.title && <div className="lesson-callout-title">{data.title}</div>}
        <p style={{ margin: 0 }}>{data.content}</p>
      </div>
    </div>
  );
};

export const CodeBlock: React.FC<{ data: CodeBlockData }> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="lesson-code-card">
      <div className="lesson-code-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Terminal size={14} />
          <span className="lesson-code-lang">{data.language}</span>
          {data.title && <span>— {data.title}</span>}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="btn btn-subtle btn-sm"
          title="Copy code to clipboard"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="lesson-code-pre">
        <code>{data.code}</code>
      </pre>
    </div>
  );
};

export const TableBlock: React.FC<{ data: TableBlockData }> = ({ data }) => {
  if (!data.headers || data.headers.length === 0) return null;

  return (
    <div className="lesson-table-wrapper">
      <table className="lesson-table">
        {data.caption && <caption style={{ padding: '0.5rem', textAlign: 'left', fontWeight: 600 }}>{data.caption}</caption>}
        <thead>
          <tr>
            {data.headers.map((h, idx) => (
              <th key={idx}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((cell, cIdx) => (
                <td key={cIdx}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const ListBlock: React.FC<{ data: ListBlockData }> = ({ data }) => {
  if (!data.items || data.items.length === 0) return null;

  if (data.style === 'ordered') {
    return (
      <ol className="lesson-list lesson-list-ordered">
        {data.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol>
    );
  }

  return (
    <ul className="lesson-list lesson-list-bullet">
      {data.items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
};

export const QABlock: React.FC<{ data: QABlockData }> = ({ data }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="lesson-qa-item">
      <div className="lesson-qa-question">
        <HelpCircle size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom', color: 'var(--color-accent)' }} />
        {data.question}
      </div>
      {revealed ? (
        <div className="lesson-qa-answer">
          <p style={{ margin: '0 0 0.5rem 0' }}>{data.answer}</p>
          {data.explanation && <small>{data.explanation}</small>}
          <button
            type="button"
            onClick={() => setRevealed(false)}
            className="btn btn-subtle btn-sm"
            style={{ marginTop: '0.5rem' }}
          >
            Hide Explanation
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="btn btn-secondary btn-sm"
        >
          Reveal Answer &amp; Concept
        </button>
      )}
    </div>
  );
};

export const PracticeExerciseBlock: React.FC<{
  practice: PracticeChallenge;
  onOpenSandbox?: () => void;
}> = ({ practice, onOpenSandbox }) => {
  return (
    <section className="lesson-practice-card" aria-label="Practice Challenge">
      <div className="lesson-practice-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={20} style={{ color: 'var(--color-accent)' }} />
          <h3 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 800 }}>
            {practice.title}
          </h3>
        </div>
        <span className="badge badge-accent">{practice.difficulty}</span>
      </div>

      <p className="lesson-practice-prompt">{practice.prompt}</p>

      {practice.instructions && practice.instructions.length > 0 && (
        <div style={{ margin: '1rem 0' }}>
          <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, marginBottom: '0.5rem' }}>
            Instructions:
          </h4>
          <ol className="lesson-list lesson-list-ordered">
            {practice.instructions.map((ins, i) => (
              <li key={i}>{ins}</li>
            ))}
          </ol>
        </div>
      )}

      {onOpenSandbox && (
        <button
          type="button"
          onClick={onOpenSandbox}
          className="btn btn-accent btn-lg"
          style={{ width: '100%', marginTop: '1rem' }}
        >
          <Terminal size={18} />
          <span>Launch Code Sandbox &amp; Verify (+50 XP)</span>
        </button>
      )}
    </section>
  );
};

export const QuizQuestionsBlock: React.FC<{
  quiz: QuizQuestion[];
  onAnswerSubmit?: (scores: Record<string, number>) => void;
}> = ({ quiz, onAnswerSubmit }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!quiz || quiz.length === 0) return null;

  const handleSelect = (qId: string, optIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (onAnswerSubmit) {
      onAnswerSubmit(selectedAnswers);
    }
  };

  return (
    <section className="lesson-quiz-section">
      <div className="lesson-quiz-section-title">
        <HelpCircle size={20} style={{ color: 'var(--color-accent)' }} />
        <span>Concept Checkpoint</span>
      </div>
      {quiz.map((q, idx) => {
        const isAnswered = selectedAnswers[q.id] !== undefined;
        const selected = selectedAnswers[q.id];
        const isCorrect = submitted && selected === q.correctIndex;

        return (
          <div key={q.id} className="lesson-quiz-card">
            <div className="lesson-quiz-question-text">
              {idx + 1}. {q.question}
            </div>
            <div className="lesson-quiz-options">
              {q.options.map((opt, optIdx) => {
                let stateClass = '';
                if (selected === optIdx) {
                  stateClass = 'selected';
                }
                if (submitted) {
                  if (optIdx === q.correctIndex) {
                    stateClass = 'correct';
                  } else if (selected === optIdx && optIdx !== q.correctIndex) {
                    stateClass = 'incorrect';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    disabled={submitted}
                    onClick={() => handleSelect(q.id, optIdx)}
                    className={`lesson-quiz-option-btn ${stateClass}`}
                  >
                    <span className="lesson-quiz-letter-badge">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
            {submitted && (
              <div
                className={`lesson-quiz-feedback ${
                  isCorrect ? 'correct' : 'incorrect'
                }`}
              >
                <strong>{isCorrect ? 'Correct! ' : 'Incorrect. '}</strong>
                {q.explanation}
              </div>
            )}
          </div>
        );
      })}

      {!submitted && Object.keys(selectedAnswers).length > 0 && (
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-accent btn-md"
        >
          Verify Answers (+25 XP)
        </button>
      )}
    </section>
  );
};

export const SummaryBlock: React.FC<{ items: string[] }> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <aside className="lesson-summary-box" aria-label="Lesson Summary">
      <div className="lesson-summary-title">
        <Sparkles size={18} style={{ color: 'var(--color-accent)' }} />
        <span>Key Takeaways &amp; Next Steps</span>
      </div>
      <ul className="lesson-list lesson-list-bullet" style={{ margin: 0, paddingLeft: '1.25rem' }}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </aside>
  );
};
