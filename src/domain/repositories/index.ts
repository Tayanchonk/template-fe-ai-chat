// Repository interfaces for data access (following Dependency Inversion Principle)

import type { User, Chat, Message, AuthCredentials, AuthResponse } from '../entities';

export interface UserRepository {
  authenticate(credentials: AuthCredentials): Promise<AuthResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  saveUser(user: User): Promise<void>;
}

export interface ChatRepository {
  getAllChats(): Promise<Chat[]>;
  getChatById(id: string): Promise<Chat | null>;
  saveChat(chat: Chat): Promise<void>;
  deleteChat(id: string): Promise<void>;
  addMessageToChat(chatId: string, message: Message): Promise<void>;
}