import fs from 'fs';
import path from 'path';

const base = 'https://webzonebw.shop';
const today = new Date().toISOString().split('T')[0];
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

const add = (loc, priority, changefreq = 'weekly') => {
  xml += ` <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n </url>\n`;
};

// Add main pages
add(`${base}/`, '1.0', 'daily');
add(`${base}/?view=practice-hub`, '0.95');
for (const t of ['box','flex','grid','dom','net','git']) add(`${base}/?view=visual-lab&amp;tool=${t}`, '0.90');
add(`${base}/?view=activities`, '0.85');

// Add chapters and lessons based on actual file structure
const chaptersDir = 'Chapters';
try {
  const chapters = fs.readdirSync(chaptersDir);
  
  for (const chapter of chapters) {
    const chapterPath = path.join(chaptersDir, chapter);
    if (fs.statSync(chapterPath).isDirectory()) {
      // Extract chapter number from directory name
      const chapterMatch = chapter.match(/Chapter-(\d+)-/);
      if (chapterMatch) {
        const chapterNum = chapterMatch[1];
        const chapterId = `ch-${chapterNum.padStart(2, '0')}`;
        
        // Add chapter page
        add(`${base}/?chapter=${chapterId}`, '0.85');
        
        // Find lessons in this chapter
        const lessons = fs.readdirSync(chapterPath);
        let lessonCount = 0;
        
        for (const lesson of lessons) {
          const lessonPath = path.join(chapterPath, lesson);
          if (fs.statSync(lessonPath).isDirectory() && fs.existsSync(path.join(lessonPath, 'lesson.html'))) {
            lessonCount++;
            // Extract lesson number from directory name
            const lessonMatch = lesson.match(/Lesson-(\d+)-/);
            if (lessonMatch) {
              const lessonNum = lessonMatch[1];
              const lessonId = `${chapterId}-l-${lessonNum.padStart(2, '0')}`;
              add(`${base}/?lesson=${lessonId}`, '0.80', 'monthly');
            }
          }
        }
        
        console.log(`Chapter ${chapter}: ${lessonCount} lessons found`);
      }
    }
  }
} catch (error) {
  console.error('Error processing chapters:', error);
}

// Add legal pages
for (const p of ['privacy','terms','cookies','about','contact']) add(`${base}/?legal=${p}`, '0.60', 'monthly');
for (const p of ['privacy-policy.html','terms-of-service.html','cookie-policy.html','about.html','contact.html']) add(`${base}/${p}`, '0.70', 'monthly');

// Add blog pages
add(`${base}/?view=blog`, '0.90');
for (const b of ['complete-guide-css-flexbox','understanding-css-grid','html5-semantic-elements-seo','javascript-dom-manipulation','responsive-web-design-best-practices','getting-started-with-webzonebw']) add(`${base}/?blog=${b}`, '0.85', 'monthly');

xml += `</urlset>\n`;

fs.writeFileSync(path.join(process.cwd(), 'public/sitemap.xml'), xml);
console.log(`sitemap.xml regenerated: ${xml.match(/<url>/g)?.length} URLs, lastmod ${today}`);