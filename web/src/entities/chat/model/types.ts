export interface ContextItem {
  text: string;
  category: string;
  similarity: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

export interface ChatResponse {
  response: string;
  context: ContextItem[];
}
