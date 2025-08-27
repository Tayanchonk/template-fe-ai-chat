// Chat context for React components

import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useChat } from '../../application/hooks';
import type { Chat } from '../../shared/types';

interface ChatContextType {
  chats: Chat[];
  currentChat: Chat | null;
  loading: boolean;
  sending: boolean;
  createNewChat: () => Promise<Chat>;
  sendMessage: (content: string) => Promise<void>;
  selectChat: (chat: Chat) => void;
  loadChatHistory: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const chatState = useChat();

  return (
    <ChatContext.Provider value={chatState}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};