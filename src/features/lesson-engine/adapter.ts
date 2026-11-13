import { Chapter, Lesson } from '../../utils/types';
import {
  StructuredLesson,
  StructuredLessonSection,
  StructuredLessonBlock,
} from './types';

/**
 * Converts a standard existing curriculum Lesson into the canonical StructuredLesson.
 */
export function normalizeLessonToStructured(
  lesson: Lesson,
  chapter?: Chapter
): StructuredLesson {
  const sections: StructuredLessonSection[] = [];

  // 1. Process theory sections
  if (lesson.theorySections && lesson.theorySections.length > 0) {
    lesson.theorySections.forEach((sec, idx) => {
      const blocks: StructuredLessonBlock[] = [];

      // Paragraph content
      if (sec.content) {
        blocks.push({
          id: `para-${idx}`,
          type: 'paragraph',
          data: { text: sec.content },
        });
      }

      // Bullet points
      if (sec.bulletPoints && sec.bulletPoints.length > 0) {
        blocks.push({
          id: `list-${idx}`,
          type: 'list',
          data: {
            style: 'bullet',
            items: sec.bulletPoints,
          },
        });
      }

      // Callouts / Notes / Tips
      if (sec.callout) {
        blocks.push({
          id: `callout-${idx}`,
          type: 'callout',
          data: {
            type: sec.callout.type || 'tip',
            title: sec.callout.type ? sec.callout.type.toUpperCase() : 'NOTE',
            content: sec.callout.text,
          },
        });
      }

      sections.push({
        id: `section-${idx}`,
        heading: sec.heading,
        blocks,
      });
    });
  }

  // 2. Real world analogy as definition / mental model section
  if (lesson.realWorldAnalogy) {
    sections.push({
      id: 'section-analogy',
      heading: lesson.realWorldAnalogy.title || 'Mental Model & Real-World Analogy',
      blocks: [
        {
          id: 'def-analogy',
          type: 'definition',
          data: {
            term: lesson.realWorldAnalogy.concept,
            definition: lesson.realWorldAnalogy.story,
            context: lesson.realWorldAnalogy.moral,
          },
        },
      ],
    });
  }

  // 3. Interactive Code Example section
  if (lesson.codeExample) {
    const codeBlocks: StructuredLessonBlock[] = [];

    codeBlocks.push({
      id: 'example-desc',
      type: 'paragraph',
      data: { text: lesson.codeExample.description },
    });

    if (lesson.codeExample.html) {
      codeBlocks.push({
        id: 'code-html',
        type: 'code',
        data: {
          language: 'html',
          title: 'HTML Structure',
          code: lesson.codeExample.html,
          showLineNumbers: true,
        },
      });
    }

    if (lesson.codeExample.css) {
      codeBlocks.push({
        id: 'code-css',
        type: 'code',
        data: {
          language: 'css',
          title: 'CSS Styling',
          code: lesson.codeExample.css,
          showLineNumbers: true,
        },
      });
    }

    if (lesson.codeExample.js) {
      codeBlocks.push({
        id: 'code-js',
        type: 'code',
        data: {
          language: 'javascript',
          title: 'JavaScript Logic',
          code: lesson.codeExample.js,
          showLineNumbers: true,
        },
      });
    }

    sections.push({
      id: 'section-code-example',
      heading: lesson.codeExample.title || 'Practical Code Example',
      blocks: codeBlocks,
    });
  }

  return {
    id: lesson.id,
    chapterId: chapter?.id || lesson.chapterId,
    chapterNumber: chapter?.number,
    chapterTitle: chapter?.title,
    number: lesson.number,
    slug: lesson.slug,
    title: lesson.title,
    introduction: lesson.tagline || '',
    durationMinutes: lesson.durationMinutes || 15,
    difficulty: lesson.practice?.difficulty || 'Beginner',
    learningObjectives: lesson.learningObjectives || [],
    sections,
    summary: lesson.summary || [],
    practice: lesson.practice,
    quiz: lesson.quiz,
    relatedTopics: lesson.relatedTopics,
    sourceType: 'curriculum',
    createdAt: new Date().toISOString(),
  };
}

/**
 * Parses markdown text (e.g. from AI generation, chat response, or user import)
 * into a fully structured StructuredLesson.
 */
