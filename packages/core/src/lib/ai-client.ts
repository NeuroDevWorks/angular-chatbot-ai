import { Message, AIClientOptions, ChatOptions, StreamCallbacks, AIProvider } from './types';

// Main AIClient class
export class AIClient {
  private provider: AIProvider;
  private apiKey?: string;
  private model?: string;
  private baseUrl?: string;
  private organizationId?: string;

  constructor(options: AIClientOptions) {
    this.provider = options.provider;
    this.apiKey = options.apiKey;
    this.model = options.model;
    this.baseUrl = options.baseUrl;
    this.organizationId = options.organizationId;
  }

  // Chat functionality
  async chat(messages: Message[], options?: ChatOptions): Promise<string> {
    if (!this.apiKey && this.provider !== 'ollama') {
      console.warn(`No API key provided for ${this.provider}. Using fallback response.`);
      return this.getFallbackResponse(messages);
    }

    try {
      switch (this.provider) {
        case 'openai':
          return await this.callOpenAI(messages, options);
        case 'claude':
          return await this.callClaude(messages, options);
        case 'gemini':
          return await this.callGemini(messages, options);
        case 'ollama':
          return await this.callOllama(messages, options);
        default:
          return this.getFallbackResponse(messages);
      }
    } catch (error) {
      console.error(`Error calling ${this.provider} API:`, error);
      throw error;
    }
  }

  // Completion functionality for autosuggest
  async complete(prompt: string, options?: ChatOptions): Promise<{ text: string }> {
    // Convert prompt to a message
    const messages: Message[] = [
      { role: 'user', content: prompt }
    ];

    try {
      const response = await this.chat(messages, options);
      return { text: response };
    } catch (error) {
      console.error('Error in complete method:', error);
      return { text: '' };
    }
  }

  // Streaming chat functionality
  async chatStream(messages: Message[], callbacks: StreamCallbacks, options?: ChatOptions): Promise<void> {
    callbacks.onStart?.();

    if (!this.apiKey && this.provider !== 'ollama') {
      console.warn(`No API key provided for ${this.provider}. Using fallback response.`);
      return this.streamFallbackResponse(callbacks);
    }

    try {
      switch (this.provider) {
        case 'openai':
          await this.streamOpenAI(messages, callbacks, options);
          break;
        case 'claude':
          await this.streamClaude(messages, callbacks, options);
          break;
        case 'gemini':
          await this.streamGemini(messages, callbacks, options);
          break;
        case 'ollama':
          await this.streamOllama(messages, callbacks, options);
          break;
        default:
          await this.streamFallbackResponse(callbacks);
      }
    } catch (error) {
      console.error(`Error streaming from ${this.provider} API:`, error);
      callbacks.onError?.(error as Error);
    }
  }

