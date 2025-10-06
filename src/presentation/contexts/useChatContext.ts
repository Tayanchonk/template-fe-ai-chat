// Chat context hook

import { useContext } from 'react';
import { ChatContext, type ChatContextType } from './chatContext';

export const useChatContext = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};