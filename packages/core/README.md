# @neurodevworks/chatbot-core

[![npm version](https://badge.fury.io/js/%40neurodevworks%2Fchatbot-core.svg)](https://www.npmjs.com/package/@neurodevworks/chatbot-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Core AI client services and utilities for chatbot functionality in Angular applications.

## 🚀 Features

- **Multi-AI Provider Support**: OpenAI, Claude, Gemini, and more
- **Streaming Responses**: Real-time token streaming with RxJS observables
- **TypeScript First**: Full type safety and IntelliSense support
- **Reactive Architecture**: Built with RxJS for reactive programming
- **Error Handling**: Comprehensive error handling and retry logic
- **Configurable**: Flexible configuration options for different AI providers

## 📦 Installation

```bash
npm install @neurodevworks/chatbot-core
```

## 🛠️ Quick Start

### Basic Usage

```typescript
import { AIClientService } from '@neurodevworks/chatbot-core';

// Initialize the service
const aiClient = new AIClientService();

// Configure with OpenAI
aiClient.initialize({
  provider: 'openai',
  apiKey: 'your-openai-api-key',
  model: 'gpt-3.5-turbo'
});

// Send a message
const response = await aiClient.sendMessage('Hello, AI!');
console.log(response);
```

### Streaming Responses

```typescript
// Send streaming message
await aiClient.sendStreamingMessage('Tell me a story');

// Subscribe to token stream
aiClient.tokenStream$.subscribe(token => {
  console.log('New token:', token);
});

// Subscribe to completion
aiClient.responseComplete$.subscribe(fullResponse => {
  console.log('Complete response:', fullResponse);
});
```

### Angular Integration

```typescript
import { Injectable } from '@angular/core';
import { AIClientService, AIClientOptions } from '@neurodevworks/chatbot-core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private aiClient: AIClientService) {}

  async initializeChat(apiKey: string) {
    const options: AIClientOptions = {
      provider: 'openai',
      apiKey,
      model: 'gpt-3.5-turbo'
    };
    
    this.aiClient.initialize(options);
  }

  async sendMessage(message: string) {
    return await this.aiClient.sendMessage(message, {
      temperature: 0.7,
      maxTokens: 1000
    });
  }
}
```

## 🎯 API Reference

### AIClientService

#### Methods

- `initialize(options: AIClientOptions): void` - Initialize the AI client
- `sendMessage(message: string, options?: MessageOptions): Promise<string>` - Send a message
- `sendStreamingMessage(message: string, options?: MessageOptions): Promise<void>` - Send streaming message
- `clearMessages(): void` - Clear message history
- `isInitialized: boolean` - Check if client is initialized

#### Observables

- `tokenStream$: Observable<string>` - Stream of tokens during response generation
- `responseComplete$: Observable<string>` - Complete response when generation finishes

### Types

```typescript
interface AIClientOptions {
  provider: 'openai' | 'claude' | 'gemini';
  apiKey: string;
  model: string;
  baseUrl?: string;
}

interface MessageOptions {
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}
```

## 🔧 Configuration

### OpenAI Configuration

```typescript
const options: AIClientOptions = {
  provider: 'openai',
  apiKey: 'sk-...',
  model: 'gpt-3.5-turbo' // or 'gpt-4'
};
```

### Claude Configuration

```typescript
const options: AIClientOptions = {
  provider: 'claude',
  apiKey: 'sk-ant-...',
  model: 'claude-3-sonnet-20240229'
};
```

### Gemini Configuration

```typescript
const options: AIClientOptions = {
  provider: 'gemini',
  apiKey: 'AI...',
  model: 'gemini-pro'
};
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/NeuroDevWorks/angular-chatbot-ai/blob/main/CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/NeuroDevWorks/angular-chatbot-ai/blob/main/LICENSE) file for details.

## 🔗 Related Packages

- [@neurodevworks/angular-chatbot](https://www.npmjs.com/package/@neurodevworks/angular-chatbot) - Angular UI components
- [Angular Chatbot AI](https://github.com/NeuroDevWorks/angular-chatbot-ai) - Complete monorepo

## 👨‍💻 Author

**Manoj Kumar**
- Email: manojkumar.smgr@gmail.com
- GitHub: [@neurodevworks](https://github.com/neurodevworks)
- NPM: [@neurodevworks](https://www.npmjs.com/~neurodevworks)

---

Made with ❤️ by [NeuroDevWorks](https://github.com/NeuroDevWorks)
