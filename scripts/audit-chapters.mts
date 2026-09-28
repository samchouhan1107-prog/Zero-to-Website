import { allChapters } from '../src/data/chapters/index';
import fs from 'fs';
import path from 'path';

const lessonIds = allChapters.flatMap(c => c.lessons.map(l => l.id));
const issues: string[] = [];

for (const c of allChapters) {
  if (!c.lessons.length) issues.push(`Chapter ${c.number} (${c.title}) has NO lessons`);
  for (const l of c.lessons) {
    if (!l.theorySections || l.theorySections.length === 0) issues.push(`${l.id} (${l.title}) has no theorySections`);
    if (!l.learningObjectives || l.learningObjectives.length === 0) issues.push(`${l.id} has no learningObjectives`);
  }
}

const seen = new Set<string>();
for (const id of lessonIds) {
  if (seen.has(id)) issues.push(`Duplicate lesson id: ${id}`);
  seen.add(id);
}

const actSrc = fs.readFileSync(path.join(process.cwd(), 'src/data/activitiesData.ts'), 'utf-8');
for (const m of actSrc.matchAll(/lessonId:\s*'([^']+)'/g)) {
  if (!seen.has(m[1])) issues.push(`activitiesData references missing lesson: ${m[1]}`);
}

console.log(issues.length ? issues.join('\n') : 'ALL CHECKS PASSED - every chapter has lessons, all sections complete, no dangling references.');
console.log(`Total: ${allChapters.length} chapters, ${lessonIds.length} lessons.`);
