export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  isStreaming?: boolean;
  metadata?: {
    model?: string;
    tokens?: number;
    [key: string]: any;
  };
}

export interface ChatOptions {
  title?: string;
  placeholder?: string;
  theme?: 'light' | 'dark' | 'auto';
  model?: string;
  showAvatars?: boolean;
  streaming?: boolean;
  fullHeight?: boolean;
  markdown?: boolean;
  systemPrompt?: string;
  maxMessages?: number;
  autoScroll?: boolean;
}

export interface ChatConfig {
  apiKey: string;
  provider: 'openai' | 'claude' | 'gemini' | 'huggingface' | 'ollama' | 'deepseek' | 'fallback';
  model: string;
  baseUrl?: string;
  headers?: { [key: string]: string };
}
