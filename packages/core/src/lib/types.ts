// Export message types
export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Export provider types
export type AIProvider = 'openai' | 'claude' | 'gemini' | 'huggingface' | 'ollama' | 'deepseek' | 'fallback';

// Export options types
export interface AIClientOptions {
  provider: AIProvider;
  apiKey?: string;
  model?: string;
  baseUrl?: string;
  organizationId?: string;
}

export interface ChatOptions {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stopSequences?: string[];
}

export interface StreamCallbacks {
  onStart?: () => void;
  onToken?: (token: string) => void;
  onComplete?: (completeText: string) => void;
  onError?: (error: Error) => void;
}

// Provider registry types
export type ProviderConfig = {
  [key: string]: {
    apiKey?: string;
    defaultModel?: string;
    baseUrl?: string;
    organizationId?: string;
  }
};
