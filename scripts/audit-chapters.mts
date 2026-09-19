import { allChapters } from '../src/data/chapters/index';
console.log('Chapters:', allChapters.length);
for (const c of allChapters) {
  console.log(`Ch ${c.number} | ${c.title} | lessons: ${c.lessons.length}`);
}
