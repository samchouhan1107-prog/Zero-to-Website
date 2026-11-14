import { INFRASTRUCTURE_ARTICLES } from './blog/infrastructureArticles';

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  featured: boolean;
  relatedChapter?: string;
  relatedLessonId?: string;
  updatedAt?: string;
  practiceChallenge?: string;
  dateLabel?: string;
  structuredContent?: import('./blogData').BlogSection[];
  tags: string[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'blog-001',
    slug: 'accessible-forms-html5',
    title: 'Building Accessible Forms: Beyond Basic HTML5',
    excerpt: 'A quick, practical guide to labels, keyboard access, helpful errors, and native HTML validation for forms everyone can use.',
    content: `# Building Accessible Forms: Beyond Basic HTML5

An accessible form makes it clear what to enter, works without a mouse, and explains how to fix mistakes. Start with the HTML the browser already understands; add custom behavior only when you need it.

## The 30-second checklist

1. Give every field a visible, connected label.
2. Use the right input type and native attributes such as required.
3. Make the form usable with a keyboard and show a clear focus indicator.
4. Explain errors in text, connect them to the field, and move focus thoughtfully.
5. Test with a keyboard and an accessibility checker.

## 1. Label every field

A placeholder is a hint, not a label: it disappears when someone types and may have low contrast. Connect a visible label to its input with matching for and id values.

[html]
<label for="email">Email address</label>
<input
  id="email"
  name="email"
  type="email"
  autocomplete="email"
  required
>
[/html]

The label gives the field an accessible name and creates a larger click target. Add short instructions when a format needs explaining. For a group of related choices, use fieldset and legend to name the group.

## 2. Let HTML do the simple validation

Choose a suitable input type, such as email, and use required when a value must be provided. Browsers can offer basic validation, and mobile devices can show a relevant keyboard. Do not add aria-required when the native required attribute already communicates the same information.

Native validation is a useful start, but it does not replace clear instructions or server-side validation. Never trust browser checks alone to protect submitted data.

## 3. Make keyboard use predictable

People should be able to reach every field and button with Tab, move backward with Shift+Tab, and use the control's normal keys. Keep the order aligned with the visual reading order. Do not remove the browser's focus outline unless you replace it with an equally visible style.

Prefer native buttons, selects, and inputs over custom controls. Native controls already include keyboard behavior that is difficult to reproduce correctly.

## 4. Make errors clear and connected

Do not communicate an error with color alone. Explain what needs fixing, mark the field invalid, and associate the message with that field:

[html]
<label for="email">Email address</label>
<input
  id="email"
  name="email"
  type="email"
  required
  aria-invalid="true"
  aria-describedby="email-help email-error"
>
<small id="email-help">We will send your receipt here.</small>
<small id="email-error">Enter a valid email address.</small>
[/html]

Only set aria-invalid="true" after validation finds a problem. Keep the error visible until it is fixed. If submission fails, show a short error summary near the top and move focus to it or to the first invalid field. This helps keyboard and screen-reader users find the next step.

## 5. A small complete example

[html]
<form action="/contact" method="post">
  <div>
    <label for="name">Your name</label>
    <input id="name" name="name" autocomplete="name" required>
  </div>

  <div>
    <label for="email">Email address</label>
    <input id="email" name="email" type="email"
      autocomplete="email" required>
  </div>

  <div>
    <label for="message">How can we help?</label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </div>

  <button type="submit">Send message</button>
</form>
[/html]

Each field has a persistent label, useful input semantics, and a required rule. In a real application, connect submission to your server and show specific, accessible errors if it rejects a value.

## Quick test

Put your mouse aside. Can you reach each field, understand what it asks, enter a value, and submit? Submit the empty form too. Check that it identifies what needs attention. A keyboard test catches many common problems quickly. An automated checker can help find others, but it does not replace testing with assistive technology.

## Remember

Start with semantic HTML, visible focus, and useful error messages. Add ARIA only when native HTML does not express the behavior you need.

## Further reading

- WCAG 2.2
- A11Y Project: Forms
- MDN: Your first form`,
    author: 'Sameer Chouhan',
    date: '2024-01-15',
    category: 'Best Practice',
    readTime: '8 min read',
    featured: true,
    relatedChapter: 'Chapter 8: Forms, FormData & Constraint Validation',
    relatedLessonId: 'ch-08-l-05',
    practiceChallenge: 'Build a sign-up form with clearly associated labels, required-field feedback, and keyboard-friendly error messages.',
    tags: ['accessibility', 'forms', 'html5', 'wcag', 'inclusive design']
  },
  {
    id: 'blog-002',
    slug: 'css-grid-vs-flexbox',
    title: 'Modern CSS Grid vs Flexbox: When to Use Which',
    excerpt: 'A practical guide to choosing Grid or Flexbox, with responsive examples, common mistakes, and a short practice task.',
    content: `# Modern CSS Grid vs Flexbox: When to Use Which

Grid and Flexbox both arrange elements on a page, but they solve different layout problems. Use Flexbox when items flow in one direction, such as a toolbar. Use Grid when you need rows and columns to work together, such as a page with a sidebar and main content.

## The quick choice

- **Flexbox:** one row or one column; good for navigation, button groups, and the inside of a card.
- **Grid:** rows and columns together; good for page structure and responsive card collections.
- **Both:** use Grid for the page, then Flexbox inside a region when its contents need one-direction alignment.

Ask whether you are arranging items along a flow or defining a two-dimensional layout. Choose the simpler tool that matches the relationship.

## Real-world example: a responsive card collection

A course catalogue needs cards to fit the available width without a separate rule for every screen size. Grid can create as many columns as fit while keeping cards readable:

[css]
.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1rem;
}
[/css]

The minimum card width controls when another column fits. The gap sets consistent spacing. Use auto-fill instead of auto-fit when you want empty tracks to remain reserved; for most card collections, auto-fit lets cards expand into available space.

## Real-world example: actions inside a card

A card footer may contain a label and a button. Their order follows a single row, so Flexbox is a natural fit. Let the row wrap when it becomes too narrow:

[css]
.card-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
[/css]

Use align-items for alignment across the row and justify-content for space along it. If items should stack on small screens, change flex-direction at a content-based breakpoint.

## Common mistakes and fixes

- **Using Grid for every small row:** Grid works, but adds structure you may not need. Use Flexbox for a simple toolbar or button row.
- **Using Flexbox to force a page-wide column alignment:** independent rows can drift because each row calculates its own item sizes. Use Grid when elements need to line up across rows.
- **Fixed widths that overflow:** prefer flexible tracks such as minmax(15rem, 1fr) and let Flexbox wrap.
- **Forgetting narrow screens:** resize the browser and test long text, zoom, and translated labels. Choose breakpoints where content stops fitting, not by device name.
- **Adding layout hacks before checking the container:** inspect the Grid or Flexbox overlay in browser DevTools to see actual tracks, gaps, and item sizes.

## Try it

Build a course page with a sidebar and main content using Grid. Inside the main area, arrange a title and action button with Flexbox. Narrow the viewport until the sidebar moves above the content, then check that the action row wraps without horizontal scrolling.

## Conclusion

Flexbox handles one-direction flow; Grid handles rows and columns. They complement each other. Use each where it makes the layout easiest to understand and maintain.

## Related resources

- MDN: CSS Grid Layout
- MDN: Flexbox
- Flexbox Froggy: an interactive Flexbox practice game`,
    author: 'Sameer Chouhan',
    date: '2024-01-10',
    category: 'Tutorial',
    readTime: '4 min read',
    featured: true,
    relatedChapter: 'Chapter 5: CSS Grid Layout Architecture',
    relatedLessonId: 'ch-05-l-01',
    updatedAt: '2026-11-14',
    practiceChallenge: 'Create a responsive page with CSS Grid for the overall layout and Flexbox for one row of controls. Resize it and note why each layout tool fits.',
    tags: ['css', 'grid', 'flexbox', 'layout', 'modern-css']
  },
  {
    id: 'blog-003',
    slug: 'typescript-in-production-patterns',
    title: 'TypeScript in Production: Patterns and Anti-Patterns',
    excerpt: 'A deep dive into real-world TypeScript patterns used in production applications, including error handling, type inference, and advanced generics.',
    content: `# TypeScript in Production: Patterns and Anti-Patterns

TypeScript brings type safety to JavaScript, but type safety without good patterns can lead to overly complex code. Here's what works in production.

## The Type Safety Foundation

Start with a strict type system:

[typescript]
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
[/typescript]

## Error Handling Pattern: Custom Error Types

Never throw plain Error objects. Create specific error types:

[typescript]
class ValidationError extends Error {
  constructor(
    public field: string,
    public message: string,
    public value: unknown
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NotFoundError extends Error {
  constructor(resource: string, id: string) {
    super(resourceName + ' with id ' + id + ' not found');
    this.name = 'NotFoundError';
  }
}

class NetworkError extends Error {
  constructor(public statusCode: number, message?: string) {
    super(message || 'HTTP ' + statusCode);
    this.name = 'NetworkError';
  }
}
[/typescript]

## API Response Pattern

Standardize API responses:

[typescript]
interface ApiResponse {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

async function fetchUser(id: string): Promise {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new NetworkError(
        response.status,
        data.message
      );
    }
    
    return { success: true, data };
  } catch (error) {
    if (error instanceof NetworkError) {
      return {
        success: false,
        error: {
          code: \`HTTP_\${error.statusCode}\`,
          message: error.message
        }
      };
    }
    
    return {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred'
      }
    };
  }
}
[/typescript]

## Type Inference Pattern: Avoid Over-Typeing

TypeScript can infer types. Let it:

[typescript]
// GOOD: Let TypeScript infer
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

function greet(user: typeof users[0]) {
  return \`Hello, \${user.name}!\`;
}

// BAD: Over-specifying
function greetBad(user: { id: number; name: string; email: string }) {
  return \`Hello, \${user.name}!\`;
}
[/typescript]

## Optional Chaining and Nullish Coalescing

Use modern operators for cleaner null handling:

[typescript]
interface User {
  name: string;
  address?: {
    city?: string;
    country?: string;
  };
}

function getCity(user: User): string {
  return user.address?.city ?? 'Unknown City';
}

function getCountry(user: User): string {
  return user.address?.country ?? 'Unknown Country';
}
[/typescript]

## Utility Types Pattern

Create reusable utility types:

[typescript]
type PartialBy = Omit & Partial;

type RequiredBy = Omit & Required;

type PickOptional = {
  [P in T as T[P] extends undefined ? P : never]?: T[P];
};

type PickRequired = {
  [P in T as T[P] extends undefined ? never : P]: T[P];
};

// Usage
interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  stock?: number;
}

type ProductCreate = PartialBy;
type ProductUpdate = RequiredBy;
type OptionalFields = PickOptional;
type RequiredFields = PickRequired;
[/typescript]

## Async/Await Pattern

Use async/await with proper error handling:

[typescript]
async function fetchUserData(userId: string): Promise {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new NetworkError(response.status);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}
[/typescript]

## Generic Type Parameters

Use generics for reusable components:

[typescript]
interface ApiResponse {
  data: T;
  error: null;
}

interface ApiError {
  data: null;
  error: Error;
}

type SafeResult = ApiResponse | ApiError;

function safeFetch(url: string): Promise {
  return fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json().then(data => ({ data, error: null }));
      }
      return { data: null, error: new Error(\`HTTP \${res.status}\`) };
    });
}

// Usage
safeFetch('/api/users/1')
  .then(result => {
    if (result.error) {
      console.error('Error:', result.error.message);
    } else {
      console.log('User:', result.data);
    }
  });
[/typescript]

## Decorators Pattern (When Needed)

Use decorators for cross-cutting concerns:

[typescript]
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    console.log(\`\${propertyKey} called with:\`, args);
    const result = originalMethod.apply(this, args);
    console.log(\`\${propertyKey} returned:\`, result);
    return result;
  };
  
  return descriptor;
}

class UserService {
  @Log
  async getUser(id: string): Promise {
    // Implementation
    return { id, name: 'Test User', email: 'test@example.com' };
  }
}
[/typescript]

## Anti-Patterns to Avoid

1. Using any everywhere
   - Instead: Use unknown or define proper types

2. Overly complex type unions
   - Instead: Use discriminated unions

3. Ignoring type errors
   - Instead: Fix them or suppress only specific cases

4. Creating too many wrapper types
   - Instead: Use built-in TypeScript features

## Testing Your Types

Write tests that verify type safety:

[typescript]
// Test file: types.test.ts
import { expectType } from 'tsd';

function greet(user: { name: string }) {
  return \`Hello, \${user.name}!\`;
}

// These should pass type checking
expectType<string>(greet({ name: 'Alice' }));
[/typescript]

## Conclusion

TypeScript in production is about finding the right balance:

- Use strict types for better safety
- Let TypeScript infer when possible
- Create reusable patterns for common scenarios
- Avoid over-engineering your type system

The best TypeScript code is code that's both type-safe and readable.

## Further Reading

- TypeScript Handbook
- Effective TypeScript
- TypeScript Deep Dive`,
    author: 'Sameer Chouhan',
    date: '2024-01-05',
    category: 'Best Practice',
    readTime: '12 min read',
    featured: false,
    practiceChallenge: 'Refactor a loosely typed function to use explicit input and return types, then handle one invalid input without hiding the error.',
    tags: ['typescript', 'production', 'patterns', 'error-handling', 'type-safety']
  },
  {
    id: 'blog-004',
    slug: 'performance-optimization-beyond-basics',
    title: 'Performance Optimization: Beyond the Basics',
    excerpt: 'A practical guide to measuring slow pages and improving images, code loading, rendering, and network use.',
    content: `# Performance Optimization: Beyond the Basics

Performance work starts with a user-visible problem, not a clever trick. A course page might feel slow because its hero image is huge; a dashboard might pause because it renders too many charts at once. Measure, fix the largest cause, and measure again.

## A practical improvement loop

1. **Reproduce the delay.** Test the page and action that feels slow.
2. **Measure it.** Use the Network and Performance panels in browser DevTools.
3. **Choose one cause.** Start with the largest image, slowest request, or expensive interaction.
4. **Make one change and compare.** Test under the same conditions.
5. **Check the experience.** Confirm the page still works and looks right on mobile.

Test on a representative phone or use network and CPU throttling. A fast development laptop can hide problems visitors experience.

## 1. Prioritize what appears first

For a course landing page, the first screen often matters more than images far down the page. Compress images, serve a size close to how they are displayed, and provide dimensions so the browser can reserve space:

[html]
<img
  src="/images/course-card.webp"
  alt="A learner building a responsive page"
  width="640"
  height="420"
  loading="lazy"
>
[/html]

Lazy-load images below the first screen. Do not lazy-load the main image visible immediately; delaying it can make the page feel slower. Use meaningful alternative text for informative images and empty alt text for decoration.

## 2. Load large features when visitors need them

A public page should not have to download a large report editor before anyone opens it. Dynamic imports let the browser fetch that feature on demand:

[javascript]
async function openReports() {
  const { renderReports } = await import('./reports.js');
  renderReports();
}
[/javascript]

In React, load a route or component with lazy and Suspense, and show a useful loading state. Split features that are large and not needed immediately. Splitting every small component can add extra requests and make debugging harder.

## 3. Reduce unnecessary rendering and work

If a dashboard with hundreds of rows is slow, render fewer rows with pagination or a virtualized list. If a search box performs a request on every keystroke, debounce the request so it runs after typing pauses. If a component repeatedly performs an expensive calculation, profile it before adding memoization.

Common mistake: optimizing code because it looks expensive. Fix: measure the actual interaction first. Memoization and caching add complexity and do not help when the work is already cheap.

## 4. Keep network use predictable

Inspect the Network panel for duplicate requests, oversized scripts, and resources that block the page. Remove unused assets and avoid loading the same data more than once when it can be reused safely.

Use caching for static assets so repeat visits can reuse them. Use versioned filenames or appropriate cache headers to ensure updates reach visitors. Do not publicly cache personal or account-specific responses. Resource hints such as preconnect or preload are useful only for resources you know are needed very soon; unnecessary hints compete for bandwidth.

## 5. Verify the result

Browser DevTools helps identify slow requests and long scripting or rendering tasks. Lighthouse can reveal common issues, but a score is a diagnostic clue, not the whole user experience. Recheck the actual page on a slower connection and confirm that navigation, forms, and interactive controls still work.

## Try it

Choose one page that feels slow. Record its largest image or script and how the delay appears. Change one thing, such as resizing an image below the fold or loading a heavy feature on demand. Repeat the same test and compare. If visitors do not see an improvement, revisit the measurement before adding another optimization.

## Conclusion

Measure before changing code, focus on what visitors notice, and verify the result on realistic devices. Small, evidence-based improvements are easier to maintain and less likely to make a site fragile.

## Related resources

- web.dev: Web Vitals
- MDN: Performance
- Chrome DevTools: Performance panel`,
    author: 'Sameer Chouhan',
    date: '2024-01-02',
    category: 'Tutorial',
    readTime: '5 min read',
    featured: true,
    relatedChapter: 'Chapter 10: Performance Optimization & Core Web Vitals',
    relatedLessonId: 'ch-10-l-03',
    updatedAt: '2026-11-14',
    practiceChallenge: 'Choose one expensive page feature, load it only when needed, and compare the initial page work before and after the change.',
    tags: ['performance', 'optimization', 'code-splitting', 'caching', 'best-practices']
  },
  ...INFRASTRUCTURE_ARTICLES
];

export const FEATURED_ARTICLES = BLOG_ARTICLES.filter(article => article.featured);
export const RECENT_ARTICLES = BLOG_ARTICLES.slice(0, 3);
