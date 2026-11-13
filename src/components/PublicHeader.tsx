import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Sun,
  Moon,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  Code2,
  Shield,
  Award,
  Layers,
} from 'lucide-react';
import { AppTheme } from '../utils/types';

interface PublicHeaderProps {
  activeView: string;
  onNavigate: (view: string) => void;
  theme: AppTheme;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onStartFree: () => void;
  hasStudentProgress?: boolean;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({
  activeView,
  onNavigate,
  theme,
  onToggleTheme,
  onOpenSearch,
  onStartFree,
  hasStudentProgress = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'free-lessons', label: 'Free Lessons' },
    { id: 'membership', label: 'Weekly Membership' },
    { id: 'public-practice', label: 'Live Code' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className="public-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
        backdropFilter: 'blur(12px)',
        transition: 'background-color 0.2s ease, border-color 0.2s ease',
      }}
    >
      <div className="public-header-inner">
        {/* Left: Brand Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', minWidth: 0 }}>
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textAlign: 'left',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: theme === 'dark' ? '#f8fafc' : 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xs)',
                flexShrink: 0,
                padding: '2px',
              }}
            >
              <img
                src="/assets/aistudio/logo_8c2b321c.png"
                alt="WebZoneBW SC Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
            <div>
              <span
                className="font-heading"
                style={{
                  display: 'block',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 800,
                  color: 'var(--color-text-strong)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                Zero-to-Website
              </span>
              <span
                className="public-header-subtitle"
                style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: 500,
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.02em',
                }}
              >
                Editorial Learning Platform
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-subtle'}`}
                style={{
                  fontWeight: isActive ? 700 : 500,
                  borderRadius: 'var(--radius-md)',
                  padding: '0.45rem 0.85rem',
                  fontSize: 'var(--text-sm)',
                }}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Search, Theme Toggle, Workspace CTA */}
        <div className="public-header-actions">
          {/* Quick Search */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="btn btn-secondary btn-sm"
            title="Search curriculum & topics"
            aria-label="Search courses and topics"
            style={{ padding: '0.45rem 0.65rem' }}
          >
            <Search size={15} />
            <span
              className="public-header-search-kbd"
              style={{ fontSize: '11px', opacity: 0.7, padding: '0.1rem 0.3rem', background: 'var(--color-inset)', borderRadius: '3px' }}
            >
              ⌘K
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="btn btn-secondary btn-sm btn-icon-only"
            title={theme === 'dark' ? 'Switch to Soft Porcelain Light' : 'Switch to Midnight Obsidian Dark'}
            aria-label="Toggle visual theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Start Free / Workspace CTA */}
          <button
            type="button"
            onClick={onStartFree}
            className="btn btn-primary btn-sm public-header-cta-desktop"
            style={{
              padding: '0.45rem 1rem',
              fontWeight: 700,
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span>{hasStudentProgress ? 'Continue Learning' : 'Start Learning Free'}</span>
            <ArrowRight size={14} />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="btn btn-subtle btn-sm btn-icon-only mobile-menu-toggle"
            title="Toggle Menu"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            padding: 'var(--space-4) var(--space-4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className={`btn btn-sm ${activeView === link.id ? 'btn-primary' : 'btn-subtle'}`}
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                padding: '0.65rem 1rem',
                fontSize: 'var(--text-sm)',
              }}
            >
              {link.label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onStartFree();
            }}
            className="btn btn-primary btn-sm"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '0.65rem 1rem',
              fontSize: 'var(--text-sm)',
              marginTop: '0.25rem',
            }}
          >
            <span>{hasStudentProgress ? 'Continue Learning' : 'Start Learning Free'}</span>
            <ArrowRight size={14} />
          </button>

          <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.5rem', marginTop: '0.25rem', display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => handleNavClick('settings')}
              className="btn btn-subtle btn-sm"
              style={{ flex: 1, justifyContent: 'flex-start', color: 'var(--color-text-muted)', fontSize: '12px' }}
            >
              Settings &amp; Account
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('dashboard')}
              className="btn btn-subtle btn-sm"
              style={{ flex: 1, justifyContent: 'flex-start', color: 'var(--color-text-subtle)', fontSize: '12px' }}
            >
              <Shield size={14} style={{ marginRight: '6px' }} />
              <span>Admin Studio</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
