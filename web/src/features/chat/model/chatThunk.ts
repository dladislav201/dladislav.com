import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChatMessage } from '@/entities/chat/model/types';
import { toPlainError, type PlainApiError } from '@/shared/api';
import { getChatHistory, sendMessage } from '../api/chatApi';

interface SendMessageResult {
  aiResponse: ChatMessage;
}
interface getMessagesResult {
  chatHistory: ChatMessage[];
}

type SendMessageArgs = string;
type GetMessagesArgs = void;

interface ChatThunkApiConfig {
  rejectValue: PlainApiError;
}

export const sendMessageThunk = createAsyncThunk<
  SendMessageResult,
  SendMessageArgs,
  ChatThunkApiConfig
>('chat/sendMessage', async (text: string, { rejectWithValue }) => {
  try {
    const aiResponse = await sendMessage(text);
    return { aiResponse };
  } catch (err) {
    return rejectWithValue(toPlainError(err));
  }
});

export const loadHistoryThunk = createAsyncThunk<
  getMessagesResult,
  GetMessagesArgs,
  ChatThunkApiConfig
>('chat/loadHistory', async (_, { rejectWithValue }) => {
  try {
    const chatHistory = await getChatHistory();
    return { chatHistory };
  } catch (err) {
    return rejectWithValue(toPlainError(err));
  }
});