export function parseMarkdownToStructuredLesson(
  markdown: string,
  meta?: Partial<StructuredLesson>
): StructuredLesson {
  const lines = markdown.split('\n');
  const sections: StructuredLessonSection[] = [];
  const objectives: string[] = [];
  const summary: string[] = [];

  let currentHeading = 'Lesson Content';
  let currentBlocks: StructuredLessonBlock[] = [];
  let blockCounter = 0;

  let inCodeBlock = false;
  let codeLang = 'javascript';
  let codeBuffer: string[] = [];

  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];

  const flushBlocks = () => {
    if (currentBlocks.length > 0) {
      sections.push({
        id: `section-${sections.length}`,
        heading: currentHeading,
        blocks: [...currentBlocks],
      });
      currentBlocks = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Code blocks ```lang
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        currentBlocks.push({
          id: `block-${blockCounter++}`,
          type: 'code',
          data: {
            language: codeLang,
            code: codeBuffer.join('\n'),
            showLineNumbers: true,
          },
        });
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeLang = trimmed.slice(3).trim() || 'javascript';
        codeBuffer = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Markdown Table | col | col |
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const cols = trimmed.split('|').slice(1, -1).map((c) => c.trim());
      // Check if it's separator row |---|---|
      if (cols.every((c) => /^:?-+:?$/.test(c))) {
        continue;
      }
      if (!inTable) {
        inTable = true;
        tableHeaders = cols;
        tableRows = [];
      } else {
        tableRows.push(cols);
      }
      continue;
    } else if (inTable) {
      // Flush table
      currentBlocks.push({
        id: `block-${blockCounter++}`,
        type: 'table',
        data: {
          headers: tableHeaders,
          rows: tableRows,
        },
      });
      inTable = false;
      tableHeaders = [];
      tableRows = [];
    }

    // Heading #, ##, ###
    if (trimmed.startsWith('# ')) {
      // Top level title if not set
      if (!meta?.title) {
        meta = { ...meta, title: trimmed.slice(2).trim() };
      }
      continue;
    }

    if (trimmed.startsWith('## ')) {
      flushBlocks();
      currentHeading = trimmed.slice(3).trim();
      continue;
    }

    if (trimmed.startsWith('### ')) {
      currentBlocks.push({
        id: `block-${blockCounter++}`,
        type: 'subheading',
        data: { text: trimmed.slice(4).trim() },
      });
      continue;
    }

    // Learning Objectives / Highlights
    if (
      trimmed.toLowerCase().includes('objective') ||
      trimmed.toLowerCase().includes('what you will learn')
    ) {
      // Followed by list items
      continue;
    }

    // Callout / Note / Tip: > [!TIP] or > **Note:**
    if (trimmed.startsWith('>')) {
      const quoteText = trimmed.replace(/^>\s*/, '');
      let calloutType: 'tip' | 'warning' | 'note' | 'key-rule' = 'note';
      if (/tip|hint|insight/i.test(quoteText)) calloutType = 'tip';
      if (/warning|danger|caution/i.test(quoteText)) calloutType = 'warning';
      if (/rule|key rule|principle/i.test(quoteText)) calloutType = 'key-rule';

      currentBlocks.push({
        id: `block-${blockCounter++}`,
        type: 'callout',
        data: {
          type: calloutType,
          title: calloutType.toUpperCase(),
          content: quoteText.replace(/^\*\*(.*?)\*\*:?/, '').trim() || quoteText,
        },
      });
      continue;
    }

    // Definition format: **Term**: Definition
    const defMatch = trimmed.match(/^\*\*([^*]+)\*\*:\s*(.+)$/);
    if (defMatch) {
      currentBlocks.push({
        id: `block-${blockCounter++}`,
        type: 'definition',
        data: {
          term: defMatch[1].trim(),
          definition: defMatch[2].trim(),
        },
      });
      continue;
    }

    // Bullet list items
    if (/^[-*]\s+/.test(trimmed)) {
      const itemText = trimmed.replace(/^[-*]\s+/, '');
      if (currentHeading.toLowerCase().includes('summary') || currentHeading.toLowerCase().includes('takeaway')) {
        summary.push(itemText);
      } else if (currentHeading.toLowerCase().includes('objective')) {
        objectives.push(itemText);
      } else {
        const lastBlock = currentBlocks[currentBlocks.length - 1];
        if (lastBlock && lastBlock.type === 'list' && lastBlock.data.style === 'bullet') {
          lastBlock.data.items.push(itemText);
        } else {
          currentBlocks.push({
            id: `block-${blockCounter++}`,
            type: 'list',
            data: { style: 'bullet', items: [itemText] },
          });
        }
      }
      continue;
    }

    // Ordered list items
    if (/^\d+\.\s+/.test(trimmed)) {
      const itemText = trimmed.replace(/^\d+\.\s+/, '');
      const lastBlock = currentBlocks[currentBlocks.length - 1];
      if (lastBlock && lastBlock.type === 'list' && lastBlock.data.style === 'ordered') {
        lastBlock.data.items.push(itemText);
      } else {
        currentBlocks.push({
          id: `block-${blockCounter++}`,
          type: 'list',
          data: { style: 'ordered', items: [itemText] },
        });
      }
      continue;
    }

    // Regular paragraph
    if (trimmed.length > 0) {
      currentBlocks.push({
        id: `block-${blockCounter++}`,
        type: 'paragraph',
        data: { text: trimmed },
      });
    }
  }

  // Flush remaining table or blocks
  if (inTable) {
    currentBlocks.push({
      id: `block-${blockCounter++}`,
      type: 'table',
      data: {
        headers: tableHeaders,
        rows: tableRows,
      },
    });
  }
  flushBlocks();

  const title = meta?.title || (lines[0] ? lines[0].replace(/^[#\s]+/, '') : 'Untitled Lesson');

  return {
    id: meta?.id || `lesson-custom-${Date.now()}`,
    chapterId: meta?.chapterId || 'storehouse-custom',
    chapterTitle: meta?.chapterTitle || 'Storehouse Knowledge Archive',
    title,
    introduction: meta?.introduction || 'Comprehensive educational lesson saved in the Storehouse.',
    durationMinutes: meta?.durationMinutes || 12,
    difficulty: meta?.difficulty || 'Beginner',
    learningObjectives: objectives.length > 0 ? objectives : (meta?.learningObjectives || [
      'Master core concepts and understand underlying principles',
      'Examine practical syntax and architectural patterns',
      'Apply knowledge directly in sandbox exercises',
    ]),
    sections: sections.length > 0 ? sections : [
      {
        id: 'section-0',
        heading: 'Lesson Overview',
        blocks: [{ id: 'p0', type: 'paragraph', data: { text: markdown } }],
      },
    ],
    summary: summary.length > 0 ? summary : (meta?.summary || ['Key principles reviewed and recorded.']),
    sourceType: meta?.sourceType || 'ai-generated',
    createdAt: meta?.createdAt || new Date().toISOString(),
  };
}
