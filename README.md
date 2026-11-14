# Zero-to-Website

Zero-to-Website is WebZoneBW's learning platform for web development. It combines structured courses, lessons, a Blog, Live Code, student accounts, Storehouse, and creator publishing tools.

## Project structure

- `src/` — React and TypeScript application, feature views, styles, course data, and Blog content.
- `server.ts` and `server/` — Express application, API routes, authentication, payments, publishing, and file-backed data stores.
- `public/` — static assets and the web app manifest.
- Root HTML files — Vite entry points for the main app and standalone informational pages.
- `dist/` — generated build output. Do not edit it directly; it is recreated by the build.

The server currently stores several records in JSON files under `server/`. Preserve these files and review them carefully before sharing or committing changes. The Render configuration does not declare a persistent disk; confirm production storage and backup arrangements before relying on local JSON files for durable user data.

## Requirements

Use the Node.js version listed in `.node-version`. `package.json` also constrains the supported Node.js range.

## Run locally

```sh
npm ci
npm run dev
```

The local app listens on `http://localhost:3000` by default. Use these commands to check types and create a production build:

```sh
npm run lint
npm run build
npm start
```

`npm start` serves the production build and requires `npm run build` first. Optional environment variables are listed in `.env.example`; keep real credentials in the hosting provider's secret settings, never in source control.

## Deployment

The repository's hosting configuration is `render.yaml`. Read [DEPLOYMENT.md](DEPLOYMENT.md) before changing hosting or production settings. The GitHub Actions workflow validates the build; it does not deploy the application.

## Maintainer

Sameer Chouhan / WebZoneBW
