import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  BookOpen,
  ArrowRight,
  Clock,
  Layers,
  CheckCircle2,
  Lock,
  X,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { Chapter } from '../../utils/types';
import { VERIFIED_COURSE_OPPORTUNITIES, CourseOpportunity } from '../../shared/courseIntelligenceTypes';
import { FEATURED_COURSES, FeaturedCourseDefinition } from '../../data/courses/allCourses';
import { useAuth } from '../../utils/AuthContext';

interface CourseCatalogueViewProps {
  chapters: Chapter[];
  onOpenLesson: (lessonId: string) => void;
  onNavigateMembership: () => void;
  showFreeOnly?: boolean;
}

export const CourseCatalogueView: React.FC<CourseCatalogueViewProps> = ({
  chapters,
  onOpenLesson,
  onNavigateMembership,
  showFreeOnly = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>(showFreeOnly ? 'published' : 'all'); // 'all' | 'published' | 'upcoming'
  const [activeModalBlueprint, setActiveModalBlueprint] = useState<CourseOpportunity | null>(null);
  const [activeCourseModal, setActiveCourseModal] = useState<FeaturedCourseDefinition | null>(null);
  const { entitlement } = useAuth();

  useEffect(() => {
    setSelectedStatus(showFreeOnly ? 'published' : 'all');
  }, [showFreeOnly]);

  const freeChapter = chapters.find((c) => c.number === '00' || c.number === '0' || c.id === 'ch-00');
  const freeLessons = freeChapter?.lessons || [];

  if (showFreeOnly) {
    const filteredFreeLessons = freeLessons.filter((lesson) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        lesson.title.toLowerCase().includes(q) ||
        lesson.tagline.toLowerCase().includes(q) ||
        lesson.learningObjectives.some((obj) => obj.toLowerCase().includes(q))
      );
    });

    return (
      <div className="catalogue-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: 'var(--space-8) var(--space-6) var(--space-16)' }}>
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-success)',
            }}
          >
            Free Access · No Sign-Up Required
          </span>
          <h1
            className="font-heading"
            style={{
              fontSize: 'var(--text-3xl)',
              fontWeight: 800,
              color: 'var(--color-text-strong)',
              margin: '0.25rem 0 0.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            Free Introductory Lessons
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', maxWidth: '720px', lineHeight: 1.6, margin: 0 }}>
            Start reading Chapter 00 ({freeChapter?.title || 'Foundations & Mental Models'}) right in your browser. Every introductory lesson includes complete theory, code examples, interactive practice, and checkpoints.
          </p>
        </div>

        {/* Search Bar */}
        <div
          className="card"
          style={{
            padding: 'var(--space-4) var(--space-5)',
            marginBottom: 'var(--space-8)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ position: 'relative', flex: '1 1 280px' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-subtle)',
              }}
            />
            <input
              type="text"
              aria-label="Search free lessons"
              placeholder="Filter Chapter 00 lessons by topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ width: '100%', paddingLeft: '2.25rem', fontSize: 'var(--text-sm)' }}
            />
          </div>
          <span className="badge badge-success">{filteredFreeLessons.length} Free Lessons Ready</span>
        </div>

        {/* Free Lessons Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-6)',
            marginBottom: 'var(--space-10)',
          }}
        >
          {filteredFreeLessons.map((lesson, idx) => (
            <div
              key={lesson.id}
              className="card"
              style={{
                padding: 'var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                  <span className="badge badge-success">Free Lesson 0.{idx + 1}</span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-subtle)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    {lesson.durationMinutes || 15} min read
                  </span>
                </div>
                <h3
                  className="font-heading"
                  style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 800,
                    color: 'var(--color-text-strong)',
                    marginBottom: '0.5rem',
                    lineHeight: 1.25,
                  }}
                >
                  {lesson.title}
                </h3>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {lesson.tagline}
                </p>
                <div
                  style={{
                    backgroundColor: 'var(--color-surface-subtle)',
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1rem',
                    fontSize: '11px',
                    color: 'var(--color-text-strong)',
                    display: 'grid',
                    gap: '0.35rem',
                  }}
                >
                  {lesson.learningObjectives.slice(0, 2).map((obj, oIdx) => (
                    <div key={oIdx}>✓ {obj}</div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenLesson(lesson.id)}
                className="btn btn-primary btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Read Lesson Free</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Upgrade Banner */}
        <div
          className="card"
          style={{
            padding: 'var(--space-6)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            borderLeft: '4px solid var(--color-primary)',
          }}
        >
          <div>
            <strong style={{ display: 'block', fontSize: 'var(--text-base)', color: 'var(--color-text-strong)', marginBottom: '0.25rem' }}>
              Ready for Chapters 01–10 &amp; Offline PDF Study Packs?
            </strong>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              {entitlement.hasActiveMonthlyPack
                ? 'Your Monthly Pack is active — all 11 chapters are unlocked for your account.'
                : 'Unlock the full 11-chapter curriculum and downloadable PDF packs with Weekly Learning Membership ($19 USD / month).'}
            </span>
          </div>
          <button
            type="button"
            onClick={entitlement.hasActiveMonthlyPack ? () => onOpenLesson('ch-01-l-01') : onNavigateMembership}
            className="btn btn-secondary btn-sm"
          >
            <span>{entitlement.hasActiveMonthlyPack ? 'Open Chapter 01' : 'View Weekly Membership'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    );
  }

  // Unified items
  const matchesSearch = (title: string, desc: string) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return title.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
  };

  const filteredFeaturedCourses = FEATURED_COURSES.filter((course) => {
    if (selectedStatus === 'upcoming') return false;
    if (selectedDifficulty !== 'all' && !course.level.toLowerCase().includes(selectedDifficulty.toLowerCase())) {
      return false;
    }
    return matchesSearch(course.title, course.description);
  });

  const filteredUpcoming = VERIFIED_COURSE_OPPORTUNITIES.filter((opp) => {
    if (selectedStatus === 'published') return false;
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'css' && opp.category !== 'frontend-css') return false;
      if (selectedCategory === 'security' && opp.category !== 'security-backend') return false;
      if (selectedCategory === 'cloud' && opp.category !== 'devops-cloud') return false;
      if (selectedCategory === 'fullstack' && opp.category !== 'ai-fullstack' && opp.category !== 'architecture') return false;
    }
    if (selectedDifficulty !== 'all' && opp.difficulty !== selectedDifficulty) return false;
    return matchesSearch(opp.title, opp.tagline);
  });

  return (
    <div className="catalogue-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: 'var(--space-8) var(--space-6) var(--space-16)' }}>
      {/* 1. Header */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--color-primary)',
          }}
        >
          Curriculum Catalogue
        </span>
        <h1
          className="font-heading"
          style={{
            fontSize: 'var(--text-3xl)',
            fontWeight: 800,
            color: 'var(--color-text-strong)',
            margin: '0.25rem 0 0.5rem',
            letterSpacing: '-0.02em',
          }}
        >
          Courses
        </h1>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', maxWidth: '720px', lineHeight: 1.6, margin: 0 }}>
          Explore complete, structured web and AI engineering curricula. Every lesson includes verified code examples, knowledge checks, and direct in-browser practice.
        </p>
      </div>

      {/* 2. Search & Filter Bar */}
      <div
        className="card"
        style={{
          padding: 'var(--space-4) var(--space-5)',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: 'var(--space-8)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Search Input */}
        <div style={{ position: 'relative', flex: '1 1 260px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-subtle)',
            }}
          />
          <input
            type="text"
            placeholder="Search by topic, skill, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{
              width: '100%',
              paddingLeft: '2.25rem',
              fontSize: 'var(--text-sm)',
            }}
          />
        </div>

        {/* Filter Dropdowns */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="form-select"
            style={{ fontSize: 'var(--text-xs)', padding: '0.45rem 0.75rem' }}
          >
            <option value="all">All Release Status</option>
            <option value="published">Published &amp; Live Only</option>
            <option value="upcoming">Upcoming Blueprints Only</option>
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-select"
            style={{ fontSize: 'var(--text-xs)', padding: '0.45rem 0.75rem' }}
          >
            <option value="all">All Subject Areas</option>
            <option value="fullstack">Full-Stack &amp; Web Architecture</option>
            <option value="css">Modern CSS &amp; Layout Systems</option>
            <option value="security">Web Security &amp; Auth</option>
            <option value="cloud">Cloud DevOps &amp; Containers</option>
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="form-select"
            style={{ fontSize: 'var(--text-xs)', padding: '0.45rem 0.75rem' }}
          >
            <option value="all">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* 3. Course Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-6)',
        }}
      >
        {/* PUBLISHED FEATURED COURSES */}
        {filteredFeaturedCourses.map((course) => {
          const firstLessonId = course.modules[0]?.lessons[0]?.id || 'ch-00-l-01';
          return (
            <div
              key={course.id}
              className="card"
              style={{
                padding: 'var(--space-6)',
                backgroundColor: 'var(--color-surface)',
                border: '2px solid var(--color-primary)',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                  <span className="badge badge-success" style={{ fontSize: '10px' }}>Published &amp; Complete</span>
                  <span className="badge badge-subtle" style={{ fontSize: '10px' }}>{course.modules.length} Modules · {course.lessonsCount} Lessons</span>
                </div>

                <h3
                  className="font-heading"
                  style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 800,
                    color: 'var(--color-text-strong)',
                    marginBottom: '0.5rem',
                    lineHeight: 1.25,
                  }}
                >
                  {course.title}
                </h3>

                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {course.tagline}
                </p>

                {/* What Student Learns */}
                <div
                  style={{
                    backgroundColor: 'var(--color-surface-subtle)',
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1rem',
                    fontSize: '11px',
                    color: 'var(--color-text-strong)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                  }}
                >
                  {course.learningOutcomes.slice(0, 3).map((outcome, idx) => (
                    <div key={idx}>✓ {outcome}</div>
                  ))}
                  <div>✓ Includes interactive code examples &amp; knowledge checks</div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', fontSize: 'var(--text-xs)' }}>
                  <span style={{ color: 'var(--color-text-subtle)' }}>Level:</span>
                  <strong style={{ color: 'var(--color-primary)' }}>{course.level}</strong>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => onOpenLesson(firstLessonId)}
                    className="btn btn-primary btn-sm"
                    style={{ justifyContent: 'center' }}
                  >
                    <span>Start Course</span>
                    <ArrowRight size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCourseModal(course)}
                    className="btn btn-secondary btn-sm"
                    style={{ justifyContent: 'center' }}
                  >
                    <span>View Modules</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* UPCOMING BLUEPRINT CARDS */}
        {filteredUpcoming.map((opp) => (
          <div
            key={opp.id}
            className="card"
            style={{
              padding: 'var(--space-6)',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                <span className="badge badge-warning" style={{ fontSize: '10px' }}>Upcoming Blueprint</span>
                <span className="badge badge-subtle" style={{ fontSize: '10px' }}>{opp.difficulty}</span>
              </div>

              <h3
                className="font-heading"
                style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 800,
                  color: 'var(--color-text-strong)',
                  marginBottom: '0.5rem',
                  lineHeight: 1.25,
                }}
              >
                {opp.title}
              </h3>

              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                {opp.tagline}
              </p>

              {/* What Student Learns */}
              <div
                style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1rem',
                  fontSize: '11px',
                  color: 'var(--color-text-strong)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                }}
              >
                <div><strong>Audience:</strong> {opp.targetAudience}</div>
                <div><strong>Planned Modules:</strong> {opp.keyModules?.length || 4} Deep-Dive Units</div>
                <div><strong>Format:</strong> In-Browser Labs + Printable PDF Study Packs</div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', fontSize: 'var(--text-xs)' }}>
                <span style={{ color: 'var(--color-text-subtle)' }}>Development Status:</span>
                <span className="badge badge-subtle" style={{ fontSize: '10px' }}>Syllabus Outlined</span>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalBlueprint(opp)}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Explore Module Outlines</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredFeaturedCourses.length === 0 && filteredUpcoming.length === 0 && (
        <div style={{ textAlign: 'center', padding: 'var(--space-12) 0', color: 'var(--color-text-muted)' }}>
          <p style={{ fontSize: 'var(--text-md)', marginBottom: '0.5rem' }}>No courses match your filter criteria.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
              setSelectedStatus('all');
            }}
            className="btn btn-secondary btn-sm"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* FEATURED COURSE MODULES MODAL */}
      {activeCourseModal && (
        <div className="modal-backdrop" onClick={() => setActiveCourseModal(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '820px', maxHeight: '85vh', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span className="badge badge-success" style={{ marginBottom: '0.25rem' }}>Published Course Syllabus</span>
                <h3 className="font-heading" style={{ fontSize: 'var(--text-xl)', fontWeight: 800, margin: 0 }}>
                  {activeCourseModal.title}
                </h3>
                <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: '0.25rem 0 0 0' }}>
                  {activeCourseModal.duration} • {activeCourseModal.level}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveCourseModal(null)}
                className="btn btn-subtle btn-sm btn-icon-only"
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
              {activeCourseModal.modules.map((mod, mIdx) => (
                <div
                  key={mod.id || mIdx}
                  style={{
                    backgroundColor: 'var(--color-surface-subtle)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-4)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-strong)' }}>
                      {mod.title}
                    </strong>
                    <span className="badge badge-subtle" style={{ fontSize: '10px' }}>
                      {mod.lessons.length} lessons
                    </span>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: '0 0 0.5rem 0', lineHeight: 1.5 }}>
                    {mod.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {mod.lessons.map((lesson) => {
                      const isFree = lesson.id.startsWith('ch-00');
                      const isUnlocked = isFree || entitlement.hasActiveMonthlyPack || entitlement.unlockedAllChapters;
                      return (
                        <div
                          key={lesson.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '11px',
                            padding: '0.35rem 0.5rem',
                            backgroundColor: 'var(--color-surface)',
                            borderRadius: 'var(--radius-sm)',
                            gap: '0.5rem',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', minWidth: 0 }}>
                            {isUnlocked ? (
                              <CheckCircle2 size={12} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                            ) : (
                              <Lock size={12} style={{ color: 'var(--color-warning)', flexShrink: 0 }} />
                            )}
                            <span style={{ color: 'var(--color-text-strong)', fontWeight: 500 }}>
                              {lesson.title}
                            </span>
                            <span
                              className={`badge ${isFree ? 'badge-accent' : isUnlocked ? 'badge-success' : 'badge-subtle'}`}
                              style={{ fontSize: '9px', padding: '0.1rem 0.4rem' }}
                            >
                              {isFree ? 'Free' : isUnlocked ? 'Unlocked' : 'Monthly Pack'}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveCourseModal(null);
                              onOpenLesson(lesson.id);
                            }}
                            className="btn btn-subtle btn-sm"
                            style={{ padding: '0.15rem 0.45rem', fontSize: '10px', flexShrink: 0 }}
                          >
                            {isUnlocked ? 'Open Lesson' : 'Preview / Unlock'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => {
                  const firstLesson = activeCourseModal.modules[0]?.lessons[0]?.id;
                  setActiveCourseModal(null);
                  if (firstLesson) onOpenLesson(firstLesson);
                }}
                className="btn btn-primary btn-sm"
              >
                <span>Start Lesson 1</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPCOMING BLUEPRINT MODAL */}
      {activeModalBlueprint && (
        <div className="modal-backdrop" onClick={() => setActiveModalBlueprint(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '780px', maxHeight: '85vh', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span className="badge badge-warning" style={{ marginBottom: '0.25rem' }}>Upcoming Course Blueprint</span>
                <h3 className="font-heading" style={{ fontSize: 'var(--text-xl)', fontWeight: 800, margin: 0 }}>
                  {activeModalBlueprint.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalBlueprint(null)}
                className="btn btn-subtle btn-sm btn-icon-only"
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
              {activeModalBlueprint.skillGapDescription}
            </p>

            <h4 className="font-heading" style={{ fontSize: 'var(--text-sm)', fontWeight: 700, marginBottom: '0.65rem' }}>
              Planned Modules &amp; Deliverables
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
              {activeModalBlueprint.keyModules?.map((mod) => (
                <div
                  key={mod.moduleNumber}
                  style={{
                    backgroundColor: 'var(--color-surface-subtle)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-4)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-strong)' }}>
                      Module {mod.moduleNumber}: {mod.title}
                    </strong>
                    <span className="badge badge-subtle" style={{ fontSize: '10px' }}>{mod.lessonsCount} lessons</span>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: '0 0 0.5rem 0', lineHeight: 1.5 }}>
                    {mod.description}
                  </p>
                  <div style={{ fontSize: '11px', color: 'var(--color-primary)' }}>
                    <strong>Deliverable Project:</strong> {mod.deliverableProject}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-subtle)' }}>
                Included for Weekly Members upon editorial publication release.
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveModalBlueprint(null);
                  onNavigateMembership();
                }}
                className="btn btn-primary btn-sm"
              >
                <span>Explore Weekly Membership</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
