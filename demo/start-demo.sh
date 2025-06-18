#!/bin/bash

echo "🚀 Starting AngularAI Demo..."
echo ""
echo "📦 Building all packages..."

# Build all packages first
cd ../
npm run build:core
npm run build:chatbot

echo ""
echo "🔨 Building demo application..."

# Build and start demo
cd demo
npm run build

echo ""
echo "🌐 Starting development server..."
echo ""
echo "✨ AngularAI Demo will be available at: http://localhost:4200"
echo "🔑 Don't forget to add your OpenAI API key to test AI features!"
echo ""

# Start the Angular development server
npx ng serve --port 4200 --host 0.0.0.0
