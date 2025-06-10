export interface ChatRequestPayload {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface StoredMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}
