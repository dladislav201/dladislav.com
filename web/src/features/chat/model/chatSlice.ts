import { v4 as uuidv4 } from 'uuid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sendMessageThunk, loadHistoryThunk } from './chatThunk';
import { UNKNOWN_API_ERROR } from '@/shared/constants';
import { ChatMessage } from '@/entities/chat';
import type { PlainApiError } from '@/shared/api';

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: PlainApiError | null;
}

const initialState: ChatState = {
  messages: [],
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
        role: 'user' as const,
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
        state.messages.push(payload.aiResponse);
      })
      .addCase(sendMessageThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload ?? UNKNOWN_API_ERROR;
      })
      .addCase(loadHistoryThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadHistoryThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.messages = payload.chatHistory;
      })
      .addCase(loadHistoryThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload ?? UNKNOWN_API_ERROR;
      });
  },
});

export const { addUserMessage, clearError } = chatSlice.actions;
export default chatSlice.reducer;
