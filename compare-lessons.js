import fs from 'fs';
import path from 'path';

// Count actual lesson files
const chaptersDir = 'Chapters';
let actualLessonCount = 0;
let actualLessons = [];

try {
    const chapters = fs.readdirSync(chaptersDir);
    
    for (const chapter of chapters) {
        const chapterPath = path.join(chaptersDir, chapter);
        if (fs.statSync(chapterPath).isDirectory()) {
            const lessons = fs.readdirSync(chapterPath);
            
            for (const lesson of lessons) {
                const lessonPath = path.join(chapterPath, lesson);
                if (fs.statSync(lessonPath).isDirectory()) {
                    const lessonFiles = fs.readdirSync(lessonPath);
                    if (lessonFiles.includes('lesson.html')) {
                        actualLessonCount++;
                        // Extract lesson ID from directory structure
                        const lessonId = `ch-${chapter.split('-')[1]}-${lesson.split('-')[1]}-l-${lesson.split('-')[3]}`;
                        actualLessons.push(lessonId);
                    }
                }
            }
        }
    }
} catch (error) {
    console.error('Error reading chapters:', error);
}

console.log('Actual Files Analysis:');
console.log(`Actual lesson files: ${actualLessonCount}`);
console.log('Actual Lesson IDs found:');
actualLessons.forEach(id => console.log(`  ${id}`));

// Compare with sitemap
const sitemapLessons = [
  'ch-00-l-01', 'ch-00-l-02',
  'ch-01-l-01', 'ch-01-l-02', 'ch-01-l-03', 'ch-01-l-04', 'ch-01-l-05',
  'ch-02-l-01', 'ch-02-l-02', 'ch-02-l-03', 'ch-02-l-04', 'ch-02-l-05',
  'ch-03-l-01', 'ch-03-l-02', 'ch-03-l-03', 'ch-03-l-04', 'ch-03-l-05', 'ch-03-l-06',
  'ch-04-l-01', 'ch-04-l-02', 'ch-04-l-03', 'ch-04-l-04', 'ch-04-l-05', 'ch-04-l-06', 'ch-04-l-07',
  'ch-05-l-01', 'ch-05-l-02', 'ch-05-l-03', 'ch-05-l-04', 'ch-05-l-05', 'ch-05-l-06',
  'ch-06-l-01', 'ch-06-l-02', 'ch-06-l-03', 'ch-06-l-04', 'ch-06-l-05', 'ch-06-l-06', 'ch-06-l-07', 'ch-06-l-08', 'ch-06-l-09', 'ch-06-l-10',
  'ch-07-l-01', 'ch-07-l-02', 'ch-07-l-03', 'ch-07-l-04', 'ch-07-l-05', 'ch-07-l-06',
  'ch-08-l-01', 'ch-08-l-02', 'ch-08-l-03', 'ch-08-l-04', 'ch-08-l-05', 'ch-08-l-06',
  'ch-09-l-01', 'ch-09-l-02', 'ch-09-l-03', 'ch-09-l-04', 'ch-09-l-05', 'ch-09-l-06',
  'ch-10-l-01', 'ch-10-l-02', 'ch-10-l-03', 'ch-10-l-04', 'ch-10-l-05', 'ch-10-l-06'
];

const missingInSitemap = actualLessons.filter(lesson => !sitemapLessons.includes(lesson));
const extraInSitemap = sitemapLessons.filter(lesson => !actualLessons.includes(lesson));

console.log('\nComparison Results:');
console.log(`Lessons missing from sitemap: ${missingInSitemap.length}`);
if (missingInSitemap.length > 0) {
    console.log('Missing lessons:');
    missingInSitemap.forEach(lesson => console.log(`  ${lesson}`));
}

console.log(`\nExtra lessons in sitemap: ${extraInSitemap.length}`);
if (extraInSitemap.length > 0) {
    console.log('Extra lessons in sitemap:');
    extraInSitemap.forEach(lesson => console.log(`  ${lesson}`));
}