import { ChatResponse } from '@/moddels';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  try {
    const response = await fetch(`${API_URL}/api/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error ${response.status}: Failed to get response from AI`);
    }

    return await response.json();
  } catch (error: any) {
    console.error('Error in sendChatMessage:', error);
    throw new Error(error.message || 'Failed to communicate with AI assistant');
  }
}