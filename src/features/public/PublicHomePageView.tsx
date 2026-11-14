import React from 'react';
import {
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Code2,
  Layers,
  ShieldCheck,
  FileText,
  Clock,
  Compass,
  Zap,
  Lock,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { Chapter } from '../../utils/types';
import { VERIFIED_COURSE_OPPORTUNITIES } from '../../shared/courseIntelligenceTypes';

interface PublicHomePageViewProps {
  chapters: Chapter[];
  onNavigate: (view: string) => void;
  onOpenLesson: (lessonId: string) => void;
  onExploreCourseModal?: (courseId: string) => void;
}

export const PublicHomePageView: React.FC<PublicHomePageViewProps> = ({
  chapters,
  onNavigate,
  onOpenLesson,
  onExploreCourseModal,
}) => {
  // Published Core Course
  const coreChapterCount = chapters.length;
  const coreLessonCount = chapters.reduce((acc, c) => acc + c.lessons.length, 0);
  const chapter0 = chapters.find((c) => c.number === '00' || c.number === '0' || c.id === 'ch-00');
  const freeLessons = chapter0?.lessons || [];

  return (
    <div className="public-home-container" style={{ paddingBottom: 'var(--space-12)' }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          padding: 'var(--space-16) var(--space-6) var(--space-12)',
          textAlign: 'center',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {/* Subtle pill tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-primary-subtle)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-primary)',
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            marginBottom: 'var(--space-6)',
          }}
        >
          <span>Modern Editorial Web Engineering Academy</span>
        </div>

        <h1
          className="font-heading"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
            fontWeight: 800,
            color: 'var(--color-text-strong)',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: 'var(--space-5)',
          }}
        >
          Turn your curiosity into practical skills.
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: 1.6,
            color: 'var(--color-text-muted)',
            maxWidth: '740px',
            margin: '0 auto var(--space-8)',
          }}
        >
          Explore clear lessons, useful ideas and guided courses that help you move from beginner to confident creator.
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'var(--space-4)',
            flexWrap: 'wrap',
            marginBottom: 'var(--space-10)',
          }}
        >
          <button
            type="button"
            onClick={() => onOpenLesson(freeLessons[0]?.id || 'ch-00-l-01')}
            className="btn btn-primary"
            style={{
              padding: '0.75rem 1.6rem',
              fontSize: 'var(--text-md)',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>Start Learning Free</span>
            <ArrowRight size={17} />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('courses')}
            className="btn btn-secondary"
            style={{
              padding: '0.75rem 1.6rem',
              fontSize: 'var(--text-md)',
              fontWeight: 600,
            }}
          >
            Explore Courses
          </button>
        </div>

        {/* Value Indicators */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-6)',
            flexWrap: 'wrap',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-subtle)',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <CheckCircle2 size={14} style={{ color: 'var(--color-success)' }} />
            100% Native Standard CSS3 (No Framework Bloat)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <CheckCircle2 size={14} style={{ color: 'var(--color-success)' }} />
            Free Introductory Chapter (No Credit Card)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <CheckCircle2 size={14} style={{ color: 'var(--color-success)' }} />
            Integrated Live Code Execution
          </span>
        </div>
      </section>

      {/* 2. FREE-TO-PAID LEARNING JOURNEY ROADMAP */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto var(--space-16)',
          padding: '0 var(--space-6)',
        }}
      >
        <div
          className="card"
          style={{
            padding: 'var(--space-8)',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto var(--space-8)' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-primary)',
              }}
            >
              The Learning Journey
            </span>
            <h2
              className="font-heading"
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 800,
                color: 'var(--color-text-strong)',
                margin: '0.35rem 0 0.5rem',
              }}
            >
              A transparent path from first curiosity to production mastery.
            </h2>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
              Start with genuine free education, build foundational understanding, and choose premium deep-dives when you are ready.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            {[
              { step: '1', title: 'Discover', desc: 'Browse curated course syllabi and practical curriculum tracks.', badge: 'Free' },
              { step: '2', title: 'Explore', desc: 'Read course outlines, learning objectives, and code breakdown samples.', badge: 'Free' },
              { step: '3', title: 'Start Free', desc: 'Complete Chapter 00 foundations without account requirements.', badge: 'Free' },
              { step: '4', title: 'Practise', desc: 'Test code in live browser sandboxes with automated checkpoints.', badge: 'Free' },
              { step: '5', title: 'Unlock Premium', desc: 'Purchase individual courses or printable PDF study packs.', badge: 'One-Time' },
              { step: '6', title: 'Subscribe', desc: 'Join Weekly Membership for new lessons and continuous releases.', badge: '$19/mo' },
            ].map((s) => (
              <div
                key={s.step}
                style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-4)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-primary)',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {s.step}
                  </span>
                  <span className="badge badge-subtle" style={{ fontSize: '10px' }}>
                    {s.badge}
                  </span>
                </div>
                <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-strong)', marginBottom: '0.25rem' }}>
                  {s.title}
                </strong>
                <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PUBLISHED COURSE (ZERO-TO-WEBSITE CORE) */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto var(--space-16)',
          padding: '0 var(--space-6)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-success)',
              }}
            >
              Published &amp; Live Curriculum
            </span>
            <h2
              className="font-heading"
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 800,
                color: 'var(--color-text-strong)',
                margin: '0.25rem 0 0',
              }}
            >
              Zero-to-Website: Full-Stack Web Architecture
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('courses')}
            className="btn btn-subtle btn-sm"
          >
            <span>View Full Syllabus ({coreChapterCount} Chapters)</span>
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Featured Core Course Editorial Banner */}
        <div
          className="card"
          style={{
            padding: 'var(--space-8)',
            backgroundColor: 'var(--color-surface)',
            border: '2px solid var(--color-primary-subtle)',
            borderRadius: 'var(--radius-xl)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-8)',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span className="badge badge-success">Published &amp; Complete</span>
              <span className="badge badge-subtle">{coreChapterCount} Chapters · {coreLessonCount} Lessons</span>
              <span className="badge badge-subtle">Beginner to Advanced</span>
            </div>

            <h3
              className="font-heading"
              style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 800,
                color: 'var(--color-text-strong)',
                marginBottom: '0.5rem',
              }}
            >
              Master web engineering from packet flow to production deployment.
            </h3>

            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
              Built specifically for humans who want to understand how things work under the hood. No magical framework shortcuts—just robust HTML5 semantics, standard CSS3 layout engines, asynchronous JavaScript, and production DevOps.
            </p>

            {/* Key Topics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '11px', color: 'var(--color-text-strong)' }}>
              <div>✓ Chapter 00: Internet &amp; HTTP Foundations (Free)</div>
              <div>✓ Chapter 01–03: Semantic HTML &amp; Box Model</div>
              <div>✓ Chapter 04–05: Modern Flexbox &amp; CSS Grid</div>
              <div>✓ Chapter 06–08: DOM, Async JS &amp; Fetch APIs</div>
              <div>✓ Chapter 09–10: Git Flow &amp; Cloud Deployment</div>
              <div>✓ Formatted Offline PDF Study Packs</div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => onOpenLesson(freeLessons[0]?.id || 'ch-00-l-01')}
                className="btn btn-primary"
                style={{ padding: '0.65rem 1.25rem', fontSize: 'var(--text-sm)' }}
              >
                <span>Read Free Chapter 00</span>
                <ArrowRight size={14} />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('courses')}
                className="btn btn-secondary"
                style={{ padding: '0.65rem 1.25rem', fontSize: 'var(--text-sm)' }}
              >
                Explore All 11 Chapters
              </button>
            </div>
          </div>

          {/* Right Side: Chapter Preview List */}
          <div
            style={{
              backgroundColor: 'var(--color-surface-subtle)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
            }}
          >
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-strong)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Curriculum Structure Preview
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {chapters.slice(0, 5).map((ch) => (
                <div
                  key={ch.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0.75rem',
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-xs)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 800, color: 'var(--color-primary)' }}>Ch {ch.number}:</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-text-strong)' }}>{ch.title}</span>
                  </div>
                  <span className={ch.number === '00' ? 'badge badge-success' : 'badge badge-subtle'} style={{ fontSize: '10px' }}>
                    {ch.number === '00' ? 'Free Sample' : `${ch.lessons.length} lessons`}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
              <span style={{ fontSize: '11px', color: 'var(--color-text-subtle)' }}>
                + 6 advanced chapters covering Git, Performance &amp; Production Cloud Deployment
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FREE INTRODUCTORY LESSONS (CHAPTER 00) */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto var(--space-16)',
          padding: '0 var(--space-6)',
        }}
      >
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-primary)',
            }}
          >
            Start Immediately · Zero Sign-Up Required
          </span>
          <h2
            className="font-heading"
            style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 800,
              color: 'var(--color-text-strong)',
              margin: '0.25rem 0 0.5rem',
            }}
          >
            Free Introductory Lessons: Foundations &amp; Mental Models
          </h2>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
            Read directly in your browser. Complete with real-world analogies, visual flowcharts, and practice checkpoints.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-5)',
          }}
        >
          {freeLessons.map((lesson, idx) => (
            <div
              key={lesson.id}
              className="card"
              style={{
                padding: 'var(--space-5)',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="badge badge-success" style={{ fontSize: '10px' }}>Free Lesson</span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-subtle)' }}>
                    <Clock size={12} style={{ display: 'inline', marginRight: '3px', verticalAlign: 'middle' }} />
                    {lesson.durationMinutes || 15} mins
                  </span>
                </div>

                <strong
                  className="font-heading"
                  style={{
                    display: 'block',
                    fontSize: 'var(--text-md)',
                    fontWeight: 700,
                    color: 'var(--color-text-strong)',
                    marginBottom: '0.4rem',
                  }}
                >
                  Lesson 0.{idx + 1}: {lesson.title}
                </strong>

                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                  {lesson.tagline}
                </p>

                {/* Key takeaway */}
                <div style={{ fontSize: '11px', color: 'var(--color-text-subtle)', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.5rem', marginBottom: '1rem' }}>
                  <strong>Key Focus:</strong> {lesson.learningObjectives?.[0] || 'Core fundamental architecture'}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenLesson(lesson.id)}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Read Lesson Free</span>
                <ArrowRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. UPCOMING COURSE BLUEPRINTS (TRANSPARENTLY LABELED AS IN-DEVELOPMENT) */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto var(--space-16)',
          padding: '0 var(--space-6)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-accent)',
              }}
            >
              Curriculum Roadmap
            </span>
            <h2
              className="font-heading"
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 800,
                color: 'var(--color-text-strong)',
                margin: '0.25rem 0 0',
              }}
            >
              Upcoming Course Blueprints
            </h2>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: '0.25rem 0 0' }}>
              In editorial development. Outlined based on international engineering skill gaps and modern web standards.
            </p>
          </div>
          <span className="badge badge-subtle">4 Tracks In Review</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--space-5)',
          }}
        >
          {VERIFIED_COURSE_OPPORTUNITIES.slice(0, 4).map((opp) => (
            <div
              key={opp.id}
              className="card"
              style={{
                padding: 'var(--space-5)',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="badge badge-warning" style={{ fontSize: '10px' }}>Upcoming Blueprint</span>
                  <span className="badge badge-subtle" style={{ fontSize: '10px' }}>{opp.difficulty}</span>
                </div>

                <strong
                  className="font-heading"
                  style={{
                    display: 'block',
                    fontSize: 'var(--text-md)',
                    fontWeight: 700,
                    color: 'var(--color-text-strong)',
                    marginBottom: '0.35rem',
                  }}
                >
                  {opp.title}
                </strong>

                <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                  {opp.tagline}
                </p>

                <div style={{ fontSize: '11px', color: 'var(--color-text-subtle)', marginBottom: '0.75rem' }}>
                  <strong>Target Audience:</strong> {opp.targetAudience}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--color-text-subtle)' }}>Modules Planned:</span>
                  <strong>{opp.keyModules?.length || 4} Modules</strong>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('courses')}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Explore Syllabus Outline</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. WEEKLY MEMBERSHIP SECTION */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 var(--space-6)',
        }}
      >
        <div
          className="card"
          style={{
            padding: 'var(--space-8)',
            backgroundColor: 'var(--color-surface)',
            border: '2px solid var(--color-accent)',
            borderRadius: 'var(--radius-xl)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-8)',
            alignItems: 'center',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-accent)',
              }}
            >
              Continuous Learning
            </span>
            <h2
              className="font-heading"
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 800,
                color: 'var(--color-text-strong)',
                margin: '0.25rem 0 0.5rem',
              }}
            >
              Weekly Learning Membership
            </h2>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Stay ahead of web engineering standards. Receive structured new lessons, expanded chapters, formatted offline PDF study sheets, and interactive sandbox labs delivered weekly.
            </p>

            <div style={{ display: 'grid', gap: '0.4rem', fontSize: 'var(--text-xs)', color: 'var(--color-text-strong)', marginBottom: '1.25rem' }}>
              <div>✓ 1 New Deep-Dive Lesson or Expanded Chapter Every Week</div>
              <div>✓ Downloadable Printable PDF Textbook Study Packs with Personal Licence</div>
              <div>✓ In-Browser Code Sandboxes with Automated Test Checkpoints</div>
              <div>✓ Transparent Monthly Billing: Cancel Anytime in 1 Click</div>
              <div>✓ Permanent Lifetime Access to All Completed Lessons</div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => onNavigate('membership')}
                className="btn btn-primary"
                style={{ padding: '0.65rem 1.4rem' }}
              >
                <span>View Membership Details</span>
                <ArrowRight size={14} />
              </button>
              <span style={{ fontSize: '11px', color: 'var(--color-text-subtle)' }}>
                14-day satisfaction money-back guarantee
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div
            style={{
              backgroundColor: 'var(--color-surface-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-6)',
              textAlign: 'center',
            }}
          >
            <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
              MONTHLY BILLING
            </span>
            <div style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--color-text-strong)', lineHeight: 1 }}>
              $19 <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-subtle)' }}>USD / month</span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: '0.5rem 0 1rem' }}>
              Content published weekly • Billed once per month • Cancel anytime
            </p>

            <button
              type="button"
              onClick={() => onNavigate('membership')}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.65rem' }}
            >
              <span>Explore Inclusions &amp; Terms</span>
            </button>

            <div style={{ fontSize: '10px', color: 'var(--color-text-subtle)', marginTop: '0.75rem', lineHeight: 1.4 }}>
              Zero automatic renewals without notice. You retain permanent access to all materials completed during your active term.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
