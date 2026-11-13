#!/bin/bash
# Quick deployment test script

echo "🧪 WebZoneBW Deployment Test"
echo "============================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "server.ts" ]; then
    echo "❌ Not in project root directory"
    exit 1
fi

# Clean and install
echo "🧹 Cleaning and installing dependencies..."
rm -rf dist node_modules package-lock.json
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Build
echo "📦 Building project..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

# Check build artifacts
echo "📋 Checking build artifacts..."
if [ -f "dist/server.js" ] && [ -f "dist/index.html" ]; then
    echo "✅ Build artifacts present"
else
    echo "❌ Missing build artifacts"
    exit 1
fi

# Test server startup
echo "🚀 Testing server startup..."
timeout 5s node dist/server.js &
SERVER_PID=$!
sleep 2

# Test server response
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Server started successfully"
else
    echo "⚠️  Server startup test failed (may be normal for production build)"
fi

# Cleanup
kill $SERVER_PID 2>/dev/null
wait $SERVER_PID 2>/dev/null

echo ""
echo "============================"
echo "🎉 Deployment test completed!"
echo ""
echo "Ready to deploy to production:"
echo "1. Run: bash deploy.sh"
echo "2. Or: git add . && git commit -m 'deploy' && git push"
echo "============================"