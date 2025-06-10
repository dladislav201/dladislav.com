import type { RootState } from '@/shared/config';
import type { ChatMessage } from '@/entities/chat';

export const selectChatMessages = (state: RootState): ChatMessage[] =>
  state.chat.messages;
export const selectChatIsLoading = (state: RootState) => state.chat.isLoading;
export const selectChatError = (state: RootState) => state.chat.error;
