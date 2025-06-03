import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/config/store/hooks';
import { sendMessageThunk } from '../model/chatThunk';
import { addUserMessage, clearError } from '../model/chatSlice';
import {
  selectChatMessages,
  selectChatIsLoading,
  selectChatError,
} from '../model/chatSelectors';

export function useChatMessages() {
  const dispatch = useAppDispatch();

  const messages = useAppSelector(selectChatMessages);
  const isLoading = useAppSelector(selectChatIsLoading);
  const error = useAppSelector(selectChatError);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return;

      dispatch(addUserMessage(text));
      dispatch(sendMessageThunk(text));
    },
    [dispatch],
  );

  const clearChatError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChatError,
  };
}
