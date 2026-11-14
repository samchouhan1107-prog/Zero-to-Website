import React, { useState, useEffect } from 'react';
import {
  FolderArchive,
  Search,
  Plus,
  Bot,
  BookOpen,
  Trash2,
  ExternalLink,
  Download,
  Upload,
  FileText,
  Clock,
  Tag,
  Code2,
} from 'lucide-react';
import {
  StorehouseRecord,
  fetchStorehouseItems,
  saveStorehouseRecord,
  deleteStorehouseRecord,
} from './storehouseService';
import { StructuredLesson } from '../lesson-engine/types';
import { parseMarkdownToStructuredLesson } from '../lesson-engine/adapter';
import { StructuredLessonRenderer } from '../lesson-engine/StructuredLessonRenderer';

interface StorehouseViewProps {
  onOpenLesson: (lesson: StructuredLesson) => void;
  onOpenAssistant: (prompt?: string) => void;
}

export const StorehouseView: React.FC<StorehouseViewProps> = ({
  onOpenLesson,
  onOpenAssistant,
}) => {
  const [items, setItems] = useState<StorehouseRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedItemForView, setSelectedItemForView] = useState<StructuredLesson | null>(null);

  // New Lesson form state
  const [newTitle, setNewTitle] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [newContent, setNewContent] = useState('');
  const [importText, setImportText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    const data = await fetchStorehouseItems();
    setItems(data);
    setLoading(false);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this record from your Storehouse?')) {
      await deleteStorehouseRecord(id);
      loadItems();
    }
  };

  const handleGenerateAI = async () => {
    if (!newTopic.trim()) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: newTopic }),
      });
      const data = await res.json();
      let structured: StructuredLesson;

      if (data.markdown) {
        structured = parseMarkdownToStructuredLesson(data.markdown, {
          title: newTopic,
          sourceType: 'ai-generated',
        });
      } else if (data.lesson) {
        structured = {
          ...data.lesson,
          id: `ai-gen-${Date.now()}`,
          sourceType: 'ai-generated',
        };
      } else {
        structured = parseMarkdownToStructuredLesson(
          `# ${newTopic}\n\nComprehensive structured lesson generated for ${newTopic}.\n\n## 1. Core Principles\n- Master fundamental syntax\n- Implement clean architectural separation`,
          { title: newTopic }
        );
      }

      const saved = await saveStorehouseRecord({
        id: structured.id,
        title: structured.title,
        type: 'lesson',
        data: structured,
        tags: ['AI Generated', 'Tutorial'],
      });

      setShowCreateModal(false);
      setNewTopic('');
      loadItems();
      onOpenLesson(structured);
    } catch (err) {
      console.error('Error generating lesson:', err);
      alert('Failed to generate lesson. Please check connection.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleManualCreate = async () => {
    if (!newTitle.trim()) return;
    const structured = parseMarkdownToStructuredLesson(
      `# ${newTitle}\n\n${newContent || 'Custom educational lesson created by student.'}`,
      { title: newTitle, sourceType: 'user-created' }
    );

    await saveStorehouseRecord({
      id: structured.id,
      title: structured.title,
      type: 'lesson',
      data: structured,
      tags: ['Personal Note', 'Custom'],
    });

    setShowCreateModal(false);
    setNewTitle('');
    setNewContent('');
    loadItems();
  };

  const handleImport = async () => {
    if (!importText.trim()) return;
    try {
      let structured: StructuredLesson;
      if (importText.trim().startsWith('{')) {
        structured = JSON.parse(importText);
      } else {
        structured = parseMarkdownToStructuredLesson(importText, {
          sourceType: 'imported',
        });
      }

      await saveStorehouseRecord({
        id: structured.id || `imported-${Date.now()}`,
        title: structured.title || 'Imported Lesson',
        type: 'lesson',
        data: structured,
        tags: ['Imported'],
      });

      setShowImportModal(false);
      setImportText('');
      loadItems();
    } catch (err) {
      alert('Invalid JSON or Markdown format.');
    }
  };

  const handleExportAll = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `storehouse-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredItems = items.filter((item) => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesQuery =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesQuery;
  });

  if (selectedItemForView) {
    return (
      <div className="app-main">
        <button
          type="button"
          onClick={() => setSelectedItemForView(null)}
          className="btn btn-secondary btn-sm"
          style={{ marginBottom: 'var(--space-6)' }}
        >
          ← Back to Storehouse Archive
        </button>
        <StructuredLessonRenderer lesson={selectedItemForView} />
      </div>
    );
  }

  return (
    <div className="app-main">
      {/* Header */}
      <div className="section-heading-bar">
        <div>
          <h2>Storehouse Knowledge Archive</h2>
          <p className="lead-paragraph" style={{ margin: '0.25rem 0 0 0', fontSize: 'var(--text-sm)' }}>
            Your persistent repository of saved curriculum lessons, custom notes, AI-generated tutorials, and practice exercises.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => setShowImportModal(true)}
            className="btn btn-secondary btn-sm"
          >
            <Upload size={14} />
            <span>Import</span>
          </button>
          <button
            type="button"
            onClick={handleExportAll}
            className="btn btn-secondary btn-sm"
            disabled={items.length === 0}
          >
            <Download size={14} />
            <span>Export Archive</span>
          </button>
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="btn btn-accent btn-sm"
          >
            <Plus size={14} />
            <span>New Lesson / Note</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 'var(--space-6) 0',
        }}
      >
        <div style={{ maxWidth: '360px', width: '100%' }}>
          <div className="search-input-wrapper">
            <Search size={16} className="search-input-icon" />
            <input
              type="text"
              placeholder="Search saved lessons, tags, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input search-input"
            />
          </div>
        </div>

        <div className="tabs-nav" style={{ margin: 0, border: 'none' }}>
          {[
            { id: 'all', label: `All (${items.length})` },
            { id: 'lesson', label: 'Lessons' },
            { id: 'note', label: 'Notes' },
            { id: 'chat-excerpt', label: 'Chat Excerpts' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterType(tab.id)}
              className={`tab-btn ${filterType === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      {loading ? (
        <div style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          Loading Storehouse records...
        </div>
      ) : filteredItems.length === 0 ? (
        <div
          className="card"
          style={{
            textAlign: 'center',
            padding: 'var(--space-12)',
            backgroundColor: 'var(--color-surface-subtle)',
          }}
        >
          <FolderArchive size={48} style={{ color: 'var(--color-accent)', margin: '0 auto var(--space-4) auto' }} />
          <h3>No Records Found in Storehouse</h3>
          <p style={{ maxWidth: '48ch', margin: '0.5rem auto var(--space-6) auto' }}>
            {searchQuery
              ? `No items matching "${searchQuery}". Try clearing search.`
              : 'Save any lesson from the curriculum or generate an AI-assisted lesson to store it permanently.'}
          </p>
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="btn btn-accent btn-md"
          >
            <Plus size={16} />
            <span>Create Your First Storehouse Lesson</span>
          </button>
        </div>
      ) : (
        <div className="grid-auto-fit-cards">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.type === 'lesson' && item.data) {
                  onOpenLesson(item.data);
                } else if (item.data) {
                  setSelectedItemForView(item.data);
                }
              }}
              className="card card-interactive"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                  <span className="badge badge-accent">
                    {item.type.toUpperCase()}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(item.id, e)}
                    className="btn btn-subtle btn-sm"
                    title="Delete record"
                    style={{ color: 'var(--color-danger)' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <h3 style={{ fontSize: 'var(--text-md)', margin: '0 0 var(--space-2) 0' }}>
                  {item.title}
                </h3>

                {item.data?.introduction && (
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                    {item.data.introduction.slice(0, 110)}...
                  </p>
                )}
              </div>

              <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-subtle)' }}>
                  {new Date(item.updatedAt || item.createdAt).toLocaleDateString()}
                </span>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-primary)' }}>
                  Read Lesson →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Create / AI Generator */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create or Generate Storehouse Lesson</h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="btn btn-subtle btn-sm"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: 'var(--space-6)', padding: 'var(--space-4)', backgroundColor: 'var(--color-accent-subtle)', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 0.5rem 0', color: 'var(--color-accent)' }}>
                  <Bot size={16} />
                  <span>Generate Complete Structured Lesson with AI</span>
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', margin: '0 0 0.75rem 0' }}>
                  Enter any web engineering concept (e.g. "CSS Container Queries", "WebSockets in Express", "TypeScript Generics"). The engine creates a full, structured lesson with objectives, theory, definitions, code blocks, and checkpoints.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="Enter topic..."
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    className="form-input"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateAI}
                    disabled={isGenerating || !newTopic.trim()}
                    className="btn btn-accent btn-md"
                  >
                    {isGenerating ? 'Generating...' : 'Generate & Save'}
                  </button>
                </div>
              </div>

              <hr />

              <h4 style={{ margin: 'var(--space-4) 0 var(--space-2) 0' }}>
                Or Create Lesson Manually (Markdown Supported)
              </h4>
              <div className="form-group">
                <label className="form-label">Lesson Title</label>
                <input
                  type="text"
                  placeholder="e.g. Architectural Separation in Modern Frontend"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Lesson Content (Markdown)</label>
                <textarea
                  placeholder="Write your lesson in Markdown format (# Headings, - lists, ```code)..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="form-textarea"
                  style={{ minHeight: '160px' }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="btn btn-secondary btn-md"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleManualCreate}
                disabled={!newTitle.trim()}
                className="btn btn-primary btn-md"
              >
                Save to Storehouse
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Import */}
      {showImportModal && (
        <div className="modal-overlay" onClick={() => setShowImportModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Import Learning Material</h3>
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="btn btn-subtle btn-sm"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                Paste structured Markdown or a exported Storehouse JSON snippet to add it directly to your archive:
              </p>
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Paste JSON or Markdown here..."
                className="form-textarea"
                style={{ minHeight: '220px', fontFamily: 'var(--font-mono)' }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="btn btn-secondary btn-md"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImport}
                disabled={!importText.trim()}
                className="btn btn-primary btn-md"
              >
                Import Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
