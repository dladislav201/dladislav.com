import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChatMessage, ChatResponse } from '@/core/models/chat';
import { AuthError, ChatError, RateLimitError } from '@/core/errors/ChatErrors';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { sendChatMessage } from './api/aiService';
import { v4 as uuidv4 } from 'uuid';

interface SendMessageResult {
  aiMessage: ChatMessage;
}

type SendMessageArgs = string;

interface SendMessageConfig {
  rejectValue: string;
}

export const sendMessageThunk = createAsyncThunk<
  SendMessageResult,
  SendMessageArgs,
  SendMessageConfig
>('chat/sendMessage', async (text: string, { rejectWithValue }) => {
  try {
    const result: ChatResponse = await sendChatMessage(text);
    const aiMessage: ChatMessage = {
      id: uuidv4(),
      content: result.response,
      role: 'assistant',
      timestamp: new Date().toISOString(),
    };
    return { aiMessage };
  } catch (err) {
    if (err instanceof RateLimitError) {
      return rejectWithValue(`Rate limit: ${err.message}`);
    }
    if (err instanceof AuthError) {
      return rejectWithValue(`Auth failed: ${err.message}`);
    }
    if (err instanceof ChatError) {
      return rejectWithValue(err.message);
    }
    const generic = getErrorMessage(err, {
      map: { 500: 'Server error. Please try again later.' },
    });
    return rejectWithValue(generic);
  }
});
