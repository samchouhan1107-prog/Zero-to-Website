import fs from 'fs';
const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');

// Count lesson entries
const lessonMatches = sitemap.match(/lesson=ch-[^<]*/g);
const lessonCount = lessonMatches ? lessonMatches.length : 0;

// Count chapter entries  
const chapterMatches = sitemap.match(/chapter=ch-[^<]*/g);
const chapterCount = chapterMatches ? chapterMatches.length : 0;

// Count total URLs
const urlMatches = sitemap.match(/<url>/g);
const totalUrls = urlMatches ? urlMatches.length : 0;

console.log('Sitemap Analysis:');
console.log(`Total URLs: ${totalUrls}`);
console.log(`Chapter URLs: ${chapterCount}`);
console.log(`Lesson URLs: ${lessonCount}`);

// List all lesson IDs
if (lessonMatches) {
    console.log('\nLesson IDs in sitemap:');
    const lessonIds = lessonMatches.map(match => match.replace('lesson=', ''));
    lessonIds.forEach(id => console.log(`  ${id}`));
}

export { lessonCount, chapterCount, totalUrls };