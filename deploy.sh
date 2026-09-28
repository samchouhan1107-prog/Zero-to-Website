#!/bin/bash
# WebZoneBW Backend Deployment Script
# Deploys the Express API to Render.com via GitHub

echo "🚀 WebZoneBW Backend Deployment"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -f "server.ts" ]; then
  echo "❌ Run this script from the project root"
  exit 1
fi

# Step 1: Build
echo "📦 Building project..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi
echo "✅ Build successful"
echo ""

# Step 2: Verify dist
if [ ! -f "dist/server.cjs" ]; then
  echo "❌ dist/server.cjs not found"
  exit 1
fi
echo "✅ dist/server.cjs ready"
echo ""

# Step 3: Git push
echo "📤 Pushing to GitHub..."
git add -A
git commit -m "deploy: backend ready for Render" || echo "No changes to commit"
git push origin main
echo "✅ Pushed to GitHub"
echo ""

# Step 4: Instructions
echo "================================"
echo "📋 DEPLOYMENT STEPS:"
echo ""
echo "1. Go to https://dashboard.render.com"
echo "2. Click 'New +' → 'Web Service'"
echo "3. Connect your GitHub repo: samchouhan1107-prog/Zero-to-Website"
echo "4. Settings:"
echo "   - Name: webzonebw-api"
echo "   - Runtime: Node"
echo "   - Build: npm run build"
echo "   - Start: node dist/server.cjs"
echo "5. Add environment variables:"
echo "   NODE_ENV=production"
echo "   CORS_ORIGIN=https://webzonebw.shop"
echo "6. Click 'Create Web Service'"
echo ""
echo "7. Once deployed, get your API URL (e.g. https://webzonebw-api.onrender.com)"
echo "8. Then rebuild frontend with:"
echo "   VITE_API_URL=https://webzonebw-api.onrender.com/api npm run build"
echo "9. Push updated dist to GitHub for GitHub Pages"
echo "================================"
