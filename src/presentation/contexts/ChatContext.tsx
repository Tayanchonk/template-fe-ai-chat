// Chat context for React components

import React from 'react';
import type { ReactNode } from 'react';
import { useChat } from '../../application/hooks';
import { ChatContext } from './chatContext';

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