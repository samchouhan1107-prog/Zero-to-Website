import test from 'node:test';
import assert from 'node:assert/strict';
import { BLOG_POSTS } from '../../data/blogData';
import { ALL_PLATFORM_CHAPTERS } from '../../data/courses/allCourses';
import {
  filterBlogPosts,
  formatBlogDate,
  getBlogCategories,
  resolveBlogTargetAction,
} from './blogUtils';

test('BLOG_POSTS contains unique ids and slugs grounded in real curriculum lessons', () => {
  assert.ok(BLOG_POSTS.length >= 28, `Expected at least 28 blog posts, got ${BLOG_POSTS.length}`);

  const ids = new Set<string>();
  const slugs = new Set<string>();
  const validLessonIds = new Set(
    ALL_PLATFORM_CHAPTERS.flatMap((chapter) => chapter.lessons.map((lesson) => lesson.id))
  );
  const chapterById = new Map(ALL_PLATFORM_CHAPTERS.map((chapter) => [chapter.id, chapter]));

  for (const post of BLOG_POSTS) {
    assert.ok(!ids.has(post.id), `Duplicate blog id: ${post.id}`);
    assert.ok(!slugs.has(post.slug), `Duplicate blog slug: ${post.slug}`);
    ids.add(post.id);
    slugs.add(post.slug);

    assert.ok(post.courseRef, `Post ${post.id} is missing courseRef`);
    const chapter = chapterById.get(post.courseRef.chapterId);
    assert.ok(chapter, `Post ${post.id} references unknown chapter ${post.courseRef.chapterId}`);
    assert.equal(
      post.courseRef.chapterLabel,
      chapter.title,
      `Post ${post.id} chapterLabel should match actual chapter title "${chapter.title}"`
    );
    assert.ok(
      validLessonIds.has(post.courseRef.lessonId),
      `Post ${post.id} references unknown lesson ${post.courseRef.lessonId}`
    );

    const fullText = JSON.stringify(post);
    assert.ok(!/VisualLab/i.test(fullText), `Stale VisualLab reference in ${post.id}`);
    assert.ok(!/Brain Card/i.test(fullText), `Stale Brain Card reference in ${post.id}`);
    assert.ok(!/Web REPL/i.test(fullText), `Stale Web REPL reference in ${post.id}`);
    assert.ok(!/Live Code Sandbox/i.test(fullText), `Stale Live Code Sandbox reference in ${post.id}`);

    for (const section of post.content) {
      if (section.internalLink) {
        const target = section.internalLink.target;
        const isLessonTarget =
          target.startsWith('lesson:') && validLessonIds.has(target.slice('lesson:'.length));
        const isAllowedView = target === 'practice' || target === 'courses' || target === 'learning';
        assert.ok(
          isLessonTarget || isAllowedView,
          `Post ${post.id} has invalid internalLink target: ${target}`
        );
      }
    }
  }
});

test('getBlogCategories and filterBlogPosts filter cleanly by category and search query', () => {
  const categories = getBlogCategories(BLOG_POSTS);
  assert.equal(categories[0], 'All');
  assert.ok(categories.includes('CSS'));
  assert.ok(categories.includes('AI Engineering'));

  const cssOnly = filterBlogPosts(BLOG_POSTS, 'CSS', '');
  assert.ok(cssOnly.length >= 5);
  assert.ok(cssOnly.every((p) => p.category === 'CSS'));

  const queryMatch = filterBlogPosts(BLOG_POSTS, 'All', 'Subgrid');
  assert.ok(queryMatch.some((p) => p.id === 'blog-007'));

  const noMatch = filterBlogPosts(BLOG_POSTS, 'CSS', 'nonexistent-xyz-term-999');
  assert.equal(noMatch.length, 0);
});

test('resolveBlogTargetAction maps internal targets consistently for studio and public contexts', () => {
  assert.deepEqual(resolveBlogTargetAction('practice', 'studio'), {
    type: 'view',
    viewId: 'practice',
  });
  assert.deepEqual(resolveBlogTargetAction('practice', 'public'), {
    type: 'view',
    viewId: 'public-practice',
  });
  assert.deepEqual(resolveBlogTargetAction('courses', 'studio'), {
    type: 'view',
    viewId: 'learning',
  });
  assert.deepEqual(resolveBlogTargetAction('courses', 'public'), {
    type: 'view',
    viewId: 'courses',
  });
  assert.deepEqual(resolveBlogTargetAction('lesson:ch-04-l-01', 'studio'), {
    type: 'lesson',
    lessonId: 'ch-04-l-01',
  });
  assert.equal(formatBlogDate('2025-10-02'), 'Oct 2, 2025');
});
