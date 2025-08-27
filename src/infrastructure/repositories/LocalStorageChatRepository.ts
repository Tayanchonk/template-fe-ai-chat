// LocalStorage implementation of ChatRepository

import type { Chat, Message } from '../../domain/entities';
import type { ChatRepository } from '../../domain/repositories';

export class LocalStorageChatRepository implements ChatRepository {
  private readonly CHATS_KEY = 'chatapp_chats';

  async getAllChats(): Promise<Chat[]> {
    const chatsData = localStorage.getItem(this.CHATS_KEY);
    if (!chatsData) return [];

    try {
      const chats = JSON.parse(chatsData) as Chat[];
      // Convert string dates back to Date objects
      return chats.map(chat => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt),
        messages: chat.messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      }));
    } catch {
      return [];
    }
  }

  async getChatById(id: string): Promise<Chat | null> {
    const chats = await this.getAllChats();
    return chats.find(chat => chat.id === id) || null;
  }

  async saveChat(chat: Chat): Promise<void> {
    const chats = await this.getAllChats();
    const existingIndex = chats.findIndex(c => c.id === chat.id);
    
    if (existingIndex >= 0) {
      chats[existingIndex] = { ...chat, updatedAt: new Date() };
    } else {
      chats.push(chat);
    }

    localStorage.setItem(this.CHATS_KEY, JSON.stringify(chats));
  }

  async deleteChat(id: string): Promise<void> {
    const chats = await this.getAllChats();
    const filteredChats = chats.filter(chat => chat.id !== id);
    localStorage.setItem(this.CHATS_KEY, JSON.stringify(filteredChats));
  }

  async addMessageToChat(chatId: string, message: Message): Promise<void> {
    const chat = await this.getChatById(chatId);
    if (!chat) {
      throw new Error(`Chat with id ${chatId} not found`);
    }

    chat.messages.push(message);
    chat.updatedAt = new Date();

    // Update chat title based on first user message if it's still "New Chat"
    if (chat.title === 'New Chat' && message.role === 'user' && chat.messages.length === 1) {
      chat.title = message.content.substring(0, 30) + (message.content.length > 30 ? '...' : '');
    }

    await this.saveChat(chat);
  }
}