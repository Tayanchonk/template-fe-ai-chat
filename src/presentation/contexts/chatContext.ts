// Chat context definition

import { createContext } from 'react';
import type { Chat } from '../../shared/types';

export interface ChatContextType {
  chats: Chat[];
  currentChat: Chat | null;
  loading: boolean;
  sending: boolean;
  createNewChat: () => Promise<Chat>;
  sendMessage: (content: string) => Promise<void>;
  selectChat: (chat: Chat) => void;
  loadChatHistory: () => Promise<void>;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);