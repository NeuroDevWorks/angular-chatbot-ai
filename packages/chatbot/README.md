# @neurodevworks/angular-chatbot

[![npm version](https://badge.fury.io/js/%40neurodevworks%2Fangular-chatbot.svg)](https://www.npmjs.com/package/@neurodevworks/angular-chatbot)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Advanced AI chatbot components for Angular applications with beautiful UI and real-time streaming.

## 🚀 Features

- **Ready-to-Use Components**: Drop-in chatbot components for Angular
- **Beautiful UI**: Material Design with customizable themes
- **Real-time Streaming**: Live typing indicators and streaming responses
- **Multi-AI Support**: Works with OpenAI, Claude, Gemini, and more
- **TypeScript First**: Full type safety and IntelliSense support
- **Responsive Design**: Mobile-first responsive layout
- **Customizable**: Extensive theming and configuration options

## 📦 Installation

```bash
npm install @neurodevworks/angular-chatbot @neurodevworks/chatbot-core
```

## 🛠️ Quick Start

### 1. Import the Module

```typescript
import { Component } from '@angular/core';
import { ChatbotComponent } from '@neurodevworks/angular-chatbot';

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

### 2. Add Styles (Optional)

```scss
// In your global styles or component styles
@import '@neurodevworks/angular-chatbot/themes/default';

// Or customize the theme
.ai-chatbot {
  --chatbot-primary-color: #004879;
  --chatbot-secondary-color: #F7931E;
  --chatbot-background-color: #ffffff;
  --chatbot-text-color: #2C2E2F;
}
```

## 🎯 Components

### ChatbotComponent

The main chatbot component with full chat interface.

```typescript
<ai-chatbot 
  [config]="chatConfig"
  [options]="chatOptions"
  (messageReceived)="onMessageReceived($event)"
  (messageSent)="onMessageSent($event)">
</ai-chatbot>
```

#### Inputs

- `config: ChatConfig` - AI service configuration
- `options: ChatOptions` - UI and behavior options

#### Outputs

- `messageReceived: EventEmitter<Message>` - Emitted when AI responds
- `messageSent: EventEmitter<Message>` - Emitted when user sends message

### MessageComponent

Individual message component for custom layouts.

```typescript
<ai-message 
  [message]="message"
  [showAvatar]="true"
  [theme]="'light'">
</ai-message>
```

### InputComponent

Chat input component for custom interfaces.

```typescript
<ai-chat-input 
  [placeholder]="'Type your message...'"
  [disabled]="isLoading"
  (messageSent)="onMessageSent($event)">
</ai-chat-input>
```

## ⚙️ Configuration

### ChatConfig

```typescript
interface ChatConfig {
  apiKey: string;
  provider: 'openai' | 'claude' | 'gemini';
  model: string;
  baseUrl?: string;
}
```

### ChatOptions

```typescript
interface ChatOptions {
  title?: string;
  placeholder?: string;
  theme?: 'light' | 'dark' | 'auto';
  showAvatars?: boolean;
  streaming?: boolean;
  fullHeight?: boolean;
  autoScroll?: boolean;
  markdown?: boolean;
  systemPrompt?: string;
}
```

## 🎨 Theming

### Built-in Themes

```typescript
// Light theme (default)
chatOptions = { theme: 'light' };

// Dark theme
chatOptions = { theme: 'dark' };

// Auto theme (follows system preference)
chatOptions = { theme: 'auto' };
```

### Custom Themes

```scss
.ai-chatbot.custom-theme {
  --chatbot-primary-color: #your-primary-color;
  --chatbot-secondary-color: #your-secondary-color;
  --chatbot-background-color: #your-background-color;
  --chatbot-text-color: #your-text-color;
  --chatbot-border-color: #your-border-color;
  --chatbot-shadow-color: rgba(0, 0, 0, 0.1);
}
```

## 🔧 Advanced Usage

### Custom Message Handling

```typescript
export class ChatComponent {
  onMessageReceived(message: Message) {
    console.log('AI responded:', message);
    // Custom logic for AI responses
  }

  onMessageSent(message: Message) {
    console.log('User sent:', message);
    // Custom logic for user messages
  }
}
```

### Streaming Configuration

```typescript
chatOptions = {
  streaming: true,
  showTypingIndicator: true,
  streamingDelay: 50 // milliseconds between tokens
};
```

### File Upload Support

```typescript
chatOptions = {
  enableFileUpload: true,
  acceptedFileTypes: ['.pdf', '.txt', '.doc'],
  maxFileSize: 10 * 1024 * 1024 // 10MB
};
```

## 📱 Responsive Design

The chatbot components are fully responsive and work great on:

- **Desktop**: Full-featured interface with all options
- **Tablet**: Optimized layout for touch interaction
- **Mobile**: Compact interface with essential features

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/NeuroDevWorks/angular-chatbot-ai/blob/main/CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/NeuroDevWorks/angular-chatbot-ai/blob/main/LICENSE) file for details.

## 🔗 Related Packages

- [@neurodevworks/chatbot-core](https://www.npmjs.com/package/@neurodevworks/chatbot-core) - Core AI services
- [Angular Chatbot AI](https://github.com/NeuroDevWorks/angular-chatbot-ai) - Complete monorepo

## 👨‍💻 Author

**Manoj Kumar**
- Email: manojkumar.smgr@gmail.com
- GitHub: [@neurodevworks](https://github.com/neurodevworks)
- NPM: [@neurodevworks](https://www.npmjs.com/~neurodevworks)

---

Made with ❤️ by [NeuroDevWorks](https://github.com/NeuroDevWorks)