  // OpenAI implementation
  private async callOpenAI(messages: Message[], options?: ChatOptions): Promise<string> {
    const url = this.baseUrl || 'https://api.openai.com/v1/chat/completions';
    const model = this.model || 'gpt-3.5-turbo';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          ...(this.organizationId ? { 'OpenAI-Organization': this.organizationId } : {})
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: options?.temperature || 0.7,
          max_tokens: options?.maxTokens || 1000,
          top_p: options?.topP || 1,
          frequency_penalty: options?.frequencyPenalty || 0,
          presence_penalty: options?.presencePenalty || 0,
          stop: options?.stopSequences,
          stream: false
        })
      });

      if (!response.ok) {
        const errorText = await response.text();

        // Check for CORS error
        if (response.status === 0 || response.type === 'opaque') {
          throw new Error('CORS error: Cannot access OpenAI API directly from browser. Please use a proxy server or backend API.');
        }

        try {
          const error = JSON.parse(errorText);
          throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
        } catch {
          throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
        }
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      // If it's a CORS error, fall back to a simulated response
      if (error instanceof TypeError && error.message.includes('fetch')) {
        const userMessage = messages[messages.length - 1]?.content || '';
        return `Hello! I received your message: "${userMessage}". This is a simulated response due to CORS restrictions when accessing OpenAI API directly from the browser.`;
      }
      throw error;
    }
  }

  private async streamOpenAI(messages: Message[], callbacks: StreamCallbacks, options?: ChatOptions): Promise<void> {
    const url = this.baseUrl || 'https://api.openai.com/v1/chat/completions';
    const model = this.model || 'gpt-3.5-turbo';

    console.log('🚀 Starting OpenAI stream request...');
    console.log('URL:', url);
    console.log('Model:', model);
    console.log('Messages:', messages);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          ...(this.organizationId ? { 'OpenAI-Organization': this.organizationId } : {})
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: options?.temperature || 0.7,
          max_tokens: options?.maxTokens || 1000,
          top_p: options?.topP || 1,
          frequency_penalty: options?.frequencyPenalty || 0,
          presence_penalty: options?.presencePenalty || 0,
          stop: options?.stopSequences,
          stream: true
        })
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ OpenAI API error:', errorText);

        // Check for CORS error
        if (response.status === 0 || response.type === 'opaque') {
          throw new Error('CORS error: Cannot access OpenAI API directly from browser. Please use a proxy server or backend API.');
        }

        try {
          const error = JSON.parse(errorText);
          throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
        } catch {
          throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${errorText}`);
        }
      }

      if (!response.body) {
        throw new Error('Response body is null');
      }

      console.log('✅ Starting to read stream...');
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let completeText = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            console.log('✅ Stream completed');
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n').filter(line => line.trim() !== '');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                console.log('✅ Received [DONE] signal');
                continue;
              }

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices[0]?.delta?.content || '';
                if (content) {
                  console.log('📝 Token received:', content);
                  callbacks.onToken?.(content);
                  completeText += content;
                }
              } catch (e) {
                console.warn('⚠️ Error parsing SSE message:', e, 'Data:', data);
              }
            }
          }
        }
      } finally {
        console.log('🏁 Final response:', completeText);
        callbacks.onComplete?.(completeText);
      }
    } catch (error) {
      console.error('❌ Stream error:', error);

      // If it's a CORS error, fall back to a simulated response
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.log('🔄 CORS detected, falling back to simulated response...');
        await this.simulateStreamingResponse(messages, callbacks);
        return;
      }

      callbacks.onError?.(error as Error);
      throw error;
    }
  }

  // Simulate streaming response for CORS issues
  private async simulateStreamingResponse(messages: Message[], callbacks: StreamCallbacks): Promise<void> {
    const userMessage = messages[messages.length - 1]?.content || '';
    const response = `Hello! I received your message: "${userMessage}".

I'm a simulated AI response because there's a CORS issue accessing the OpenAI API directly from the browser.

To use real AI responses, you would need to:
1. Set up a backend proxy server
2. Use a CORS proxy service
3. Deploy your app to a server with proper CORS configuration

This demo shows the UI and streaming functionality working perfectly!`;

    console.log('🎭 Simulating streaming response...');

    // Simulate streaming tokens
    const words = response.split(' ');
    let completeText = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i] + (i < words.length - 1 ? ' ' : '');
      callbacks.onToken?.(word);
      completeText += word;

      // Simulate realistic typing speed
      await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
    }

    callbacks.onComplete?.(completeText);
  }

  // Claude implementation
  private async callClaude(messages: Message[], options?: ChatOptions): Promise<string> {
    // Implement Claude API call
    return this.getFallbackResponse(messages);
  }

  private async streamClaude(messages: Message[], callbacks: StreamCallbacks, options?: ChatOptions): Promise<void> {
    // Implement Claude streaming
    await this.streamFallbackResponse(callbacks);
  }

  // Gemini implementation
  private async callGemini(messages: Message[], options?: ChatOptions): Promise<string> {
    // Implement Gemini API call
    return this.getFallbackResponse(messages);
  }

  private async streamGemini(messages: Message[], callbacks: StreamCallbacks, options?: ChatOptions): Promise<void> {
    // Implement Gemini streaming
    await this.streamFallbackResponse(callbacks);
  }

  // Ollama implementation
  private async callOllama(messages: Message[], options?: ChatOptions): Promise<string> {
    const url = `${this.baseUrl || 'http://localhost:11434'}/api/chat`;
    const model = this.model || 'llama3';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          options: {
            temperature: options?.temperature || 0.7,
            top_p: options?.topP || 1,
            frequency_penalty: options?.frequencyPenalty || 0,
            presence_penalty: options?.presencePenalty || 0,
            stop: options?.stopSequences || [],
            num_predict: options?.maxTokens || 1024
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ollama API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      // Ollama returns a stream of JSON objects, one per line
      const text = await response.text();
      const lines = text.split('\n').filter(line => line.trim() !== '');

      // Collect all content from the stream
      let fullContent = '';
      for (const line of lines) {
        try {
          const json = JSON.parse(line);
          if (json.message?.content) {
            fullContent += json.message.content;
          }
        } catch (e) {
          console.warn('Error parsing Ollama response line:', e);
        }
      }

      return fullContent;
    } catch (error) {
      console.error('Error calling Ollama API:', error);
      throw error;
    }
  }

  private async streamOllama(messages: Message[], callbacks: StreamCallbacks, options?: ChatOptions): Promise<void> {
    const url = `${this.baseUrl || 'http://localhost:11434'}/api/chat`;
    const model = this.model || 'llama3';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          stream: true,
          options: {
            temperature: options?.temperature || 0.7,
            top_p: options?.topP || 1,
            frequency_penalty: options?.frequencyPenalty || 0,
            presence_penalty: options?.presencePenalty || 0,
            stop: options?.stopSequences || [],
            num_predict: options?.maxTokens || 1024
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ollama API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      if (!response.body) {
        throw new Error('Response body is null');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let completeText = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n').filter(line => line.trim() !== '');

          for (const line of lines) {
            try {
              const parsed = JSON.parse(line);
              const content = parsed.message?.content || '';
              if (content) {
                callbacks.onToken?.(content);
                completeText += content;
              }
            } catch (e) {
              console.warn('Error parsing Ollama stream message:', e);
            }
          }
        }
      } finally {
        callbacks.onComplete?.(completeText);
      }
    } catch (error) {
      console.error('Error streaming from Ollama API:', error);
      callbacks.onError?.(error as Error);
    }
  }

  // Fallback implementations
  private getFallbackResponse(messages: Message[]): string {
    const userMessage = messages[messages.length - 1].content.toLowerCase();

    if (userMessage.includes('hello') || userMessage.includes('hi')) {
      return "Hello! I'm an AI assistant. How can I help you today?";
    } else if (userMessage.includes('help')) {
      return "I'm here to help! You can ask me questions, request information, or just chat.";
    } else {
      return "I'm an AI assistant powered by the @angularai library. To get real responses, please provide a valid API key for your chosen provider.";
    }
  }

  private async streamFallbackResponse(callbacks: StreamCallbacks): Promise<void> {
    const response = "I'm an AI assistant powered by the @angularai library. To get real responses, please provide a valid API key for your chosen provider.";

    // Simulate streaming tokens
    for (const char of response) {
      callbacks.onToken?.(char);
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 30));
    }

    callbacks.onComplete?.(response);
  }
}
