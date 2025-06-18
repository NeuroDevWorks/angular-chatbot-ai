import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { AIClient } from '../ai-client';
import { Message, AIClientOptions, ChatOptions, StreamCallbacks } from '../types';

@Injectable({
  providedIn: 'root'
})
export class AIClientService {
  private _client: AIClient | null = null;
  private _isLoading = new BehaviorSubject<boolean>(false);
  private _error = new BehaviorSubject<Error | null>(null);
  private _messages = new BehaviorSubject<Message[]>([]);

  // Observables for reactive programming
  public readonly isLoading$ = this._isLoading.asObservable();
  public readonly error$ = this._error.asObservable();
  public readonly messages$ = this._messages.asObservable();

  // Stream subjects for real-time updates
  private _tokenStream = new Subject<string>();
  private _responseComplete = new Subject<string>();

  public readonly tokenStream$ = this._tokenStream.asObservable();
  public readonly responseComplete$ = this._responseComplete.asObservable();

  constructor() {}

  // Initialize the AI client
  initialize(options: AIClientOptions): void {
    this._client = new AIClient(options);
    this._error.next(null);
  }

  // Get the current client instance
  get client(): AIClient | null {
    return this._client;
  }

  // Check if client is initialized
  get isInitialized(): boolean {
    return this._client !== null;
  }

  // Get current loading state
  get isLoading(): boolean {
    return this._isLoading.value;
  }

  // Get current error state
  get error(): Error | null {
    return this._error.value;
  }

  // Get current messages
  get messages(): Message[] {
    return this._messages.value;
  }

  // Add a message to the conversation
  addMessage(message: Message): void {
    const currentMessages = this._messages.value;
    this._messages.next([...currentMessages, message]);
  }

  // Clear all messages
  clearMessages(): void {
    this._messages.next([]);
  }

  // Clear error state
  clearError(): void {
    this._error.next(null);
  }

  // Send a chat message
  async sendMessage(content: string, options?: ChatOptions): Promise<string> {
    if (!this._client) {
      throw new Error('AI client not initialized. Call initialize() first.');
    }

    this._isLoading.next(true);
    this._error.next(null);

    try {
      // Add user message
      const userMessage: Message = { role: 'user', content };
      this.addMessage(userMessage);

      // Get response from AI
      const response = await this._client.chat(this._messages.value, options);

      // Add assistant response
      const assistantMessage: Message = { role: 'assistant', content: response };
      this.addMessage(assistantMessage);

      return response;
    } catch (error) {
      const err = error as Error;
      this._error.next(err);
      throw err;
    } finally {
      this._isLoading.next(false);
    }
  }

  // Send a streaming chat message
  async sendStreamingMessage(content: string, options?: ChatOptions): Promise<void> {
    if (!this._client) {
      throw new Error('AI client not initialized. Call initialize() first.');
    }

    this._isLoading.next(true);
    this._error.next(null);

    // Reset streaming subjects for new request
    this.resetStreamingSubjects();

    try {
      // Add user message
      const userMessage: Message = { role: 'user', content };
      this.addMessage(userMessage);

      let completeResponse = '';

      const callbacks: StreamCallbacks = {
        onStart: () => {
          // Stream started
        },
        onToken: (token: string) => {
          this._tokenStream.next(token);
          completeResponse += token;
        },
        onComplete: (fullText: string) => {
          // Add assistant response
          const assistantMessage: Message = { role: 'assistant', content: fullText };
          this.addMessage(assistantMessage);
          
          this._responseComplete.next(fullText);
          this._isLoading.next(false);
        },
        onError: (error: Error) => {
          this._error.next(error);
          this._isLoading.next(false);
        }
      };

      await this._client.chatStream(this._messages.value, callbacks, options);
    } catch (error) {
      const err = error as Error;
      this._error.next(err);
      this._isLoading.next(false);
      throw err;
    }
  }

  // Get completion for autosuggest
  async getCompletion(prompt: string, options?: ChatOptions): Promise<string> {
    if (!this._client) {
      throw new Error('AI client not initialized. Call initialize() first.');
    }

    try {
      const result = await this._client.complete(prompt, options);
      return result.text;
    } catch (error) {
      const err = error as Error;
      this._error.next(err);
      throw err;
    }
  }

  // Observable version of sendMessage
  sendMessage$(content: string, options?: ChatOptions): Observable<string> {
    return new Observable(observer => {
      this.sendMessage(content, options)
        .then(response => {
          observer.next(response);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  // Observable version of getCompletion
  getCompletion$(prompt: string, options?: ChatOptions): Observable<string> {
    return new Observable(observer => {
      this.getCompletion(prompt, options)
        .then(response => {
          observer.next(response);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  // Reset streaming subjects for new requests
  private resetStreamingSubjects(): void {
    // Just clear any pending emissions - subjects will handle new emissions properly
    // No need to recreate subjects as they can handle multiple emissions
  }

  // Reset the service state
  reset(): void {
    this._client = null;
    this._isLoading.next(false);
    this._error.next(null);
    this._messages.next([]);
    this.resetStreamingSubjects();
  }
}
