# WebZoneBW SC - Production Deployment Guide

## Quick Start

### 1. Local Build Test
```bash
# Test build locally
bash test-deploy.sh

# Full build and deploy
bash deploy.sh
```

### 2. GitHub Pages Deployment
- Push to main/master branch
- Automatic deployment via `.github/workflows/deploy.yml`
- URL: `https://your-username.github.io/your-repo/`

### 3. Render.com Deployment
```yaml
# Use render.yaml for automatic deployment
services:
  - type: web
    name: webzonebw-api
    runtime: node
    buildCommand: npm run build
    startCommand: node dist/server.js
    envVars:
      - key: NODE_ENV
        value: production
      - key: CORS_ORIGIN
        value: https://your-domain.com
      - key: GEMINI_API_KEY
        sync: false
```

### 4. Vercel Deployment
1. Link repo to Vercel
2. Add environment variables:
   - `NODE_ENV`: production
   - `CORS_ORIGIN`: https://your-domain.com
   - `GEMINI_API_KEY`: your_api_key

### 5. Netlify Deployment
1. Link repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables

## Environment Variables Required

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | production | ✅ |
| `CORS_ORIGIN` | Your domain URL | ✅ |
| `GEMINI_API_KEY` | Google AI API key | ❌ |

## Build Output

```
dist/
├── index.html          # SPA entry point
├── assets/             # Built CSS/JS assets
├── server.js           # Express server bundle
└── server.js.map       # Source maps
```

## Common Issues

### Build Failures
- **Missing dist files**: Run `npm run build` again
- **Node version**: Use Node 20.x
- **Permissions**: Ensure write access to dist/

### Runtime Issues
- **CORS errors**: Set `CORS_ORIGIN` correctly
- **AI API errors**: Check `GEMINI_API_KEY`
- **Port conflicts**: Ensure port 3000 is available

### Deployment Issues
- **GitHub Pages**: Check repo settings → Pages → Source
- **Render.com: Verify environment variables in dashboard
- **Vercel/Netlify**: Ensure build command and directory settings

## Monitoring

### Health Checks
- API: `GET /api/health`
- SPA: Load main page and check routes

### Logs
- Render.com: Check service logs in dashboard
- GitHub Pages: Check deployment logs
- Local: `npm run dev` for development logs

## Security Notes

1. **API Keys**: Never commit `GEMINI_API_KEY` to repo
2. **CORS**: Always set `CORS_ORIGIN` to your actual domain
3. **Environment**: Use `NODE_ENV=production` in production

## Rollback

If deployment fails:
1. Check GitHub Actions logs
2. Revert git commit: `git revert <commit-hash>`
3. Push to trigger redeploy
4. For Render.com: Redeploy via dashboard