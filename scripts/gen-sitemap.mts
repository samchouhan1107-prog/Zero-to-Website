import { allChapters } from '../src/data/chapters/index';
import fs from 'fs';
import path from 'path';

const base = 'https://webzonebw.shop';
const today = new Date().toISOString().split('T')[0];
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

const add = (loc: string, priority: string, changefreq = 'weekly') => {
  xml += ` <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n </url>\n`;
};

add(`${base}/`, '1.0', 'daily');
add(`${base}/?view=practice-hub`, '0.95');
for (const t of ['box','flex','grid','dom','net','git']) add(`${base}/?view=visual-lab&amp;tool=${t}`, '0.90');
add(`${base}/?view=activities`, '0.85');
for (const c of allChapters) {
  add(`${base}/?chapter=${c.id}`, '0.85');
  for (const l of c.lessons) add(`${base}/?lesson=${l.id}`, '0.80', 'monthly');
}
for (const p of ['privacy','terms','cookies','about','contact']) add(`${base}/?legal=${p}`, '0.60', 'monthly');
for (const p of ['privacy-policy.html','terms-of-service.html','cookie-policy.html','about.html','contact.html']) add(`${base}/${p}`, '0.70', 'monthly');
add(`${base}/?view=blog`, '0.90');
for (const b of ['complete-guide-css-flexbox','understanding-css-grid','html5-semantic-elements-seo','javascript-dom-manipulation','responsive-web-design-best-practices','getting-started-with-webzonebw']) add(`${base}/?blog=${b}`, '0.85', 'monthly');
xml += `</urlset>\n`;

fs.writeFileSync(path.join(process.cwd(), 'public/sitemap.xml'), xml);
console.log(`sitemap.xml regenerated: ${xml.match(/<url>/g)?.length} URLs, lastmod ${today}`);
