# WebZoneBW

## Learn • Practice • Build • Share

---

## About

WebZoneBW is a developer learning platform designed to teach web development through structured lessons, visual explanations, hands-on coding exercises, and real-world projects.

The goal is to provide learners with a complete roadmap from beginner to professional developer while maintaining clean project organization and industry-standard development practices.

---

## Mission

To create a learning platform where every concept is:

- Easy to Understand
- Visually Explained
- Practiced Through Coding
- Applied in Real Projects

---

## Learning Philosophy

Read

↓

Understand

↓

Visualize

↓

Practice

↓

Build

↓

Repeat

---

## Course Roadmap

- Chapter 00 — Introduction
- Chapter 01 — Development Environment
- Chapter 02 — HTML
- Chapter 03 — CSS
- Chapter 04 — Flexbox
- Chapter 05 — CSS Grid
- Chapter 06 — JavaScript
- Chapter 07 — Responsive Design
- Chapter 08 — Bootstrap
- Chapter 09 — Git & GitHub
- Chapter 10 — Final Project

---

## Technologies

- HTML5
- CSS3
- JavaScript
- Bootstrap
- Git
- GitHub

Future Expansion:

- Python
- Linux
- Cloud
- Cybersecurity
- AI

---

## Developer

Sameer Chouhan

Version 1.0 Alpha

## Deployment

The frontend is deployed with GitHub Pages. The Express API can be self-hosted on an Ubuntu VPS; no Render service is required.

### GitHub Pages

Set the repository variable `VITE_API_URL` to the public API base URL, including `/api` (for example `https://api.example.com/api`). For a custom domain, leave `VITE_BASE` unset or set it to `/`. For a project subpath, set `VITE_BASE` to that path.

### Self-hosted API

Use an Ubuntu VPS with Node.js 20+, npm, SSH, rsync, and systemd. The Node entry point is `app.js`; it starts the bundled API from `dist/server.cjs`, generated from `server.ts` and the `server/` route modules by `npm run build`. Create a `webzonebw` service user and a separate SSH deployment account. Make `/opt/webzonebw` writable by the deployment account and readable by the `webzonebw` group; keep `/opt/webzonebw/data` owned by the service user so account and progress data survives deployments. Install `deploy/webzonebw-api.service` to `/etc/systemd/system/`, then run `sudo systemctl daemon-reload` and `sudo systemctl enable webzonebw-api`.

Create `/etc/webzonebw/webzonebw.env` with `PORT=3000`, `NODE_ENV=production`, `CORS_ORIGIN=https://webzonebw.shop`, and optionally `GEMINI_API_KEY`. Keep it owned by root, readable by the service group, and never copy it into the repository. Grant the SSH deployment account passwordless permission to restart only `webzonebw-api`.

Create a Gemini API key in Google AI Studio and place it only in the VPS environment file. Do not put the key in frontend variables, source code, or GitHub Pages. Without it, the tutor uses its built-in fallback mode.

After SSH access is configured for the `webzonebw` user and that user can restart `webzonebw-api` without an interactive sudo prompt, deploy from the repository root with:

```sh
VPS_HOST=your-vps-host VPS_USER=deploy ./deploy.sh
```

The deploy script builds the app, syncs files without overwriting `.env` or `/data`, installs production dependencies, and restarts the systemd service. Configure HTTPS and reverse proxy `/api` to the Node service before setting `VITE_API_URL`.