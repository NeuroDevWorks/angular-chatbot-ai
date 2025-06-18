#!/bin/bash

# Angular Chatbot AI Demo Test Script
echo "🚀 Testing Angular Chatbot AI Demo Setup..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the angular-chatbot-ai root directory."
    exit 1
fi

# Check Node.js version
echo "📋 Checking Node.js version..."
node_version=$(node -v)
echo "Node.js version: $node_version"

# Check npm version
echo "📋 Checking npm version..."
npm_version=$(npm -v)
echo "npm version: $npm_version"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if demo directory exists
if [ ! -d "demo" ]; then
    echo "❌ Error: demo directory not found."
    exit 1
fi

# Navigate to demo directory
cd demo

# Install demo dependencies
echo "📦 Installing demo dependencies..."
npm install

# Check if Angular CLI is available
if ! command -v ng &> /dev/null; then
    echo "⚠️  Angular CLI not found globally. Installing locally..."
    npm install -g @angular/cli
fi

# Try to build the demo
echo "🔨 Building demo..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Demo build successful!"
    echo ""
    echo "🎉 Angular Chatbot AI Demo is ready!"
    echo ""
    echo "To start the demo:"
    echo "  cd demo"
    echo "  npm start"
    echo ""
    echo "Then open http://localhost:8080 in your browser"
else
    echo "❌ Demo build failed. Please check the errors above."
    exit 1
fi
