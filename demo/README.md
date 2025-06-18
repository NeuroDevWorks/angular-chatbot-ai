# 🤖 Angular Chatbot AI Demo

**Interactive Showcase of Advanced Conversational AI Components**

Experience the power of next-generation chatbot technology built specifically for Angular applications. This demo showcases intelligent conversation capabilities with multiple AI providers.

## 🌟 Demo Features

### 💬 Intelligent Chatbot
- **Multi-Provider AI**: OpenAI GPT, Claude, Gemini integration
- **Real-time Streaming**: Live response generation with typing indicators
- **Voice Interaction**: Speech-to-text and text-to-speech capabilities
- **File Upload Support**: Image analysis and document processing
- **Conversation Memory**: Context-aware multi-turn conversations
- **Custom Themes**: Modern, gradient, dark, and corporate designs

### 🎨 UI/UX Showcase
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Smooth Animations**: Fluid transitions and micro-interactions
- **Accessibility**: WCAG compliant with keyboard navigation
- **Theme Switching**: Live theme customization demo

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Angular CLI 16+
- Modern web browser

### Installation & Setup

1. **Clone and install:**
```bash
git clone https://github.com/NeuroDevWorks/angular-chatbot-ai.git
cd angular-chatbot-ai/demo
npm install
```

2. **Start the demo:**
```bash
npm start
```

3. **Open in browser:**
Navigate to `http://localhost:8080`

## 🔧 Configuration

### API Key Setup
1. Get your API key from your preferred AI provider
2. Enter it in the demo's configuration panel
3. Start chatting with the AI assistant

### Supported Providers
- **OpenAI**: GPT-3.5, GPT-4, GPT-4 Turbo
- **Anthropic**: Claude 3 Haiku, Sonnet, Opus
- **Google**: Gemini Pro, Gemini Pro Vision





## 🔧 Configuration

### API Keys
The demo requires API keys for AI providers. You can set them in the demo interface or via environment variables:

- `OPENAI_API_KEY` - OpenAI API key
- `CLAUDE_API_KEY` - Anthropic Claude API key
- `GEMINI_API_KEY` - Google Gemini API key

### Environment Variables
Create a `.env` file in the demo directory:

```env
OPENAI_API_KEY=your_openai_key_here
CLAUDE_API_KEY=your_claude_key_here
GEMINI_API_KEY=your_gemini_key_here
```

## 📦 Available Scripts

- `npm start` - Start development server on port 8080
- `npm run build` - Build for production
- `npm run build:prod` - Build for production with optimizations
- `npm test` - Run unit tests
- `npm run lint` - Run ESLint

## 🎨 Customization

### Themes
The demo supports multiple themes:
- Light theme (default)
- Dark theme
- Auto theme (follows system preference)

### Component Options
Each component can be customized with various options:
- Styling and theming
- Behavior configuration
- AI model selection
- Provider settings

## 🌐 Deployment

### Build for Production
```bash
npm run build:prod
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build:prod
netlify deploy --prod --dir=dist
```

## 📚 Documentation

For detailed documentation on each component, visit:
- [Angular Chatbot AI Documentation](https://github.com/NeuroDevWorks/angular-chatbot-ai/wiki)
- [Component API Reference](https://github.com/NeuroDevWorks/angular-chatbot-ai/tree/main/packages)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](../CONTRIBUTING.md) for details.

## 📄 License

MIT © [Manoj Kumar](https://github.com/neurodevworks)

---

**Built with ❤️ for the Angular community**
