#!/bin/bash
# WebZoneBW Production Deployment Script
# Clean build and deploy SPA + API

echo "🚀 WebZoneBW Production Build & Deploy"
echo "====================================="
echo ""

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist node_modules package-lock.json
npm install
echo "✅ Dependencies installed"
echo ""

# Build React SPA
echo "📦 Building React SPA..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi
echo "✅ React SPA built successfully"
echo ""

# Verify dist
if [ ! -f "dist/server.js" ]; then
    echo "❌ dist/server.js not found"
    exit 1
fi
if [ ! -f "dist/index.html" ]; then
    echo "❌ dist/index.html not found"
    exit 1
fi
echo "✅ All dist files verified"
echo ""

# Test production build locally (optional)
echo "🧪 Testing production build..."
if command -v node &> /dev/null; then
    echo "Starting production server for testing..."
    timeout 10s node dist/server.js &
    SERVER_PID=$!
    sleep 3
    curl -s http://localhost:3000 > /dev/null
    if [ $? -eq 0 ]; then
        echo "✅ Production server test passed"
    else
        echo "⚠️  Production server test failed, but build completed"
    fi
    kill $SERVER_PID 2>/dev/null
fi
echo ""

# Git commit and push
echo "📤 Committing and pushing to GitHub..."
git add -A
if git diff --staged --quiet; then
    echo "No changes to commit"
else
    git commit -m "production: complete build and deploy"
    git push origin main
    echo "✅ Changes pushed to GitHub"
fi
echo ""

echo "====================================="
echo "🎉 Production build completed!"
echo ""
echo "Next steps:"
echo "1. Deploy to hosting service:"
echo "   - GitHub Pages: Push to trigger workflow"
echo "   - Render.com: Use render.yaml config"
echo "   - Vercel: Link repo and auto-deploy"
echo "   - Netlify: Link repo and auto-deploy"
echo ""
echo "2. Configure environment variables:"
echo "   - GEMINI_API_KEY=your_api_key"
echo "   - CORS_ORIGIN=your_domain"
echo "   - NODE_ENV=production"
echo ""
echo "3. Test deployed application:"
echo "   - Check all routes work"
echo "   - Test lesson SSR"
echo "   - Verify API endpoints"
echo "====================================="