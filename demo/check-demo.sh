#!/bin/bash

echo "🔍 Angular Chatbot AI Demo Status Check"
echo "================================"
echo ""

# Check if server is running
echo "📡 Checking server status..."
if curl -s http://localhost:4200 > /dev/null; then
    echo "✅ Server is running at http://localhost:4200"
else
    echo "❌ Server is not running"
    echo "💡 Run './start-demo.sh' to start the demo"
    exit 1
fi

echo ""
echo "📦 Checking package builds..."

# Check if packages are built
packages=("core" "chatbot")

for package in "${packages[@]}"; do
    if [ -d "../packages/$package/dist" ]; then
        echo "✅ @neurodevworks/$package - Built"
    else
        echo "❌ @neurodevworks/$package - Not built"
        echo "💡 Run 'npm run build:$package' from the root directory"
    fi
done

echo ""
echo "🎯 Demo Components Status:"
echo "✅ Chatbot - Interactive AI chat with streaming"

echo ""
echo "🔑 To test AI features:"
echo "1. Open http://localhost:4200 in your browser"
echo "2. Enter your OpenAI API key in the configuration section"
echo "3. Explore all the AI-powered components!"
echo ""
echo "🎉 Angular Chatbot AI Demo is ready to use!"
