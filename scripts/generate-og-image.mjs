const sharp = (await import('sharp')).default;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f0f14"/>
      <stop offset="100%" style="stop-color:#1a1a24"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <g opacity="0.06" stroke="#60a5fa" stroke-width="1">
    <line x1="0" y1="0" x2="0" y2="630"/><line x1="100" y1="0" x2="100" y2="630"/><line x1="200" y1="0" x2="200" y2="630"/><line x1="300" y1="0" x2="300" y2="630"/><line x1="400" y1="0" x2="400" y2="630"/><line x1="500" y1="0" x2="500" y2="630"/><line x1="600" y1="0" x2="600" y2="630"/><line x1="700" y1="0" x2="700" y2="630"/><line x1="800" y1="0" x2="800" y2="630"/><line x1="900" y1="0" x2="900" y2="630"/><line x1="1000" y1="0" x2="1000" y2="630"/><line x1="1100" y1="0" x2="1100" y2="630"/><line x1="1200" y1="0" x2="1200" y2="630"/>
    <line x1="0" y1="0" x2="1200" y2="0"/><line x1="0" y1="100" x2="1200" y2="100"/><line x1="0" y1="200" x2="1200" y2="200"/><line x1="0" y1="300" x2="1200" y2="300"/><line x1="0" y1="400" x2="1200" y2="400"/><line x1="0" y1="500" x2="1200" y2="500"/><line x1="0" y1="600" x2="1200" y2="600"/>
  </g>
  <circle cx="200" cy="150" r="200" fill="#3b82f6" opacity="0.06"/>
  <circle cx="1000" cy="500" r="250" fill="#8b5cf6" opacity="0.06"/>
  <rect x="80" y="80" rx="8" ry="8" width="220" height="40" fill="#f59e0b" opacity="0.15"/>
  <text x="190" y="106" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#f59e0b" text-anchor="middle" letter-spacing="2">WEBZONEBW SC</text>
  <text x="80" y="220" font-family="system-ui,sans-serif" font-size="58" font-weight="900" fill="#ffffff" letter-spacing="-1">Powerful Web Tools,</text>
  <text x="80" y="295" font-family="system-ui,sans-serif" font-size="58" font-weight="900" fill="#ffffff" letter-spacing="-1">Built for the Modern</text>
  <text x="80" y="375" font-family="system-ui,sans-serif" font-size="58" font-weight="900" fill="#60a5fa" letter-spacing="-1">Web</text>
  <text x="80" y="430" font-family="system-ui,sans-serif" font-size="19" fill="#a1a1aa">Free interactive developer tools, tutorials, CSS visualizers,</text>
  <text x="80" y="458" font-family="system-ui,sans-serif" font-size="19" fill="#a1a1aa">code sandboxes, and a complete web engineering curriculum.</text>
  <rect x="80" y="495" rx="6" ry="6" width="80" height="30" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="120" y="515" font-family="system-ui,sans-serif" font-size="12" font-weight="600" fill="#60a5fa" text-anchor="middle">HTML</text>
  <rect x="170" y="495" rx="6" ry="6" width="80" height="30" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="210" y="515" font-family="system-ui,sans-serif" font-size="12" font-weight="600" fill="#a78bfa" text-anchor="middle">CSS</text>
  <rect x="260" y="495" rx="6" ry="6" width="120" height="30" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="320" y="515" font-family="system-ui,sans-serif" font-size="12" font-weight="600" fill="#34d399" text-anchor="middle">JavaScript</text>
  <rect x="390" y="495" rx="6" ry="6" width="80" height="30" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="430" y="515" font-family="system-ui,sans-serif" font-size="12" font-weight="600" fill="#f59e0b" text-anchor="middle">Flexbox</text>
  <rect x="480" y="495" rx="6" ry="6" width="80" height="30" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="520" y="515" font-family="system-ui,sans-serif" font-size="12" font-weight="600" fill="#06b6d4" text-anchor="middle">Grid</text>
  <text x="80" y="580" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#60a5fa">webzonebw.shop</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ quality: 95 })
  .toFile('public/og-image.png');

console.log('OK: public/og-image.png created (1200x630)');
