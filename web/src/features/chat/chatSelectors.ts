import type { RootState } from '@/store/store';

export const selectChatMessages = (state: RootState) => state.chat.messages;
export const selectChatIsLoading = (state: RootState) => state.chat.isLoading;
export const selectChatError = (state: RootState) => state.chat.error;
