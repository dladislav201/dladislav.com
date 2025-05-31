import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage } from '@/core/models/ai';
import { sendMessageThunk } from './chatThunk';
import { v4 as uuidv4 } from 'uuid';

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [
    {
      id: 'welcome',
      content:
        "Hello! I'm an AI assistant for Vladyslav's portfolio. How can I help you?",
      role: 'assistant',
      timestamp: new Date().toISOString(),
    },
  ],
  isLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addUserMessage(state, action: PayloadAction<string>) {
      const userMsg: ChatMessage = {
        id: uuidv4(),
        content: action.payload,
        role: 'user',
        timestamp: new Date().toISOString(),
      };
      state.messages.push(userMsg);
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendMessageThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.messages.push(payload.aiMessage);
      })
      .addCase(sendMessageThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload ?? 'Unknown error';
      });
  },
});

export const { addUserMessage, clearError } = chatSlice.actions;
export default chatSlice.reducer;
