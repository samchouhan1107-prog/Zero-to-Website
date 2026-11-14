import { Chapter } from '../../../utils/types';
import { MODERN_CSS_MODULES_1_TO_3 } from './mod01_03';
import { MODERN_CSS_MODULES_4_TO_6 } from './mod04_06';
import { MODERN_CSS_MODULES_7_TO_9 } from './mod07_09';

export const MODERN_CSS_MODULES: Chapter[] = [
  ...MODERN_CSS_MODULES_1_TO_3,
  ...MODERN_CSS_MODULES_4_TO_6,
  ...MODERN_CSS_MODULES_7_TO_9
];

export const MODERN_CSS_COURSE = {
  id: 'course-modern-css',
  title: 'High-Performance Modern CSS Architecture & Design Systems',
  tagline: 'Master pure CSS3, custom property token hierarchies, fluid math, subgrid, container queries, and 60fps animations without bloated utility frameworks.',
  level: 'Intermediate to Advanced',
  duration: `${MODERN_CSS_MODULES.length} Modules • ${MODERN_CSS_MODULES.reduce((acc, m) => acc + m.lessons.length, 0)} In-Depth Lessons • 4 Production Capstones`,
  lessonsCount: MODERN_CSS_MODULES.reduce((acc, m) => acc + m.lessons.length, 0),
  description: 'A comprehensive, engineering-grade curriculum designed to turn web developers into elite CSS architects. From layout engines and fluid typography to cascade layers, container queries, and enterprise design token systems.',
  priceUsd: 49,
  weeklySubscriptionUsd: 14,
  learningOutcomes: [
    'Architect resilient, responsive web applications using pure standard CSS3 without third-party frameworks',
    'Build multi-tier design token systems (global, semantic, component) using CSS custom properties',
    'Master advanced layout engines: CSS Grid, Subgrid, Flexbox, and Container Queries',
    'Implement fluid typography, clamp() calculations, and perceptually uniform OKLCH color palettes',
    'Eliminate Cumulative Layout Shift (CLS) and optimize rendering using content-visibility and contain-intrinsic-size',
    'Construct 4 production-grade capstone projects: Editorial Landing Page, Component Kit, Theme Switcher, and Dashboard Shell'
  ],
  modules: MODERN_CSS_MODULES
};
