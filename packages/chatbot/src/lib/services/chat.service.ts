import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ChatMessage, ChatConfig } from '../models/chat.models';
import { AIClientService } from '@neurodevworks/chatbot-core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private aiClientService = inject(AIClientService);
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  private streamingSubject = new Subject<string>();
  
  public messages$ = this.messagesSubject.asObservable();
  public streaming$ = this.streamingSubject.asObservable();

  private config: ChatConfig | null = null;

  configure(config: ChatConfig): void {
    this.config = config;
    this.aiClientService.initialize({
      provider: config.provider,
      apiKey: config.apiKey,
      model: config.model
    });
  }

  async sendMessage(content: string, systemPrompt?: string): Promise<void> {
    if (!this.config) {
      throw new Error('Chat service not configured. Call configure() first.');
    }

    const userMessage: ChatMessage = {
      id: this.generateId(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    // Add user message
    this.addMessage(userMessage);

    // Create assistant message placeholder
    const assistantMessage: ChatMessage = {
      id: this.generateId(),
      content: '',
      role: 'assistant',
      timestamp: new Date(),
      isStreaming: true
    };

    this.addMessage(assistantMessage);

    try {
      // Prepare messages for API
      const messages = this.getMessagesForAPI(systemPrompt);
      
      // Use streaming message method
      await this.aiClientService.sendStreamingMessage(messages[messages.length - 1].content);

      // Subscribe to token stream
      this.aiClientService.tokenStream$.subscribe(token => {
        assistantMessage.content += token;
        this.updateMessage(assistantMessage);
        this.streamingSubject.next(token);
      });

      // Subscribe to completion
      this.aiClientService.responseComplete$.subscribe(fullText => {
        assistantMessage.content = fullText;
        assistantMessage.isStreaming = false;
        this.updateMessage(assistantMessage);
      });
    } catch (error) {
      assistantMessage.content = 'Sorry, I encountered an error. Please try again.';
      assistantMessage.isStreaming = false;
      this.updateMessage(assistantMessage);
      console.error('Chat error:', error);
    }
  }

  private getMessagesForAPI(systemPrompt?: string): any[] {
    const messages = this.messagesSubject.value
      .filter(msg => msg.role !== 'system' && !msg.isStreaming)
      .map(msg => ({
        role: msg.role,
        content: msg.content
      }));

    if (systemPrompt) {
      messages.unshift({ role: 'system', content: systemPrompt });
    }

    return messages;
  }

  private addMessage(message: ChatMessage): void {
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }

  private updateMessage(updatedMessage: ChatMessage): void {
    const currentMessages = this.messagesSubject.value;
    const index = currentMessages.findIndex(msg => msg.id === updatedMessage.id);
    if (index !== -1) {
      currentMessages[index] = { ...updatedMessage };
      this.messagesSubject.next([...currentMessages]);
    }
  }

  clearMessages(): void {
    this.messagesSubject.next([]);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
