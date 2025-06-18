import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

// Removed Material imports for simplified inline template

// Angular Chatbot AI imports
import { AIClientService } from '@neurodevworks/chatbot-core';
import { Message, AIClientOptions } from '@neurodevworks/chatbot-core';

interface Tab {
  id: string;
  name: string;
  icon: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface ChatOptions {
  title: string;
  placeholder: string;
  theme: 'light' | 'dark' | 'auto';
  model: string;
  showAvatars: boolean;
  streaming: boolean;
  fullHeight: boolean;
  markdown: boolean;
  systemPrompt: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  template: `
    <!-- Main App Container -->
    <div style="font-family: 'Inter', 'Roboto', sans-serif; line-height: 1.6; color: #2C2E2F; background-color: #F7F9FA; min-height: 100vh;">

      <!-- Header -->
      <header style="background: white; border-bottom: 1px solid #D9DDE1; padding: 1.25rem 0; position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 8px rgba(0, 72, 121, 0.08);">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #004879, #0074D9); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold;">🤖</div>
              <div>
                <h1 style="margin: 0; font-size: 1.75rem; color: #004879; font-weight: 700; letter-spacing: -0.02em;">Angular Chatbot AI</h1>
                <span style="font-size: 0.875rem; color: #5A6670; margin-left: 0.5rem; font-weight: 500;">Next-Generation Conversational AI</span>
              </div>
            </div>
            <nav style="display: flex; gap: 0.5rem;">
              <a href="https://github.com/NeuroDevWorks/angular-chatbot-ai" target="_blank" style="display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: #2C2E2F; padding: 0.75rem 1.25rem; border-radius: 8px; transition: all 0.2s ease; font-weight: 500; border: 1px solid transparent;">
                📄 GitHub
              </a>
              <a href="https://www.npmjs.com/settings/neurodevworks/packages" target="_blank" style="display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: #2C2E2F; padding: 0.75rem 1.25rem; border-radius: 8px; transition: all 0.2s ease; font-weight: 500; border: 1px solid transparent;">
                📦 NPM
              </a>
            </nav>
          </div>
        </div>
      </header>

      <!-- Hero Section -->
      <section style="background: linear-gradient(135deg, #004879 0%, #0074D9 100%); color: white; padding: 5rem 0; text-align: center; position: relative; overflow: hidden;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
          <div style="position: relative; z-index: 1;">
            <h2 style="font-size: 3.5rem; font-weight: 800; margin-bottom: 1.5rem; line-height: 1.1; letter-spacing: -0.02em;">Next-Generation Conversational AI</h2>
            <p style="font-size: 1.375rem; margin-bottom: 2.5rem; max-width: 700px; margin-left: auto; margin-right: auto; line-height: 1.6; opacity: 0.95; font-weight: 400;">
              Build intelligent chatbot experiences with advanced Angular components.
              Seamlessly integrate with leading AI providers and create engaging user conversations.
            </p>
            <div style="display: flex; gap: 1.25rem; justify-content: center; flex-wrap: wrap;">
              <button (click)="scrollToDemo()" style="background-color: #F7931E; color: white; font-weight: 600; padding: 1rem 2.5rem; border-radius: 8px; border: none; font-size: 1.125rem; box-shadow: 0 4px 12px rgba(247, 147, 30, 0.3); cursor: pointer;">
                🚀 Try Demo
              </button>
              <a href="https://github.com/NeuroDevWorks/angular-chatbot-ai" target="_blank" style="border: 2px solid white; color: white; padding: 1rem 2.5rem; border-radius: 8px; background: transparent; font-weight: 600; font-size: 1.125rem; text-decoration: none; display: inline-block;">
                📄 View Source
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section style="padding: 4rem 0; background: #F7F9FA;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
          <h3 style="text-align: center; font-size: 2.5rem; font-weight: 600; margin-bottom: 3rem; color: #2C2E2F;">Key Features</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            <div *ngFor="let feature of features" style="background: white; padding: 2rem; border-radius: 1rem; text-align: center; box-shadow: 0 4px 12px rgba(0, 72, 121, 0.08); border: 1px solid #D9DDE1;">
              <div style="font-size: 3rem; margin-bottom: 1rem;">{{ feature.icon }}</div>
              <h4 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: #2C2E2F;">{{ feature.title }}</h4>
              <p style="color: #5A6670; line-height: 1.6;">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- API Setup Section -->
      <section style="padding: 2rem 0; background: white;">
        <div style="max-width: 600px; margin: 0 auto; padding: 0 20px;">
          <div style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 12px rgba(0, 72, 121, 0.08); border: 1px solid #D9DDE1;">
            <h3 style="color: #2C2E2F; margin-bottom: 1rem; font-size: 1.5rem; font-weight: 600;">🔑 API Key Setup</h3>
            <p style="color: #5A6670; margin-bottom: 1.5rem;">Enter your OpenAI API key to test the chatbot components</p>

            <div style="margin-bottom: 1rem;">
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #2C2E2F;">OpenAI API Key</label>
              <input
                type="password"
                [(ngModel)]="apiKey"
                (input)="updateApiKey()"
                placeholder="sk-..."
                style="width: 100%; padding: 0.75rem; border: 2px solid #D9DDE1; border-radius: 8px; font-size: 1rem; transition: border-color 0.2s;"
              />
            </div>

            <div style="text-align: center; margin-top: 1rem;">
              <span [style.color]="hasValidApiKey ? '#00A651' : '#D93025'" style="font-weight: 500;">
                {{ hasValidApiKey ? '✅ Valid API Key' : '❌ Invalid API Key' }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Demo Section -->
      <section id="demo" style="padding: 2rem 0; min-height: 600px; background: #F7F9FA;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
          <h3 style="text-align: center; font-size: 2rem; font-weight: 600; margin-bottom: 2rem; color: #2C2E2F;">Interactive Demo</h3>

          <div *ngIf="!hasValidApiKey" style="text-align: center; padding: 2rem; background: white; border-radius: 1rem; box-shadow: 0 4px 12px rgba(0, 72, 121, 0.08); border: 1px solid #D9DDE1;">
            <div style="font-size: 3rem; color: #F7931E; margin-bottom: 1rem;">⚠️</div>
            <h4 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: #2C2E2F;">API Key Required</h4>
            <p style="color: #5A6670;">Please enter a valid OpenAI API key above to test the chatbot functionality.</p>
          </div>

          <div *ngIf="hasValidApiKey" style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 12px rgba(0, 72, 121, 0.08); border: 1px solid #D9DDE1;">
            <h4 style="color: #2C2E2F; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600;">Chat Configuration</h4>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
              <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #2C2E2F;">Title</label>
                <input [(ngModel)]="chatOptions.title" style="width: 100%; padding: 0.5rem; border: 1px solid #D9DDE1; border-radius: 4px;" />
              </div>
              <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #2C2E2F;">Placeholder</label>
                <input [(ngModel)]="chatOptions.placeholder" style="width: 100%; padding: 0.5rem; border: 1px solid #D9DDE1; border-radius: 4px;" />
              </div>
            </div>

            <!-- Live Chatbot Demo -->
            <div style="margin-top: 2rem;">
              <h4 style="color: #2C2E2F; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600;">🤖 {{ chatOptions.title }}</h4>

              <!-- Chat Container -->
              <div style="border: 1px solid #D9DDE1; border-radius: 12px; background: white; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 72, 121, 0.08);">

                <!-- Chat Header -->
                <div style="background: linear-gradient(135deg, #004879, #0074D9); color: white; padding: 1rem; text-align: center;">
                  <h5 style="margin: 0; font-size: 1.125rem; font-weight: 600;">{{ chatOptions.title }}</h5>
                  <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; opacity: 0.9;">Powered by OpenAI GPT</p>
                </div>

                <!-- Messages Area -->
                <div style="height: 400px; overflow-y: auto; padding: 1rem; background: #F7F9FA;">
                  <div *ngIf="messages.length === 0" style="text-align: center; color: #5A6670; padding: 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">💬</div>
                    <p style="margin: 0; font-size: 1.125rem; font-weight: 500;">Start a conversation!</p>
                    <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">Type a message below to begin chatting with the AI assistant.</p>
                  </div>

                  <!-- Message List -->
                  <div *ngFor="let message of messages" style="margin-bottom: 1rem;">
                    <div [style.text-align]="message.isUser ? 'right' : 'left'">
                      <div [style.background]="message.isUser ? '#004879' : 'white'"
                           [style.color]="message.isUser ? 'white' : '#2C2E2F'"
                           style="display: inline-block; max-width: 80%; padding: 0.75rem 1rem; border-radius: 18px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); word-wrap: break-word;">
                        <p style="margin: 0; line-height: 1.4;">{{ message.text }}</p>
                        <small [style.color]="message.isUser ? 'rgba(255,255,255,0.7)' : '#5A6670'"
                               style="font-size: 0.75rem; margin-top: 0.25rem; display: block;">
                          {{ message.timestamp | date:'short' }}
                        </small>
                      </div>
                    </div>
                  </div>

                  <!-- Loading Indicator -->
                  <div *ngIf="isLoading" style="text-align: left; margin-bottom: 1rem;">
                    <div style="background: white; color: #2C2E2F; display: inline-block; max-width: 80%; padding: 0.75rem 1rem; border-radius: 18px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                      <p style="margin: 0; line-height: 1.4;">
                        <span style="animation: pulse 1.5s ease-in-out infinite;">AI is thinking...</span>
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Input Area -->
                <div style="border-top: 1px solid #D9DDE1; padding: 1rem; background: white;">
                  <div style="display: flex; gap: 0.5rem; align-items: flex-end;">
                    <div style="flex: 1;">
                      <textarea
                        [(ngModel)]="currentMessage"
                        (keypress)="onKeyPress($event)"
                        [placeholder]="chatOptions.placeholder"
                        style="width: 100%; min-height: 40px; max-height: 120px; padding: 0.75rem; border: 1px solid #D9DDE1; border-radius: 20px; resize: none; font-family: inherit; font-size: 0.875rem; line-height: 1.4;"
                        [disabled]="isLoading">
                      </textarea>
                    </div>
                    <button
                      (click)="sendMessage()"
                      [disabled]="!currentMessage.trim() || isLoading"
                      style="background: #004879; color: white; border: none; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s ease; font-size: 1.125rem;"
                      [style.opacity]="!currentMessage.trim() || isLoading ? '0.5' : '1'">
                      {{ isLoading ? '⏳' : '🚀' }}
                    </button>
                    <button
                      (click)="clearChat()"
                      style="background: #5A6670; color: white; border: none; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s ease; font-size: 1rem;">
                      🗑️
                    </button>
                  </div>
                  <div style="margin-top: 0.5rem; text-align: center;">
                    <small style="color: #5A6670; font-size: 0.75rem;">Press Enter to send • Shift+Enter for new line</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer style="background: #2C2E2F; color: white; padding: 3rem 0 1rem;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
            <div>
              <h4 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem;">Angular Chatbot AI</h4>
              <p style="color: #ccc; line-height: 1.6;">Next-generation conversational AI components for Angular applications.</p>
            </div>
            <div>
              <h4 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem;">Links</h4>
              <a href="https://github.com/NeuroDevWorks/angular-chatbot-ai" style="display: block; color: #ccc; text-decoration: none; margin-bottom: 0.5rem;">GitHub</a>
              <a href="https://www.npmjs.com/settings/neurodevworks/packages" style="display: block; color: #ccc; text-decoration: none; margin-bottom: 0.5rem;">NPM</a>
            </div>
            <div>
              <h4 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem;">Packages</h4>

              
              <a href="https://www.npmjs.com/package/@neurodevworks/angular-chatbot" style="display: block; color: #ccc; text-decoration: none; margin-bottom: 0.5rem;">&#64;neurodevworks/angular-chatbot</a>
            </div>
          </div>
          <div style="border-top: 1px solid #444; padding-top: 1rem; text-align: center;">
            <p style="margin: 0; color: #ccc;">&copy; 2024 Angular Chatbot AI. Built with ❤️ by <a href="https://github.com/neurodevworks" style="color: #0074D9; text-decoration: none;">Manoj Kumar</a></p>
          </div>
        </div>
      </footer>

    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private aiClientService: AIClientService) {}

  title = 'Angular Chatbot AI Demo';
  activeTab = '0';
  apiKey = '';
  hasValidApiKey = false;

  // Enhanced chatbot features
  enableVoice = false;
  enableFileUpload = true;
  showTypingIndicator = true;
  conversationMode = 'assistant'; // assistant, creative, technical, casual

  tabs = [
    { id: '0', name: 'Overview', icon: '🏠' },
    { id: '1', name: 'Chatbot', icon: '💬' }
  ];

  features: Feature[] = [
    {
      icon: '🤖',
      title: 'AI-Powered',
      description: 'Leverage the latest AI models from OpenAI, Claude, Gemini, and more'
    },
    {
      icon: '⚡',
      title: 'Fast & Efficient',
      description: 'Optimized for performance with streaming responses and smart caching'
    },
    {
      icon: '🎨',
      title: 'Customizable',
      description: 'Flexible theming and styling options to match your brand'
    },
    {
      icon: '🔧',
      title: 'Easy Integration',
      description: 'Simple API and comprehensive documentation for quick setup'
    },
    {
      icon: '📱',
      title: 'Responsive',
      description: 'Works seamlessly across desktop, tablet, and mobile devices'
    },
    {
      icon: '🔒',
      title: 'Secure',
      description: 'Built with security best practices and data privacy in mind'
    }
  ];

  chatOptions: ChatOptions = {
    title: 'Smart AI Assistant',
    placeholder: 'Type your message here...',
    theme: 'light',
    model: 'gpt-4',
    showAvatars: true,
    streaming: true,
    fullHeight: false,
    markdown: true,
    systemPrompt: 'You are a helpful AI assistant. Provide clear, concise, and accurate responses.'
  };

  // Conversation modes with different personalities
  conversationModes = {
    assistant: {
      name: 'Professional Assistant',
      icon: '🤖',
      prompt: 'You are a professional AI assistant. Provide helpful, accurate, and well-structured responses.'
    },
    creative: {
      name: 'Creative Partner',
      icon: '🎨',
      prompt: 'You are a creative AI partner. Help with brainstorming, writing, and innovative ideas. Be imaginative and inspiring.'
    },
    technical: {
      name: 'Technical Expert',
      icon: '⚡',
      prompt: 'You are a technical expert. Provide detailed, accurate technical information with code examples when relevant.'
    },
    casual: {
      name: 'Friendly Chat',
      icon: '😊',
      prompt: 'You are a friendly conversational AI. Be casual, warm, and engaging while still being helpful.'
    }
  };

  // Configuration objects for chatbot
  chatConfig: any = {
    apiKey: '',
    provider: 'openai',
    model: 'gpt-3.5-turbo'
  };

  // Chat messages for demo
  messages: Array<{id: number, text: string, isUser: boolean, timestamp: Date}> = [];
  currentMessage: string = '';
  isLoading: boolean = false;



  packages = {
    chatbot: {
      name: '@neurodevworks/angular-chatbot',
      description: 'Advanced AI chatbot components for Angular applications',
      version: '1.0.0',
      npmName: '@neurodevworks/angular-chatbot',
      github: 'https://github.com/neurodevworks/angular-chatbot-ai/tree/main/packages/chatbot',
      features: [
        { icon: '🧠', text: 'Multi-AI Provider Support' },
        { icon: '💬', text: 'Real-time Conversations' },
        { icon: '🎨', text: 'Modern UI Themes' },
        { icon: '📱', text: 'Mobile-First Design' },
        { icon: '🔊', text: 'Voice Interaction' },
        { icon: '📎', text: 'File Upload Support' }
      ]
    }
  };

  ngOnInit() {
    // Initialize with any existing API key from localStorage
    const savedApiKey = localStorage.getItem('angularai_api_key');
    if (savedApiKey) {
      this.apiKey = savedApiKey;
      this.updateApiKey();
    }

    // Initialize the system prompt after component is fully loaded
    this.chatOptions = {
      ...this.chatOptions,
      systemPrompt: this.getSystemPrompt()
    };
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  get currentPackage() {
    return this.packages[this.activeTab as keyof typeof this.packages] || this.packages.chatbot;
  }

  setActiveTab(tabIndex: string) {
    this.activeTab = tabIndex;
  }

  updateApiKey() {
    // Basic validation for OpenAI API key format
    this.hasValidApiKey = this.apiKey.startsWith('sk-') && this.apiKey.length > 20;

    if (this.hasValidApiKey) {
      // Store in localStorage for persistence
      localStorage.setItem('angularai_api_key', this.apiKey);

      // Initialize AI client with real configuration
      const aiOptions: AIClientOptions = {
        provider: 'openai',
        apiKey: this.apiKey,
        model: this.chatOptions.model || 'gpt-3.5-turbo'
      };

      this.aiClientService.initialize(aiOptions);

      // Update all component configurations
      this.chatConfig = {
        ...this.chatConfig,
        apiKey: this.apiKey
      };

      // Update chat options with system prompt
      this.chatOptions = {
        ...this.chatOptions,
        systemPrompt: this.getSystemPrompt()
      };
    } else {
      localStorage.removeItem('angularai_api_key');
    }
  }

  resetChatOptions() {
    this.chatOptions = {
      title: 'AI Assistant',
      placeholder: 'Ask me anything...',
      theme: 'light',
      model: 'gpt-3.5-turbo',
      showAvatars: true,
      streaming: true,
      fullHeight: false,
      markdown: true,
      systemPrompt: 'You are a helpful AI assistant. Provide clear, concise, and accurate responses.'
    };
  }

  scrollToDemo() {
    const demoElement = document.getElementById('demo');
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getWelcomeDescription(tabId: string): string {
    const descriptions: { [key: string]: string } = {
      chatbot: 'Experience next-generation conversational AI with advanced chatbot components featuring multi-provider support, voice interaction, and modern UI designs.',
      typescript: 'Full TypeScript support with comprehensive type definitions and IntelliSense.',
      features: 'Explore advanced chatbot features including voice interaction, file uploads, and conversation modes.'
    };
    return descriptions[tabId] || '';
  }

  getSystemPrompt(): string {
    if (!this.conversationModes || !this.conversationMode) {
      return 'You are a helpful AI assistant. Provide clear, concise, and accurate responses.';
    }
    return this.conversationModes[this.conversationMode as keyof typeof this.conversationModes]?.prompt ||
           'You are a helpful AI assistant. Provide clear, concise, and accurate responses.';
  }

  // Chat functionality with streaming support
  async sendMessage(): Promise<void> {
    if (!this.currentMessage.trim() || !this.hasValidApiKey || this.isLoading) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      text: this.currentMessage,
      isUser: true,
      timestamp: new Date()
    };

    this.messages.push(userMessage);
    const messageText = this.currentMessage;
    this.currentMessage = '';
    this.isLoading = true;

    // Create placeholder for AI response
    const aiMessageId = Date.now() + 1;
    const aiMessage = {
      id: aiMessageId,
      text: '',
      isUser: false,
      timestamp: new Date()
    };
    this.messages.push(aiMessage);

    try {
      // Use real AI service
      if (this.aiClientService.isInitialized) {
        // Try streaming first, fallback to regular message if streaming not available
        if (this.aiClientService.sendStreamingMessage) {
          await this.aiClientService.sendStreamingMessage(messageText, {
            temperature: 0.7,
            maxTokens: 1000
          });

          // Subscribe to token stream for real-time updates
          const tokenSub = this.aiClientService.tokenStream$.subscribe(token => {
            const messageIndex = this.messages.findIndex(m => m.id === aiMessageId);
            if (messageIndex !== -1) {
              this.messages[messageIndex].text += token;
            }
          });
          this.subscriptions.push(tokenSub);

          // Subscribe to completion
          const completeSub = this.aiClientService.responseComplete$.subscribe(completeText => {
            const messageIndex = this.messages.findIndex(m => m.id === aiMessageId);
            if (messageIndex !== -1) {
              this.messages[messageIndex].text = completeText;
            }
            this.isLoading = false;
          });
          this.subscriptions.push(completeSub);
        } else {
          // Use regular sendMessage if streaming not available
          const response = await this.aiClientService.sendMessage(messageText, {
            temperature: 0.7,
            maxTokens: 1000
          });

          const messageIndex = this.messages.findIndex(m => m.id === aiMessageId);
          if (messageIndex !== -1) {
            this.messages[messageIndex].text = response;
          }
          this.isLoading = false;
        }
      } else {
        // Fallback if AI client not initialized
        const response = await this.getAIResponse(messageText);
        const messageIndex = this.messages.findIndex(m => m.id === aiMessageId);
        if (messageIndex !== -1) {
          this.messages[messageIndex].text = response;
        }
        this.isLoading = false;
      }
    } catch (error) {
      console.error('AI Service Error:', error);
      const messageIndex = this.messages.findIndex(m => m.id === aiMessageId);
      if (messageIndex !== -1) {
        this.messages[messageIndex].text = 'Sorry, I encountered an error. Please check your API key and try again.';
      }
      this.isLoading = false;
    }
  }

  private async getAIResponse(message: string): Promise<string> {
    // Simple mock response for demo - replace with actual AI service
    return new Promise((resolve) => {
      setTimeout(() => {
        const responses = [
          `I understand you're asking about "${message}". That's a great question!`,
          `Thanks for your message: "${message}". I'm here to help you with that.`,
          `Regarding "${message}" - I'd be happy to assist you with more information.`,
          `That's an interesting point about "${message}". Let me provide some insights.`
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        resolve(randomResponse);
      }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
    });
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  clearChat(): void {
    this.messages = [];
    // Also clear AI service messages
    if (this.aiClientService.isInitialized) {
      this.aiClientService.clearMessages();
    }
  }

  setConversationMode(mode: string): void {
    this.conversationMode = mode;
    this.chatOptions = {
      ...this.chatOptions,
      systemPrompt: this.getSystemPrompt()
    };
  }

  toggleVoice(): void {
    this.enableVoice = !this.enableVoice;
    // Note: Voice feature would be implemented in the actual chatbot component
  }

  toggleFileUpload(): void {
    this.enableFileUpload = !this.enableFileUpload;
    // Note: File upload feature would be implemented in the actual chatbot component
  }

  toggleTypingIndicator(): void {
    this.showTypingIndicator = !this.showTypingIndicator;
    // Note: Typing indicator feature would be implemented in the actual chatbot component
  }

  changeTheme(theme: 'light' | 'dark' | 'auto'): void {
    this.chatOptions = {
      ...this.chatOptions,
      theme: theme
    };
  }
}
