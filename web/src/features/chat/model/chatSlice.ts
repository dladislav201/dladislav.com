import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlainApiError, ApiErrorCode } from '@/shared/api';
import { sendMessageThunk, loadHistoryThunk } from './chatThunk';
import { ChatMessage } from '@/entities/chat';
import { v4 as uuidv4 } from 'uuid';

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
        state.error = payload ?? {
          code: ApiErrorCode.UNKNOWN,
          message: 'Unknown error',
        };
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
        state.error = payload ?? {
          code: ApiErrorCode.UNKNOWN,
          message: 'Unknown error',
        };
      });
  },
});

export const { addUserMessage, clearError } = chatSlice.actions;
export default chatSlice.reducer;
