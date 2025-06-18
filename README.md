# Angular Chatbot AI 🤖

[![npm version](https://badge.fury.io/js/%40neurodevworks%2Fchatbot-core.svg)](https://www.npmjs.com/package/@neurodevworks/chatbot-core)
[![npm version](https://badge.fury.io/js/%40neurodevworks%2Fangular-chatbot.svg)](https://www.npmjs.com/package/@neurodevworks/angular-chatbot)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Advanced AI chatbot components for Angular applications with multi-provider support, streaming responses, and beautiful UI designs.

## 🚀 Features

- **Multi-AI Provider Support**: OpenAI, Claude, Gemini, and more
- **Real-time Streaming**: Live typing indicators and streaming responses
- **Beautiful UI**: Material Design components with customizable themes
- **TypeScript First**: Full type safety and IntelliSense support
- **Production Ready**: Optimized for performance and scalability
- **Easy Integration**: Simple setup with comprehensive documentation

## 📦 Packages

This monorepo contains the following packages:

### [@neurodevworks/chatbot-core](https://www.npmjs.com/package/@neurodevworks/chatbot-core)
Core AI client services and utilities for chatbot functionality.

### [@neurodevworks/angular-chatbot](https://www.npmjs.com/package/@neurodevworks/angular-chatbot)
Angular components and services for building chatbot interfaces.

## 🎮 Live Demo

Experience the chatbot in action with real AI responses!

```bash
# Clone and run the demo
git clone https://github.com/NeuroDevWorks/angular-chatbot-ai.git
cd angular-chatbot-ai
npm install
npm run demo
```

Visit `http://localhost:8080` to see the interactive demo.

## 🛠️ Quick Start

### Installation

```bash
npm install @neurodevworks/chatbot-core @neurodevworks/angular-chatbot
```

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { ChatbotComponent } from '@neurodevworks/angular-chatbot';
import { AIClientService } from '@neurodevworks/chatbot-core';

@Component({
  selector: 'app-chat',
  template: `
    <ai-chatbot
      [config]="chatConfig"
      [options]="chatOptions">
    </ai-chatbot>
  `,
  imports: [ChatbotComponent]
})
export class ChatComponent {
  chatConfig = {
    apiKey: 'your-openai-api-key',
    provider: 'openai',
    model: 'gpt-3.5-turbo'
  };

  chatOptions = {
    title: 'AI Assistant',
    placeholder: 'Ask me anything...',
    streaming: true,
    showAvatars: true
  };
}
```

## 🎯 Key Features

### Multi-Provider Support
- **OpenAI**: GPT-3.5, GPT-4, and latest models
- **Anthropic**: Claude 3 Sonnet, Haiku, and Opus
- **Google**: Gemini Pro and Ultra models
- **Custom Providers**: Easy integration with any AI API

### Advanced UI Components
- **Streaming Responses**: Real-time message updates
- **Message History**: Persistent conversation management
- **Typing Indicators**: Visual feedback during AI processing
- **File Upload**: Support for document and image uploads
- **Voice Input**: Speech-to-text integration
- **Theme Support**: Light, dark, and custom themes

### Developer Experience
- **TypeScript**: Full type safety and autocompletion
- **Angular 18+**: Latest Angular features and optimizations
- **Reactive**: RxJS-based reactive programming
- **Testing**: Comprehensive test coverage
- **Documentation**: Detailed API documentation

## 🏗️ Development

### Prerequisites
- Node.js 18+
- npm 9+
- Angular CLI 18+

### Setup
```bash
# Clone the repository
git clone https://github.com/NeuroDevWorks/angular-chatbot-ai.git
cd angular-chatbot-ai

# Install dependencies
npm install

# Build packages
npm run build

# Start demo
npm run demo
```

### Project Structure
```
angular-chatbot-ai/
├── packages/
│   ├── core/                 # Core AI services
│   └── chatbot/             # Angular components
├── demo/                    # Interactive demo app
└── scripts/                 # Build and deployment scripts
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Manoj Kumar**
- Email: manojkumar.smgr@gmail.com
- GitHub: [@neurodevworks](https://github.com/neurodevworks)
- NPM: [@neurodevworks](https://www.npmjs.com/~neurodevworks)

## 🙏 Acknowledgments

- Angular team for the amazing framework
- OpenAI for the powerful AI models
- Material Design for the beautiful UI components
- The open-source community for inspiration and support

---

Made with ❤️ by [NeuroDevWorks](https://github.com/NeuroDevWorks)