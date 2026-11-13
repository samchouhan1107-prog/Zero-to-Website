import { BlogPost } from '../blogData';

export const PERF_NETWORK_ARTICLES: BlogPost[] = [
  {
    id: 'blog-010',
    slug: 'understanding-critical-rendering-path',
    title: 'Understanding the Critical Rendering Path: From Byte Stream to Pixel Paint',
    excerpt: 'Step inside the browser rendering engine. Learn the exact transformation from raw network bytes to DOM and CSSOM, Render Tree construction, Layout geometry, and GPU paint compositing.',
    author: 'WebZoneBW Editorial Team',
    date: '2025-07-12',
    readTime: '13 min read',
    category: 'Performance',
    tags: ['Critical Rendering Path', 'Performance', 'DOM', 'CSSOM', 'Browser Internals'],
    content: [
      {
        heading: 'The Blank Screen Phase: What Happens Between Enter and First Pixel',
        text: 'When a user enters a URL into their browser, the screen remains blank for hundreds of milliseconds. During this critical window, the browser engine executes a series of sequential transformations known as the Critical Rendering Path (CRP). If a single render-blocking script or CSS file stalls in the network pipe, the entire rendering pipeline stops dead. Mastering the CRP is the key to achieving instantaneous First Contentful Paint (FCP).',
      },
      {
        heading: 'The 5 Milestones of the Rendering Pipeline',
        text: 'The journey from server response to rendered pixels consists of five deterministic stages:',
        list: [
          '1. DOM Construction: Converts raw HTML bytes -> Characters -> Tokens -> Nodes -> Document Object Model (DOM) tree.',
          '2. CSSOM Construction: Parses CSS rules and cascades computed styles into the CSS Object Model (CSSOM) tree.',
          '3. Render Tree: Combines visible DOM nodes with computed styles from CSSOM (ignoring elements with display: none and <head> tags).',
          '4. Layout (Reflow): Traverses the Render Tree to calculate the exact geometric coordinates and pixel dimensions for every box on the viewport.',
          '5. Paint & Composite: Rasterizes vector boxes and text into pixel bitmaps and uploads layer textures to the GPU for screen display.',
        ],
      },
      {
        heading: 'Render-Blocking vs. Parser-Blocking Resources',
        text: 'A fundamental rule of browser architecture is that CSS is render-blocking, while standard JavaScript is parser-blocking.',
        table: {
          headers: ['Resource Type', 'Blocking Behavior', 'Why the Browser Must Block', 'Optimization Strategy'],
          rows: [
            ['External CSS (<link rel="stylesheet">)', 'RENDER-BLOCKING (Does not block HTML parsing, but blocks Paint!)', 'Prevents Flash of Unstyled Content (FOUC). The browser will never render a page without knowing styles.', 'Inline Critical CSS in <style> tag; load secondary CSS asynchronously'],
            ['Standard JS (<script src="...">)', 'PARSER-BLOCKING (Halts HTML tokenization immediately!)', 'JavaScript can call document.write() or inspect DOM elements that follow in the stream.', 'Add defer or async attribute to load and execute without blocking HTML parser'],
            ['Deferred JS (<script defer src="...">)', 'NON-BLOCKING', 'Downloads in background; executes strictly after DOM parsing finishes.', 'Default best practice for 99% of frontend script tags'],
          ],
        },
      },
      {
        heading: 'Pause & Check: async vs. defer Script Execution',
        text: 'Both async and defer download scripts in the background without blocking HTML parsing. But how do their execution timings differ?',
        checkpoint: {
          question: 'If you have Script A (analytics) and Script B (application logic that depends on Script A), why will using <script async> on both scripts intermittently break your application in production?',
          answer: 'async scripts execute the exact millisecond they finish downloading, completely disregarding their order in the HTML document. If Script B downloads faster than Script A, Script B will execute first and crash because Script A is not yet loaded. Using defer preserves strict document execution order: Script A is guaranteed to execute before Script B, immediately before DOMContentLoaded.',
          hint: 'async is completely out-of-order; defer preserves sequential order.',
        },
      },
      {
        heading: 'Optimizing Critical CSS for Sub-Second First Contentful Paint',
        text: 'To minimize CRP latency, extract the minimal CSS required to render above-the-fold content and inline it directly in the document <head>.',
        code: {
          language: 'html',
          code: '<head>\n  <!-- 1. Inline Critical CSS (loads in initial TCP packet!) -->\n  <style>\n    body { margin: 0; font-family: system-ui, sans-serif; background: #0f172a; }\n    .hero { min-height: 80vh; display: grid; place-items: center; color: #fff; }\n  </style>\n\n  <!-- 2. Preload non-critical full stylesheet asynchronously -->\n  <link rel="preload" href="/styles/full.css" as="style" onload="this.rel=\'stylesheet\'">\n  <noscript><link rel="stylesheet" href="/styles/full.css"></noscript>\n\n  <!-- 3. Defer all non-essential JavaScript -->\n  <script defer src="/js/app.js"></script>\n</head>',
        },
        callout: {
          type: 'tip',
          title: 'The 14KB Initial TCP Window Rule',
          text: 'TCP connections start with an initial congestion window (initcwnd) of 10 packets (~14KB). If your initial HTML document, inline critical CSS, and title tag fit inside 14KB, the browser renders the first frame within a single network roundtrip!',
        },
        internalLink: {
          label: 'Launch Critical Rendering Path Inspector',
          target: 'webtools',
          description: 'Inspect resource waterfall timing, DOM/CSSOM blocking durations, and paint milestones in WebZoneBW.',
        },
      },
      {
        heading: 'Key Takeaways: CRP Optimization Matrix',
        text: 'Mastering the Critical Rendering Path is the difference between an application that feels sluggish and one that feels instantaneous.',
        list: [
          'Keep your initial critical HTML and inline CSS bundle under 14KB for single-roundtrip paint.',
          'Always mark external scripts with defer unless they are standalone independent analytics tags.',
          'Eliminate unused CSS rules to minimize CSSOM tree calculation times.',
        ],
      },
    ],
  },
  {
    id: 'blog-011',
    slug: 'web-performance-core-web-vitals',
    title: 'Web Performance Optimization: Core Web Vitals (LCP, INP, CLS) in 2025',
    excerpt: 'Comprehensive field guide to optimizing Google Core Web Vitals. Master Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) for peak SEO.',
    author: 'WebZoneBW Editorial Team',
    date: '2025-07-20',
    readTime: '12 min read',
    category: 'Performance',
    tags: ['Core Web Vitals', 'LCP', 'INP', 'CLS', 'Optimization'],
    content: [
      {
        heading: 'The Search Ranking Reality: Google Scores Real User Experience',
        text: 'Google Core Web Vitals are not synthetic lab benchmarks measured on high-end developer MacBooks. They are real-world metrics collected from Chrome users worldwide via the Chrome User Experience Report (CrUX). Websites that pass Core Web Vitals thresholds receive a direct search ranking boost and experience substantially lower bounce rates.',
      },
      {
        heading: 'The 3 Core Web Vitals Metrics Defined',
        text: 'Google evaluates three distinct facets of user experience: loading speed, visual stability, and interactive responsiveness.',
        table: {
          headers: ['Metric', 'Measurement Focus', 'Good Threshold', 'Needs Work', 'Poor'],
          rows: [
            ['LCP (Largest Contentful Paint)', 'Loading Speed (When does the main hero banner/heading appear?)', 'Under 2.5 seconds', '2.5s - 4.0s', 'Over 4.0 seconds'],
            ['INP (Interaction to Next Paint)', 'Interactive Responsiveness (Latency of user clicks/taps/keys)', 'Under 200 milliseconds', '200ms - 500ms', 'Over 500 milliseconds'],
            ['CLS (Cumulative Layout Shift)', 'Visual Stability (Does content jump unexpectedly while loading?)', 'Under 0.1', '0.1 - 0.25', 'Over 0.25'],
          ],
        },
      },
      {
        heading: 'Crushing Largest Contentful Paint (LCP)',
        text: 'In 80% of websites, the LCP element is a hero image or promotional banner. To accelerate LCP, pre-connect to the image CDN, preload the image resource, and ensure it is not lazy-loaded.',
        code: {
          language: 'html',
          code: '<!-- 1. Preload the LCP Hero Image in document <head> -->\n<link\n  rel="preload"\n  as="image"\n  href="/images/hero-banner.webp"\n  fetchpriority="high"\n  type="image/webp"\n/>\n\n<!-- 2. Inside <body>: Never lazy load the LCP image! -->\n<img\n  src="/images/hero-banner.webp"\n  alt="WebZoneBW Learning Platform"\n  width="1200"\n  height="630"\n  fetchpriority="high" /* Elevates network priority in browser pipeline */\n  decoding="async"\n/>',
        },
        callout: {
          type: 'warning',
          title: 'The loading="lazy" Disaster on LCP Images',
          text: 'Placing loading="lazy" on your above-the-fold hero image is one of the worst performance mistakes in web development. It forces the browser to wait until layout geometry completes before initiating the image download, delaying LCP by up to 2 full seconds!',
        },
      },
      {
        heading: 'Pause & Check: Interaction to Next Paint (INP) Deep Dive',
        text: 'INP replaced FID (First Input Delay) as the authoritative responsiveness metric. Why is INP significantly more rigorous than FID?',
        checkpoint: {
          question: 'What is the fundamental difference between FID and INP, and why does INP measure the ENTIRE user journey instead of just the first click?',
          answer: 'FID only measured the initial delay before the browser began executing the first click event handler on page load. INP measures ALL interactions (clicks, taps, keystrokes) across the entire session lifecycle, and measures the entire duration until the browser ACTUALLY paints the resulting visual update on screen. A single long JavaScript task that freezes the UI anywhere in the session can ruin your INP score.',
          hint: 'Think about input delay vs. processing time vs. presentation delay.',
        },
      },
      {
        heading: 'Eliminating Cumulative Layout Shift (CLS)',
        text: 'CLS occurs when images, ad banners, or web fonts load dynamically and push existing page content downward while a user is reading or trying to click a button.',
        code: {
          language: 'css',
          code: '/* Reserve space in CSS to guarantee ZERO layout shift */\n.hero-media-wrapper {\n  aspect-ratio: 16 / 9; /* Reserves exact bounding box before image loads */\n  width: 100%;\n  background-color: var(--app-inset);\n}\n\n/* Always specify width & height attributes on <img> tags */\nimg {\n  max-width: 100%;\n  height: auto;\n}',
        },
        internalLink: {
          label: 'Run Core Web Vitals Audit',
          target: 'webtools',
          description: 'Measure your simulated LCP, INP, and CLS scores live in WebZoneBW Performance Tools.',
        },
      },
      {
        heading: 'Key Takeaways: 2025 Performance Engineering',
        text: 'Core Web Vitals align technical engineering directly with business outcomes. Fast, stable pages rank higher, retain users, and convert more effectively.',
        list: [
          'Preload the LCP hero image with fetchpriority="high" and never lazy-load above-the-fold assets.',
          'Break up long JavaScript tasks (>50ms) to keep INP well below 200ms.',
          'Always declare explicit width, height, or aspect-ratio on images and ad containers to keep CLS under 0.1.',
        ],
      },
    ],
  },
  {
    id: 'blog-024',
    slug: 'web-font-optimization-guide',
    title: 'Optimizing Web Fonts: Eliminating FOUT, FOIT, Font-Display Swap, and WOFF2 Subsetting',
    excerpt: 'Eliminate font flash and layout shifts. Master font-display: swap, WOFF2 compression, unicode-range glyph subsetting, and preload hints for instant typographic rendering.',
    author: 'WebZoneBW Editorial Team',
    date: '2025-09-24',
    readTime: '8 min read',
    category: 'Performance',
    tags: ['Typography', 'Web Fonts', 'Performance', 'WOFF2', 'Core Web Vitals'],
    content: [
      {
        heading: 'The Font Penalty: Invisible Text and Layout Shifting',
        text: 'Custom typography gives websites their distinct aesthetic identity. However, when loaded improperly, web fonts create two severe user experience defects: FOIT (Flash of Invisible Text), where text remains totally hidden while a heavy font binary downloads, and FOUT (Flash of Unstyled Text), where text pops jarringly and shifts the page layout when the custom font swaps in over a generic system font. Mastering web font delivery eliminates both issues.',
      },
      {
        heading: 'The font-display Property Demystified',
        text: 'CSS font-display dictates how the browser text rendering engine behaves while waiting for custom web fonts to download.',
        table: {
          headers: ['font-display Value', 'Block Period (Hidden Text)', 'Swap Period (System Fallback)', 'Recommended For'],
          rows: [
            ['swap', '0ms (Zero delay! System font renders instantly)', 'Infinite (Swaps custom font as soon as it arrives)', 'Body text, articles, primary readable content (Eliminates FOIT)'],
            ['optional', '100ms (Very short invisible window)', '0ms (Only uses custom font if already in local cache)', 'Slow mobile networks, non-critical decorative accents'],
            ['block', '3000ms (Text remains invisible up to 3 full seconds!)', 'Infinite', 'Icon fonts where system fallbacks look completely broken'],
            ['fallback', '100ms', '3000ms (Swaps only if download finishes within 3s)', 'Secondary subheadings'],
          ],
        },
      },
      {
        heading: 'Subsetting with WOFF2: Cutting Font Payload by 80%',
        text: 'A full Unicode font file contains glyphs for Cyrillic, Greek, Arabic, and thousands of obscure typographic symbols, easily weighing 500KB+. By subsetting the font to Latin-only characters using unicode-range, you reduce the file size to under 25KB in the modern WOFF2 format.',
        code: {
          language: 'css',
          code: '@font-face {\n  font-family: "Geist Sans";\n  font-style: normal;\n  font-weight: 400 700; /* Variable font weight range */\n  font-display: swap;\n  src: url("/fonts/geist-sans-latin.woff2") format("woff2");\n  /* Latin & punctuation glyph subsetting */\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6;\n}',
        },
      },
      {
        heading: 'Pause & Check: Preload Hint Architecture',
        text: 'By default, the browser will not download a font until it has parsed the HTML, constructed the CSSOM, and discovered a visible DOM node that actively uses that font-family.',
        checkpoint: {
          question: 'How do you instruct the browser to initiate the font download immediately in the initial network waterfall without waiting for CSSOM evaluation?',
          answer: 'Add a <link rel="preload"> tag in document <head> with as="font", type="font/woff2", and the crossorigin attribute: <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>. Note: the crossorigin attribute is MANDATORY even for self-hosted fonts, because font fetch requests follow the CORS specification.',
          hint: 'Fonts are requested via anonymous CORS mode in the browser engine.',
        },
      },
      {
        heading: 'Matching Fallback Metrics to Eliminate CLS',
        text: 'When a custom font swaps over a system fallback font, slight differences in x-height and letter-spacing cause text lines to reflow, triggering layout shift. Modern CSS provides font metric overrides to match system fonts to custom fonts perfectly.',
        code: {
          language: 'css',
          code: '/* Fallback font adjusted to match custom font geometry exactly */\n@font-face {\n  font-family: "FallbackArial";\n  src: local("Arial");\n  ascent-override: 95%;\n  descent-override: 25%;\n  line-gap-override: 0%;\n  size-adjust: 102%; /* Eliminates layout shift when swap occurs! */\n}\n\nbody {\n  font-family: "Geist Sans", "FallbackArial", sans-serif;\n}',
        },
        callout: {
          type: 'tip',
          title: 'Prefer Self-Hosting Over Third-Party CDNs',
          text: 'Self-hosting your fonts on the same domain as your web application eliminates the DNS lookup, TLS handshake, and connection latency of external font providers like Google Fonts, while complying with GDPR privacy standards.',
        },
        internalLink: {
          label: 'Test Typography in Box Model Studio',
          target: 'visual-lab',
          description: 'Visualize font line-height, padding, and layout metrics live inside WebZoneBW VisualLab.',
        },
      },
      {
        heading: 'Key Takeaways: High-Speed Web Typography',
        text: 'Typographic excellence does not have to compromise web performance. With WOFF2 subsetting, font-display: swap, and preload hints, your fonts render instantaneously.',
        list: [
          'Convert all font assets to WOFF2 format with Latin unicode-range subsetting.',
          'Always declare font-display: swap on primary reading fonts.',
          'Preload the primary regular font weight in document <head> with crossorigin.',
        ],
      },
    ],
  },
  {
    id: 'blog-025',
    slug: 'http2-http3-network-protocols',
    title: 'HTTP/2, HTTP/3, and Modern Network Protocols Explained for Web Developers',
    excerpt: 'Understand how modern internet protocols transfer your web assets. Learn multiplexing, header compression (HPACK/QPACK), QUIC UDP transport, and connection latency reduction.',
    author: 'WebZoneBW Editorial Team',
    date: '2025-09-25',
    readTime: '10 min read',
    category: 'Networking',
    tags: ['HTTP/3', 'HTTP/2', 'Networking', 'QUIC', 'Web Performance'],
    content: [
      {
        heading: 'The Transport Bottleneck: How Network Protocols Dictate Web Speed',
        text: 'You can compress your JavaScript, optimize your images, and minify your CSS, but if your networking protocol serializes requests or stalls when a single packet drops on a cellular tower, your application will feel sluggish. Understanding the evolution from HTTP/1.1 to HTTP/2 and modern HTTP/3 with QUIC transforms how frontend engineers architect asset delivery, bundling, and caching strategies.',
      },
      {
        heading: 'The Protocol Evolution: HTTP/1.1 vs. HTTP/2 vs. HTTP/3',
        text: 'Each major version of HTTP resolved fundamental architectural constraints of the underlying transport layer.',
        table: {
          headers: ['Protocol Version', 'Underlying Transport', 'Multiplexing Capabilities', 'Head-of-Line Blocking Solution', 'Handshake Latency'],
          rows: [
            ['HTTP/1.1 (1997)', 'TCP', 'None (1 request per TCP connection; max 6 connections per origin)', 'Severe (One slow request blocks subsequent requests on socket)', '1 RTT TCP + 1-2 RTT TLS = 2-3 roundtrips before first byte'],
            ['HTTP/2 (2015)', 'TCP', 'Binary framing streams multiplexed over 1 single TCP connection', 'Solved at HTTP layer; still vulnerable to TCP packet loss blocking', '1 RTT TCP + 1 RTT TLS = 2 roundtrips'],
            ['HTTP/3 (2022)', 'QUIC over UDP', 'Full stream multiplexing with independent packet streams', '100% SOLVED. Dropped packet on Stream A does NOT stall Stream B!', '0-RTT to 1-RTT connection setup; instant handshakes'],
          ],
        },
      },
      {
        heading: 'How HTTP/2 Multiplexing Changed Frontend Bundling',
        text: 'In the HTTP/1.1 era, browsers could only open 6 concurrent TCP connections per domain. To avoid serialized waiting, frontend developers created giant bundles ("bundle.js"), sprited hundreds of icons into a single PNG, and domain-sharded assets across cdn1.example.com and cdn2.example.com. HTTP/2 eliminated the need for these brittle anti-patterns by multiplexing hundreds of bidirectional requests and responses over a single connection.',
        code: {
          language: 'bash',
          code: '# Inspect HTTP/2 framing and ALPN negotiation via curl\ncurl -I --http2 -s https://webzonebw.shop | grep -i "HTTP/"\n# Output: HTTP/2 200 OK\n\n# Modern browsers negotiate HTTP/3 via Alt-Svc response header:\n# Alt-Svc: h3=":443"; ma=86400',
        },
      },
      {
        heading: 'Pause & Check: TCP Head-of-Line Blocking in HTTP/2',
        text: 'Why did the IETF invent HTTP/3 over UDP when HTTP/2 already provided multiplexing over TCP?',
        checkpoint: {
          question: 'If a user on a train enters a tunnel and loses 1 single network packet, why does HTTP/2 stall all 50 concurrent asset streams, while HTTP/3 continues smoothly?',
          answer: 'Because HTTP/2 relies on TCP. The TCP protocol guarantees byte-level in-order delivery. If packet #4 is dropped, the operating system TCP stack holds back all subsequent packets (#5, #6, #7) until packet #4 is retransmitted—stalling ALL multiplexed streams in HTTP/2! HTTP/3 runs on QUIC over UDP, where streams are completely independent: losing a packet on Stream A only pauses Stream A, while Streams B through Z continue streaming without interruption.',
          hint: 'TCP enforces strict sequential byte order across the entire connection.',
        },
      },
      {
        heading: 'QPACK Header Compression: Saving Mobile Bandwidth',
        text: 'HTTP requests carry large headers (User-Agent, Authorization cookies, Accept headers), often reaching 1KB per request. While HTTP/2 utilized HPACK, HTTP/3 introduces QPACK, allowing out-of-order header decompression that eliminates head-of-line blocking across stream headers.',
        callout: {
          type: 'tip',
          title: 'Enable HTTP/3 on Your CDN Today',
          text: 'Leading edge networks (Cloudflare, AWS CloudFront, Fastly) support HTTP/3 with a single toggle. Enabling HTTP/3 immediately slashes connection establishment times on mobile networks by up to 300 milliseconds.',
        },
        internalLink: {
          label: 'Inspect Network Requests in Web Tools',
          target: 'webtools',
          description: 'Analyze network request waterfalls and protocol timings in WebZoneBW Developer Tools.',
        },
      },
      {
        heading: 'Key Takeaways: Networking for Modern Frontend Engineers',
        text: 'Network protocol awareness shapes production bundling strategies. Stop bundling monolithic 5MB files; leverage HTTP/2 and HTTP/3 multiplexing for modular route code-splitting.',
        list: [
          'Leverage modern bundlers (Vite) that output granular ES module chunks tailored for multiplexing.',
          'Verify that your production hosting serves Alt-Svc headers to enable HTTP/3 QUIC transport.',
          'Retire legacy HTTP/1.1 hacks like domain sharding and CSS image sprite sheets.',
        ],
      },
    ],
  },
];
