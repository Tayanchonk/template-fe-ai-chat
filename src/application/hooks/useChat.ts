// Custom hook for chat functionality

import { useState, useEffect } from 'react';
import type { Chat } from '../../shared/types';
import { appService } from '../services';

export const useChat = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      setLoading(true);
      const chatHistory = await appService.getChatHistoryUseCase.execute();
      setChats(chatHistory);
      
      // If no current chat and there are chats, select the most recent one
      if (!currentChat && chatHistory.length > 0) {
        const mostRecent = chatHistory.sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )[0];
        setCurrentChat(mostRecent);
      }
    } catch (err) {
      console.error('Error loading chat history:', err);
    } finally {
      setLoading(false);
    }
  };

  const createNewChat = async () => {
    try {
      const newChat = await appService.createChatUseCase.execute();
      setChats(prev => [newChat, ...prev]);
      setCurrentChat(newChat);
      return newChat;
    } catch (err) {
      console.error('Error creating new chat:', err);
      throw err;
    }
  };

  const sendMessage = async (content: string) => {
    if (!currentChat) {
      // Create a new chat if none exists
      await createNewChat();
      return;
    }

    try {
      setSending(true);
      const newMessages = await appService.sendMessageUseCase.execute(currentChat.id, content);
      
      // Update current chat with new messages
      const updatedChat = {
        ...currentChat,
        messages: [...currentChat.messages, ...newMessages],
        updatedAt: new Date(),
      };
      
      setCurrentChat(updatedChat);
      
      // Update chats list
      setChats(prev => 
        prev.map(chat => 
          chat.id === currentChat.id ? updatedChat : chat
        )
      );
    } catch (err) {
      console.error('Error sending message:', err);
      throw err;
    } finally {
      setSending(false);
    }
  };

  const selectChat = (chat: Chat) => {
    setCurrentChat(chat);
  };

  return {
    chats,
    currentChat,
    loading,
    sending,
    createNewChat,
    sendMessage,
    selectChat,
    loadChatHistory,
  };
};