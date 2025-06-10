import { ChatCompletionMessageParam } from 'openai/resources/chat';
import { MessageDTO } from '@/shared/dto';
import { StoredMessage, ChatRequestPayload } from '@/shared/types';
import { v4 as uuidv4 } from 'uuid';

export class ChatSessionService {
  private userHistories = new Map<string, StoredMessage[]>();

  constructor(private readonly MAX_HISTORY_LENGTH: number = 6) {}

  public getHistoryWithMeta(userKey: string): StoredMessage[] {
    if (!this.userHistories.has(userKey)) {
      this.userHistories.set(userKey, []);
    }
    return this.userHistories.get(userKey)!;
  }

  public getHistoryForLLM(userKey: string): ChatCompletionMessageParam[] {
    return this.getHistoryWithMeta(userKey).map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));
  }

  public addMessage(userKey: string, msg: ChatRequestPayload): StoredMessage {
    const fullMsg: StoredMessage = {
      ...msg,
      id: uuidv4(),
      timestamp: new Date().toISOString(),
    };
    this.pushAndTrim(userKey, fullMsg);
    return fullMsg;
  }

  public clearHistory(userKey: string) {
    this.userHistories.delete(userKey);
  }

  public toDTO(msg: StoredMessage): MessageDTO {
    const { id, role, content, timestamp } = msg;
    return { id, role, content, timestamp };
  }

  private pushAndTrim(userKey: string, msg: StoredMessage) {
    const h = this.getHistoryWithMeta(userKey);
    h.push(msg);
    const maxItems = this.MAX_HISTORY_LENGTH * 2 + 1;
    if (h.length > maxItems) {
      h.splice(0, h.length - maxItems);
    }
  }
}
