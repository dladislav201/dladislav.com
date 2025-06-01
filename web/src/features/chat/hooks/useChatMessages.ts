import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { sendMessageThunk } from '../chatThunk';
import { addUserMessage, clearError } from '../chatSlice';
import {
  selectChatMessages,
  selectChatIsLoading,
  selectChatError,
} from '../chatSelectors';

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
